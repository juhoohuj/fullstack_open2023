import { useQuery, gql } from '@apollo/client';
import { ALL_BOOKS } from './Books';

const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`;

const Recommendations = ({ show }) => {
  const userResult = useQuery(GET_USER);
  const booksResult = useQuery(ALL_BOOKS);

  if (!show) return null;
  if (userResult.loading || booksResult.loading) return <p>Loading...</p>;
  if (userResult.error) return <p>Error: {userResult.error.message}</p>;
  if (booksResult.error) return <p>Error: {booksResult.error.message}</p>;

  const user = userResult.data.me;
  const books = booksResult.data.allBooks;
  
  const recommendedBooks = books.filter(book => 
    book.genres.includes(user.favoriteGenre)
  );

  return (
    <div>
      <h2>recommendations</h2>
      <p>books in your favorite genre <strong>{user.favoriteGenre}</strong></p>

      <table>
        <tbody>
          <tr>
            <th>title</th>
            <th>author</th>
            <th>published</th>
          </tr>
          {recommendedBooks.map(book => (
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

export default Recommendations;