const mongoose = require('mongoose');
const  Schema = mongoose.Schema;
const bCrypt = require('bcryptjs');

const  UserSchema = new Schema({
    login: {
      type: String,
      required: [true, 'Укажите логин']
    },
    hash: String
  });

  UserSchema.methods.setPassword = function (password) {
    this.hash = bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
  };
  
  UserSchema.methods.validPassword = function (password) {
    return bCrypt.compareSync(password, this.hash);
  };

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('login', UserSchema);