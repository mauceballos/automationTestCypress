
describe('example to do app', () => {
    beforeEach(() => {
        cy.visit('/', { timeout: 240000 });
    })
    it('login success', () => {
        cy.login('admin', 'admin');
    })
    it('login failed', () => {
        cy.login('admin', 'admins');
    })
})
