import { Chance } from 'chance';

describe('Tentativas de Login', () => {
    const chance = new Chance()

    const user = {
        nome: chance.name(),
        newsenha: chance.word({ length: 5 }),
    }

    beforeEach('', () => {
        cy
            .visit('/logout.action')
    });

    it('Login válido & Validação de Licença de uso (Remprot)', () => {
        cy
            .exec_sql("update parametrosdosistema set proximaversao = '2021-01-01'")
            .login(Cypress.config('user_name'), Cypress.config('user_password'))
            .validaURL('/index.action')
            .validaEmpresaLogada(Cypress.config('company'))
            .validaUsuarioLogado(Cypress.config('user_name'))
    });

    it('Login usuário inválido', () => {
        cy
            .login(' ', Cypress.config('user_password'))
            .errorMessageLogin('Usuário sem permissão de acesso')
    });

    it('Login senha inválida', () => {
        cy
            .login(Cypress.config('user_name'), ' ')
            .errorMessageLogin('Usuário sem permissão de acesso')
    });

    it('valida Captcha', () => {
        cy
            .exec_sql('update parametrosdosistema set utilizarcaptchanologin = true;')
            .login(Cypress.config('user_name'), Cypress.config('user_password'))
            .errorMessageLogin('Usuário sem permissão de acesso')
    });

    it('Usuario Expirado', () => {
        cy
            .exec_sql("update usuario set expiracao = '01/01/2000' where login = '" + Cypress.config('user_name') + "'")
            .login(Cypress.config('user_name'), Cypress.config('user_password'))
            .errorMessageLogin('Usuário sem permissão de acesso')
    });

    it('Sessão Expirada', () => {
        cy
            .exec_sql("update parametrosdosistema set sessiontimeout = 1")
            .login(Cypress.config('user_name'), Cypress.config('user_password'))
            .popUpMessage('Sua sessão expirou.')
    });

    it('Primeiro Acesso', () => {
        cy
            .insereUsuario(user.nome)
            .exec_sql("update parametrosdosistema set exibiralteracaoprimeiroacesso = true")
            .login(user.nome, '1234')
            .alterarSenhaPrimeiroAcesso(user.newsenha)
            .successMsg('A senha foi alterada com sucesso!')
    });
});