describe('Список ингредиентов: модальное окно выбранной карточки ингредиента', () => {
  beforeEach(() => {
    // Мокаем список ингредиентов
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('открывает модалку ингредиента по клику и закрывает по крестику', () => {
    const ingredientName = 'Биокотлета из марсианской Магнолии';

    // открываем: кликаем по карточке (по текстку внутри Link)
    cy.contains('[data-cy="ingredient-card"]', ingredientName).click();

    // проверяем, что модалка появилась и содержит название ингредиента
    cy.get('[data-cy="ingredient-details-modal"]')
      .should('be.visible')
      .and('contain', ingredientName);

    // закрываем по крестику
    cy.get('[data-cy="modal-close"]').click();

    // проверяерм, что модалка закрылась
    cy.get('[data-cy="ingredient-details-modal"]').should('not.exist');
  });

  it('закрытие модалки по клику на оверлей', () => {
    const ingredientName = 'Биокотлета из марсианской Магнолии';

    cy.contains('[data-cy="ingredient-card"]', ingredientName).click();
    cy.get('[data-cy="ingredient-details-modal"]').should('be.visible');

    // клик по оверлею
    cy.get('[data-cy="modal-overlay"]').click('topLeft', { force: true });
    cy.get('[data-cy="ingredient-details-modal"]').should('not.exist');
  });
});
