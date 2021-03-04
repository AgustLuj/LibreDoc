import React from 'react';
import { View, Text, Image,StatusBar,ScrollView, RefreshControl } from 'react-native';
import {user as User ,books as Books} from '../components/index';
import * as ScreenOrientation from 'expo-screen-orientation';
import {Light} from '../style/general';
import { Button, Input, Header } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Progress from 'react-native-progress';

export default class Reading extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            refreshing: false
        }
        this.books=[];
    }
    componentDidMount(){
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this._onRefresh()
        });
        this._onRefresh();
        
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        this.books = []
        this.getBooks((err,book)=>{
            if(!err){
                if(book.length > 0 ){
                    this.books=book;
                }
                this.setState({refreshing: false});
                return null;
            }
            this.setState({refreshing: false});
        });
    }
    getBooks(fn){
        User.getBookReading((e,books)=>{
            if(!e){
                fn(false,books)
            }else{
                fn(true);
            }
        })
    }
    render() {
        /*
        */
        return (
            <View style={Light.container}>
                <StatusBar backgroundColor='#2c2c34' />
                <Header
                    placement="left"
                    statusBarProps={{ backgroundColor:'#171721' }}
                    leftComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.openDrawer() }}
                    centerComponent={{ text: 'En Lectura', style: { color: '#fff',fontSize:hp('2.5%'), } }}
                    containerStyle={{
                        backgroundColor: '#171721',
                        justifyContent: 'space-around',
                        borderBottomColor:'black',
                        borderBottomWidth:1,
                        flex:0.07,
                    }}
                />
                <View style={{flex:1}}>
                    <ScrollView style={{marginTop:hp('3%')}} 
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.refreshing}
                                onRefresh={this._onRefresh}
                            />
                        }
                    >
                        {this.books.map(({pages,currentPage,bookId,name},i)=>{
                            let uri =global.uri+'/books/'+bookId+'/foto';
                            return(
                                <View style={{flex:1,flexDirection: 'column',borderBottomWidth:1,borderBottomColor:'white',paddingBottom:wp('5%'),marginBottom:wp('5%')}} key ={i}>
                                    <View style={{flexDirection: 'row',marginLeft:wp('5%')}}>
                                        <View style={{width:wp('30%'),height:hp('25%'),backgroundColor:'#171721',borderColor:'white',borderWidth:1}} >
                                            <Image
                                                style={{flex:1}}
                                                source={{uri}}
                                            />
                                        </View>
                                        <View style={{flex:1,flexDirection: 'column',marginLeft:wp('2%'),justifyContent:'space-between'}}>
                                            <View style={{flexDirection:'column',alignItems:'center'}}>
                                                <Text style={{color:'white',fontSize:wp('5%')}}>{name}</Text>
                                                <Progress.Bar 
                                                    progress={currentPage/pages} 
                                                    width={wp('50%')}
                                                    height={hp('4%')}
                                                    color={'#f39c12'} 
                                                    style={{marginTop:hp('3%')}} 
                                                    animationType={'spring'}
                                                >
                                                    <Text style={{position:'absolute',flex:0, color:'black',alignSelf:'flex-start',marginTop:hp('0.5%'),paddingLeft:wp('0.5%')}}>{currentPage}</Text>
                                                    <Text style={{position:'absolute',flex:0, color:'white',alignSelf:'flex-end',marginTop:hp('0.5%'),paddingRight:wp('1%')}}>{pages}</Text>    
                                                </Progress.Bar>
                                            </View>
                                            <View style={{alignContent:'center',justifyContent:'space-around', flexDirection:'row'}}>
                                                <Button
                                                    containerStyle={{marginTop:wp('5%')}}
                                                    buttonStyle={{backgroundColor:'#171721',width:wp('50%')}}
                                                    titleStyle={{fontSize:hp('4%')}}
                                                    title="Continuar"
                                                    onPress={()=>{this.props.navigation.navigate('previewBook',{_id:bookId})}}
                                                />
                                            </View>                              
                                        </View>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                </View>
            </View>
        )
  }
}