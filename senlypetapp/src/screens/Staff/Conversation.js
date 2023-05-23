import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import TimeAgo from 'react-native-timeago';
const Conversation = ({navigation}) => {
  const [conversation, setConversation] = useState([]);
  const [infoStaff, setInfoStaff] = useState([]);

  useEffect(() => {
    (async () => {
      let jsonValue = await AsyncStorage.getItem('infoStaff');
      jsonValue = JSON.parse(jsonValue);
      if (jsonValue) {
        setInfoStaff(jsonValue);
        console.log('jsonValue', jsonValue);
        getAllConversation(jsonValue._id);
      }
    })();
  }, []);
  const getAllConversation = async id => {
    await axios
      .get('http://10.0.2.2:3000/api/conversation/idstaff=' + id)
      .then(res => {
        const temp = res?.data.conversation;
        console.log('doi thoaij cua nhan viên: ', temp);
        setConversation(temp);
      });
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
          paddingHorizontal: 15,
          justifyContent: 'space-around',
          alignItems: 'center',
          position: 'relative',
          backgroundColor: '#1E7178',
        }}>
        <Text
          style={{
            width: '85%',
            fontSize: 22,
            fontWeight: 600,
            color: '#fff',
            textAlign: 'center',
            paddingBottom: 5,
          }}>
          Tin nhắn
        </Text>
        <TouchableOpacity onPress={() => getAllConversation(infoStaff._id)}>
          <Ionicons
            name="sync-sharp"
            style={{textAlign: 'right', fontSize: 22, color: '#fff'}}
          />
        </TouchableOpacity>
        <View></View>
      </View>

      <ScrollView
        style={{paddingTop: 0, marginTop: 5, backgroundColor: '#fff'}}>
        {conversation &&
          conversation.map((c, k) => (
            <TouchableOpacity
              key={k}
              onPress={() =>
                navigation.navigate('ChatsOS', {
                  roomId: c.roomId,
                  infoCustomer: c.idCustomer,
                  groomer: c.idStaff,
                })
              }>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  width: '96%',
                  height: 80,
                  backgroundColor: '#fff',
                  paddingVertical: 10,
                  marginHorizontal: 5,
                  borderBottomWidth: 0.2,
                  borderColor: 'grey',
                  marginTop: 1,
                }}>
                <Image
                  source={{uri: c.idCustomer.image}}
                  resizeMode="cover"
                  style={{
                    width: '17%',
                    height: '95%',
                    borderWidth: 1,
                    borderColor: 'black',
                    borderRadius: 50,
                  }}
                />
                <View style={{flex: 1, marginLeft: 8, paddingRight: 10}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        textAlign: 'justify',
                        marginTop: 8,
                        fontSize: 20,
                        color: '#000',
                      }}>
                      {c.idCustomer.fullname}
                    </Text>
                    <TimeAgo
                      style={{fontSize: 14}}
                      time={c.message[0].createdAt}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text style={{fontSize: 15}}> {c.message[0].text}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </ScrollView>
    </View>
  );
};

export default Conversation;

const styles = StyleSheet.create({});
