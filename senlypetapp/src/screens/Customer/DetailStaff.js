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

const DetailStaff = ({navigation, route}) => {
  const groomer = route.params;
  console.log('info Groomer: ', groomer);
  const [star, setStar] = useState();

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

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#1E7178"
      />
      <View style={{flex: 0.5, backgroundColor: '#212121'}}>
        <ImageBackground
          style={{flex: 1, resizeMode: 'contain'}}
          source={{
            uri: 'https://vietuctourist.vn/wp-content/uploads/2022/10/tour-du-lich-gia-lai-tay-nguyen.jpg',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{width: 50, height: 50, marginLeft: 15}}>
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
      <View style={{flex: 1.5, backgroundColor: '#f5f5f5'}}>
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
              <Text style={{fontSize: 18, fontWeight: 500}}>
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
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                    <Ionicons
                      name="star"
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                    <Ionicons
                      name="star"
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                    <Ionicons
                      name="star-half-sharp"
                      size={15}
                      style={{color: '#F0A00'}}
                    />
                    <Ionicons
                      name="star-outline"
                      size={15}
                      style={{color: 'black'}}
                    />
                  </>
                ) : star < 4.5 ? (
                  <>
                    <Ionicons
                      name="star"
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                    <Ionicons
                      name="star"
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                    <Ionicons
                      name="star"
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                    <Ionicons
                      name="star"
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                  </>
                ) : star < 5 ? (
                  <>
                    <Ionicons
                      name="star"
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                    <Ionicons
                      name="star"
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                    <Ionicons
                      name="star"
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                    <Ionicons
                      name="star"
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                    <Ionicons
                      name="star-half-sharp"
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                  </>
                ) : star === 5 ? (
                  <>
                    <Ionicons
                      name="star"
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                    <Ionicons
                      name="star"
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                    <Ionicons
                      name="star"
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                    <Ionicons
                      name="star"
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                    <Ionicons
                      name="star"
                      size={15}
                      style={{color: '#F0CA00'}}
                    />
                  </>
                ) : null}
                <Text> {star === 'NaN' ? 0 : star}/5</Text>
                <FontAwesome5 name="star" style={{fontSize: 12}} />
              </View>
            </View>
          </View>
        </View>
        <View style={{marginTop: 70}}>
          <Text style={{fontSize: 25, fontWeight: 600, textAlign: 'center'}}>
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
                  backgroundColor: '#135B61',
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
              Địa chỉ
            </Text>
            <View style={styles.priceTag}>
              <Text
                style={{
                  marginLeft: 15,
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                {groomer.address}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default DetailStaff;

const styles = StyleSheet.create({
  priceTag: {
    backgroundColor: '#135B61',
    width: '50%',
    minHeight: 40,
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: 'center',
    paddingRight: 20,
  },
});
