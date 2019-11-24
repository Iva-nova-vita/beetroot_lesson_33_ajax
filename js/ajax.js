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
let page_link = document.getElementsByClassName("page-link");
let current = document.getElementsByClassName("current");
document.body.addEventListener("click", setNumPage);
elemForm.onsubmit = e => {
  e.preventDefault();
  let titleFilm = document.getElementById("titleFilm").value;
  let typeFilm = document.getElementById("typeFilm").value;
  let listFilmPlaceholder = document.getElementById("listFilmPlaceholder");
  listFilmPlaceholder.innerHTML = "";
  let pagination_placeholder = document.getElementById(
    "pagination_placeholder"
  );
  let page = 1;
  let apiUrl = `http://www.omdbapi.com/?s=${titleFilm}&type=${typeFilm}&page=${page}&apikey=a6848e81&`;
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
        listFilmPlaceholder.appendChild(p);
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
        listFilmPlaceholder.appendChild(ol);
        //console.log(listFilm);
        //return listFilm;                               как можно вывести список фильмов?
        $(function() {
          $(pagination_placeholder).pagination({
            items: data.totalResults,
            itemsOnPage: listFilm.length,
            cssStyle: "light-theme"
            //onPageClick:  onPageClick                  не получилось настроить
          });
        });
      }
    });
};
function setNumPage(e) {
  if (e.target.tagName != "A") return;
  page = current[0].innerText;
  console.log(page);
  onPageClick();
}
function onPageClick() {
  let titleFilm = document.getElementById("titleFilm").value;
  let typeFilm = document.getElementById("typeFilm").value;
  let listFilmPlaceholder = document.getElementById("listFilmPlaceholder");
  listFilmPlaceholder.innerHTML = "";
  let apiUrl = `http://www.omdbapi.com/?s=${titleFilm}&type=${typeFilm}&page=${page}&apikey=a6848e81&`;
  fetch(apiUrl)
    .then(response => {
      console.log("RESPONSE:", response);
      return response.json();
    })
    .then(data => {
      console.log(data);
      let ol = document.createElement("ol");
      console.log(data.Search);
      let listFilm = data.Search;
      for (let el in listFilm) {
        console.log(el);
        let li = document.createElement("li");
        let liNum = (page - 1) * 10 + parseInt(el) + 1;
        li.setAttribute("value", `${liNum}`);
        for (let value in listFilm[el]) {
          li.innerText += value + ": " + listFilm[el][value] + "; ";
        }
        ol.appendChild(li);
      }
      listFilmPlaceholder.appendChild(ol);
    });
}



