import { store } from "../Store/store";

export function bootstrap() {

    fetch('api/books')
        .then(response => response.json())
        .then(data => {
            store.books = data
        })
        .catch(e => {
            console.log(e)
        })

    fetch('api/authors')
        .then(response => response.json())
        .then(data => {
            store.authors = data
        })
        .catch(e => {
            console.log(e)
        })
}