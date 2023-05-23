import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ToastAndroid,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import VND from '../../components/Currency';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardProduct1 from '../../components/CardProduct1';
import CardProduct2 from '../../components/CardProduct2';
import CardProduct3 from '../../components/CardProduct3';
import CardProduct4 from '../../components/CardProduct4';
const width = Dimensions.get('screen').width / 2 - 30;
const ProductPage = ({navigation}) => {
  const [getProduct, setgetProduct] = useState([]);
  const [getCategory, setgetCategory] = useState([]);
  const [getCategoryID, setgetCategoryID] = useState(
    '640d378a45e2b198cfd52531',
  );
  const [isLoading, setisLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await axios
        .get('http://10.0.2.2:3000/api/categories')
        .then(res => {
          console.log('Response', res?.data.categories);
          const categories = res?.data.categories;
          setgetCategory(categories);
          setisLoading(false);
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    })();

    // get data trong useeffect
    (async () => {
      await axios
        .get('http://10.0.2.2:3000/api/products')
        .then(res => {
          const products = res?.data.products;
          setgetProduct(products);
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#1E7178"
      />
      {isLoading ? null : (
        <>
          <View style={styles.box1}>
            <View style={styles.header}>
              <TextInput style={styles.inputs} placeholder="Search" />
              <TouchableOpacity style={styles.btnsearch}>
                <FontAwesome5
                  name="search"
                  size={18}
                  color={'black'}></FontAwesome5>
              </TouchableOpacity>
            </View>
            <FontAwesome5
              name="shopping-cart"
              size={18}
              color={'white'}
              onPress={() => navigation.navigate('MyCart')}></FontAwesome5>
          </View>

          <View style={{height: 50, backgroundColor: 'white'}}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              horizontal
              style={{}}>
              {getCategory.map((category, i) => (
                <View
                  key={i}
                  style={{
                    height: '88%',
                    width: 150,
                    alignItems: 'center',
                    borderRightWidth: 1.5,
                    borderRightColor: '#E85C00',
                  }}>
                  {getCategoryID === category._id ? (
                    <>
                      <TouchableOpacity
                        onPress={() => setgetCategoryID(category._id)}>
                        <Text
                          style={{
                            fontSize: 17,
                            fontWeight: 500,
                            flex: 1,
                            paddingTop: 12,
                            color: '#E85C00',
                          }}>
                          {category.type}
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          height: '100%',
                          width: '100%',
                          backgroundColor: '#E85C00',
                        }}></View>
                    </>
                  ) : (
                    <TouchableOpacity
                      onPress={() => setgetCategoryID(category._id)}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: 500,
                          flex: 1,
                          paddingTop: 12,
                            color: 'black',
                        }}>
                        {category.type}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.box2}>
            {/* // Phan chua san pham  */}
            {getCategoryID === '640d378a45e2b198cfd52531' ? (
              <CardProduct1
                categoryid={getCategoryID}
                navigation={navigation}
              />
            ) : null}
            {getCategoryID === '640d379a45e2b198cfd52533' ? (
              <CardProduct2
                categoryid={getCategoryID}
                navigation={navigation}
              />
            ) : null}
            {getCategoryID === '640d37b345e2b198cfd52535' ? (
              <CardProduct3
                categoryid={getCategoryID}
                navigation={navigation}
              />
            ) : null}
            {getCategoryID === '640d37b945e2b198cfd52537' ? (
              <CardProduct4
                categoryid={getCategoryID}
                navigation={navigation}
              />
            ) : null}
          </View>
        </>
      )}
    </View>
  );
};

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box1: {
    display: 'flex',
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#1E7178',
    flexDirection: 'row',
  },
  header: {
    width: '75%',
    height: '65%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  inputs: {
    borderWidth: 0.5,
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
    paddingHorizontal: 5,
    flex: 1,
    backgroundColor: '#f2f1f6',
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
    backgroundColor: '#81B94A',
    color: '#2E2E2E',
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
    backgroundColor: '#D9D9D9',
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  framecardimg: {
    height: 130,
    alignItems: 'center',
    borderWidth: 1,
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
    backgroundColor: 'green',
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
