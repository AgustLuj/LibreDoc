import React from 'react';
import { View, TouchableOpacity, Text, Image } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import {Light} from '../style/general';
import { Button, Input } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements'

export default class Login extends React.Component {
    constructor(props){
        super(props);
        this.login=this.props.route.params.login
        this.state= {
            
        }
    }
    async componentDidMount(){
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        this.focusListener = this.props.navigation.addListener('focus', async() => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        });
	}
    buttonLogin = async () =>{
        this.props.navigation.navigate('pdfView')
    }
    buttonRegister = async ()=>{
        console.log('hola1')
    }
    render() {
        let {login}=this.props.route.params
        console.log(login);
        return (
            <View style={Light.container}>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text style={Light.Text}>{(login)?'Ingresar':'Registrarse'}</Text>
                    <View style={{width:wp('80%'),marginTop:hp('4%')}}>
                        <Input
                            placeholder="Usuario"
                            leftIcon={<Icon
                                name='person'
                                type='ionicon'
                                size={24}
                                color='white'
                              />}
                            style={{}}
                            onChangeText={value => this.setState({ comment: value })}
                        />
                        <Input
                            placeholder="Contraseña"
                            leftIcon={ <Icon
                                name='lock-closed'
                                type='ionicon'
                                size={24}
                                color='white'
                              />}
                            style={{}}
                            onChangeText={value => this.setState({ comment: value })}
                            secureTextEntry={true}
                        />
                    </View>
                    <Button
                        containerStyle={{marginTop:wp('10%')}}
                        buttonStyle={{backgroundColor:'#171721',width:hp('25%')}}
                        titleStyle={{fontSize:hp('3%')}}
                        title={(login)?'Ingresar':'Registrarse'}
                        onPressOut={()=>{(this.login)?this.buttonLogin():this.buttonRegister()}}
                    />        
                </View>
            </View>
        )
  }
}