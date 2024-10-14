const mongoose = require('mongoose');
module.exports.connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Connected to DB');
  }
  catch (err){
    console.log("Error Connecting to Mongo")
  }
}