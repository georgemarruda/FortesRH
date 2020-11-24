import '../../../../../cypress.json'
import * as util from '../../../../support/util'
import { LoginPage } from '../../pages/loginPage'
import { ImportaEpiPage } from '../../pages/importaEpiPage'

describe('Improtação de Epis', () => {
    const loginPage = new LoginPage()
    const importaEpiPage = new ImportaEpiPage()

    beforeEach('', () => {
        loginPage.navigate()
        loginPage.loggedIn('homolog', '1234')
        importaEpiPage.navigate()
    })

    it('Importa Epi Arquivo Inválido', () => {
        const arquivoEpi = { Arquivo: 'ArquivoInvalido.txt' }
        importaEpiPage.importarEpi(arquivoEpi)
        util.warningMsg('Não foram encontradas linhas com dados de EPI válidos. Verifique o arquivo.')
    })

    it('Importa Epi Arquivo Vazio', () => {
        const arquivoEpi = { Arquivo: 'ArquivoVazio.txt' }
        importaEpiPage.importarEpi(arquivoEpi)
        util.errorMsg('Erro ao executar a importação.')
    })
}) 