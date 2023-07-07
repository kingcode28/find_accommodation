import React, { useState, useEffect } from 'react'
import {
  View,
  Text,
  Image,
  Alert,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import axios from 'axios';
import Api from '../../assets/api'
import { Dropdown } from 'react-native-element-dropdown';

const AddScreen = ({ navigation }) => {

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [ward, setWard] = useState({});
  const [district, setDistrict] = useState({});
  const [province, setProvince] = useState({});
  const [numHouse, setNumHouse] = useState('');
  const [note, setNote] = useState('');
  const [wards, setWards] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [provinces, setProvinces] = useState([]);

  var user = {
    name: name,
    phone: phone,
    province: province,
    district: district,
    ward: ward,
    numHouse: numHouse,
    note: note,
  }

  const handlerAdd = () => {
    if (name.length && phone.length && numHouse.length && Object.keys(ward, district, province).length) {

      axios.post(`${Api.urlGetListUser()}`, user)
        .then(res => res)
        .catch(err => false)
      return true;
    }
    else {
      alert("Vui lòng nhập thông tin cần thiết");
      return false;
    }
  }

  const getListProvinces = () => {
    axios.get(Api.urlGetListProvinces())
      .then(res => {
        var data = res.data.map((province) => {
          return {
            code: province.code,
            name: province.name,
          }
        })
        setProvinces(data);
      })
      .catch(err => {
        console.log('Lỗi gọi api tỉnh thành');
        console.log(err)
      })
  }

  const getListDistricts = (province) => {
    axios.get(Api.urlGetListDistricts(province))
      .then(res => {
        var data = res.data.districts.map((district) => {
          return {
            code: district.code,
            name: district.name,
          }
        })
        setDistricts(data);
      })
      .catch(err => {
        console.log('Lỗi gọi api quận huyện');
        console.log(err)
      })
  }

  const getListWards = (district) => {
    axios.get(Api.urlGetListWards(district))
    .then(res => {
      var data = res.data.wards.map((ward) => {
        return {
          code: ward.code,
          name: ward.name,
        }
      })
      setWards(data);
    })
      .catch(err => {
        console.log('Lỗi gọi api xã');
        console.log(err)
      })
  }

  useEffect(() => {
    getListProvinces();
  }, [])

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => {          // Quay về trang trước
            navigation.goBack();
          }}
          style={styles.wapperArrowLeft}
        >
          <Image style={styles.imgArrowLeft}
            source={require('../../assets/images/arrowleft.png')}
            resizeMode='contain'
          ></Image>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thêm địa chỉ mới</Text>
      </View>

      {/* Body */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            placeholder='Họ và tên'
            onChangeText={(value) => setName(value)}
          />
          <TextInput
            style={styles.input}
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
            value={name}
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
            value={name}
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
            value={name}
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
      </ScrollView>
      <View style={{ marginBottom: 30, backgroundColor: '#2296f3', padding: 3, borderRadius: 6, }}>
        <Button
          title='Lưu'
          onPress={() => {              //Quay về trang đầu tiên
            let check = true;
            if (handlerAdd()) {
              Alert.alert("Thông báo", "Thêm địa chỉ thành công!");
              navigation.navigate("Home", { check });
            }
          }}
          style={styles.btnSave}
        />
      </View>
    </View>
  )
}

export default AddScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 10,
  },

  header: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  wapperArrowLeft: {
    paddingHorizontal: 10,
  },

  imgArrowLeft: {
    width: 20,
    height: '100%',
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: '500',
  },

  input: {
    backgroundColor: '#cccccc3d',
    fontSize: 16,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 6,
    marginBottom: 14,

  },

  btnSave: {
    paddingVertical: 10,
    borderRadius: 6,
    fontSize: 18,
    fontWeight: '100',
    padding: 3,
  },

  dropdown: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 14,
    backgroundColor: '#cccccc3d',
  },

  placeholderStyle: {
    color: '#909090',
    marginLeft: 8,
  },

  selectedTextStyle: {
    marginLeft: 8,
  },

});