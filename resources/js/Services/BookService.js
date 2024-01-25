import { store } from "../Store/store";

export function createBook() {

    if (!(store.createBook.name && store.createBook.author_id)) {
        return;
    }

    fetch('api/books', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(store.createBook)
    })
        .then(response => response.json())
        .then(data => {
            let author = store.authors.find(o => o.id == data.author_id);
            data.author = author;

            store.books.push(data);

            store.createBook.name = '';
            store.createBook.author_id = '';
        })
        .catch(e => {
            console.log(e)
        })

}

export function deleteBook(id, index) {

    fetch('api/books/' + id, {
        method: 'DELETE'
    })
        .then(response => response.json())
        .then(data => {
            store.books.splice(index, 1);
        })
        .catch(e => {
            console.log(e)
        })

}

export function updateBook(index) {

    fetch('api/books/' + store.updateBook.id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(store.updateBook)
    })
        .then(response => response.json())
        .then(data => {
            store.books[index].name = data.name;
            store.books[index].author_id = data.author_id;
        })
        .catch(e => {
            console.log(e)
        })

}