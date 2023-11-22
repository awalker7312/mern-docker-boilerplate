const mongoose = require('mongoose')

// connect to mongodb
const connectToDB = async () => {
  try {
    // mongodb connection string
    const con = await mongoose.connect(process.env.MONGO_URI);
    console.log(`mongoDB connected: ${con.connection.host}`);
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};
connectToDB();
