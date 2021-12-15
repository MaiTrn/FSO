import { gql } from "@apollo/client";

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    title
    author {
      name
    }
    published
    id
    genres
  }
`;
const AUTHOR_DETAILS = gql`
  fragment AuthorDetails on Author {
    name
    born
    bookCount
    id
  }
`;

const ALL_AUTHORS = gql`
  query {
    allAuthors {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;
const BOOKS_BY_GENRE = gql`
  query findBooks($genre: [String!]) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]
  ) {
    addBook(
      title: $title
      author: $author
      published: $published
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`;

const SET_BORN = gql`
  mutation setBornYear($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      ...AuthorDetails
    }
  }
  ${AUTHOR_DETAILS}
`;

const LOGIN = gql`
  mutation loginUser($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      value
    }
  }
`;

const ME = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

export {
  ALL_AUTHORS,
  ALL_BOOKS,
  CREATE_BOOK,
  BOOK_ADDED,
  SET_BORN,
  LOGIN,
  BOOKS_BY_GENRE,
  ME,
};
