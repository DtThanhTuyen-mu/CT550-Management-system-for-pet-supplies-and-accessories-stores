import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Modal,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import VND from '../../components/Currency';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Entypo from 'react-native-vector-icons/Entypo';
import {format} from 'date-fns';
import ReviewsModal from '../../components/ReviewsModal';

const MySchedule = ({navigation}) => {
  const [schedule, setSchedule] = useState([]);
  const [infoCustomer, setInfoCustomer] = useState([]);
  const [service, setService] = useState([]);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [getreviews, setGetReviews] = useState([]);
  const [getIdSchedule, setidSchedule] = useState();
  const [hidden, setHidden] = useState(true);
  const [iindex, setIindex] = useState();
  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };
  const closeModal = bool => {
    changeModalVisible(bool);
  };

  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('infoCustomer');
      jsonValue = JSON.parse(jsonValue);
      if (jsonValue) {
        setInfoCustomer(jsonValue);
        (async () => {
          await axios
            .get(
              'http://10.0.2.2:3000/api/bill/service/customer/id=' +
                jsonValue._id,
            )
            .then(res => {
              const temp = res?.data.bill;
              console.log('temp Schedule: ', temp);
              // Lay ra tat ca lich hen hoan thanh status=3 cua 1 khach
              setSchedule(temp);
            });
        })();
        (async () => {
          await axios
            .get(
              'http://10.0.2.2:3000/api/customer/id=' +
                jsonValue._id +
                '/schedules',
            )
            .then(res => {
              console.log('All reviews');
              const temp = res?.data.rs;
              console.log('temp2:', temp);
              setGetReviews(temp);
            });
        })();
      }
    })();
  }, []);

  const reviews = props => {
    setidSchedule(props.sch);
    changeModalVisible(true);
  };
  const reload = async () => {
    await axios
      .get(
        'http://10.0.2.2:3000/api/bill/service/customer/id=' + infoCustomer._id,
      )
      .then(res => {
        const temp = res?.data.bill;
        console.log('temp: ', temp);
        const s = res?.data.service;
        console.log('service:', s);
        setSchedule(temp);
        setService(s);
      });
    await axios
      .get(
        'http://10.0.2.2:3000/api/customer/id=' +
          infoCustomer._id +
          '/schedules',
      )
      .then(res => {
        console.log('All reviews');
        const temp = res?.data.rs;
        console.log('temp2:', temp);
        setGetReviews(temp);
      });
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#1E7178"
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 16,
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: '#1E7178',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5
            name="arrow-left"
            size={18}
            style={{
              padding: 12,
              color: '#fff',
            }}></FontAwesome5>
        </TouchableOpacity>
        <Text style={{fontSize: 21, color: '#fff', fontWeight: 600}}>
          Lịch hẹn
        </Text>
        <TouchableOpacity style={{paddingRight: 10}} onPress={() => reload()}>
          <Ionicons
            name="sync-sharp"
            style={{textAlign: 'right', fontSize: 22, color: '#fff'}}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: 0,
          backgroundColor: '#fff',
          marginLeft: -10,
        }}>
        <View style={{paddingTop: 10}}>
          {schedule &&
            schedule.map((sch, k) => (
              <View key={k}>
                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      width: '95%',
                      height: 90,
                      backgroundColor: '#f1f3f3',
                      paddingVertical: 14,
                      paddingLeft: 10,
                      marginHorizontal: 15,
                      marginBottom: 5,
                    }}>
                    <Image
                      source={{uri: sch.idStaff.image}}
                      resizeMode="cover"
                      style={{
                        width: '20%',
                        height: '100%',
                        borderWidth: 1,
                        borderColor: 'black',
                        borderRadius: 50,
                      }}
                    />
                    <View style={{marginLeft: 5}}>
                      <View>
                        {sch.reSchedule === undefined ? (
                          <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 15}}> {sch.time} </Text>
                            <Text style={{fontSize: 15, paddingLeft: 5}}>
                              {format(new Date(sch.date), 'dd/MM/yyyy')}
                            </Text>
                          </View>
                        ) : (
                          <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 15}}>
                              {sch.reSchedule.time}
                            </Text>
                            <Text style={{fontSize: 15, paddingLeft: 5}}>
                              {format(
                                new Date(sch.reSchedule.date),
                                'dd/MM/yyyy',
                              )}
                            </Text>
                          </View>
                        )}

                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 700,
                            color: '#000',
                          }}>
                          Nv. {sch.idStaff.fullname}
                        </Text>
                        {getreviews.length === 0 || sch.status === 3 ? (
                          <Text> Chưa đánh giá</Text>
                        ) : (
                          getreviews &&
                          getreviews.map((g, i) => (
                            <View key={i}>
                              {g.reviews &&
                                g.reviews.map((s, ki) => (
                                  <View key={ki}>
                                    {s.idSchedule === sch._id ? (
                                      s.star === 1 ? (
                                        <View style={{flexDirection: 'row'}}>
                                          <Ionicons
                                            name="star"
                                            size={20}
                                            style={{color: '#F0CA00'}}
                                          />
                                        </View>
                                      ) : s.star === 2 ? (
                                        <View style={{flexDirection: 'row'}}>
                                          <Ionicons
                                            name="star"
                                            size={20}
                                            style={{color: '#F0CA00'}}
                                          />
                                          <Ionicons
                                            name="star"
                                            size={20}
                                            style={{color: '#F0CA00'}}
                                          />
                                        </View>
                                      ) : s.star === 3 ? (
                                        <View style={{flexDirection: 'row'}}>
                                          <Ionicons
                                            name="star"
                                            size={20}
                                            style={{color: '#F0CA00'}}
                                          />
                                          <Ionicons
                                            name="star"
                                            size={20}
                                            style={{color: '#F0CA00'}}
                                          />
                                          <Ionicons
                                            name="star"
                                            size={20}
                                            style={{color: '#F0CA00'}}
                                          />
                                        </View>
                                      ) : s.star === 4 ? (
                                        <View style={{flexDirection: 'row'}}>
                                          <Ionicons
                                            name="star"
                                            size={20}
                                            style={{color: '#F0CA00'}}
                                          />
                                          <Ionicons
                                            name="star"
                                            size={20}
                                            style={{color: '#F0CA00'}}
                                          />
                                          <Ionicons
                                            name="star"
                                            size={20}
                                            style={{color: '#F0CA00'}}
                                          />
                                          <Ionicons
                                            name="star"
                                            size={20}
                                            style={{color: '#F0CA00'}}
                                          />
                                        </View>
                                      ) : s.star === 5 ? (
                                        <View style={{flexDirection: 'row'}}>
                                          <Ionicons
                                            name="star"
                                            size={20}
                                            style={{color: '#F0CA00'}}
                                          />
                                          <Ionicons
                                            name="star"
                                            size={20}
                                            style={{color: '#F0CA00'}}
                                          />
                                          <Ionicons
                                            name="star"
                                            size={20}
                                            style={{color: '#F0CA00'}}
                                          />
                                          <Ionicons
                                            name="star"
                                            size={20}
                                            style={{color: '#F0CA00'}}
                                          />
                                          <Ionicons
                                            name="star"
                                            size={20}
                                            style={{color: '#F0CA00'}}
                                          />
                                        </View>
                                      ) : null
                                    ) : null}
                                  </View>
                                ))}
                            </View>
                          ))
                        )}
                      </View>
                    </View>
                    {hidden === true ? (
                      <TouchableOpacity
                        style={{
                          width: '30%',
                          height: '100%',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                        }}
                        onPressIn={() => setIindex(k)}
                        onPress={() => setHidden(false)}>
                        <FontAwesome5 name="angle-down" size={20} />
                      </TouchableOpacity>
                    ) : k === iindex && hidden === false ? (
                      <TouchableOpacity
                        style={{
                          width: '30%',
                          height: '100%',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                        }}
                        onPress={() => setHidden(true)}>
                        <FontAwesome5 name="angle-up" size={20} />
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          width: '30%',
                          height: '100%',
                          justifyContent: 'center',
                          alignItems: 'flex-end',
                        }}
                        onPressIn={() => setIindex(k)}
                        onPress={() => setHidden(false)}>
                        <FontAwesome5 name="angle-down" size={20} />
                      </TouchableOpacity>
                    )}
                    {/* </View> */}
                  </View>
                  {hidden ? null : k === iindex ? (
                    <View
                      style={{
                        color: 'white',
                        width: '80%',
                        marginLeft: 40,
                      }}>
                      <Text
                        style={{fontSize: 18, fontWeight: 700, color: '#000'}}>
                        Dịch vụ
                      </Text>
                      <View
                        style={{
                          display: 'flex',
                          paddingLeft: 20,
                          flexDirection: 'row',
                        }}>
                        <Entypo
                          name="baidu"
                          style={{
                            color: 'green',
                            fontSize: 20,
                            padding: 10,
                          }}
                        />
                        <Text
                          style={{
                            display: 'flex',
                            fontSize: 18,
                            borderBottomColor: 'black',
                            borderBottomWidth: 0.5,
                            textAlign: 'justify',
                            width: '95%',
                          }}>
                          {sch.idService.title}
                        </Text>
                      </View>
                      <View style={{display: 'flex', paddingLeft: 20}}>
                        <Text
                          style={{
                            fontSize: 18,
                            borderBottomColor: 'black',
                            textAlign: 'right',
                            fontWeight: 700,
                            color: '#000',
                          }}>
                          Tổng tiền: {VND.format(sch.price)}
                        </Text>
                      </View>
                      {sch.status === 5 ? null : (
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'flex-end',
                            marginTop: 5,
                            marginRight: -2,
                          }}>
                          <TouchableOpacity
                            style={{
                              backgroundColor: '#D53904',
                              borderRadius: 10,
                              marginLeft: 10,
                              marginBottom: 10,
                            }}
                            onPress={() =>
                              reviews({
                                sch: sch,
                                isModalVisible,
                              })
                            }>
                            <Text
                              style={{
                                paddingHorizontal: 5,
                                paddingVertical: 5,
                                fontSize: 15,
                                fontWeight: 500,
                                color: '#fff',
                              }}>
                              Đánh giá
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  ) : null}
                </View>
                <Modal
                  transparent={true}
                  animationType="fade"
                  visible={isModalVisible}
                  nRequestClose={() => changeModalVisible(false)}>
                  <ReviewsModal
                    changeModalVisible={changeModalVisible}
                    navigation={navigation}
                    sch={getIdSchedule}
                  />
                </Modal>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MySchedule;

const styles = StyleSheet.create({});
