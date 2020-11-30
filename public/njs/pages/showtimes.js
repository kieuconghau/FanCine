// Colors
const colorWhite = '#fff';
const colorLightgray = '#f1f1f1';
const colorDarkgray = '#a0a3a7';
const colorBlack = '#000';
const colorOrange = '#f26b38';

const parser = new DOMParser();

// HTML Elements
const movieTabBtn = document.getElementById('showtimes-controller-movie');
const theaterTabBtn = document.getElementById('showtimes-controller-theater');
const mainContainer = document.getElementById('showtimes-main');
const moviesCol = document.getElementById('showtimes-col-movie');
const theatersCol = document.getElementById('showtimes-col-theater');
const showtimesCol = document.getElementById('showtimes-col-showtime');
const moviesList = document.querySelector('#showtimes-col-movie .showtimes-row-list');
const theatersList = document.querySelector('#showtimes-col-theater .showtimes-row-list');
const showtimesList = document.querySelector('#showtimes-col-showtime .showtimes-row-list');
const moviesListNoti = moviesList.firstElementChild;
const theatersListNoti = theatersList.firstElementChild;
const showtimesListNotiTheater = showtimesList.firstElementChild;
const showtimesListNotiMovie = showtimesList.lastElementChild;

// Variables
let moviesData;
let theatersData;
let showtimesData;

let movieItems;
let curMovieItemIndex = 0;
let curMovieID = '';

let theaterItems;
let curTheaterItemIndex = 0;
let curTheaterID = '';
let curTheaterMovieID = '';

let curTab = 0; // 0: Movie, 1: Theater

// Spinner
const spinnerModal = document.getElementsByClassName('spinner-modal')[0];

function enableSpinner() {
  spinnerModal.style.display = 'block';
}

function disableSpinner() {
  spinnerModal.style.display = 'none';
}

// Reused functions
function addClickEventToTheaterItems(clickEvent) {
  theaterItems = document.getElementsByClassName('showtimes-row-data-theater');
  for (let i = 0; i < theaterItems.length; ++i) {
    theaterItems[i].addEventListener('click', () => {
      clickEvent(i);
    });
  }

  if (curTab === 0) {
    for (let i = 0; i < theaterItems.length; ++i) {
      theaterItems[i].parentElement.setAttribute('href', '#showtimes-col-showtime');
    }
  } else {
    for (let i = 0; i < theaterItems.length; ++i) {
      theaterItems[i].parentElement.setAttribute('href', '#showtimes-col-movie');
    }
  }
}

function addClickEventToMovieItems(clickEvent) {
  movieItems = document.getElementsByClassName('showtimes-row-data-movie');
  for (let i = 0; i < movieItems.length; ++i) {
    movieItems[i].addEventListener('click', () => {
      clickEvent(i);
    });
  }

  if (curTab === 0) {
    for (let i = 0; i < movieItems.length; ++i) {
      movieItems[i].parentElement.setAttribute('href', '#showtimes-col-theater');
    }
  } else {
    for (let i = 0; i < movieItems.length; ++i) {
      movieItems[i].parentElement.setAttribute('href', '#showtimes-col-showtime');
    }
  }
}

function loadSampleShowtimes(index) {
  enableSpinner();
  fetch('/showtimes/sampleData').then((partial) => {
    partial.text().then((html) => {
      showtimesData = parser.parseFromString(html, 'text/html');
      if (index % 2 === 0) {
        showtimesList.innerHTML = showtimesData.getElementById('showtimes-showtimes-1').innerHTML;
      } else {
        showtimesList.innerHTML = showtimesData.getElementById('showtimes-showtimes-2').innerHTML;
      }
      disableSpinner();
    });
  });
}

// Theater tab
function clickMovieItemAtTheaterTab(newIndex) {
  movieItems[curMovieItemIndex].style.backgroundColor = colorWhite;
  movieItems[newIndex].style.backgroundColor = colorLightgray;
  curMovieItemIndex = newIndex;
  curMovieID = movieItems[newIndex].firstElementChild.innerHTML;

  loadSampleShowtimes(newIndex);
}

function loadMoviesByTheaterID(theaterID) {
  enableSpinner();
  fetch(`/showtimes/allMovies/${theaterID}`).then((partial) => {
    partial.text().then((html) => {
      moviesData = parser.parseFromString(html, 'text/html');

      moviesList.innerHTML = moviesData.getElementById('showtimes-movies').innerHTML;

      showtimesList.innerHTML = '';
      showtimesList.appendChild(showtimesListNotiMovie);

      addClickEventToMovieItems(clickMovieItemAtTheaterTab);
      disableSpinner();
    });
  });
}

