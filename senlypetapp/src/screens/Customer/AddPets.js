import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  TextInput,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddPets = ({navigation, route}) => {
  const owner = route.params;
  const [name, setName] = useState('');
  const [image, setImage] = useState('');
  const [type, setType] = useState('');
  const [breed, setBreed] = useState('');
  const [gender, setGender] = useState('');
  const [weight, setWeihgt] = useState('');
  const handleAddPets = async () => {
    if (
      name === '' ||
      image === '' ||
      type === '' ||
      breed === '' ||
      gender === '' ||
      weight === ''
    ) {
      ToastAndroid.show('Vui lòng điền đầy đủ thông tin', ToastAndroid.SHORT);
    } else {
      await axios
        .post('http://10.0.2.2:3000/api/pets', {
          owner,
          name,
          image,
          type,
          breed,
          gender,
          weight,
        })
        .then(async res => {
          //   console.log('them moi thu cung thanh cong');
          ToastAndroid.show(
            'Chúc mừng! Thêm mới thú cưng thành công',
            ToastAndroid.SHORT,
          );
          setTimeout(() => {
            navigation.navigate('HomeCustomer');
          }, 1000);
        });
    }
  };

  return (
    <View style={{flex: 1}}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#1E7178"
      />
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: '#1E7178',
        }}>
        <TouchableOpacity
          style={{paddingLeft: 15}}
          onPress={() => navigation.goBack()}>
          <FontAwesome5
            name="arrow-left"
            size={18}
            style={{
              padding: 12,
              color: '#fff',
            }}></FontAwesome5>
        </TouchableOpacity>
        <Text
          style={{
            width: '85%',
            fontSize: 21,
            fontWeight: 600,
            color: '#fff',
            textAlign: 'center',
            paddingBottom: 5,
          }}>
          Thêm thú cưng mới
        </Text>
        <View></View>
      </View>
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            width: '85%',
            heigh: '50%',
            marginLeft: 30,
            marginTop: 20,
          }}>
          <Text style={{fontSize: 18}}> Tên của thú cưng: </Text>
          <TextInput
            style={{
              flex: 1,
              fontSize: 20,
              marginLeft: 10,
              borderBottomWidth: 0.5,
            }}
            autoCapitalize="none"
            placeholder="Moon"
            onChangeText={text => setName(text)}
          />
        </View>
        <View
          style={{
            width: '85%',
            heigh: '50%',
            marginLeft: 30,
            marginTop: 20,
          }}>
          <Text style={{fontSize: 18}}> Ảnh: </Text>
          <TextInput
            style={{
              flex: 1,
              fontSize: 20,
              marginLeft: 10,
              borderBottomWidth: 0.5,
            }}
            autoCapitalize="none"
            onChangeText={text => setImage(text)}
          />
        </View>
        <View
          style={{
            width: '85%',
            heigh: '50%',
            marginLeft: 30,
            marginTop: 20,
          }}>
          <Text style={{fontSize: 18}}> Loại: </Text>
          <TextInput
            style={{
              flex: 1,
              fontSize: 20,
              marginLeft: 10,
              borderBottomWidth: 0.5,
            }}
            autoCapitalize="none"
            placeholder="Chó hoặc Mèo"
            onChangeText={text => setType(text)}
          />
        </View>
        <View
          style={{
            width: '85%',
            heigh: '50%',
            marginLeft: 30,
            marginTop: 20,
          }}>
          <Text style={{fontSize: 18}}> Giới tính: </Text>
          <TextInput
            style={{
              flex: 1,
              fontSize: 20,
              marginLeft: 10,
              borderBottomWidth: 0.5,
            }}
            autoCapitalize="none"
            placeholder="Đực hay Cái"
            onChangeText={text => setGender(text)}
          />
        </View>
        <View
          style={{
            width: '85%',
            heigh: '50%',
            marginLeft: 30,
            marginTop: 20,
          }}>
          <Text style={{fontSize: 18}}> Giống: </Text>
          <TextInput
            style={{
              flex: 1,
              fontSize: 20,
              marginLeft: 10,
              borderBottomWidth: 0.5,
            }}
            autoCapitalize="none"
            placeholder="Poodle, Bug, Chó Ta,..."
            onChangeText={text => setBreed(text)}
          />
        </View>
        <View
          style={{
            width: '85%',
            heigh: '50%',
            marginLeft: 30,
            marginTop: 20,
          }}>
          <Text style={{fontSize: 18}}> Cân nặng: </Text>
          <TextInput
            style={{
              flex: 1,
              fontSize: 20,
              marginLeft: 10,
              borderBottomWidth: 0.5,
            }}
            autoCapitalize="none"
            placeholder="4kg"
            onChangeText={text => setWeihgt(text)}
          />
        </View>
        <View
          style={{
            marginTop: 10,
            display: 'flex',
            width: '100%',
            height: 150,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => handleAddPets()}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '80%',
              height: '35%',
              backgroundColor: '#E85C00',
              borderRadius: 5,
            }}>
            <Text style={{fontSize: 20, fontWeight: 500, color: '#fff'}}>
              Thêm
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default AddPets;

const styles = StyleSheet.create({});
