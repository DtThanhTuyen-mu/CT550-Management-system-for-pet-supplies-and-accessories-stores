import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
const ServicesPage = ({navigation}) => {
  const [isLoading, setisLoading] = useState(true);
  const [servicesCombo, setServicesCombo] = useState([]);
  const [servicesPackage, setServicesPackage] = useState([]);
  const [cservices, setCServices] = useState([]);
  const [getCategoryID, setgetCategoryID] = useState(
    '640fde8a60c354b7006669f0',
  );
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getListCategories();
      getListServicesCombo();
      getListServicesPackage();
    });

    return unsubscribe;
  }, [navigation]);
  const getListCategories = async () => {
    await axios
      .get('http://10.0.2.2:3000/api/categoriesservice')
      .then(res => {
        const temp = res?.data.categories;
        console.log('Response', temp);
        setCServices(temp);
      })
      .catch(error => {
        console.log('Error: ', error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  const getListServicesCombo = async () => {
    await axios
      .get('http://10.0.2.2:3000/api/category=combo/services')
      .then(res => {
        const listservices = res?.data.getServices;
        console.log('Response combo', res?.data.getServices);
        setServicesCombo(listservices);
      })
      .catch(error => {
        console.log('Error: ', error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  const getListServicesPackage = async () => {
    await axios
      .get('http://10.0.2.2:3000/api/category=package/services')
      .then(res => {
        const listservices = res?.data.getServices;
        console.log('Response package', res?.data.getServices);
        setServicesPackage(listservices);
      })
      .catch(error => {
        console.log('Error: ', error);
      })
      .finally(() => {
        setisLoading(false);
      });
  };
  const renderServices = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('DetailService', item._id);
        }}
        style={{
          width: '100%',
          height: 100,
          marginVertical: 6,
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: '#fff',
          borderTopLeftRadius: 10,
          borderBottomLeftRadius: 10,
          elevation: 4,
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
            marginRight: 18,
          }}>
          <Image
            source={{uri: item.image}}
            style={{width: '100%', height: '100%', resizeMode: 'contain'}}
          />
        </View>
        <View
          style={{
            flex: 1,
            height: '100%',
            justifyContent: 'center',
            marginRight: 18,
          }}>
          <Text
            style={{
              fontSize: 17,
              maxWidth: '100%',
              color: 'black',
              fontWeight: '600',
              letterSpacing: 1,
              textAlign: 'justify',
            }}>
            {item.title}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <FontAwesome name="clock-o" size={17} />
            <Text style={{marginLeft: -1}}> {item.times} </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

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
              color: '#fff',
              padding: 12,
            }}></FontAwesome5>
        </TouchableOpacity>
        <Text style={{fontSize: 22, color: '#fff', fontWeight: 600}}>
          Dịch vụ
        </Text>
        <View></View>
      </View>
      <View
        style={{
          height: 50,
        }}>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal
          style={{}}>
          {cservices &&
            cservices.map((cs, k) => (
              <View
                key={k}
                style={{
                  height: '90%',
                  width: 200,
                  borderRightWidth: 0,
                }}>
                {getCategoryID === cs._id ? (
                  <>
                    <TouchableOpacity onPress={() => setgetCategoryID(cs._id)}>
                      <Text
                        style={{
                          fontSize: 17,
                          fontWeight: 500,
                          textAlign: 'center',
                          paddingTop: 12,
                          color: '#E85C00',
                          marginBottom: 5,
                        }}>
                        {cs.type}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        height: 5,
                        width: '100%',
                        backgroundColor: '#E85C00',
                      }}></View>
                  </>
                ) : (
                  <TouchableOpacity onPress={() => setgetCategoryID(cs._id)}>
                    <Text
                      style={{
                        fontSize: 17,
                        fontWeight: 500,
                        textAlign: 'center',
                        paddingTop: 12,
                        color: 'black',
                        marginBottom: 5,
                      }}>
                      {cs.type}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            ))}
        </ScrollView>
      </View>
      <View
        style={{
          paddingHorizontal: 16,
          paddingBottom: 40,
          marginBottom: 60,
        }}>
        {getCategoryID === '640fde8a60c354b7006669f0' ? (
          <FlatList
            data={servicesCombo}
            keyExtractor={item => {
              return item._id;
            }}
            renderItem={renderServices}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <FlatList
            data={servicesPackage}
            keyExtractor={item => {
              return item._id;
            }}
            renderItem={renderServices}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </View>
  );
};

export default ServicesPage;

const styles = StyleSheet.create({});
