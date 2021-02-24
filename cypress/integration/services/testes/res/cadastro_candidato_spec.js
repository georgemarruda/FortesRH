const faker = require('faker')

import '../../../../../cypress.json'

import * as util from '../../../../support/util'
import { ColaboradorCandidatoPage } from '../../pages/ColaboradorCandidatoPage'
import { ModuloExternoPage } from '../../pages/moduloExternoPage'

describe('Gerenciamento de Candidatos', () => {
    const candidatoPage = new ColaboradorCandidatoPage()
    const externoPage = new ModuloExternoPage()

    const candidato = {
        nome: faker.fake("{{name.firstName}} {{name.lastName}}"),
        naturalidade: faker.address.city(),
        sexo: 'Feminino'
    }


    describe('Cadastros de Candidato no Módulo Externo', () => {
        beforeEach('', () => {
            externoPage.navigate()
            cy.exec_sql("update parametrosdosistema set camposcandidatoexternovisivel = 'nome,nascimento,naturalidade,sexo,cpf,escolaridade,endereco,fone,comfirmaSenha,senha,formacao,idioma,pis'")
            externoPage.queroMeCadastrar()
        })

        it('Inserção de Candidatos Módulo Externo', () => {
            candidatoPage.inserirCandidatoColaboradorModuloExterno()
            util.popUpMessage('Dados cadastrados com sucesso.')
        })

        it('Inserção de Candidatos Módulo Externo - Exige Aceite LGPD', () => {
            cy.exec_sql("update empresa set exigiraceitepsi = true")
            cy.exec_sql("update empresa set politicaseguranca = 'Teste'")
            cy.reload()
            candidatoPage.inserirCandidatoColaboradorModuloExterno()
            util.popUpMessage('Você precisa aceitar o Termo de Privacidade e Política de Segurança.')
            candidatoPage.aceitaLGPD()
            candidatoPage.clicaAbaCurriculoGrava()
            util.popUpMessage('Dados cadastrados com sucesso.')
        })
    });

    describe('Cadastro de Candidato no Fortes RH', () => {
        beforeEach('', () => {
            cy.inserecandidato("Candidato 01")
            candidatoPage.navigate_menu_candidatos()
        })

        context('Cadastro de Candidatos', () => {

            it('Inserção de Candidatos', () => {
                cy.exec_sql("update empresa set exigiraceitepsi = true")
                cy.exec_sql("update empresa set politicaseguranca = 'Teste'")

                cy.inserirCandidato(candidato)
                candidatoPage.inserirCandidatoColaborador()
                cy.validaMensagemSucesso('Operação efetuada com sucesso')
            })

            it('Inserção de Candidatos - Associar Candidato ao Colaborador Contratado', () => {
                cy.insereColaborador('Helena de Troia')
                candidatoPage.inserirCandidatoColaborador()
                util.dialogMessageMesmoCPF('Existem talentos contratados com esse CPF')
                cy.validaMensagemSucesso('Operação efetuada com sucesso')
            })

            it('Inserção de Candidatos - mesmo CPF empregado demitido', () => {
                cy.insereColaboradorDemitido('Helena de Troia')
                candidatoPage.inserirCandidatoColaborador()
                util.dialogMessageMesmoCPF('Existem talentos contratados com esse CPF')
                cy.validaMensagemSucesso('Operação efetuada com sucesso')
            })

            it('Valida Parentesco', () => {
                cy.insereColaborador('Helena de Troia')
                cy.exec_sql("update empresa set verificaparentesco = 'T'")
                candidatoPage.clicaInserir()
                candidatoPage.preencheNomePai()
                util.dialogMessage('Verificação de Parentesco')
            });

            it('Valida Obrigatoriedade do preenchimento do Certficado Militar para sexo Masculino', () => {
                cy.exec_sql("update parametrosdosistema set camposcandidatoobrigatorio = 'nome,sexo,escolaridade,ende,num,cidade,uf,fone,ddd,certificadoMilitar,certMilTipo,certMilSerie'")
                cy.reload()

                candidatoPage.inserirCandidatoColaborador('Masculino')
                util.popUpMessage('Preencha os campos indicados:')
            });

            it('Valida Não Obrigatoriedade do preenchimento do Certficado Militar para sexo Feminino', () => {
                cy.exec_sql("update parametrosdosistema set camposcandidatoobrigatorio = 'nome,sexo,escolaridade,ende,num,cidade,uf,fone,ddd,certificadoMilitar,certMilTipo,certMilSerie'")
                cy.reload()

                candidatoPage.inserirCandidatoColaborador('Feminino')
                cy.validaMensagemSucesso('Operação efetuada com sucesso')
            });

            it('Valida Homonimos', () => {
                cy.inserecandidato("Amy Winehouse")
                candidatoPage.clicaInserir()
                candidatoPage.preencheCandidatoHomonimo('Amy Winehouse')
            });

            it('Candidato Já Cadastrado', () => {
                cy.insereCandidato("Amy Winehouse")
                candidatoPage.insereColaboradorCpfExistente()
                util.dialogMessageMesmoCPF('Já existe um cadastro no banco de talento com esse CPF')
            })
        })

        context('Tentativas de Edição de Cadastro de Candidatos', () => {
            it('Edição Cadastro de Candidatos', () => {
                cy.reload()
                candidatoPage.editarCandidatoColaborador('Candidato 01')
            })
        })

        context('Tentativas de Exclusão de Cadastro de Candidatos', () => {
            it('Exclusão de Cadastro de Candidatos', () => {
                cy.reload()
                candidatoPage.excluirCandidatoColaborador('Candidato 01')
                util.popUpMessage('Deseja realmente excluir o candidato Candidato 01?')
                cy.validaMensagemSucesso('Candidato excluído com sucesso.')
            });

            it('Exclusão de Cadastro de Candidatos em Lote', () => {
                cy.inserecandidato("Candidato 01")
                cy.inserecandidato("Candidato 02")
                cy.inserecandidato("Candidato 03")
                cy.inserecandidato("Candidato 04")
                cy.inserecandidato("Candidato 05")
                cy.reload()
                candidatoPage.excluirCandidatoColaboradorLote()
                util.popUpMessage('Deseja realmente excluir os candidatos?')
                util.infoMsg('Não existem candidatos a serem listados')
            })
        })
    })

    describe('Outras Rotinas do Candidato', () => {

        beforeEach('', () => {
            cy.inserirSolicitacaoPessoal()
            cy.inserecandidato("Candidato 01")
            candidatoPage.navigate_menu_candidatos()
        })

        it('Anexar Documentos', () => {
            candidatoPage.anexaDocs("Candidato 01")
        })

        it('Contratar Candidato', () => {
            candidatoPage.contrataCandidato("Candidato 01")
            util.dialogMessage('Contratar candidato')
            cy.contains('Confirmar').click()
            util.validaTitulo('Inserir Talento')
        })

        it('Curriculo Escaneado - Usando o cadastro do candidato', () => {
            candidatoPage.insereCurriculoEscaneado("Candidato 01")
        })

        it('Curriculo Escaneado - Usando o Botão', () => {
            candidatoPage.insereCurriculoEscaneado()
        })

        it('Inserir Candidato em Solicitação de Pessoal', () => {
            candidatoPage.inserirEmSolicitacao("Candidato 01")
            util.validaTitulo('Candidatos da Seleção')
        })

        it('Triagem de Candidatos', () => {
            candidatoPage.triagemCandidato()
            util.validaTitulo('Triagem de Currículos')
        })

        it('Incluir Curriculo Digitado', () => {
            candidatoPage.inserirCurriculoDigitado()
            util.infoMsg('Currículo (Curriculo Digitado) cadastrado com sucesso.')
        })
    })
})