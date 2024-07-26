const mongoose = require('mongoose');
const config = require('./config');

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
    console.log('Conectado ao MongoDB...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Finaliza se houve erro
  }
};

module.exports = connectDB;
