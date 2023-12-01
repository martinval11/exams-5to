/*
  IMPORTANT: You need to ensure that there are no exams in the homepage and dashboard, for prevent conflicts with data.
*/

describe('E2E', () => {
  Cypress.config('defaultCommandTimeout', 15000);

  it('should render home', () => {
    cy.visit('http://localhost:3000');

    cy.contains('Exámenes Pendientes');
  });

  it('should render login, put credentials and do CRUD Actions on Dashboard', () => {
    const username = Cypress.env('LOGIN_USERNAME') || '';
    const password = Cypress.env('LOGIN_PASSWORD') || '';
    cy.visit('http://localhost:3000/login');

    cy.contains('Iniciar Sesión');

    cy.get('[data-cy="username"]').type(username);
    cy.get('[data-cy="password"]').type(password);
    cy.get('[data-cy="submit"]').click();

    cy.url().should('eq', 'http://localhost:3000/dashboard');

    // CRUD Actions
    cy.get('[data-cy="addExamButton"]').click();

    const randomExamTitle = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

    cy.get('[data-cy="examTitle"]').type(randomExamTitle);
    cy.get('[data-cy="examAssignatures"]').type('Matemáticas');
    cy.get('[data-cy="examDate"]').type('2024-01-01');
    cy.get('[data-cy="submitExam"]').click();

    cy.contains(randomExamTitle);
    cy.contains('Matemáticas');
    cy.contains('1/1/2024');

    cy.get('[data-cy="actionsButton"]').click();

    cy.get('[data-cy="editExamButton"]').click();
    cy.get('[data-cy="editExamTitle"]').type('Editado');
    cy.get('[data-cy="editExamAssignatures"]').type('Editado');
    cy.get('[data-cy="editExamDate"]').type('2025-01-01');
    cy.get('[data-cy="submitEditedExam"]').click();

    cy.contains('Editado');
    cy.contains('Editado');
    cy.contains('1/1/2025');

    cy.get('[data-cy="deleteExamButton"]').click();
    cy.get('[data-cy="confirmDeleteButton"]').click();
  });
});
