import React, {useState} from 'react'
import {View, StyleSheet, Text, Image, SafeAreaView, ScrollView, SectionList, StatusBar, Dimensions, TouchableOpacity, Slider} from 'react-native';
import tw from 'twrnc';
import {useTailwind} from 'tailwind-rn';

import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';



//styling


//data

import {trendingItems} from './data';
import {popularProducts} from "./data"
import {trending} from './trendingDummyData';



//slider screen variables
// const SliderWidth = Dimensions.get('screen').width;
const {width: SliderWidth, height: viewporHeight} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(SliderWidth * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3/4);

function Trending() {
    const navigation  = useNavigation();
    const [carouselState, setCarouselState] = useState('');

    const _onPressCarousel = ({item}) => {

    }


   const _renderItem = ({item, index}) => {
        return (
          <TouchableOpacity onPress = {() => {
            navigation.navigate("Detail", {
              name: item.title,
              price: item.price,
              description: item.desc,
              img: item.img,
              details: item.details,
            })
          }}>
            <View key = {index} style={styles.itemContainer}>
            <View >
                <Image  
                source = {{uri: item.img}}
                style = {styles.image}
                />         
            </View>
            <View>
                    <Text style = {[tw`text-sm text-gray-500 pt-10 text-center mt-1`]}>  {item.desc} </Text>
                    <Text style = {[styles.title, tw`text-center mt-1`]}> {item.title} </Text>
                    <Text style = {tw`mt-1 text-gray-900 text-center`}> $ {item.price} </Text>
            </View>

            </View>
            </TouchableOpacity>
        );
    }

  
    return (
                <SafeAreaView style = {styles.topContainer}>
                <View style = {tw`bg-white`}>
                    <View style = {tw`py-8`}>
                        <View style = {tw`px-6 flex items-center justify-between`}>
                        <Text style = {tw`text-2xl mb-6 font-extrabold tracking-tight text-gray-900`}> Trending products </Text>
                        <Text style = {tw`hidden text-sm font-semibold text-indigo-600`}> See Everything</Text>
                    </View>
                        <View style = {tw`w-full h-90 `}>
                            <Carousel 
                                layout = {"default"}
                                sliderWidth = {SliderWidth}
                                itemWidth = {ITEM_WIDTH}
                                data  = {trending}
                                renderItem = {_renderItem}
                                useScrollView = {true}
                            />
                        </View>
                        <View style = {tw`py-4`}>
                        </View>

                    </View>
                </View> 
                </SafeAreaView>   
    )
}


  

export default Trending;


const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexGrow: 1,
      paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16,
      
    },
    topContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 50
    },
    item: {
      backgroundColor: "#f9c2ff",
      padding: 20,
      marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    image: {
        width: ITEM_WIDTH,
        height: 225,
        resizeMode: 'contain',
        backgroundColor: '#E7E7E3'
    },
    itemContainer: {
        width: ITEM_WIDTH,
        paddingBottom: 40,
        elevation: 7,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white'
      },
    bodyText: {
        color: 'red',
        alignItems: 'center',
        justifyContent: 'center'

    }

  });
