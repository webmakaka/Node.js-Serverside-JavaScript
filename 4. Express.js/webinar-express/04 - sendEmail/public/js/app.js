function prepareSendMail(e) {
  e.preventDefault();
  const data = {
    name: formMail.name.value,
    email: formMail.email.value,
    text: formMail.text.value
  };

  let resultContainer = formMail.querySelector('.status');
  resultContainer.innerHTML = 'Sending...';
  sendJson('/', data, 'POST', (data) => {
    formMail.reset();
    resultContainer.innerHTML = data.msg;
  });
}

function sendJson (url, data, method, cb) {
  let xhr = new XMLHttpRequest();
  xhr.open(method, url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function (e) {
    let result;
    try {
      result = JSON.parse(xhr.responseText);
    } catch (e) {
      cb({msg: 'Извините в данных ошибка', status: 'Error'});
    }
    cb(result);
  };
  xhr.send(JSON.stringify(data));
}

const formMail = document.querySelector('#mail');
formMail.addEventListener('submit', prepareSendMail);