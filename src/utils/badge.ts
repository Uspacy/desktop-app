import { app, BrowserWindow, ipcMain } from 'electron';
const Badge = require('electron-windows-badge');

// Draws the count over the taskbar icon on Windows
let windowsBadge: { update(count: number): void } | undefined;

export const initBadgeListener = (mainWindow: BrowserWindow) => {
	windowsBadge = new Badge(mainWindow, {
		font: '16px arial',
	});
	ipcMain.on('update-badge', (_, count: number) => {
		app.setBadgeCount(count);
	});
};

// No unread count: the dock or launcher badge, and the taskbar overlay on Windows
export const clearBadge = () => {
	app.setBadgeCount(0);
	try {
		windowsBadge?.update(0);
	} catch (_) {
		// the window is gone
	}
};
