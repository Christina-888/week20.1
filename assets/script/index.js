const button = document.getElementById('btn');

button.addEventListener('click', function() {
  const object = document.getElementById('object').value;
  const objectNumber = document.getElementById('number').value;

  const answerMessage = document.querySelector('.answer');
  const errorMessage = document.querySelector('.err-message');

//Очищаю соообщения:
  answerMessage.textContent = '';
  errorMessage.textContent = '';

//Запрос: 
  fetch(`https://swapi.py4e.com/api/${object}/${objectNumber}/`)
    .then(response => {
      if (!response.ok) {
        return Promise.reject(response.status);
      }
      return response.json();
    })

//Какую инфу будем показывать:
    .then(data => {
      if (object === 'people') {
        answerMessage.textContent = `Имя: ${data.name}, рост: ${data.height}, цвет глаз: ${data.eye_color}`;
      } else if (object === 'planets') {
        answerMessage.textContent = `Название: ${data.name}, климат: ${data.climate}`;
      } else if (object === 'films') {
        answerMessage.textContent = `Название: ${data.title}, режиссёр: ${data.director}, дата выхода: ${data.release_date}`;
      } else {
        answerMessage.textContent = 'Неизвестный объект';
      }
    })

    .catch(error => {
      if (error === 404) {
        errorMessage.textContent = 'Информация не найдена.';
      } else if (error === 500) {
        errorMessage.textContent = 'Сервер недоступен.';
      } else {
        errorMessage.textContent = 'Произошла ошибка: ' + error.message;
      }
    })

    .finally(() => {
      console.log('Запрос завершён.');
    });
});