import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Modal,
  Dimensions,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';
import VND from '../../components/Currency';

import SimpleModal from '../../components/SimpleModal';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const FieldInfo = ({title, content}) => (
  <View
    style={{
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      borderStyle: 'dashed',
      borderBottomWidth: 0.5,
      paddingTop: 10,
    }}>
    <Text
      style={{
        fontSize: 20,
        fontWeight: 700,
      }}>
      {title}
    </Text>
    <View style={{display: 'flex', width: '78%'}}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 400,
          textAlign: 'justify',
          paddingLeft: 5,
        }}>
        {content}
      </Text>
    </View>
  </View>
);

const ConfirmSchedule = ({navigation, route}) => {
  const {groomer, date, setTime, service, weight, price, pets} = route.params;
  const [infoCustomer, setInfoCustomer] = useState([]);
  const [selectedWeight, setSelectedWeight] = useState(null);
  const [titleS, setTitleS] = useState('');
  const [dateS, setDateS] = useState(format(new Date(date), 'dd/MM/yyyy'));
  const [isModalVisible, setisModalVisible] = useState(false);

  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };
  const closeModal = bool => {
    changeModalVisible(bool);
  };
  console.log('groomer: ', groomer);
  console.log('date: ', date);
  console.log('dateS: ', dateS);
  console.log('setTime: ', setTime);
  console.log('service: ', service);

  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('infoCustomer');
      jsonValue = JSON.parse(jsonValue);
      if (jsonValue) {
        setInfoCustomer(jsonValue);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await axios
        .get('http://10.0.2.2:3000/api/service/' + service)
        .then(res => {
          const temp = res?.data.service;
          console.log('service title : ', temp.title);
          setTitleS(temp.title);
          const pricebw = temp.price;

          if (Number(weight.match(/[0-9]/)[0]) < 2) {
            setSelectedWeight(pricebw[0].weight);
          } else if (Number(weight.match(/[0-9]/)[0]) < 5) {
            setSelectedWeight(pricebw[1].weight);
          } else if (Number(weight.match(/[0-9]/)[0]) < 7) {
            setSelectedWeight(pricebw[2].weight);
          } else if (Number(weight.match(/[0-9]/)[0]) < 10) {
            setSelectedWeight(pricebw[3].weight);
          } else if (Number(weight.match(/[0-9]/)[0]) < 15) {
            setSelectedWeight(pricebw[4].weight);
          } else if (Number(weight.match(/[0-9]/)[0]) < 20) {
            setSelectedWeight(pricebw[5].weight);
          } else if (Number(weight.match(/[0-9]/)[0]) < 30) {
            setSelectedWeight(pricebw[6].weight);
          } else {
            setSelectedWeight(pricebw[7].weight);
          }
        });
    })();
  }, []);

  const booked = async () => {
    console.log('customer: ', infoCustomer._id);
    await axios
      .post(
        'http://10.0.2.2:3000/api/customer/' + infoCustomer._id + '/schedule',
        {
          idStaff: groomer._id,
          idPets: pets._id,
          idService: service,
          date: date,
          time: setTime,
          weight: selectedWeight,
          price,
        },
      )
      .then(async res => {
        const schedule = res?.data;
        console.log(' Data schedule: ', schedule);
        changeModalVisible(true);
      });
  };
  return (
    <View style={styles.container}>
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
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: '#1E7178',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5
            name="arrow-left"
            size={18}
            style={{
              color: '#fff',
              padding: 12,
            }}></FontAwesome5>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 21,
            fontWeight: 600,
            color: '#fff',
          }}>
          Xác nhận lịch hẹn
        </Text>
        <View></View>
      </View>
      <View style={styles.container3}>
        <View
          style={{
            marginTop: 20,
            width: '92%',
            alignSelf: 'center',
          }}>
          <FieldInfo title="Họ tên KH:" content={infoCustomer.fullname} />
          <FieldInfo title="Họ tên NV:" content={groomer.fullname} />
          <FieldInfo title="Dịch vụ:" content={titleS} />
          <FieldInfo title="Ngày:" content={dateS} />
          <FieldInfo title="Thời gian:" content={setTime} />
          <FieldInfo title="Cân nặng:" content={selectedWeight} />
          <FieldInfo title="Tạm tính:" content={VND.format(price)} />
        </View>
        <View
          style={{
            marginTop: 50,
            width: '60%',
            height: 50,
            justifyContent: 'center',
            alignSelf: 'center',
            backgroundColor: '#E85C00',
          }}>
          <TouchableOpacity
            style={{
              display: 'flex',
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              textAlign: 'center',
            }}
            onPress={() => booked(isModalVisible)}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 500,
                color: '#fff',
              }}>
              Đặt lịch
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        nRequestClose={() => changeModalVisible(false)}>
        <SimpleModal
          changeModalVisible={changeModalVisible}
          navigation={navigation}
        />
      </Modal>
    </View>
  );
};

export default ConfirmSchedule;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container2: {
    flex: 1,
    backgroundColor: 'blue',
  },
  container3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backr: {
    backgroundColor: 'orange',
  },
});
