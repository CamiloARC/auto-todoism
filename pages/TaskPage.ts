import { Page } from '@playwright/test';

export class TaskPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async addTask(taskName: string) {
        await this.page.getByPlaceholder('What needs to be done?').click();
        await this.page.getByPlaceholder('What needs to be done?').fill(taskName);
        await this.page.getByPlaceholder('What needs to be done?').press('Enter');
    }

    async verifyTaskVisible(taskName: string) {
        await this.page.waitForSelector(`text=${taskName}`);
    }

    async completeTask(taskName: string) {
        await this.page.locator('span').filter({ hasText: `check_box_outline_blank ${taskName}` }).locator('i').click();
    }

    async clearCompletedTasks() {
        await this.page.getByText('clear_allClear').click();
    }
}