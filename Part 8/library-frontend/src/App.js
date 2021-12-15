import React, { useState, useEffect } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import Notification from "./components/Notification";
import LoginForm from "./components/LoginForm";
import { useLazyQuery, useApolloClient, useSubscription } from "@apollo/client";
import storage from "./utils/storage";
import { ME, BOOK_ADDED, ALL_BOOKS } from "./queries";
import Recommendation from "./components/Recommendation";

const App = () => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("authors");
  const [errorMessage, setErrorMessage] = useState(null);
  const client = useApolloClient();
  const [fetchUser, result] = useLazyQuery(ME);

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) =>
      set.map((b) => b.id).includes(object.id);

    const dataInStore = client.readQuery({ query: ALL_BOOKS });
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook) },
      });
    }
  };

  useEffect(() => {
    setToken(storage.loadUser());
  }, []);

  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  useEffect(() => {
    if (result.data) {
      setUser(result.data.me);
    }
  }, [result]);

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded;
      window.alert(`${addedBook.title} by ${addedBook.author.name} added`);
      updateCacheWith(addedBook);
    },
  });

  const notify = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 5000);
  };

  const logout = () => {
    setToken(null);
    storage.logoutUser();
    client.resetStore();
    setPage("login");
  };

  return (
    <div>
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {token === null ? (
          <button onClick={() => setPage("login")}>login</button>
        ) : (
          <>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={() => setPage("recommendation")}>
              recommendation
            </button>
            <button onClick={logout}>log out</button>
          </>
        )}
      </div>
      <Notification errorMessage={errorMessage} />
      <Authors show={page === "authors"} setError={notify} />
      <Books show={page === "books"} />

      <LoginForm
        show={page === "login"}
        setError={notify}
        setToken={setToken}
        setPage={setPage}
      />
      {user && (
        <Recommendation
          show={page === "recommendation"}
          favGenre={user.favoriteGenre}
        />
      )}
      <NewBook
        show={page === "add"}
        setError={notify}
        updateCacheWith={updateCacheWith}
      />
    </div>
  );
};

export default App;
