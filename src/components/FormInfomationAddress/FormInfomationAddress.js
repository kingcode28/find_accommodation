import React, { useState } from 'react';
import { View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import styles from './styles';
import CallAPI from '../../controller/CallAPI';

const FormInfomationAddress = (...listRest) => {
  const [name, setName] = useState(listRest.user.name);
  const [phone, setPhone] = useState(listRest.user.phone);
  const [ward, setWard] = useState(listRest.user.ward);
  const [district, setDistrict] = useState(listRest.user.district);
  const [province, setProvince] = useState(listRest.user.province);
  const [numHouse, setNumHouse] = useState(listRest.user.numHouse);
  const [note, setNote] = useState(listRest.user.note);
  
  return (
    <View style={styles.form}>
      <TextInput
        style={styles.input}
        value={name}
        placeholder='Họ và tên'
        onChangeText={(value) => setName(value)}
      />
      <TextInput
        style={styles.input}
        value={phone}
        maxLength={10}
        placeholder='Số điện thoại'
        keyboardType='phone-pad'
        onChangeText={(value) => setPhone(value)}
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={provinces}
        search
        labelField="name"
        valueField="code"
        placeholder='Chọn tỉnh(thành phố)'
        searchPlaceholder="Tìm kiếm..."
        value={province}
        onChange={province => {
          setProvince(province);
          getListDistricts(province.code);
          setDistrict({});
          setWard({});
          setWards([]);
        }}
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={districts}
        search
        labelField="name"
        valueField="code"
        placeholder='Chọn quận(huyện)'
        searchPlaceholder="Tìm kiếm..."
        value={district}
        onChange={district => {
          setDistrict(district);
          getListWards(district.code);
          setWard({});
        }}
      />
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        data={wards}
        search
        labelField="name"
        valueField="code"
        placeholder='Chọn thị trấn(xã)'
        searchPlaceholder="Tìm kiếm..."
        value={ward}
        onChange={ward => {
          setWard(ward);
        }}
      />
      <TextInput
        style={styles.input}
        value={numHouse}
        placeholder='Đường / Toà nhà'
        onChangeText={(value) => setNumHouse(value)}
      />
      <TextInput
        style={styles.input}
        value={note}
        placeholder='Ghi chú'
        onChangeText={(value) => setNote(value)}
      />
    </View>
  )
}

export default FormInfomationAddress