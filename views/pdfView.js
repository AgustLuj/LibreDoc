import React,{ useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions,Button,ScrollView,SafeAreaView  } from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { encrypt, decrypt } from 'react-native-simple-encryption';
import {user as User ,books as Books} from '../components/index';
import * as ScreenOrientation from 'expo-screen-orientation';
import { Icon } from 'react-native-elements'
import Pdf from 'react-native-pdf';

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");


export default class pdfView extends React.Component {
    constructor(props){
        super(props);
        this.id =this.props.route.params._id
        this.state= {
            source:{uri:`${global.uri}/users/${global.user.username}/read/${this.id}`,cache:false,headers:{'x-token':global.token}},
            width:Dimensions.get('window').width,
            height:Dimensions.get('window').height,
            next:false,
            pages:1,
            multi:1,
            screenD:true,
            botonColor:false,
            back:true,
        }
    }
    async componentDidMount(){
        await ScreenOrientation.unlockAsync(ScreenOrientation.OrientationLock.DEFAULT);
        ScreenOrientation.getOrientationAsync().then((e)=>{
            switch(e){
                case 1:case 2:
                    this.setState({screenD:true });
                    break;
                case 3:case 4:
                    this.setState({screenD:false });
                    break;
            }
        })
        Dimensions.addEventListener("change", ({window,screen})=>{
            ScreenOrientation.getOrientationAsync().then((e)=>{
                switch(e){
                    case 1:case 2:
                        this.setState({screenD:true });
                        break;
                    case 3:case 4:
                        this.setState({screenD:false});
                        break;
                }
            })        
            this.setState({ width: screen.height });
        });
    }
    async backPage(){
        User.savePage(this.id,-15,(f)=>{
            if(!f){
                this.props.navigation.reset({
                    index: 2,
                    routes: [{ name: 'drawer' },{ name: 'previewBook',params:{_id:this.id} },{ name: 'pdfView',params:{_id:this.id}  }],
                });
            }else{
                this.props.navigation.goBack();
            }
        });
        
    }
    async changeUser(){
        //console.log(this.props)
        this.props.navigation.reset({
            index: 2,
            routes: [{ name: 'drawer' },{ name: 'previewBook',params:{_id:this.id} },{ name: 'pdfView',params:{_id:this.id}  }],
        });
    }

    render() {
        //console.log(this.props)
        let {source,next,pages,multi,screenD,botonColor,back}=this.state;
     //<ScrollView style={{flex:1}} scrollEnabled={scroll} ref='_scrollView'></ScrollView>
        return (
            <View style={styles.container}>
                <View style={{position:'absolute',top:hp('5%'),right:(screenD)?wp('88%'):hp('93%'),zIndex: 1}}>
                    {back?<Icon
                        name='arrow-back'
                        type='ionicon'
                        color={(botonColor&&!screenD)?'white':'black'}
                        size={40}
                        onPress={() => {
                            this.backPage();
                        }} 
                    /> :null} 
                </View>
                <View style={{flex:1,marginBottom:hp('4%')}}>
                    <Pdf 
                        ref={(pdf) => {
                            this.pdf = pdf;
                        }}
                        source={source}
                        onLoadComplete={(numberOfPages) => {
                            console.log(`total page count: ${numberOfPages}`);
                        }}
                        onPageChanged={(page, numberOfPages) => {
                            //console.log(page)
                            if(page <= 2 && page >=1){
                                this.setState({back:true});
                            }else{
                                this.setState({back:false});
                            }
                            if(multi == page && multi >=page){
                                this.setState({multi:multi+=1});
                                User.savePage(this.id,1,(f)=>{
                                    if(!f){
                                        this.setState({pages:1});
                                    }else{
                                        this.pdf.setPage(page-2);
                                    }
                                });
                            }
                            if(numberOfPages == page){
                                this.setState({
                                    next: true
                                });
                            }
                        }}
                        onScaleChanged={(scale)=>{
                            if(scale>1.85 && !screenD){
                                this.setState({botonColor:false})
                            }else{
                                this.setState({botonColor:true})
                            }
                            //console.log(scale)
                        }}
                        onError={(error) => {
                            console.log(JSON.stringify(error));
                            this.props.navigation.goBack();
                        }}
                        style={{width:Dimensions.get('window').width,height:(!screenD)?wp('100%'):hp('100%'),backgroundColor:'#2c2c34',}}/>

                </View>
                <View style={{flex:1,justifyContent: 'flex-end'}}>
                    {next?<Icon
                        name='arrow-forward'
                        type='ionicon'
                        color={(botonColor&&!screenD)?'white':'black'}
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