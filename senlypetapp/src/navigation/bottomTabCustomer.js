import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Home from '../screens/Customer/Home';
import Notification from '../screens/Customer/Notification';
import Individual from '../screens/Customer/Individual';
import Conversation from '../screens/Customer/Conversation';
// Screen names
const home = 'Trang chủ';
const notification = 'Thông báo';
const individual = 'Cá nhân';
const conversation = 'Tin nhắn';
const Tab = createBottomTabNavigator();

const BottomTabCustomer = () => {
  return (
    <Tab.Navigator
      initialRouteName={home}
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#1E7178',
        tabBarInactiveTintColor: 'grey',
        tabBarLabelStyle: {
          paddingBottom: 5,
          fontSize: 10,
        },
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let rn = route.name;

          if (rn === home) {
            iconName = focused ? 'home' : 'home-outline';
          } else if (rn === notification) {
            iconName = focused ? 'notifications' : 'notifications-outline';
          } else if (rn === conversation) {
            iconName = focused
              ? 'chatbox-ellipses'
              : 'chatbox-ellipses-outline';
          } else if (rn === individual) {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen name={home} component={Home} options={{headerShown: false}} />
      <Tab.Screen
        name={notification}
        component={Notification}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={conversation}
        component={Conversation}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={individual}
        component={Individual}
        options={{headerShown: false}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabCustomer;

const styles = StyleSheet.create({});
