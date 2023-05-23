import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import VND from '../../components/Currency';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const AmScheduleOS = ({navigation, route}) => {
  const [isLoading, setisLoading] = useState(true);
  const [token, setToken] = useState();
  const [infoStaff, setInfoStaff] = useState([]);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [idSchedule, setidSchedule] = useState();
  const [schedulesBooked, setSchedulesBooked] = useState([]);
  const [schedulesApp, setSchedulesApp] = useState([]);
  const [dates, setDates] = useState([]);
  const sdates = [];
  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };
  const getSchedule = async id => {
    await axios
      .get('http://10.0.2.2:3000/api/staff=' + id + '/schedule')
      .then(res => {
        const listschedulesB = res?.data.schedulesB;
        console.log('listschedulesB: ', listschedulesB);
        setSchedulesBooked(listschedulesB);
        const listschedulesApp = res?.data.schedulesA;
        console.log('listschedulesA: ', listschedulesApp);
        setSchedulesApp(listschedulesApp);
        const sdate = res?.data.sdate;
        console.log('ngay lay tu CSDL: ', sdate);
        sdate.sort((a, b) => Date.parse(a) - Date.parse(b));
        for (let i = 0; i < sdate.length; i++) {
          sdates.push(format(new Date(sdate[i]), 'dd/MM/yyyy'));
        }
        let sds = sdates.filter((c, index) => {
          return sdates.indexOf(c) === index;
        });
        console.log('sort: ', sds);
        setDates(sds);
      })
      .catch(error => {
        console.log('Error: ', error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('infoStaff');
      jsonValue = JSON.parse(jsonValue);
      console.log(' Thong tin nguoi dung la nhan vien set : ', jsonValue);
      if (jsonValue) {
        setInfoStaff(jsonValue);
        getSchedule(jsonValue._id);
      }
      const token = await AsyncStorage.getItem('tokenStaff');
      if (token) {
        setToken(token);
      }
    })();
  }, [navigation]);

  const reload = async () => {
    getSchedule(infoStaff._id);
  };

  // Dong modal
  const closeModal = async bool => {
    changeModalVisible(bool);
  };
  // Ok dong modal
  const handleRequest = async bool => {
    await axios
      .post(
        'http://10.0.2.2:3000/api/staff/id=' +
          idSchedule.idStaff._id +
          '/request/schedule',
        {
          idCustomer: idSchedule.idCustomer._id,
          idSchedule: idSchedule._id,
        },
      )
      .then(res => console.log('Ok tao thong bao cua nhan vien thanh cong!!!'));
    changeModalVisible(bool);
  };
  // nhan doi lich hien modal
  const handleRequire = props => {
    setidSchedule(props.sch);
    console.log('idSchedule: ', idSchedule);
    changeModalVisible(true);
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: '#1E7178',
        }}>
        <Text
          style={{
            width: '85%',
            fontSize: 21,
            fontWeight: 600,
            color: '#fff',
            textAlign: 'center',
            paddingBottom: 5,
          }}>
          Lịch hẹn
        </Text>
        <TouchableOpacity onPress={() => reload()}>
          <Ionicons
            name="sync-sharp"
            style={{textAlign: 'right', fontSize: 22, color: '#fff'}}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          // marginBottom: 10,
          backgroundColor: '#fff',
        }}>
        {dates &&
          dates.map((d, i) => (
            <View key={i} style={{marginBottom: 10}}>
              <View
                style={{
                  marginTop: 10,
                  justifyContent: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#4CC3DF',
                  width: '80%',
                  borderRadius: 20,
                }}>
                <Text
                  style={{
                    paddingVertical: 5,
                    textAlign: 'center',
                    fontSize: 19,
                    fontWeight: 600,
                    color: '#fff',
                  }}>
                  Ngày {d}
                </Text>
              </View>
              {schedulesBooked != null
                ? schedulesBooked.map((sB, k) => (
                    <View key={k}>
                      {d === format(new Date(sB.date), 'dd/MM/yyyy') ? (
                        <View style={{paddingTop: 10}}>
                          <View
                            style={{
                              display: 'flex',
                              flexDirection: 'row',
                              width: '92%',
                              height: 90,
                              backgroundColor: '#9FE2BF',
                              paddingVertical: 14,
                              paddingLeft: 20,
                              marginHorizontal: 15,
                            }}>
                            <Image
                              source={{uri: sB.idCustomer.image}}
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
                              <View style={{flexDirection: 'row'}}>
                                <Text style={{fontSize: 15}}> {sB.time} </Text>
                              </View>
                              <Text style={{fontSize: 16, fontWeight: 500}}>
                                Kh. {sB.idCustomer.fullname}
                              </Text>
                              <Text style={{fontSize: 15}}>
                                {sB.idCustomer.phone}
                              </Text>
                            </View>
                          </View>
                          <View
                            style={{
                              color: 'white',
                              width: '81%',
                              marginLeft: 33,
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
                                  width: '96%',
                                  borderBottomColor: 'black',
                                  borderBottomWidth: 0.5,
                                  textAlign: 'justify',
                                  paddingRight: 3,
                                }}>
                                {sB.idService.title}
                              </Text>
                            </View>
                            <View style={{display: 'flex', paddingLeft: 20}}>
                              <Text
                                style={{
                                  fontSize: 18,
                                  borderBottomColor: 'black',
                                  textAlign: 'right',
                                }}>
                                Tổng tiền: {VND.format(sB.price)}
                              </Text>
                            </View>
                            <View
                              style={{
                                flexDirection: 'row',
                                justifyContent: 'flex-end',
                                marginTop: 5,
                                marginRight: -2,
                              }}>
                              <View style={{flexDirection: 'row'}}>
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: '#E85C00',
                                    borderRadius: 10,
                                    marginLeft: 10,
                                  }}
                                  onPress={() =>
                                    handleRequire({
                                      sch: sB,
                                      isModalVisible,
                                    })
                                  }>
                                  <Text
                                    style={{
                                      paddingHorizontal: 6,
                                      paddingVertical: 5,
                                      fontSize: 15,
                                      fontWeight: 500,
                                      color: 'white',
                                    }}>
                                    Đổi lịch
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  ))
                : null}
              {schedulesApp != null
                ? schedulesApp.map((sA, k) => (
                    <View key={k}>
                      {d ===
                      format(new Date(sA.reSchedule.date), 'dd/MM/yyyy') ? (
                        <View>
                          <View style={{paddingTop: 10}}>
                            <View
                              style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: '92%',
                                height: 90,
                                backgroundColor: '#9FE2BF',
                                paddingVertical: 14,
                                paddingLeft: 20,
                                marginHorizontal: 15,
                              }}>
                              <Image
                                source={{uri: sA.idCustomer.image}}
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
                                <View style={{flexDirection: 'row'}}>
                                  <Text style={{fontSize: 15}}>
                                    {sA.reSchedule.time}
                                  </Text>
                                </View>
                                <Text style={{fontSize: 16, fontWeight: 500}}>
                                  Kh. {sA.idCustomer.fullname}
                                </Text>
                                <Text style={{fontSize: 15}}>
                                  {sA.idCustomer.phone}
                                </Text>
                              </View>
                            </View>
                            <View
                              style={{
                                color: 'white',
                                width: '80%',
                                marginLeft: 33,
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
                                    paddingRight: 3,
                                  }}>
                                  {sA.idService.title}
                                </Text>
                              </View>
                              <View style={{display: 'flex', paddingLeft: 20}}>
                                <Text
                                  style={{
                                    fontSize: 18,
                                    borderBottomColor: 'black',
                                    textAlign: 'right',
                                  }}>
                                  Tổng tiền: {VND.format(sA.price)}
                                </Text>
                              </View>
                              <View
                                style={{
                                  flexDirection: 'row',
                                  justifyContent: 'flex-end',
                                  marginTop: 5,
                                  marginRight: -2,
                                }}>
                                <TouchableOpacity
                                  style={{
                                    backgroundColor: '#D66F24',
                                    borderRadius: 10,
                                    marginLeft: 10,
                                  }}
                                  onPress={() =>
                                    handleRequire({
                                      sch: sA,
                                      isModalVisible,
                                    })
                                  }>
                                  <Text
                                    style={{
                                      paddingHorizontal: 6,
                                      paddingVertical: 5,
                                      fontSize: 15,
                                      fontWeight: 500,
                                      color: '#fff',
                                    }}>
                                    Đổi lịch
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            </View>
                          </View>
                        </View>
                      ) : null}
                    </View>
                  ))
                : null}
            </View>
          ))}
      </ScrollView>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={() => changeModalVisible(false)}>
        <View
          disabled={true}
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              height: HEIGHT - 640,
              width: WIDTH - 100,
              paddingTop: 10,
              backgroundColor: '#fff',
              elevation: 8,
              borderRadius: 10,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  margin: 5,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                Xác nhận
              </Text>
            </View>
            <View
              style={{
                height: '35%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 30,
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontSize: 18,
                  color: '#000',
                }}>
                Để xác nhận yêu cầu dời lịch vui lòng chọn 'Thực hiện'
              </Text>
            </View>
            <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  alignItems: 'center',
                  borderTopWidth: 0.2,
                  borderRightWidth: 0.5,
                }}
                onPress={() => closeModal(false, 'Cancel')}>
                <Text
                  style={{
                    margin: 5,
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: '#6B6D6D',
                  }}>
                  Đóng
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  alignItems: 'center',
                  borderTopWidth: 0.2,
                }}
                onPress={() => handleRequest(false)}>
                <Text
                  style={{
                    margin: 5,
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: '#D53904',
                  }}>
                  Thực hiện
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default AmScheduleOS;

const styles = StyleSheet.create({});
