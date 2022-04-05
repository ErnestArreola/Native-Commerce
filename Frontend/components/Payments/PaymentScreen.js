import { CardField, useStripe } from '@stripe/stripe-react-native';
import {View, Screen, Button, Text, Alert, StyleSheet} from 'react-native';
import {useState, useEffect} from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {publicRequest} from '../../requestMethods';
import tw from 'twrnc';
import {useSelector, useDispatch} from 'react-redux';
import {emptyCart} from '../../redux/reducers/cartRedux';

const API_URL = 'https://native-commerce.herokuapp.com/api'

 function PaymentScreen() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(isLoggedIn);
    if(user === null || user === undefined) {
      setisLoggedIn(false);
    } else {
      setisLoggedIn(true);
    }
  }, [user])

  const fetchPaymentSheetParams = async () => {
    const response = await fetch(`${API_URL}/checkout/payment-sheet`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const { paymentIntent, ephemeralKey, customer} = await response.json();

    return {
      paymentIntent,
      ephemeralKey,
      customer,
    };
  };

  const initializePaymentSheet = async () => {
    console.log("Payment")
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      publishableKey,
    } = await fetchPaymentSheetParams();

    const { error } = await initPaymentSheet({
      customerId: customer,
      customerEphemeralKeySecret: ephemeralKey,
      paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true,
    });
    if (!error) {
      setLoading(true);
    }
  };

  const checkLogin = () => {
    if(isLoggedIn === true) {
      openPaymentSheet();
    } else if (isLoggedIn === false) {
      Alert.alert('Please login to checkout.');
    }
  }

  const openPaymentSheet = async () => {
    const { error } = await presentPaymentSheet();

    if (error) {
      Alert.alert(`${error.code}`, error.message);
    } else {
      dispatch(emptyCart());
      Alert.alert('Success', 'Your order is confirmed!');
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return (
    <>
      <TouchableOpacity
        disabled={!loading}
        onPress={checkLogin}
        style = {styles.loginScreenButton}
      >
          <Text style= {tw`w-full text-center text-base font-extrabold font-medium text-white text-xl py-1`}> Checkout </Text>
        </TouchableOpacity>
    </>
  );
}


export default PaymentScreen



const styles = StyleSheet.create ({
  loginScreenButton:{
    paddingTop:10,
    paddingBottom:10,
    backgroundColor:'#000000',
    borderRadius:25,
    borderWidth: 1,
    borderColor: '#fff',
    paddingRight: 5,
  },
})