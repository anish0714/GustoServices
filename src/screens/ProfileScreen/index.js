import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState, useRef} from 'react';
import PropTypes from 'prop-types';
// components
import {Loader} from '../../components/Loader';
import {LogoutModel} from '../../components/Models';
import {HeaderText} from '../../components/Headers';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {BottomSheetUploadImage} from '../../components/BottomSheet';

// colors
import {Colors} from '../../config/constants/Color';
import {
  fontSize,
  SCREEN_HEIGHT,
  SCREEN_WIDTH,
} from '../../config/constants/Style';
import {API_URL} from '../../config/constants/API';

import normalize from 'react-native-normalize';
import {handleLogout, handleUpdateProfilePic} from '../../actions/authAction';
import {connect} from 'react-redux';

const ProfileScreen = ({
  navigation,
  handleLogout,
  handleUpdateProfilePic,
  authReducer: {userData, isLoading},
}) => {
  const [showLogoutModel, setShowLogoutModel] = useState(false);
  console.log('userData', userData);

  // ref
  const refOpenGalleryBottomSheet = useRef(null);

  const onClickSelectImage = isOpenGallery => {
    refOpenGalleryBottomSheet.current.close();
    console.log('### open ==', isOpenGallery ? 'Gallery' : 'Camera');

    // Adding setTimeout so that Bottomsheet gets closed
    setTimeout(() => {
      let options = {
        mediaType: 'photo',
        // quality: 1
      };
      isOpenGallery
        ? launchImageLibrary(options, response => {
            console.log('### Response from gallery ==', response);
            // console.log('Response uri', response);
            try {
              if (response && response.assets) {
                // setAsset(response.assets[0]);
                handleUpdateProfilePic(userData._id, response.assets[0]);
              }
            } catch (err) {
              console.log(err);
            }
          })
        : launchCamera(options, response => {
            console.log('### Response from camera ==', response);
            if (response && response.assets) {
              // setAsset(response.assets[0]);
              handleUpdateProfilePic(userData._id, response.assets[0]);
            }
          });
    }, 500);
  };

  return (
    <>
      {/* <Loader isLoading={isLoading} /> */}
      <View style={styles.container}>
        <HeaderText title="PROFILE" />
        <View style={styles.upperContainer}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => refOpenGalleryBottomSheet.current.open()}>
            <Image
              style={styles.profileImage}
              source={{uri: API_URL + userData.profilePic}}
            />
            {/* <Image
              style={styles.profileImage}
              source={require('../../assets/user_profile.png')}
            /> */}
            <View style={styles.cameraContainer}>
              <Image
                style={styles.cameraIcon}
                source={require('../../assets/camera.png')}
              />
            </View>
          </TouchableOpacity>

          <View style={styles.userNameContainer}>
            <Text style={styles.userNameText}>{userData.fullName}</Text>
            <Text style={styles.userNameText}>Waterloo</Text>
          </View>
        </View>
        <ScrollView style={styles.bottomContainer}>
          <ProfileItem
            title="Edit Profile"
            itemImage={require('../../assets/edit_profile.png')}
            isRightArrow
            onPress={() => navigation.navigate('editProfile')}
          />
          <ProfileItem
            title="Payment Details"
            itemImage={require('../../assets/payment.png')}
            isRightArrow
            // onPress={() => navigation.navigate('aboutUs')}
          />
          <ProfileItem
            title="About Us"
            itemImage={require('../../assets/about_us.png')}
            isRightArrow
            onPress={() => navigation.navigate('aboutUs')}
          />
          <ProfileItem
            title="Logout"
            itemImage={require('../../assets/account_logout.png')}
            onPress={() => setShowLogoutModel(true)}
          />
        </ScrollView>
      </View>
      <LogoutModel
        // onLogout={() => console.log('onlogout pressed')}
        onLogout={handleLogout}
        visible={showLogoutModel}
        onDismiss={() => setShowLogoutModel(false)}
      />
      <BottomSheetUploadImage
        refRBSheet={refOpenGalleryBottomSheet}
        onClickCamera={() => onClickSelectImage(false)} // false means open gallery = false
        onClickGallery={() => onClickSelectImage(true)}
      />
    </>
  );
};

const ProfileItem = ({title, isRightArrow, onPress, itemImage}) => {
  return (
    <TouchableOpacity style={styles.profileItemContainer} onPress={onPress}>
      <View style={{flexDirection: 'row'}}>
        <Image style={styles.itemImage} source={itemImage} />
        <Text style={styles.profileItemText}>{title}</Text>
      </View>

      {isRightArrow && (
        <Image
          style={styles.rightIcon}
          source={require('../../assets/calendar-right-arrow.png')}
        />
      )}
    </TouchableOpacity>
  );
};

ProfileScreen.prototypes = {
  authReducer: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  handleUpdateProfilePic: PropTypes.func.isRequired,
};
const mapStateToProps = state => ({
  authReducer: state.authReducer,
});

export default connect(mapStateToProps, {handleLogout, handleUpdateProfilePic})(
  ProfileScreen,
);

const styles = StyleSheet.create({
  itemImage: {
    height: normalize(20),
    width: normalize(20),
    tintColor: Colors.darkBlue,
    resizeMode: 'contain',
    marginRight: normalize(10)
  },
  rightIcon: {
    height: normalize(20),
    width: normalize(20),
    tintColor: Colors.darkBlue,
    resizeMode: 'contain',
  },
  profileItemContainer: {
    elevation: 2,
    //  borderWidth: 1,
    //  borderColor: Colors.borderGrey,
    padding: normalize(20),
    borderRadius: normalize(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: normalize(10),
  },
  profileItemText: {
    fontSize: fontSize.medium,
    color: Colors.darkBlue,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    // marginBottom: normalize(50),
  },
  upperContainer: {
    // backgroundColor: Colors.darkBlue,
    // alignItems: 'center',
    flexDirection: 'row',
  },
  bottomContainer: {
    marginHorizontal: normalize(32),
    marginTop: normalize(16),
    paddingBottom: normalize(16),
    flex: 1,
    backgroundColor: Colors.white,
    height: SCREEN_HEIGHT,
  },
  imageContainer: {
    // borderWidth: 2,
    // borderColor: Colors.golden,
    height: normalize(100),
    width: normalize(100),
    alignItems: 'center',
    // alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: normalize(10),
    borderRadius: normalize(100),
    elevation: 10,
    marginLeft: normalize(32),
    backgroundColor: Colors.white,
  },
  profileImage: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    borderRadius: normalize(100),
  },
  userNameContainer: {
    marginTop: normalize(16),
    marginLeft: normalize(16),
  },
  userNameText: {
    fontSize: fontSize.medium,
    color: Colors.darkBlue,
  },
  cameraContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderRadius: normalize(20),
    padding: normalize(8),
    // borderTopWidth: 1,
    elevation: 5,
  },
  cameraIcon: {
    height: normalize(20),
    width: normalize(20),
    // tintColor: Colors.darkBlue,
    resizeMode: 'contain',
  },
});
