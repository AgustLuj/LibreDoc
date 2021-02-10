import React from 'react';
import { View, Text, Image,StatusBar,ScrollView, RefreshControl } from 'react-native';
import { Button, Input, Header,Icon  } from 'react-native-elements';
import AsyncStorage  from '@react-native-async-storage/async-storage';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as ScreenOrientation from 'expo-screen-orientation';
import {user as User ,books as Books} from '../components/index';
import {Light} from '../style/general';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class userHome extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            change:true,
            noti:false,
            recharge:false,
        }
        this._onRefresh=this._onRefresh.bind(this);
        this.books=[];
        this.skip=0;
        this.three = false;
        this.rows=2;
        this.a=0;
    }
    async componentDidMount(){
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        this.focusListener = this.props.navigation.addListener('focus', async() => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        });
        this._onRefresh();
    }
    _onRefresh = () => {
        this.setState({refreshing: true});
        this.books = []
        this.loadBook((book)=>{
            this.books=book;
            this.skip+=10;
            this.setState({refreshing: false});
        });
    }
    async loadBook(fn){
        await Books.getBooks(this.skip,(r,books)=>{
            fn(books)
        })
    }
    async loadMoreBook(){
        await this.loadBook((book)=>{
            book.forEach((a)=>{
                let c = this.books.find(({_id})=>a._id === _id);
                if(c == null){
                    this.books.push(a);
                }
            })
        });
        this.skip+=10;
        this.setState({recharge:false});
    }
    changeScale(){
        this.three=(this.three)?false:true;
        this.rows=(this.rows == 2)?3:2;
        this.setState({change:true})
    }
    isCloseToBottom({layoutMeasurement, contentOffset, contentSize}){
        const paddingToBottom = 0.05;
        return layoutMeasurement.height + contentOffset.y >=
          contentSize.height - paddingToBottom; 
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
                    rightComponent={{ icon: 'notifications', color: (this.state.noti)?'red':'#fff' ,onPress: () => this.setState({noti:(this.state.noti)?false:true})}}
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
                    onScroll={({nativeEvent}) => {
                        if (this.isCloseToBottom(nativeEvent)) {
                            this.loadMoreBook();
                        }
                    }}
                >
                    <View style={{ justifyContent: 'space-around',flexDirection: 'column',}}>
                        {Array(this.books.length/this.rows).fill(this.books.length/this.rows).map((guest,i) => {//array vacio para tener las columnas
                            return(<View style={{justifyContent: 'space-around',flexDirection: 'row',marginTop:hp('1.5%'),marginBottom:hp('1.5%')}}key={i}>
                                {this.books.slice(b,b+this.rows).map(({_id},j)=>{//Corto el array original con el largo de las rows entre 2 y 3 de largo
                                    let uri ='http://192.168.100.42/books/'+_id+'/foto';
                                    if(!this.three){
                                        return(
                                            <TouchableOpacity  onPress={() => this.props.navigation.navigate('previewBook',{_id}) } key={j}>
                                                <View style={{width:wp('47%'),height:hp('45%'),backgroundColor:'#171721',borderColor:'white',borderWidth:1}}key={j} >
                                                    <Image
                                                        style={{flex:1}}
                                                        source={{uri}}
                                                    />
                                                    {c()}
                                                </View>
                                            </TouchableOpacity>
                                        )
                                    }else{
                                        return(
                                        <TouchableOpacity  onPress={() => this.props.navigation.navigate('previewBook',{_id}) } key={j}>
                                            <View style={{width:wp('30%'),height:hp('25%'),backgroundColor:'#171721',borderColor:'white',borderWidth:1}} key={j} >
                                                        <Image
                                                            style={{flex:1}}
                                                            source={{uri}}
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