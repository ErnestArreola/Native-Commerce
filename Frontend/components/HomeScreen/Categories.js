import React, {useState} from 'react'
import {View, StyleSheet, Text, Image, SafeAreaView, ScrollView, SectionList, StatusBar, Dimensions, TouchableOpacity, Slider, ImageBackground} from 'react-native';
import tw from 'twrnc';
import { FlatGrid } from 'react-native-super-grid';

import {categories} from './data';

function Categories() {

    const [items, setItems] = React.useState([
        { name: 'TURQUOISE', code: '#1abc9c' },
        { name: 'EMERALD', code: '#2ecc71' },
        { name: 'PETER RIVER', code: '#3498db' },
        { name: 'AMETHYST', code: '#9b59b6' },
        { name: 'WET ASPHALT', code: '#34495e' },
        { name: 'GREEN SEA', code: '#16a085' },
        { name: 'NEPHRITIS', code: '#27ae60' },
        { name: 'BELIZE HOLE', code: '#2980b9' },
        { name: 'WISTERIA', code: '#8e44ad' },
        { name: 'MIDNIGHT BLUE', code: '#2c3e50' },
        { name: 'SUN FLOWER', code: '#f1c40f' },
        { name: 'CARROT', code: '#e67e22' },
        { name: 'ALIZARIN', code: '#e74c3c' },
        { name: 'CLOUDS', code: '#ecf0f1' },
        { name: 'CONCRETE', code: '#95a5a6' },
        { name: 'ORANGE', code: '#f39c12' },
        { name: 'PUMPKIN', code: '#d35400' },
        { name: 'POMEGRANATE', code: '#c0392b' },
        { name: 'SILVER', code: '#bdc3c7' },
        { name: 'ASBESTOS', code: '#7f8c8d' },
      ]);

      const emptyComponent = () => {return <Text> </Text>};

      const _renderItem = ({item, index}) => {
          return (
            <View style = {tw``} >
                <ImageBackground
                    source = 
                    {{
                        uri: item.img
                    }}
                    style = {[styles.itemContainer, tw`my-2`]}
                    >
                        
                <Text style = {[styles.text, tw`absolute inset-0 content-end text-left px-4`]}> {item.title}</Text>
                        <Text style = {[styles.secondaryText, tw`absolute inset-0 content-end text-left px-4`]}> {item.txt}  </Text>
                </ImageBackground>
            </View>
          );
      }

    return (
      <View  style = {tw`bg-gray-50`}>
          <View style = {tw`max-w-7xl mx-auto py-10 px-6`}>
              <View style = {tw`flex items-baseline justify-between`}>
                  <Text style = {tw`text-2xl font-extrabold tracking-tight text-gray-900`}> Shop by Category </Text>
                  <Text style = {tw``}></Text>
              </View>
                {/* <SafeAreaView style = {{flex: 1}}> */}
                    <FlatGrid
                        scrollEnabled = {true}
                        ListHeaderComponent = {<></>}
                        ListFooterComponent = {<></>}
                        itemDimension={250}
                        data={categories}
                        style={styles.gridView}
                        // staticDimension={300}
                        // fixed
                        spacing={10}
                        renderItem = {_renderItem}
                    />
                {/* </SafeAreaView> */}
          </View>
      </View>
    )
}

export default Categories


const styles = StyleSheet.create({
    gridView: {
      marginTop: 10,
      flex: 1,
    },
    itemContainer: {
      display: 'flex',
      justifyContent: 'flex-start',
      padding: 10,
      height: 190,
      backgroundColor: 'white',
      borderRadius: 10,
      overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
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
    textOver: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    text: {
        color: "white",
        fontSize: 28,
        lineHeight: 230,
        justifyContent: 'center',
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: 'rgba(52, 52, 52, 0.3)'
      },
    secondaryText: {
        color: "white",
        fontSize: 18,
        marginTop: 30,
        lineHeight: 250,
        justifyContent: 'center',
        fontWeight: "700",
        textAlign: "center",
    }
    
  });