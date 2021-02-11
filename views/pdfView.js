import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions,Button,ScrollView,SafeAreaView  } from 'react-native';
import { Icon } from 'react-native-elements'
import { encrypt, decrypt } from 'react-native-simple-encryption';
import Pdf from 'react-native-pdf';
import * as ScreenOrientation from 'expo-screen-orientation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");


export default class pdfView extends React.Component {
    constructor(props){
        super(props);
        this.id =this.props.route.params._id
        this.state= {
            source:{uri:`http://192.168.100.42/users/${global.user}/read/${this.id}`,cache:false},
            width:Dimensions.get('window').width,
            height:Dimensions.get('window').height-300,
            next:false
        }
    }
    async componentDidMount(){
        await ScreenOrientation.unlockAsync(ScreenOrientation.OrientationLock.DEFAULT);
        Dimensions.addEventListener("change", ({window,screen})=>{
            console.log('hola')
            this.setState({ width: screen.height });
            
        });
    }
    async changeUser(){
        const pagina = 'http://192.168.100.42';
        //body: JSON.stringify({_id,name,usern,seg,segold}),
        const querry = await fetch(`${pagina}/next`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            'Content-Type':'application/json',
        }
        });
        const data = await querry.json();
        if(querry.status != 200){
            fn(false);
        }else{
            this.props.navigation.reset({
                index: 1,
                routes: [{ name: 'drawer' },{ name: 'pdfView' }],
              });
        }
    }

    render() {

        let {source,scroll,width,next}=this.state;
     //<ScrollView style={{flex:1}} scrollEnabled={scroll} ref='_scrollView'></ScrollView>
        return (
            <View style={styles.container}>
                <View style={{flex:1,marginTop:hp('3.5%'),marginBottom:hp('4%')}}>
                    <Pdf 
                        ref={(pdf) => {
                            this.pdf = pdf;
                        }}
                        source={source}
                        onLoadComplete={(numberOfPages) => {
                            console.log(`total page count: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            if(numberOfPages == page){
                                this.setState({
                                    next: true
                                });
                            }
                        }}
                        onError={(error) => {
                            console.log(error);
                        }}
                        style={{width:Dimensions.get('screen').width,height:Dimensions.get('screen').height,backgroundColor:'#2c2c34',}}/>

                </View>
                <View style={{flex:1,justifyContent: 'flex-end'}}>
                    {next?<Icon
                        name='arrow-forward'
                        type='ionicon'
                        color='black'
                        size={60}
                        onPress={() => {
                            this.changeUser();
                        }} 
                    />:null}
                    
                    
                </View>

                
            </View>
        )
  }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    scrollView: {
        flex:1,
        backgroundColor: 'pink',
        marginHorizontal: 20,
      },
});