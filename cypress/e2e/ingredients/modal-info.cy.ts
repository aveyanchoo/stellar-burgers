describe('Модалка ингредиента: отображает данные выбранного ингредиента', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('показывает данные именно кликнутого ингредиента', () => {
    const ingredientName = 'Биокотлета из марсианской Магнолии';
    const ingredientCalories = '4242';
    const ingredientProteins = '420';
    const ingredientFat = '142';
    const ingredientCarbohydrates = '242';

    // клик по конкретной карточке
    cy.contains('[data-cy="ingredient-card"]', ingredientName)
      .find('a')
      .click();

    // проверяем, что модалка открылась
    cy.get('[data-cy="ingredient-details-modal"]').should('be.visible');

    // и что в ней есть данные именно этого ингредиента
    cy.get('[data-cy="ingredient-details-modal"]').within(() => {
      cy.contains(ingredientName);
      cy.contains(ingredientCalories);
      cy.contains(ingredientFat);
      cy.contains(ingredientCarbohydrates);
      cy.contains(ingredientProteins);
    });

    // закрываем
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="ingredient-details-modal"]').should('not.exist');
  });
});
