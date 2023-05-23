import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Image,
  ActivityIndicator,
  ToastAndroid,
  ScrollView,
  LogBox,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React, {useEffect, useState} from 'react';
import {
  addDays,
  eachDayOfInterval,
  eachWeekOfInterval,
  subDays,
  format,
  isSameDay,
} from 'date-fns';
import PagerView from 'react-native-pager-view';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

const dates = eachWeekOfInterval(
  {
    start: subDays(new Date(), 0),
    end: addDays(new Date(), 14),
  },
  {
    weekStartsOn: 1,
  },
).reduce((acc: Date[][], cur) => {
  const allDays = eachDayOfInterval({
    start: cur,
    end: addDays(cur, 6),
  });
  acc.push(allDays);
  return acc;
}, []);

const timeToString = (time: number) => {
  const date = new Date(time);
  return date.toISOString().split('T')[0];
};
const MaAppointment = ({navigation, route}) => {
  const [selectGroomer, setSelectGroomer] = useState(null);
  const [selectPets, setSelectPets] = useState(null);
  const [getdate, setGetDate] = useState(new Date());
  const [iindex, setIindex] = useState();
  const [iindexP, setIindexP] = useState();
  const [weight, setWeight] = useState(null);
  const [isLoading, setisLoading] = useState(true);
  const [groomer, setGroomer] = useState([]);
  const serviceid = route.params;
  const [scheduleId, setScheduleId] = useState();
  const [scheduleCarySer, setScheduleCarySer] = useState();
  const [pets, setPets] = useState([]);
  // console.log(serviceid);
  const loadItems = (day: DateData) => {
    const items = items || {};

    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);

        if (!items[strTime]) {
          items[strTime] = [];

          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
              day: strTime, // 2023-02-04
            });
          }
        }
      }

      const newItems: AgendaSchedule = {};
      Object.keys(items).forEach(key => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };

  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('infoCustomer');
      jsonValue = JSON.parse(jsonValue);
      if (jsonValue) {
        await axios
          .get('http://10.0.2.2:3000/api/customer=' + jsonValue._id + '/pets')
          .then(res => {
            const temp = res?.data.pets;
            setPets(temp);
            console.log(' tat ca pet cuar KH', res?.data);
          });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('scheduleId');
      if (jsonValue) {
        setScheduleId(jsonValue);
      }
    })();
    (async () => {
      let jsonValue = await AsyncStorage.getItem('scheduleCarySer');
      if (jsonValue) {
        console.log(' danh muc cua dich vu useEffect: ', jsonValue);

        setScheduleCarySer(jsonValue);
      }
    })();
    (async () => {
      let jsonValue = await AsyncStorage.getItem('preOpre');
      if (jsonValue) {
        console.log('preOpre: ', jsonValue);
      }
    })();
  }, []);
  useEffect(() => {
    getdate;
  }, []);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      getListGroomer();
    });

    return unsubscribe;
  }, [navigation]);

  const getListGroomer = async () => {
    await axios
      .get('http://10.0.2.2:3000/api/staff/role/groomer')
      .then(res => {
        const listgroomer = res?.data;
        setGroomer(listgroomer);
        setisLoading(false);
      })
      .catch(error => {
        console.log('Error: ', error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <View style={{flex: 1}}>
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
              Tạo lịch hẹn
            </Text>
            <View></View>
          </View>
          <ScrollView
            vertical={true}
            showsVerticalScrollIndicator={false}
            style={{width: '100%'}}>
            <View style={{padding: 20}}>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Nhân viên</Text>
              <View
                syle={{
                  marginTop: 5,
                  alignItems: 'center',
                  backgroundColor: 'yellow',
                }}>
                <FlatList
                  numColumns={2}
                  data={groomer}
                  renderItem={({item, index}) => {
                    return (
                      <TouchableOpacity
                        style={{
                          width: '45.5%',
                          backgroundColor: '#fff',
                          elevation: 5,
                          borderRadius: 10,
                          margin: 10,
                        }}
                        onPress={() => navigation.navigate('InfoStaff', item)}>
                        <Image
                          source={{
                            uri: item.image,
                          }}
                          style={{
                            width: 60,
                            height: 60,
                            borderRadius: 30,
                            alignSelf: 'center',
                            marginTop: 20,
                            backgroundColor: 'yellow',
                          }}
                        />
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            alignSelf: 'center',
                            marginTop: 10,
                          }}>
                          Groomer
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            fontWeight: '600',
                            alignSelf: 'center',
                            color: 'green',
                            marginTop: 5,
                            backgroundColor: '#f2f2f2',
                            padding: 5,
                            borderRadius: 10,
                          }}>
                          {item.fullname}
                        </Text>
                        <TouchableOpacity
                          style={{
                            marginTop: 10,
                            marginBottom: 10,
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() => {
                            setSelectGroomer(item);
                            setIindex(index);
                          }}>
                          {iindex === index ? (
                            <View
                              style={{
                                backgroundColor: '#135B61',
                                width: 150,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                              }}>
                              <Text style={{color: '#fff', fontSize: 16}}>
                                Đã chọn
                              </Text>
                            </View>
                          ) : (
                            <View
                              style={{
                                backgroundColor: '#E85C00',
                                width: 150,
                                height: 40,
                                justifyContent: 'center',
                                alignItems: 'center',
                                borderRadius: 10,
                              }}>
                              <Text style={{color: '#fff', fontSize: 16}}>
                                Chọn
                              </Text>
                            </View>
                          )}
                        </TouchableOpacity>
                      </TouchableOpacity>
                    );
                  }}
                />
              </View>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Thú cưng</Text>
              <View
                syle={{
                  marginTop: 5,
                  alignItems: 'center',
                  backgroundColor: 'yellow',
                }}>
                <FlatList
                  numColumns={2}
                  data={pets}
                  renderItem={({item, index}) => {
                    return (
                      <>
                        {iindexP === index ? (
                          <TouchableOpacity
                            style={{
                              width: '45.5%',
                              backgroundColor: 'orange',
                              elevation: 5,
                              borderRadius: 10,
                              margin: 10,
                            }}
                            onPress={() => {
                              setSelectPets(item);
                              setIindexP(index);
                              setWeight(
                                item.weight[item.weight.length - 1].weight,
                              );
                            }}>
                            <FontAwesome5
                              name="check-circle"
                              size={20}
                              style={{
                                color: 'green',
                                justifyContent: 'flex-end',
                                alignSelf: 'flex-end',
                              }}></FontAwesome5>
                            <Image
                              source={{
                                uri: item.image,
                              }}
                              style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                alignSelf: 'center',
                                marginTop: 0,
                                backgroundColor: 'yellow',
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '600',
                                alignSelf: 'center',
                                marginTop: 10,
                              }}>
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '600',
                                alignSelf: 'center',
                                color: 'green',
                                marginTop: 5,
                                backgroundColor: '#f2f2f2',
                                padding: 5,
                                borderRadius: 10,
                                marginBottom: 20,
                              }}>
                              {item.weight &&
                                item.weight[item.weight.length - 1].weight}
                            </Text>
                          </TouchableOpacity>
                        ) : (
                          <TouchableOpacity
                            style={{
                              width: '45.5%',
                              // height: 200,
                              backgroundColor: '#fff',
                              elevation: 5,
                              borderRadius: 10,
                              // borderWidth: 0.3,
                              margin: 10,
                            }}
                            onPress={() => {
                              setSelectPets(item);
                              setIindexP(index);
                              setWeight(
                                item.weight[item.weight.length - 1].weight,
                              );
                            }}>
                            <Image
                              source={{
                                uri: item.image,
                              }}
                              style={{
                                width: 60,
                                height: 60,
                                borderRadius: 30,
                                alignSelf: 'center',
                                marginTop: 20,
                                backgroundColor: 'yellow',
                              }}
                            />
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '600',
                                alignSelf: 'center',
                                marginTop: 10,
                              }}>
                              {item.name}
                            </Text>
                            <Text
                              style={{
                                fontSize: 16,
                                fontWeight: '600',
                                alignSelf: 'center',
                                color: 'green',
                                marginTop: 5,
                                backgroundColor: '#f2f2f2',
                                padding: 5,
                                borderRadius: 10,
                                marginBottom: 20,
                              }}>
                              {item.weight &&
                                item.weight[item.weight.length - 1].weight}
                            </Text>
                          </TouchableOpacity>
                        )}
                      </>
                    );
                  }}
                />
              </View>
              <View style={{}}>
                <Text style={{fontSize: 20, fontWeight: 'bold'}}>
                  Chọn thời gian
                </Text>
                <PagerView
                  style={{
                    position: 'relative',
                    display: 'flex',
                    width: '100%',
                    height: 90,
                  }}>
                  {dates.map((week, i) => {
                    return (
                      <View key={i}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                          }}>
                          {week.map((day, index) => {
                            const txt = format(day, 'EEEEE');
                            const getDates = day.getDate();
                            const curr = new Date();
                            const sameDay = isSameDay(day, curr);
                            // const sameDay = isSameDay(getdate, curr);

                            let textStyles = [styles.label];
                            let touchable = [styles.touchable];

                            if (sameDay) {
                              textStyles.push(styles.selectLabel);
                              touchable.push(styles.selectedTouchable);
                            }
                            return (
                              <View
                                key={index}
                                style={{
                                  alignItems: 'center',
                                  fontWeight: 'bold',
                                  fontSize: 20,
                                  letterSpacing: 1,
                                }}>
                                <Text style={{fontWeight: '600', fontSize: 20}}>
                                  {txt}
                                </Text>
                                <TouchableOpacity
                                  style={touchable}
                                  onPress={() => {
                                    setGetDate(day);
                                  }}>
                                  <Text style={textStyles}>
                                    {day.getDate()}
                                  </Text>
                                </TouchableOpacity>
                              </View>
                            );
                          })}
                        </View>
                      </View>
                    );
                  })}
                </PagerView>
                <TouchableOpacity
                  style={{
                    width: '60%',
                    height: 60,
                    backgroundColor: '#135B61',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginHorizontal: 80,
                    borderRadius: 10,
                  }}
                  onPress={() => {
                    selectGroomer === null
                      ? ToastAndroid.show(
                          'Vui lòng chọn nhân viên!!',
                          ToastAndroid.SHORT,
                        )
                      : selectPets === null
                      ? ToastAndroid.show(
                          'Vui lòng chọn thú cưng!!',
                          ToastAndroid.SHORT,
                        )
                      : navigation.navigate('TimeAppointment', {
                          groomer: selectGroomer,
                          pets: selectPets,
                          weight: weight,
                          date: getdate,
                          service: serviceid,
                        });
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      paddingVertical: 5,
                      paddingHorizontal: 20,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{fontSize: 18, fontWeight: 500, color: 'white'}}>
                      Ngày {getdate.getDate()}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{fontSize: 18, fontWeight: 500, color: 'white'}}>
                        Tiếp tục
                      </Text>
                      <FontAwesome5
                        name="arrow-right"
                        style={{
                          fontSize: 20,
                          marginLeft: 5,
                          color: 'white',
                          paddingTop: 3,
                        }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default MaAppointment;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  weekDayText: {
    color: 'gray',
    marginBottom: 5,
  },
  changetouch: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '100%',
  },
  label: {fontWeight: '600', fontSize: 20, color: 'black'},
  selectLabel: {
    color: 'white',
  },
  touchable: {
    borderRadius: 20,
    padding: 5,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedTouchable: {
    backgroundColor: '#D4AA05',
  },
});
