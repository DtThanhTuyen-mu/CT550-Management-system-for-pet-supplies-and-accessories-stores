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
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import VND from '../../components/Currency';

export default function MyCart({navigation}) {
  const [product, setProduct] = useState([]);
  const [total, setTotal] = useState(null);
  const [quantity, setQuantity] = useState(null);
  const [infoCustomer, setInfoCustomer] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setTotal(tempt);
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

  // Nút tăng số lượng
  const handleIncrease = async p => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    let value = JSON.parse(itemArray);
    for (let i = 0; i < value.length; i++) {
      if (value[i]._id === p._id) {
        ++value[i].quantity;
        await AsyncStorage.setItem('cartItems', JSON.stringify(value));
        (async () => {
          let items = await AsyncStorage.getItem('cartItems');
          items = JSON.parse(items);
          if (items) {
            setProduct(items.slice(0, 10));
            getTotal(items);
            setLoading(false);
          } else {
            setProduct(false);
            getTotal(false);
          }
        })();
      }
    }
  };
  // Nút giảm số lượng
  const handleReduce = async p => {
    let itemArray = await AsyncStorage.getItem('cartItems');
    let value = JSON.parse(itemArray);
    for (let i = 0; i < value.length; i++) {
      if (value[i]._id === p._id) {
        --value[i].quantity;
        await AsyncStorage.setItem('cartItems', JSON.stringify(value));
        (async () => {
          let items = await AsyncStorage.getItem('cartItems');
          items = JSON.parse(items);
          if (items) {
            setProduct(items.slice(0, 10));
            getTotal(items);
            setLoading(false);
          } else {
            setProduct(false);
            getTotal(false);
          }
        })();
      }
    }
  };
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
              }}>
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: 500,
                  maxWidth: '85%',
                }}>
                {VND.format(productIC.price * productIC.quantity)}
              </Text>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity onPress={() => handleReduce(productIC)}>
                <View
                  style={{
                    borderRadius: 100,
                    marginRight: 15,
                    paddingVertical: 8,
                    paddingHorizontal: 3,
                    borderWidth: 1,
                    borderColor: 'black',
                    opacity: 0.5,
                  }}>
                  <FontAwesome5 name="minus" style={{fontSize: 16}} />
                </View>
              </TouchableOpacity>
              <Text>{productIC.quantity}</Text>
              <TouchableOpacity onPress={() => handleIncrease(productIC)}>
                <View
                  style={{
                    borderRadius: 100,
                    marginLeft: 15,
                    paddingVertical: 8,
                    paddingHorizontal: 3,
                    borderWidth: 1,
                    borderColor: 'black',
                    opacity: 0.5,
                  }}>
                  <FontAwesome5 name="plus" style={{fontSize: 16}} />
                </View>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeItemFromCart(productIC._id)}>
              <FontAwesome5
                name="trash"
                style={{
                  fontSize: 16,
                  color: '#fff',
                  backgroundColor: '#E85C00',
                  padding: 8,
                  borderRadius: 100,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // remove data tu cart
  const removeItemFromCart = async id => {
    let itemJSON = await AsyncStorage.getItem('cartItems');
    let itemArray = JSON.parse(itemJSON);
    let alteredArray = itemArray.filter(function (e) {
      return e._id !== id;
    });
    await AsyncStorage.setItem('cartItems', JSON.stringify(alteredArray));
    (async () => {
      let items = await AsyncStorage.getItem('cartItems');
      items = JSON.parse(items);
      // console.log('1. Tat ca san pham trong gio hang: ', items);
      if (items != null && items.length > 0) {
        setProduct(items.slice(0, 10));
        setLoading(false);
      } else {
        await AsyncStorage.removeItem('cartItems');
        setLoading(false);
        setProduct(false);
        getTotal(false);
      }
    })();
  };
  // Checkout
  const checkOut = async product => {
    console.log(product);
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
    <View style={{width: '100%', height: '100%', backgroundColor: '#000'}}>
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
          Giỏ hàng
        </Text>
        <View></View>
      </View>
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : product != null && product.length > 0 ? (
        <View style={{flex: 1, backgroundColor: '#fff'}}>
          <ScrollView>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: '500',
                letterSpacing: 1,
                paddingTop: 20,
                paddingLeft: 16,
                marginBottom: 10,
              }}>
              Sản phẩm trong giỏ
            </Text>
            <View style={{paddingLeft: 14, paddingRight: 16}}>
              {product ? product.map(productInCart) : null}
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
                total !== 0 ? navigation.navigate('CheckOut') : null
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
                Mua hàng {VND.format(total)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#fff',
          }}>
          <Text style={{fontSize: 20}}> Giỏ hàng rỗng</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({});
