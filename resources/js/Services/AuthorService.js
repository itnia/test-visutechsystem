import { store } from "../Store/store";

export function createAuthor() {

    if (!store.createAuthor.name) {
        return;
    }

    fetch('api/authors', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(store.createAuthor)
    })
        .then(response => response.json())
        .then(data => {

            data.books = [];

            store.authors.push(data);

            store.createAuthor.name = '';
        })
        .catch(e => {
            console.log(e)
        })
}

export function deleteAuthor(id, index) {

    fetch('api/authors/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            store.authors.splice(index, 1);

            const books = [];

            store.books.map(book => {

                if (book.author_id != id) {
                    books.push(book)
                }
            });

            store.books = books;
        })
        .catch(e => {
            console.log(e)
        })
}

export function updateAuthor(index) {

    fetch('api/authors/' + store.updateAuthor.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(store.updateAuthor)
    })
        .then(response => response.json())
        .then(data => {
            store.authors[index].name = data.name;

            store.books.map(book => {

                if (book.author_id == store.updateAuthor.id) {
                    book.author.name = data.name;
                }
            });
        })
        .catch(e => {
            console.log(e)
        })
}