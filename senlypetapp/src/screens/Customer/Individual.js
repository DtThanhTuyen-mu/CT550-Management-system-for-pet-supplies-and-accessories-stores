import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Dimensions,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {SvgXml} from 'react-native-svg';
import axios from 'axios';
const width = Dimensions.get('screen').width / 2 - 20;

const xmllogout = `<svg width="800px" height="800px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
<path stroke="#000000" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12h-9.5m7.5 3l3-3-3-3m-5-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2h5a2 2 0 002-2v-1"/>
</svg>`;

const xmlsetting = `<svg width="800px" height="800px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<g id="style=linear">
<g id="setting">
<path id="vector" d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z" stroke="#000000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
<path id="vector_2" d="M2 12.88V11.12C2 10.08 2.85 9.22 3.9 9.22C5.71 9.22 6.45 7.94 5.54 6.37C5.02 5.47 5.33 4.3 6.24 3.78L7.97 2.79C8.76 2.32 9.78 2.6 10.25 3.39L10.36 3.58C11.26 5.15 12.74 5.15 13.65 3.58L13.76 3.39C14.23 2.6 15.25 2.32 16.04 2.79L17.77 3.78C18.68 4.3 18.99 5.47 18.47 6.37C17.56 7.94 18.3 9.22 20.11 9.22C21.15 9.22 22.01 10.07 22.01 11.12V12.88C22.01 13.92 21.16 14.78 20.11 14.78C18.3 14.78 17.56 16.06 18.47 17.63C18.99 18.54 18.68 19.7 17.77 20.22L16.04 21.21C15.25 21.68 14.23 21.4 13.76 20.61L13.65 20.42C12.75 18.85 11.27 18.85 10.36 20.42L10.25 20.61C9.78 21.4 8.76 21.68 7.97 21.21L6.24 20.22C5.33 19.7 5.02 18.53 5.54 17.63C6.45 16.06 5.71 14.78 3.9 14.78C2.85 14.78 2 13.92 2 12.88Z" stroke="#000000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
</g>
</g>
</svg>`;
const xmlcheck = `<svg fill="#000000" width="800px" height="800px" viewBox="0 0 24 24" id="check-mark-square-2" data-name="Flat Line" xmlns="http://www.w3.org/2000/svg" class="icon flat-line"><polyline id="primary" points="21 5 12 14 8 10" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></polyline><path id="primary-2" data-name="primary" d="M21,11v9a1,1,0,0,1-1,1H4a1,1,0,0,1-1-1V4A1,1,0,0,1,4,3H16" style="fill: none; stroke: rgb(0, 0, 0); stroke-linecap: round; stroke-linejoin: round; stroke-width: 2;"></path></svg>`;
const xmltoday = `<svg xmlns="http://www.w3.org/2000/svg" fill="#000000" width="800px" height="800px" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/></svg>`;
const xmlshop = `<svg width="800px" height="800px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000" fill="none"><polyline points="4.62 9.96 15.34 9.96 21.71 37.85 49.69 37.85 56.17 16.35 16.67 15.79"/><path d="M51.73,44.35H21.67a3.21,3.21,0,0,1-3.28-3.28c0-3.22,3.32-3.22,3.32-3.22"/><circle cx="24.95" cy="51.61" r="3.53"/><circle cx="46.04" cy="51.61" r="3.53"/></svg>`;
// @refresh reset
const Individual = ({navigation}) => {
  const [token, setToken] = useState();
  const [infoCustomer, setInfoCustomer] = useState([]);
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState([]);
  const [pets, setPets] = useState([]);
  const [countpets, setCountPets] = useState(0);

  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('infoCustomer');
      jsonValue = JSON.parse(jsonValue);
      if (jsonValue) {
        setInfoCustomer(jsonValue);
        console.log('jsonValue', jsonValue);
        (async () => {
          await axios
            .get('http://10.0.2.2:3000/api/customer=' + jsonValue._id + '/pets')
            .then(res => {
              console.log('pet', res?.data.pets);
              setPets(res?.data.pets);
            });
        })();
      }

      const token = await AsyncStorage.getItem('tokenCustomer');
      if (token) {
        setToken(token);
      }
      setLoading(false);
    })();
  }, [navigation]);

  const touch = async () => {
    let jsonValue = await AsyncStorage.getItem('infoCustomer');
    jsonValue = JSON.parse(jsonValue);
    if (jsonValue) {
      setInfoCustomer(jsonValue);
      console.log('jsonValue', jsonValue);
    }
    await axios
      .get('http://10.0.2.2:3000/api/customer=' + jsonValue._id + '/pets')
      .then(res => {
        console.log('pet', res?.data.pets);
        setPets(res?.data.pets);
      });
  };
  const LogOut = async () => {
    try {
      // await GoogleSignin.signOut();
      await AsyncStorage.removeItem('infoCustomer');
      await AsyncStorage.removeItem('tokenCustomer');
      navigation.navigate('LoginCustomer');
      await GoogleSignin.revokeAccess();
      return true;
    } catch (exception) {
      return false;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      {loading ? null : (
        <ScrollView>
          <TouchableOpacity
            style={{
              flex: 2,
              widh: '100%',
              height: 200,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
            activeOpacity={1}
            onPress={() => touch()}>
            <View
              style={{
                width: '55%',
                height: '55%',
                marginBottom: 20,
              }}>
              <ImageBackground
                source={{uri: infoCustomer.image}}
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
              />
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text style={styles.text}>{infoCustomer.fullname} </Text>
              <Text style={styles.textMail}>
                {info.length === 0 ? infoCustomer.email : info.email}
              </Text>
            </View>
          </TouchableOpacity>
          <View
            style={{
              // flex: 1.5,
              paddingHorizontal: 14,
              borderBottomWidth: 1,
              borderBottomColor: 'rgba(0,0,0,0.1)',
            }}>
            <View
              style={{
                paddingVertical: 10,
                display: 'flex',
              }}>
              <Text style={{fontSize: 18}}>
                Gia đình bạn có {pets ? pets.length : countpets} thành viên nào.
              </Text>
            </View>
            <View>
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{
                  display: 'flex',
                  position: 'relative',
                  width: '100%',
                  paddingTop: 5,
                }}>
                <View
                  style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                  }}>
                  <View
                    style={{
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      position: 'relative',
                      flex: 1,
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      flexWrap: 'wrap',
                    }}>
                    {pets &&
                      pets.map((pet, index) => (
                        <TouchableOpacity
                          key={index}
                          style={{
                            height: 160,
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
                            justifyContent: 'center',
                            alignItems: 'center',
                          }}
                          onPress={() => navigation.navigate('InfoPets', pet)}>
                          <View
                            style={{
                              display: 'flex',
                              width: '45%',
                              height: '45%',
                            }}>
                            <Image
                              style={{
                                width: '100%',
                                height: '100%',
                                resizeMode: 'cover',
                                borderRadius: 70,
                              }}
                              source={{uri: pet.image}}
                            />
                          </View>
                          <View
                            style={{
                              width: '80%',
                              height: 50,
                              justifyContent: 'center',
                              alignItems: 'center',
                              paddingVertical: 12,
                              marginTop: 12,
                            }}>
                            <Text
                              style={{
                                color: '#000',
                                fontSize: 19,
                                fontWeight: 600,
                              }}>
                              {pet.name}
                            </Text>
                            <Text style={{fontSize: 16, paddingTop: 5}}>
                              {pet.breed}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      ))}
                    <View
                      style={{
                        height: 160,
                        backgroundColor: 'orange',
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
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <View
                        style={{
                          display: 'flex',
                          width: '75%',
                          height: '65%',
                        }}>
                        <Image
                          style={{
                            width: '100%',
                            height: '100%',
                            resizeMode: 'cover',
                          }}
                          source={require('../../assets/image/addpets.png')}
                        />
                      </View>
                      <TouchableOpacity
                        onPress={() =>
                          navigation.navigate('AddPets', infoCustomer._id)
                        }
                        style={{
                          width: '90%',
                          height: 35,
                          justifyContent: 'center',
                          alignItems: 'center',
                          backgroundColor: '#fff',
                          marginTop: 12,
                          borderRadius: 5,
                        }}>
                        <Text
                          style={{
                            fontSize: 15,
                            fontWeight: 500,
                            color: '#000',
                          }}>
                          Thêm Pets
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </ScrollView>
            </View>
          </View>
          <View
            style={{
              flex: 2,
            }}>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('InfoAccount', infoCustomer)}>
              <SvgXml height={25} width={25} xml={xmlsetting} />

              <Text style={styles.itemText}>Thông tin tài khoản</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('MyCart')}>
              <SvgXml height={25} width={25} xml={xmlshop} />

              <Text style={styles.itemText}>Giỏ hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => navigation.navigate('MyOrders', infoCustomer._id)}>
              <SvgXml height={25} width={25} xml={xmlcheck} />

              <Text style={styles.itemText}>Đơn hàng của tôi</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() =>
                navigation.navigate('MySchedule', infoCustomer._id)
              }>
              <SvgXml height={25} width={25} xml={xmltoday} />

              <Text style={styles.itemText}>Lịch hẹn hoàn thành</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.item}>
              <SvgXml height={25} width={25} xml={xmllogout} />
              <TouchableOpacity onPress={() => LogOut()}>
                <Text style={styles.itemText}>Đăng xuất</Text>
              </TouchableOpacity>
            </TouchableOpacity>
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default Individual;

const styles = StyleSheet.create({
  boxHeader: {
    height: '20%',
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#135B61',
    borderBottomWidth: 2,
  },
  image: {
    width: 70,
    height: 70,
    margin: 10,
    borderRadius: 10,
  },
  imageBk: {
    width: 70,
    height: 70,
  },
  text: {
    fontSize: 18,
  },
  textMail: {
    fontSize: 16,
    textAlign: 'center',
  },

  list: {},
  item: {
    padding: 14,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
    display: 'flex',
    flexDirection: 'row',
  },
  itemText: {
    fontSize: 18,
    paddingLeft: 10,
  },
});
