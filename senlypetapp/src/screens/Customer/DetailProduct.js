import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import VND from '../../components/Currency';
const DetailProduct = ({navigation, route}) => {
  const [counter, setCounter] = useState(1);
  const Product = route.params;
  const [oneProduct, setoneProduct] = useState([]);
  const [isLoading, setisLoading] = useState(true);

  const handleIncrease = () => {
    setCounter(counter + 1);
  };
  const handleReduce = () => {
    setCounter(counter - 1);
  };

  useEffect(() => {
    (async () => {
      await axios
        .get(`http://10.0.2.2:3000/api/product/${Product._id}`)
        .then(res => {
          console.log('Response ProId', res?.data);
          const news = res?.data.product;
          setoneProduct(news);
          setisLoading(false);
          // console.log('After Response', getNews);
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    })();
  }, []);

  const addToCart = async pro => {
    const itemCart = {
      _id: pro._id,
      image: pro.image,
      title: pro.title,
      quantity: counter,
      price: pro.price,
    };
    let itemArray = await AsyncStorage.getItem('cartItems');
    itemArray = JSON.parse(itemArray);
    if (itemArray) {
      let array = itemArray;
      array.push(itemCart);

      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Thêm vào giỏ hàng thành công!!!',
          ToastAndroid.SHORT,
        );
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(itemCart);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show('Thêm vào giỏ thành công!!!', ToastAndroid.SHORT);
      } catch (error) {
        return error;
      }
    }
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#98AFC7',
      }}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#1E7178"
      />
      {isLoading ? null : (
        <>
          <View style={styles.container}>
            <FontAwesome5
              name="arrow-left"
              size={18}
              color={'white'}
              onPress={() => navigation.goBack()}></FontAwesome5>
            <FontAwesome5
              name="shopping-cart"
              color={'white'}
              size={18}
              onPress={() => navigation.navigate('MyCart')}></FontAwesome5>
          </View>
          <View style={styles.imgCotainer}>
            <Image
              source={{uri: oneProduct.image}}
              style={{resizeMode: 'center', width: '100%', height: '100%'}}
            />
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.detailsContainer}>
            <View
              style={{
                marginLeft: 20,
                marginTop: 20,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: 'bold',
                  width: '73%',
                  textAlign: 'justify',
                }}>
                {oneProduct.title}
              </Text>
              <View style={styles.priceTag}>
                <Text
                  style={{
                    marginLeft: 15,
                    // color: '#E85C00',
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {VND.format(oneProduct.price)}
                </Text>
              </View>
            </View>
            <View style={{paddingHorizontal: 20, marginTop: 10}}>
              <Text style={{fontSize: 15, fontWeight: 400}}>
                Hiện còn : {oneProduct.delivery}
              </Text>
              <Text style={{fontSize: 20, fontWeight: 'bold'}}>Mô tả</Text>
              <Text
                style={{
                  color: 'grey',
                  fontSize: 16,
                  lineHeight: 22,
                  marginTop: 10,
                }}>
                {oneProduct.description}
              </Text>
              <View
                style={{
                  display: 'flex',
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingBottom: 50,
                }}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    style={styles.borderBtn}
                    onPress={handleReduce}>
                    <Text style={styles.borderBtnText}>-</Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      fontSize: 20,
                      marginHorizontal: 10,
                      fontWeight: 'bold',
                    }}>
                    {counter > 0 ? counter : setCounter(1)}
                  </Text>
                  <TouchableOpacity
                    style={styles.borderBtn}
                    onPress={handleIncrease}>
                    <Text style={styles.borderBtnText}>+</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  onPress={() => addToCart(oneProduct)}
                  style={styles.buyBtn}>
                  <Text
                    style={{color: 'white', fontSize: 18, fontWeight: 'bold'}}>
                    Mua
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
};

export default DetailProduct;

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#1E7178',
  },
  imgCotainer: {
    flex: 0.45,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  detailsContainer: {
    display: 'flex',
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 20,
    paddingBottom: 30,
  },
  priceTag: {
    backgroundColor: '#135B61',
    width: '25%',
    height: 40,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: 'center',
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    height: 40,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderBtnText: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  buyBtn: {
    width: 150,
    height: 50,
    backgroundColor: '#E85C00',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
});
