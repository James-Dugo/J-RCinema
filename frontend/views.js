const url="http://localhost:1337"

export const addNewMovieView = (id) => {
    const template = Handlebars.compile(`
    <form action="/test" method="post">
        <ul>
            <li>
                <label for="name">Name:</label>
                <input type="text" id="name" name="user_name">
            </li>
            <li>
                <label for="mail">E-mail:</label>
                <input type="email" id="mail" name="user_email">
            </li>
            <li>
                <label for="msg">Message:</label>
                <textarea id="msg" name="user_message"></textarea>
            </li>
            <li class="button">
                <button type="submit">Send your message</button>
            </li>
        </ul>
    </form>
    <button>Click Me!</button>
    `)
    const target = document.getElementById(id)
    target.innerHTML = template()
}

export const movieListView = (id, movieArray) => {

    const template = Handlebars.compile(`
    <button id="action1">Button 1</button>
    <button id="action2">Button 2</button>
    <button id="action3">Button 3</button>
    <button id="action4">Button 4</button>
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
            <td> <img src="http://localhost:1337{{attributes.poster.data.attributes.formats.small.url}}" width="110" height="155.99"></td>
        </tr>
        {{/each}}
    </table>
    `)

    const target = document.getElementById(id)
    target.innerHTML = template({movies: movieArray})
}

export const homeView = (id,movieArray) => {
    console.log(movieArray)
    const template = Handlebars.compile(`
    <h1>Unit Web App</h1>

    <p>This web app shows a list of movies fetched from a backend database.
    Here you will display all movie codes as hyperlinks.</p>
    <div class="movie-displays">
    <ul>
        {{#each movies}}
            <li><a href="#!/movies/{{id}}"><img src="http://localhost:1337{{attributes.poster.data.attributes.formats.small.url}}"></a></li>
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
    <img src="{{url}}{{movie.attributes.poster.data.attributes.formats.small.url}}">
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
    target.innerHTML=template({movie:movie,url:url})
}