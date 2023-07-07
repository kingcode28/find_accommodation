export default {

  urlGetListUser: function() {
    return 'https://64a04d95ed3c41bdd7a72f4c.mockapi.io/api/listUser';
  },

  urlGetListProvinces: function() {
    return 'https://provinces.open-api.vn/api/p/';
  },

  urlGetListDistricts: function(province) {
    return `https://provinces.open-api.vn/api/p/${province}?depth=2`
  },

  urlGetListWards: function(district) {
    return `https://provinces.open-api.vn/api/d/${district}?depth=2`
  },
} 
