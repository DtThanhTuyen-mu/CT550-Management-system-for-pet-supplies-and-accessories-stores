import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
} from 'react-native';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import VND from '../../components/Currency';
import {format} from 'date-fns';
const MyDetailOrder = ({navigation, route}) => {
  const [ds, setDS] = useState([]);
  const item = route.params;
  console.log(item);
  useEffect(() => {
    (async () => {
      await axios
        .get('http://10.0.2.2:3000/api/bill/customer/billid/' + item._id)
        .then(res => {
          const tempt = res?.data.billById;
          console.log('Dc', tempt);
          setDS(tempt);
        });
    })();
  }, []);
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
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: '#1E7178',
        }}>
        <TouchableOpacity
          style={{marginLeft: 15}}
          onPress={() => navigation.goBack()}>
          <FontAwesome5
            name="arrow-left"
            size={18}
            style={{
              padding: 12,
              color: '#fff',
            }}></FontAwesome5>
        </TouchableOpacity>
        <Text style={{fontSize: 22, color: '#fff', fontWeight: 600}}>
          Đơn mua
        </Text>
        <View></View>
      </View>
      <View style={{flex: 1}}>
        <ScrollView>
          <View
            style={{
              flexDirection: 'row',
              paddingTop: 20,
              paddingLeft: 16,
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: '500',
                letterSpacing: 1,
              }}>
              Mã đơn hàng:
            </Text>
            <Text style={{fontSize: 18}}> {item.codebill}</Text>
          </View>
          <View
            style={{
              paddingTop: 20,
              paddingLeft: 16,
              marginBottom: 10,
            }}>
            <Text
              style={{
                fontSize: 18,
                color: 'black',
                fontWeight: '500',
                letterSpacing: 1,
              }}>
              Danh sách sản phẩm:
            </Text>
            {ds &&
              ds.map((productIC, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('DetailProduct', productIC)
                  }
                  style={{
                    width: '100%',
                    height: 110,
                    marginVertical: 7,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: '30%',
                      height: 100,
                      padding: 14,
                      justifyContent: 'center',
                      alignContent: 'center',
                      backgroundColor: '#98afc7',
                      borderRadius: 10,
                      marginRight: 16,
                    }}>
                    <Image
                      source={{uri: productIC.image}}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 1,
                      height: '100%',
                      paddingBottom: 5,
                      justifyContent: 'space-around',
                    }}>
                    <View style={{}}>
                      <Text
                        style={{
                          fontSize: 14,
                          maxWidth: '95%',
                          color: 'black',
                          fontWeight: '500',
                          letterSpacing: 0.8,
                          textAlign: 'justify',
                          paddingTop: 2,
                        }}>
                        {productIC.title}
                      </Text>
                      <View
                        style={{
                          marginTop: 2,
                          paddingLeft: '10%',
                          alignItems: 'center',
                          opacity: 0.6,
                          flexDirection: 'row',
                          justifyContent: 'space-around',
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 500,
                            maxWidth: '85%',
                          }}>
                          {VND.format(productIC.price)}
                        </Text>
                        <Text> x1</Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
          </View>
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: '500',
              letterSpacing: 1,
              paddingTop: 5,
              paddingLeft: 16,
              marginBottom: 10,
            }}>
            Trạng thái
          </Text>
          {item
            ? item.status.map((s, k) => (
                <View
                  key={k}
                  style={{
                    paddingLeft: 14,
                    paddingRight: 16,
                    letterSpacing: 1.5,
                    flexDirection: 'row',
                  }}>
                  <Text style={{fontSize: 17, paddingRight: 7, paddingLeft: 5}}>
                    {format(new Date(s.date), 'dd/MM/yyyy')}
                  </Text>
                  <Text style={{fontSize: 17, paddingRight: 7}}> {s.time}</Text>
                  <Text style={{fontSize: 17}}> {s.status}</Text>
                </View>
              ))
            : null}
        </ScrollView>
      </View>
    </View>
  );
};

export default MyDetailOrder;

const styles = StyleSheet.create({});
