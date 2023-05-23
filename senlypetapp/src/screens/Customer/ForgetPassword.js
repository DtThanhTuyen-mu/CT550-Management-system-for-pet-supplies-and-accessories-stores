import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ForgetPassword = ({navigation}) => {
  const [customerdata, setCustomerData] = useState({
    email: '',
    password: '',
  });
  const [errormsg, setErrormsg] = useState(null);
  const [pwdHidden, setPWDHidden] = useState(true);

  const handleForgetPassword = async () => {
    console.log('email is phone: ', customerdata.email);
    console.log('password: ', customerdata.password);
    if (customerdata.email === '' || customerdata.password === '') {
      setErrormsg('Vui lòng điền đầy đủ các trường');
      return;
    } else {
      await axios
        .post('http://10.0.2.2:3000/api/customer/forgetpassword', {
          phone: customerdata.email,
          password: customerdata.password,
        })
        .then(async res => {
          const temp = res?.data;
          if (temp) {
            // console.log('Đặt lại mật khẩu thành công');
            ToastAndroid.show(
              'Chúc mừng! Đặt lại mật khẩu thành công',
              ToastAndroid.SHORT,
            );
            setTimeout(() => {
              navigation.navigate('LoginCustomer');
            }, 1000);
          } else {
            // console.log('Đặt lại mật khẩu không thành công');
            setErrormsg(temp.Error);
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
          <Text style={head1}> Quên mật khẩu</Text>
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
                backgroundColor: '#FFB0CC',
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
            {/* <Text
              style={link}
              onPress={() => navigation.navigate('ForgetPassword')}>
              Quên mật khẩu?
            </Text> */}
          </View>
          <Text style={button1} onPress={() => handleForgetPassword()}>
            Cập nhật
          </Text>
        </View>
      </View>
    </View>
  );
};

export default ForgetPassword;

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
