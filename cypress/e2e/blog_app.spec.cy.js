describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Superuser',
      username: 'root',
      password: 'sekret'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.contains('Superuser logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('secret')
      cy.get('#login-button').click()

      cy.contains('wrong username or password')
      cy.get('.notification').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'root', password: 'sekret' })
    })

    it('A blog can be created', function() {
      cy.createNew({
        title: 'a new blog title',
        author: 'some author',
        url: 'http://someurl.com'
      })

      cy.get('.blogItem').contains('a new blog title some author')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createNew({
          title: '1st blog title',
          author: '1st author',
          url: 'http://someurl.com'
        })
        cy.createNew({
          title: '2nd blog title',
          author: '2nd author',
          url: 'http://someurl.com'
        })
        cy.createNew({
          title: '3rd blog title',
          author: '3rd author',
          url: 'http://someurl.com'
        })
      })

      it.only('users can like a blog', function () {
        cy.get('.blogItem').contains('2nd blog title').contains('view').click()
          .get('#like').click()

        cy.get('.blogItem').contains('2nd blog title').get('#likes').contains('1')
      })

    })
  })
})