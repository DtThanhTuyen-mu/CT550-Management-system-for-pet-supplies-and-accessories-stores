import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';

const FieldInfo = ({title, content}) => (
  <View
    style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      borderStyle: 'dashed',
      borderBottomWidth: 0.5,
      paddingTop: 10,
    }}>
    <Text
      style={{
        fontSize: 20,
        fontWeight: 500,
      }}>
      {title}
    </Text>
    <View style={{display: 'flex', width: '78%'}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 400,
          textAlign: 'justify',
          paddingLeft: 5,
        }}>
        {content}
      </Text>
    </View>
  </View>
);

const ServicePayment = ({navigation, route}) => {
  const [weight, setWeight] = useState('');
  const [price, setPrice] = useState('');
  const [errormsg, setErrormsg] = useState(null);

  const info = route.params;
  console.log('info thong qua route: ', info);

  const payment = async infoS => {
    // console.log('Thong tin thanh toan dich vu: ', infoS);
    if (weight === '' || price === '') {
      setErrormsg('All fiels are require');
      ToastAndroid.show('All fiels are require', ToastAndroid.SHORT);
      return;
    } else {
      await axios
        .post('http://10.0.2.2:3000/api/staff/service/payment', {
          idCustomer: infoS.idCustomer._id,
          idStaff: infoS.idStaff._id,
          idService: infoS.idService._id,
          weight: weight,
          total: price,
        })
        .then(res => {
          const pS = res?.data;
          console.log('Thanh toan DV: ', pS);
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    }
    await axios
      .put('http://10.0.2.2:3000/api/customer/schedule/status=complete', {
        idSchedule: infoS._id,
      })
      .then(res => {
        const putStatus = res?.data;
      })
      .catch(error => {
        console.log('Error: ', error);
      });
    ToastAndroid.show('Thanh toán thành công', ToastAndroid.SHORT);
    setTimeout(() => {
      navigation.navigate('HomeStaff');
    }, 1500);
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
          paddingHorizontal: 15,
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: '#1E7178',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5
            name="arrow-left"
            size={22}
            style={{
              color: '#fff',
              padding: 12,
            }}></FontAwesome5>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: '#fff',
          }}>
          Thanh toán
        </Text>
        <View></View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            marginTop: 20,
            width: '92%',
            alignSelf: 'center',
          }}>
          <FieldInfo title="Họ tên KH:" content={info.idCustomer.fullname} />
          <FieldInfo title="Họ tên NV:" content={info.idStaff.fullname} />
          <View
            style={{
              flexDirection: 'row',
              borderStyle: 'dashed',
              borderBottomWidth: 0.5,
              paddingTop: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
                marginRight: 10,
              }}>
              Ngày:
            </Text>
            <Text style={{fontSize: 20, fontWeight: 400}}>
              {new Date().getDate() +
                '/' +
                (new Date().getMonth() + 1) +
                '/' +
                new Date().getFullYear()}
            </Text>
          </View>
          <FieldInfo title="Dịch vụ:" content={info.idService.title} />
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
                marginRight: 10,
              }}>
              Trọng lượng :
            </Text>
            <TextInput
              style={{
                textAlign: 'right',
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                width: '50%',
                height: '100%',
                paddingHorizontal: 10,
                paddingVertical: 5,
                fontSize: 18,
              }}
              placeholder="2.5kg"
              onChangeText={text => setWeight(text)}></TextInput>
          </View>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 10,
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 500,
                marginRight: 10,
              }}>
              Trọng lượng:
            </Text>
            <TextInput
              style={{
                textAlign: 'right',
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                width: '50%',
                height: '100%',
                paddingHorizontal: 10,
                paddingVertical: 5,
                fontSize: 18,
              }}
              placeholder="2.5kg"
              onChangeText={text => setWeight(text)}></TextInput>
          </View>
          <View style={{flexDirection: 'row', marginTop: 7}}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 400,
                paddingVertical: 5,
                marginRight: 10,
              }}>
              Giá:
            </Text>
            <TextInput
              style={{
                textAlign: 'right',
                backgroundColor: '#fff',
                borderBottomWidth: 1,
                borderBottomColor: 'black',
                width: '50%',
                height: '100%',
                paddingHorizontal: 10,
                paddingVertical: 5,
                fontSize: 18,
              }}
              placeholder="150000"
              onChangeText={text => setPrice(text)}></TextInput>
          </View>
        </View>
        <View
          style={{
            marginTop: 50,
            width: '60%',
            height: 50,
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: 'red',
          }}>
          <TouchableOpacity
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              textAlign: 'center',
            }}
            onPress={() => payment(info)}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 500,
                color: '#fff',
              }}>
              Thanh toán
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default ServicePayment;

const styles = StyleSheet.create({});
