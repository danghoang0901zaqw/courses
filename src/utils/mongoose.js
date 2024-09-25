function multipleMongooseToObject(mongooses) {
  return mongooses.map((mongoose) => mongoose.toObject());
}
function mongooseToObject(mongoose) {
  return mongoose.toObject();
}
module.exports = {
  multipleMongooseToObject,
  mongooseToObject,
};
