import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { ModeloAvaliacaoCandidatoPage } from '../../pages/modeloAvaliacaoCandidatoPage'

describe('Funcionalidade Modelo Avaliação Candidatos', () => {
    const modeloAvaliacaoCandidatoPage = new ModeloAvaliacaoCandidatoPage()

    beforeEach('', () => {
        cy.inseremodeloAvaliacaoCandidato('Avaliação Teste')
        modeloAvaliacaoCandidatoPage.navigate()
    })
    
    it('Inserção de Modelo Avaliação Candidatos', () => {
        modeloAvaliacaoCandidatoPage.insereModeloAvaliacao()
        cy.validaMensagemSucesso('Pergunta gravada com sucesso')
    })

    it('Edição de Modelo Avaliação Candidatos', () => {
        modeloAvaliacaoCandidatoPage.editarMotivo('Editar', 'Avaliação Teste')
        util.validaTitulo('Modelos de Avaliação do Candidato')
    })

    it('Exclusão de Modelo Avaliação Candidatos', () => {
        modeloAvaliacaoCandidatoPage.excluirMotivo('Excluir', 'Avaliação Teste')
        util.popUpMessage('Confirma exclusão?')
        cy.validaMensagemSucesso('Modelo de avaliação excluído com sucesso.')
    })

    it('Visualizar Perguntas de Modelo Avaliação Candidatos', () => {
        modeloAvaliacaoCandidatoPage.acao('Visualizar', 'Avaliação Teste')
        cy.contains('Título: Avaliação Teste')
    })

    it('Visualizar a GRID de Perguntas de Modelo Avaliação Candidatos', () => {
        modeloAvaliacaoCandidatoPage.acao('Perguntas', 'Avaliação Teste')
        cy.contains('Pergunta 01')
    })

    it('Visualizar a GRID de Perguntas de Modelo Avaliação Candidatos', () => {
        modeloAvaliacaoCandidatoPage.acao('Aspectos', 'Avaliação Teste')
        util.validaTitulo('Aspectos da Avaliação')
    })

    it('Clonar Modelo Avaliação Candidatos', () => {
        modeloAvaliacaoCandidatoPage.acao('Clonar', 'Avaliação Teste')
        modeloAvaliacaoCandidatoPage.clicaClonar()        
        cy.contains('Avaliação Teste (Clone)')
    })
})

