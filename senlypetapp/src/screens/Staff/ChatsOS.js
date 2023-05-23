import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useCallback, useEffect, useState, useRef} from 'react';
import axios from 'axios';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import io from 'socket.io-client';

const Chats = ({navigation, route}) => {
  const {roomId, infoCustomer, groomer} = route.params;
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const socket = useRef();

  useEffect(() => {
    // setSocket(io('http://10.0.2.2:3000', {jsonp: false}));
    socket.current = io.connect('http://10.0.2.2:3001');
    socket.current.on('getMessage', data => {
      // console.log('Data nhan data: ', data);
      // console.log('Data nhan: ', data.senderName);
      setArrivalMessage({
        sender: data.senderName,
        text: data.text,
        createdAt: new Date(),
      });
    });
  }, []);
  useEffect(() => {
    arrivalMessage &&
      infoCustomer.fullname.includes(arrivalMessage.sender) &&
      getConversation(roomId);
  }, [arrivalMessage, infoCustomer]);

  useEffect(() => {
    socket.current.emit('addUser', groomer._id);
  }, [groomer]);

  const getConversation = async id => {
    await axios
      .get('http://10.0.2.2:3000/api/conversation/roomID=' + id)
      .then(res => {
        const temp = res?.data.conversation;
        setMessages(renderMessages(temp.message));
      });
  };
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getConversation(roomId);
    });
    return unsubscribe;
  }, [roomId]);

  const renderMessages = useCallback(
    msgs => {
      return msgs
        ? msgs.reverse().map((msg, index) => ({
            ...msg,
            _id: index,
            user: {
              _id:
                msg.sender === infoCustomer.fullname
                  ? infoCustomer.fullname
                  : groomer.fullname,
              avatar:
                msg.sender === infoCustomer.fullname
                  ? infoCustomer.image
                  : groomer.image,
              name:
                msg.sender === infoCustomer.fullname
                  ? infoCustomer.fullname
                  : groomer.fullname,
            },
          }))
        : [];
    },
    [
      infoCustomer.image,
      infoCustomer.fullname,
      groomer.image,
      groomer.username,
    ],
  );

  const onSend = useCallback(
    async (messages = []) => {
      // console.log('Received: ', infoCustomer._id);
      // console.log('Sender: ', groomer._id);
      await axios
        .put(
          'http://10.0.2.2:3000/api/conversation/sender=' +
            groomer.fullname +
            '/receiver=' +
            infoCustomer.fullname,
          {
            idCustomer: infoCustomer._id,
            idStaff: groomer._id,
            roomId,
            text: messages[0].text,
          },
        )
        .then(res => {
          socket.current.emit('sendMessage', {
            senderId: groomer._id,
            senderName: groomer.fullname,
            receiverId: infoCustomer._id,
            text: messages[0].text,
          });
        });
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, messages),
      );
    },
    [groomer.fullname, infoCustomer.fullname],
  );
  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#0E4CDB',
          },
          left: {
            backgroundColor: '#336AED',
          },
        }}
        textStyle={{
          right: {
            color: '#fff',
          },
          left: {
            color: '#fff',
          },
        }}
      />
    );
  };
  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            size={32}
            color="#2e64e5"
          />
        </View>
      </Send>
    );
  };
  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };
  return (
    <View
      style={{
        flex: 1,
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
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5
            name="arrow-left"
            size={22}
            style={{
              color: '#000',
              padding: 12,
            }}></FontAwesome5>
        </TouchableOpacity>
        <Text style={{fontSize: 22, color: '#000', fontWeight: 600}}>
          {infoCustomer.fullname}
        </Text>
        <View></View>
      </View>
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: groomer.fullname,
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </View>
  );
};

export default Chats;

const styles = StyleSheet.create({});
