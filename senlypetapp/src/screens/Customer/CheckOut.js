import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
  StatusBar,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VND from '../../components/Currency';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const CheckOut = ({navigation}) => {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [infoCustomer, setInfoCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalVisible, setisModalVisible] = useState(false);
  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };
  const closeModal = bool => {
    changeModalVisible(bool);
  };

  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('infoCustomer');
      jsonValue = JSON.parse(jsonValue);
      if (jsonValue) {
        setInfoCustomer(jsonValue);
      }
    })();
  }, [navigation, AsyncStorage]);

  useEffect(() => {
    // lấy sản phẩm từ giỏ hàng
    (async () => {
      let items = await AsyncStorage.getItem('cartItems');
      items = JSON.parse(items);
      console.log('1. Tat ca san pham trong gio hang: ', items);
      if (items != null && items.length > 0) {
        setProduct(items.slice(0, 10));
        getTotal(items);
        getQuantity(items);
        setLoading(false);
      } else {
        await AsyncStorage.removeItem('cartItems');
        setProduct(false);
        getTotal(false);
        getQuantity(false);
        setLoading(false);
      }
    })();
    // Lấy tổng số giá sản phẩm
    const getTotal = productData => {
      let tempt = 0;
      for (let index = 0; index < productData.length; index++) {
        let productPrice =
          productData[index].price * productData[index].quantity;
        tempt = tempt + productPrice;
      }
      setTotal(tempt + 20000);
    };
    // Lấy số luong sản phẩm
    const getQuantity = productData => {
      let tempt = 0;
      for (let index = 0; index < productData.length; index++) {
        let productQuantity = productData[index].quantity;
        tempt = tempt + productQuantity;
      }
      setQuantity(tempt);
    };
  }, []);
  // Lấy tổng số tiền
  const getTotal = productData => {
    let tempt = 0;
    for (let index = 0; index < productData.length; index++) {
      let productPrice = productData[index].price * productData[index].quantity;
      tempt = tempt + productPrice;
    }
    setTotal(tempt);
  };
  const productInCart = (productIC, index) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate('DetailProduct', productIC)}
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
            backgroundColor: '#98AFC7',
            borderRadius: 10,
            marginRight: 16,
          }}>
          <Image
            source={{uri: productIC.image}}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
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
                {VND.format(productIC.price * productIC.quantity)}
              </Text>
              <Text> x{productIC.quantity}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  const updateInfo = async () => {
    ToastAndroid.show('Vui lòng cập nhật địa chỉ', ToastAndroid.SHORT);
  };

  const checkOut = async product => {
    try {
      await axios
        .post('http://10.0.2.2:3000/api/staff/product/payment', {
          product: product,
          idCustomer: infoCustomer._id,
          quantity: quantity,
          total: total,
        })
        .then(async res => {
          await AsyncStorage.removeItem('cartItems');
          ToastAndroid.show('Đặt hàng thành công!!!', ToastAndroid.SHORT);
        })
        .catch(error => {
          console.log('Error: ', error);
        });
      navigation.navigate('HomeCustomer');
    } catch (error) {
      return error;
    }
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}>
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5
            name="arrow-left"
            size={22}
            style={{
              padding: 12,
              color: '#fff',
            }}></FontAwesome5>
        </TouchableOpacity>
        <Text style={{fontSize: 22, color: '#fff', fontWeight: 600}}>
          Thanh Toán
        </Text>
        <View></View>
      </View>
      <View
        style={{
          paddingTop: 10,
          paddingLeft: 16,
          marginBottom: 10,
        }}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text
            style={{
              fontSize: 18,
              color: 'black',
              fontWeight: '500',
              letterSpacing: 1,
            }}>
            Địa chỉ nhận hàng
          </Text>
          <TouchableOpacity
            style={{marginRight: 10}}
            onPress={() => navigation.navigate('UpdateAddress', infoCustomer)}>
            <Ionicons
              style={{paddingLeft: 5, fontSize: 20, color: 'green'}}
              name="create-outline"
            />
          </TouchableOpacity>
        </View>
        <Text>
          {infoCustomer.fullname}| {infoCustomer.phone}
        </Text>
        <Text>{infoCustomer.address}</Text>
      </View>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : product != null && product.length > 0 ? (
        <View style={{flex: 1}}>
          <ScrollView>
            <View style={{paddingLeft: 14, paddingRight: 16}}>
              {product ? product.map(productInCart) : null}
            </View>

            <View
              style={{paddingHorizontal: 16, marginTop: 10, marginBottom: 80}}>
              <Text
                style={{
                  fontSize: 18,
                  color: 'black',
                  fontWeight: '500',
                  letterSpacing: 1,
                  marginBottom: 20,
                }}>
                Chi tiết thanh toán
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '400',
                    maxWidth: '80%',
                    color: 'black',
                    opacity: 0.5,
                  }}>
                  Số sản phẩm
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: 'black',
                    opacity: 0.8,
                  }}>
                  {product.length}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '400',
                    maxWidth: '80%',
                    color: 'black',
                    opacity: 0.5,
                  }}>
                  Tổng số lượng sản phẩm
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: 'black',
                    opacity: 0.8,
                  }}>
                  {quantity}
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '400',
                    maxWidth: '80%',
                    color: 'black',
                    opacity: 0.5,
                  }}>
                  Phí ship
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: 'black',
                    opacity: 0.8,
                  }}>
                  20.000 đ
                </Text>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontSize: 15,
                    fontWeight: '400',
                    maxWidth: '80%',
                    color: 'black',
                    opacity: 0.5,
                  }}>
                  Tổng thanh toán
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '500',
                    color: 'black',
                    opacity: 0.8,
                  }}>
                  {VND.format(total)}
                </Text>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              backgroundColor: '#E85C00',
              position: 'absolute',
              bottom: 0,
              height: '8%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() =>
                total !== 0
                  ? (infoCustomer.phone === undefined &&
                      infoCustomer.address === undefined) ||
                    infoCustomer.phone === '' ||
                    infoCustomer.address === ''
                    ? updateInfo()
                    : checkOut(product)
                  : null
              }
              style={{
                width: '86%',
                height: '90%',
                borderRadius: 20,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  letterSpacing: 1,
                  color: 'white',
                  textTransform: 'uppercase',
                }}>
                Đặt hàng {VND.format(total)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 20}}> Giỏ hàng rỗng</Text>
        </View>
      )}
    </View>
  );
};

export default CheckOut;

const styles = StyleSheet.create({});
