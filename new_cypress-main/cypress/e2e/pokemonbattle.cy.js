describe('Покупка аватара', function() {

it('Входим и покупаем', function () {
	cy.visit('https://pokemonbattle.ru/login'); 
	cy.get('#root > div > main > section > div.login__content > form > div:nth-child(1) > input').type('user_login');
	cy.get('#password').type('user_pass');

	cy.get('.auth__button').click(); // нажала на кнопку войти

cy.wait(3000);

	cy.get('#root > div > header > div > div.header__container > button.header__id').click({ force: true }); // вошла в профиль тренера
cy.wait(2000);
	cy.get('[href="/shop"]').click(); 
	cy.get('.available > .shop__button').first().click({ force: true }); // первый доступный аватар 
	cy.get('.credit').type('4111111111111111');
	cy.get('.k_input_date').type('12/24');
	cy.get('.k_input_ccv').type('125');
	cy.get('.k_input_name').type('somebodyonce toldme');
	cy.get('#root > div > main > form > div > button').click();
cy.wait(2000);
	cy.get('#cardnumber').type('56456');
	cy.get('.payment__submit-button').click();
	cy.get('.payment__font-for-success').contains('Покупка прошла успешно');
	cy.get('.payment__adv').should('be.visible').click(); 
})

})
