import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { MotivoSolicitacaoEPIPage } from '../../pages/sst/motivoSolicitacaoEPIPage'


describe('Funcionalidade Categoria de EPI', () => {
    const loginPage = new LoginPage()
    const motivoSolicitacaoEPIPage = new MotivoSolicitacaoEPIPage()

    const motivoSolicitacaoEPI = {Nome: "Motivo Aquisição de Material"}

    beforeEach('', () => {
        cy.insereColaborador('Helena de Troia')
        cy.inserirMotivoSolicitacaoEPI(motivoSolicitacaoEPI.Nome)
        motivoSolicitacaoEPIPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it('Inserção Motivo de Solicitação de EPI', () => {
        motivoSolicitacaoEPIPage.inserir(motivoSolicitacaoEPI)
        util.successMsg('Motivo da solicitação do EPI cadastrado com sucesso.')
    });

    it('Edição Motivo de Solicitação de EPI', () => {
        motivoSolicitacaoEPIPage.editar(motivoSolicitacaoEPI)
        util.successMsg('Motivo da solicitação do EPI atualizado com sucesso.')        
    });

    it('Exclusão Motivo de Solicitação de EPI', () => {
        motivoSolicitacaoEPIPage.excluir(motivoSolicitacaoEPI)
        util.popUpMessage('Confirma exclusão?')
        util.successMsg('Motivo da solicitação do EPI excluído com sucesso.')
    });
})