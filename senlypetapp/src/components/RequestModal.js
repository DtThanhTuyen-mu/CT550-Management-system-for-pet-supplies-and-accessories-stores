import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const RequestModal = props => {
  console.log('truyen: ', props.sch);
  const closeModal = async bool => {
    props.changeModalVisible(bool);
  };
  const handleRequest = async bool => {
    props.changeModalVisible(bool);
  };

  return (
    <View
      disabled={true}
      style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View
        style={{
          height: HEIGHT - 640,
          width: WIDTH - 100,
          paddingTop: 10,
          borderRadius: 10,
        }}>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              margin: 5,
              fontSize: 20,
              fontWeight: 'bold',
              color: '#fff',
            }}>
            Xác nhận
          </Text>
        </View>
        <View
          style={{
            height: '35%',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 30,
          }}>
          <Text
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              textAlign: 'center',
              fontSize: 18,
            }}>
            Để xác nhận yêu cầu dời lịch vui lòng chọn OK
          </Text>
        </View>
        <View style={{width: '100%', flexDirection: 'row', marginTop: 10}}>
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 10,
              alignItems: 'center',
              borderTopWidth: 0.2,
              borderRightWidth: 0.5,
            }}
            onPress={() => closeModal(false, 'Cancel')}>
            <Text
              style={{
                margin: 5,
                fontSize: 16,
                fontWeight: 'bold',
                color: 'blue',
              }}>
              Cancel
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 1,
              paddingVertical: 10,
              alignItems: 'center',
              borderTopWidth: 0.2,
            }}
            onPress={() => handleRequest(false)}>
            <Text
              style={{
                margin: 5,
                fontSize: 16,
                fontWeight: 'bold',
                color: 'blue',
              }}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default RequestModal;

const styles = StyleSheet.create({});
