export default function Welcome({ authors }) {

    return (
        <>
            <h3>Список авторов и их книг</h3>
            <ul>
                {authors && authors.map(author => (
                    <li key={author.id}>
                        <div>{author.name}</div>
                        <ul>
                            {author.books && author.books.map(book => (
                                <li key={book.id}>
                                    <div>{book.name}</div>
                                </li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </>
    )
}