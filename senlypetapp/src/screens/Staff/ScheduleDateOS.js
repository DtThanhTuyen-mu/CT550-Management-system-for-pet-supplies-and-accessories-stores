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
  TextInput,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VND from '../../components/Currency';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ScheduleDateOS = ({navigation, route}) => {
  const [isLoading, setisLoading] = useState(true);
  const [token, setToken] = useState();
  const [infoStaff, setInfoStaff] = useState([]);
  const [schedulesBooked, setSchedulesBooked] = useState([]);
  const [schedulesApp, setSchedulesApp] = useState([]);
  const sdates = [];
  const [getIdSchedule, setidSchedule] = useState();
  const [note, setNote] = useState(null);
  const [prepayment, setPrepayment] = useState(null);
  const [nweight, setNWeight] = useState(0);
  const [isModalVisible, setisModalVisible] = useState(false);

  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('infoStaff');
      jsonValue = JSON.parse(jsonValue);
      console.log(' Thong tin nguoi dung la nhan vien set : ', jsonValue);
      if (jsonValue) {
        setInfoStaff(jsonValue);
        getScheduleByDate(jsonValue._id);
      }
      const token = await AsyncStorage.getItem('tokenStaff');
      if (token) {
        setToken(token);
      }
    })();
  }, []);
  const getScheduleByDate = async id => {
    await axios
      .get('http://10.0.2.2:3000/api/staff=' + id + '/schedulebydate')
      .then(res => {
        const listschedulesB = res?.data.scheduleB;
        console.log('listschedulesB book: ', listschedulesB);
        setSchedulesBooked(listschedulesB);
        const listschedulesApp = res?.data.scheduleA;
        console.log('listschedulesA doi: ', listschedulesApp);
        setSchedulesApp(listschedulesApp);
      })
      .catch(error => {
        console.log('Error: ', error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };

  const closeModal = bool => {
    changeModalVisible(bool);
  };

  const addPayment = async bool => {
    changeModalVisible(bool);
    if (getIdSchedule.idService.category === '640fde8a60c354b7006669f0') {
      await axios
        .put(
          'http://10.0.2.2:3000/api/staff/schedule/' +
            getIdSchedule._id +
            '/status=3',
        )
        .then(res => {
          console.log('Post status 3 ok');
        });
      // đưa dv này vào LS cua pets
      await axios
        .put(
          'http://10.0.2.2:3000/api/pets=' +
            getIdSchedule.idPets._id +
            '/schedule',
          {
            titleService: getIdSchedule.idService.title,
            nameStaff: getIdSchedule.idStaff.fullname,
            note,
          },
        )
        .then(res => {
          console.log('Post status 3 ok');
        });
      // Tạo bill
      await axios
        .post('http://10.0.2.2:3000/api/staff/service/payment', {
          idCustomer: getIdSchedule.idCustomer,
          idStaff: getIdSchedule.idStaff,
          idSchedule: getIdSchedule._id,
          idService: getIdSchedule.idService,
          weight: nweight,
        })
        .then(res => {
          const infobill = res?.data.orderPayment;
          console.log('Tao bill: ', infobill);
          navigation.navigate('DetailScheduleOS', {
            infobill,
          });
        });
    } else {
      console.log(' lich hen thuoc dich vụ dang goi');
      console.log(' note', note);
      console.log(' note', prepayment);
      console.log(' nweight', nweight);
      // Cập nhật trang thai lịch hẹn là 6 đã hoàn thành và còn hẹn lại lần sau
      await axios
        .put(
          'http://10.0.2.2:3000/api/staff/schedule/' +
            getIdSchedule._id +
            '/status=6',
        )
        .then(res => {
          console.log('Post status 6 ok');
        });
      await axios
        .put(
          'http://10.0.2.2:3000/api/pets=' +
            getIdSchedule.idPets._id +
            '/schedule',
          {
            titleService: getIdSchedule.idService.title,
            nameStaff: getIdSchedule.idStaff.fullname,
            note,
          },
        )
        .then(res => {
          console.log('Post status 3 ok');
        });
      if (getIdSchedule.status !== 7) {
        await axios
          .post('http://10.0.2.2:3000/api/staff/service/payment', {
            idCustomer: getIdSchedule.idCustomer,
            idStaff: getIdSchedule.idStaff,
            idSchedule: getIdSchedule._id,
            idService: getIdSchedule.idService,
            weight: nweight,
          })
          .then(res => {
            const infobill = res?.data.orderPayment;
            console.log('Tao bill: ', infobill);
            navigation.navigate('DetailScheduleOS', {
              infobill,
            });
          });
      }
    }

    getScheduleByDate(infoStaff._id);
  };
  const handlePaymentOM = props => {
    console.log(' thong tin lich hen: ', props.sch.idService.category);
    setidSchedule(props.sch);
    changeModalVisible(true);
  };
  const cancel = async id => {
    console.log('id:', id);
    await axios
      .put('http://10.0.2.2:3000/api/customer/schedule/' + id + '/status=-2')
      .then(res => {
        console.log('Dat lai trang thai -2 khach hang khong den');
      });
    getScheduleByDate(infoStaff._id);
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
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: '#1E7178',
        }}>
        <Text
          style={{
            fontSize: 21,
            fontWeight: 600,
            color: '#fff',
            paddingBottom: 5,
          }}>
          Lịch hẹn hôm nay
        </Text>
        <View></View>
      </View>
      <ScrollView
        style={{
          backgroundColor: '#fff',
        }}>
        <View style={{marginBottom: 10}}>
          {schedulesBooked != null
            ? schedulesBooked.map((sB, k) => (
                <View key={k}>
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
                      <View
                        style={{
                          flex: 1,
                          marginLeft: 50,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <TouchableOpacity
                          style={{
                            width: '50%',
                            height: '50%',
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() => {
                            navigation.navigate('InfoPets', sB.idPets);
                          }}>
                          <FontAwesome5 name="ellipsis-h" size={20} />
                        </TouchableOpacity>
                      </View>
                    </View>
                    <View
                      style={{
                        color: 'white',
                        width: '80%',
                        marginLeft: 35,
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
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#E85C00',
                            borderRadius: 10,
                            marginLeft: 10,
                          }}
                          onPress={() => cancel(sB._id)}>
                          <Text
                            style={{
                              paddingHorizontal: 5,
                              paddingVertical: 5,
                              fontSize: 15,
                              fontWeight: 500,
                              color: 'white',
                            }}>
                            Kh không đến
                          </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={{
                            backgroundColor: '#135B61',
                            borderRadius: 10,
                            marginLeft: 10,
                          }}
                          onPress={
                            () => handlePaymentOM({sch: sB, isModalVisible})
                          }>
                          <Text
                            style={{
                              paddingHorizontal: 5,
                              paddingVertical: 5,
                              fontSize: 15,
                              fontWeight: 500,
                              color: '#fff',
                            }}>
                            Hoàn thành
                          </Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            : null}
          {schedulesApp != null
            ? schedulesApp.map((sA, k) => (
                <View key={k}>
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
                        <View
                          style={{
                            flex: 1,
                            marginLeft: 50,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}>
                          <TouchableOpacity
                            style={{
                              width: '50%',
                              height: '50%',
                              justifyContent: 'center',
                              alignItems: 'center',
                            }}
                            onPress={() => {
                              console.log(' pet: ', sA.idPets);
                              navigation.navigate('InfoPets', sA.idPets);
                            }}>
                            <FontAwesome5 name="ellipsis-h" size={20} />
                          </TouchableOpacity>
                        </View>
                      </View>
                      <View
                        style={{
                          color: 'white',
                          width: '80%',
                          marginLeft: 35,
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
                              backgroundColor: '#E85C00',
                              borderRadius: 10,
                              marginLeft: 10,
                            }}
                            onPress={() => cancel(sA._id)}>
                            <Text
                              style={{
                                paddingHorizontal: 5,
                                paddingVertical: 5,
                                fontSize: 15,
                                fontWeight: 500,
                                color: 'white',
                              }}>
                              KH không đến
                            </Text>
                          </TouchableOpacity>
                          <TouchableOpacity
                            style={{
                              backgroundColor: '#135B61',
                              borderRadius: 10,
                              marginLeft: 10,
                            }}
                            onPress={() =>
                              handlePaymentOM({sch: sA, isModalVisible})
                            }>
                            <Text
                              style={{
                                paddingHorizontal: 5,
                                paddingVertical: 5,
                                fontSize: 15,
                                fontWeight: 500,
                                color: '#fff',
                              }}>
                              Hoàn thành
                            </Text>
                          </TouchableOpacity>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              ))
            : null}
          <Modal
            transparent={true}
            animationType="fade"
            visible={isModalVisible}
            nRequestClose={() => changeModalVisible(false)}>
            <View style={{flex: 1}}>
              <View
                disabled={true}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <View
                  style={{
                    height: HEIGHT - 470,
                    width: WIDTH - 100,
                    paddingTop: 10,
                    backgroundColor: '#fff',
                    elevation: 8,
                    borderRadius: 10,
                  }}>
                  <FontAwesome5
                    name="times"
                    style={{
                      alignSelf: 'flex-end',
                      marginRight: 15,
                      fontSize: 18,
                    }}
                    onPress={() => closeModal(false, 'Cancel')}
                  />
                  <View
                    style={{
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 25,
                        fontWeight: 'bold',
                        textAlign: 'justify',
                        color:'#000',
                      }}>
                      Xác nhận
                    </Text>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 19,
                        paddingLeft: 15,
                      }}>
                      Cân nặng <Text style={{color: 'red'}}>*</Text>
                    </Text>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 5,
                      }}>
                      <TextInput
                        style={{
                          fontSize: 18,
                          width: '85%',
                          height: 35,
                          paddingVertical: 0,
                          borderRadius: 30,
                          paddingHorizontal: 20,
                          borderColor: 'green',
                          borderWidth: 1,
                        }}
                        onChangeText={text => setNWeight(text)}
                        placeholder="5"
                      />
                    </View>
                  </View>
                  <View>
                    <Text
                      style={{
                        fontSize: 19,
                        paddingLeft: 15,
                      }}>
                      Ghi chú
                    </Text>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginVertical: 5,
                      }}>
                      <TextInput
                        multiline={true}
                        numberOfLines={3}
                        style={{
                          fontSize: 18,
                          width: '85%',
                          height: 85,
                          borderRadius: 30,
                          paddingHorizontal: 20,
                          borderColor: 'green',
                          borderWidth: 1,
                        }}
                        onChangeText={text => setNote(text)}
                        placeholder="Ghi chú"
                      />
                    </View>
                  </View>
                  <View
                    style={{
                      width: '100%',
                      flexDirection: 'row',
                      justifyContent: 'center',
                      marginTop: 10,
                    }}>
                    <TouchableOpacity
                      style={{
                        width: '50%',
                        height: '80%',
                        paddingVertical: 5,
                        alignItems: 'center',
                        borderRadius: 10,
                        backgroundColor: '#E85C00',
                        marginBottom: 10,
                      }}
                      onPress={() => addPayment(false, 'Cancel')}>
                      <Text
                        style={{
                          marginTop:3,
                          fontSize: 17,
                          fontWeight: 'bold',
                          color: 'white',
                        }}>
                        Thực hiện
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </View>
  );
};

export default ScheduleDateOS;

const styles = StyleSheet.create({});
