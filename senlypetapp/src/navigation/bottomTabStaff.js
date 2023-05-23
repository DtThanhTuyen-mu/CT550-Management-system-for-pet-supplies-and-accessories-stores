import {StyleSheet} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Notification from '../screens/Staff/Notification';
import Individual from '../screens/Staff/Individual';
import AmScheduleOS from '../screens/Staff/AmScheduleOS';
import ScheduleDateOS from '../screens/Staff/ScheduleDateOS';
import Conversation from '../screens/Staff/Conversation';
// Screen names
const home = 'Trang chủ';
const scheduledate = 'Lịch hẹn';
const notification = 'Thông báo';
const conversation = 'Tin nhắn';
const individual = 'Cá nhân';
const Tab = createBottomTabNavigator();

const BottomTabStaff = () => {
  return (
    <Tab.Navigator
      initialRouteName={home}
      screenOptions={({route}) => ({
        tabBarActiveTintColor: '#135B61',
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
          } else if (rn === scheduledate) {
            iconName = focused ? 'today' : 'today-outline';
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
      <Tab.Screen
        name={home}
        component={AmScheduleOS}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name={scheduledate}
        component={ScheduleDateOS}
        options={{headerShown: false}}
      />
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

export default BottomTabStaff;

const styles = StyleSheet.create({});
