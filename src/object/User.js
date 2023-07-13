
function User(id = 0, name, phone, ward, district, province, numHouse, note) {
  this.id = id;
  this.name = name;
  this.phone = phone;
  this.ward = ward;
  this.district = district;
  this.province =province;
  this.numHouse = numHouse;
  this.note = note;
}

export default User