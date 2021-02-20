import React from 'react';
import AppStack from './navigator/stack';
import { View, TouchableOpacity, Text, Image,Button,StatusBar } from 'react-native';
import AsyncStorage  from '@react-native-async-storage/async-storage';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            enable:false
        }
    }
    async componentDidMount(){
        //global.uri='https://adordni.ml';
        global.uri='http://192.168.100.42:4000';
        let cache = JSON.parse(await AsyncStorage.getItem('@Welcome'))
        if (cache == null){
            await AsyncStorage.setItem('@Welcome', JSON.stringify({welcome:true}));
            global.welcome=true;
        }else{
            //console.log(cache)
            global.welcome=cache.welcome;   
        }
        let cache2 = JSON.parse(await AsyncStorage.getItem('@Login'))
        if (cache2 == null){
            await AsyncStorage.setItem('@Login', JSON.stringify({login:false}));
            global.login=false;
        }else{
            global.login=cache2.login;
        }
        let cache3 = JSON.parse(await AsyncStorage.getItem('@User'))
        if(cache3 != null){
            global.user=cache3.name
        }
        this.setState({enable:true});
    }
    render() {
        let {enable}=this.state;
        return(
            <View style={{flex:1,backgroundColor:'#2c2c34'}}>
                
                <StatusBar backgroundColor='#2c2c34' />
                {(enable)?<AppStack />:null}
            </View>)
  }
}