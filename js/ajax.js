/*Реализовать веб-страницу для поиска фильмов. При открытии страницы пользователю доступна только форма для ввода названия фильма
 (или части названия) и выбора типа (movie, series, episode).
После того, как пользователь ввел данные и нажал на кнопку Search, необходимо отправить соответствующий запрос к API ресурса 
OMDB (http://www.omdbapi.com/) с помощью AJAX.
Если в качестве ответа на запрос вы получили список фильмов, то его необходимо отобразить под формой поиска. 
Если по заданным критериям не будут найдены фильмы, то отобразите сообщение Movie not found!.
Учтите, что OMDB по умолчанию возвращает только первые 10 фильмов. Поэтому необходимо реализовать 
пагинацию для тех случаев, когда под критерии поиска подходит больше, чем 10 фильмов. Пагинация – это порядковая нумерация страниц,
 которая обычно находится вверху или внизу страниц сайта. Вероятно, вы видели в интернет-магазинах на страницах с товарами кнопки
  с цифрами 1, 2, 3 и т. д., при нажатии на которые отбражается другой блок товаров. Вот такие кнопки и называют пагинацией. 
  Таким образом, при первом поиске необходимо выводить первые 10 фильмов и кнопки для перехода по страницам. При клике на 
  такую кнопку необходимо отправить запрос с указанием в параметрах требуемой страницы, и полученный результат вывести на 
  место текущего списка фильмов.
Возле каждого фильма должна быть кнопка Details, при нажатии на которую будет выводиться подробная информация о фильме. 
Эту информацию необходимо выводить на этой же странице сразу под списком найденных фильмов и пагинацией.
Все запросы необходимо отправлять, используя AJAX. То есть при нажатии на любые кнопки ваша веб-страница не должна обновляться.
Ссылка на API OMDB: http://www.omdbapi.com/ (необходимо зарегистри роваться для получения API KEY).*/
let elemForm = document.getElementById("elemForm");
elemForm.onsubmit = e => {
  e.preventDefault();
  let titleFilm = document.getElementById("titleFilm").value;
  let typeFilm = document.getElementById("typeFilm").value;
  let apiUrl = `http://www.omdbapi.com/?s=${titleFilm}&type=${typeFilm}&apikey=a6848e81&`;
  fetch(apiUrl)
    .then(response => {
      console.log("RESPONSE:", response);
      return response.json();
    })
    .then(data => {
      console.log(data);
      if (data.Response == "False") {
        let p = document.createElement("p");
        p.innerText = "Movie not found!";
        document.body.appendChild(p);
      } else {
        let ol = document.createElement("ol");
        console.log(data.Search);
        let listFilm = data.Search;
        for (let el in listFilm) {
          let li = document.createElement("li");
          for (let value in listFilm[el]) {
            li.innerText += value + ": " + listFilm[el][value] + "; ";
          }
          ol.appendChild(li);
        }
        document.body.appendChild(ol);
      }
    });
};
let pagination_placeholder= document.getElementById("pagination_placeholder");
$(function() {
  $(pagination_placeholder).pagination({
      items: 100,
      itemsOnPage: 5,
      cssStyle: 'light-theme'
  });
});
