import React, {useState, useRef} from 'react'
import {View, StyleSheet, Text, Image, SafeAreaView, ScrollView, SectionList, StatusBar, Dimensions, TouchableOpacity, Slider} from 'react-native';
import tw from 'twrnc';
import CheckBox from '@react-native-community/checkbox';
import { Modalize } from 'react-native-modalize';
import { Host, Portal } from 'react-native-portalize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import RadioGroup from 'react-native-radio-buttons-group';
import RadioForm from 'react-native-simple-radio-button';
import {useSelector, useDispatch} from 'react-redux';
import {updateFilter} from '../../redux/reducers/productRedux';

const radio_props = [
  {label: 'Newest', value: 'newest', index: 0 },
  {label: 'Price: Low-High', value: 'asc', index: 1},
  {label: 'Price: High-Low', value: 'desc', index: 2 }
];


function FilterDrawer() {
  // const sort = useSelector((state) => state.products.sort);
  const [sorted, setsorted] = useState('');
  const [initial, setinitial] = useState(0);
  const [currentRadioSelection, setcurrentRadioSelection] = useState('');
  const dispatch = useDispatch();

  const setSort = () => {
    dispatch(
        updateFilter({sorted})
    );
      onClose();
  }

  const setProps = (props) => {
    setsorted(props);
    setinitial(radio_props.findIndex(obj => obj.value === props));

  }

  const renderContent = () => {
    return (
        <>
        </>
    );
}

  const _renderItem = () => {
    return (
      <View>
        <TouchableOpacity
          style = {{marginTop: 20, marginRight: 20}}
          onPress = {() => onClose()}          
        >
           <Ionicons  style = {{right: 0, justifyContent: 'flex-end', alignItems: 'flex-end', position: 'absolute'}} name = "close" size = {40}/>
        </TouchableOpacity>
        <Text style = {tw`mt-10 ml-4 text-lg font-semibold`}> Filter </Text>
        <Text style = {tw`mt-10 ml-4 text-md font-bold`}> Sort By </Text>
          <View style = {tw`mt-6 ml-4`}>
          <RadioForm
            radio_props = {radio_props}
            initial = {initial}
            buttonColor={'#000000'}
            animation = {false}
            selectedButtonColor = {'#000000'}
            buttonSize = {15}
            onPress = {(val) => setProps(val)}
          />
        </View>
        <View style = {tw`mt-8 border-b-2 border-b-gray-300`}/>
      </View>
    );
  }

  const _renderFooter = () => {
    return(
      <View style = {[tw`mb-5 py-8 px-4 flex border-t-2 border-t-slate-300 flex-row`, {justifyContent: 'center', alignItems: 'center'}]}>
        <View style = {{borderTopStartRadius: 25, borderTopColor: '#000', borderTopWidth: 0.2}}>

        </View>
      <TouchableOpacity
        style = {[tw`px-14 mr-4 bg-white `, {paddingTop: 10, paddingBottom: 10, borderRadius: 25, borderWidth: 1, borderColor: '#000'} ]}
      >
        <Text style = {tw`text-base text-center font-semibold tracking-tight`}> Reset </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress = {setSort}
        style = {[tw`px-14 ml-4 bg-black `, {paddingTop: 10, paddingBottom: 10, borderRadius: 25, borderWidth: 1, borderColor: '#fff'} ]}
        >
        <Text style = {tw`text-base text-white text-center font-semibold tracking-tight`}>Apply</Text>
      </TouchableOpacity>
      </View>
    );  
  }

  const Icon = (props) => (
    <TouchableOpacity onPress = {onOpen}>
      <View>
        <FontAwesome5
          name={props.icon}
          size={15}
          style={{
            marginRight: 30,
            alignSelf: "left",
          }}
        />
      </View>
    </TouchableOpacity>
  );

    const modalizeRef = useRef(null);

    const onOpen = () => {
      modalizeRef.current?.open();
    };

    const onClose = () => {
        modalizeRef.current?.close();
    };

    return (
        <>
      <Icon icon = "filter" > </Icon>

        <Portal>
          <Modalize
            ref={modalizeRef}
            HeaderComponent = {<Text></Text>}
            FooterComponent = {_renderFooter}
            closeOnOverlayTap = {false}
            withOverlay = {true}
            withHandle = {false}
          >
            {_renderItem()}
          </Modalize>
          </Portal>
        </>
    );
};

export default FilterDrawer


const styles = StyleSheet.create({
  iconContainer: {
    display: 'flex',
    flexBasis: 0,
    justifyContent: 'flex-start'
  },
  filter: {
    margin: 3,
    position: "absolute",
    top: 0,
    left: 0,
    width: 30,
    height: 30,
    color: "tomato"
  },
  
});



