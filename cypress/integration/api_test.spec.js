import { should } from "chai";

describe('Testing API Endpoints Using Cypress', () => {

      it('Test GET Request', () => {
            cy.request({
                  method: 'GET',
                  url: 'https://api.spacexdata.com/v3/rockets'
            }).then((res) => {
                  expect(res.status).to.eq(200);
                  assert.isArray(res.body, 'data is an array');
                  expect(res.body.length).to.be.equal(4);
                  const result = res.body.filter((item) => item.name === "crs");
                  const flight = res.body.map((item) => item.first_flight).every(elem => elem >= '2005');
                  expect(flight).to.be.true;
                  cy.log(result);
            })
      })

      //     it('Test POST Request', () => {
      //           cy.request({
      //                method: 'POST',
      //                url: 'http://localhost:3000/api/posts',
      //                body: {
      //                    'id' : 2,
      //                    'title':'Automation'
      //                }
      //           }).then((response) => { 
      //                   expect(response.body).has.property('title','Automation'); 
      //           })
      //     })

      //     it('Test PUT Request', () => {
      //           cy.request({
      //                   method: 'PUT',
      //                   url: 'http://localhost:3000/api/posts/2',
      //                   body: { 
      //                      'id': 2,
      //                      'title' : 'Test Automation'
      //                   }
      //           }).then((response) => { 
      //                   expect(response.body).has.property('title',' Test Automation'); 
      //           })          
      //     })        

      //     it('Test DELETE Request', () => {
      //           cy.request({
      //                     method : 'DELETE',
      //                     url: 'http://localhost:3000/api/post/2'
      //                     }).then((response) => {
      //                       expect(response.body).to.be.empty;
      //           })	
      //     })

})