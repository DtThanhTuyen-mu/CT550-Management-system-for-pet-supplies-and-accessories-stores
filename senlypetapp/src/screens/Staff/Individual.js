import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {SvgXml} from 'react-native-svg';
const xmllogout = `<svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
<path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12h-9.5m7.5 3l3-3-3-3m-5-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h5a2 2 0 002-2v-1"/>
</svg>`;

const xmlsetting = `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="style=linear">
<g id="setting">
<path id="vector" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#000000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path id="vector_2" d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.33 19.7 5.02 18.53 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z" stroke="#000000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</g>
</svg>`;
const xmlcheck = `<svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" id="check-mark-square-2" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><polyline id="primary" points="21 5 12 14 8 10" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></polyline><path id="primary-2" data-name="primary" d="M21,11v9a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H16" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></svg>`;

const Individual = ({navigation}) => {
  const [token, setToken] = useState();
  const [infoStaff, setInfoStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('infoStaff');
      jsonValue = JSON.parse(jsonValue);
      if (jsonValue) {
        setInfoStaff(jsonValue);
        setLoading(false);
      }
      const token = await AsyncStorage.getItem('tokenStaff');
      if (token) {
        setToken(token);
      }
    })();
  }, []);

  const LogOut = async () => {
    try {
      await AsyncStorage.removeItem('infoStaff');
      navigation.navigate('LoginStaff');
      await AsyncStorage.removeItem('tokenStaff');
      return true;
    } catch (exception) {
      return false;
    }
  };
  return (
    <View style={{flex: 1}}>
      {loading ? null : (
        <>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}>
            <View
              style={{
                width: '50%',
                height: '50%',
                marginBottom: 20,
              }}>
              <ImageBackground
                source={{uri: infoStaff.image}}
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View>
              <Text style={styles.text}>{infoStaff.fullname} </Text>
              <Text style={styles.textMail}>{infoStaff.email}</Text>
            </View>
          </View>
        </>
      )}
      <View style={{flex: 2, backgroundColor: '#fff'}}>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('DetailStaff', infoStaff)}>
          <SvgXml height={25} width={25} xml={xmlsetting} />

          <Text style={styles.itemText}>Thông tin tài khoản</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.item}
          onPress={() => navigation.navigate('MyScheduleStaff')}>
          <SvgXml height={25} width={25} xml={xmlcheck} />

          <Text style={styles.itemText}>Lịch hẹn hoàn thành</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <SvgXml height={25} width={25} xml={xmllogout} />
          <TouchableOpacity onPress={() => LogOut()}>
            <Text style={styles.itemText}>Đăng xuất</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Individual;

const styles = StyleSheet.create({
  boxHeader: {
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#135B61',
    borderBottomWidth: 2,
  },
  image: {
    width: 70,
    height: 70,
    margin: 10,
    borderRadius: 10,
  },
  imageBk: {
    width: 70,
    height: 70,
  },
  text: {
    fontSize: 18,
  },
  textMail: {
    fontSize: 16,
  },

  list: {},
  item: {
    padding: 14,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 18,
    paddingLeft: 10,
  },
});
