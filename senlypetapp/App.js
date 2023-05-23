/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

// Dung Redux-thunk
import {Provider} from 'react-redux';

// Cac trang cua khach hang
import Welcome from './src/screens/Welcome';
import LoginCustomer from './src/screens/Customer/Login';
import RegisterCustomer from './src/screens/Customer/Register';
import BottomTabCustomer from './src/navigation/bottomTabCustomer';
import ProductPage from './src/screens/Customer/ProductPage';
import DetailProduct from './src/screens/Customer/DetailProduct';
import ServicesPage from './src/screens/Customer/ServicesPage';
import DetailService from './src/screens/Customer/DetailService';
import DetailServicePackage from './src/screens/Customer/DetailServicePackage';
import AmSchedule from './src/screens/Customer/AmSchedule';
import MyCart from './src/screens/Customer/MyCart';
import MaAppointment from './src/screens/Customer/MaAppointment';
import TimeAppointment from './src/screens/Customer/TimeAppointment';
import DetailStaff from './src/screens/Customer/DetailStaff';
import InfoAccount from './src/screens/Customer/InfoAccount';
import MyOrders from './src/screens/Customer/MyOrders';
import CheckOut from './src/screens/Customer/CheckOut';
import MyDetailOrder from './src/screens/Customer/MyDetailOrder';
import ConfirmSchedule from './src/screens/Customer/ConfirmSchedule';
import MySchedule from './src/screens/Customer/MySchedule';
import InfoStaff from './src/screens/Customer/InfoStaff';
import Chats from './src/screens/Customer/Chats';
import ForgetPassword from './src/screens/Customer/ForgetPassword';
import ChangePassword from './src/screens/Customer/ChangePassword';
import UpdateAddress from './src/screens/Customer/UpdateAddress';
import AddPets from './src/screens/Customer/AddPets';
import InfoPets from './src/screens/Customer/InfoPets';
import DetailNews from './src/screens/Customer/DetailNews';

// Cac trang danh cho nhan vien
import LoginStaff from './src/screens/Staff/Login';
import BottomTabStaff from './src/navigation/bottomTabStaff';
import ProductPageStaff from './src/screens/Staff/Products';
import ServicePageStaff from './src/screens/Staff/Services';
import AmScheduleOS from './src/screens/Staff/AmScheduleOS';
import DetailScheduleOS from './src/screens/Staff/DetailScheduleOS';
import ServicePayment from './src/screens/Staff/ServicePayment';
import MyScheduleStaff from './src/screens/Staff/MySchedule';
import ChatsOS from './src/screens/Staff/ChatsOS';
import {QueryClient, QueryClientProvider} from 'react-query';
const queryClient = new QueryClient();
const Stack = createNativeStackNavigator();
function App() {
  return (
    <Provider>
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Welcome">
            <Stack.Screen
              name="Welcome"
              component={Welcome}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="LoginCustomer"
              component={LoginCustomer}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="RegisterCustomer"
              component={RegisterCustomer}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HomeCustomer"
              component={BottomTabCustomer}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ForgetPassword"
              component={ForgetPassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProductPage"
              component={ProductPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DetailProduct"
              component={DetailProduct}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ServicesPage"
              component={ServicesPage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DetailService"
              component={DetailService}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DetailServicePackage"
              component={DetailServicePackage}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MaAppointment"
              component={MaAppointment}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="InfoAccount"
              component={InfoAccount}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="InfoPets"
              component={InfoPets}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DetailNews"
              component={DetailNews}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DetailStaff"
              component={DetailStaff}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="InfoStaff"
              component={InfoStaff}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TimeAppointment"
              component={TimeAppointment}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AmSchedule"
              component={AmSchedule}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyCart"
              component={MyCart}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="UpdateAddress"
              component={UpdateAddress}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="CheckOut"
              component={CheckOut}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AddPets"
              component={AddPets}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyOrders"
              component={MyOrders}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyDetailOrder"
              component={MyDetailOrder}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ConfirmSchedule"
              component={ConfirmSchedule}
              options={{headerShown: false}}
            />

            <Stack.Screen
              name="LoginStaff"
              component={LoginStaff}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="HomeStaff"
              component={BottomTabStaff}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ProductPageStaff"
              component={ProductPageStaff}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ServicePageStaff"
              component={ServicePageStaff}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="AmScheduleOS"
              component={AmScheduleOS}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="DetailScheduleOS"
              component={DetailScheduleOS}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MySchedule"
              component={MySchedule}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Chats"
              component={Chats}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChatsOS"
              component={ChatsOS}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ChangePassword"
              component={ChangePassword}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="MyScheduleStaff"
              component={MyScheduleStaff}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="ServicePayment"
              component={ServicePayment}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
