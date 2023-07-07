import React from 'react'
import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity 
  } from 'react-native'
import styles from './styles'
  
const Address = ( {onClick , user} ) => {

  return (
    <View style={styles.item}>
      <Image style={styles.itemImg} 
        source={require('../../../assets/images/map.png')} 
        resizeMode='contain'>
      </Image>

      <View style={styles.itemInfo}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontWeight: '500', fontSize: 16, maxWidth: 145, overflow: 'hidden'}}>{user.name}</Text>
            <Text style={{ marginLeft: 10, fontWeight: '300', color: '#686868'}}>{user.phone}</Text>
          </View>
          <TouchableOpacity
            onPress={() => onClick(user)}
          >
            <Text style={{ color: '#0b4ea2', fontSize: 12, padding: 4 }}>Chỉnh sửa</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ flex: 1 }}>{user.numHouse}</Text>
          <Text style={{ fontWeight: '300', flex: 2, }}>{user.note}</Text>
        </View>
        <Text>{`${user.ward.name}, ${user.district.name}, ${user.province.name}`}</Text>
      </View>
    </View>
  )
}

export default Address