import { useState } from "react";
import BookView from "./Views/BookView";
import AuthorView from "./Views/AuthorView";

export default function Admin({ }) {
    let [main, setMain] = useState(null);

    return (
        <div className="admin-page">
            <div className="admin-page__aside">
                <ul className="main-nav">
                    <li className="main-nav__item">
                        <a className="main-nav__link" href="#" onClick={() => setMain('books')}>
                            Books
                        </a>
                    </li>
                    <li className="main-nav__item">
                        <a className="main-nav__link" href="#" onClick={() => setMain('authors')}>
                            Authors
                        </a>
                    </li>
                </ul>
            </div>
            <div className="admin-page__main">
                {!main && (
                    <div>
                        AdminPanel
                    </div>
                )}
                {main == 'books' && (
                    <div>
                        <BookView />
                    </div>
                )}
                {main == 'authors' && (
                    <div>
                        <AuthorView />
                    </div>
                )}
            </div>
        </div>
    );
}