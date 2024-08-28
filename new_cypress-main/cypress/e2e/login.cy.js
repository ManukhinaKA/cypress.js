import * as main_page from "../locators/main_page.json"
import * as recovery_password_page from "../locators/recovery_password_page.json" 
import * as result_page from "../locators/result_page.json"
import * as loginparol from "../helpers/default_data.json"
import * as authorization from "../helpers/authorization-results.json"

describe('Проверка авторизации', function() {

	beforeEach('Начало теста', function () {
		cy.visit('/'); // Зайти на страницу сайта
	})
	afterEach('Конец теста', function() {
	cy.get(result_page.close).should('be.visible'); // Крестик виден
	})

	it('1. Верный логин и верный пароль', function() {
		cy.get(main_page.email).type(loginparol.login);
		cy.get(main_page.password).type(loginparol.password);
		cy.get(main_page.login_button).click();
		cy.get(result_page.title).contains(authorization.success);
	})

	it('2. Восстановление пароля', function() {
		cy.get(main_page.fogot_pass_btn).click();
		cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)');
		cy.get(recovery_password_page.email).type(loginparol.login);
		cy.get(recovery_password_page.send_button).click();
		cy.get(result_page.title).contains(authorization.password_sent);

	})

	it('3. Верный логин и НЕверный пароль', function() {
		cy.get(main_page.email).type(loginparol.login);
		cy.get(main_page.password).type('loveqa12345678');
		cy.get(main_page.login_button).click();
		cy.get(result_page.title).contains(authorization.fail);
	})

	it('4. НЕверный логин и верный пароль', function() {
		cy.get(main_page.email).type('negerman@dolnikov.ru');
		cy.get(main_page.password).type(loginparol.password);
		cy.get(main_page.login_button).click();
		cy.get(result_page.title).contains(authorization.fail);
	})

	it('5. Логин без @ и верный пароль', function() {
		cy.get(main_page.email).type('germandolnikov.ru');
		cy.get(main_page.password).type(loginparol.password);
		cy.get(main_page.login_button).click();
		cy.get(result_page.title).contains(authorization.validation);
	})

	it('6. Влияние регистра на авторизацию (не должно влиять)', function() {
		cy.get(main_page.email).type('GeRmAn@dolnikov.ru');
		cy.get(main_page.password).type(loginparol.password);
		cy.get(main_page.login_button).click();
		cy.get(result_page.title).contains(authorization.success);
	})


	it('Доп. Влияние регистра в пароле на авторизацию', function() {
		cy.get(main_page.email).type(loginparol.login);
		cy.get(main_page.password).type('ILOVEQASTUDIO1');
		cy.get(main_page.login_button).click();
		cy.get(result_page.title).contains(authorization.fail);
	})

})