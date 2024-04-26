import { app, BrowserWindow, ipcMain } from 'electron';
const Badge = require('electron-windows-badge');

export const initBadgeListener = (mainWindow: BrowserWindow) => {
	new Badge(mainWindow, {
		font: '16px arial',
	});
	ipcMain.on('update-badge', (_, count: number) => {
		app.setBadgeCount(count);
	});
};
