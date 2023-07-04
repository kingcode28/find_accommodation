import React, {useState} from 'react'
import { 
  View, 
  Text,
  Image,
  Button,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,  
} from 'react-native'
import axios from 'axios';

const AddScreen = ( {navigation} ) => {
  const [ name, setName ] = useState('');
  const [ phone, setPhone ] = useState('');
  const [ city, setCity ] = useState('');
  const [ district, setDistrict ] = useState('');
  const [ village, setVillage ] = useState('');
  const [ numHouse, setNumHouse ] = useState('');
  const [ note, setNote ] = useState('');
  
  var user = {
    name: name,
    phone: phone,
    numHouse: numHouse,
    note: note,
    region: `${village}, ${district}, ${city}`
  }
  const handlerAdd = () => {
    if(name.length && phone.length && city.length && district.length && village.length && numHouse.length) {
  
      axios.post('https://64a04d95ed3c41bdd7a72f4c.mockapi.io/api/listUser', user)
        .then(res => res)
        .catch(err => false)
      return true;
    }
    else {
      alert("Vui lòng nhập thông tin cần thiết");
      return false;
    }
  }

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
            // autoFocus={true}
            placeholder='Họ và tên'
            onChangeText = {(value) => setName(value)}
          />
          <TextInput
            style={styles.input}
            maxLength={10}
            placeholder='Số điện thoại'
            keyboardType='phone-pad'
            onChangeText = {(value) => setPhone(value)}
          />
          <TextInput
            style={styles.input}
            placeholder='Thành phố / Tỉnh'
            onChangeText = {(value) => setCity(value)}
          />
          <TextInput
            style={styles.input}
            placeholder='Quận / Huyện'
            onChangeText = {(value) => setDistrict(value)}
          />
          <TextInput
            style={styles.input}
            placeholder='Phường / Xã'
            onChangeText = {(value) => setVillage(value)}
          />
          <TextInput
            style={styles.input}
            placeholder='Đường / Toà nhà'
            onChangeText = {(value) => setNumHouse(value)}
          />
          <TextInput
            style={styles.input}
            placeholder='Ghi chú'
            onChangeText = {(value) => setNote(value)}
          />
        </View>
      </ScrollView>
      <View style={{ marginBottom: 30, backgroundColor: '#2296f3', padding: 3, borderRadius: 6, }}>
        <Button
          title='Lưu'
          onPress={() => {              //Quay về trang đầu tiên
            let check = true;
            if(handlerAdd()) {
              navigation.navigate("Home", {check});
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

});