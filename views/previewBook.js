import React from 'react';
import { View, Text, Image,StatusBar,ScrollView } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import {Light} from '../style/general';
import { Button, Input, Header } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class userHome extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            fav:false,
            biblio:false
        }
    }
    render() {
        /*
        */
       //console.log(this.props.route)
       let {fav,biblio} =this.state 
       let {name}=this.props.route.params
        return (
            <View style={Light.container}>
                <StatusBar backgroundColor='#2c2c34' />
                <Header
                    placement="left"
                    statusBarProps={{ backgroundColor:'#171721' }}
                    leftComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.openDrawer() }}
                    centerComponent={{ text: name, style: { color: '#fff',fontSize:hp('2.5%'), } }}
                    containerStyle={{
                        backgroundColor: '#171721',
                        justifyContent: 'space-around',
                        borderBottomColor:'black',
                        borderBottomWidth:1,
                        flex:0.07,
                    }}
                />
                <View style={{flex:1}}>
                    <View style={{flex:1,flexDirection: 'column',marginTop:hp('3%')}}>
                        <View style={{flexDirection: 'row',marginLeft:wp('5%')}}>
                            <View style={{width:wp('40%'),height:hp('35%'),backgroundColor:'#171721',borderColor:'white',borderWidth:1}} >
                                <Image
                                    style={{flex:1}}
                                    source={{uri: 'http://192.168.100.42/foto'}}
                                />
                            </View>
                            <View style={{flex:1,flexDirection: 'column',marginLeft:wp('2%'),justifyContent:'space-between'}}>
                                <View style={{flexDirection:'column'}}>
                                    <Text style={{color:'white'}}>Autor: Elisa Roldán</Text>
                                    <Text style={{color:'white'}}>Copias: 800</Text>
                                    <Text style={{color:'white'}}>Leido: 400</Text>
                                </View>
                                <View style={{alignContent:'center',justifyContent:'space-around', flexDirection:'row'}}>
                                    <Button
                                        containerStyle={{marginTop:wp('10%')}}
                                        buttonStyle={{backgroundColor:'#171721'}}
                                        disabledStyle={{backgroundColor:'#171721'}}
                                        icon={
                                            <Icon
                                            name={(biblio)?"checkmark-done":"add"}
                                            type='ionicon'
                                            size={hp('4%')}
                                            color="white"
                                            />
                                        }
                                        onPress={()=>{this.setState({biblio:(biblio)?false:true})}}
                                    />
                                    <Button
                                        containerStyle={{marginTop:wp('10%')}}
                                        buttonStyle={{backgroundColor:'#171721',width:wp('25%')}}
                                        titleStyle={{fontSize:hp('3%')}}
                                        title="Leer"
                                        onPress={()=>{this.props.navigation.navigate('pdfView');}}
                                    />
                                    <Button
                                        containerStyle={{marginTop:wp('10%')}}
                                        buttonStyle={{backgroundColor:'#171721'}}
                                        icon={
                                            <Icon
                                            name={(fav)?"star":"star-outline"}
                                            type='ionicon'
                                            size={hp('4%')}
                                            color="white"
                                            />
                                        }
                                        onPress={()=>{this.setState({fav:(fav)?false:true})}}
                                    />
                                </View>
                                
                            </View>
                            
                        </View>
                        <ScrollView style={{marginTop:hp('3%')}}>
                            <Text style={{color:'white',paddingLeft:wp('5%'),paddingRight:wp('5%'),marginBottom:hp('1%')}}>Descripcion:</Text>
                            <Text style={{color:'white',fontSize:hp('2%'),paddingLeft:wp('5%'),paddingRight:wp('5%')}}>Diego ha quedado huérfano y vive en Mendoza. Decide buscar a su familia materna con las únicas pistas que tiee: un apellido y una pequeña llave de oro con forma de águila. No imagina las aventuras que deberá correr, ayudado por sus amigos, hasta descubrir el secreto que encierra la historia de sus padres.</Text>
                        </ScrollView>
                    </View>
                </View>
            </View>
        )
  }
}