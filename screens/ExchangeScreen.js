import React,{Component} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  StyleSheet,
  TouchableOpacity,
  Alert} from 'react-native';
import db from '../config';
import firebase from 'firebase';
import MyHeader from '../components/MyHeader'

export default class BookRequestScreen extends Component {
    constructor() {
        super();
        this.state ={
          userId : firebase.auth().currentUser.email,
          itemName:"",
          itemDescription:""
        }
    }

    createUniqueId(){
        return Math.random().toString(36).substring(7);
    }
    
    addItem =(itemName, itemDescription)=>{
        var userId = this.state.userId;
        var randomRequestId = this.createUniqueId();
        db.collection('ItemsList').add({
            "userId": userId,
            "itemName":this.state.itemName,
            "itemDescription":this.state.itemDescription,
            "requestId":randomRequestId,
        })
    
        this.setState({
            itemName:'',
            itemDescription: ''
        })
    
        return Alert.alert("Book Requested Successfully");
    }

    render() {
        return(
            <View style={{flex: 1}}>
                <MyHeader
                title="Exchange Items"
                navigation={this.props.navigation}/>
                  <KeyboardAvoidingView style={styles.keyBoardStyle}>
              <TextInput
                style ={styles.formTextInput}
                placeholder={"Item"}
                onChangeText={(text)=>{
                    this.setState({
                        itemName:text
                    })
                }}
                value={this.state.itemName}
              />
              <TextInput
                style ={[styles.formTextInput,{height:300}]}
                multiline
                numberOfLines ={8}
                placeholder={"About The Item"}
                onChangeText ={(text)=>{
                    this.setState({
                        itemDescription: text
                    })
                }}
                value ={this.state.itemDescription}
              />
              <TouchableOpacity
                style={styles.button}
                onPress={()=>{this.addItem(this.state.bookName,this.state.reasonToRequest)}}
                >
                <Text>Add</Text>
              </TouchableOpacity>
            </KeyboardAvoidingView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    keyBoardStyle : {
      flex:1,
      alignItems:'center',
      justifyContent:'center'
    },
    formTextInput:{
      width:"75%",
      height:35,
      alignSelf:'center',
      borderColor:'#ffab91',
      borderRadius:10,
      borderWidth:1,
      marginTop:20,
      padding:10,
    },
    button:{
      width:"75%",
      height:50,
      justifyContent:'center',
      alignItems:'center',
      borderRadius:10,
      backgroundColor:"#ff5722",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 8,
      },
      shadowOpacity: 0.44,
      shadowRadius: 10.32,
      elevation: 16,
      marginTop:20
      },
    }
  )