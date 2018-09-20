module.exports = (res, data) => {
  res.cookie('logintoken', JSON.stringify(data), {
    //TODO change maxAge
    expires: new Date(Date.now() + 2 * 604800000),
    path: '/'
  });
}