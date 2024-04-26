import { app, ipcMain } from 'electron';

export const initBadgeListener = () => {
	ipcMain.on('setBadgeCount', (_, data: { count: number }) => {
		app.setBadgeCount(data.count);
	});
};
