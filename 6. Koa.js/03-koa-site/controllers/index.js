const fs = require('fs');
const _path = require('path');
const util = require('util');
const verifyForm = require('../libs/verify');
const psw = require('../libs/password')
const db = require('../models/db')

const rename = util.promisify(fs.rename);
const unlink = util.promisify(fs.unlink);

module.exports.index = async(ctx, next) => {
  ctx.render('pages/index');
}

module.exports.myWorks = async(ctx, next) => {
  const works = db
    .getState()
    .works || []

  ctx.render('pages/my-work', {
    items: works,
    authorised: ctx.session.isAuthorized
  });
}

module.exports.uploadWork = async(ctx, next) => {
  const {projectName, projectUrl, text} = ctx.request.body.fields;
  const {name, size, path} = ctx.request.body.files.file;
  let responseError = verifyForm(projectName, projectUrl, text);
  if (responseError) {
    await unlink(path);
    return ctx.body = responseError;
  }
  if (name === "" || size === 0) {
    await unlink(path);
    return (ctx.body = {
      mes: 'Не загружена картинка проекта',
      status: 'Error'
    });
  }

  let fileName = _path.join(process.cwd(), 'public/upload', name);

  const errUpload = await rename(path, fileName);

  if (errUpload) {
    return (ctx.body = {
      mes: "При загрузке проекта произошла ошибка rename file",
      status: "Error"
    });
  }
  db
    .get("works")
    .push({
      name: projectName,
      link: projectUrl,
      desc: text,
      picture: _path.join('upload', name)
    })
    .write();
  ctx.body = {
    mes: "Проект успешно загружен",
    status: "OK"
  };
}

module.exports.contactMe = async(ctx, next) => {
  ctx.render('pages/contact-me');
}

module.exports.login = async(ctx, next) => {
  ctx.render('pages/login');
}

module.exports.auth = async(ctx, next) => {
  const {login, password} = ctx.request.body;
  const user = db
    .getState()
    .user;
  if (user.login === login && psw.validPassword(password)) {
    ctx.session.isAuthorized = true;
    ctx.body = {
      mes: "Aвторизация успешна!",
      status: "OK"
    };
  } else {
    ctx.body = {
      mes: "Логин и/или пароль введены неверно!",
      status: "Error"
    };
  }
}