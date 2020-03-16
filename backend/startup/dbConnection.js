const mongoose = require("mongoose");

module.exports = () => {

  mongoose.connect(`mongodb+srv://${process.env.MONGO_CONN}.mongodb.net/test?retryWrites=true&w=majority`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true
    }
  );

  mongoose.connection
    .on('connected', () => console.log("Connected to MongoDB.") )
    .on('error', err => console.log(`A moongose connection error has occured ${err}`) )
    .on('disconnected', () => console.log("Mongoose is now disconnected") );
}
