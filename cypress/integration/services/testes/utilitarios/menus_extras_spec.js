import 'cypress-capybara/add-commands'
import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { MenuExtraPage } from '../../pages/menuExtraPage'

describe('Funcionalidade Menus Extras', () => {
    const loginPage = new LoginPage()
    const menuExtraPage = new MenuExtraPage()


    beforeEach('', () => {
        menuExtraPage.navigate()
        loginPage.loggedIn('homolog', '1234')
    })

    it.only('Inserir Novo Menu', () => {
        menuExtraPage.insereNovoMenu('Redes Sociais')
        util.successMsg('Menu Extra adicionado com sucesso.')
        util.infoMsg('O usuário deverá sair e realizar novo login no sistema para refletir as alterações do Menu.')
    })

    it.only('Inserir Novo Item Menu', () => {
        menuExtraPage.insereNovoMenu('Redes Sociais')
        menuExtraPage.insereDadosMenu()
        util.successMsg('Link adicionado com sucesso.')
        util.infoMsg('O usuário deverá sair e realizar novo login no sistema para refletir as alterações do Menu.')
    })
})



