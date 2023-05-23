import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {button1} from '../../common/button';
import {
  head1,
  formgroup,
  title,
  input,
  link,
  link2,
  errormessage,
} from '../../common/formcss';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';

const Login = ({navigation}) => {
  const [customerdata, setCustomerData] = useState({
    email: '',
    password: '',
  });
  const [pwdHidden, setPWDHidden] = useState(true);
  const [errormsg, setErrormsg] = useState(null);
  const LoginAccount = async () => {
    console.log(customerdata.email);
    console.log(customerdata.password);
    if (customerdata.email === '' || customerdata.password === '') {
      setErrormsg('Vui lòng điền đầy đủ thông tin');
      return;
    } else {
      await axios
        .post('http://10.0.2.2:3000/api/customer/login', {
          phone: customerdata.email,
          password: customerdata.password,
        })
        .then(async res => {
          console.log(res?.data);
          const customers = res?.data;
          if (customers.savedCustomer) {
            await AsyncStorage.setItem('tokenCustomer', customers.token);
            await AsyncStorage.setItem(
              'infoCustomer',
              JSON.stringify(customers.savedCustomer),
            );
            navigation.navigate('HomeCustomer');
          } else {
            setErrormsg(customers.Error);
          }
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    }
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '100007943829-uk1gh99v5krtg0duh28sd6cotl5aare4.apps.googleusercontent.com',
    });
  }, [navigation]);

  const LoginAccountGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('user info: ', userInfo);
      const user = userInfo.user;
      await axios
        .post('http://10.0.2.2:3000/api/customer/login/google', {
          email: user.email,
        })
        .then(async res => {
          console.log(res?.data);
          const customers = res?.data;
          if (customers.savedCustomer) {
            await AsyncStorage.setItem('tokenCustomer', userInfo.idToken);
            await AsyncStorage.setItem(
              'infoCustomer',
              JSON.stringify(customers.savedCustomer),
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
        <View style={styles.s2}>
          <Text style={head1}> Đăng nhập</Text>
          {errormsg ? <Text style={errormessage}> {errormsg}</Text> : null}
          <View style={formgroup}>
            <Text style={title}> Số điện thoại</Text>
            <TextInput
              style={input}
              placeholder="Nhập vào số điện thoại"
              onPressIn={() => setErrormsg(null)}
              onChangeText={text =>
                setCustomerData({...customerdata, email: text})
              }></TextInput>
          </View>
          <View style={formgroup}>
            <Text style={title}>Mật khẩu</Text>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                backgroundColor: '#F7B775',
                // backgroundColor: '#FFB0CC',
                borderRadius: 20,
              }}>
              <TextInput
                style={{
                  padding: 5,
                  paddingHorizontal: 10,
                  paddingVertical: 5,
                  flex: 1,
                }}
                placeholder="Nhập vào mật khẩu"
                onPressIn={() => setErrormsg(null)}
                secureTextEntry={pwdHidden ? true : false}
                onChangeText={text =>
                  setCustomerData({...customerdata, password: text})
                }
              />

              <TouchableOpacity
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setPWDHidden(!pwdHidden)}>
                {pwdHidden ? (
                  <FontAwesome5
                    name="eye-slash"
                    size={17}
                    marginLeft={10}
                    marginRight={10}
                  />
                ) : (
                  <FontAwesome5
                    name="eye"
                    size={17}
                    marginLeft={10}
                    marginRight={10}
                  />
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.hp}>
            <Text
              style={link}
              onPress={() => navigation.navigate('ForgetPassword')}>
              Quên mật khẩu?
            </Text>
          </View>
          <Text style={button1} onPress={() => LoginAccount()}>
            Đăng nhập
          </Text>
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
            }}
            onPress={() => LoginAccountGoogle()}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../../assets/image/google.png')}
            />
            Đăng nhập Google
          </Text>
          <Text style={link2}>
            Chưa có tài khoản?
            <Text
              style={link}
              onPressIn={() => setErrormsg(null)}
              onPress={() => navigation.navigate('RegisterCustomer')}>
              Tạo tài khoản.
            </Text>
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#135B61',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
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
    width: 125,
    height: 125,
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
    height: '40%',
    borderColor: 'yellow',
  },
  s2: {
    display: 'flex',
    backgroundColor: '#fff',
    height: '60%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
  },
  hp: {
    display: 'flex',
    alignItems: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 5,
  },
});
