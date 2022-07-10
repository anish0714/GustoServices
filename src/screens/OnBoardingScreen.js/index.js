import {Text, View, Image} from 'react-native';
import React, {useState} from 'react';
import PropTypes from 'prop-types';
//COMPONENTS
import {Loader} from '../../components/Loader';
import {styles} from './style';
import AppIntroSlider from 'react-native-app-intro-slider';
//REDUX
import {connect} from 'react-redux';
import {showApp} from '../../actions/authAction';
const OnBoarding = ({showApp, authReducer: {isLoading}}) => {
  const [sliderData] = useState([
    {
      id: 0,
      image: require('../../assets/OnBoarding/ob_categories_small.png'),
      title: 'Slide title 0',
      description: 'Slide desc 0',
    },
    {
      id: 1,
      image: require('../../assets/OnBoarding/ob_categories_small.png'),
      title: 'Slide title 1',
      description: 'Slide desc 1',
    },
    {
      id: 2,
      image: require('../../assets/OnBoarding/ob_categories_small.png'),
      title: 'Slide title 2',
      description: 'Slide desc 2',
    },
    {
      id: 3,
      image: require('../../assets/OnBoarding/ob_categories_small.png'),
      title: 'Slide title 3',
      description: 'Slide desc 3',
    },
  ]);
  return (
    <>
      <Loader isLoading={isLoading} />
      <AppIntroSlider
        data={sliderData}
        keyExtractor={item => item.id.toString()}
        showSkipButton={true}
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        bottomButton
        renderItem={_renderItem}
        renderNextButton={_renderNextButton}
        renderSkipButton={_renderSkipButton}
        renderDoneButton={_renderDoneButton}
        onDone={showApp}
      />
     
    </>
  );
};

//----------------------------------------------------------------_renderItem---
const _renderItem = ({item: {image, title, description}}) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Image style={styles.image} source={image} />
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

//-------------------------------------------------_renderNextButton---
const _renderNextButton = () => {
  return (
    <View style={styles.nxtBtnContainer}>
      <Text style={styles.nxtBtnText}>Next</Text>
    </View>
  );
};

//-------------------------------------------------_renderDoneButton---
const _renderDoneButton = () => {
  return (
    <View style={styles.dnBtnContainer}>
      <Text style={styles.dnBtnText}>Done</Text>
    </View>
  );
};

//----------------------------------------------------_renderSkipButton---
const _renderSkipButton = () => {
  return (
    <View style={styles.skpBtnContainer}>
      <Text style={styles.skpBtnTxt}>Skip</Text>
    </View>
  );
};

OnBoarding.prototypes = {
  authReducer: PropTypes.object.isRequired,
  showApp: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  authReducer: state.authReducer,
});
export default connect(mapStateToProps, {showApp})(OnBoarding);
