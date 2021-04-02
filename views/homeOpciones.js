import React from 'react';
import { View, TouchableOpacity, Text, Image} from 'react-native';
import { Button, Input } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/FontAwesome';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import {GoogleSignin,GoogleSigninButton} from '@react-native-google-signin/google-signin';
import * as ScreenOrientation from 'expo-screen-orientation';

import {Light} from '../style/general';


GoogleSignin.configure({
    webClientId:'9112528663-cvhhi8ac9r1u2lfeqvh5bb33hubcdil2.apps.googleusercontent.com',
});

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
        global.type='guest';
        this.props.navigation.reset({
            index: 0,
            routes: [{ name: 'drawer', }],
        })
    }
    buttonGoogle = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            try {
                let {username,token} = await this.sendIdToken(userInfo.idToken);

                    global.user= username;
                    global.token = token;

                    await AsyncStorage.setItem('@User', JSON.stringify({name:username}));
                    await AsyncStorage.setItem('@Login', JSON.stringify({login:true}));
                    await AsyncStorage.setItem('@Token',JSON.stringify({token}));
                    
                    this.props.navigation.reset({
                        index: 0,
                        routes: [{ name: 'drawer', }],
                    })
            } catch (error) {
                console.log(error)
                this.signOut();
                this.setState({ login:false });
            }
            //this.setState({ userInfo });
        } catch (error) {
            console.log(error);
        }
    };
    signOut = async () => {
        try {
          await GoogleSignin.revokeAccess();
          await GoogleSignin.signOut();
          this.setState({ user: null }); // Remember to remove the user from your app's state as well
        } catch (error) {
          console.error(error);
        }
      };
    sendIdToken = async(idToken) =>{
        const querry = await fetch(`http://192.168.100.42/auth/google/`, {
          method: 'POST',
          body: JSON.stringify({idToken}),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        });
        //console.log('data');
        const data = await querry.json();
        if(querry.status != 200){
    
          throw new Error('No pasa');
    
        }else{
            return data
        }
      }
    buttonLogin = async () =>{
        this.props.navigation.navigate('Login',{'login':true})
    }
    buttonRegister = async ()=>{
        this.props.navigation.navigate('Login',{'login':false})
    }
    render() { 
        /**
         * <Button
                        containerStyle={{marginTop:wp('10%')}}
                        buttonStyle={{backgroundColor:'#171721',width:hp('25%')}}
                        titleStyle={{fontSize:hp('3%')}}
                        title="Google"
                        onPress={()=>this.buttonGoogle()}
                    /> */    
        return (
            <View style={Light.container}>
                <View style={{flex:0.9,justifyContent:'center',alignItems:'center'}}>
                    <Text style={Light.Text}>Bienvenido</Text>
                    <GoogleSigninButton
                        style={{ width: 192, height: 48 }}
                        size={GoogleSigninButton.Size.Wide}
                        color={GoogleSigninButton.Color.Dark}
                        onPress={this.buttonGoogle}
                        disabled={this.state.isSigninInProgress} 
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
                        title="Login"
                        onPress={()=>this.buttonLogin()}
                    />
                    <Button
                        containerStyle={{marginTop:wp('10%')}}
                        buttonStyle={{backgroundColor:'#171721',width:hp('25%')}}
                        titleStyle={{fontSize:hp('3%')}}
                        title="Invitado"
                        onPress={()=>{this.buttonGuest()}/**/}
                    />        
                </View>
            </View>
        )
  }
}