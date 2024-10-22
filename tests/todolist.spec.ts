import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { TaskPage } from '../pages/TaskPage';
import { IntroPage } from '../pages/IntroPage';

test.describe("Suite de pruebas", () => {
    let introPage: IntroPage;
    let loginPage: LoginPage;
    let taskPage: TaskPage;

    test.beforeEach(async ({ page }) => {
        test.slow();
        introPage = new IntroPage(page);
        loginPage = new LoginPage(page);
        taskPage = new TaskPage(page);
        await introPage.goToLogin();
        await loginPage.loginWithTestAccount();
    });

    test('Add task', async ({ page }) => {
        await taskPage.addTask('Tarea1');
        await taskPage.verifyTaskVisible('Tarea1');
    });

    test('Complete task', async ({ page }) => {
        await taskPage.addTask('Tarea2');
        await taskPage.completeTask('Tarea2');
        await expect(page.locator('span:has-text("check_box Tarea2")')).toBeVisible();
    });

    test('Clear task', async ({ page }) => {
        await taskPage.addTask('Tarea3');
        await taskPage.completeTask('Tarea3');
        await taskPage.clearCompletedTasks();
        await expect(page.locator('text=Tarea3')).not.toBeVisible();
    });
})