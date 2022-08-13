import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  Image,
  Keyboard,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import PropTypes from 'prop-types';
// components
import {HeaderBackArrow} from '../../components/Headers';
import {InputButtonWithLabel} from '../../components/TextInputs';
import {BottomSheetUploadImage} from '../../components/BottomSheet';
import {ShowToast} from '../../components/Toast';

// constants
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import normalize from 'react-native-normalize';
import {Colors} from '../../config/constants/Color';
import {
  fontSize,
  commonStyles,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
} from '../../config/constants/Style';

// api
import {API_URL, END_POINTS} from '../../config/constants/API';
import axios from 'axios';

import {setCategories} from '../../actions/categoryAction';
//REDUX
import {connect} from 'react-redux';

const AddCategoryScreen = ({setCategories, navigation}) => {
  const [categoryName, setCategoryName] = useState(null);
  const [asset, setAsset] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  // ref
  const refOpenGalleryBottomSheet = useRef(null);
  useEffect(() => {
    if (showToast === true && toastMessage === 'Category added successfully') {
      console.log('navigate');
      // setToast();
      navigation.navigate('successScreen', [{showToastMessage: toastMessage}]);
    }
  }, [showToast, toastMessage]);

  console.log(`showToast: ${showToast}  toastmessage: ${toastMessage}`);

  const handleAddCategory = async () => {
    setLoading(true);
    if (!categoryName) {
      setShowToast(true);
      setToastMessage('Please enter category name');
    } else if (!asset) {
      setShowToast(true);
      setToastMessage('Please select image');
    } else {
      const url = API_URL + END_POINTS.addCategory;
      const formData = new FormData();
      formData.append('name', categoryName.toUpperCase());
      formData.append('categoryImage', {
        uri: asset.uri,
        name: asset.fileName,
        type: asset.type,
      });

      try {
        const res = await axios.post(url, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        if (res) {
          // if (res.data.statusCode === 0) {
          // } else if (res.data.statusCode === 1) {
          // }
          setShowToast(true);
          setToastMessage(res.data.data);
          setAsset(null);
          setCategoryName('');
          console.log(res.data.data);
        }
      } catch (err) {
        console.log('ERROR IN ADD CATEGORY', err);
      }
    }
  };

  const onClickSelectImage = isOpenGallery => {
    refOpenGalleryBottomSheet.current.close();

    // Adding setTimeout so that Bottomsheet gets closed
    setTimeout(() => {
      let options = {
        mediaType: 'photo',
        // quality: 1
      };
      isOpenGallery
        ? launchImageLibrary(options, response => {
            try {
              if (response && response.assets) {
                setAsset(response.assets[0]);
              }
            } catch (err) {
              console.log(err);
            }
          })
        : launchCamera(options, response => {
            if (response && response.assets) {
              setAsset(response.assets[0]);
            }
          });
    }, 500);
  };

  return (
    <>
      <HeaderBackArrow title="Add Category" />

      <View style={styles.container}>
        <InputButtonWithLabel
          borderBottom
          onChange={categoryName => setCategoryName(categoryName)}
          labelText="Category Name"
          placeholderText="please enter the category name"
        />
        <Text style={styles.categoryImageText}>Category Image</Text>
        <TouchableOpacity
          onPress={() => refOpenGalleryBottomSheet.current.open()}>
          <View style={styles.addImageContainer}>
            <Text style={styles.addImageText}>Add Image</Text>
            <Image
              style={styles.dropDownImage}
              source={require('../../assets/drop_down_icon.png')}
            />
          </View>
        </TouchableOpacity>
        {asset && (
          <>
            <Image
              style={styles.selectedImage}
              source={{uri: asset.uri}}
              // source={uri: asset.uri}
            />
            {/* <Text style={styles.addImageText}>{asset.fileName}</Text> */}
          </>
        )}
        <TouchableOpacity
          style={styles.submitButtonContainer}
          onPress={() => handleAddCategory()}>
          <Text style={styles.submitButtonText}>ADD CATEGORY</Text>
        </TouchableOpacity>
      </View>
      <BottomSheetUploadImage
        refRBSheet={refOpenGalleryBottomSheet}
        onClickCamera={() => onClickSelectImage(false)} // false means open gallery = false
        onClickGallery={() => onClickSelectImage(true)}
      />
      {showToast && (
        <ShowToast
          onDismiss={() => setShowToast(false)}
          visible={showToast}
          message={toastMessage}
        />
      )}
    </>
  );
};

AddCategoryScreen.prototypes = {
  setCategories: PropTypes.func.isRequired,
};

export default connect(null, {setCategories})(AddCategoryScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  categoryImageText: {
    ...commonStyles.normalboldText,
    width: SCREEN_WIDTH * 0.75,
    marginTop: normalize(24),
    marginBottom: normalize(8),
    paddingHorizontal: normalize(6),

    color: Colors.darkBlue,
  },
  addImageContainer: {
    width: SCREEN_WIDTH * 0.75,
    borderWidth: 1,
    // marginTop: normalize(24),
    borderRadius: normalize(8),
    // padding: Platform.OS == 'ios' ? 8 : 8,
    paddingVertical: normalize(10),
    paddingHorizontal: normalize(4),
    borderColor: Colors.darkBlue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addImageText: {
    ...commonStyles.normalText,
    color: Colors.darkBlue,
  },
  dropDownImage: {
    tintColor: Colors.darkBlue,
    height: normalize(10),
    resizeMode: 'contain',
  },
  selectedImage: {
    height: SCREEN_HEIGHT / 3,
    width: SCREEN_WIDTH * 0.75,
    resizeMode: 'contain',
    marginTop: normalize(30),
  },
  submitButtonContainer: {
    width: SCREEN_WIDTH * 0.95,
    borderRadius: normalize(8),
    padding: normalize(15),
    backgroundColor: Colors.darkBlue,
    position: 'absolute',
    bottom: normalize(10),
    alignItems: 'center',
  },
  submitButtonText: {
    ...commonStyles.normalboldText,
    color: Colors.white,
  },
});
