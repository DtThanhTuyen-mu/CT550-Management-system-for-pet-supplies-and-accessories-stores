import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import VND from '../../components/Currency';
import {format} from 'date-fns';
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
        fontWeight: 500,
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
const DetailScheduleOS = ({navigation, route}) => {
  const {infobill} = route.params;
  const [isLoading, setisLoading] = useState(true);

  const [bill, setBill] = useState([]);
  useEffect(() => {
    (async () => {
      await axios
        .get('http://10.0.2.2:3000/api/bill/id=' + infobill._id)
        .then(res => {
          const temp = res?.data.bill;
          setBill(temp);
        })
        .catch(error => {
          console.log('Error: ', error);
        })
        .finally(() => {
          setisLoading(false);
        });
    })();
  }, []);
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
          Chi tiết hoá đơn
        </Text>
        <View></View>
      </View>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        {isLoading ? null : (
          <View
            style={{
              width: '92%',
              alignSelf: 'center',
              justifyContent: 'center',
            }}>
            <FieldInfo title="Họ tên KH:" content={bill.idCustomer.fullname} />
            <FieldInfo title="Họ tên NV:" content={bill.idStaff.fullname} />
            <FieldInfo title="Dịch vụ:" content={bill.idService.title} />
            <FieldInfo
              title="Ngày:"
              content={format(new Date(bill.date), 'dd/MM/yyyy')}
            />
            <FieldInfo title="Thời gian:" content={bill.time} />
            <FieldInfo title="Cân nặng:" content={bill.weight} />
            <FieldInfo title="Tổng tiền:" content={VND.format(bill.total)} />
          </View>
        )}
      </View>
    </View>
  );
};

export default DetailScheduleOS;

const styles = StyleSheet.create({});
