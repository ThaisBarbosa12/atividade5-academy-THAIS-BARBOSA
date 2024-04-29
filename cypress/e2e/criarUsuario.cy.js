import { faker } from "@faker-js/faker";
import CriarUsuarioPage from "../support/pages/criarUsuario.page";
const name = faker.person.firstName();
const email = faker.internet.email();
describe("Criar Usuarios", () => {
  var paginaCriacao = new CriarUsuarioPage();
  beforeEach(() => {
    cy.visit("");
  });
  it("Deve ser possivel criar um usuario ao preencher os campos nome e email com dados validos", function () {
    cy.intercept("POST", "api/v1/users/novo").as("usuarioCriado");
    cy.get(paginaCriacao.linkVoltar).click();
    paginaCriacao.typeNome(name);
    paginaCriacao.typeEmail(email);
    paginaCriacao.clickButtonSalvar();
  });
  it("Deve exibir um erro ao tentar criar um usuario com formato de email invalido", function () {
    cy.intercept("POST", "api/v1/users/novo").as("usuarioCriado");
    cy.get(paginaCriacao.linkVoltar).click();
    paginaCriacao.typeNome(name);
    paginaCriacao.typeEmail("thais.barbosa.com.br");
    paginaCriacao.clickButtonSalvar();

    cy.get(".sc-cPiKLX").should("be.visible");
    cy.get(".sc-cPiKLX").should("contain.text", "Formato de e-mail inválido");
  });
  it("Deve exibir um erro ao tentar criar um usuario sem preencher o campo nome", function () {
    cy.intercept("POST", "api/v1/users/novo").as("usuarioCriado");
    cy.get(paginaCriacao.linkVoltar).click();
    paginaCriacao.typeEmail(email);
    paginaCriacao.clickButtonSalvar();

    cy.get(".sc-cPiKLX").should("be.visible");
    cy.get(".sc-cPiKLX").should("contain.text", "O campo nome é obrigatório.");
  });
  it("Deve exibir um erro ao tentar criar um usuario sem preencher o campo email", function () {
    cy.intercept("POST", "api/v1/users/novo").as("usuarioCriado");
    cy.get(paginaCriacao.linkVoltar).click();
    paginaCriacao.typeNome(name);
    paginaCriacao.clickButtonSalvar();
    cy.get(".sc-cPiKLX").should("be.visible");
    cy.get(".sc-cPiKLX").should(
      "contain.text",
      "O campo e-mail é obrigatório."
    );
  });
  it("Deve exibir um erro ao tentar criar um usuario com nome < 4 caracteres", function () {
    cy.intercept("POST", "api/v1/users/novo").as("usuarioCriado");
    cy.get(paginaCriacao.linkVoltar).click();
    paginaCriacao.typeNome("tha");
    paginaCriacao.typeEmail(email);
    paginaCriacao.clickButtonSalvar();

    cy.get(".sc-cPiKLX").should("be.visible");
    cy.get(".sc-cPiKLX").should(
      "contain.text",
      "Informe pelo menos 4 letras para o nome"
    );
  });
  it("Deve exibir um erro ao tentar criar um usuario com nome > 100 caracteres", function () {
    cy.intercept("POST", "api/v1/users/novo").as("usuarioCriado");
    cy.get(paginaCriacao.linkVoltar).click();
    paginaCriacao.typeNome(
      "thais barbosa da silva thais barbosa da silva thais barbosa da silva thais barbosa da silva thais bar"
    );
    paginaCriacao.typeEmail(email);
    paginaCriacao.clickButtonSalvar();

    cy.get(".sc-cPiKLX").should("be.visible");
    cy.get(".sc-cPiKLX").should(
      "contain.text",
      "Informe no máximo 100 caracteres para o nome"
    );
  });
  it("Deve exibir um erro ao tentar criar um usuario com email > 60 caracteres", function () {
    cy.intercept("POST", "api/v1/users/novo").as("usuarioCriado");
    cy.get(paginaCriacao.linkVoltar).click();
    paginaCriacao.typeNome(name);
    paginaCriacao.typeEmail(
      "thaisbarbosadasilvathaisbarbosadasilvathaisbarbosad@gmail.com"
    );
    paginaCriacao.clickButtonSalvar();

    cy.get(".sc-cPiKLX").should("be.visible");
    cy.get(".sc-cPiKLX").should(
      "contain.text",
      "Informe no máximo 60 caracteres para o e-mail"
    );
  });
  it("Deve exibir uma erro ao tentar criar um usuario com email já existente", function () {
    cy.intercept("POST", "api/v1/users", {
      statusCode: 422,
      fixture: "users/bodyErroEmailExistente.json",
    }).as("postUser");

    cy.get(paginaCriacao.linkVoltar).click();
    paginaCriacao.typeNome(name);
    paginaCriacao.typeEmail(email);
    paginaCriacao.clickButtonSalvar();

    cy.stub().as("stubErro");
    cy.on("window:alert", this.stubErro);

    cy.contains("Este e-mail já é utilizado por outro usuário.").should(
      "be.visible"
    );
  });
});
