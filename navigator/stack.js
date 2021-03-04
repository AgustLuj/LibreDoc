import React, { Component } from 'react';
import { View, Text, Image,Button,Dimensions,Alert } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator,DrawerContentScrollView,DrawerItemList,DrawerItem } from '@react-navigation/drawer';
import { NavigationContainer, CommonActions ,StackActions } from '@react-navigation/native';
import Routes from './stackRoutes';
import { Icon } from 'react-native-elements'
import {Light} from '../style/general.js';
import * as ScreenOrientation from 'expo-screen-orientation';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

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
            <Text style={Light.Text}>Leer libros es..</Text>
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
                    onPress={async () => {
                        await AsyncStorage.setItem('@Welcome', JSON.stringify({welcome:false}));
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
function CustomDrawerContent(props) {
    /*<DrawerItem 
		  label="Cerrar sesion"
          onPress={async () => {} }
          options={{labelStyle:{color:'white'}}}
		/>*/
	return (
	  <DrawerContentScrollView {...props}>
		<DrawerItemList {...props} />
		
        <TouchableOpacity 
            style={{flexDirection: 'row',
            width: '100%',
            height: 50,
            alignItems: 'center',
            paddingLeft: 20}} 
            onPress={async() => {
                global.login=false;
                delete global.user;
                delete global.type;
                await AsyncStorage.removeItem('@User');
                await AsyncStorage.setItem('@Login', JSON.stringify({login:false}));
                props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'homeOpciones', }],
                  });
            }}
        >
            <Text style={{color:'white'}}>Cerrar Session</Text>                    
        </TouchableOpacity>
	  </DrawerContentScrollView>
	);
  }
class drawerScreen extends Component{
	constructor(props){
		super(props);
		this.state={
			
		}
    }
	async componentDidMount(){
       // console.log(global.type)
	}
    render(){
        /*
        <Drawer.Screen name="Config" label='Configuracion' component={Routes.userHome}options={{drawerLabel:'Configuracion'}}/>
        */
       
		return (
            <Drawer.Navigator 
                drawerContentOptions={{
                    //activeBackgroundColor:'#ffff',
                    itemStyle:{color:'white'},
				    activeTintColor:'white'
                }}
                options={{headerShown:false}}
                drawerStyle={{
                    backgroundColor:'#2c2c34',
                    color:'white'
                    
                }} 
                drawerContentOptions={{
                    labelStyle: {
                        fontFamily: 'SomeFont',
                        color: 'white',
                    }
                }} 
                drawerContent={props => <CustomDrawerContent {...props} />}
            >
			<Drawer.Screen name="BestSellers" component={Routes.userHome} options={{drawerLabel:'Mas Leidos'}}/>
            <Drawer.Screen name="Books" component={Routes.Books} initialParams={{ type: 1 }} options={{drawerLabel:'Libros'}}/>
            {(global.type != 'guest')?<Drawer.Screen name="Biblio" component={Routes.Books} initialParams={{ type: 2 }} options={{drawerLabel:'Biblioteca'}}/>:null}
            {(global.type != 'guest')?<Drawer.Screen name="favorites" label='Favoritos' initialParams={{ type: 3 }} component={Routes.Books} options={{drawerLabel:'Favoritos'}}/>:null}
            {(global.type != 'guest')?<Drawer.Screen name="Reading" label='En lectura' component={Routes.Reading} options={{drawerLabel:'En lectura'}}/>:null}
            {(global.type != 'guest')?<Drawer.Screen name="Read" label='Leidos' component={Routes.Read}options={{drawerLabel:'Leidos'}}/>:null}
			</Drawer.Navigator>
		);
	}
}

class AppStack extends Component{
    constructor(props){
		super(props);
		this.state={
            enable:true,
            login:false
        }
        this.enable= global.welcome;
        this.login = global.login;
        
        
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
            name:'drawer',
            enable:true,
            component:drawerScreen
        },{
            name:'previewBook',
            enable:true,
            component:Routes.previewBook
        }]
    }
    async componentDidMount(){
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
	}
    render(){
		
        const {enable,login}= this.state;
        let b=true;
        //console.log(this.enable,this.login)
        return (
            <NavigationContainer>
                <Stack.Navigator initialRouteName={(this.enable)?'welcome':(this.login)?'drawer':'homeOpciones'}>
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