import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const InfoStaff = ({navigation, route}) => {
  const groomer = route.params;
  console.log('info Groomer: ', groomer);
  const [infoCustomer, setInfoCustomer] = useState([]);
  const [star, setStar] = useState();
  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('infoCustomer');
      jsonValue = JSON.parse(jsonValue);
      if (jsonValue) {
        setInfoCustomer(jsonValue);
        console.log('jsonValue', jsonValue);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      await axios
        .get(
          'http://10.0.2.2:3000/api/staff/id=' + groomer._id + '/reviews/star',
        )
        .then(res => {
          const tempt = res?.data.tofixed;
          console.log('Star: ', tempt);
          setStar(tempt);
        });
    })();
  }, []);

  const handleCreateChatRoom = async () => {
    console.log('KH: ', infoCustomer._id + infoCustomer.fullname);
    console.log('Groomer: ', groomer._id + groomer.fullname);
    await axios
      .post('http://10.0.2.2:3000/api/conversation', {
        idCustomer: infoCustomer._id,
        idStaff: groomer._id,
        nameStaff: groomer.username,
      })
      .then(res => {
        console.log('Tao phong hoac ktra phong ton tai thanh cong');
        const roomId = res?.data.roomid;
        console.log(roomId);
        navigation.navigate('Chats', {
          roomId,
          infoCustomer,
          groomer,
        });
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar hidden={false} />
      <View
        style={{
          flex: 0.5,
          backgroundColor: '#fff',
        }}>
        <ImageBackground
          style={{flex: 1, resizeMode: 'contain'}}
          source={{
            uri: 'https://vietuctourist.vn/wp-content/uploads/2022/10/tour-du-lich-gia-lai-tay-nguyen.jpg',
          }}
        >
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{width: 50, height: 50, marginLeft: 15,}}>
            <FontAwesome5
              name="arrow-left"
              size={18}
              style={{
                padding: 12,
                color: 'white',
              }}></FontAwesome5>
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View
        style={{
          flex: 1.5,
          backgroundColor: '#fff',
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: '80%',
              height: 100,
              zIndex: 2,
              position: 'absolute',
              backgroundColor: 'white',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              paddingLeft: 20,
              borderRadius: 20,
              elevation: 10,
            }}>
            <Image
              source={{
                uri: groomer.image,
              }}
              style={{
                width: '26%',
                height: '80%',
                borderRadius: 20,
                borderWidth: 0.3,
                borderColor: 'black',
              }}
              resizeMode="contain"
            />
            <View style={{marginLeft: 10}}>
              <Text style={{fontSize: 18, fontWeight: 500, color: '#000'}}>
                {groomer.fullname}
              </Text>
              <View style={{flexDirection: 'row'}}>
                {star === 'NaN' ? (
                  <>
                    <Text> Chưa đánh giá</Text>
                  </>
                ) : star < 4.0 ? (
                  <>
                    <Ionicons
                      name="star"
                      size={16}
                      style={{color: '#FFFB00'}}
                    />
                    <Ionicons
                      name="star"
                      size={16}
                      style={{color: '#FAE004'}}
                    />
                    <Ionicons
                      name="star"
                      size={16}
                      style={{color: '#FAE004'}}
                    />
                    <Ionicons
                      name="star-half-sharp"
                      size={16}
                      style={{color: '#F0A00'}}
                    />
                    <Ionicons
                      name="star-outline"
                      size={16}
                      style={{color: 'black'}}
                    />
                  </>
                ) : star < 4.5 ? (
                  <>
                    <Ionicons
                      name="star"
                      size={16}
                      style={{color: '#FAE004'}}
                    />
                    <Ionicons
                      name="star"
                      size={16}
                      style={{color: '#FAE004'}}
                    />
                    <Ionicons
                      name="star"
                      size={16}
                      style={{color: '#FAE004'}}
                    />
                    <Ionicons
                      name="star"
                      size={16}
                      style={{color: '#FAE004'}}
                    />
                  </>
                ) : star < 5 ? (
                  <>
                    <Ionicons
                      name="star"
                      size={16}
                      style={{color: '#FAE004'}}
                    />
                    <Ionicons
                      name="star"
                      size={16}
                      style={{color: '#FAE004'}}
                    />
                    <Ionicons
                      name="star"
                      size={16}
                      style={{color: '#FAE004'}}
                    />
                    <Ionicons
                      name="star"
                      size={16}
                      style={{color: '#FAE004'}}
                    />
                    <Ionicons
                      name="star-half-sharp"
                      size={16}
                      style={{color: '#FAE004'}}
                    />
                  </>
                ) : star === 5 ? (
                  <>
                    <Ionicons
                      name="star"
                      size={16}
                      style={{color: '#FAE004'}}
                    />
                    <Ionicons
                      name="star"
                      size={16}
                      style={{color: '#FAE004'}}
                    />
                    <Ionicons
                      name="star"
                      size={16}
                      style={{color: '#FAE004'}}
                    />
                    <Ionicons
                      name="star"
                      size={16}
                      style={{color: '#FAE004'}}
                    />
                    <Ionicons
                      name="star"
                      size={16}
                      style={{color: '#FAE004'}}
                    />
                  </>
                ) : null}
                <Text> {star === 'NaN' ? 0 : star}/5</Text>
                <FontAwesome5 name="star" style={{fontSize: 12}} />
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop: 100}}>
          <Text style={{
            fontSize: 25, fontWeight: 600, textAlign: 'center',
          color:'#000'}}>
            Thông tin chi tiết
          </Text>
          <View
            style={{
              marginLeft: 10,
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                width: '50%',
                textAlign: 'justify',
              }}>
              Số điện thoại
            </Text>
            <View style={styles.priceTag}>
              <Text
                style={{
                  marginLeft: 15,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                {groomer.phone}
              </Text>
            </View>
          </View>
          <View
            style={{
              marginLeft: 10,
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                width: '50%',
                textAlign: 'justify',
              }}>
              Kinh nghiệm
            </Text>
            {groomer.experience.map((e, k) => (
              <View
                key={k}
                style={{
                  backgroundColor: '#98AFC7',
                  width: '50%',
                  height: 40,
                  borderTopLeftRadius: 25,
                  borderBottomLeftRadius: 25,
                  justifyContent: 'center',
                  paddingRight: 20,
                }}>
                <Text
                  style={{
                    marginLeft: 15,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {e.year}
                </Text>
              </View>
            ))}
          </View>
          <View
            style={{
              marginLeft: 10,
              marginTop: 20,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: 'bold',
                width: '50%',
                textAlign: 'justify',
              }}>
              Giới tính
            </Text>
            <View style={styles.priceTag}>
              <Text
                style={{
                  marginLeft: 15,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                {groomer.gender}
              </Text>
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{
              width: '80%',
              height: '16%',
              backgroundColor: '#E85C00',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 20,
            }}
            onPress={() =>
              {
                handleCreateChatRoom();
              }
            }>
            <Text style={{color: '#fff', fontSize: 22}}> Nhắn tin</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default InfoStaff;

const styles = StyleSheet.create({
  priceTag: {
    backgroundColor: '#98AFC7',
    width: '50%',
    height: 40,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: 'center',
    paddingRight: 20,
  },
});
