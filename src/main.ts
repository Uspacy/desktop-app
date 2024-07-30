import { app, BrowserWindow } from 'electron';

import { initBadgeListener } from './utils/badge';
import { getStartUrl } from './utils/cluster';
import { setApplicationMenu } from './utils/menu';
import { createWindow } from './utils/window';

let canClose = false;
let mainWindow: BrowserWindow;
const start = () => {
	mainWindow = createWindow();
	initBadgeListener(mainWindow);
	setApplicationMenu(mainWindow);
	const url = getStartUrl();
	mainWindow.loadURL(url);
	mainWindow.on('close', (event) => {
		if (canClose) return;
		event.preventDefault();
		if (!mainWindow?.isMinimized()) mainWindow?.minimize();
	});
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
