import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import {button1} from '../../common/button';

import {
  head1,
  formgroup,
  input,
  link,
  link2,
  labdel,
  errormessage,
} from '../../common/formcss';
import {TextInput} from 'react-native';
import {ScrollView} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Signin = ({navigation}) => {
  const [fdata, setFdata] = useState({
    fullname: '',
    password: '',
    prepassword: '',
    phone: '',
    address: '',
  });
  const [errormsg, setErrormsg] = useState(null);
  const Sendtobackend = () => {
    if (
      fdata.fullname === '' ||
      fdata.password === '' ||
      fdata.prepassword === '' ||
      fdata.phone === '' ||
      fdata.address === ''
    ) {
      setErrormsg('Vui lòng điền đầy đủ thông tin');
      return;
    } else {
      if (fdata.password !== fdata.prepassword) {
        setErrormsg('Mật khẩu không trùng khớp');
        return;
      } else {
        fetch('http://10.0.2.2:3000/api/customer/sigin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(fdata),
        })
          .then(res => res.json())
          .then(data => {
            console.log(data);
            if (data.error) {
              setErrormsg(data.error);
            } else {
              alert('Chúc mừng tạo tài khoản thành công!!!');
              navigation.navigate('LoginCustomer');
            }
          });
      }
    }
  };
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '100007943829-uk1gh99v5krtg0duh28sd6cotl5aare4.apps.googleusercontent.com',
    });
  }, []);
  // Somewhere in your code
  const googlelogin = async () => {
    console.log('0k lalaal Dang nhap bang google');
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('user info: ', userInfo);
      const user = userInfo.user;
      // console.log('user info: ', userInfo.user.email);
      // console.log('user info: ', userInfo.user.name);
      // console.log('user info: ', userInfo.user.photo);
      await axios
        .post('http://10.0.2.2:3000/api/customer/signin/google', {
          email: user.email,
          fullname: user.name,
          image: user.photo,
        })
        .then(async res => {
          console.log(res?.data);
          const customers = res?.data;
          if (customers.customer) {
            await AsyncStorage.setItem('tokenCustomer', userInfo.idToken);
            await AsyncStorage.setItem(
              'infoCustomer',
              JSON.stringify(customers.customer),
            );
            navigation.navigate('HomeCustomer');
          } else {
            setErrormsg(customers.Error);
          }
        });
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
        console.log('error: ', error);
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
        console.log('error: ', error);
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
        console.log('error: ', error);
      } else {
        // some other error happened
        console.log('error: ', error);
      }
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.s1}>
          <Image
            style={styles.logo}
            source={require('../../assets/image/logo.png')}
            resizeMode="center"
          />
          <Text style={styles.slogan}>Sen chưa phải là thiên đàng,</Text>
          <Text style={styles.slogan}>
            Senly mới là thiên đàng dành cho Pet
          </Text>
        </View>
        <ScrollView style={styles.s2} showsVerticalScrollIndicator={false}>
          <Text style={head1}> Tạo tài khoản mới </Text>
          <Text style={link2}>
            Bạn đã có tài khoản?
            <Text
              style={link}
              onPress={() => navigation.navigate('LoginCustomer')}>
              Đăng nhập.
            </Text>
          </Text>
          {errormsg ? <Text style={errormessage}> {errormsg}</Text> : null}
          <View style={formgroup}>
            <Text style={labdel}> Họ tên </Text>
            <TextInput
              style={input}
              placeholder="Nhập vào họ tên"
              onPressIn={() => setErrormsg(null)}
              onChangeText={text =>
                setFdata({...fdata, fullname: text})
              }></TextInput>
          </View>

          <View style={formgroup}>
            <Text style={labdel}>Mật khẩu</Text>
            <TextInput
              style={input}
              placeholder="********"
              onPressIn={() => setErrormsg(null)}
              secureTextEntry={true}
              onChangeText={text =>
                setFdata({...fdata, password: text})
              }></TextInput>
          </View>
          <View style={formgroup}>
            <Text style={labdel}>Xác nhận mật khẩu</Text>
            <TextInput
              style={input}
              placeholder="********"
              secureTextEntry={true}
              onPressIn={() => setErrormsg(null)}
              onChangeText={text =>
                setFdata({...fdata, prepassword: text})
              }></TextInput>
          </View>
          <View style={formgroup}>
            <Text style={labdel}>Số điện thoại</Text>
            <TextInput
              style={input}
              placeholder="Nhập vào số điện thoại"
              onPressIn={() => setErrormsg(null)}
              onChangeText={text =>
                setFdata({...fdata, phone: text})
              }></TextInput>
          </View>
          <View style={formgroup}>
            <Text style={labdel}> Địa chỉ</Text>
            <TextInput
              style={input}
              placeholder="Nhập vào địa chỉ"
              onPressIn={() => setErrormsg(null)}
              onChangeText={text =>
                setFdata({...fdata, address: text})
              }></TextInput>
          </View>
          <TouchableOpacity onPress={() => Sendtobackend()}>
            <Text style={button1}>Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => googlelogin()}>
            <Text
              style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: 10,
                borderRadius: 5,
                fontSize: 20,
                minWidth: 150,
                textAlign: 'center',
                margin: 10,
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={require('../../assets/image/google.png')}
              />
              Đăng ký với Google
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
};

export default Signin;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#135B61',
    width: '100%',
    height: '100%',
  },
  container1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    heigh: '100%',
    width: '100%',
  },
  text: {
    color: '#fff',
    fontSize: 35,
    marginVertical: 50,
  },
  logo: {
    width: '50%',
    height: '50%',
    borderRadius: 20,
    aspectRatio: 1,
    marginBottom: 10,
  },
  slogan: {
    width: '65%',
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
  s1: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '20%',
    borderColor: 'yellow',
  },
  s2: {
    display: 'flex',
    backgroundColor: '#fff',
    height: '80%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingTop: 8,
  },
  hp: {
    display: 'flex',
    alignItems: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
