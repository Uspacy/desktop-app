import { BrowserWindow, Rectangle, shell } from 'electron';
import isDev from 'electron-is-dev';
import Store from 'electron-store';

export const store = new Store({ name: 'windowSettings' });

import { getUserAgent } from './userAgent';

export const createWindow = () => {
	const windowBounds = store.get('windowBounds') as Rectangle;
	const mainWindow = new BrowserWindow({
		icon: './assets/logo.png',
		webPreferences: {
			preload: `${__dirname}/preload.js`,
			devTools: isDev,
		},
		width: windowBounds?.width,
		height: windowBounds?.height,
		x: windowBounds?.x,
		y: windowBounds?.y,
	});
	mainWindow.webContents.userAgent = getUserAgent(mainWindow);
	if (!windowBounds) mainWindow.maximize();
	mainWindow.webContents.setWindowOpenHandler((details) => {
		shell.openExternal(details.url);
		return { action: 'deny' };
	});
	mainWindow.on('close', () => {
		store.set('windowBounds', mainWindow.getBounds());
	});
	return mainWindow;
};

export const detectAuthPage = (mainWindow: BrowserWindow) => {
	if (isDev) return mainWindow.webContents.getURL().includes('staging.uspacy/auth');
	return mainWindow.webContents.getURL().includes('auth.uspacy');
};
