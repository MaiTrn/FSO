import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ALL_BOOKS } from "../queries";

const Books = (props) => {
  const [genres, setGenres] = useState([]);
  const [selectedGenreIndex, setSelectedGenreIndex] = useState(
    genres.length - 1
  );

  const result = useQuery(ALL_BOOKS);

  useEffect(() => {
    if (result.data) {
      const allGenres = new Set();
      result.data.allBooks.map((book) =>
        book.genres?.map((genre) => allGenres.add(genre))
      );
      allGenres.add("no genre");
      allGenres.add("all genres");
      setGenres(Array.from(allGenres));
      setSelectedGenreIndex(allGenres.size - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result.data]);

  if (!props.show) {
    return null;
  }
  if (result.loading) {
    return <div>loading...</div>;
  }

  const books = result.data.allBooks;

  return (
    <div>
      <h2>books</h2>
      {genres[selectedGenreIndex] === "all genres" ||
      genres[selectedGenreIndex] === "no genre" ? (
        <p>{genres[selectedGenreIndex]}</p>
      ) : (
        <p>
          in genre <strong>{genres[selectedGenreIndex]}</strong>
        </p>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>

          {books.map((b) =>
            b.genres.includes(genres[selectedGenreIndex]) ||
            genres[selectedGenreIndex] === "all genres" ||
            (genres[selectedGenreIndex] === "no genre" &&
              b.genres.length === 0) ? (
              <tr key={b.title}>
                <td>{b.title}</td>
                <td>{b.author.name}</td>
                <td>{b.published}</td>
              </tr>
            ) : null
          )}
        </tbody>
      </table>
      {genres.map((g, i) => (
        <button
          style={{ margin: "2px" }}
          key={g}
          onClick={() => setSelectedGenreIndex(i)}
        >
          {g}
        </button>
      ))}
    </div>
  );
};

export default Books;
