import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import VND from './Currency';
import {useQuery} from 'react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';

const width = Dimensions.get('screen').width / 2 - 20;

const CardProduct = ({categoryid, navigation}) => {
  const [proByCa, setproByCa] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  // const {data} = useQuery(
  //   'products',
  //   async () =>
  //     await axios
  //       .get('http://10.0.2.2:3000/api/product/categoryid/' + categoryid)
  //       .then(res => {
  //         return res?.data.product;
  //         //   isLoading(false);
  //       }),
  // );
  // console.log(' od: ', data);
  useEffect(() => {
    (async () => {
      console.log(categoryid);
      await axios
        .get('http://10.0.2.2:3000/api/product/categoryid/' + categoryid)
        .then(res => {
          console.log('Response', res?.data.product);
          const products = res?.data.product;
          setproByCa(products);
          setisLoading(false);
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    })();
  }, [categoryid]);

  const addToCart = async pro => {
    const itemCart = {
      _id: pro._id,
      image: pro.image,
      title: pro.title,
      quantity: 1,
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
        // navigation.navigate('HomeCustomer');
      } catch (error) {
        return error;
      }
    } else {
      let array = [];
      array.push(itemCart);
      try {
        await AsyncStorage.setItem('cartItems', JSON.stringify(array));
        ToastAndroid.show(
          'Thêm vào giỏ hàng thành công!!!',
          ToastAndroid.SHORT,
        );
        // navigation.navigate('HomeCustomer');
      } catch (error) {
        return error;
      }
    }
  };
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.frameproduct}>
        {/* Ten danh muc san pham */}
        <View style={styles.framebox1}>
          {isLoading ? null : (
            <View style={styles.framebox2}>
              {proByCa &&
                proByCa.map((item, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => navigation.navigate('DetailProduct', item)}>
                    <View style={styles.framecard}>
                      <View style={styles.framecardimg}>
                        <Image
                          style={styles.cardimg}
                          source={{uri: item.image}}
                        />
                      </View>
                      <Text style={styles.title}>{item.title}</Text>
                      <View style={styles.framecard2}>
                        <Text style={{fontWeight: 'bold', fontSize: 16}}>
                          {VND.format(item.price)}
                        </Text>
                        <TouchableOpacity
                          style={styles.frameaddtocard}
                          onPress={() => addToCart(item)}>
                          <Text style={styles.iconaddcard}>+</Text>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
          )}
        </View>
      </ScrollView>
    </>
  );
};

export default CardProduct;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    display: 'flex',
    height: 60,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1E7178',
    flexDirection: 'row',
  },
  header: {
    width: '70%',
    height: '60%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputs: {
    borderWidth: 1,
    width: '100%',
    borderRadius: 15,
    fontSize: 15,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  btnsearch: {
    position: 'relative',
    marginLeft: -40,
    justifyContent: 'center',
    alignItems: 'center',
  },

  box2: {
    marginTop: 10,
    flex: 1,
  },
  btntouch: {
    height: '100%',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textanmail: {
    fontSize: 23,
    color: '#4D8D6E',
  },
  changetouch: {
    position: 'absolute',
    bottom: 0,
    height: 3,
    width: '100%',
    backgroundColor: '#4D8D6E',
  },
  frameproduct: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    paddingTop: 10,
  },
  framebox1: {
    display: 'flex',
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  framebox1ca: {
    display: 'flex',
    height: 40,
    justifyContent: 'center',
    marginBottom: 10,
  },
  framebox1catext: {
    fontSize: 22,
    height: '100%',
    fontWeight: 600,
    textAlign: 'center',
    paddingTop: 5,
  },
  framebox2: {
    width: '100%',
    height: '100%',
    display: 'flex',
    position: 'relative',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  framecard: {
    height: 270,
    backgroundColor: '#fff',
    width,
    marginHorizontal: 0,
    elevation: 6,
    shadowColor: '#ffffff',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.5,
    shadowRadius: 3,
    borderRadius: 10,
    marginBottom: 10,
    padding: 15,
  },
  framecardimg: {
    height: 130,
    alignItems: 'center',
  },
  cardimg: {width: '100%', height: '100%', resizeMode: 'contain'},
  title: {
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 10,
    textAlign: 'justify',
  },
  framecard2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  frameaddtocard: {
    height: 25,
    width: 25,
    backgroundColor: '#E85C00',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconaddcard: {
    position: 'absolute',
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
