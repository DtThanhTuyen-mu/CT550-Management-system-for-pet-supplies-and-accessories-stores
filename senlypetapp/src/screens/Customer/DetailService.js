import {
  Image,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import VND from '../../components/Currency';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
const DetailService = ({navigation, route}) => {
  const [isLoading, setisLoading] = useState(true);
  const [service, setService] = useState([]);
  const [price, setPrice] = useState([]);
  const [description, setDescription] = useState([]);
  const serviceid = route.params;

  useEffect(() => {
    async function getServiceById() {
      await axios
        .get('http://10.0.2.2:3000/api/service/' + serviceid)
        .then(res => {
          const getservice = res?.data.service;
          const getprice = res?.data.service.price;
          const getdescription = res?.data.service.description;
          setTimeout(() => {
            setService(getservice);
            setPrice(getprice);
            setDescription(getdescription);
            setisLoading(false);
          }, 1500);
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    }
    getServiceById();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#1E7178"
      />
      {isLoading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView
          style={{flex: 1}}
          vertical
          showsVerticalScrollIndicator={false}>
          <View style={{width: '100%', height: '25%'}}>
            <ImageBackground
              source={{uri: service.image}}
              resizeMode="cover"
              style={{
                flex: 1,
                backgroundColor: '#fff',
                alignItems: 'flex-start',
              }}>
              <TouchableOpacity
                style={{
                  opacity: 0.5,
                  padding: 10,
                  marginLeft: 15,
                }}
                onPress={() => navigation.goBack()}>
                <FontAwesome5
                  name="arrow-left"
                  style={{fontSize: 22, color: '#fff'}}
                />
              </TouchableOpacity>
            </ImageBackground>
          </View>
          <View
            style={{
              display: 'flex',
            }}>
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                paddingTop: 10,
              }}>
              <TouchableOpacity
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderWidth: 1,
                  padding: 10,
                  backgroundColor: '#E85C00',
                  borderRadius: 10,
                }}
                onPress={() => navigation.navigate('MaAppointment', serviceid)}>
                <FontAwesome5 name="thumbtack" size={20} />
                <Text style={{fontSize: 15}}> Đặt lịch </Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                padding: 10,
                marginBottom: 10,
                paddingBottom: '45%',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                  textAlign: 'justify',
                  color: '#000',
                }}>
                {service.title}
              </Text>
              <Ionicons name="md-time-outline" size={18}>
                <Text
                  style={{
                    fontSize: 16,
                    fontWeight: '400',
                    textAlign: 'justify',
                  }}>
                  {service.times}
                </Text>
              </Ionicons>
              <View style={{marginBottom: 50}}>
                {description &&
                  description.map((item, index) => (
                    <View
                      key={index}
                      style={{
                        textAlign: 'justify',
                        letterSpacing: 1,
                      }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: 500,
                          letterSpacing: 1,
                        }}>
                        {item.title}
                      </Text>
                      <Text style={{textAlign: 'justify', letterSpacing: 1}}>
                        {item.content}
                      </Text>
                    </View>
                  ))}
                <View
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    width: '100%',
                    paddingHorizontal: 20,
                    marginBottom: '10%',
                  }}>
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '500',
                      marginVertical: 5,
                      color: '#000',
                    }}>
                    Bảng giá của dịch vụ
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-evenly',
                    }}>
                    <Text
                      style={{
                        borderColor: 'black',
                        borderWidth: 1,
                        width: '50%',
                        textAlign: 'center',
                        paddingVertical: 10,
                        fontSize: 18,
                        fontWeight: '500',
                        color: '#000',
                      }}>
                      Cân nặng
                    </Text>
                    <Text
                      style={{
                        borderColor: 'black',
                        borderWidth: 1,
                        width: '50%',
                        textAlign: 'center',
                        paddingVertical: 10,
                        fontSize: 18,
                        fontWeight: '500',
                        color: '#000',
                      }}>
                      Giá
                    </Text>
                  </View>
                  {price &&
                    price.map((item, index) => (
                      <View
                        key={index}
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-evenly',
                        }}>
                        <Text
                          style={{
                            borderColor: 'black',
                            borderWidth: 1,
                            width: '50%',
                            textAlign: 'center',
                            paddingVertical: 10,
                          }}>
                          {item.weight}
                        </Text>
                        <Text
                          style={{
                            borderColor: 'black',
                            borderWidth: 1,
                            width: '50%',
                            textAlign: 'center',
                            paddingVertical: 10,
                          }}>
                          {VND.format(item.byweight)}
                        </Text>
                      </View>
                    ))}
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </View>
  );
};
export default DetailService;

const styles = StyleSheet.create({});
