describe('Teste de Login - Atividade E2E', () => {

  const validEmail = 'usuario@teste.com';
  const validPassword = '123456';

  beforeEach(() => {
    cy.visit('http://localhost:3000/login');
  });

  // -------------------------------------------------------------
  // 1. LOGIN COM ERRO
  // -------------------------------------------------------------
  it('Deve exibir erro ao tentar logar com credenciais inválidas', () => {
    cy.get('input[name="email"]').type('email@errado.com');
    cy.get('input[name="password"]').type('senhaErrada');

    cy.get('button[type="submit"]').click();

    // Deve permanecer na página de login
    cy.url().should('include', '/login');

    // Mensagem de erro deve aparecer
    cy.contains('Credenciais inválidas').should('be.visible');
  });

  // -------------------------------------------------------------
  // 2. LOGIN COM SUCESSO
  // -------------------------------------------------------------
  it('Deve logar com sucesso e redirecionar para /home', () => {
    cy.get('input[name="email"]').type(validEmail);
    cy.get('input[name="password"]').type(validPassword);

    cy.get('button[type="submit"]').click();

    // Redireciona para /home
    cy.url().should('include', '/home');

    // Confirma mensagem de sucesso
    cy.contains('Login Efetuado com Sucesso!').should('be.visible');
  });

  // -------------------------------------------------------------
  // 3. BOTÃO DESABILITADO
  // -------------------------------------------------------------
  it('Deve manter o botão "Entrar" desabilitado até preencher os campos', () => {

    // inicialmente deve estar desabilitado
    cy.get('button[type="submit"]').should('be.disabled');

    // Preenche apenas email -> ainda desabilitado
    cy.get('input[name="email"]').type('teste@teste.com');
    cy.get('button[type="submit"]').should('be.disabled');

    // Preenche senha -> habilita
    cy.get('input[name="password"]').type('123456');
    cy.get('button[type="submit"]').should('not.be.disabled');
  });

  // -------------------------------------------------------------
  // 4. CAMPOS OBRIGATÓRIOS
  // -------------------------------------------------------------
  it('Deve ter campos obrigatórios', () => {

    // Basta validar que ambos possuem atributo required
    cy.get('input[name="email"]').should('have.attr', 'required');
    cy.get('input[name="password"]').should('have.attr', 'required');
  });

});
