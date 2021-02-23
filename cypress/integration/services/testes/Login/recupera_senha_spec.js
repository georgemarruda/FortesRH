import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { AlteraSenhaPage } from '../../pages/alteraSenhaPage'
import { ModuloExternoPage } from '../../pages/moduloExternoPage'

describe('Recuperação de Senha', () => {
    const alteraSenhaPage = new AlteraSenhaPage()
    const externoPage = new ModuloExternoPage()


    context('Fortes RH', () => {

        beforeEach('', () => {
            cy.logout()
        })

        it('Colaborador com usuário sem senha', () => {
            cy.insereUsuarioSemSenhaComEmpregado('usuario')
            alteraSenhaPage.forgotPassword('34425164555')
            util.infoMsg('Caro(a) Sr(a), não identificamos uma senha associada ao seu cpf na empresa selecionada.')
        })

        it('Colaborador com usuário válido', () => {
            cy.insereUsuarioComEmpregado('usuario')
            alteraSenhaPage.forgotPassword('06060722334')
            util.infoMsg('Sua senha foi enviada para seu E-mail.')
        })

        it('Colaborador Inexistente', () => {
            alteraSenhaPage.forgotPassword('06060722334')
            util.infoMsg('Caro(a) Sr(a), não identificamos um endereço de e-mail associado ao seu usuário.')
        })
    })

    context('Módulo Externo', () => {

        it('Candidato Inexistente', () => {
            externoPage.navigate()
            alteraSenhaPage.forgotPasswordExterno('38771717960')
            util.infoMsg('Candidato não localizado!')
        })

        it('Colaborador com usuário válido - Externo', () => {
            cy.inserecandidato("Candidato 01")
            externoPage.navigate()
            alteraSenhaPage.forgotPasswordExterno('39210359372')
            util.infoMsgExterno('Candidato não possui email cadastrado! Por favor entre em contato com a empresa.')
        })
    })
})



