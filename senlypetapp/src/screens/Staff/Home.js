import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Carousel from '../../components/Carousel';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
const Home = ({navigation}) => {
  const [getNews, setgetNews] = useState([]);

  const [token, setToken] = useState();
  const [infoStaff, setInfoStaff] = useState([]);

  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('infoStaff');
      jsonValue = JSON.parse(jsonValue);
      console.log(' Thong tin nguoi dung la nhan vien set : ', jsonValue);
      if (jsonValue) {
        setInfoStaff(jsonValue);
      }
      const token = await AsyncStorage.getItem('tokenStaff');
      if (token) {
        setToken(token);
      }
    })();
  }, []);
  useEffect(() => {
    // get data trong useeffect
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

  const removeAsync = async () => {
    try {
      await AsyncStorage.removeItem('infoStaff');
      await AsyncStorage.removeItem('tokenStaff');
      navigation.navigate('Welcome');
      return true;
    } catch (exception) {
      return false;
    }
  };
  return (
    <ScrollView style={styles.container}>
      <Carousel />
      <View style={styles.container1}>
        <Text style={styles.title}> Tùy chọn</Text>
        <View style={styles.options}>
          <View style={styles.boxoption}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate('ProductPageStaff')}>
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
              onPress={() => navigation.navigate('ServicePageStaff')}>
              <FontAwesome5 name="spa" size={30} color={'white'}></FontAwesome5>
            </TouchableOpacity>
            <Text style={styles.textop}> Dịch vụ </Text>
          </View>
          <View style={styles.boxoption}>
            <TouchableOpacity
              style={styles.option}
              onPress={() => navigation.navigate('AmScheduleOS', infoStaff)}>
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
        <Text style={styles.title}>Tin tức</Text>
        {getNews.map((item, index) => (
          <View style={styles.news} key={index}>
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
          </View>
        ))}

        <View style={styles.news}>
          <View style={{flex: 1, borderWidth: 1, height: 100}}>
            <Image
              style={{width: '100%', height: '100%'}}
              source={{
                uri: 'https://khamphadalat.vn/wp-content/uploads/2020/07/nha-boss-cofee-dalat-4-scaled.jpg',
              }}
              resizeMode="cover"
            />
          </View>
          <View style={styles.headenews}>
            <Text style={styles.titlenews}>
              Cac loài động vật cũng giống như con người cũng nên được vệ sinh
              tấm rữa thường xuyen.
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
    marginTop: 10,
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
    borderWidth: 1,
    height: 100,
  },
  imgnews: {
    width: '100%',
    height: '100%',
  },
  headenews: {
    flex: 2.5,
    backgroundColor: 'grey',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 5,
    paddingRight: 10,
    borderColor: 'gray',
    borderWidth: 1,
  },
  news: {
    display: 'flex',
    width: '100%',
    heigh: '100%',
    flexDirection: 'row',
    marginBottom: 10,
  },
  titlenews: {
    display: 'flex',
    position: 'absolute',
    textAlign: 'justify',
    fontSize: 15,
    fontWeight: '600',
  },
});
