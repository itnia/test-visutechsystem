import { proxy } from "valtio";

export const store = proxy({
    books: [],
    authors: [],
    createBook: {
        name: '',
        author_id: ''
    },
    updateBook: {},
    createAuthor: {
        name: ''
    },
    updateAuthor: {},
});