import { useState, useEffect } from 'react'
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendations from './components/Recommendations'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('library-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    setPage('authors')
  }

  return (
    <ApolloProvider client={client}>
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          {token ? (
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
              <button onClick={logout}>logout</button>
            </>
          ) : (
            <button onClick={() => setPage('login')}>login</button>
          )}
        </div>

        <Authors show={page === 'authors'} token={token} />
        <Books show={page === 'books'} />
        <NewBook show={page === 'add'} />
        <Login show={page === 'login'} setToken={setToken} />
        <Recommendations show={page === 'recommend'} />
      </div>
    </ApolloProvider>
  );
}

export default App