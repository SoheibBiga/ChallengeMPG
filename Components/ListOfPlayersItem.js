'use strict';
import React, {Component} from 'react';
import {TouchableOpacity, Text, View, Alert, Dimensions} from 'react-native';
import PropTypes from 'prop-types'
const {width, height} = Dimensions.get('window');

export default class ListOfPlayersItem extends Component {

  _getDetails = () =>
  {
    const idPlayer = this.props.data.id.replace(/_/gi,"/")
    const playerApi = "https://api.monpetitgazon.com/stats/"+idPlayer+"?season=2018"
    fetch(playerApi,{method: 'GET'})
      .then((response) => response.json())
      .then((json) => {
        this.props.onpress(json)
      })
      .catch((error) => {
        console.log(error)
        Alert.alert("Erreur","Un problème est survenu lors de l'appel à l'API MPG.")
      })
  }

  render() {
    const {data, index} = this.props
    const infos = [["firstname"],["lastname"],["position"],["ultraPosition"],["teamId"],["quotation"],["club"],["stats","avgRate"],["stats","sumGoals"],["stats","currentChampionship"],["stats","percentageStarter"]]
    return(
      <View>
        <TouchableOpacity
        style={{flexDirection:"row", paddingVertical:10, justifyContent:'space-around', backgroundColor:index%2==0?'#D9E9F1':'#8FAAD9'}}
        onPress={this._getDetails}
        >
          {
            infos.map((element) =>
            {
              let info = data
              for(const it of element)
              {
                info = info[it]
              }
              return(
                <Text key={element[element.length - 1]}>{info}</Text>
              )
            })
          }
        </TouchableOpacity>
        <View style={{height:2, width:width, backgroundColor:'grey'}}/>
      </View>
    )
  }
}

ListOfPlayersItem.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired
}
