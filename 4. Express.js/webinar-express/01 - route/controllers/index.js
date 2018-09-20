module.exports.getIndex = function (req, res) {
  res.render('pages/index', { title: 'Main' });
}

module.exports.sendData = function (req, res) {
  res.json({ title: 'Main' });
}