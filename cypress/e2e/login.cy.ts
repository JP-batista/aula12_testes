describe('Teste de Login - Atividade E2E', () => {

  const validEmail = 'usuario@teste.com';
  const validPassword = '123456';

  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  it('Deve exibir erro ao tentar logar com credenciais inválidas', () => {
    cy.get('input[name="email"]').type('email@errado.com');
    cy.get('input[name="password"]').type('senhaErrada');

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/login');

    cy.contains('Credenciais inválidas').should('be.visible');
  });

  it('Deve logar com sucesso e redirecionar para /home', () => {
    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type(validPassword);

    cy.get('button[type="submit"]').click();

    cy.url().should('include', '/home');

    cy.contains('Login Efetuado com Sucesso!').should('be.visible');
  });

  it('Deve manter o botão "Entrar" desabilitado até preencher os campos', () => {

    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('input[name="email"]').type('teste@teste.com');
    cy.get('button[type="submit"]').should('be.disabled');

    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  it('Deve ter campos obrigatórios', () => {

    cy.get('input[name="email"]').should('have.attr', 'required');
    cy.get('input[name="password"]').should('have.attr', 'required');
  });

});
