import { BrowserWindow, shell } from 'electron';
import isDev from 'electron-is-dev';

import { getUserAgent } from './userAgent';

export const createWindow = () => {
	const mainWindow = new BrowserWindow({
		icon: './assets/logo.png',
		webPreferences: {
			preload: `${__dirname}/preload.js`,
			devTools: isDev,
		},
	});
	mainWindow.webContents.userAgent = getUserAgent(mainWindow);
	mainWindow.maximize();
	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: 'deny' };
	});
	return mainWindow;
};

export const detectAuthPage = (mainWindow: BrowserWindow) => {
	if (isDev) return mainWindow.webContents.getURL().includes('staging.uspacy/auth');
	return mainWindow.webContents.getURL().includes('auth.uspacy');
};
