describe('Конструктор бургера: процесс создания заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.intercept('GET', '**/api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');

    cy.intercept('POST', '**/api/orders', {
      statusCode: 200,
      body: {
        success: true,
        order: {
          _id: 'test-order-id',
          status: 'done',
          name: 'test order',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          number: 12345,
          ingredients: []
        }
      }
    }).as('createOrder');
    cy.setCookie('accessToken', 'test-access-token');

    cy.visit('/', {
      onBeforeLoad(win) {
        win.localStorage.setItem('refreshToken', 'test-refresh-token');
      }
    });

    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('процесс создания заказа', () => {
    cy.get('[data-cy="ingredient-card"]').should('have.length.greaterThan', 0);

    const bunName = 'Краторная булка N-200i';

    cy.contains('[data-cy="ingredient-card"]', bunName).within(() => {
      cy.get('[data-cy="ingredient-add"]').find('button').click();
    });

    cy.get('[data-cy="constructor"]').as('constructor');
    cy.get('@constructor').should('contain', bunName);

    const ingredientName = 'Биокотлета из марсианской Магнолии';

    cy.contains('[data-cy="ingredient-card"]', ingredientName).within(() => {
      cy.get('[data-cy="ingredient-add"]').find('button').click();
    });

    cy.get('@constructor').should('contain', ingredientName);

    cy.get('[data-cy="create-order"]').find('button').click();
    cy.wait('@createOrder');

    cy.get('[data-cy="order-modal"]').as('order-modal');

    cy.get('@order-modal').should('be.visible');
    cy.get('@order-modal')
      .find('[data-cy="order-number"]')
      .should('have.text', '12345');

    cy.get('[data-cy="modal-close"]').click();
    cy.get('@order-modal').should('not.exist');

    cy.get('@constructor').should('contain', 'Выберите булки');
    cy.get('@constructor').should('contain', 'Выберите начинку');
  });
});
