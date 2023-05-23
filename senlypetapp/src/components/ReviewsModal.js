import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ReviewsModal = props => {
  const [count, setCount] = useState(0);
  const [review, setReview] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [infoCustomer, setInfoCustomer] = useState([]);
  const [idSche, setidSche] = useState(props.sch._id);

  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('infoCustomer');
      jsonValue = JSON.parse(jsonValue);
      if (jsonValue) {
        setInfoCustomer(jsonValue);
        (async () => {
          await axios
            .get(
              'http://10.0.2.2:3000/api/bill/service/customer/id=' +
                jsonValue._id,
            )
            .then(res => {
              const temp = res?.data.bill;
              const s = res?.data.service;
              setSchedule(temp);
            });
        })();
      }
    })();
  }, []);

  const closeModal = async bool => {
    props.changeModalVisible(bool);
    console.log('da dong modal');
  };

  const handleReview = async bool => {
    if (count === 0 || review === null) {
      props.changeModalVisible(bool);
      console.log('da dong modal');
    } else {
      props.changeModalVisible(bool);
      await axios
        .post('http://10.0.2.2:3000/api/review/schedule', {
          idStaff: props.sch.idStaff,
          idService: props.sch.idService,
          idCustomer: infoCustomer._id,
          idSchedule: props.sch._id,
          star: count,
          content: review,
        })
        .then(async res => {
          console.log('Danh gia thanh cong');
        });
      await axios
        .put(
          'http://10.0.2.2:3000/api/customer/schedule/' + idSche + '/status=5',
        )
        .then(res => {
          console.log('Put status: 5');
        });
    }
  };

  return (
    <View style={{flex: 1}}>
      <View
        disabled={true}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: HEIGHT - 540,
            width: WIDTH - 100,
            paddingTop: 10,
            backgroundColor: '#fff',
            elevation: 4,
            borderRadius: 10,
          }}>
          <View
            style={{
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 25,
                fontWeight: 'bold',
                paddingVertical: 5,
                textAlign: 'justify',
                color: '#000',
              }}>
              Đánh giá
            </Text>
          </View>
          <View
            style={{
              // flex: 1,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            {count === 0 ? (
              <>
                <Ionicons
                  onPress={() => setCount(1)}
                  name="star-outline"
                  size={34}
                  style={{color: 'black'}}
                />
                <Ionicons
                  onPress={() => setCount(2)}
                  name="star-outline"
                  size={34}
                  style={{color: 'black'}}
                />
                <Ionicons
                  onPress={() => setCount(3)}
                  name="star-outline"
                  size={34}
                  style={{color: 'black'}}
                />
                <Ionicons
                  onPress={() => setCount(4)}
                  name="star-outline"
                  size={34}
                  style={{color: 'black'}}
                />
                <Ionicons
                  onPress={() => setCount(5)}
                  name="star-outline"
                  size={34}
                  style={{color: 'black'}}
                />
              </>
            ) : null}
            {count === 1 ? (
              <>
                <Ionicons
                  onPress={() => setCount(1)}
                  name="star"
                  size={34}
                  style={{color: '#F0CA00'}}
                />
                <Ionicons
                  onPress={() => setCount(2)}
                  name="star-outline"
                  size={34}
                  style={{color: 'black'}}
                />
                <Ionicons
                  onPress={() => setCount(3)}
                  name="star-outline"
                  size={34}
                  style={{color: 'black'}}
                />
                <Ionicons
                  onPress={() => setCount(4)}
                  name="star-outline"
                  size={34}
                  style={{color: 'black'}}
                />
                <Ionicons
                  onPress={() => setCount(5)}
                  name="star-outline"
                  size={34}
                  style={{color: 'black'}}
                />
              </>
            ) : null}
            {count === 2 ? (
              <>
                <Ionicons
                  onPress={() => setCount(1)}
                  name="star"
                  size={34}
                  style={{color: '#F0CA00'}}
                />

                <Ionicons
                  onPress={() => setCount(2)}
                  name="star"
                  size={34}
                  style={{color: '#F0CA00'}}
                />

                <Ionicons
                  onPress={() => setCount(3)}
                  name="star-outline"
                  size={34}
                  style={{color: 'black'}}
                />
                <Ionicons
                  onPress={() => setCount(4)}
                  name="star-outline"
                  size={34}
                  style={{color: 'black'}}
                />
                <Ionicons
                  onPress={() => setCount(5)}
                  name="star-outline"
                  size={34}
                  style={{color: 'black'}}
                />
              </>
            ) : null}
            {count === 3 ? (
              <>
                <Ionicons
                  onPress={() => setCount(1)}
                  name="star"
                  size={34}
                  style={{color: '#F0CA00'}}
                />

                <Ionicons
                  onPress={() => setCount(2)}
                  name="star"
                  size={34}
                  style={{color: '#F0CA00'}}
                />
                <Ionicons
                  onPress={() => setCount(3)}
                  name="star"
                  size={34}
                  style={{color: '#F0CA00'}}
                />

                <Ionicons
                  onPress={() => setCount(4)}
                  name="star-outline"
                  size={34}
                  style={{color: 'black'}}
                />

                <Ionicons
                  onPress={() => setCount(5)}
                  name="star-outline"
                  size={34}
                  style={{color: 'black'}}
                />
              </>
            ) : null}
            {count === 4 ? (
              <>
                <Ionicons
                  onPress={() => setCount(1)}
                  name="star"
                  size={34}
                  style={{color: '#F0CA00'}}
                />

                <Ionicons
                  onPress={() => setCount(2)}
                  name="star"
                  size={34}
                  style={{color: '#F0CA00'}}
                />

                <Ionicons
                  onPress={() => setCount(3)}
                  name="star"
                  size={34}
                  style={{color: '#F0CA00'}}
                />

                <Ionicons
                  onPress={() => setCount(4)}
                  name="star"
                  size={34}
                  style={{color: '#F0CA00'}}
                />

                <Ionicons
                  onPress={() => setCount(5)}
                  name="star-outline"
                  size={34}
                  style={{color: 'black'}}
                />
              </>
            ) : null}
            {count === 5 ? (
              <>
                <Ionicons
                  onPress={() => setCount(1)}
                  name="star"
                  size={34}
                  style={{color: '#F0CA00'}}
                />

                <Ionicons
                  onPress={() => setCount(2)}
                  name="star"
                  size={34}
                  style={{color: '#F0CA00'}}
                />

                <Ionicons
                  onPress={() => setCount(3)}
                  name="star"
                  size={34}
                  style={{color: '#F0CA00'}}
                />

                <Ionicons
                  onPress={() => setCount(4)}
                  name="star"
                  size={34}
                  style={{color: '#F0CA00'}}
                />
                <Ionicons
                  onPress={() => setCount(5)}
                  name="star"
                  size={34}
                  style={{color: '#F0CA00'}}
                />
              </>
            ) : null}
          </View>
          <View
            style={{
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'center',
              marginVertical: 5,
            }}>
            <TextInput
              multiline={true}
              numberOfLines={3}
              style={{
                fontSize: 18,
                width: '85%',
                height: 85,
                borderRadius: 30,
                paddingHorizontal: 20,
                borderColor: 'green',
                borderWidth: 1,
              }}
              onChangeText={text => setReview(text)}
              placeholder="Bình luận"
            />
          </View>
          <View
            style={{
              width: '100%',
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={{
                width: '35%',
                height: '80%',
                // paddingVertical: 5,
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: '#98afc7',
                marginBottom: 10,
              }}
              onPress={() => closeModal(false, 'Cancel')}>
              <Text
                style={{
                  marginTop: 3,
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Hủy
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: '35%',
                height: '80%',
                alignItems: 'center',
                borderRadius: 10,
                backgroundColor: '#e85c00',
                marginBottom: 10,
              }}
              onPress={() => handleReview(false, 'Cancel')}>
              <Text
                style={{
                  marginTop: 3,
                  fontSize: 17,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                Xong
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

export default ReviewsModal;

const styles = StyleSheet.create({});
