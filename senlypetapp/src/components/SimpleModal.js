import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const SimpleModal = props => {
  const closeModal = bool => {
    props.changeModalVisible(bool);
    props.navigation.navigate('HomeCustomer');
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
          height: '5%',
          flexDirection: 'row',
          paddingHorizontal: 15,
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: '#1E7178',
        }}>
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <FontAwesome5
            name="arrow-left"
            size={18}
            style={{
              color: '#fff',
            }}></FontAwesome5>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 22,
            fontWeight: 600,
            color: '#fff',
          }}>
          Xác nhận lịch hẹn
        </Text>
        <View></View>
      </View>
      <View
        disabled={true}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <View
          style={{
            height: HEIGHT - 650,
            width: WIDTH - 50,
            paddingVertical: 10,
            backgroundColor: 'white',
            borderRadius: 10,
            elevation: 10,
          }}>
          <View style={{flex: 1, alignItems: 'center'}}>
            <Text
              style={{
                margin: 5,
                fontSize: 18,
                paddingTop: 10,
                paddingHorizontal: 20,
                textAlign: 'center',
              }}>
              Vui lòng chờ đợi cửa hàng sẽ xác nhận đặt lịch của bạn
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'flex-end',
            }}>
            <TouchableOpacity
              style={{
                width: '20%',
                height: '80%',
                paddingVertical: 5,
                alignItems: 'center',
                borderRadius: 20,
                marginBottom: 8,
                marginRight: 10,
              }}
              onPress={() => closeModal(false, 'Cancel')}>
              <Text
                style={{
                  margin: 2,
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#E85C00',
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default SimpleModal;

const styles = StyleSheet.create({});
