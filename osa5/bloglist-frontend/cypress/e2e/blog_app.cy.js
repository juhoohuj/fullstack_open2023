describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      username: 'test',
      name: 'Test User',
      password: 'test',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.contains('login')
    cy.contains('username')
    cy.contains('password')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('Logged in as test')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('test')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('https://test.com')
      cy.get('#create-button').click()

      cy.contains('test blog')
    })

    it('A blog can be liked', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('https://test.com')
      cy.get('#create-button').click()

      cy.contains('view').click()
      cy.contains('Like').click()
      cy.contains('1')
    })

    it('A blog can be deleted', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('https://test.com')
      cy.get('#create-button').click()

      cy.contains('view').click()
      cy.contains('Delete').click()
      cy.contains('test blog').should('not.exist')
    })

    it('Blogs are ordered by likes', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('test blog')
      cy.get('#author').type('test author')
      cy.get('#url').type('https://test.com')
      cy.get('#create-button').click()

      cy.contains('Create new blog').click()
      cy.get('#title').type('test blog 2')
      cy.get('#author').type('test author 2')
      cy.get('#url').type('https://test.com')
      cy.get('#create-button').click()

      cy.contains('view').click()
      cy.contains('Like').click()

      cy.contains('view').click({ force: true })
      cy.contains('Like').click()
      cy.contains('Like').click()

      cy.get('.blog').then(blogs => {
        cy.wrap(blogs[0]).contains('test blog 2')
        cy.wrap(blogs[1]).contains('test blog')
      })
    })

  })
})