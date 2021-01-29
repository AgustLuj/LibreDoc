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
        }
    }
    render() {
        /*
        
        */
       //console.log(this.props.route)
       let {name}=this.props.route.params
        return (
            <View style={Light.container}>
                <StatusBar backgroundColor='#2c2c34' />
                <Header
                    placement="left"
                    statusBarProps={{ backgroundColor:'#171721' }}
                    leftComponent={{ icon: 'arrow-back', color: '#fff',onPress: () => this.props.navigation.goBack() }}
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
                            <View style={{width:wp('50%'),height:hp('45%'),backgroundColor:'#171721',borderColor:'white',borderWidth:1}} >
                                <Image
                                    style={{flex:1}}
                                    source={{uri: 'http://192.168.100.42/foto'}}
                                />
                            </View>
                            <View style={{flexDirection: 'column',marginLeft:wp('2%')}}>
                                <Text style={{color:'white'}}>Autor: Javier Milei</Text>
                                <Text style={{color:'white'}}>Copias: 800</Text>
                                <Text style={{color:'white'}}>Leido: 400</Text>
                            </View>

                        </View>
                        <ScrollView style={{marginTop:hp('3%')}}>
                            <Text style={{color:'white',paddingLeft:wp('5%'),paddingRight:wp('5%'),marginBottom:hp('1%')}}>Descripcion:</Text>
                            <Text style={{color:'white',fontSize:hp('2%'),paddingLeft:wp('5%'),paddingRight:wp('5%')}}>Nosotros queremos exponer a la gente a las ideas libertarias, en forma directa, sin intermediarios. aunque logremos solo acercarnos un poco ms a la libertad, es necesario empezar. nos preguntan: ¿no es utópico? tal vez. pero las ideas acatan como un faro. y son menos utópicas que el paradigma político que nos gobierna. siguen creyendo que gobiernan por la gracia de dios, aunque lo llamen pueblo; creen saber que es el bienestar general y que saben cómo alcanzarlo. Además, los políticos creen que nosotros, los ciudadanos, somos pasivos. no lo somos. tenemos que salir de un círculo vicioso. como explica Friedrich Hayek, el político fracasa y vuelve a intervenir, los fracasos se acumulan y la calidad de vida es cada vez peor. sobre este paradigma está construida la sociedad actual. es un paradigma equivocado, que nos hace ms pobres y menos libres. pero hay otro camino: el camino de la libertad. Javier milei y diego giacomini</Text>

                            <View style={{alignItems:'center',justifyContent:'center'}}>
                                <Button
                                    containerStyle={{marginTop:wp('10%'),marginBottom:wp('5%')}}
                                    buttonStyle={{backgroundColor:'#171721',width:wp('80%')}}
                                    titleStyle={{fontSize:hp('5%')}}
                                    title="Leer"
                                    onPress={()=>{this.props.navigation.navigate('pdfView');}}
                                />
                            </View>

                        </ScrollView>
                    </View>
                </View>
            </View>
        )
  }
}