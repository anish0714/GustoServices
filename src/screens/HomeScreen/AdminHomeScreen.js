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
    <>
      <HeaderText title="Home" />
      <View style={styles.container}>
        {userData && (
          <Text style={styles.userNameText}>Hello {userData.fullName},</Text>
        )}
        <View style={styles.contentContainer}>
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
        </View>
      </View>
    </>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