function clickTheaterItemAtTheaterTab(newIndex) {
  theaterItems[curTheaterItemIndex].style.backgroundColor = colorWhite;
  theaterItems[newIndex].style.backgroundColor = colorLightgray;
  curTheaterItemIndex = newIndex;
  curTheaterID = theaterItems[newIndex].firstElementChild.innerHTML;

  curMovieItemIndex = 0;
  loadMoviesByTheaterID(curTheaterID);
}

function loadAllTheaters() {
  enableSpinner();
  fetch('/showtimes/allTheaters').then((partial) => {
    partial.text().then((html) => {
      theatersData = parser.parseFromString(html, 'text/html');

      mainContainer.innerHTML = '';
      mainContainer.appendChild(theatersCol);
      mainContainer.appendChild(moviesCol);
      mainContainer.appendChild(showtimesCol);

      theatersList.innerHTML = theatersData.getElementById('showtimes-theaters').innerHTML;

      moviesList.innerHTML = '';
      moviesList.appendChild(moviesListNoti);

      showtimesList.innerHTML = '';
      showtimesList.appendChild(showtimesListNotiMovie);

      addClickEventToTheaterItems(clickTheaterItemAtTheaterTab);
      disableSpinner();
    });
  });
}

theaterTabBtn.addEventListener('click', () => {
  curTab = 1;

  movieTabBtn.style.borderBottomColor = 'transparent';
  movieTabBtn.style.color = colorDarkgray;
  theaterTabBtn.style.borderBottomColor = colorOrange;
  theaterTabBtn.style.color = colorBlack;

  loadAllTheaters();
});

// Movie tab
function loadShowtimesByTheaterMovieID(theaterMovieID) {
  enableSpinner();
  fetch(`/showtimes/allShowtimes/${theaterMovieID}`).then((partial) => {
    partial.text().then((html) => {
      showtimesData = parser.parseFromString(html, 'text/html');
      showtimesList.innerHTML = showtimesData.getElementById('showtimes-showtimes').innerHTML;
      disableSpinner();
    });
  });
}

function clickTheaterItemAtMovieTab(newIndex) {
  theaterItems[curTheaterItemIndex].style.backgroundColor = colorWhite;
  theaterItems[newIndex].style.backgroundColor = colorLightgray;
  curTheaterItemIndex = newIndex;
  curTheaterMovieID = theaterItems[newIndex].firstElementChild.innerHTML;

  loadShowtimesByTheaterMovieID(curTheaterMovieID);
}

function loadTheatersByMovieID(movieID) {
  enableSpinner();
  fetch(`/showtimes/allTheaters/${movieID}`).then((partial) => {
    partial.text().then((html) => {
      theatersData = parser.parseFromString(html, 'text/html');

      theatersList.innerHTML = theatersData.getElementById('showtimes-theaters').innerHTML;

      showtimesList.innerHTML = '';
      showtimesList.appendChild(showtimesListNotiTheater);

      addClickEventToTheaterItems(clickTheaterItemAtMovieTab);
      disableSpinner();
    });
  });
}

function clickMovieItemAtMovieTab(newIndex) {
  movieItems[curMovieItemIndex].style.backgroundColor = colorWhite;
  movieItems[newIndex].style.backgroundColor = colorLightgray;
  curMovieItemIndex = newIndex;
  curMovieID = movieItems[newIndex].firstElementChild.innerHTML;

  curTheaterItemIndex = 0;
  loadTheatersByMovieID(curMovieID);
}

function loadAllMovies() {
  enableSpinner();
  fetch('/showtimes/allMovies').then((partial) => {
    partial.text().then((html) => {
      moviesData = parser.parseFromString(html, 'text/html');

      mainContainer.innerHTML = '';
      mainContainer.appendChild(moviesCol);
      mainContainer.appendChild(theatersCol);
      mainContainer.appendChild(showtimesCol);

      moviesList.innerHTML = moviesData.getElementById('showtimes-movies').innerHTML;

      theatersList.innerHTML = '';
      theatersList.appendChild(theatersListNoti);

      showtimesList.innerHTML = '';
      showtimesList.appendChild(showtimesListNotiTheater);

      addClickEventToMovieItems(clickMovieItemAtMovieTab);
      disableSpinner();
    });
  });
}

movieTabBtn.addEventListener('click', () => {
  curTab = 0;

  theaterTabBtn.style.borderBottomColor = 'transparent';
  theaterTabBtn.style.color = colorDarkgray;
  movieTabBtn.style.borderBottomColor = colorOrange;
  movieTabBtn.style.color = colorBlack;

  loadAllMovies();
});

// Start here
function main() {
  loadAllMovies();
}

main();
