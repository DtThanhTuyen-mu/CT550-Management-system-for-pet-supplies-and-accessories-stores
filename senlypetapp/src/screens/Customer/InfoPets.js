import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
  Modal,
  Dimensions,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {format} from 'date-fns';
import axios from 'axios';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const InfoPets = ({navigation, route}) => {
  const pet = route.params;
  console.log('pet truyen: ', pet);
  console.log('pet truyen weight: ', pet.weight.length);
  const [isModalVisible, setisModalVisible] = useState(false);
  const [isModalVisible1, setisModalVisible1] = useState(false);
  const [name, setName] = useState(pet.name);
  const [type, setType] = useState(pet.type);
  const [breed, setBreed] = useState(pet.breed);
  const [gender, setGender] = useState(pet.gender);
  const [image, setImage] = useState(pet.image);
  const [weight, setWeight] = useState(
    pet.weight[pet.weight.length - 1].weight,
  );

  const changeModalVisible = bool => {
    setisModalVisible(bool);
  };
  const closeModal = bool => {
    changeModalVisible(bool);
  };
  const changeModalVisible1 = bool => {
    setisModalVisible1(bool);
  };
  const closeModal1 = bool => {
    changeModalVisible1(bool);
  };

  const handleUpdateProfile = async () => {
    console.log('update: ', name);
    await axios
      .put('http://10.0.2.2:3000/api/pet=' + pet._id + '/profile', {
        name,
        type,
        breed,
        image,
        gender,
        weight,
      })
      .then(res => {
        console.log('ok');
        navigation.navigate('HomeCustomer');
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  };
  const handleDelete = async () => {
    await axios
      .put('http://10.0.2.2:3000/api/pets=' + pet._id + '/status=0')
      .then(res => {
        console.log('ok');
        navigation.navigate('HomeCustomer');
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  };
  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#1E7178"
      />

      <View style={{flex: 0.5, backgroundColor: '#212121'}}>
        <ImageBackground
          style={{
            display: 'flex',
            flex: 1,
            resizeMode: 'contain',
          }}
          source={{
            uri: 'https://png.pngtree.com/thumb_back/fw800/back_our/20190621/ourmid/pngtree-cute-cartoon-dog-banner-image_177827.jpg',
          }}
        >
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
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
            <TouchableOpacity
              onPress={() => changeModalVisible(true)}
              style={{width: 50, height: 50, marginLeft: 15}}>
              <FontAwesome5
                name="ellipsis-h"
                size={18}
                style={{
                  padding: 12,
                  color: 'white',
                }}></FontAwesome5>
            </TouchableOpacity>
            <Modal
              transparent={true}
              animationType="fade"
              visible={isModalVisible}
              nRequestClose={() => changeModalVisible(false)}>
              <View
                disabled={true}
                style={{
                  flex: 1,
                  marginTop: 30,
                  marginRight: 20,
                  alignItems: 'flex-end',
                }}>
                <View
                  style={{
                    height: HEIGHT - 700,
                    width: WIDTH - 200,
                    paddingTop: 5,
                    backgroundColor: 'white',
                    borderRadius: 10,
                  }}>
                  <View style={{flex: 1, alignItems: 'center'}}>
                    <TouchableOpacity
                      style={{
                        justifyContent: 'flex-end',
                        alignSelf: 'flex-end',
                        marginRight: 10,
                      }}
                      onPress={() => closeModal(false, 'Cancel')}>
                      <FontAwesome size={17} name="close" />
                    </TouchableOpacity>
                    <View style={{width: '100%'}}>
                      <TouchableOpacity
                        style={{
                          borderBottomWidth: 0.2,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}
                        onPress={() => {
                          changeModalVisible1(true);
                          closeModal(false, 'Cancel');
                        }}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            paddingVertical: 3,
                          }}>
                          Chỉnh sửa thông tin
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={{
                          borderBottomWidth: 0.2,
                          justifyContent: 'center',
                          alignItems: 'center',
                          marginTop: 5,
                          borderColor: 'grey',
                        }}
                        onPress={() => handleDelete()}>
                        <Text
                          style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            paddingVertical: 3,
                          }}>
                          Xóa
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </View>
            </Modal>
          </View>
        </ImageBackground>
      </View>
      <View
        style={{
          flex: 1.2,
        }}>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <View
            style={{
              width: '35%',
              height: 125,
              zIndex: 4,
              position: 'absolute',
              backgroundColor: 'white',
              justifyContent: 'flex-start',
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 50,
              padding: 5,
            }}>
            <Image
              source={{
                uri: pet.image,
              }}
              style={{
                width: '100%',
                height: '100%',
                borderRadius: 50,
                borderColor: 'black',
              }}
              resizeMode="contain"
            />
          </View>
        </View>
        <ScrollView
          style={{
            paddingTop: 65,
          }}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 25, fontWeight: 500, color: '#000'}}>
              {pet.name}
            </Text>
          </View>
          <View
            style={{
              padding: 10,
              marginBottom: 60,
            }}>
            <Text style={{fontSize: 20, fontWeight: 600, marginBottom: 10}}>
              Thông tin
            </Text>
            <ScrollView
              horizontal
              pagingEnabled
            >
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    height: 160,
                    backgroundColor: '#fff',
                    width: 130,
                    marginHorizontal: 0,
                    borderRadius: 10,
                    marginBottom: 10,
                    padding: 15,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      width: '60%',
                      height: '40%',
                    }}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                      }}
                      source={require('../../assets/image/ongnghiem.png')}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      marginTop: 5,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 500,
                        color: '#000',
                      }}>
                      {pet.breed}
                    </Text>
                    <Text style={{fontSize: 16, marginLeft: -5}}> Giống</Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    height: 160,
                    backgroundColor: '#fff',
                    width: 100,
                    marginHorizontal: 0,
                    borderRadius: 10,
                    marginBottom: 10,
                    padding: 15,
                    marginLeft: 15,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      width: '75%',
                      height: '55%',
                    }}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                      }}
                      source={require('../../assets/image/gioitinh.png')}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      marginTop: 5,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 500,
                        color: '#000',
                      }}>
                      {pet.gender}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: -5,
                      }}>
                      Giới tính
                    </Text>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    height: 160,
                    backgroundColor: '#fff',
                    width: 100,
                    marginHorizontal: 0,
                    borderRadius: 10,
                    marginBottom: 10,
                    padding: 15,
                    marginLeft: 15,
                  }}>
                  <View
                    style={{
                      display: 'flex',
                      width: '75%',
                      height: '55%',
                    }}>
                    <Image
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                      }}
                      source={require('../../assets/image/gioitinh.png')}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      marginTop: 5,
                      borderRadius: 5,
                    }}>
                    <Text
                      style={{
                        fontSize: 20,
                        fontWeight: 500,
                        color: '#000',
                      }}>
                      {pet.weight[pet.weight.length - 1].weight}
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        marginLeft: -5,
                      }}>
                      Cân nặng
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </ScrollView>
            <Text style={{fontSize: 20, fontWeight: 600, marginBottom: 10}}>
              Lịch sử dịch vụ
            </Text>
            {pet.history &&
              pet.history.map((h, k) => (
                <View
                  key={k}
                  style={{
                    backgroundColor: '#fff',
                    marginVertical: 5,
                    paddingVertical: 10,
                    paddingHorizontal: 10,
                  }}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>{format(new Date(h.date), 'dd/MM/yyyy')}</Text>
                    <Text>{h.time}</Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text style={{fontWeight: 600}}>Nv. </Text>
                    <Text>{h.idStaff}</Text>
                  </View>
                  <Text>{h.idService}</Text>
                  {h.note === undefined ? null : (
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontWeight: 600}}>Ghi chú: </Text>
                      <Text>{h.note}</Text>
                    </View>
                  )}
                </View>
              ))}
          </View>
        </ScrollView>

        <Modal
          transparent={true}
          animationType="fade"
          visible={isModalVisible1}
          nRequestClose={() => changeModalVisible1(false)}>
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
                    <Text> Tên</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={text => setName(text)}
                      defaultValue={name}></TextInput>
                  </View>
                  <View style={styles.formgroup}>
                    <Text> Loại</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={text => setType(text)}
                      defaultValue={type}></TextInput>
                  </View>
                  <View style={styles.formgroup}>
                    <Text> Giống</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={text => setBreed(text)}
                      defaultValue={breed}></TextInput>
                  </View>
                  <View style={styles.formgroup}>
                    <Text> Giới tính </Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={text => setGender(text)}
                      defaultValue={gender}></TextInput>
                  </View>
                  <View style={styles.formgroup}>
                    <Text> Cân nặng</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={text => setWeight(text)}
                      defaultValue={weight}></TextInput>
                  </View>
                  <View style={styles.formgroup}>
                    <Text> Ảnh</Text>
                    <TextInput
                      style={styles.input}
                      onChangeText={text => setImage(text)}
                      defaultValue={image}></TextInput>
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
                  onPress={() => closeModal1(false, 'Cancel')}>
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
    </View>
  );
};

export default InfoPets;

const styles = StyleSheet.create({
  formgroup: {
    display: 'flex',
    width: 300,
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
