import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Carousel from '../../components/Carousel';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {loadNews} from '../../redux/actions/getListNews';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home = ({navigation}) => {
  const [getNews, setgetNews] = useState([]);
  let dispatch = useDispatch();
  const newsDatas = useSelector(state => state.newsReduces); // gọi hành động
  const [infoCustomer, setInfoCustomer] = useState([]);

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
    async function getListNews() {
      await axios
        .get('http://10.0.2.2:3000/api/news')
        .then(res => {
          const news = res?.data.news;
          setgetNews(news);
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    }
    getListNews();
  }, []);

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#1E7178"
      />
      <Carousel />
      <View style={styles.container1}>
        <Text style={styles.title}> Tùy chọn</Text>
        <View style={styles.options}>
          <View style={styles.boxoption}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate('ProductPage')}>
              <FontAwesome5
                name="shopping-basket"
                size={30}
                color={'white'}></FontAwesome5>
            </TouchableOpacity>
            <Text style={styles.textop}> Sản phẩm</Text>
          </View>
          <View style={styles.boxoption}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate('ServicesPage')}>
              <FontAwesome5 name="spa" size={30} color={'white'}></FontAwesome5>
            </TouchableOpacity>
            <Text style={styles.textop}> Dịch vụ </Text>
          </View>
          <View style={styles.boxoption}>
            <TouchableOpacity
              style={styles.option}
              onPress={() =>
                navigation.navigate('AmSchedule', infoCustomer._id)
              }>
              <FontAwesome5
                name="ticket-alt"
                size={30}
                color={'white'}></FontAwesome5>
            </TouchableOpacity>
            <Text style={styles.textop}> Lịch hẹn</Text>
          </View>
        </View>
      </View>
      <View style={styles.container1}>
        <Text style={styles.title}> Tin tức</Text>
        {getNews.map((item, index) => (
          <TouchableOpacity
            style={styles.news}
            key={index}
            onPress={() => navigation.navigate('DetailNews', item)}>
            <View style={styles.boxnews}>
              <Image
                style={styles.imgnews}
                source={{
                  uri: item.link,
                }}
                resizeMode="cover"
              />
            </View>
            <View style={styles.headenews}>
              <Text style={styles.titlenews}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.news}>
          <View style={{flex: 1, borderWidth: 0.15, height: 100}}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={{
                uri: 'https://file.hstatic.net/1000238938/file/14_6b849f13e0ab4ffcbac5af0dc37c032a_grande.jpg',
              }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.headenews}>
            <Text style={styles.titlenews}>
              Các loài động vật cũng giống như con người cũng nên được vệ sinh
              tấm rữa thường xuyên.
            </Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container1: {
    display: 'flex',
    marginTop: 5,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 5,
  },

  options: {
    display: 'flex',
    width: '100%',
    heigh: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  boxoption: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  option: {
    display: 'flex',
    width: 50,
    height: 50,
    backgroundColor: '#135B61',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    borderRadius: 15,
  },
  textop: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  boxnews: {
    flex: 1,
    borderWidth: 0.15,
    height: 100,
  },
  imgnews: {
    width: '100%',
    height: '100%',
  },
  headenews: {
    flex: 2.5,
    backgroundColor: '#E4E1E1',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingRight: 10,
    borderColor: 'gray',
    borderWidth: 0.15,
  },
  news: {
    display: 'flex',
    width: '100%',
    heigh: '100%',
    flexDirection: 'row',
    marginBottom: 5,
    paddingHorizontal: 0.5,
  },
  titlenews: {
    display: 'flex',
    position: 'absolute',
    textAlign: 'justify',
    fontSize: 15,
    fontWeight: '600',
  },
});
