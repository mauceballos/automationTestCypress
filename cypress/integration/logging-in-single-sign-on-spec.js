
describe('example to do loggin the app', () => {
    beforeEach(() => {
        cy.visit('/');
    })
    it('login with incorrect password', () => {
        cy.login('admin', 'admin333');
        cy.fixture('loginWazuhManager').then((login)=>{
            cy.get(login.incorrectLoginBanner)
            .should('have.text','Invalid username or password, please try again')
        })
    })
    it('login success', () => {
        cy.login('admin', 'admin');
        cy.fixture('loginWazuhManager').then((login)=>{
            cy.get(login.dashboardModal)
            .should('be.visible')
        })
    })
})
