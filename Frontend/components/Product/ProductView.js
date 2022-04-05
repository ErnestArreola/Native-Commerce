import React, {useEffect, useState} from 'react'
import {Button, View, Text, SafeAreaView, ScrollView, Image, StyleSheet, TouchableOpacity, Dimensions, AsyncStorage} from 'react-native';
import tw from 'twrnc';
import { useDispatch,  useSelector } from "react-redux";
import { publicRequest } from "../../requestMethods";


import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { addProduct } from '../../redux/reducers/cartRedux';
import axios from "axios";

//dummydata
import {trending} from '../HomeScreen/trendingDummyData';

const dimensions = Dimensions.get('window');
const imageHeight = Math.round(dimensions.width * 9 / 16);
const imageWidth = dimensions.width;



  const reviews = { href: '#', average: 4, totalCount: 117 }


function ProductView(props) {
  const cart = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const { id, name, price, description, img, details} =
      props.route.params;
    const [quantity, setQuantity] = useState(1);
    const [product, setProduct] = useState({});

    const _handleOnPress = () => {
      dispatch(
        addProduct({...product, quantity})
      );
    }

    //debugging
    // const _checkCart = () => {
    //   console.log(cart.products);
    //   console.log(cart.total);
    //   console.log(cart.quantity);
    // }

    const handleQuantity = (type) => {
      if (type === "dec") {
        quantity > 1 && setQuantity(quantity - 1);
      } else {
        setQuantity(quantity + 1);
      }
    };

    // const clearAsyncStorage = async() => {
    //   AsyncStorage.clear();
    // }

    const isLocal = () => {
      let obj;
      obj = trending.find(o => o._id === id);
      console.log(obj)
      if(obj === undefined) {
        return false;
      } else {
        return true;
      }
    }

    useEffect(() => {

      const getProduct = async () => {
        try {
          const res = await publicRequest.get("/products/find/" + id)
          setProduct(res.data);
          console.log("Yoooooo");
        } catch {}
      };
      if(isLocal()) {
        setProduct(trending.find(o => o._id === id));
        console.log(product);
      } else {
        getProduct();
      }

      
    }, [id]);

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }

      
    return (
                
            <SafeAreaView style = {{ flex: 1, backgroundColor: 'white'}}>
            <ScrollView>
                <View style = {tw`w-full h-full h-150`}> 
                    <Image
                        style = {styles.image}
                        source = {{
                            uri: img
                        }}
                        />
                </View>
                {/*  Product Info */}
                <View style = {[tw`max-w-2xl pt-4 px-3`]}> 
                        <Text style = {tw`text-3xl text-left font-bold tracking-tight text-gray-900 sm:text-3xl`}>{name}</Text>                
                </View>
                    {/* Options */}
                <View style = {tw`mt-4 px-4`}> 
                    <Text style = {tw`text-3xl text-gray-900`}>$ {price} </Text>
                    
                    {/* <View style = {tw`mt-4`}> 
                        <View style = {tw`flex flex-row`}>
                            <View style = {tw`flex flex-row`}>
                                <Text> Stars </Text>
                            </View>
                            <Text> Reviews </Text>
                        </View>
                    </View> */}
                        <TouchableOpacity
                                onPress = {_handleOnPress}
                                style={styles.loginScreenButton}
                                underlayColor='#fff'>
                                <Text style= {tw`w-full text-center text-base font-extrabold font-medium text-white text-xl`}> Add to Bag </Text>
                        </TouchableOpacity>
 

                </View>
                {/* Description */}
                <View style ={tw`mt-10`}>
                    <View style = {tw`px-4`}>
                        <Text style = {tw`px-2 text-base font-semibold mb-2`}>Description:</Text>
                        <Text style = {tw`text-sm px-2 text-justify text-gray-900`}>{details ? details : description} </Text>
                    </View>

                </View>
                <View style = {tw`mt-10`}>

                </View>
            </ScrollView>
            </SafeAreaView>

    )
}
export default ProductView



const styles = StyleSheet.create({
    image: {
        height: '100%',
        width: '100%',
        resizeMode: 'cover'
    },
    loginScreenButton:{
        marginTop:40,
        paddingTop:12,
        paddingBottom:12,
        backgroundColor:'#000000',
        borderRadius:25,
        borderWidth: 1,
        borderColor: '#fff'
      },
      loginText:{
          color:'#fff',
          textAlign:'center',
          paddingLeft : 10,
          paddingRight : 10
      }
    
  });


  const Icon = (props) => (
    <TouchableOpacity>
      <View>
        <FontAwesome5
          name={props.icon}
          size={25}
          style={{
            marginBottom: 3,
            alignSelf: "center",
          }}
        />
        <Text>{props.text}</Text>
      </View>
    </TouchableOpacity>
  );