import {StyleSheet, Text, View, Image, ScrollView} from 'react-native';
import React, {useEffect} from 'react';
import normalize from 'react-native-normalize';
import {Colors} from '../../config/constants/Color';
import {fontSize} from '../../config/constants/Style';

// components
import {HeaderText} from '../../components/Headers';
import {HomeScreenCard} from '../../components/Cards';

import PropTypes from 'prop-types';
// redux
import {connect} from 'react-redux';

const AdminHomeScreen = ({navigation, authReducer: {userData}}) => {
  return (
    <View style={styles.container}>
      <HeaderText title="Home" />
      <ScrollView style={styles.contentContainer}>
        {userData && (
          <Text style={styles.userNameText}>Hello {userData.fullName},</Text>
        )}
        <HomeScreenCard
          headerText="Add a Category"
          buttonText="Add"
          onClick={() => navigation.navigate('categoryScreen')}
        />
        <HomeScreenCard
          headerText="Add a Service"
          buttonText="Add"
          onClick={() => navigation.navigate('addServiceAdmin')}
        />
      </ScrollView>
    </View>
  );
};

AdminHomeScreen.prototypes = {
  authReducer: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, {})(AdminHomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  contentContainer: {
    padding: normalize(16),
  },
  serviceNotAddText: {
    fontSize: fontSize.medium,
    color: Colors.darkBlue,
  },
  userNameText: {
    fontSize: fontSize.medium,
    color: Colors.darkBlue,
    alignSelf: 'center',
    marginBottom: normalize(20),
  },
});
