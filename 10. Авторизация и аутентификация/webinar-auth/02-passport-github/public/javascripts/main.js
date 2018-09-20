const status = document.querySelector('.status');
const del = document.querySelector('.del');
const form = document.querySelector('#form');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  let data = {
    username : form.username.value,
    password : form.password.value
  };
  sendData('/submit', data);
});

form.addEventListener('reset', function(e) {
  status.innerHTML =  '';
});

del.addEventListener('click', function(e) {
  e.preventDefault();
  sendData('/del', {});
});

function sendData(url, data) {
  var xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify(data));

  xhr.onreadystatechange = function() {
      if (this.readyState != 4) return;

      if (xhr.status != 200) {
          console.warn( xhr.status + ': ' + xhr.statusText );
      }
      var result = JSON.parse(xhr.responseText);
      status.innerHTML =  result.status;
  }
}