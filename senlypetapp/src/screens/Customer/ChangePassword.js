import axios from 'axios';
import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const ChangePassword = ({navigation, route}) => {
  const customer = route.params;
  const [password, setPassword] = useState('');
  const [passworded, setPassworded] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pwdCHidden, setCPWDHidden] = useState(true);
  const [pwdHidden, setPWDHidden] = useState(true);
  const [pcwdHidden, setPCWDHidden] = useState(true);
  const [errormsg, setErrormsg] = useState(null);

  const handleChangePassword = async () => {
    if (passworded === '' || password === '' || confirmPassword === '') {
      setErrormsg('Vui lòng điền đầy đủ các trường ');
      return;
    } else if (password !== confirmPassword) {
      setErrormsg('Mật khẩu mới không trùng khớp.');
    } else {
      setErrormsg('');
      // console.log('ok đổi mật khẩu thàng công!!');
      await axios
        .post('http://10.0.2.2:3000/api/customer/changepassword', {
          phone: customer.phone,
          password,
          passworded,
        })
        .then(res => {
          if (res?.data.Error) {
            setErrormsg(res?.data.Error);
          } else {
            // console.log('ok đổi mật khẩu thàng công!!');
            ToastAndroid.show(
              'Chúc mừng! Đổi mật khẩu thành công',
              ToastAndroid.SHORT,
            );
            setTimeout(() => {
              navigation.navigate('InfoAccount', customer);
            }, 1000);
          }
        });
    }
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
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: '#1E7178',
        }}>
        <TouchableOpacity
          style={{width: 50, height: 50, marginLeft: 15}}
          onPress={() => navigation.goBack()}>
          <FontAwesome5
            name="arrow-left"
            size={18}
            style={{
              padding: 12,
              color: '#fff',
            }}></FontAwesome5>
        </TouchableOpacity>
        <Text
          style={{
            width: '85%',
            fontSize: 21,
            fontWeight: 600,
            color: '#fff',
            textAlign: 'center',
            paddingBottom: 5,
          }}>
          Đổi mật khẩu
        </Text>
        <View></View>
      </View>
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            width: '85%',
            heigh: '50%',
            marginLeft: 30,
            marginTop: 20,
          }}>
          <Text style={{fontSize: 18}}> Nhập mật khẩu hiện tại: </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 0.5,
            }}>
            <TextInput
              style={{
                flex: 1,
                fontSize: 20,
                marginLeft: 10,
              }}
              autoCapitalize="none"
              placeholder="*******"
              onChangeText={text => setPassworded(text)}
              secureTextEntry={pwdCHidden ? true : false}
            />
            <TouchableOpacity
              style={{
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'red',
              }}
              onPress={() => setCPWDHidden(!pwdCHidden)}>
              {pwdCHidden ? (
                <FontAwesome5
                  name="eye-slash"
                  size={24}
                  marginLeft={10}
                  marginRight={10}
                />
              ) : (
                <FontAwesome5
                  name="eye"
                  size={24}
                  marginLeft={10}
                  marginRight={10}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: '85%',
            heigh: '50%',
            marginLeft: 30,
            marginTop: 20,
          }}>
          <Text style={{fontSize: 18}}> Nhập mật khẩu mới: </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 0.5,
            }}>
            <TextInput
              style={{
                flex: 1,
                fontSize: 20,
                marginLeft: 10,
              }}
              autoCapitalize="none"
              placeholder="*******"
              onChangeText={text => setPassword(text)}
              secureTextEntry={pwdHidden ? true : false}
            />
            <TouchableOpacity
              style={{
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'red',
              }}
              onPress={() => setPWDHidden(!pwdHidden)}>
              {pwdHidden ? (
                <FontAwesome5
                  name="eye-slash"
                  size={24}
                  marginLeft={10}
                  marginRight={10}
                />
              ) : (
                <FontAwesome5
                  name="eye"
                  size={24}
                  marginLeft={10}
                  marginRight={10}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            width: '85%',
            heigh: '50%',
            marginLeft: 30,
            marginTop: 20,
            borderColor: 'red',
          }}>
          <Text style={{fontSize: 18}}> Nhập lại mật khẩu mới: </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              borderBottomWidth: 0.5,
            }}>
            <TextInput
              style={{
                flex: 1,
                fontSize: 20,
                marginLeft: 10,
              }}
              autoCapitalize="none"
              placeholder="*******"
              onChangeText={text => {
                setConfirmPassword(text);
              }}
              secureTextEntry={pcwdHidden ? true : false}
            />
            <TouchableOpacity
              style={{
                aspectRatio: 1,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: 'red',
              }}
              onPress={() => setPCWDHidden(!pcwdHidden)}>
              {pcwdHidden ? (
                <FontAwesome5
                  name="eye-slash"
                  size={24}
                  marginLeft={10}
                  marginRight={10}
                />
              ) : (
                <FontAwesome5
                  name="eye"
                  size={24}
                  marginLeft={10}
                  marginRight={10}
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          {errormsg ? (
            <Text
              style={{
                width: '80%',
                marginTop: 10,
                color: 'white',
                backgroundColor: '#F50057',
                fontSize: 15,
                textAlign: 'center',
                borderRadius: 10,
                paddingVertical: 5,
              }}>
              {errormsg}
            </Text>
          ) : null}
        </View>

        <View
          style={{
            width: '100%',
            height: 80,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              height: '50%',
              width: '70%',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#E85C00',
              borderRadius: 20,
            }}
            onPress={() => handleChangePassword()}>
            <Text style={{fontSize: 18, color: '#fff'}}> Đổi mật khẩu</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
export default ChangePassword;
const styles = StyleSheet.create({});
