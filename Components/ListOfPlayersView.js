'use strict';
import React, {Component} from 'react'
import {SafeAreaView, FlatList, Text, Alert, View, TextInput} from 'react-native'
import ListOfPlayersItem from "./ListOfPlayersItem"
import listOfPlayers  from "../Helpers/ListOfPlayersData.json"
import StyleSheet from "./Style"
import {Picker} from '@react-native-community/picker';

export default class ListOfPlayersView extends Component {

  constructor(props) {
    super(props);
    //this.rawListOfPlayers = []
    this.rawListOfPlayers = listOfPlayers
    this.state = {
      listOfPlayers:[],
      position:''
    };
  }

  componentDidMount() {
    this.setState({listOfPlayers:listOfPlayers})
    /*
    fetch("https://api.monpetitgazon.com/stats/championship/1/2018",{method: 'GET'})
      .then((response) => response.json())
      .then((json) => {
        this.rawListOfPlayers = json
        this.setState({listOfPlayers:json})
      })
      .catch((error) => {
        Alert.alert("Erreur","Un problème est survenu lors de l'appel à l'API Mon Petit Gazon.")
      })*/
  }

  _goToPlayersDetailsView = (data) =>
  {
    this.props.navigation.navigate("PlayerDetailsView", {data: data})
  }

  _filterByName = (text) =>
  {
    if(text == "")
    {
      this.setState({listOfPlayers:this.rawListOfPlayers})
    }
    else
    {
      const lowerCaseText = text.toLowerCase()
      const result = this.rawListOfPlayers.filter(player => player["lastname"].toLowerCase().startsWith(lowerCaseText))
      this.setState({listOfPlayers:result})
    }
  }

  _filterByPosition = (itemValue) =>
  {

    if(itemValue == "")
    {
      this.rawListOfPlayers.filter(player => player["lastname"].toLowerCase().startsWith(lowerCaseText))
      this.setState({listOfPlayers:this.rawListOfPlayers})
    }
    else
    {
      const result = this.rawListOfPlayers.filter(player => player["ultraPosition"] == itemValue)
      this.setState({listOfPlayers:result})
    }
    this.setState({position: itemValue})
  }

  render() {
    return(
      <SafeAreaView style={{flex:1, paddingTop:10}}>
        <View style={{alignItems:'center'}}>
          <Text style={[StyleSheet.h1,{marginBottom:10}]}>Liste des joueurs</Text>
        </View>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={{marginRight:5}}>Trier par nom</Text>
          <TextInput
            style={{width:100, height:35, borderColor:'black', borderWidth:1}}
            onChangeText={text => this._filterByName(text)}
          />
        </View>
        <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={{marginRight:5}}>Position :</Text>
          <Picker
            selectedValue={this.state.position}
            style={{height: 50, width: 150,borderColor:'black',borderWidth:2}}
            onValueChange={(itemValue, itemIndex) => this._filterByPosition(itemValue)}>
            <Picker.Item label="Toutes" value="" />
            <Picker.Item label="Gardien" value="10" />
            <Picker.Item label="Defenseur" value="20" />
            <Picker.Item label="Lateral" value="21" />
            <Picker.Item label="Milieu défensir" value="31" />
            <Picker.Item label="Milieu offensif" value="32" />
            <Picker.Item label="Attaquant" value="40" />
          </Picker>
        </View>
        <FlatList
          data={this.state.listOfPlayers}
          keyExtractor={(item) => item.id}
          renderItem={({item, index}) => <ListOfPlayersItem
            data={item}
            onpress={this._goToPlayersDetailsView}
            index={index}
          />}
        />
      </SafeAreaView>
    )
  }
}
