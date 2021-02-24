import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { MessagePage } from '../../pages/mensagemPage'

describe('Funcionalidade de Envio de Mensagens para Usuários', () => {
    const mensagemPage = new MessagePage()

    const mensagem = 'Mensagem Teste'
    const mensagemVazia = ' '


    beforeEach('', () => {
        mensagemPage.navigate()
    })

    it('Envio de Mensagem', () => {
        mensagemPage.enviaMensagem(mensagem)
        cy.validaMensagemSucesso('Mensagem enviada com sucesso')
        //Verifica Mensagem na tela Inicial
        cy.get('#logoDiv').click()
        cy.contains(mensagem)
    })

    it('Tentativa de Envio de Mensagem Vazia', () => {
        mensagemPage.enviaMensagem(mensagemVazia)
        cy.popUpMessage('Preencha os campos indicados.')
    })
})