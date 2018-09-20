const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const  loginToken = new Schema({
    login: {
      type: String
    },
    series: {
      type: String
    },
    token: {
      type: String
    }
  });

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('loginToken', loginToken);