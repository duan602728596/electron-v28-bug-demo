import * as path from 'node:path';
import { test, expect } from '@playwright/test';
import { _electron as electron } from '@playwright/test';
import electronPath from 'electron/index.js';
import { metaHelper } from '@sweet-milktea/utils';

const { __dirname } = metaHelper(import.meta.url);

test.describe('App', function() {
  test('Should render #app dom', async function() {
    const electronApp = await electron.launch({
      args: [path.join(__dirname, '../boot/main.js')],
      executablePath: electronPath
    });
    const win = await electronApp.firstWindow();
    await win.waitForSelector('#app');
    const navs = await win.$$('#app');
    expect(navs.length).toEqual(1);
    await electronApp.close();
  });
});