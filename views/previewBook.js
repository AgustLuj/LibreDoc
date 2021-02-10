import React from 'react';
import { View, Text, Image,StatusBar,ScrollView, RefreshControl } from 'react-native';
import {user as User ,books as Books} from '../components/index';
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
            fav:false,
            biblio:false,
            refreshing:false
        }
        this.bookData={}
        this._id=this.props.route.params._id
    }
    async componentDidMount(){
        this._onRefresh();
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        this.getDataBook(()=>{
            this.searchBook(()=>{
                this.setState({refreshing: false});
            })
        });
    }
    async getDataBook(fn){
        Books.getDataBook(this._id,(t,data)=>{
            if(t){
                this.bookData=data
                fn();
            }
        })
    }
    async addBook(){
        User.addBook(global.user,this._id,(f,r=false)=>{
            if(f){
                this.setState({biblio:true})
            }else{
                if(r){
                    this.setState({biblio:false})
                }
            }
        })
    }
    async addFavBook(){
        User.addFavBook(global.user,this._id,(f,r=false)=>{
            if(f){
                this.setState({fav:true})
            }else{
                if(r){
                    this.setState({fav:false})
                }
            }
        })
    }
    async searchBook(fn){
        User.searchBook(global.user,this._id,(f,{favorite:fav,biblio})=>{
            if(f){
                this.setState({fav,biblio})
                fn();
            }
        })
    }
    async componentWillUnmount(){
        this.setState({refreshing: false});
    }
    render() {
        /*
        */
       //console.log(this.props.route)
       let {fav,biblio,refreshing} =this.state 
       let {_id}=this.props.route.params
       let uri ='http://192.168.100.42/books/'+_id+'/foto';

        return (
            <View style={Light.container}>
                <StatusBar backgroundColor='#2c2c34' />
                <Header
                    placement="left"
                    statusBarProps={{ backgroundColor:'#171721' }}
                    leftComponent={{ icon: 'arrow-back', color: '#fff',onPress: () => this.props.navigation.goBack() }}
                    centerComponent={{ text: this.bookData.name, style: { color: '#fff',fontSize:hp('2.5%'), } }}
                    containerStyle={{
                        backgroundColor: '#171721',
                        justifyContent: 'space-around',
                        borderBottomColor:'black',
                        borderBottomWidth:1,
                        flex:0.07,
                    }}
                />
                <ScrollView 
                    style={{flex:1}} 
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this._onRefresh}
                        />
                    }
                >
                    {(!refreshing)?
                        <View style={{flex:1}}>
                            <View style={{flex:1,flexDirection: 'column',marginTop:hp('3%')}}>
                                <View style={{flexDirection: 'row',marginLeft:wp('5%')}}>
                                    <View style={{width:wp('40%'),height:hp('35%'),backgroundColor:'#171721',borderColor:'white',borderWidth:1}} >
                                        <Image
                                            style={{flex:1}}
                                            source={{uri}}
                                        />
                                    </View>
                                    <View style={{flex:1,flexDirection: 'column',marginLeft:wp('2%'),marginRight:wp('1%'),justifyContent:'space-between'}}>
                                        <View style={{flexDirection:'column'}}>
                                            <Text style={{color:'white'}}>Autor: {this.bookData.author}</Text>
                                            <Text style={{color:'white'}}>Paginas: {this.bookData.pages}</Text>
                                            <Text style={{color:'white'}}>Leido: {this.bookData.copies}</Text>
                                        </View>
                                        <View style={{alignContent:'center',justifyContent:'space-around', flexDirection:'row'}}>
                                            <Button
                                                containerStyle={{marginTop:wp('10%')}}
                                                buttonStyle={{backgroundColor:'#171721'}}
                                                disabledStyle={{backgroundColor:'#171721'}}
                                                icon={
                                                    <Icon
                                                    name={(biblio)?"checkmark-done":"add"}
                                                    type='ionicon'
                                                    size={hp('4%')}
                                                    color="white"
                                                    />
                                                }
                                                onPress={()=>{this.addBook()}}
                                            />
                                            <Button
                                                containerStyle={{marginTop:wp('10%')}}
                                                buttonStyle={{backgroundColor:'#171721',width:wp('25%')}}
                                                titleStyle={{fontSize:hp('3%')}}
                                                title="Leer"
                                                onPress={()=>{this.props.navigation.navigate('pdfView');}}
                                            />
                                            <Button
                                                containerStyle={{marginTop:wp('10%')}}
                                                buttonStyle={{backgroundColor:'#171721'}}
                                                icon={
                                                    <Icon
                                                    name={(fav)?"star":"star-outline"}
                                                    type='ionicon'
                                                    size={hp('4%')}
                                                    color="white"
                                                    />
                                                }
                                                onPress={()=>{this.addFavBook()}}
                                            />
                                        </View>
                                        
                                    </View>
                                    
                                </View>
                                <ScrollView style={{marginTop:hp('3%')}}>
                                    <Text style={{color:'white',paddingLeft:wp('5%'),paddingRight:wp('5%'),marginBottom:hp('1%')}}>Descripcion:</Text>
                                    <Text style={{color:'white',fontSize:hp('2%'),paddingLeft:wp('5%'),paddingRight:wp('5%')}}>{(this.bookData.description != null)?this.bookData.description:'Descripcion no disponible'}</Text>
                                </ScrollView>
                            </View>
                        </View>
                    :null}
                </ScrollView>
            </View>
        )
  }
}