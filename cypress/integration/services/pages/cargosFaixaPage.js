import * as util from '../../../support/util'

const url = '/cargosalario/cargo/list.action'
const url_hist_nivel_comp = '/captacao/nivelCompetenciaHistorico/list.action'
const inserir = '#btnInserir'
const gravar = '#btnGravar'
const nomeCargo = '#nome'
const nomeMercado = '#nomeMercado'
const todasAreas = '#mt'
const faixa = '#nome'
const cbo = '#codigoCBO'
const data = '#data'
const tipo = '#tipo'
const valor = '#valor'

export class CargoFaixaPage {

    navigate() {
        cy.visit(url)
    }

    inserir(cargo) {
        cy.get(inserir).click()
        cy.get(nomeCargo).clear().type(cargo)
        cy.get(nomeMercado).clear().type(cargo)
        cy.get(todasAreas).click()
        cy.get(gravar).click()
        cy.get(faixa).clear().type('Junior')
        cy.get(cbo).clear().type('252510')
        cy.get(data).clear().type('25/10/2020')
        cy.get(tipo).select('Por valor')
        cy.get(valor).clear().type('5000,00')
        cy.get(gravar).click()
    }

    editar(cargo) {
        util.acao('Editar', cargo.Cargo) 
        cy.get(nomeMercado).clear().type(cargo.Cargo2) 
        cy.get(gravar).click()
    }  

    excluir(cargo) {
        util.acao('Excluir', cargo) 
    } 

    excluirfaixa(cargo) {
        util.acao('Faixa Salarial', cargo)
        util.acao('Excluir', 'Júnior') 
    }

    insereNivelCompetenciaSemCompetenciaCadastrada(cargo) {
        util.acao('Faixa Salarial', cargo.Cargo)
        util.acao('Níveis de Competência', 'Júnior')
        cy.get(inserir).click()
        cy.get('#checkAllCompetenciaConhecimento').click()
        cy.get(gravar).click()
    }

    insereNivelCompetenciaCemCompetenciaCadastrada(cargo) {
        cy.visit(url_hist_nivel_comp)
        util.confirmarDialogMessage('Continuar')
        cy.get('#inserir').click()
        cy.get('#peso_0').type('1')
        cy.get('#percentual_0').type('50')
        cy.get('#gravar').click()
        this.navigate()
        util.confirmarDialogMessage('Continuar')

        util.acao('Faixa Salarial', cargo.Cargo)
        util.acao('Níveis de Competência', 'Júnior')
        cy.get(inserir).click()
        cy.get('#checkAllCompetenciaConhecimento').click()
        cy.get('.checkNivelConhecimento').click()
        cy.get(gravar).click()
    }
}