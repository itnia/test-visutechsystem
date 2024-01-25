import { store } from "../../../Store/store";
import { useSnapshot } from "valtio";
import { useState } from "react";
import { createAuthor, deleteAuthor, updateAuthor } from "../../../Services/AuthorService";

export default function AuthorView() {
    const stateStore = useSnapshot(store);
    const [stateUpdate, setStateUpdate] = useState(false);
    const [indexUpdate, setIndexUpdate] = useState(false);

    const modalUpdateAuthor = (author, index) => {
        setIndexUpdate(index);
        store.updateAuthor.id = author.id;
        store.updateAuthor.name = author.name;
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
                            store.createAuthor.name = e.target.value;
                        }}
                        value={stateStore.createAuthor.name}
                    />
                </span>
                <button onClick={() => createAuthor()}>CreateAuthor</button>
            </div>
            <hr />
            {stateUpdate && (
                <div style={{
                    display: 'flex',
                    gap: '1rem'
                }}>
                    <span>
                        Name: <input type="text" onChange={(e) => {
                            store.updateAuthor.name = e.target.value;
                        }} value={stateStore.updateAuthor.name} />
                    </span>
                    <button onClick={() => { updateAuthor(indexUpdate); setStateUpdate(false); }}>UpdateAuthor</button>
                </div>
            )}
            <hr />
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>ColBook</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>

                    {stateStore.authors && stateStore.authors.map((author, index) => (
                        <tr key={author.id}>
                            <td>
                                {author.name}
                            </td>
                            <td>
                                {author.books.length}
                            </td>
                            <td>
                                <button onClick={() => deleteAuthor(author.id, index)}>delete</button>
                                <button onClick={() => modalUpdateAuthor(author, index)}>update</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}