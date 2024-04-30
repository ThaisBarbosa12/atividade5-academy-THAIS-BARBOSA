import { faker } from "@faker-js/faker";

describe("Listar Usuarios", () => {
  beforeEach(() => {
    cy.visit("");
  });
  it("Deve ser possivel buscar por uma lista de usuarios", () => {
    cy.listarUsuarios();
    cy.wait("@listaUsuarios");
    cy.get("#listaUsuarios").should("be.visible");
  });

  it("Ao buscar uma lista de usuarios vazia, deve retornar uma opção de criar usuario", () => {
    cy.listarUsuariosVazio();
    cy.wait("@listaVazia");
    cy.get("h3").should(
      "contain.text",
      "Ops! Não existe nenhum usuário para ser exibido."
    );
    cy.get("p").should("contain.text", "Cadastre um novo usuário");
  });
  it("Deve ser possível encontrar o nome de um usuario dentro da lista de usuarios", () => {
    cy.listarUsuarios();
    cy.wait("@listaUsuarios");
    cy.get("#listaUsuarios").should("be.visible");
    cy.get(':nth-child(1) > .sc-dAbbOL > [data-test="userDataName"]').should(
      "contain.text",
      "Nome: Thais Barbosa"
    );
  });
  it("Deve ser possível encontrar o email de um usuario dentro da lista de usuarios", () => {
    cy.listarUsuarios();
    cy.wait("@listaUsuarios");
    cy.get("#listaUsuarios").should("be.visible");
    cy.get(':nth-child(1) > .sc-dAbbOL > [data-test="userDataEmail"]').should(
      "contain.text",
      "E-mail: thaisbarbosa@yahoo.co..."
    );
  });
  it("Ao retornar uma lista de usuarios, deve existir um botão para deletar o usuario", () => {
    cy.listarUsuarios();
    cy.wait("@listaUsuarios");
    cy.get("#listaUsuarios").should("be.visible");
    cy.get(':nth-child(1) > .sc-feUZmu > [data-test="userDataDelete"]').should(
      "be.visible"
    );
  });
  it("Ao retornar uma lista de usuarios, deve existir um botão para ver detalhes do usuario", () => {
    cy.listarUsuarios();
    cy.wait("@listaUsuarios");
    cy.get("#listaUsuarios").should("be.visible");
    cy.get(":nth-child(1) > .sc-feUZmu > #userDataDetalhe").should(
      "be.visible"
    );
    cy.get(":nth-child(1) > .sc-feUZmu > #userDataDetalhe").should(
      "contain.text",
      "Ver detalhes"
    );
  });
});
