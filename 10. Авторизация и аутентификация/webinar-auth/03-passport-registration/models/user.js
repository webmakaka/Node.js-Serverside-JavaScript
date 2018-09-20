const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  UserSchema = new Schema({
    login: {
      type: String,
      required: [true, 'Укажите логин']
    },
    password: {
      type: String,
      required: [true, 'Укажите пароль']
    },
    email: {
      type: String
    },
    name: {
      type: String,
      set: i => (i == '' ? 'Anonim' : i)
    }
  });

//просим mongoose сохранить модель для ее дальнейшего использования
mongoose.model('user', UserSchema);