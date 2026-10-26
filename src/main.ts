import { app, BrowserWindow, ipcMain, Notification } from 'electron';

import { initBadgeListener } from './utils/badge';
import { getStartUrl } from './utils/cluster';
import { setApplicationMenu } from './utils/menu';
import { createWindow } from './utils/window';

let canClose = process.platform !== 'darwin';
let mainWindow: BrowserWindow;

const focusMainWindow = () => {
	if (!mainWindow) return;
	if (mainWindow.isMinimized()) mainWindow.restore();
	mainWindow.show();
	mainWindow.focus();
};

const initNotificationListener = () => {
	ipcMain.on('show-notification', (event, payload: { title: string; body: string; icon?: string; data?: unknown }) => {
		if (!payload || typeof payload.title !== 'string' || typeof payload.body !== 'string') {
			return;
		}
		const { title, body, icon, data } = payload;
		const notification = new Notification({
			title,
			body,
			icon: icon || undefined,
			silent: false,
		});

		notification.on('click', () => {
			focusMainWindow();
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

// A second instance sharing the same profile can't access storage locked by the first one and renders a blank window
if (!app.requestSingleInstanceLock()) {
	app.quit();
} else {
	app.on('second-instance', focusMainWindow);
	app.whenReady().then(() => {
		start();
		app.on('activate', () => {
			if (mainWindow?.isMinimized()) mainWindow.restore();
		});
	});
}

app.on('before-quit', () => {
	canClose = true;
	app.quit();
});
app.on('window-all-closed', () => {
	// On macOS closing the window only minimizes it, so the app keeps running
	if (process.platform !== 'darwin') app.quit();
});
