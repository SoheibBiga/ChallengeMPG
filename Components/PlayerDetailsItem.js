'use strict';
import React, {Component} from 'react';
import {View, Text} from 'react-native';
import PropTypes from 'prop-types';

export default class PlayerDetailsItem extends Component {
  render() {
    const {title, arrayInfosToDisplay, data} = this.props;
    return (
      <View style={{marginBottom: 10}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>{title}</Text>
        {arrayInfosToDisplay.map((info) => {
          const key = Object.keys(info);
          let value = data.stats;
          if (Array.isArray(info[key])) {
            for (const itPath of info[key]) {
              value = value[itPath];
            }
          } else {
            value = value[info[key]];
          }
          return (
            <View key={key} style={{flexDirection: 'row'}}>
              <Text style={{marginRight: 5}}>{key}</Text>
              <Text>{value}</Text>
            </View>
          );
        })}
      </View>
    );
  }
}

PlayerDetailsItem.propTypes = {
  title: PropTypes.string.isRequired,
  arrayInfosToDisplay: PropTypes.node,
  data: PropTypes.string.isRequired,
};
