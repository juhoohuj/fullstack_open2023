import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { ALL_AUTHORS } from "./Authors";
import { ALL_BOOKS } from "./Books";

const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author
    }
  }
`;

const NewBook = (props) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [published, setPublished] = useState("");
  const [genres, setGenres] = useState("");
  const [addBook] = useMutation(ADD_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  });

  if (!props.show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    addBook({ variables: { title, author, published: parseInt(published), genres: genres.split(",") } });

    setTitle("");
    setAuthor("");
    setPublished("");
    setGenres("");
  };

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          genres
          <input
            value={genres}
            onChange={({ target }) => setGenres(target.value)}
          />
        </div>
        <button type="submit">add book</button>
      </form>
    </div>
  );
};

export default NewBook;