import React from 'react';
import { View, Text, Image,StatusBar,ScrollView, RefreshControl, Alert } from 'react-native';
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
        this._id=this.props.route.params._id
        this.state= {
            fav:false,
            biblio:false,
            refreshing:false,
            errg:false,
            info:'Error Desconocido'
        }
        this.bookData={}
    }
    async componentDidMount(){
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
        this.focusListener = this.props.navigation.addListener('focus', async() => {
            await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.PORTRAIT);
            this._onRefresh();
        });
        this._onRefresh();
    }
    _onRefresh = async() => {
        this.setState({refreshing: true});
        try {
            let data = await Books.getDataBook(this._id)
            this.bookData=data
            
            let {favorite:fav,biblio} = await User.searchBook(this._id);
            this.setState({fav,biblio})

            this.setState({refreshing: false});

        } catch (error) {
            this.setState({refreshing: true});
            Alert.alert(
                "Importante",
                "Ocurrio un problema vuelva a internarlo o contacte al administrador",
                [
                    { text: "Acepto", onPress: () => this.props.navigation.goBack() }
                ],
                { cancelable: true }
            );
            return null;
        }
        return null;
    }
    addBook = async()=>{
        try {
            let biblio = await User.addBook(this._id);
            this.setState({biblio})
        } catch (error) {
            console.log(error);
            this.setState({biblio:false}) 
        }
    }
    addFavBook = async() =>{
        try {
            let fav = await User.addFavBook(this._id);
            this.setState({fav})
        } catch (error) {
            console.log(error);
            this.setState({fav:false})
        }
    }
    errAlert = ()=>{
        Alert.alert(
            "Lo siento",
            "Ocurrio un problema vuelva a intentarlo",
            [
                { text: "aceptar", onPress: async() => {}}
            ],
            { cancelable: true }
        );
    }
    readButton = async()=>{
        if(global.type != null && global.type == 'guest'){
            Alert.alert(
                "Importante",
                "No puede leer un libro siendo un invitado",
                [
                  { text: "Acepto", onPress: async() => {}
                    }
                ],
                { cancelable: true }
              );
        }else{
            try {
                let {finish} = await User.getFinish(this._id);
                if(!finish){
                    Alert.alert(
                        "Importante",
                        "Considere comprar la version Fisica para apoyar al creador del libro",
                        [
                            { text: "Acepto", 
                                onPress: async() => {
                                    this.props.navigation.navigate('pdfView',{_id:this._id});
                                }
                            }
                        ],
                        { cancelable: true }
                    );
                }else{
                    Alert.alert(
                        "Felicitaciones",
                        "Ya terminaste el libro te gustaria re leerlo o te gustaria calificarlo",
                        [
                            { text: "Calificarlo", onPress: async() => {this.props.navigation.navigate('Read')}},
                            { text: "Re leerlo", onPress: async() => {
                                try {
                                    await User.readAgain(this._id);
                                    this.props.navigation.navigate('pdfView',{_id:this._id});
                                } catch (error) {
                                    return this.errAlert();
                                }
                            }}
                        ],
                        { cancelable: true }
                      );
                }
            } catch (error) {
                this.errAlert();
            }            
        }
    }
    componentWillUnmount(){
        try {
            this.focusListener();
            this.setState({refreshing: false});
        } catch (error) {
            console.log(error)
        }
    }
    render() {
        /*
        */
       //console.log(this.props.route)
       let {fav,biblio,refreshing,errG,info} =this.state 
       let {_id}=this.props.route.params
       let uri =global.uri+'/books/'+_id+'/foto';

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
                    {(errG)?<Text style={{color:'red',fontSize:wp('4%')}}>{info}</Text>:null}
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
                                                onPress={this.readButton}
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