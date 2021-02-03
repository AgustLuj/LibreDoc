import React from 'react';
import { View, Text, Image,StatusBar,ScrollView } from 'react-native';
import * as ScreenOrientation from 'expo-screen-orientation';
import {Light} from '../style/general';
import { Button, Input, Header } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class userHome extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            change:true
        }
        this.javier=['La llave del aguila','javier2','javier3','javier4','javier5','javier6','javier7','javier8','javier9','javier10','javier12','javier13'];
        this.three = false;
        this.rows=2
    }
    changeScale(){
        this.three=(this.three)?false:true;
        this.rows=(this.rows == 2)?3:2;
        this.setState({change:true})
    }
    render() {
       b=0;
       const c =()=>{
           b++;
       }
        return (
            <View style={Light.container}>
                <StatusBar backgroundColor='#2c2c34' />
                <Header
                    placement="left"
                    statusBarProps={{ backgroundColor:'#171721' }}
                    leftComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.openDrawer() }}
                    centerComponent={{ text: 'Mas Leidos', style: { color: '#fff',fontSize:hp('3%'), } }}
                    rightComponent={{ icon: 'search', color: '#fff' ,onPress: () => this.changeScale()}}
                    containerStyle={{
                        backgroundColor: '#171721',
                        justifyContent: 'space-around',
                        borderBottomColor:'black',
                        borderBottomWidth:1,
                        flex:0.07,
                    }}
                />
                <ScrollView style={{flex:1,}}>
                    <View style={{ justifyContent: 'space-around',flexDirection: 'column',}}>
                        {Array(this.javier.length/this.rows).fill(this.javier.length/this.rows).map((guest,i) => {//array vacio para tener las columnas
                            return(<View style={{justifyContent: 'space-around',flexDirection: 'row',marginTop:hp('2%'),marginBottom:hp('2%')}}key={i}>
                                {this.javier.slice(b,b+this.rows).map((a,j)=>{//Corto el array original con el largo de las rows entre 2 y 3 de largo
                                    if(!this.three){
                                        return(
                                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('previewBook',{name:a}) } key={j}>
                                                <View style={{width:wp('45%'),height:hp('40%'),backgroundColor:'#171721',borderColor:'white',borderWidth:1}}key={j} >
                                                    <Image
                                                        style={{flex:1}}
                                                        source={{uri: 'http://192.168.100.42/foto'}}
                                                    />
                                                    {c()}
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }else{
                                        return(
                                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('previewBook',{name:a}) } key={j}>
                                            <View style={{width:wp('30%'),height:hp('25%'),backgroundColor:'#171721',borderColor:'white',borderWidth:1}} key={j} >
                                                        <Image
                                                            style={{flex:1}}
                                                            source={{uri: 'http://192.168.100.42/foto'}}
                                                        />
                                                        {c()}
                                            </View>
                                        </TouchableOpacity>
                                        )
                                    }
                                })}

                            </View>)
                        })}

                    </View>

                </ScrollView>

            </View>
        )
  }
}