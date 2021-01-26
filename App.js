import React from 'react';
import AppStack from './navigator/stack';
import { View, TouchableOpacity, Text, Image,Button,StatusBar } from 'react-native';

export default class App extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            
        }
    }
    render() {
        return (
            <View style={{flex:1,backgroundColor:'#2c2c34'}}>
                <StatusBar backgroundColor='#2c2c34' />
                <AppStack />
            </View>
        )
  }
}