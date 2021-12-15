import React, { useState, useEffect } from "react";
import { useLazyQuery } from "@apollo/client";
import { BOOKS_BY_GENRE } from "../queries";

const Recommendation = (props) => {
  const [findFavoriteBooks, result] = useLazyQuery(BOOKS_BY_GENRE);
  const [books, setBooks] = useState([]);
  useEffect(
    () => {
      if (props.favGenre !== "") {
        findFavoriteBooks({ variables: { genre: props.favGenre } });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    if (result.data) {
      setBooks(result.data.allBooks);
    }
  }, [result]);

  if (!props.show) {
    return null;
  }

  return (
    <div>
      <h2>recommendations</h2>
      <p>
        books in your favorite genre <strong>{props.favGenre}</strong>
      </p>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.title}>
              <td>{b.title}</td>
              <td>{b.author.name}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Recommendation;
