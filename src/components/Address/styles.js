import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  item: {
    width: '100%',
    flexDirection: 'row',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc4d',
  },

  itemImg: {
    width: 45,
    height: '100%',
  },

  itemInfo: {
    flex: 1,
    marginLeft: 10,
  },
});

export default styles