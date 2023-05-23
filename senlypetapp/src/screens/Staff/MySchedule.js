import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
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
const MySchedule = ({navigation}) => {
  const [infoStaff, setInfoStaff] = useState([]);
  const [token, setToken] = useState();
  const [schedule, setSchedule] = useState([]);
  const [getreviews, setGetReviews] = useState([]);
  const [hidden, setHidden] = useState(true);
  const [iindex, setIindex] = useState();
  const serviceStaff = async id => {
    await axios
      .get('http://10.0.2.2:3000/api/bill/service/staff/id=' + id)
      .then(res => {
        const temp = res?.data.bill;
        console.log('temp schedule: ', temp);
        // Lay ra tat ca lich hen hoan thanh status=3 cua 1 khach
        setSchedule(temp);
      });
  };
  const reviews = async id => {
    await axios
      .get('http://10.0.2.2:3000/api/staff/id=' + id + '/schedules')
      .then(res => {
        console.log('All reviews');
        const temp = res?.data.rs;
        console.log('temp2:', temp);
        setGetReviews(temp);
      });
  };
  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('infoStaff');
      jsonValue = JSON.parse(jsonValue);
      if (jsonValue) {
        setInfoStaff(jsonValue);
        serviceStaff(jsonValue._id);
        reviews(jsonValue._id);
      }
      const token = await AsyncStorage.getItem('tokenStaff');
      if (token) {
        setToken(token);
      }
    })();
  }, []);

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
          paddingHorizontal: 15,
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
          Lịch hẹn hoàn thành
        </Text>
        <View></View>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          marginBottom: 10,
          backgroundColor: '#fff',
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
                      width: '92%',
                      height: 90,
                      backgroundColor: '#98AFC7',
                      paddingVertical: 14,
                      paddingLeft: 20,
                      marginHorizontal: 15,
                      marginBottom: 5,
                    }}>
                    <Image
                      source={{uri: sch.idCustomer.image}}
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
                        <View style={{flexDirection: 'row'}}>
                          <Text style={{fontSize: 15}}> {sch.time} </Text>
                          <Text style={{fontSize: 15, paddingLeft: 5}}>
                            {format(new Date(sch.date), 'dd/MM/yyyy')}{' '}
                          </Text>
                        </View>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: 500,
                            paddingLeft: 5,
                          }}>
                          Kh. {sch.idCustomer.fullname}
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
                    <View
                      style={{
                        flex: 1,
                        marginLeft: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      {hidden === true ? (
                        <TouchableOpacity
                          style={{
                            width: '50%',
                            height: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPressIn={() => setIindex(k)}
                          onPress={() => setHidden(false)}>
                          <FontAwesome5 name="angle-down" size={20} />
                        </TouchableOpacity>
                      ) : k === iindex && hidden === false ? (
                        <TouchableOpacity
                          style={{
                            width: '50%',
                            height: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPressIn={() => setIindex(k)}
                          onPress={() => setHidden(true)}>
                          <FontAwesome5 name="angle-up" size={20} />
                        </TouchableOpacity>
                      ) : (
                        <TouchableOpacity
                          style={{
                            width: '50%',
                            height: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() => setHidden(false)}
                          onPressIn={() => setIindex(k)}>
                          <FontAwesome5 name="angle-down" size={20} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                  {hidden ? null : hidden === false && k === iindex ? (
                    <View
                      style={{
                        color: 'white',
                        width: '80%',
                        // flex: 0.4,
                        marginLeft: 40,
                      }}>
                      <Text style={{fontSize: 18, fontWeight: 500}}>
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
                            width: '96%',
                          }}>
                          {sch.idService.title}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: 'flex',
                          paddingLeft: 20,
                          marginBottom: 5,
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            borderBottomColor: 'black',
                            textAlign: 'right',
                          }}>
                          Tổng tiền: {VND.format(sch.price)}
                        </Text>
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default MySchedule;

const styles = StyleSheet.create({});
