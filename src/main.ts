import { app, BrowserWindow, ipcMain, Notification } from 'electron';

import { initBadgeListener } from './utils/badge';
import { getStartUrl } from './utils/cluster';
import { setApplicationMenu } from './utils/menu';
import { createWindow } from './utils/window';

let canClose = process.platform !== 'darwin';
let mainWindow: BrowserWindow;

const initNotificationListener = () => {
	ipcMain.on('show-notification', (event, { title, body, icon, data }) => {
		const notification = new Notification({
			title,
			body,
			icon: icon || undefined,
			silent: false,
		});

		notification.on('click', () => {
			if (mainWindow) {
				if (mainWindow.isMinimized()) mainWindow.restore();
				mainWindow.show();
				mainWindow.focus();
			}
			event.sender.send('notification-clicked', data);
		});

		notification.show();
	});
};

const start = () => {
	mainWindow = createWindow();
	initBadgeListener(mainWindow);
	initNotificationListener();
	setApplicationMenu(mainWindow);
	const url = getStartUrl();
	mainWindow.loadURL(url);
	mainWindow.on('close', (event) => {
		if (canClose) return;
		event.preventDefault();
		if (!mainWindow?.isMinimized()) mainWindow?.minimize();
	});
	mainWindow.webContents.ipc.on('restore-window', () => {
		if (mainWindow?.isMinimized()) mainWindow?.restore();
	});
	// Keep legacy handler for backwards compatibility
	mainWindow.webContents.ipc.on('respore-window', () => {
		if (mainWindow?.isMinimized()) mainWindow?.restore();
	});
};

app.whenReady().then(() => {
	start();
	app.on('activate', () => {
		if (mainWindow?.isMinimized()) mainWindow.restore();
	});
});

app.on('before-quit', () => {
	canClose = true;
	app.quit();
});
app.once('window-all-closed', () => {});
