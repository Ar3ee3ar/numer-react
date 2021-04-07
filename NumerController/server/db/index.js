const  mongoose  = require("mongoose");

const  mongoAtlasUri =
        "mongodb+srv://root:arzeezar123@cluster0.4iyye.mongodb.net/exam-numer?retryWrites=true&w=majority";

try {
    // Connect to the MongoDB cluster
     mongoose.connect(
      mongoAtlasUri,
      { useNewUrlParser: true, useUnifiedTopology: true },
      () => console.log(" Mongoose is connected")
    );

  } catch (e) {
    console.log("could not connect");
  }
const db = mongoose.connection

module.exports = db