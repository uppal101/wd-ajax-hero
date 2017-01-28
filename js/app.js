(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();

    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({ delay: 50 }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };

  // ADD YOUR CODE HERE
  let search = document.getElementById('search');
  search.setAttribute('required', 'true');

  let submit = document.querySelector('button');
  submit.addEventListener('click', function(evt){
    evt.preventDefault();
    if (search.value.length === 0) {
      throw new Error ("Please enter a movie title");
    } else {
    fetch(`http://omdbapi.com/?t=${search.value}`)
    .then(function(promiseObj){
      return promiseObj.json();
    })
    .then(function(jsonObj){
      for(let i = movies.length; i >= 0; i--) {
        movies.pop();
      }
      let  movieObj = {
        id: jsonObj.imdbID,
        poster: jsonObj.Poster,
        title:jsonObj.Title,
        year: jsonObj.Year
      }
      movies.push(movieObj);
      console.log(movies);
    })
    renderMovies();
    }
  })


})();
