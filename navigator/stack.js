import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image,Button,Dimensions,Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, CommonActions ,StackActions } from '@react-navigation/native';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import Routes from './stackRoutes';
import { Icon } from 'react-native-elements'
import {Light} from '../style/general.js';
import * as ScreenOrientation from 'expo-screen-orientation';

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
    return (
    <View style={Light.container}>
        <View style={Light.TextView}>
            <Text style={Light.Text}>Bienvenidos</Text>
            <Text style={Light.Text}>a</Text>
            <Text style={Light.Text}>LibreDoc</Text>
        </View>
        <View style={Light.ButtonContainer}>
            <View style={Light.ButtonView}>
                <Icon
                    name='arrow-forward'
                    type='ionicon'
                    color='white'
                    size={60}
                    onPress={() => navigation.navigate('homeis')} 
                />
            </View>
        </View>
    </View>
    );
}
function homeIsScreen({ navigation }) {
    return (
    <View style={Light.container}>
        <View style={Light.TextView}>    
            <Text style={Light.Text}>Leer pdf's es..</Text>
        </View>
        <View style={Light.ButtonContainer}>
            <View style={Light.ButtonView}>
                <Icon
                    name='arrow-forward'
                    type='ionicon'
                    color='white'
                    size={60}
                    onPress={() => navigation.navigate('homeEasy')} 
                />
            </View>
        </View>
    </View>
    );
}
function easyScreen({ navigation }) {
    return (
        <View style={Light.container}>
        <View style={Light.TextView}>    
            <Text style={Light.Text}>Facil y Rapido</Text>
        </View>
        <View style={Light.ButtonContainer}>
            <View style={Light.ButtonView}>
                <Icon
                    name='arrow-forward'
                    type='ionicon'
                    color='white'
                    size={60}
                    onPress={() => {
                        navigation.reset({
                            index: 0,
                            routes: [{ name: 'homeOpciones', }],
                          });
                    }} 
                />
            </View>
        </View>
    </View>
    );
}

class AppStack extends Component{
    constructor(props){
		super(props);
		this.state={
        }
        this.enable=true;
        this.stack=[{
            name:'welcome',
            component:HomeScreen,
            enable:this.enable,
        },
        {
            name:'homeis',
            component:homeIsScreen,
            enable:this.enable,  
        },
        {
            name:'homeEasy',
            component:easyScreen,
            enable:this.enable,
        },
        {
            name:'homeOpciones',
            enable:true,
            component:Routes.homeOpciones,
        },
        {
            name:'pdfView',
            enable:true,
            component:Routes.pdfView,
        },{
            name:'Login',
            enable:true,
            component:Routes.Login,
        },{
            name:'userHome',
            enable:true,
            component:Routes.userHome
        }

        ]
    }
    async componentDidMount(){
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
	}
    render(){
		
		const {}= this.state;
        return (
            <NavigationContainer>
                <Stack.Navigator>
                    {this.stack.map(({name,component,enable},i)=>{
                        if(enable){
                            return(<Stack.Screen
                            key={i}
                            name={name}
                            component={component}
                            options={{
                                headerShown: false,
                            }}
                        /> )  
                        }
                    })}
                </Stack.Navigator>
            </NavigationContainer>
        );
	}
}


export default AppStack;