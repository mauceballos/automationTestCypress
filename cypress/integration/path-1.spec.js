import { interceptAs, elementIsVisible, fillField, clickElement, forceClickElementByXpath } from "../support/driver";
import { searchLocator, launchesListLocator, paginatorSelector,secondPageSelector } from "./pageobjects/search.page";

describe('Testing API Endpoints Using Cypress', () => {
      beforeEach('Home page and get Rockets List', () => {
            interceptAs('GET', 'https://api.spacexdata.com/v3/rockets', 'rocketsPage')
            cy.visit('/')
            Cypress.on('uncaught:exception', (err, runnable) => {
                  console.warn("Warning about some exception");
                  console.warn(err);
                  return false;
            });
      })

      it('Test intercept Request', () => {
            cy.wait('@rocketsPage').then(({ response }) => {
                  cy.log(response);
                  expect(response.statusCode).to.eq(200);
                  assert.isArray(response.body, 'data is an array');
                  expect(response.body.length).to.be.equal(4);
                  const flight = response.body.map((item) => item.first_flight).every(elem => elem >= '2005');
                  expect(flight).to.be.true;
            })
      })

      it('Search “crs” and Check that 3 pages are being founded', () => {
            elementIsVisible(searchLocator);
            fillField(searchLocator, 'crs');
            cy.get(launchesListLocator).find('h3').then(($) => {
                  const texts = $.map((i, el) => Cypress.$(el).text())
                  const paragraphs = texts.get();
                  expect(paragraphs).to.match(/^CRS/);

            })
            elementIsVisible(paginatorSelector);
            cy.get(paginatorSelector).then(($) => {
                  const numbers = $.map((i, el) => Cypress.$(el).text())
                  expect(numbers.length).to.be.equal(3);
            })
            elementIsVisible(secondPageSelector);
            clickElement(secondPageSelector);
            cy.wait(3000);
            // forceClickElementByXpath('//h3[contains(text(),"CRS-13")]/../..//child::div[2]//following-sibling::*[3]')
      
      })



})
