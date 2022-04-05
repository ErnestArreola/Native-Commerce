import React from 'react'
import {View, StyleSheet, Text, Image, SafeAreaView, ScrollView, TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import tw from 'twrnc';
import {useTailwind} from 'tailwind-rn';

import {useNavigation} from '@react-navigation/native';



function Intro() {

  const tailwind = useTailwind();
  const navigation = useNavigation();

  const _handleOnPress = () => {
      navigation.navigate("Products", {
         name: 'New Arrivals'
      })
  }

  return (
      <SafeAreaView>
      <View style = {tw`bg-white`}>
      <View style = {tw`relative bg-gray-900`}>
        <View style = {tw`absolute inset-0 overflow-hidden`}>
        <Image  
        
            source = {{uri: "https://kwiazurecdn.azureedge.net/images/resized/768/sitefiles/oscar/category/2374/01122022123828-2374.jpg" }}
            style = {styles.image}
            />
        </View>
        <View style = {tw`absolute inset-0 bg-gray-900 opacity-50`}/>
        <View style = {tw`relative max-w-3xl mx-auto py-32 px-6 flex flex-col items-center`}> 
          <Text style = {tw`text-4xl font-extrabold text-white text-center`}> New Arrivals are Here </Text>
          <Text style = {tw`mt-4 text-xl text-white text-center`}> The new arrivals have, well, newly arrived. Check out the latest options from our summer small-batch release whilre they're still in stock</Text>

          <TouchableOpacity
            style = {[styles.textContainer, tw`mt-8`]}
            activeOpacity = {1}
            onPress = {_handleOnPress}
          >
            <Text style = {[tw`px-4 w-full text-center text-base font-extrabold font-medium text-black text-xl py-1`]}> Shop New Arrivals </Text>
          </TouchableOpacity>
        </View>
        </View> 
    </View>

    </SafeAreaView>
  )
}

export default Intro;




const styles = StyleSheet.create({
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#fff',
      borderRadius:8,
      borderWidth: 1,
      borderColor: '#fff',
      paddingRight: 5,
      // pointerEvents: 'box-none',
    }
});

