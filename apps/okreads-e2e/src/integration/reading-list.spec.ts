describe('When: I use the reading list feature', () => {
  beforeEach(() => {
    cy.startAt('/');
  });

  it('Then: I should see my reading list', () => {
    cy.get('[data-testing="toggle-reading-list"]').click();

    cy.get('[data-testing="reading-list-container"]').should(
      'contain.text',
      'My Reading List'
    );
  });

  it('Then: I should able to add Book to reading list and Undo', () => {
    cy.get('input[type="search"]').type('java');
    cy.get('form').submit();
    cy.get('[data-testing="want-to-read"]').first().click();
    cy.get('[data-testing="want-to-read"]').first().should('be.disabled');
    cy.get('[data-testing="toggle-reading-list"').click();
    cy.get('[data-testing="reading-list-container"]').should(
      'have.length',
      '1'
    );
    cy.wait(300);
    cy.contains('button', 'Undo').click();
    cy.get('[data-testing="want-to-read"]').first().should('be.enabled');
    cy.get('[data-testing="reading-list"]').should('not.exist');
  });

  it('Then: I should able remove book from reading list and undo', () => {
    cy.get('input[type="search"]').type('javascript');
    cy.get('form').submit();
    cy.get('[data-testing="want-to-read"]').last().click();
    cy.get('[data-testing="want-to-read"]').last().should('be.disabled');
    cy.get('[data-testing="toggle-reading-list"]').click();
    cy.get('[data-testing="remove-book-from-list"]').last().click();
    cy.wait(300);
    cy.contains('button', 'Undo').click();
    cy.get('[data-testing="want-to-read"]').last().should('be.disabled');
  });
});