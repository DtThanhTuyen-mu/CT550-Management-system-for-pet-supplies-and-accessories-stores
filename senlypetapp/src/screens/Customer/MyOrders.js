import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {format} from 'date-fns';
import axios from 'axios';

const MyOrders = ({navigation, route}) => {
  const Cusid = route.params;
  const [bill, setBill] = useState([]);
  useEffect(() => {
    (async () => {
      await axios
        .get(`http://10.0.2.2:3000/api/bill/customer/` + Cusid)
        .then(res => {
          const temp = res?.data.billC;
          console.log(temp);
          setBill(temp);
        })
        .catch(error => {
          console.log('Error:', error);
        });
    })();
  }, []);

  const handleCancel = async id => {
    await axios
      .post('http://10.0.2.2:3000/api/bill/' + id + '/status=cancel')
      .then(res => {
        console.log('Huy');
      });
    await axios
      .get(`http://10.0.2.2:3000/api/bill/customer/` + Cusid)
      .then(res => {
        const temp = res?.data.billC;
        console.log(temp);
        setBill(temp);
      })
      .catch(error => {
        console.log('Error:', error);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
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
              padding: 12,
              color: '#fff',
            }}></FontAwesome5>
        </TouchableOpacity>
        <Text style={{fontSize: 21, color: '#fff', fontWeight: 600}}>
          Đơn hàng của tôi
        </Text>
        <View></View>
      </View>
      <View style={styles.container}>
        <View style={{flexDirection: 'row', borderBottomWidth: 1}}>
          <View
            style={{
              width: '13%',
              height: 30,
              borderRightWidth: 1,
            }}>
            <Text style={{textAlign: 'center', fontSize: 19, fontWeight: 500}}>
              STT
            </Text>
          </View>
          <View
            style={{
              borderRightWidth: 1,
              width: '37%',
            }}>
            <Text style={{textAlign: 'center', fontSize: 19, fontWeight: 500}}>
              Mã đơn
            </Text>
          </View>
          <View
            style={{
              borderRightWidth: 1,
              width: '35%',
            }}>
            <Text style={{textAlign: 'center', fontSize: 19, fontWeight: 500}}>
              Ngày đặt
            </Text>
          </View>
          <View
            style={{
              width: '20%',
            }}>
            <Text
              style={{
                textAlign: 'center',
                fontSize: 18,
                fontWeight: 500,
              }}></Text>
          </View>
        </View>

        {bill &&
          bill.map((item, i) => (
            <View
              key={i}
              style={{
                flexDirection: 'row',
                borderBottomWidth: 0.5,
                paddingTop: 2,
                paddingBottom: 2,
              }}>
              <View
                style={{
                  width: '12%',
                  height: 30,
                }}>
                <Text
                  style={{textAlign: 'center', fontSize: 18, fontWeight: 400}}>
                  {i + 1}
                </Text>
              </View>
              <View
                style={{
                  width: '36%',
                }}>
                <Text
                  style={{textAlign: 'center', fontSize: 18, fontWeight: 400}}>
                  {item.codebill}
                </Text>
              </View>
              <View
                style={{
                  width: '35%',
                }}>
                <Text
                  style={{textAlign: 'center', fontSize: 18, fontWeight: 400}}>
                  {format(new Date(item.date), 'dd/MM/yyy')}
                </Text>
              </View>
              <View
                style={{
                  width: '19%',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {item.check === 1 ? (
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'orange',
                      width: 60,
                      borderRadius: 10,
                    }}
                    onPress={() => handleCancel(item._id)}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 15,
                        fontWeight: 400,
                      }}>
                      Hủy
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    style={{
                      backgroundColor: 'orange',
                      width: 60,
                      borderRadius: 10,
                    }}
                    onPress={() => navigation.navigate('MyDetailOrder', item)}>
                    <Text
                      style={{
                        textAlign: 'center',
                        fontSize: 15,
                        fontWeight: 400,
                      }}>
                      Chi tiết
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          ))}
      </View>
    </View>
  );
};

export default MyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#fff',
  },
  HeadStyle: {
    height: 50,
    alignContent: 'center',
    backgroundColor: '#ffe0f0',
  },
  TableText: {
    margin: 10,
  },
});
