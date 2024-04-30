import { faker } from "@faker-js/faker";
import PesquisarUsuarioPage from "../support/pages/pesquisarUsuario.page";
const name = faker.person.firstName();
const email = faker.internet.email();
describe("Pesquisar usuários", function () {
  var paginaPesquisar = new PesquisarUsuarioPage();
  before(function () {
    cy.visit("");
    paginaPesquisar.clickButtonNovo();
    paginaPesquisar.cadastrar(name, email);
    paginaPesquisar.clickButtonVoltar();
  });
  it("Deve ser possivel pesquisar um usuário pelo seu identificador unico email", function () {
    paginaPesquisar.typeBuscarEmail(email);

    cy.get('[data-test="userDataName"]').should("be.visible");
    cy.get('[data-test="userDataName"]').should("contain.text", "Nome: ", name);
    cy.get('[data-test="userDataEmail"]').should("be.visible");
    cy.get('[data-test="userDataEmail"]').should(
      "contain.text",
      "E-mail: ",
      email
    );
    paginaPesquisar.clickbuttonVerDetalhes();
    cy.get('[name="id"]').should("be.visible");
    cy.get("#userName").should("be.visible");
    cy.get("#userEmail").should("be.visible");
    cy.get('[type="button"] > .sc-dAlyuH').should("be.visible");
    cy.get('[type="submit"]').should("be.visible");
  });
  it("Deve ser possivel pesquisar um usuário pelo nome", function () {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
    paginaPesquisar.typeBuscarNome(name);

    cy.get('[data-test="userDataName"]').should("be.visible");
    cy.get('[data-test="userDataName"]').should("contain.text", "Nome: ", name);
    cy.get('[data-test="userDataEmail"]').should("be.visible");
    cy.get('[data-test="userDataEmail"]').should(
      "contain.text",
      "E-mail: ",
      email
    );
    paginaPesquisar.clickbuttonVerDetalhes();
    cy.get('[name="id"]').should("be.visible");
    cy.get("#userName").should("be.visible");
    cy.get("#userEmail").should("be.visible");
    cy.get('[type="button"] > .sc-dAlyuH').should("be.visible");
    cy.get('[type="submit"]').should("be.visible");
  });
  it("Deve exibir uma mensagem de erro caso não seja possivel encontrar o usuario pelo seu identificador unico email", function () {
    cy.visit("https://rarocrud-frontend-88984f6e4454.herokuapp.com/users");
    paginaPesquisar.typeBuscarEmail("aboboraverdeazul@teste.com");

    cy.get("h3").should(
      "contain.text",
      "Ops! Não existe nenhum usuário para ser exibido."
    );
    cy.get("p").should("contain.text", "Cadastre um novo usuário");
  });
});
