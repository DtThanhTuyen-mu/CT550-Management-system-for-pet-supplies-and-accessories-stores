import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Image,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import format from 'date-fns/format';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Notification = ({navigation}) => {
  const [isModalVisible, setisModalVisible] = useState(false);

  const [infoCustomer, setInfoCustomer] = useState([]);
  const [notification, setNotification] = useState([]);
  const [idNotification, setidNotification] = useState([]);
  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };
  const handleRequire = props => {
    setidNotification(props.no);
    console.log('idSchedule: ', idNotification);
    changeModalVisible(true);
  };

  // Dong modal,
  const closeModal = async bool => {
    changeModalVisible(bool);
  };
  const handleRequest = async bool => {
    await axios
      .put(
        'http://10.0.2.2:3000/api/customer/notification/id=' +
          idNotification._id +
          '/status=confirm',
      )
      .then(res => {
        console.log('Dat lai trang thai hoan thanh SUCC');
      });

    await axios
      .post(
        'http://10.0.2.2:3000/api/customer/id=' +
          infoCustomer._id +
          '/request/schedule',
        {
          idSchedule: idNotification.idSchedule._id,
          idStaff: idNotification.idStaff._id,
        },
      )
      .then(res => {
        console.log('Them thon bao lai cho nhan vien SUCC');
      });
    changeModalVisible(bool);
    getNotification(infoCustomer._id);
  };
  const getNotification = async id => {
    await axios
      .get('http://10.0.2.2:3000/api/customer/id=' + id + '/notification')
      .then(res => {
        const temp = res?.data.notification;
        setNotification(temp);
        console.log('All notification cua nguoi dung', temp);
      });
  };
  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('infoCustomer');
      jsonValue = JSON.parse(jsonValue);
      console.log(' Thong tin nguoi dung la nhan vien set : ', jsonValue);
      if (jsonValue) {
        setInfoCustomer(jsonValue);
        getNotification(jsonValue._id);
      }
    })();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {});
    return unsubscribe;
  }, [navigation]);
  const reload = () => {
    getNotification(infoCustomer._id);
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
                  height: 104,
                  backgroundColor: '#fff',
                  paddingVertical: 10,
                  paddingLeft: 8,
                  marginHorizontal: 15,
                }}>
                <Image
                  source={{uri: n.idStaff.image}}
                  resizeMode="cover"
                  style={{
                    width: '20%',
                    height: '90%',
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 50,
                    marginTop: 5,
                  }}
                />
                <View style={{flex: 1, marginLeft: 6, paddingRight: 10}}>
                  {n.idSchedule.reSchedule !== null ? (
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          width: '100%',
                          fontSize: 15,
                          textAlign: 'justify',
                          marginBottom: -13,
                        }}>
                        {n.sender} {n.idStaff.fullname} {n.body}
                        gốc <Text></Text>
                        {format(new Date(n.idSchedule.date), 'dd/MM/yyyy')}
                        <Text> </Text> {n.idSchedule.time}
                      </Text>
                    </View>
                  ) : (
                    <View style={{flexDirection: 'row'}}>
                      <Text
                        style={{
                          width: '100%',
                          fontSize: 15,
                          textAlign: 'justify',
                          marginBottom: 3,
                        }}>
                        {n.sender} {n.idStaff.fullname} {n.body}
                        {format(new Date(n.idSchedule.date), 'dd/MM/yyyy')}
                        <Text> </Text>
                        {n.idSchedule.time}
                      </Text>
                    </View>
                  )}

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>
                      {format(new Date(n.date), 'dd/MM/yyyy')} {n.time}
                    </Text>
                    {n.status === 'Chấp nhận' ? (
                      <TouchableOpacity
                        onPress={() =>
                          handleRequire({
                            no: n,
                            isModalVisible,
                          })
                        }
                        style={{
                          backgroundColor: '#98afc7',
                          borderColor: '#98afc7',

                          borderWidth: 0.2,
                          borderRadius: 10,
                          paddingHorizontal: 8,
                          paddingVertical: 1,
                        }}>
                        <Text style={{margin: 2, color: '#fff'}}>
                          {n.status}
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        style={{
                          backgroundColor: '#E85C00',
                          borderWidth: 0.2,
                          borderColor: '#E85C00',
                          paddingHorizontal: 8,
                          paddingVertical: 1,
                          borderRadius: 10,
                        }}>
                        <Text style={{margin: 2, color: '#fff'}}>
                          {n.status}
                        </Text>
                      </TouchableOpacity>
                    )}
                  </View>
                </View>
              </View>
            </View>
          ))}
      </ScrollView>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={() => changeModalVisible(false)}>
        <View
          disabled={true}
          style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <View
            style={{
              height: HEIGHT - 640,
              width: WIDTH - 100,
              paddingTop: 10,
              backgroundColor: '#fff',
              borderRadius: 10,
              elevation: 6,
            }}>
            <View style={{alignItems: 'center'}}>
              <Text
                style={{
                  margin: 5,
                  fontSize: 20,
                  fontWeight: 'bold',
                  color: '#000',
                }}>
                Xác nhận
              </Text>
            </View>
            <View
              style={{
                height: '35%',
                alignItems: 'center',
                justifyContent: 'center',
                paddingHorizontal: 30,
              }}>
              <Text
                style={{
                  justifyContent: 'center',
                  alignSelf: 'center',
                  textAlign: 'center',
                  fontSize: 18,
                }}>
                Đồng ý với yêu cầu của nhân viên vui lòng chọn OK
              </Text>
            </View>
            <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  alignItems: 'center',
                  borderTopWidth: 0.2,
                  borderRightWidth: 0.5,
                }}
                onPress={() => closeModal(false, 'Cancel')}>
                <Text
                  style={{
                    margin: 5,
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: '#EB0000',
                  }}>
                  Cancel
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 10,
                  alignItems: 'center',
                  borderTopWidth: 0.2,
                }}
                onPress={() => handleRequest(false)}>
                <Text
                  style={{
                    margin: 5,
                    fontSize: 16,
                    fontWeight: 'bold',
                    color: 'blue',
                  }}>
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Notification;

const styles = StyleSheet.create({});
