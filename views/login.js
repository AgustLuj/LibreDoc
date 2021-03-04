import React from 'react';
import { View, TouchableOpacity, Text, Image,StatusBar, Keyboard,Alert } from 'react-native';
import { Button, Input, Icon } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import * as ScreenOrientation from 'expo-screen-orientation';
import {user as User} from '../components/index';
import {Light} from '../style/general';

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.login=this.props.route.params.login
        this.state= {
            errU:false,
            errG:false,
            info:'Error Desconocido',
            info2:'Error Desconocido',
        }
        this.buttonLogin = this.buttonLogin.bind(this);
        this.name='';
        this.pass='';
    }
    async componentDidMount(){
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        this.focusListener = this.props.navigation.addListener('focus', async() => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        });
	}
    buttonLogin = async () =>{
        await Keyboard.dismiss();
        this.setState({errU:false,errG:false});
        if(this.name.length >=4 && this.pass.length >=4 ){
            await User.getData(this.name,this.pass,async(err,data)=>{
                if(err){
                    if(data.login !== undefined && !data.login){
                        this.setState({errU:true,info:'El usuario o contraseña ingresado es incorrecto'})
                        return null;
                    }
                    this.setState({errG:true});
                }else{
                    if(data){
                        global.user=this.name;
                        await AsyncStorage.setItem('@User', JSON.stringify({name:this.name}));
                        await AsyncStorage.setItem('@Login', JSON.stringify({login:true}));  
                        this.props.navigation.reset({
                            index: 0,
                            routes: [{ name: 'drawer', }],
                          })
                    }
                }
            })
        }else{
            if(this.name.length <4){
                this.setState({errU:true,info:'El usuario ingresado es muy corto'})
            }
            if(this.pass.length <6){
                this.setState({errP:true,info2:'La contraseña ingresado es muy corta'})
            }
        }

        
    }
    buttonRegister = async ()=>{
        await Keyboard.dismiss();
        this.setState({errU:false,errG:false})
        if(this.name.split(' ').length>1){
            this.setState({errU:true,info:'El usuario ingresado tiene un espacio'});
            return null;
        }else{
            if(this.name.length >=4 && this.pass.length >=4 ){
                await User.searchUser(this.name,async (u)=>{
                    if(!u){
                        await User.setData(this.name,this.pass,(f)=>{
                            if(!f){
                                Alert.alert(
                                    "Importante",
                                    "No almacenamos ningun tipo de informacion sencible solamente tu usuario y contraseña para el uso correctamente de la aplicacion",
                                    [
                                      { text: "Acepto", onPress: async() => {
                                        global.user=this.name;
                                        await AsyncStorage.setItem('@User', JSON.stringify({name:this.name}));
                                        await AsyncStorage.setItem('@Login', JSON.stringify({login:true}));  
                                        this.props.navigation.reset({
                                            index: 0,
                                            routes: [{ name: 'drawer', }],
                                          });} }
                                    ],
                                    { cancelable: true }
                                  );
                            }else{
                                this.setState({errG:true});        
                            }
                        })
                        
                    }else{
                        this.setState({errU:true,info:'El usuario ingresado ya esta en uso'})
                    }
                })
            }else{
                if(this.name.length <4){
                    this.setState({errU:true,info:'El usuario ingresado es muy corto'})
                }
                if(this.pass.length <6){
                    this.setState({errP:true,info2:'La contraseña ingresado es muy corta'})
                }
            }
        }
    }
    render() {
        let {login}=this.props.route.params
        let {errU,errG,info,errP,info2}= this.state
        //console.log(login);
        return (
            <View style={Light.container}>
                <StatusBar backgroundColor='#2c2c34' />
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={Light.Text}>{(login)?'Ingresar':'Registrarse'}</Text>
                    {(errG)?<Text style={{color:'red',fontSize:wp('4%')}}>{info}</Text>:null}
                    <View style={{width:wp('90%'),marginTop:wp('4%')}}>
                        <Input
                            placeholder="Usuario"
                            leftIcon={<Icon
                                name='person'
                                type='ionicon'
                                size={24}
                                color='white'
                              />}
                            style={{color:'white'}}
                            errorMessage={(errU)?info:null}
                            errorStyle={{fontSize:wp('3.5%')}}
                            onChangeText={value => this.name=value}
                        />
                        <Input
                            placeholder="Contraseña"
                            leftIcon={ <Icon
                                name='lock-closed'
                                type='ionicon'
                                size={24}
                                color='white'
                              />}
                            keyboardType='numeric'
                            style={{color:'white'}}
                            errorMessage={(errP)?info2:null}
                            errorStyle={{fontSize:wp('3.5%')}}
                            onChangeText={value => this.pass = value}
                            secureTextEntry={true}
                        />
                    </View>
                    <Button
                        containerStyle={{marginTop:wp('10%')}}
                        buttonStyle={{backgroundColor:'#171721',width:hp('25%')}}
                        titleStyle={{fontSize:hp('3%')}}
                        title={(login)?'Ingresar':'Registrarse'}
                        onPress ={()=>{(this.login)?this.buttonLogin():this.buttonRegister()}}
                    />        
                </View>
            </View>
        )
  }
}