import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

// components
import {HeaderText} from '../../components/Headers';
import {AddService} from '../../components/AddService';

// constants
import {Colors} from '../../config/constants/Color';
import {fontSize} from '../../config/constants/Style';
import normalize from 'react-native-normalize';

const ServiceScreen = () => {
  const [serviceData] = useState([
    {
      serviceId: 0,
      serviceCategory: 'PLUMBING',
      image: require('../../assets/profile_image.png'),
      name: 'Anish',
      time: '10:00 AM',
      date: '2022-07-10',
      address: '56 Weber Street, Waterloo',
      cost: '$79.75',
    },
    {
      serviceId: 1,
      serviceCategory: 'CLEANING',
      image: require('../../assets/profile_image.png'),
      name: 'Pranjal',
      time: '10:00 AM',
      date: '2022-07-10',
      address: '56 Weber Street, Waterloo',
      cost: '$79.75',
    },
    {
      serviceId: 2,
      serviceCategory: 'PAINTING',
      image: require('../../assets/profile_image.png'),
      name: 'Kinjal',
      time: '10:00 AM',
      date: '2022-07-10',
      address: '56 Weber Street, Waterloo',
      cost: '$79.75',
    },
    {
      serviceId: 3,
      serviceCategory: 'PLUMBING',
      image: require('../../assets/profile_image.png'),
      name: 'Mike',
      time: '10:00 AM',
      date: '2022-07-10',
      address: '56 Weber Street, Waterloo',
      cost: '$79.75',
    },

    {
      serviceId: 4,
      serviceCategory: 'PAINTING',
      image: require('../../assets/profile_image.png'),
      name: 'Kinjal',
      time: '10:00 AM',
      date: '2022-07-10',
      address: '56 Weber Street, Waterloo',
      cost: '$79.75',
    },
    {
      serviceId: 5,
      serviceCategory: 'PLUMBING',
      image: require('../../assets/profile_image.png'),
      name: 'Mike',
      time: '10:00 AM',
      date: '2022-07-10',
      address: '56 Weber Street, Waterloo',
      cost: '$79.75',
    },
  ]);
  return (
    <>
      <View style={styles.container}>
        <HeaderText title="SERVICE HISTORY" />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={serviceData}
          keyExtractor={item => item.serviceId}
          renderItem={({item}) => {
            return <ServiceCard item={item} />;
          }}
        />
      </View>
      <AddService />
    </>
  );
};

export default ServiceScreen;

const ServiceCard = ({item}) => {
  return (
    <TouchableOpacity style={styles.cardContainer}>
      {/* top */}
      <View style={styles.cardTopContainer}>
        <Text style={styles.cardTopText}>ID: #{item.serviceId}</Text>
        <Text style={styles.cardTopText}>{item.serviceCategory}</Text>
      </View>
      {/* main */}
      <View style={styles.cardMainContainer}>
        <Image style={styles.cardImage} source={item.image} />
        <View
          style={{
            marginLeft: normalize(10),
            flex: 1,
          }}>
          <Text style={styles.cardMainText}>{item.name}</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              //   width: '70%',
              marginTop: normalize(5),
            }}>
            <Text style={styles.cardMainText}>{item.date}</Text>
            <Text style={styles.cardMainText}>{item.time}</Text>
          </View>
          <View style={styles.cardBottomContainer}>
            <Text style={styles.cardMainText}>{item.address}</Text>
            <Text style={styles.cardMainText}>{item.cost}</Text>
          </View>
        </View>
      </View>
      {/* bottom */}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardBottomContainer: {
    // paddingHorizontal: normalize(10),
    // paddingBottom: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
     marginBottom: normalize(60),
    backgroundColor: Colors.white,
  },

  //---------------CARD-----------
  cardImage: {
    height: normalize(60),
    width: normalize(60),
    borderRadius: normalize(50),
  },
  cardMainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    padding: normalize(10),
    // flex:1,
    // borderWidth: 1,
  },
  cardContainer: {
    // padding: normalize(8),
    marginHorizontal: normalize(32),
    marginVertical: normalize(8),
    // elevation: 20,
    borderWidth: 1,
    borderColor: Colors.darkBlue,
    borderRadius: normalize(10),
  },
  cardTopContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.darkBlue,
    padding: normalize(10),
    borderTopLeftRadius: normalize(7),
    borderTopRightRadius: normalize(7),
  },
  cardTopText: {
    color: Colors.white,
    fontSize: fontSize.small,
  },
  cardMainText: {
    color: Colors.darkBlue,
    fontSize: fontSize.small,
  },
});
