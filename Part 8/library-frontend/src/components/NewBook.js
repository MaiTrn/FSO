import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_BOOK, ALL_AUTHORS } from "../queries";

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genre, setGenre] = useState("");
  const [genres, setGenres] = useState([]);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    onError: (error) => {
      props.setError(error.graphQLErrors[0].message);
    },
    update: (store, response) => {
      props.updateCacheWith(response.data.addBook);
    },
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    createBook({
      variables: { title, author, published: Number(published), genres },
    });

    setTitle("");
    setPublished("");
    setAuthor("");
    setGenres([]);
    setGenre("");
  };

  const addGenre = () => {
    setGenres(genres.concat(genre));
    setGenre("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <table>
          <tbody>
            <tr>
              <th>title</th>
              <td>
                <input
                  value={title}
                  onChange={({ target }) => setTitle(target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>author</th>
              <td>
                <input
                  value={author}
                  onChange={({ target }) => setAuthor(target.value)}
                />
              </td>
            </tr>
            <tr>
              <th>published</th>
              <td>
                <input
                  type="number"
                  value={published}
                  onChange={({ target }) => setPublished(target.value)}
                />
              </td>
            </tr>
            <tr>
              <td></td>
              <td>
                <input
                  value={genre}
                  onChange={({ target }) => setGenre(target.value)}
                />
              </td>
              <td>
                <button onClick={addGenre} type="button">
                  add genre
                </button>
              </td>
            </tr>
            <tr>
              <th>genres:</th>
              <td> {genres.join(" ")}</td>
            </tr>
            <tr>
              <td></td>
              <td>
                <button type="submit">create book</button>
              </td>
            </tr>
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default NewBook;
