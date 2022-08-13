import {StyleSheet, Text, View, FlatList, Image} from 'react-native';
import React, {useState} from 'react';
import {Colors} from '../../config/constants/Color';
import {
  commonStyles,
  fontFamily,
  fontSize,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../config/constants/Style';
import normalize from 'react-native-normalize';
import {HeaderBackArrow} from '../../components/Headers';

import {API_URL} from '../../config/constants/API';
//CARD CALCULATIONS

const MARGIN = normalize(12);
const SCREEN_PADDING = normalize(16);
const IMAGE_HEIGHT_WIDTH = normalize(100);
const IMAGE_CONTENT_MARGIN = normalize(20);
const CARD_WIDTH = SCREEN_WIDTH - SCREEN_PADDING * 2 - MARGIN * 5;

const AboutUsCard = ({item, reverseCard, lastElement}) => {
  return (
    <>
      {!reverseCard ? (
        <>
          <View style={[styles.cardContainer, styles.cardContentStart]}>
            <View style={{marginLeft: MARGIN}}>
              <Image source={{uri: item.image}} style={styles.cardImage} />
              <Text style={styles.date}>{item.date}</Text>
            </View>
            <View style={styles.normalCardTextContainer}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.comments}>{item.desc}</Text>
            </View>
          </View>
          {!lastElement && (
            <Image
              source={require('../../assets/left_curve_line.png')}
              style={styles.curvedImage}
            />
          )}
        </>
      ) : (
        <>
          <View style={[styles.cardContainer, styles.cardContentEnd]}>
            <View style={styles.reverseCardTextContainer}>
              <Text style={styles.name}>{item.title}</Text>
              <Text style={styles.comments}>{item.desc}</Text>
            </View>
            <View style={{marginRight: MARGIN}}>
              <Image source={{uri: item.image}} style={styles.cardImage} />
              <Text style={styles.date}>{item.date}</Text>
            </View>
          </View>
          {!lastElement && (
            <Image
              source={require('../../assets/right_curve_line.png')}
              style={styles.curvedImage}
            />
          )}
        </>
      )}
    </>
  );
};

const AboutUs = () => {
  const [aboutUsData] = useState([
    {
      id: 0,
      image: `${API_URL}images/Profile/mentor.png`,
      title: 'Mike Stacey',
      desc: 'Mentoring students for capstone projects.',
      date: 'Mentor',
    },
    {
      id: 1,
      image: `${API_URL}images/Profile/anish.jpg`,
      title: 'Anish Dandekar',
      desc: 'Knowledge of Agile development methodologies and 3+ years of experience in web and mobile app development.',
      date: 'Frontend Developer',
    },
    {
      id: 2,
      image: `${API_URL}images/Profile/kinjal.jpg`,
      title: 'Kinjal Kaushik',
      desc: '3+ years of experience in web development. Familiarity with programming languages such as JavaScript and TypeScript.',
      date: 'Backend Developer',
    },
    {
      id: 3,
      image: `${API_URL}images/Profile/pranjal.jpg`,
      title: `Pranjal Parikh`,
      desc: 'Ability to analyze problems and find solutions. 3+ years of experience in Java.',
      date: 'Database Developer',
    },
  ]);

  return (
    <>
      <HeaderBackArrow title="Our Team" />
      <View style={{flex: 1, backgroundColor: Colors.white}}>
        <View style={{alignItems: 'center', marginBottom: normalize(20)}}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={aboutUsData}
            keyExtractor={item => item.id}
            ListHeaderComponent={() => {
              return (
                <View style={{alignItems: 'center'}}>
                  {/* <Text style={styles.ourTeam}>Our Team</Text> */}
                </View>
              );
            }}
            renderItem={({item, index}) => {
              return (
                <AboutUsCard
                  item={item}
                  reverseCard={index % 2 === 0 ? false : true}
                  lastElement={aboutUsData.length === index + 1 ? true : false}
                />
              );
            }}
          />
        </View>
      </View>
    </>
  );
};

export default AboutUs;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: normalize(16),
    backgroundColor: Colors.white,
  },
  ourTeam: {
    fontSize: fontSize.extra_large,
    fontWeight: 'bold',
    color: Colors.darkBlue,
    // marginBottom: normalize(30),
    // marginTop: normalize(10),
  },
  //-------------------------------------------CARD----
  cardContainer: {
    flexDirection: 'row',
    //alignItems: 'center',
    width: CARD_WIDTH,
    // margin: MARGIN,
    // borderWidth: 1,
  },
  cardContentStart: {
    justifyContent: 'flex-start',
  },
  cardContentEnd: {
    justifyContent: 'flex-end',
    // borderWidth: 1,
  },
  cardImage: {
    height: IMAGE_HEIGHT_WIDTH,
    width: IMAGE_HEIGHT_WIDTH,
    borderRadius: IMAGE_HEIGHT_WIDTH,
    resizeMode: 'contain',
  },
  normalCardTextContainer: {
    marginLeft: IMAGE_CONTENT_MARGIN,
    //marginTop: 10,
    justifyContent: 'center',
    bottom: normalize(10),
    alignItems: 'flex-start',
  },
  reverseCardTextContainer: {
    // paddingRight: normalize(10),
    //paddingLeft: normalize(10),
    // marginTop: 10,
    justifyContent: 'center',
    bottom: normalize(10),
    // borderWidth: 1,
    alignItems: 'flex-start',
  },
  name: {
    fontSize: fontSize.small,
    color: Colors.darkBlue,
    fontWeight: 'bold',
    // borderWidth: 1,
    textAlign: 'center',
  },
  date: {
    fontSize: fontSize.small,
    fontWeight: 'bold',
    // borderWidth: 1,
    textAlign: 'center',
    marginTop: normalize(8),
    color: Colors.darkBlue,
  },
  comments: {
    fontSize: fontSize.small,
    width: CARD_WIDTH - IMAGE_CONTENT_MARGIN - IMAGE_HEIGHT_WIDTH - MARGIN,
    // textAlign: 'center',
  },
  curvedImage: {
    marginLeft: MARGIN + normalize(50),
    resizeMode: 'contain',
    width: normalize(180),
    tintColor: Colors.darkBlue,
  },
});
