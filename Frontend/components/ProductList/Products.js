import React, {useState, useEffect} from 'react'
import {View, StyleSheet, Text, Image, SafeAreaView, ScrollView, SectionList, StatusBar, Dimensions, TouchableOpacity, Slider} from 'react-native';
import tw from 'twrnc';
import {useTailwind} from 'tailwind-rn';
import { FlatGrid } from 'react-native-super-grid';
import axios from 'axios';
import {useSelector} from 'react-redux';

import {useNavigation} from '@react-navigation/native';

//components 
import FilterDrawer from './FilterDrawer';

//dummy data
import {product} from './data';
import {trending} from '../HomeScreen/trendingDummyData';


  
const {width: SliderWidth, height: viewporHeight} = Dimensions.get('window');
const ITEM_WIDTH = Math.round(SliderWidth * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3/4);



function ProductList() {
    const [productList, setProductList] = useState([]);
    const [isLoading, setisLoading] = useState(true);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const navigation = useNavigation();
    const [cat, filters] = useState('');
    const sort = useSelector((state) => state.products.sort);

    useEffect(() => {
            apiFetch();
    }, [cat])

    useEffect(() => {
      console.log(sort);
        if (sort === "newest") {
          setFilteredProducts((prev) =>
            [...prev].sort((a, b) => a.createdAt - b.createdAt)
          );
        } else if (sort === "asc") {
          setFilteredProducts((prev) =>
            [...prev].sort((a, b) => a.price - b.price)
          );
        } else if (sort === "desc") {
          setFilteredProducts((prev) =>
            [...prev].sort((a, b) => b.price - a.price)
          );
        }
      }, [sort]);

      useEffect(() => {
        cat &&
          setFilteredProducts(
            productList.filter((item) =>
              Object.entries(filters).every(([key, value]) =>
                item[key].includes(value)
              )
            )
          );
      }, [productList, cat, filters]);

      const apiFetch = async () =>  {
        try {
          const response = await axios.get(
            cat
              ? `https://native-commerce.herokuapp.com/api/products?category=${cat}`
              : "https://native-commerce.herokuapp.com/api/products"
          );
        {
            response.data ? setFilteredProducts(arrayMerge => [...response.data, ...trending]) : setProductList(trending)
        }
        } catch (err) {

        } finally {
            setisLoading(false);
        }

}



    {/* Rendered List, The display for each Item in the grid*/}
    const _renderItem = ({item, index}) => {
        return (
            <>
            <TouchableOpacity 
                onPress = {()=> {
                    navigation.navigate("Detail", {
                        id: item._id,
                        name: item.title,
                        price: item.price,
                        description: item.desc,
                        img: item.img,
                        details: item.details
                    })
                }}
            >
            <View style = {[tw`border-gray-200`, styles.itemContainer]}>
                <View style = {tw`w-full h-full  rounded-lg  bg-gray-200`}>
                    <Image
                        source = {{
                            uri: item.img
                        }}
                        style = {[tw`h-full`, styles.image]}
                    />
                </View>
                <Text style = {tw`pt-4 pb-2 font-medium text-gray-900`}>{item.title} </Text>
                    <Text style = {tw`pb-2 text-gray-500 italic`}> {item.categories[0]}</Text>
                <Text style = {{paddingBottom: 200}}> ${item.price} </Text>
            </View>
            </TouchableOpacity>
            </>
        );
    }
    

    return (
        <View style = {{flex: 1, backgroundColor: 'white'}}>
            {!isLoading && 
                        <FlatGrid
                        ListHeaderCompoonent = {
                        <Text></Text>
                         }
                        ListFooterComponent = {<Text></Text>}
                            itemDimension={150}
                            data={filteredProducts}
                            style={[styles.gridView]}
                            // staticDimension={300}
                            // fixed
                            spacing={5}
                            renderItem = {_renderItem}
                        />
                }
            </View> 

        
    )
}


export default ProductList


const styles = StyleSheet.create({
    gridView: {
      marginTop: 4,
      flex: 1,
      height: '100%'
    },
    itemContainer: {
        justifyContent: 'flex-start',
        borderRadius: 5,
        padding: 5,
        height: 260,
        width: 200,
        marginBottom: 80,
        paddingBottom: 50
        
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },
    itemName: {
      fontSize: 16,
      color: '#000',
      fontWeight: '600',
    },
    itemCode: {
      fontWeight: '600',
      fontSize: 12,
      color: '#fff',
    },
    backgroundContainer: {
        display: 'flex',
        flex: 1,
        height: '100%'
    }
    
  });