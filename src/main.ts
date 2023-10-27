import { app } from 'electron';
import isDev from 'electron-is-dev';

import { getAppLocale } from './utils/locale';
import { setApplicationMenu } from './utils/menu';
import { createWindow } from './utils/window';

const start = () => {
	const mainWindow = createWindow();
	setApplicationMenu(mainWindow);

	if (isDev) mainWindow.loadURL('https://stage1.staging.uspacy.tech');
	else mainWindow.loadURL(`https://auth.uspacy.com?lng=${getAppLocale()}`);
};

app.whenReady().then(() => {
	start();
});

app.once('window-all-closed', () => app.quit());
