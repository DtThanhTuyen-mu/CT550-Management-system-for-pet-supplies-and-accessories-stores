import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
  Modal,
  Dimensions,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const InfoAccount = ({navigation, route}) => {
  let customer = route.params;
  const [fullname, setFullname] = useState(customer.fullname);
  const [email, setEmail] = useState(customer.email);
  const [phone, setPhone] = useState(customer.phone);
  const [birthday, setBirthday] = useState(customer.birthday);
  const [gender, setGender] = useState(customer.gender);
  const [address, setAddress] = useState(customer.address);
  const [image, setImage] = useState(customer.image);
  const [info, setInfo] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [isModalVisible, setisModalVisible] = useState(false);
  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };

  const closeModal = bool => {
    changeModalVisible(bool);
  };
  useEffect(() => {
    (async () => {
      await axios
        .get(`http://10.0.2.2:3000/api/customer/${customer._id}`)
        .then(res => {
          const temp = res?.data.customer;
          setInfo(temp);
          setisLoading(false);
        })
        .catch(error => {
          console.log('Error: ', error);
        });
    })();
  }, []);

  const handleUpdateProfile = async () => {
    await axios
      .put('http://10.0.2.2:3000/api/customer/editprofile', {
        id: customer._id,
        fullname,
        email,
        phone,
        birthday,
        gender,
        address,
        image,
      })
      .then(async res => {
        const temp = res?.data;
        await AsyncStorage.removeItem('infoCustomer');
        await AsyncStorage.setItem('infoCustomer', JSON.stringify(temp));

        console.log('Da put');
        (async () => {
          await axios
            .get(`http://10.0.2.2:3000/api/customer/${customer._id}`)
            .then(res => {
              console.log('Response CusId', res?.data.customer);
              const temp = res?.data.customer;
              setInfo(temp);
              setisLoading(false);
            })
            .catch(error => {
              console.log('Error: ', error);
            });
        })();
        closeModal(false);
      });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <StatusBar translucent backgroundColor="transparent" />

      <View
        style={{
          flex: 0.5,
          backgroundColor: '#fff',
        }}>
        <ImageBackground
          style={{flex: 1, resizeMode: 'contain'}}
          source={{
            uri: 'https://vietuctourist.vn/wp-content/uploads/2022/10/tour-du-lich-gia-lai-tay-nguyen.jpg',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{width: 50, height: 50, marginLeft: 15, marginTop: 18}}>
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
      {isLoading ? null : (
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
                  uri: info[0].image,
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
                <Text style={{fontSize: 19, fontWeight: 500, color: '#000'}}>
                  {info[0].fullname}
                </Text>
                <Text style={{fontSize: 17, fontWeight: 300}}>
                  {info[0].email}
                </Text>
              </View>
            </View>
          </View>
          <View style={{marginTop: 100}}>
            <View
              style={{
                flexDirection: 'row',
                textAlign: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{fontSize: 25, fontWeight: 600, color: '#000'}}>
                Thông tin chi tiết
              </Text>
              <TouchableOpacity onPress={() => changeModalVisible(true)}>
                <Ionicons
                  style={{
                    paddingLeft: 5,
                    fontWeight: 'bold',
                    fontSize: 30,
                    color: 'green',
                  }}
                  name="create-outline"
                />
              </TouchableOpacity>
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
                  width: '48%',
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
                  {info[0].phone}
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
                  width: '48%',
                  textAlign: 'justify',
                }}>
                Ngày sinh
              </Text>
              <View style={styles.priceTag}>
                <Text
                  style={{
                    marginLeft: 15,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {info[0].birthday}
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
                  width: '48%',
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
                  {info[0].gender}
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
                  width: '48%',
                  textAlign: 'justify',
                }}>
                Địa chỉ
              </Text>
              <View style={styles.priceTag}>
                <Text
                  style={{
                    marginLeft: 15,
                    paddingRight: 10,
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 16,
                  }}>
                  {info[0].address}
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
                height: '20%',
                backgroundColor: '#E85C00',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}
              onPress={
                () => navigation.navigate('ChangePassword', info[0])
              }>
              <Text style={{color: '#fff', fontSize: 22}}> Đổi mật khẩu</Text>
            </TouchableOpacity>
          </View>
          <Modal
            transparent={true}
            animationType="fade"
            visible={isModalVisible}
            nRequestClose={() => changeModalVisible(false)}>
            <View
              disabled={true}
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <View
                style={{
                  height: HEIGHT - 250,
                  width: WIDTH - 20,
                  paddingTop: 10,
                  backgroundColor: 'white',
                  borderRadius: 10,
                }}>
                <View style={{flex: 1, alignItems: 'center'}}>
                  <Text style={{margin: 5, fontSize: 22, fontWeight: 'bold'}}>
                    Chỉnh sửa thông tin
                  </Text>
                  <ScrollView vertical showsVerticalScrollIndicator={false}>
                    <View style={styles.formgroup}>
                      <Text> Họ tên</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={text => setFullname(text)}
                        defaultValue={fullname}></TextInput>
                    </View>
                    <View style={styles.formgroup}>
                      <Text> Email</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={text => setEmail(text)}
                        defaultValue={email}></TextInput>
                    </View>
                    <View style={styles.formgroup}>
                      <Text> Số điện thoại</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={text => setPhone(text)}
                        defaultValue={phone}></TextInput>
                    </View>
                    <View style={styles.formgroup}>
                      <Text> Ngày sinh</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={text => setBirthday(text)}
                        defaultValue={birthday}></TextInput>
                    </View>
                    <View style={styles.formgroup}>
                      <Text> Giới tính</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={text => setGender(text)}
                        defaultValue={gender}></TextInput>
                    </View>
                    <View style={styles.formgroup}>
                      <Text> Ảnh</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={text => setImage(text)}
                        defaultValue={image}></TextInput>
                    </View>
                    <View style={styles.formgroup}>
                      <Text> Địa chỉ</Text>
                      <TextInput
                        style={styles.input}
                        onChangeText={text => setAddress(text)}
                        defaultValue={address}></TextInput>
                    </View>
                  </ScrollView>
                </View>
                <View style={{width: '100%', flexDirection: 'row'}}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      paddingVertical: 10,
                      alignItems: 'center',
                      backgroundColor: '#62B3B1',
                      borderBottomLeftRadius: 10,
                    }}
                    onPress={() => closeModal(false, 'Cancel')}>
                    <Text
                      style={{
                        margin: 5,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      Đóng
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      paddingVertical: 10,
                      alignItems: 'center',
                      backgroundColor: '#D53904',
                      borderBottomRightRadius: 10,
                    }}
                    onPress={() => handleUpdateProfile()}>
                    <Text
                      style={{
                        margin: 5,
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#fff',
                      }}>
                      Thực hiện
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default InfoAccount;

const styles = StyleSheet.create({
  priceTag: {
    backgroundColor: '#98AFC7',
    width: '55%',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
    justifyContent: 'center',
    paddingRight: 20,
    minHeight: 40,
  },
  formgroup: {
    display: 'flex',
    width: '93%',
    marginVertical: 8,
    paddingLeft: 10,
  },
  input: {
    padding: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderBottomWidth: 1,
  },
});
