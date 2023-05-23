import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Entypo from 'react-native-vector-icons/Entypo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {format} from 'date-fns';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const AmSchedule = ({navigation, route}) => {
  const [isLoading, setisLoading] = useState(true);
  const [schedule, setSchedule] = useState([]);
  const [reschedule, setReSchedule] = useState([]);
  const [pkschedule, setPkSchedule] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const idCustomer = route.params;
  // console.log(idCustomer);
  useEffect(() => {
    (async () => {
      await axios
        .get(
          'http://10.0.2.2:3000/api/customer=' +
            idCustomer +
            '/schedule/status=2',
        )
        .then(res => {
          const listschedule = res?.data;
          console.log('lich hen: ', listschedule);
          setSchedule(listschedule);
        })
        .catch(error => {
          console.log('Error: ', error);
        })
        .finally(() => {
          setisLoading(false);
        });
    })();

    (async () => {
      await axios
        .get(
          'http://10.0.2.2:3000/api/customer=' +
            idCustomer +
            '/schedule/status=-1or7',
        )
        .then(res => {
          const listreschedule = res?.data;
          console.log(' lich hen doi :', listreschedule);
          setReSchedule(listreschedule);
        })
        .catch(error => {
          console.log('Error: ', error);
        })
        .finally(() => {
          setisLoading(false);
        });
    })();

    (async () => {
      await axios
        .get(
          'http://10.0.2.2:3000/api/customer=' +
            idCustomer +
            '/schedule/status=6',
        )
        .then(res => {
          const listreschedule = res?.data;
          console.log('goi dich con lich hen  :', listreschedule);
          setPkSchedule(listreschedule);
        })
        .catch(error => {
          console.log('Error: ', error);
        })
        .finally(() => {
          setisLoading(false);
        });
    })();
  }, []);

  const cancel = async id => {
    await axios
      .put('http://10.0.2.2:3000/api/customer/schedule/status=0', {
        idSchedule: id,
      })
      .then(async res => {
        const service = res?.data;
        console.log(' Data login: ', service);
        setTimeout(() => {
          (async () => {
            await axios
              .get(
                'http://10.0.2.2:3000/api/customer=' +
                  idCustomer +
                  '/schedule/status=2',
              )
              .then(res => {
                const listschedule = res?.data;
                setSchedule(listschedule);
              })
              .catch(error => {
                console.log('Error: ', error);
              })
              .finally(() => {
                setisLoading(false);
              });
          })();
        }, 500);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  };

  const cancelre = async rs => {
    console.log('sid', rs._id);
    console.log('resid', rs.reSchedule._id);
    await axios
      .put('http://10.0.2.2:3000/api/customer/reschedule/status=0', {
        idReSchedule: rs.reSchedule._id,
        idSchedule: rs._id,
      })
      .then(async res => {
        const service = res?.data;
        console.log(' Data login: ', service);
        setTimeout(() => {
          (async () => {
            await axios
              .get(
                'http://10.0.2.2:3000/api/customer=' +
                  idCustomer +
                  '/schedule/status=-1',
              )
              .then(async re => {
                const listreschedule = re?.data;
                setReSchedule(listreschedule);
              })
              .catch(error => {
                console.log('Error: ', error);
              })
              .finally(() => {
                setisLoading(false);
              });
          })();
        }, 500);
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  };
  const reSchedule = async props => {
    let service = props.idSe;
    await AsyncStorage.setItem('scheduleId', props.idSch);
    await AsyncStorage.setItem('scheduleCarySer', props.carySe);
    await AsyncStorage.setItem('pre', 'pre');
    navigation.navigate('MaAppointment', service);
  };
  const reScheduled = async props => {
    let service = props.idSe;
    // console.log('idSer: ', props.idSe);
    // console.log('idSch: ', props.SchId);
    // console.log('idreSch: ', props.reSchId);
    // console.log('idreSch: ', props.carySe);

    await AsyncStorage.setItem('scheduleId', props.idSch);
    if (props.carySe !== undefined) {
      await AsyncStorage.setItem('scheduleCarySer', props.carySe);
      await AsyncStorage.setItem('preOpre', 'preOpre');
    }
    await AsyncStorage.setItem('pre', 'pre');
    await AsyncStorage.setItem('rescheduleId', props.idReSch);
    navigation.navigate('MaAppointment', service);
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
        <Text style={{fontSize: 22, color: '#fff', fontWeight: 600}}>
          Lịch hẹn của tôi
        </Text>
        <View></View>
      </View>

      <View
        style={{
          width: '100%',
          height: 50,
          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-around',
        }}>
        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
          <View
            style={{
              height: '90%',
              width: 125,
              borderRightWidth: 1.5,
              borderRightColor: '#E85C00',
            }}>
            {selectedTab === 0 ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedTab(0);
                  }}>
                  <Text style={[styles.text1, styles.pushtext]}>Lịch hẹn</Text>
                </TouchableOpacity>
                <View
                  style={{
                    height: 5,
                    width: '100%',
                    backgroundColor: '#E85C00',
                  }}></View>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab(0);
                }}>
                <Text style={styles.text1}>Lịch hẹn</Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              height: '90%',
              width: 131.5,
              borderRightWidth: 1.5,
              borderRightColor: '#E85C00',
            }}>
            {selectedTab === 1 ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedTab(1);
                  }}>
                  <Text style={[styles.text1, styles.pushtext]}>Hẹn lại</Text>
                </TouchableOpacity>
                <View
                  style={{
                    height: 5,
                    width: '100%',
                    backgroundColor: '#E85C00',
                  }}></View>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab(1);
                }}>
                <Text style={[styles.text1]}>Hẹn lại</Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              height: '90%',
              width: 131.5,
            }}>
            {selectedTab === 2 ? (
              <>
                <TouchableOpacity
                  onPress={() => {
                    setSelectedTab(2);
                  }}>
                  <Text style={[styles.text1, styles.pushtext]}>
                    Gói dịch vụ
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    height: 5,
                    width: '100%',
                    backgroundColor: '#E85C00',
                  }}></View>
              </>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTab(2);
                }}>
                <Text style={styles.text1}>Gói dịch vụ</Text>
              </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
      {selectedTab === 0 ? (
        <ScrollView
          style={{
            flex: 1,
          }}>
          {schedule.map((s, k) => (
            <View key={k} style={{paddingTop: 15}}>
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
                  source={{uri: s.idStaff.image}}
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
                    <Text style={{fontSize: 15}}> {s.time} </Text>
                    <Text style={{marginLeft: 15, fontSize: 15}}>
                      {format(new Date(s.date), 'dd/MM/yyyy')}
                    </Text>
                  </View>
                  <Text style={{fontSize: 16, fontWeight: 500}}>
                    Nv. {s.idStaff.fullname}
                  </Text>
                  <Text style={{fontSize: 15}}>{s.idStaff.phone} </Text>
                </View>
              </View>
              <View
                style={{
                  color: 'white',
                  width: '80%',
                  marginLeft: 40,
                }}>
                <Text style={{fontSize: 18, fontWeight: 500}}> Dịch vụ</Text>
                <View
                  style={{
                    display: 'flex',
                    paddingLeft: 20,
                    flexDirection: 'row',
                    marginEnd: 10,
                  }}>
                  <Entypo
                    name="baidu"
                    style={{color: 'green', fontSize: 20, padding: 10}}
                  />
                  <Text
                    style={{
                      display: 'flex',
                      fontSize: 18,
                      borderBottomColor: 'black',
                      borderBottomWidth: 0.5,
                      textAlign: 'justify',
                    }}>
                    {s.idService.title}
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-end',
                    marginTop: 5,
                  }}>
                  <TouchableOpacity
                    onPress={() =>
                      reSchedule({
                        idSe: s.idService._id,
                        idSch: s._id,
                        carySe: s.idService.category,
                      })
                    }
                    style={{backgroundColor: '#DED710', borderRadius: 10}}>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        fontSize: 16,
                        fontWeight: 500,
                        color: 'grey',
                      }}>
                      Dời lịch
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#E85C00',
                      borderRadius: 10,
                      marginHorizontal: 10,
                    }}
                    onPress={() => cancel(s._id)}>
                    <Text
                      style={{
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        fontSize: 16,
                        color: '#fff',
                        fontWeight: 500,
                      }}>
                      Hủy
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      ) : selectedTab === 1 ? (
        <ScrollView
          style={{
            flex: 1,
          }}>
          {reschedule.map((rs, k) => (
            <View key={k} style={{paddingTop: 15}}>
              {rs.idService.category === '640fde9860c354b7006669f2' ? (
                <>
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
                      source={{uri: rs.idStaff.image}}
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
                        <Text style={{fontSize: 15}}>{rs.reSchedule.time}</Text>
                        <Text style={{marginLeft: 15, fontSize: 15}}>
                          {format(new Date(rs.reSchedule.date), 'dd/MM/yyyy')}
                        </Text>
                      </View>
                      <Text style={{fontSize: 16, fontWeight: 500}}>
                        Nv. {rs.idStaff.fullname}
                      </Text>
                      <Text style={{fontSize: 15}}>{rs.idStaff.phone} </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      color: 'white',
                      width: '80%',
                      marginLeft: 40,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{fontSize: 18, fontWeight: 500}}>
                        Hẹn lại lần thứ
                      </Text>
                      <Text style={{marginLeft: 15, fontSize: 15}}>
                        {rs.times}
                      </Text>
                    </View>
                    <Text style={{fontSize: 18, fontWeight: 500}}>Dịch vụ</Text>
                    <View
                      style={{
                        display: 'flex',
                        paddingLeft: 20,
                        flexDirection: 'row',
                        marginEnd: 10,
                      }}>
                      <Entypo
                        name="baidu"
                        style={{color: 'green', fontSize: 20, padding: 10}}
                      />
                      <Text
                        style={{
                          display: 'flex',
                          fontSize: 18,
                          borderBottomColor: 'black',
                          borderBottomWidth: 0.5,
                          textAlign: 'justify',
                        }}>
                        {rs.idService.title}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginTop: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          reScheduled({
                            idSe: rs.idService._id,
                            idSch: rs._id,
                            idReSch: rs.reSchedule._id,
                          })
                        }
                        style={{backgroundColor: '#DED710', borderRadius: 10}}>
                        <Text
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            fontSize: 16,
                            fontWeight: 500,
                            color: 'grey',
                          }}>
                          Dời lịch
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#E85C00',
                          borderRadius: 10,
                          marginHorizontal: 10,
                        }}
                        onPress={() => cancelre(rs)}>
                        <Text
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            fontSize: 16,
                            color: '#fff',
                            fontWeight: 500,
                          }}>
                          Hủy
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              ) : (
                <>
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
                      source={{uri: rs.idStaff.image}}
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
                          {' '}
                          {rs.reSchedule.time}{' '}
                        </Text>

                        <Text style={{marginLeft: 15, fontSize: 15}}>
                          {format(new Date(rs.reSchedule.date), 'dd/MM/yyyy')}
                        </Text>
                      </View>
                      <Text style={{fontSize: 16, fontWeight: 500}}>
                        Nv. {rs.idStaff.fullname}
                      </Text>
                      <Text style={{fontSize: 15}}>{rs.idStaff.phone} </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      color: 'white',
                      width: '80%',
                      // flex: 0.4,
                      marginLeft: 40,
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <Text style={{fontSize: 18, fontWeight: 500}}>
                        Lịch gốc
                      </Text>
                      <Text> {rs.time}</Text>
                      <Text style={{marginLeft: 15, fontSize: 15}}>
                        {format(new Date(rs.date), 'dd/MM/yyyy')}
                      </Text>
                    </View>
                    <Text style={{fontSize: 18, fontWeight: 500}}>
                      {' '}
                      Dịch vụ
                    </Text>
                    <View
                      style={{
                        display: 'flex',
                        paddingLeft: 20,
                        flexDirection: 'row',
                        marginEnd: 10,
                      }}>
                      <Entypo
                        name="baidu"
                        style={{color: 'green', fontSize: 20, padding: 10}}
                      />
                      <Text
                        style={{
                          display: 'flex',
                          fontSize: 18,
                          borderBottomColor: 'black',
                          borderBottomWidth: 0.5,
                          textAlign: 'justify',
                        }}>
                        {rs.idService.title}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        marginTop: 5,
                      }}>
                      <TouchableOpacity
                        onPress={() =>
                          reScheduled({
                            idSe: rs.idService._id,
                            idSch: rs._id,
                            idReSch: rs.reSchedule._id,
                          })
                        }
                        style={{
                          backgroundColor: '#DED710',
                          borderRadius: 10,
                        }}>
                        <Text
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            fontSize: 16,
                            fontWeight: 500,
                            color: 'grey',
                          }}>
                          Dời lịch
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#E85C00',
                          borderRadius: 10,
                          marginHorizontal: 10,
                        }}
                        onPress={() => cancelre(rs)}>
                        <Text
                          style={{
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            fontSize: 16,
                            color: '#fff',
                            fontWeight: 500,
                          }}>
                          Hủy
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </>
              )}
            </View>
          ))}
        </ScrollView>
      ) : (
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: 16,
          }}>
          {pkschedule &&
            pkschedule.map((pk, i) => (
              <View key={i}>
                {Number(pk.idService.times.match(/[0-9]+/)[0]) ===
                pk.times ? null : (
                  <TouchableOpacity
                    onPress={() => {
                      pk.reSchedule === undefined
                        ? reSchedule({
                            idSe: pk.idService._id,
                            idSch: pk._id,
                            carySe: pk.idService.category,
                          })
                        : reScheduled({
                            idSe: pk.idService._id,
                            idSch: pk._id,
                            idReSch: pk.reSchedule._id,
                            carySe: pk.idService.category,
                          });
                    }}
                    style={{
                      width: '100%',
                      height: 100,
                      marginVertical: 6,
                      flexDirection: 'row',
                      alignItems: 'center',
                      backgroundColor: '#fff',
                      borderTopLeftRadius: 10,
                      borderBottomLeftRadius: 10,
                      elevation: 4,
                    }}>
                    <View
                      style={{
                        width: '30%',
                        height: 100,
                        padding: 14,
                        justifyContent: 'center',
                        alignContent: 'center',
                        backgroundColor: '#98AFC7',
                        borderRadius: 10,
                        marginRight: 18,
                      }}>
                      <Image
                        source={{uri: pk.idService.image}}
                        style={{
                          width: '100%',
                          height: '100%',
                          resizeMode: 'contain',
                        }}
                      />
                    </View>
                    <View
                      style={{
                        flex: 1,
                        height: '100%',
                        justifyContent: 'center',
                        marginRight: 18,
                      }}>
                      <Text
                        style={{
                          fontSize: 17,
                          maxWidth: '100%',
                          color: 'black',
                          fontWeight: '600',
                          letterSpacing: 1,
                          textAlign: 'justify',
                        }}>
                        {pk.idService.title}
                      </Text>
                      <View style={{flexDirection: 'row'}}>
                        <FontAwesome name="clock-o" size={17} />
                        <Text style={{marginLeft: 1}}>
                          {pk.idService.times}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              </View>
            ))}
        </ScrollView>
      )}
    </View>
  );
};

export default AmSchedule;

const styles = StyleSheet.create({
  text1: {
    fontSize: 17,
    fontWeight: 500,
    textAlign: 'center',
    paddingVertical: 5,
    color: 'black',
    marginBottom: 5,
  },
  pushtext: {
    color: '#E85C00',
  },
});
