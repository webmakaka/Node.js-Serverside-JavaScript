const fs = require('fs');
const Sequelize = require('sequelize');
const sequelize = new Sequelize('test', 'postgres', '', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});

sequelize.sync();
sequelize
  .authenticate()
  .then(() => {
    console.log('Соединение установлено');
  })
  .catch(err => {
    console.error('Ошибка соединения');
  })

  const modelNames = ['Teacher', 'Group', 'Student'];
for (const modelName of modelNames) {
  sequelize.import (`./models/${modelName}.js`);
};

for (const modelName of Object.keys(sequelize.models)) {
  if ('associate' in sequelize.models[modelName]) {
    sequelize
      .models[modelName]
      .associate(sequelize.models);
  };
};

async function updateGroup(id) {
  const data = await sequelize
    .models
    .group
    .find({
      where: {
        id: id
      }
    });

  // const data = await sequelize   .models   .group   .findAll();
  let params = {
    name: 'Группа закрыта'
  };
  await data.update(params)
  // await data.destroy()
  fs.writeFileSync('test.json', JSON.stringify(data));

};

updateGroup(2);