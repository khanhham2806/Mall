import * as React from 'react';
import { Text, View, StyleSheet, TextInput, ScrollView } from 'react-native';
import { useState, useEffect, } from 'react'
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

import { Dropdown } from 'react-native-element-dropdown';
import { Formik } from 'formik';
import * as Yup from 'yup';

import AsyncStorage from '@react-native-async-storage/async-storage';
import BtnGoBack from '../../components/BtnGoBack';
import BtnGoChat from '../../components/BtnGoChat';
import CustomButton from '../../components/CustomButton';

const CheckoutAddressScreen = () => {
  const navigation: any = useNavigation();
  const [provinces, setProvinces] = useState([])
  const [districts, setDistricts] = useState([])
  useEffect(() => {
    getProvinces()
  }, []);
  // console.log('render');
  const getProvinces = async () => {
    const res = await axios.get('https://provinces.open-api.vn/api/?depth=2')
    let provincesArray: any = []
    const count = Object.keys(res.data).length
    // console.log(count);
    for (let i = 0; i < count; i++) {
      provincesArray.push({
        value: res.data[i].code,
        label: res.data[i].name
      })
    }
    setProvinces(provincesArray);
  }

  const handleDistricts = async (code: any) => {
    console.log(code);
    const res = await axios.get(`https://provinces.open-api.vn/api/p/${code}?depth=2`)
    // console.log(res.data.districts);
    let districtsArray: any = []
    const count = Object.keys(res.data.districts).length
    // console.log(count);
    for (let i = 0; i < count; i++) {
      districtsArray.push({
        value: res.data.districts[i].code,
        label: res.data.districts[i].name
      })
    }
    setDistricts(districtsArray);
  }

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your name!'),
    phone: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .min(10, 'Must exactly 10 digits')
      .max(10, 'Must exactly 10 digits')
      .required('Please enter your phone!'),
    province: Yup.string()
      .required('Please choose your city/province'),
    district: Yup.string()
      .required('Please choose your district'),
    addressDetail: Yup.string()
      .min(5, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Please enter your address'),
  });
  return (
    < >
      <View style={{ padding: 10, elevation: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
        <BtnGoBack />
        <View>
          <Text>Delivery Address</Text>
        </View>
        <BtnGoChat />
      </View>
      <ScrollView contentContainerStyle={{ marginHorizontal: 10, paddingVertical: 10 }}>
        <Formik
          initialValues={{
            name: '',
            phone: '',
            province: '',
            district: '',
            addressDetail: ''
          }}
          onSubmit={async values => {
            console.log(values);
            try {
              await AsyncStorage.setItem('address', JSON.stringify(values));
              navigation.goBack();
            } catch (e) {
              // saving error
            }
          }}
          validationSchema={SignupSchema}
        >
          {({ handleChange, errors, handleSubmit, values }) => {
            return (
              <>
                <View>
                  <Text style={{ fontWeight: 'bold' }}>Contact</Text>
                  <TextInput placeholderTextColor={'gray'} style={styles.dropdown} placeholder='Full Name' onChangeText={handleChange('name')} value={values.name} />
                  {errors.name && (
                    <Text style={styles.validate}>{errors.name}</Text>
                  )}
                  <TextInput placeholderTextColor={'gray'} style={styles.dropdown} keyboardType='number-pad' placeholder='Phone Number' onChangeText={handleChange('phone')} value={values.phone} />
                  {errors.phone && (
                    <Text style={styles.validate}>{errors.phone}</Text>
                  )}
                </View>
                <View style={{ marginVertical: 10 }}>
                  <Text style={{ fontWeight: 'bold' }}>Address</Text>
                  <Dropdown style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={provinces}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="City, Province"
                    searchPlaceholder="Search..."
                    onChange={(item: any) => {
                      handleChange('province')(item.label)
                      handleDistricts(item.value)
                    }}
                  />
                  {errors.province && (
                    <Text style={styles.validate}>{errors.province}</Text>
                  )}
                  <Dropdown style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    iconStyle={styles.iconStyle}
                    data={districts}
                    search
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder="District"
                    searchPlaceholder="Search..."
                    onChange={(item: any) => {
                      handleChange('district')(item.label)
                    }}
                  />
                  {errors.district && (
                    <Text style={styles.validate}>{errors.district}</Text>
                  )}
                  <TextInput placeholderTextColor={'gray'} style={styles.dropdown} placeholder='Street Name, Building, House No.' onChangeText={handleChange('addressDetail')} value={values.addressDetail} />
                  {errors.addressDetail && (
                    <Text style={styles.validate}>{errors.addressDetail}</Text>
                  )}


                </View>
                <View>
                  <CustomButton onPress={handleSubmit} txtColor='#fff' text='Submit' />
                </View>
              </>
            )
          }}

        </Formik>
      </ScrollView>

    </ >

  );
};
export default CheckoutAddressScreen;

const styles = StyleSheet.create({

  dropdown: {
    margin: 16,
    height: 40,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
    fontSize: 16,
    color: 'gray'
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  validate: {
    marginHorizontal: 16,
    color: 'red',
    fontSize: 12
  }
});
