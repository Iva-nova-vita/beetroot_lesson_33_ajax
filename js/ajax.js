//const API_URL="http://www.omdbapi.com/?apikey=a6848e81&" ;
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
      document.write("<pre>" + JSON.stringify(data, null, 2) + "</pre>");
    });
};
