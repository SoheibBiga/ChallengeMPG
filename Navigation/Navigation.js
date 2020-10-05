'use strict';
import {createAppContainer} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import ListOfPlayersView from "../Components/ListOfPlayersView"
import PlayerDetailsView from "../Components/PlayerDetailsView"

const HomeStack = createStackNavigator({
  ListOfPlayersView: {
    screen: ListOfPlayersView,
    navigationOptions: {
      headerShown: false,
    }
  },
  PlayerDetailsView: {
    screen: PlayerDetailsView,
    navigationOptions: {
      headerShown: false,
    }
  }
})

export default createAppContainer(HomeStack)
