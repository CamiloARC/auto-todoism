import { Page, Locator } from '@playwright/test';

export class IntroPage {
    readonly page: Page;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginBtn = page.getByRole('navigation').getByRole('link', { name: 'Login' });
    }

    async goToLogin() {
        await this.page.goto('http://127.0.0.1:5000/');
        await this.loginBtn.waitFor({ state: 'visible' });
        await this.loginBtn.click();
    }
}