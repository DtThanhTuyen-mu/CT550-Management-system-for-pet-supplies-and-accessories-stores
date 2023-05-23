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
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdateAddress = ({navigation, route}) => {
  const infoCustomer = route.params;

  const [fullname, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const UpdateInfo = async () => {

    await axios
      .put(
        'http://10.0.2.2:3000/api/customer=' + infoCustomer.email + '/update',
        {
          fullname,
          phone,
          address,
        },
      )
      .then(async res => {
        const temp = res?.data.customer;
        console.log('Cap nhat thong tin: ', temp);
        await AsyncStorage.removeItem('infoCustomer');
        await AsyncStorage.setItem('infoCustomer', JSON.stringify(temp));
        ToastAndroid.show('Cập nhật địa chỉ thành công', ToastAndroid.SHORT);
      });
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
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: '#1E7178',
        }}>
        <TouchableOpacity onPress={() => navigation.navigate('MyCart')}>
          <FontAwesome5
            name="arrow-left"
            size={22}
            style={{
              padding: 12,
              color: '#fff',
            }}></FontAwesome5>
        </TouchableOpacity>
        <Text style={{fontSize: 22, color: '#fff', fontWeight: 600}}>
          Cập nhật địa chỉ
        </Text>
        <View></View>
      </View>

      <View
        style={{
          flex: 1,
          padding: 10,
          backgroundColor: '#fff',
        }}>
        <View style={{marginBottom: 10}}>
          <Text style={{fontSize: 20, marginBottom: 2}}>Họ tên: </Text>
          <TextInput
            style={{
              borderBottomWidth: 0.5,
              borderColor: 'black',
              fontSize: 18,
              paddingVertical: 7,
              paddingHorizontal: 10,
            }}
            onChangeText={text => setFullName(text)}
            placeholder="Nhập vào họ tên "></TextInput>
        </View>
        <View style={{marginBottom: 10}}>
          <Text style={{fontSize: 20, marginBottom: 2}}>Số điện thoại: </Text>
          <TextInput
            style={{
              borderBottomWidth: 0.6,
              borderColor: 'black',
              fontSize: 18,
              paddingVertical: 7,
              paddingHorizontal: 10,
            }}
            onChangeText={text => setPhone(text)}
            placeholder="Nhập số điện thoại "></TextInput>
        </View>
        <View style={{marginBottom: 10}}>
          <Text style={{fontSize: 20, marginBottom: 2}}>Địa chỉ: </Text>
          <TextInput
            style={{
              borderBottomWidth: 0.7,

              borderColor: 'black',
              fontSize: 18,
              paddingVertical: 7,
              paddingHorizontal: 10,
            }}
            onChangeText={text => setAddress(text)}
            placeholder="Nhập vào địa chỉ: "></TextInput>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginVertical: 10,
          }}>
          <Text
            style={{
              width: '60%',
              height: 40,
              backgroundColor: '#E85C00',
              textAlign: 'center',
              paddingVertical: 7,
              fontSize: 20,
              borderRadius: 20,
              color: '#fff',
            }}
            onPress={() => UpdateInfo()}>
            Cập nhật
          </Text>
        </View>
      </View>
    </View>
  );
};

export default UpdateAddress;

const styles = StyleSheet.create({});
