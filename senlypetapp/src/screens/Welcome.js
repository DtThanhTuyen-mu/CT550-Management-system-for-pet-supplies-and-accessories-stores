import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React from 'react';
import {button1} from '../common/button';
const Welcome = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        // backgroundColor="#1E7178"
        backgroundColor="#135B61"
        // translucent={true}
      />
      <View style={styles.container1}>
        <Text style={styles.text}>Welcome SENLY PET !!!</Text>
        <Image
          style={styles.logo}
          source={require('../assets/image/logo.png')}
          resizeMode="center"
        />
        <Text style={styles.slogan}>Sen chưa phải là thiên đàng,</Text>
        <Text style={styles.slogan}>Senly mới là thiên đàng dành cho Pet</Text>
        <View style={{height: 50}}></View>
        <Text
          style={button1}
          onPress={() => navigation.navigate('LoginCustomer')}>
          Khách hàng
        </Text>
        <Text style={button1} onPress={() => navigation.navigate('LoginStaff')}>
          Nhân viên
        </Text>
      </View>
    </View>
  );
};

export default Welcome;

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
});
