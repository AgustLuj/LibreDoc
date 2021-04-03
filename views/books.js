import React from 'react';
import { View, Text, Image,StatusBar,ScrollView, RefreshControl } from 'react-native';
import {user as User ,books as Books} from '../components/index';
import * as ScreenOrientation from 'expo-screen-orientation';
import {Light} from '../style/general';
import { Button, Input, Header,SearchBar  } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default class userHome extends React.Component {
    constructor(props){
        super(props);
        this.state= {
            change:true,
            noti:false,
            recharge:false,
        }
        this.books=[];
        this.skip=0;
        this.three = false;
        this.rows=2;
        this.a=0;
        this.type = this.props.route.params.type
    }
    async componentDidMount(){
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this._onRefresh()
        });
        this._onRefresh();
    }
    async componentWillUnmount(){
        this.focusListener();
        this.setState({refreshing: false});
    }
    _onRefresh = async() => {
        this.setState({refreshing: true});
        //this.books = []
        try {
            let book = await this.loadBook();
            if(book.length > 0 ){
                this.books=book; 
            }
            this.setState({refreshing: false});
            return null;

        } catch (error) {
            console.log(error);
            this.setState({refreshing: false});
        }
    }
    async loadBook(){
        switch(this.type){
            case 1:
                try {
                    let books = await Books.getBooks();
                    return books;
                } catch (error) {
                    throw new Error();
                }
            case 2:
                try {
                    let books = await Books.getUsersBooks(true);
                    return books
                } catch (error) {
                    throw new Error(error.message);
                }
            case 3:
                try {
                    let books = await Books.getUsersBooks(false);
                    return books
                } catch (error) {
                    throw new Error(error.message);
                }
            default:
                throw new Error('3');
        }
    }
    async loadMoreBook(){
        if(this.type == 1){
            this.skip+=10;
            await Books.getMoreBooks(this.skip,(r,book)=>{
                if(!r){
                    return new Promise(async resolve=>{
                        for (let a of book){
                            let c = this.books.findIndex(({_id})=>a._id === _id);
                            if(c === -1){
                                this.books.push(a);
                            }
                        }
                        //console.log(this.books.length)
                        resolve();
                    })
                    
                }  
            });
            this.setState({recharge:false});
        }
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
        //console.log(this.props.route)
        return (
            <View style={Light.container}>
                <StatusBar backgroundColor='#2c2c34' />
                <Header
                    placement="left"
                    statusBarProps={{ backgroundColor:'#171721' }}
                    leftComponent={{ icon: 'menu', color: '#fff',onPress: () => this.props.navigation.openDrawer() }}
                    centerComponent={{ text: (this.type == 1)?'Libros':(this.type == 2)?'Biblioteca':'Favoritos', style: { color: '#fff',fontSize:hp('3%'), } }}
                    rightComponent={{ icon: 'search', color: (this.state.noti)?'red':'#fff' ,onPress: () =>{}}}
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
                        {Array(Math.round(this.books.length/this.rows)).fill(Math.round(this.books.length/this.rows)).map((guest,i) => {//array vacio para tener las columnas
                            return(<View style={{justifyContent: 'space-around',flexDirection: 'row',marginTop:hp('1.5%'),marginBottom:hp('1.5%')}}key={i}>
                                {this.books.slice(b,b+this.rows).map(({_id},j)=>{//Corto el array original con el largo de las rows entre 2 y 3 de largo
                                    let uri =global.uri+'/books/'+_id+'/foto';
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