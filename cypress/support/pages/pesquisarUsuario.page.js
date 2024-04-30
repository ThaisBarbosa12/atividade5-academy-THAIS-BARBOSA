export default class PesquisarUsuarioPage {
  inputBuscarEmail = ".sc-gsFSXq";
  inputBuscarNome = ".sc-gsFSXq";
  inputNome = "#name";
  inputEmail = "#email";
  buttonDeletar = '[data-test="userDataDelete"]';
  buttonVerDetalhes = ":nth-child(1) > .sc-feUZmu > #userDataDetalhe";
  buttonSalvar = "#root > div.sc-cWSHoV.giKWPW > div > form > button";
  buttonConfirmar =
    "#root > div.sc-eBMEME.kIxLSF > div > div > div > button.sc-lcIPJg.eIYdvr";

  linkNovo = '[href="/users/novo"]';
  linkVoltar = '[href="/users"]';

  listaUsuarios = "#listaUsuarios";

  usuarioEncontrado = "#userData";

  nomeUsuario = "userDataName";

  emailUsuario = "userDataEmail";

  typeBuscarEmail(email) {
    cy.get(this.inputBuscarEmail).type(email);
  }
  typeBuscarNome(nome) {
    cy.get(this.inputBuscarNome).type(nome);
  }
  clickButtonDeletar() {
    cy.get(this.buttonDeletar).click();
  }
  clickButtonConfirmar() {
    cy.get(this.buttonConfirmar).click();
  }
  clickbuttonVerDetalhes() {
    cy.get(this.buttonVerDetalhes).click();
  }
  typeNome(nome) {
    cy.get(this.inputNome).type(nome);
  }
  typeEmail(email) {
    cy.get(this.inputEmail).type(email);
  }
  clickButtonSalvar() {
    cy.get(this.buttonSalvar).click();
  }
  clickButtonVoltar() {
    cy.get(this.linkVoltar).click();
  }
  clickButtonNovo() {
    cy.get(this.linkNovo).click();
  }
  cadastrar(nome, email) {
    this.typeNome(nome);
    this.typeEmail(email);
    this.clickButtonSalvar();
  }
}
