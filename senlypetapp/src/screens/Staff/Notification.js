import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import format from 'date-fns/format';

const Notification = () => {
  const [notification, setNotification] = useState([]);
  const [infoStaff, setInfoStaff] = useState([]);

  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('infoStaff');
      jsonValue = JSON.parse(jsonValue);
      console.log(' Thong tin nguoi dung la nhan vien set : ', jsonValue);
      if (jsonValue) {
        setInfoStaff(jsonValue);
        getNotification(jsonValue._id);
      }
    })();
  }, []);

  const getNotification = async id => {
    await axios
      .get('http://10.0.2.2:3000/api/staff/id=' + id + '/notification')
      .then(res => {
        const temp = res?.data.notification;
        setNotification(temp);
        console.log('All notification cua nhan vien', temp);
      });
  };
  const reload = () => {
    getNotification(infoStaff._id);
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
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: '#1E7178',
        }}>
        <Text
          style={{
            width: '85%',
            fontSize: 22,
            fontWeight: 600,
            color: '#fff',
            textAlign: 'center',
            paddingBottom: 5,
          }}>
          Thông báo
        </Text>
        <TouchableOpacity onPress={() => reload()}>
          <Ionicons
            name="sync-sharp"
            style={{textAlign: 'right', fontSize: 22, color: '#fff'}}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={{
          marginBottom: 10,
        }}>
        {notification &&
          notification.map((n, k) => (
            <View key={k} style={{paddingTop: 10}}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '92%',
                  height: 95,
                  backgroundColor: '#fff',
                  paddingVertical: 10,
                  paddingLeft: 8,
                  marginHorizontal: 15,
                }}>
                <Image
                  source={{uri: n.idCustomer.image}}
                  resizeMode="cover"
                  style={{
                    width: '20%',
                    height: '90%',
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 50,
                  }}
                />
                <View style={{flex: 1, marginLeft: 6, paddingRight: 10}}>
                  <View style={{marginBottom: 5}}>
                    <Text
                      style={{
                        width: '100%',
                        fontSize: 15,
                        height: 62,
                        textAlign: 'justify',
                      }}>
                      {n.sender} {n.idCustomer.fullname} {n.body}
                      {format(new Date(n.idSchedule.date), 'dd/MM/yyyy')}
                    </Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: -10,
                    }}>
                    <Text>
                      {format(new Date(n.date), 'dd/MM/yyyy')} {n.time}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
