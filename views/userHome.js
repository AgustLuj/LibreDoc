import React from 'react';
import { View, TouchableOpacity, Text, Image,StatusBar } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import {Light} from '../style/general';
import { Button, Input, Header } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements'

export default class userHome extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            
        }
    }
    render() {
        /*
        
        */
        return (
            <View style={Light.container}>
                <StatusBar backgroundColor='#2c2c34' />
                <Header
                    placement="left"
                    statusBarProps={{ backgroundColor:'#2c2c34' }}
                    leftComponent={{ icon: 'home', color: '#fff' ,onPress: () => null}}
                    centerComponent={{ text: 'Best Sellers', style: { color: '#fff',fontSize:hp('3%'), } }}
                    rightComponent={{ icon: 'menu', color: '#fff',onPress: () => null }}
                    containerStyle={{
                        backgroundColor: '#171721',
                        justifyContent: 'space-around',
                        borderBottomColor:'#636e72',
                        borderBottomWidth:1
                    }}
                />

                <View style={{flex:1,marginTop:10,justifyContent: 'space-around',flexDirection: 'column',}}>
                <View style={{justifyContent: 'space-around',flexDirection: 'row',}}>
                        <View style={{width:wp('45%'),height:hp('40%'),backgroundColor:'#171721',}}>

                        </View>
                        <View style={{width:wp('45%'),height:hp('40%'),backgroundColor:'#171721',}}>

                        </View>
                    </View>
                    <View style={{justifyContent: 'space-around',flexDirection: 'row',}}>
                        <View style={{width:wp('45%'),height:hp('40%'),backgroundColor:'#171721',}}>

                        </View>
                        <View style={{width:wp('45%'),height:hp('40%'),backgroundColor:'#171721',}}>

                        </View>
                    </View>
                    <View style={{justifyContent: 'space-around',flexDirection: 'row',}}>
                        <View style={{width:wp('45%'),height:hp('40%'),backgroundColor:'#171721',}}>

                        </View>
                        <View style={{width:wp('45%'),height:hp('40%'),backgroundColor:'#171721',}}>

                        </View>
                    </View>
                </View>

            </View>
        )
  }
}