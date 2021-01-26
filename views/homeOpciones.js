import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import {Light} from '../style/general';
import { Button, Input } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class Home extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            
        }
        this.buttonGuest = this.buttonGuest.bind(this);
        this.buttonLogin = this.buttonLogin.bind(this);
        this.buttonRegister = this.buttonRegister.bind(this);
    }
    async componentDidMount(){
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        this.focusListener = this.props.navigation.addListener('focus', async() => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        });
	}
    buttonGuest = async () =>{
        this.props.navigation.navigate('userHome');
    }
    buttonLogin = async () =>{
        this.props.navigation.navigate('Login',{'login':true})
    }
    buttonRegister = async ()=>{
        this.props.navigation.navigate('Login',{'login':false})
    }
    render() {
        /*
        <Button
            onPress={()=>this.buttonLogin()}
            title="Login"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
        <Button
            onPress={()=>this.buttonRegister()}
            style={{marginTop:'10px'}}
            title="Register"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
        />
        */
        return (
            <View style={Light.container}>
                <View style={{flex:0.9,justifyContent:'center',alignItems:'center'}}>
                    <Text style={Light.Text}>Bienvenido</Text>
                    <Button
                        containerStyle={{marginTop:wp('10%')}}
                        buttonStyle={{backgroundColor:'#171721',width:hp('25%')}}
                        titleStyle={{fontSize:hp('3%')}}
                        title="Login"
                        onPress={()=>this.buttonLogin()}
                    />
                    <Button 
                        containerStyle={{marginTop:wp('10%')}}
                        buttonStyle={{backgroundColor:'#171721',width:hp('25%')}}
                        titleStyle={{fontSize:hp('3%')}}
                        title="Registrarse"
                        onPress={()=>this.buttonRegister()}
                    />
                    <Button
                        containerStyle={{marginTop:wp('10%')}}
                        buttonStyle={{backgroundColor:'#171721',width:hp('25%')}}
                        titleStyle={{fontSize:hp('3%')}}
                        title="Invitado"
                        onPress={()=>this.buttonGuest()}
                    />        
                </View>
            </View>
        )
  }
}