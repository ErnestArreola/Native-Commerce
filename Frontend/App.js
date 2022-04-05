import { StatusBar } from 'expo-status-bar';
import { ScrollView, FlatList, StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';
import tw, { create } from "twrnc";
import {Provider, useSelector} from "react-redux";
// import {useSelector} from "react-redux";
import {store} from "./redux/store";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {createStackNavigator} from "@react-navigation/stack";
import {NavigationContainer} from "@react-navigation/native";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Host, Portal } from 'react-native-portalize';
import {StripeProvider} from '@stripe/stripe-react-native';

//FontAwesome
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import Ionicons from 'react-native-vector-icons/Ionicons';

// import {TabNavigator, StackNavigator} from 'react-navigation';

//views
// import Home from './Screens/Home';
// import ProductList from './Screens/ProductList';
// import ProductView from './components/Product/ProductView';
// import Product from './Screens/Product';
// import Cart from "./Screens/Cart";
// import Auth from "./Screens/Auth";

import { configureStore } from '@reduxjs/toolkit';
import TabNavigation from './redux/navigation';
//components
import FilterDrawer from './components/ProductList/FilterDrawer';



export default function App() {
  // const badgeNumber = useSelector((state) => state.products);

  const screenOptions  = {
    headerShown: false,
};

  return (
    <Provider store = {store}> 
      <StripeProvider
        publishableKey = "pk_test_51Ka3hNCOpkYnNMxZ1PHC6sjQzYc2arZT4OhmpxXk4t5SP5jY3fAmJ3WJofzfUjRH3YW7gFAdGca26mJsTw3Hnd8100Qy1vcpFC"
        merchantIdentifier="merchant.com.{{Native_Commerce}}"
      >
        <NavigationContainer>
          <Host>
            <TabNavigation/>
          </Host>
        </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}



