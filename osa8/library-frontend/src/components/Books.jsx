import { useState } from 'react';
import { useQuery, gql } from "@apollo/client";

export const ALL_BOOKS = gql`
  query allBooks($genre: String) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`;

const Books = (props) => {
  const [selectedGenre, setSelectedGenre] = useState('all');
  
  const { loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre: selectedGenre === 'all' ? null : selectedGenre }
  });

  if (!props.show) return null;
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const books = data.allBooks;
  const genres = ['all', ...new Set(books.flatMap(b => b.genres))];

  return (
    <div>
      <h2>books</h2>

      <div>
        {genres.map(genre => (
          <button 
            key={genre}
            onClick={() => setSelectedGenre(genre)}
            style={{ margin: '0 5px' }}
          >
            {genre}
          </button>
        ))}
      </div>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((book) => (
            <tr key={book.title}>
              <td>{book.title}</td>
              <td>{book.author.name}</td>
              <td>{book.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Books;