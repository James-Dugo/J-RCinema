
export const movieListView = (id, movieArray) => {

    const template = Handlebars.compile(`
      <table>
      <tr>
      <th>Title</th>
      <th>Watched</th>
      <th>Rating</th>
      <th>Poster</th>
          {{#each movies}}
              <tr>
                  <td> <a href="#!/movies/{{id}}"> {{attributes.title}}</a> </td>
                  <td> {{attributes.watched}} </td>
                  <td> {{attributes.rating}} </td>
                  <td> <img src="http://localhost:1337{{attributes.poster.data.attributes.formats.thumbnail.url}}"></td>
              </tr>
          {{/each}}
      </table>
      <button id="action1">S1 Units</button>
      <button id="action2">S2 Units</button>
      <button id="action3">All Units</button>
      <button id="action4">Sorted Units</button>
    `)

    const target = document.getElementById(id)
    target.innerHTML = template({movies: movieArray})
}

export const homeView = (id,movieArray) => {
    const template = Handlebars.compile(`
    <h1>Unit Web App</h1>
    
    <p>This web app shows a list of movies fetched from a backend database. 
    Here you will display all movie codes as hyperlinks.</p>
    <div class="movie-displays">
    <ul>
        {{#each movies}}
            <a href="#!/movies/{{id}}">{{attributes.code}}</a>
        {{/each}}
    </ul>
    </div>
    `)
    const target = document.getElementById(id)
    target.innerHTML = template({movies:movieArray})
    
}

export const movieView = (id,movie) => {
    const template = Handlebars.compile (`
    <h1>{{movie.attributes.title}}</h1>
    <img src="http://localhost:1337{{movie.attributes.poster.data.attributes.formats.medium.url}}">
    <table>
    <tr>
    <th>Genres</th>
    <th>Watched</th>
    <th>Rating</th>
    <th>Movie Length</th>
    <tr>
        <td> {{movie.attributes.genres}} </td>
        <td> {{movie.attributes.watched}} </td>
        <td> {{movie.attributes.rating}} </td>
        <td> {{movie.attributes.movieLength}} </td>
    </tr>
    </table>
    `)
    const target = document.getElementById(id)
    target.innerHTML=template({movie:movie})
}