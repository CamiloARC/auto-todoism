import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
    readonly page: Page;
    readonly getTestAccountBtn: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.getTestAccountBtn = page.getByText('Get a test account');
        this.loginBtn = page.locator('#login-btn');
    }

    async loginWithTestAccount() {
        await this.getTestAccountBtn.waitFor({ state: 'visible' });
        await this.getTestAccountBtn.click();
        await expect(this.page.getByText('Generate success.')).toBeVisible();
        await this.loginBtn.click();
    }
}