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

const EditScreen = ( {navigation, route} ) => {
  let region = route.params.user.region.split(', ');
  const [ name, setName ] = useState(route.params.user.name);
  const [ phone, setPhone ] = useState(route.params.user.phone);
  const [ city, setCity ] = useState(region[2]);
  const [ district, setDistrict ] = useState(region[1]);
  const [ village, setVillage ] = useState(region[0]);
  const [ numHouse, setNumHouse ] = useState(route.params.user.numHouse);
  const [ note, setNote ] = useState(route.params.user.note);
  
  var user = {
    id: route.params.user.id,
    name: name,
    phone: phone,
    numHouse: numHouse,
    note: note,
    region: `${village}, ${district}, ${city}`
  }

  const urlUser = `https://64a04d95ed3c41bdd7a72f4c.mockapi.io/api/listUser/${user.id}`

  const handlerDelete = () => {
    if(name.length && phone.length && city.length && district.length && village.length && numHouse.length) {
      axios.delete(urlUser)
        .then(res => res)
        .catch(err => false)
      return true;
    }
    else {
      alert("Vui lòng nhập thông tin cần thiết");
      return false;
    }
  }
  
  const handlerEdit = () => {
    if(name.length && phone.length && city.length && district.length && village.length && numHouse.length) {
      axios.put(urlUser, user)
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
        <Text style={styles.headerTitle}>Chỉnh sửa địa chỉ</Text>
      </View>

      {/* Body */}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            value={name}
            // autoFocus={true}
            placeholder='Họ và tên'
            onChangeText = {(value) => setName(value)}
          />
          <TextInput
            style={styles.input}
            value={phone}
            maxLength={10}
            placeholder='Số điện thoại'
            keyboardType='phone-pad'
            onChangeText = {(value) => setPhone(value)}
          />
          <TextInput
            style={styles.input}
            value={city}
            placeholder='Thành phố / Tỉnh'
            onChangeText = {(value) => setCity(value)}
          />
          <TextInput
            style={styles.input}
            value={district}
            placeholder='Quận / Huyện'
            onChangeText = {(value) => setDistrict(value)}
          />
          <TextInput
            style={styles.input}
            value={village}
            placeholder='Phường / Xã'
            onChangeText = {(value) => setVillage(value)}
          />
          <TextInput
            style={styles.input}
            value={numHouse}
            placeholder='Đường / Toà nhà'
            onChangeText = {(value) => setNumHouse(value)}
          />
          <TextInput
            style={styles.input}
            value={note}
            placeholder='Ghi chú'
            onChangeText = {(value) => setNote(value)}
          />
        </View>
      </ScrollView>
      <View style={{ marginBottom: 30, padding: 3, borderRadius: 6, }}>
        <View style={styles.wapperButton}>
          <Button
            title='Xoá địa chỉ'
            style={styles.btn} 
            onPress={() => {              //Quay về trang đầu tiên
              let check = true;
              if(handlerDelete()) {
                navigation.navigate("Home", {check});
              }
            }}
          />
        </View>
        <View style={styles.wapperButton}>
          <Button
            title='Lưu'
            style={styles.btn} 
            onPress={() => {              //Quay về trang đầu tiên
              let check = true;
              if(handlerEdit()) {
                navigation.navigate("Home", {check});
              }
            }}
          />
        </View>
      </View>
    </View>
  )
}

export default EditScreen

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

  btn: {
    paddingVertical: 10,
    borderRadius: 6,
    fontSize: 18,
    fontWeight: '100',
  },

  wapperButton: {
    paddingVertical: 3,
    backgroundColor: '#2196F3',
    marginTop: 20,
    borderRadius: 6,
  },

});