import { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { ALL_AUTHORS } from "./Authors";
import { ALL_BOOKS } from "./Books";

const CREATE_BOOK = gql`
  mutation createBook($bookTitle: String!, $bookAuthor: String!, $yearPublished: Int!, $bookGenres: [String!]!) {
    addBook(
      title: $bookTitle,
      author: $bookAuthor,
      published: $yearPublished,
      genres: $bookGenres
    ) {
      title
      author {
        name
        id
      }
      published
      genres
    }
  }
`;

const NewBook = (props) => {
  const [bookTitle, setBookTitle] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [yearPublished, setYearPublished] = useState("");
  const [bookGenres, setBookGenres] = useState("");

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [{ query: ALL_AUTHORS }],
    update: (cache, { data: { addBook } }) => {
      try {
        const unfiltered = cache.readQuery({ 
          query: ALL_BOOKS,
          variables: { genre: null }
        });
        if (unfiltered) {
          cache.writeQuery({
            query: ALL_BOOKS,
            variables: { genre: null },
            data: {
              allBooks: [...unfiltered.allBooks, addBook]
            }
          });
        }
      } catch (error) {
        console.error('Error updating cache:', error);
      }

      addBook.genres.forEach(genre => {
        try {
          const filtered = cache.readQuery({ 
            query: ALL_BOOKS,
            variables: { genre }
          });
          if (filtered) {
            cache.writeQuery({
              query: ALL_BOOKS,
              variables: { genre },
              data: {
                allBooks: [...filtered.allBooks, addBook]
              }
            });
          }
        } catch (error) {
          // Query not in cache yet, ignore
        }
      });
    }
  });

  if (!props.show) {
    return null;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await createBook({ 
        variables: { 
          bookTitle, 
          bookAuthor, 
          yearPublished: parseInt(yearPublished), 
          bookGenres: bookGenres.split(",").map(genre => genre.trim())
        } 
      });

      setBookTitle("");
      setBookAuthor("");
      setYearPublished("");
      setBookGenres("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          title
          <input
            value={bookTitle}
            onChange={({ target }) => setBookTitle(target.value)}
            required
          />
        </div>
        <div>
          author
          <input
            value={bookAuthor}
            onChange={({ target }) => setBookAuthor(target.value)}
            required
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={yearPublished}
            onChange={({ target }) => setYearPublished(target.value)}
            required
          />
        </div>
        <div>
          genres (comma separated)
          <input
            value={bookGenres}
            onChange={({ target }) => setBookGenres(target.value)}
          />
        </div>
        <button type="submit">add book</button>
      </form>
    </div>
  );
};

export default NewBook;