
export const movieListView = (id, movieArray) => {

    const template = Handlebars.compile(`
      <table>
      <tr>
      <th>Code</th>
      <th>Title</th>
      <th>Offering</th>
      <th>Enrolments</th>
          {{#each movies}}
              <tr>
                  <td class="movie-code" data-code={{attributes.code}}> {{attributes.code}} </td>
                  <td> {{attributes.title}} </td>
                  <td> {{attributes.offering}} </td>
                  <td> {{attributes.enrolments}} </td>
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
    <h1>Unit: {{movie.attributes.title}}</h1>
    <table>
    <tr>
    <th>Code</th>
    <th>Offering</th>
    <th>Enrolments</th>
    <tr>
        <td> {{movie.attributes.code}} </td>
        <td> {{movie.attributes.offering}} </td>
        <td> {{movie.attributes.enrolments}} </td>
    </tr>
    `)
    const target = document.getElementById(id)
    target.innerHTML=template({movie:movie})
}