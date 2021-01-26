import React from 'react';
import { StyleSheet,Dimensions } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export const Light = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#2c2c34'
    },
    TextView:{
        alignItems: 'center', 
        justifyContent: 'center', 
        width:Dimensions.get('window').width,
        height:hp('88%') 
    },
    Text:{
        fontSize:wp('15%'),
        color:'white',
        fontFamily:'sans-serif-thin'
    },
    ButtonContainer:{
        flex:1,
        alignItems:'flex-end',
        justifyContent:'flex-end'
    },
    ButtonView:{
        width:wp('15%'),
        backgroundColor:'#171721',
        //justifyContent:'center',
        //alignItems:'center',
        position:'relative',
        borderTopLeftRadius:30, 
        borderLeftWidth: 1
    },
    headerStyle:{
      backgroundColor: '#f6b93b',
      justifyContent: 'space-around',
      borderBottomColor:'#bdc3c7',
      borderBottomWidth:1,
  }
});

export const userStyle = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#2c2c34'
    },
    TextView:{
        alignItems: 'center', 
        justifyContent: 'center', 
        width:Dimensions.get('window').width,
        height:hp('88%') 
    },
    Text:{
        fontSize:wp('15%'),
        color:'white',
        fontFamily:'sans-serif-thin'
    },
    ButtonContainer:{
        flex:1,
        alignItems:'flex-end',
        justifyContent:'flex-end'
    },
    ButtonView:{
        width:wp('15%'),
        backgroundColor:'#171721',
        //justifyContent:'center',
        //alignItems:'center',
        position:'relative',
        borderTopLeftRadius:30, 
        borderLeftWidth: 1
    },
    headerStyle:{
      backgroundColor: '#f6b93b',
      justifyContent: 'space-around',
      borderBottomColor:'#bdc3c7',
      borderBottomWidth:1,
  }
});
