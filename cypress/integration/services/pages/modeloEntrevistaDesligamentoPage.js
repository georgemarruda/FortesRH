import * as util from '../../../support/util'

//MAPEAMENTO DOS ELEMENTOS DA TELA
const url = '/pesquisa/entrevista/list.action'
const inserir = '.btnInserir'
const titulo = '#titulo'
const avancar = '.btnAvancar'
const textoPerguunta = '#texto'
const tipo = '#tipo'
const gravar = '.btnGravar'
const voltar = '.btnVoltar'
const cancelar = '.btnCancelar'


export class ModeloEntrevistaDesligamentoPage {

    navigate() {
        cy.visit(url)
    }
  
    inserir(modeloEntrevista) {
        util.entendiButton()
        cy.get(inserir).click()
        cy.get(titulo).clear().type(modeloEntrevista.Titulo)        
        cy.get(avancar).click()   
        cy.contains('Inserir pergunta aqui').click()  
        cy.get(textoPerguunta).clear().type(modeloEntrevista.Pergunta)       
        cy.get(tipo).select(modeloEntrevista.Tipo)        
        cy.get(gravar).click()    
        cy.get(voltar).click()  
        cy.get(cancelar).click() 
    }

    // editar(grupoAc) {
    //     util.acao_old('Editar', 'Grupo AC Teste')
    //     cy.get(usuarioac).clear().type(grupoAc.Usuario)
    //     cy.get(senhaac).clear().type(grupoAc.Senha)
    //     cy.get(soap).clear().type(grupoAc.Soap)
    //     cy.get(wdsl).clear().type(grupoAc.Wdsl)
    //     cy.get(gravar).click()
    // }

    // excluir(grupoAc) {
    //     util.acao_old('Excluir', grupoAc)
    // }
}