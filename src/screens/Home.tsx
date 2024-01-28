import React, {useContext, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import HomeIcon from '../assets/images/svg/bottom-tab/tab-home.svg';
import {COLORS} from '../utils/constants';
import {useTheme} from '@react-navigation/native';
import Dropdown from '../components/Dropdown';
import DownloadIcon from '../assets/images/svg/bottom-tab/tab-downloads.svg';
import ArrowRight from '../assets/images/svg/dropdown/arrow-right.svg';
import BottomSheet from '../components/BottomSheet';
import {BottomSheetContext} from '../context/BottomSheetProvider';
import Toast from '../components/Toast';
import {toast} from '../utils/toast';

const {height} = Dimensions.get('window');

const Home = () => {
  const {open, toggleSheet} = useContext(BottomSheetContext);

  return (
    <ScrollView style={styles.container}>
      {/* <Text style={{color: colors.text}}>hello</Text> */}
      {/* <Toast /> */}
      <Dropdown
        title="Account Settings"
        description="Subscription Details and Device Manager"
        LeftIcon={DownloadIcon}
        RightIcon={ArrowRight}
        dropDownAction={function () {
          toggleSheet({open: open, height: 0.2});
        }}
        actionList={[
          {name: 'Download only on WiFi for this devices', icon: ArrowRight},
        ]}
      />
      <Dropdown
        title="Downloads"
        description="Download quality, storage & more"
        LeftIcon={DownloadIcon}
        RightIcon={ArrowRight}
        dropDownAction={function () {
          // toggleSheet({open: open, height: 0.2});
          toast.error({
            message: 'Downloading df sfsdfdsfdsfsdf',
          });
        }}
      />
      <Dropdown
        title="App Language"
        description="English"
        LeftIcon={DownloadIcon}
        RightIcon={ArrowRight}
        dropDownAction={function () {
          toggleSheet({open: open, height: 0.2});
        }}
        actionList={[
          {name: 'Download only on WiFi for this devices', icon: ArrowRight},
        ]}
      />
    </ScrollView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
});
