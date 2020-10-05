'use strict';
import React, {Component} from 'react';
import {SafeAreaView, View, Text} from 'react-native';
import PlayerDetailsItem from './PlayerDetailsItem';
//--Dev Mode--import playerDetailsData from '../Helpers/PlayerDetailsData0.json';

export default class PlayerDetailsView extends Component {
  render() {
    //--Dev Mode--const data = playerDetailsData;
    const data = this.props.navigation.getParam('data')
    const general = [
      {'Note Moyenne': 'avgRate'},
      {Buts: 'sumGoals'},
      {Titulaire: ['appearances', 'total']},
      {Cote: ''},
      {'Cartons Rouge': 'sumRedCard'},
    ];
    const efficacity = [
      {'Dribbles réussis par match': 'wonContestByMatch'},
      {'Duels remportés par match': 'wonDuelByMatch'},
      {'Pertes de balle par match': 'lostBallByMatch'},
      {'Fautes commises par match': 'foulsByMatch'},
      {'Fautes subies par match': 'foulsEnduredByMatch'},
      {'Tirs cadrés par match': 'shotOnTargetByMatch'},
    ];
    const percentages = [
      {'Précision passes en arrière': 'percentageAccuratePassBackZone'},
      {'Precision passes en avant': 'percentageAccurateFwdZone'},
      {'Précision longues passes': 'percentageAccurateLongPass'},
      {'Taux passes réussies': 'percentageSucceedPass'},
      {'Tirs cadrés': 'percentageShotOnTarget'},
      {'Buts par opportunité': 'percentageGoalByOpportunity'},
    ];
    const allBlocks = [
      {Général: general},
      {'Efficace ?': efficacity},
      {'Quelsques pourcentages': percentages},
    ];

    return (
      <SafeAreaView
        style={{flex: 1, paddingHorizontal: 10, paddingVertical: 20}}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              marginBottom: 10,
              justifyContent: 'center',
            }}>
            <Text style={{marginRight: 5}}>{data.firstname}</Text>
            <Text>{data.lastname.toUpperCase()}</Text>
          </View>
          {allBlocks.map((block) => {
            const title = Object.keys(block)[0];
            return (
              <PlayerDetailsItem
                key={title}
                title={title}
                arrayInfosToDisplay={block[title]}
                data={data}
              />
            );
          })}
        </View>
      </SafeAreaView>
    );
  }
}
