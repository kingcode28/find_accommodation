import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text,
  FlatList,
  StyleSheet, 
  TouchableOpacity,
  ScrollView, } from 'react-native';
import Address from '../components/Address/Address'

const HomeScreen = ( {navigation, route} ) => {
  const [ listUser, setListUser ] = useState([]);
  const [ reload, setReload ] = useState(false)

  if(route.params.check) {
    route.params.check = false;
    setReload(!reload)
  }
  
  const getListUser = () => {
    fetch('https://64a04d95ed3c41bdd7a72f4c.mockapi.io/api/listUser')
    .then(res => res.json())
    .then(json => {
      setListUser(json)
    })
  }

  useEffect(() => {
    getListUser();
  }, [reload])

  const handlerEdit = (user) => {
    navigation.navigate("Edit", {user});
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.textTitle}>Sổ địa chỉ</Text>
        <TouchableOpacity
          onPress={() => {                  // Chuyển đến trang thêm
            navigation.navigate("Add");
          }}
          style={styles.wapperTextAdd}
        >
          <Text style={styles.textAdd}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Body */}
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* {
          <FlatList
            data={listUser}
            keyExtractor={user => user.id}
            renderItem={(user) => <Address 
                                      key={user.id}
                                      name={user.name}
                                      phone={user.phone}
                                      numHouse={user.numHouse}
                                      note={user.note}
                                      region={user.region}
                                    />
                      }
          />
        } */}
        {
          listUser.map((user, index) => (
            <Address 
              onClick={handlerEdit}
              key={index}
              id={user.id}
              name={user.name}
              phone={user.phone}
              numHouse={user.numHouse}
              note={user.note}
              region={user.region}
            />
          ))
        }
        
      </ScrollView>
    </View>
  );
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 30,
    marginHorizontal: 10,
  },

  header: {
    width: "100%",
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
  textTitle: {
    fontSize: 20,
  },

  wapperTextAdd: {
    width: 45,
    heigth: '100%',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center'
  },

  textAdd: {
    fontWeight: '300',
    fontSize: 45,
    lineHeight: 45,
  },

});

const ham = () => ({})
