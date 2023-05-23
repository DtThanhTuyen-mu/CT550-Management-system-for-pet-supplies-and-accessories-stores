import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ToastAndroid,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogBox} from 'react-native';
import axios from 'axios';
import VND from '../../components/Currency';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);
const TimeAppointment = ({navigation, route}) => {
  const [indexTime, setIndexTime] = useState(0);
  const [contentTime, setContentTime] = useState('08:00AM');
  const [setTime, setSetTime] = useState('08:00AM');
  const [infoCustomer, setInfoCustomer] = useState([]);
  const [scheduleStaff, setScheduleStaff] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [scheduleId, setScheduleId] = useState();
  const [rescheduleId, setReScheduleId] = useState();
  const [scheduleCarySer, setScheduleCarySer] = useState();
  const [preOPre, setPreOPre] = useState();
  const [pre, setPre] = useState();

  const [priceS, setPriceS] = useState([]);
  const [price, setPrice] = useState(null);
  const {groomer, pets, weight, date, service} = route.params;
  let [w, setW] = useState(weight.match(/[0-9]+/)[0]);
  // setW(weight.match(/[0-9]+/)[0]);
  // console.log('Thong tin cua groomer ', pets + weight);
  // console.log('Thong tin cua ngay ', setTime);
  // console.log('Thong tin cua ngay ', w);
  const datatime = [
    '08:00AM',
    '08:30AM',
    '09:00AM',
    '09:30AM',
    '10:00AM',
    '10:30AM',
    '11:00AM',
    '11:30AM',
    '13:30PM',
    '14:00PM',
    '14:30PM',
    '15:00PM',
    '15:30PM',
    '16:00PM',
    '16:30PM',
    '17:00PM',
    '17:30PM',
    '18:00PM',
    '18:30PM',
    '19:00PM',
    '19:30PM',
    '20:00PM',
    '20:30PM',
  ];
  const [wtime, setWTime] = useState([]);
  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('infoCustomer');
      jsonValue = JSON.parse(jsonValue);
      if (jsonValue) {
        setInfoCustomer(jsonValue);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('scheduleId');
      console.log('schedule:', jsonValue);

      if (jsonValue) {
        setScheduleId(jsonValue);
      }
    })();
    (async () => {
      let jsonValue = await AsyncStorage.getItem('scheduleCarySer');
      if (jsonValue) {
        setScheduleCarySer(jsonValue);
      }
    })();
    (async () => {
      let jsonValue = await AsyncStorage.getItem('rescheduleId');
      if (jsonValue) {
        console.log('reschedule:', jsonValue);
        setReScheduleId(jsonValue);
      }
    })();
    (async () => {
      let jsonValue = await AsyncStorage.getItem('preOpre');
      if (jsonValue) {
        console.log('preOpre: ', jsonValue);
        setPreOPre(jsonValue);
      }
    })();
    (async () => {
      let jsonValue = await AsyncStorage.getItem('pre');
      if (jsonValue) {
        console.log('pre: ', jsonValue);
        setPre(jsonValue);
      }
    })();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getDate();
    });

    return unsubscribe;
  }, [navigation]);

  //Lấy dịch vụ theo id de lay gia
  useEffect(() => {
    (async () => {
      await axios
        .get('http://10.0.2.2:3000/api/service/' + service)
        .then(res => {
          const temp = res?.data.service;
          console.log('service by id : ', temp.price);
          setPriceS(temp.price);
        });
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await axios
        .get('http://10.0.2.2:3000/api/service=' + service + '/weight=' + w)
        .then(res => {
          const temp = res?.data.pr;
          setPrice(temp);
        });
    })();
  }, []);

  const getDate = async () => {
    await axios
      .post('http://10.0.2.2:3000/api/staff/' + groomer._id + '/schedule', {
        idStaff: groomer._id,
        date: date,
      })
      .then(res => {
        const scheduleSta = res?.data;
        setScheduleStaff(scheduleSta);
      })
      .catch(error => {
        console.log('Error: ', error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  // tạo mới lịch hẹn
  const MaSchedule = async () => {
    navigation.navigate('ConfirmSchedule', {
      groomer,
      date,
      setTime,
      service,
      weight,
      price,
      pets,
    });
   
};

  // hẹn lại lịch hẹn
  const ReSchedule = async () => {
    // có kiểm tra nếu có tồn tại $set, ko tồn tạo thì tạo mới
    if (scheduleCarySer === '640fde9860c354b7006669f2') {
      console.log(' lich hen cac lan tiep theo chi dv goi');
      // tao ms lich hen lai khi chua co
      await axios
        .post('http://10.0.2.2:3000/api/customer/reschedule', {
          idSchedule: scheduleId,
          idReSchedule: rescheduleId,
          date: date,
          time: setTime,
        })
        .then(async res => {
          const rechedule = res?.data;
          console.log(' Data reSchedule: ', rechedule);
          ToastAndroid.show(
            'Chúc mừng! Bạn đã dời lại lịch hẹn thành công',
            ToastAndroid.SHORT,
          );
        })
        .catch(error => {
          console.log('Error: ', error);
        });
      if (preOPre !== 'preOpre') {
        await axios
          .put(
            'http://10.0.2.2:3000/api/customer/schedule/status=6&&noaddtime',
            {
              idSchedule: scheduleId,
              idStaff: groomer._id,
            },
          )
          .then(async res => {
            console.log('ok');
            await AsyncStorage.removeItem('scheduleId');
            await AsyncStorage.removeItem('rescheduleId');
            await AsyncStorage.removeItem('scheduleCarySer');
            await AsyncStorage.removeItem('preOpre');
            await AsyncStorage.removeItem('pre');
            setTimeout(() => {
              navigation.navigate('HomeCustomer');
            }, 500);
          })
          .catch(error => {
            console.log('Error: ', error);
          });
      } else {
        await axios
          .put('http://10.0.2.2:3000/api/customer/schedule/status=6&&addtime', {
            idSchedule: scheduleId,
            idStaff: groomer._id,
          })
          .then(async res => {
            console.log('ok');
            await AsyncStorage.removeItem('scheduleId');
            await AsyncStorage.removeItem('rescheduleId');
            await AsyncStorage.removeItem('preOpre');
            await AsyncStorage.removeItem('scheduleCarySer');
            setTimeout(() => {
              navigation.navigate('HomeCustomer');
            }, 500);
          })
          .catch(error => {
            console.log('Error: ', error);
          });
      }
    } else {
      await axios
        .post('http://10.0.2.2:3000/api/customer/reschedule', {
          idSchedule: scheduleId,
          idReSchedule: rescheduleId,
          date: date,
          time: setTime,
        })
        .then(async res => {
          const rechedule = res?.data;
          console.log(' Data reSchedule: ', rechedule);
          ToastAndroid.show(
            'Chúc mừng! Bạn đã dời lại lịch hẹn thành công',
            ToastAndroid.SHORT,
          );
          await AsyncStorage.removeItem('preOpre');
        })
        .catch(error => {
          console.log('Error: ', error);
        });
      await axios
        .put('http://10.0.2.2:3000/api/customer/schedule/status=-1', {
          idSchedule: scheduleId,
          idStaff: groomer._id,
        })
        .then(async res => {
          await AsyncStorage.removeItem('scheduleId');
          await AsyncStorage.removeItem('rescheduleId');
          setTimeout(() => {
            navigation.navigate('HomeCustomer');
          }, 500);
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    }
    await AsyncStorage.removeItem('scheduleId');
    await AsyncStorage.removeItem('rescheduleId');
    await AsyncStorage.removeItem('scheduleCarySer');
    await AsyncStorage.removeItem('preOpre');
    await AsyncStorage.removeItem('pre');
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
              color: '#fff',
              padding: 12,
            }}></FontAwesome5>
        </TouchableOpacity>
        <Text style={{fontSize: 21, color: '#fff', fontWeight: 600}}>
          Thời gian hẹn
        </Text>
        <View></View>
      </View>
      <View style={{padding: 20}}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
          Chọn thời gian cho cuộc hẹn
        </Text>
        <FlatList
          numColumns={3}
          data={scheduleStaff.length === 0 ? datatime : scheduleStaff}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setIndexTime(index);
                  setContentTime(item);
                }}
                style={[
                  styles.timeSlot,
                  {backgroundColor: indexTime == index ? '#257177' : '#98AFC7'},
                ]}>
                <Text style={{color: indexTime == index ? '#FFF' : 'white'}}>
                  {item}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {(scheduleCarySer && scheduleCarySer === '640fde9860c354b7006669f2') ||
      preOPre === 'preOpre' ||
      pre === 'pre' ? null : (
        <View
          style={{
            width: '100%',
            height: '5%',
            flexDirection: 'row',
            paddingHorizontal: 20,
            justifyContent: 'space-between',
            alignItems: 'center',
            position: 'relative',
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
            Tạm tính:{' '}
          </Text>
          <Text style={{fontSize: 20, color: 'gray'}}>
            {' '}
            {VND.format(price)}
          </Text>
        </View>
      )}
      <TouchableOpacity
        style={{
          marginTop: 20,
          marginBottom: 10,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPressIn={() => setSetTime(contentTime)}
        onPress={() => (scheduleId != null ? ReSchedule() : MaSchedule())}>
        <View
          style={{
            backgroundColor: '#E85C00',
            width: 200,
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            fontWeight: 500,
          }}>
          <Text style={{color: '#fff', fontSize: 20}}> Đặt lịch ngay</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default TimeAppointment;

const styles = StyleSheet.create({
  timeSlot: {
    width: '27%',
    height: 40,
    borderRadius: 10,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0572D4',
    fontSize: 22,
  },
  timeSlotLabel: {
    backgroundColor: 'green',
  },
});
