describe('Конструктор бургера: добавление ингредиента', () => {
  beforeEach(() => {
    // Мокаем список ингредиентов
    cy.intercept('GET', '**/api/ingredients', {
      fixture: 'ingredients.json'
    }).as('getIngredients');

    cy.visit('/');
    cy.wait('@getIngredients');
  });

  it('добавляет начинку из списка в конструктор по кнопке "Добавить"', () => {
    // убеждаемся, что карточки ингредиентов есть
    cy.get('[data-cy="ingredient-card"]').should('have.length.greaterThan', 0);

    // берём конкретный ингредиент по имени из мока
    const ingredientName = 'Биокотлета из марсианской Магнолии';

    // в карточке этого ингредиента нажимаем "Добавить"
    cy.contains('[data-cy="ingredient-card"]', ingredientName).within(() => {
      cy.get('[data-cy="ingredient-add"]').find('button').click();
    });

    // проверяем, что ингредиент появился в конструкторе
    cy.get('[data-cy="constructor"]').should('contain', ingredientName);
  });
});
