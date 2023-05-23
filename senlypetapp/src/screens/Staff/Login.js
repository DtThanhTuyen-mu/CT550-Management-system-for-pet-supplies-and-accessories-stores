import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {button1} from '../../common/button';
import {
  head1,
  formgroup,
  title,
  input,
  errormessage,
} from '../../common/formcss';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import AsyncStorage from '@react-native-async-storage/async-storage';
const Login = ({navigation}) => {
  const [staffdata, setStaffData] = useState({
    username: '',
    password: '',
  });
  const [pwdHidden, setPWDHidden] = useState(true);

  const [errormsg, setErrormsg] = useState(null);
  const LoginAccount = async () => {
    if (staffdata.username === '' || staffdata.password === '') {
      setErrormsg('Vui lòng điền đầy đủ các trường');
      return;
    } else {
      await axios
        .post('http://10.0.2.2:3000/api/staff/login', {
          username: staffdata.username,
          password: staffdata.password,
        })
        .then(async res => {
          const staffs = res?.data;
          if (staffs.token && staffs.savedStaff) {
            await AsyncStorage.setItem('tokenStaff', staffs.token);
            await AsyncStorage.setItem(
              'infoStaff',
              JSON.stringify(staffs.savedStaff),
            );
            navigation.navigate('HomeStaff');
          } else {
            setErrormsg(staffs.Error);
          }
        })
        .catch(error => {
          console.log('Error: ', error);
        });
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
            <Text style={title}> Mã nhân viên</Text>
            <TextInput
              style={input}
              placeholder="Nhập vào mã nhân viên"
              onPressIn={() => setErrormsg(null)}
              onChangeText={text =>
                setStaffData({...staffdata, username: text})
              }></TextInput>
          </View>
          <View style={formgroup}>
            <Text style={title}>Mật khẩu</Text>
            <View
              style={{
                flexDirection: 'row',
                display: 'flex',
                backgroundColor: '#F7B775',
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
                  setStaffData({...staffdata, password: text})
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
          <TouchableOpacity onPress={() => LoginAccount()}>
            <Text style={button1}> Đăng nhập</Text>
          </TouchableOpacity>
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
