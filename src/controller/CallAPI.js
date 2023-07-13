import axios from 'axios';
import Api from '../../assets/api';

export default {

  getListUser: function (callback) {
    axios.get(Api.urlGetListUser())
      .then(response => {
        callback(response.data)
      })
      .catch(err => console.log(err))
  },

  getListProvinces: function (callback) {
    axios.get(Api.urlGetListProvinces())
      .then(res => {
        var data = res.data.map((province) => {
          return {
            code: province.code,
            name: province.name,
          }
        })
        callback(data);
      })
      .catch(err => {
        console.log('Lỗi gọi api tỉnh thành');
        console.log(err)
      })
  },

  getListDistricts: function (callback, province) {
    axios.get(Api.urlGetListDistricts(province))
      .then(res => {
        var data = res.data.districts.map((district) => {
          return {
            code: district.code,
            name: district.name,
          }
        })
        callback(data);
      })
      .catch(err => {
        console.log('Lỗi gọi api quận huyện');
        console.log(err)
      })
  },

  getListWards: function (callback, district) {
    axios.get(Api.urlGetListWards(district))
      .then(res => {
        var data = res.data.wards.map((ward) => {
          return {
            code: ward.code,
            name: ward.name,
          }
        })
        callback(data);
      })
      .catch(err => {
        console.log('Lỗi gọi api xã');
        console.log(err)
      })
  }
}