import { store } from "../../../Store/store";
import { useSnapshot } from "valtio";
import { useState } from "react";
import { createBook, deleteBook, updateBook } from "../../../Services/BookService";

export default function BookView() {
    const stateStore = useSnapshot(store);
    const [stateUpdate, setStateUpdate] = useState(false);
    const [indexUpdate, setIndexUpdate] = useState(false);

    const modalUpdateBook = (book, index) => {
        setIndexUpdate(index);
        store.updateBook.id = book.id;
        store.updateBook.name = book.name;
        store.updateBook.author_id = book.author_id;
        setStateUpdate(true);
    }

    return (
        <div>
            <div>Books</div>
            <hr />
            <div style={{
                display: 'flex',
                gap: '1rem'
            }}>
                <span>
                    Name: <input
                        type="text"
                        onChange={(e) => {
                            store.createBook.name = e.target.value;
                        }}
                        value={stateStore.createBook.name}
                    />
                </span>
                <span>
                    Author: <select
                        onChange={(e) => {
                            store.createBook.author_id = e.target.value;
                        }}
                        value={stateStore.createBook.author_id}
                    >
                        <option></option>
                        {stateStore.authors && stateStore.authors.map(author => (
                            <option key={author.id} value={author.id}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                </span>
                <button onClick={() => createBook()}>CreateBook</button>
            </div>
            <hr />
            {stateUpdate && (
                <div style={{
                    display: 'flex',
                    gap: '1rem'
                }}>
                    <span>
                        Name: <input type="text" onChange={(e) => {
                            store.updateBook.name = e.target.value;
                        }} value={stateStore.updateBook.name} />
                    </span>
                    <span>
                        Author: <select onChange={(e) => {
                            store.updateBook.author_id = e.target.value;
                        }} value={stateStore.updateBook.author_id}>
                            {stateStore.authors && stateStore.authors.map(author => (
                                <option key={author.id} value={author.id}>
                                    {author.name}
                                </option>
                            ))}
                        </select>
                    </span>
                    <button onClick={() => { updateBook(indexUpdate); setStateUpdate(false); }}>UpdateBook</button>
                </div>
            )}
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Author</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {stateStore.books && stateStore.books.map((book, index) => (
                        <tr key={book.id}>
                            <td>
                                {book.name}
                            </td>
                            <td>
                                {book.author.name}
                            </td>
                            <td>
                                <button onClick={() => deleteBook(book.id, index)}>delete</button>
                                <button onClick={() => modalUpdateBook(book, index)}>update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}