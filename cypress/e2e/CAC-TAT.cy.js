// describe('template spec', () => {
//   it('passes', () => {
//     cy.visit('https://example.cypress.io')
//   })
// })

describe('Central de Atendimento ao Cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.get('#firstName')
      .should('be.visible')
      .type('Maria Catarina')
      .should('have.value', 'Maria Catarina')
    cy.get('#lastName')
      .should('be.visible')
      .type('Almeida')
      .should('have.value', 'Almeida')
    cy.get('#email')
      .should('be.visible')
      .type('maria.almeida@teste.com')
      .should('have.value', 'maria.almeida@teste.com')
    cy.get('#open-text-area')
      .should('be.visible')
      .type('Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sed tellus non nunc pulvinar dignissim. Cras risus magna, egestas vel varius nec, ullamcorper eget metus. Sed id lorem in ex commodo mollis. Nulla vestibulum diam nisi, viverra finibus diam pretium finibus. Vestibulum fermentum varius ligula sed pellentesque. Morbi facilisis dictum velit, ut sagittis tortor. Curabitur lacus augue, lobortis vitae malesuada sed, ullamcorper a eros. Nunc nec est et nibh aliquet fermentum. Vivamus et convallis ipsum, eu vehicula turpis.', { delay: 0 })

    cy.get('button.button')
      .should('be.visible')
      .contains('Enviar').click()

    cy.get('.success')
      .should('be.visible')
      .should('contain', 'Mensagem enviada com sucesso.')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName')
      .should('be.visible')
      .type('Maria Catarina')
      .should('have.value', 'Maria Catarina')
    cy.get('#lastName')
      .should('be.visible')
      .type('Almeida')
      .should('have.value', 'Almeida')
    cy.get('#email')
      .should('be.visible')
      .type('abc')

    cy.get('button.button')
      .should('be.visible')
      .contains('Enviar').click()

    cy.get('.error')
      .should('contain', 'Valide os campos obrigatórios!')
      .should('be.visible')

  })

  it('campo telefone continua vazio quando preenchido com um valor não numérico', () => {
    cy.get('#phone')
      .should('be.visible')
      .type('abc')
      .should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName')
      .should('be.visible')
      .type('Maria Catarina')
      .should('have.value', 'Maria Catarina')
    cy.get('#lastName')
      .should('be.visible')
      .type('Almeida')
      .should('have.value', 'Almeida')
    cy.get('#email')
      .should('be.visible')
      .type('maria.almeida@teste.com')
      .should('have.value', 'maria.almeida@teste.com')
    cy.get('#open-text-area')
      .should('be.visible')
      .type('Bla bla bla')
    cy.get('#phone-checkbox').check()
    cy.get('#phone')
      .should('be.visible')

    cy.get('button.button')
      .should('be.visible')
      .contains('Enviar').click()

    cy.get('.error')
      .should('be.visible')
      .should('contain', 'Valide os campos obrigatórios!')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .should('be.visible')
      .type('Maria Catarina')
      .should('have.value', 'Maria Catarina')
      .clear()
      .should('have.value', '')

    cy.get('#lastName')
      .should('be.visible')
      .type('Almeida')
      .should('have.value', 'Almeida')
      .clear()
      .should('have.value', '')

    cy.get('#email')
      .should('be.visible')
      .type('maria.almeida@teste.com')
      .should('have.value', 'maria.almeida@teste.com')
      .clear()
      .should('have.value', '')

    cy.get('#phone')
      .should('be.visible')
      .type('11999999999')
      .should('have.value', '11999999999')
      .clear()
      .should('have.value', '')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button.button')
      .should('be.visible')
      .contains('Enviar').click()

    cy.get('.error')
      .should('be.visible')
      .should('contain', 'Valide os campos obrigatórios!')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    cy.fillMandatoryFieldsAndSubmit()

    cy.get('.success')
      .should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado passando um objeto', () => {
    const data = {
      nome: 'Paula',
      sobrenome: 'Reis',
      email: 'paula.reis@teste.com',
      texto: 'Paula está aprendendo Cypress'
    }
    cy.fillMandatoryFieldsAndSubmitObject(data)

    cy.get('.success')
      .should('be.visible')
      .should('contain', 'Mensagem enviada com sucesso.')
  })

  it('envia o formulário com sucesso usando um comando customizado passando um objeto', () => {
    cy.fillMandatoryFieldsAndSubmit({
      nome: 'Paula',
      sobrenome: 'Reis',
      email: 'paula.reis@teste.com',
      texto: 'Meu primeiro programa em Cypress'
    })
    cy.get('.success')
      .should('be.visible')
      .should('contain', 'Mensagem enviada com sucesso.')
  })

  //Se apagar o objeto data, o valor considerado, será o definido dentro do command fillMandatoryFieldsAndSubmitObjectStandard
  it('envia o formulario com sucesso usando um comando customizado que recebe um objeto como argumento, com valores padrão', () => {
    const data = {
      nome: 'Paula',
      sobrenome: 'Reis',
      email: 'paula.reis@teste.com',
      texto: 'Paula está aprendendo Cypress'
    }
    cy.fillMandatoryFieldsAndSubmitObjectStandard(data)
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube')
      .should('have.value', 'youtube')
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('mentoria')
      .should('have.value', 'mentoria')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1)
      .should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('[type="radio"]').check('feedback')
      .should('be.checked', 'feedback')
  })

  it('marca cada tipo de atendimento', () => { // formas de implementação
    cy.get('input[type="radio"]')
      // .each(($el, index, $list ) => {
      //   cy.wrap($el).check()
      //     .should('be.checked')
      .each(typeOfService => {
        cy.wrap(typeOfService)
          .check()
          .should('be.checked')
      })
    //  })


    // cy.get('[type="radio"]').check('ajuda')
    //   .should('be.checked', 'ajuda')
    // cy.get('[type="radio"]').check('elogio')
    //   .should('be.checked', 'elogio')
    // cy.get('[type="radio"]').check('feedback')
    //   .should('be.checked', 'feedback')
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type=file]')
      .selectFile('cypress/fixtures/example.json') //seleciona o arquivo
      .should(input => { //passa uma função de callback input, compara o nome em relação ao endereço dentro do console
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type=file]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' }) //seleciona o arquivo.  Nesse caso é como se estivesse arrastando o arquivo para carregá-lo
      .should(input => { //passa uma função de callback input, compara o nome em relação ao endereço dentro do console
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('fixtureAlias') //Carrega um conjunto fixo de dados localizados em um arquivo.
    cy.get('input[type=file]')
      .selectFile('@fixtureAlias')
      .should(input => { //passa uma função de callback input, compara o nome em relação ao endereço dentro do console
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    // cy.get('a[href="privacy.html"]')
    //   .should('have.attr', 'target', '_blank')
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
      .click()
  })

  it.only('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.get('a[href="privacy.html"]')
      .invoke('removeAttr', 'target')
      .click()
    cy.location('pathname').should('eq', '/src/privacy.html')
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })
})



