const mongoose = require('mongoose');
module.exports.connect = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/28tech_backend');
    console.log('Connected to DB');
  }
  catch (err){
    console.log("Error Connecting to Mongo")
  }
}