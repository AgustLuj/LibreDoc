import React from 'react';
import { View, Text, Image,StatusBar,ScrollView } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import {Light} from '../style/general';
import { Button, Input, Header } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';

export default class Reading extends React.Component {
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
                    statusBarProps={{ backgroundColor:'#171721' }}
                    leftComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.openDrawer() }}
                    centerComponent={{ text: 'En Lectura', style: { color: '#fff',fontSize:hp('2.5%'), } }}
                    containerStyle={{
                        backgroundColor: '#171721',
                        justifyContent: 'space-around',
                        borderBottomColor:'black',
                        borderBottomWidth:1,
                        flex:0.07,
                    }}
                />
                <View style={{flex:1}}>
                    <ScrollView style={{marginTop:hp('3%')}}>
                        {Array(5).fill(5).map((e,i)=>{
                            return(
                                <View style={{flex:1,flexDirection: 'column',borderBottomWidth:1,borderBottomColor:'white',paddingBottom:wp('5%'),marginBottom:wp('5%')}} key ={i}>
                                    <View style={{flexDirection: 'row',marginLeft:wp('5%')}}>
                                        <View style={{width:wp('30%'),height:hp('25%'),backgroundColor:'#171721',borderColor:'white',borderWidth:1}} >
                                            <Image
                                                style={{flex:1}}
                                                source={{uri: 'http://192.168.100.42/foto'}}
                                            />
                                        </View>
                                        <View style={{flex:1,flexDirection: 'column',marginLeft:wp('2%'),justifyContent:'space-between'}}>
                                            <View style={{flexDirection:'column',alignItems:'center'}}>
                                                <Text style={{color:'white',fontSize:wp('5%')}}>La llave del aguila</Text>
                                                <Progress.Bar 
                                                    progress={200/900} 
                                                    width={wp('50%')}
                                                    height={hp('4%')}
                                                    color={'#f39c12'} 
                                                    style={{marginTop:hp('3%')}} 
                                                    animationType={'spring'}
                                                >
                                                    <Text style={{position:'absolute',flex:0, color:'black',alignSelf:'flex-start',marginTop:hp('0.5%'),paddingLeft:wp('0.5%')}}>200</Text>
                                                    <Text style={{position:'absolute',flex:0, color:'white',alignSelf:'flex-end',marginTop:hp('0.5%'),paddingRight:wp('1%')}}>900</Text>    
                                                </Progress.Bar>
                                            </View>
                                            <View style={{alignContent:'center',justifyContent:'space-around', flexDirection:'row'}}>
                                                <Button
                                                    containerStyle={{marginTop:wp('5%')}}
                                                    buttonStyle={{backgroundColor:'#171721',width:wp('50%')}}
                                                    titleStyle={{fontSize:hp('4%')}}
                                                    title="Continuar"
                                                    onPress={()=>{this.props.navigation.navigate('pdfView');}}
                                                />
                                            </View>                              
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        )
  }
}