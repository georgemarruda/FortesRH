import 'cypress-capybara/add-commands'

const entendi = '.done'


function acao_old(acao, text) {
    cy.xpath(`//td[contains(text(), "${text}")]/../td/a/img[@title="${acao}"]`).click()
}

function acao(acao, text) {
    cy.get(`td:contains("${text}")`).parent().find(`i[title="${acao}"]`).click()
}

function entendiButton() {
    switch (cy.get(entendi).click({ multiple: true, force: true })) {
        case 0:
            cy.get(entendi).should('be.visible')
            break;
    }
}

function popUpMessage(text) {
    cy.get('#popup_message').then(($popup) => {
        if ($popup.text().includes(text)) {
            cy.get('#popup_ok').click()
        } else {
            console.log('erro')
        }
    })
    cy.get('#popup_message').should('not.exist')
}



function dialogMessage(text) {
    cy.get('.ui-dialog-title').should('contain', text)
}

function dialogContentMessage(text) {
    cy.get('.ui-dialog-content').should('contain', text)
}

function confirmarDialogMessage(text) {
    if (text == null) {
        cy.get(':nth-child(1) > .ui-button-text').should('contain', 'Confirmar').click()
    } else {
        cy.get(':nth-child(1) > .ui-button-text').should('contain', text).click()
    }
}

function dialogMessageLGPD(text) {
    cy.get('#ui-dialog-title-termo-privacidade-politica-seguranca').should('contain', text)
}

function continuarButton() {
    cy.get('.ui-button-text').click()
}

function validaTitulo(text) {
    cy.get('#waDivTitulo').should('include.text', text)
}

function welcomeMessage(text) {
    cy.get('.saudacao').should('contain', text)
}

function errorMessageLogin(text) {
    cy.get('.txtErro').should('contain', text)
}

function successMsg(text) {
    cy.get('#successMsg').should('include.text', text)
}

function warningMsg(text) {
    cy.get('#warningMsg').should('contain', text)
}

function infoMsg(text) {
    cy.get('#infoMsg').should('contain', text)
}

function infomsg(text) {
    cy.get('.info').should('contain.text', text)
}

function errorMsg(text) {
    cy.get('#errorMsg').should('contain', text)
}

function warningMsgExterno() {
    cy.get('#warnings').should('be.visible')
}

function infoMsgExterno() {
    cy.get('#infoMsg').should('be.visible')
}

function welcomeExterno(text) {
    cy.get('#topDiv').should('be.visible').and('contain.text', text)
}

function validaCaptchaSistemaVisivel() {
    cy.get('iframe').should('be.visible')
}

export {
    acao_old, acao, entendiButton, dialogContentMessage, popUpMessage, dialogMessage, confirmarDialogMessage, dialogMessageLGPD, continuarButton, validaTitulo, welcomeMessage,
    errorMessageLogin, successMsg, warningMsg, infoMsg, errorMsg, warningMsgExterno, infoMsgExterno, welcomeExterno, validaCaptchaSistemaVisivel, infomsg
}

