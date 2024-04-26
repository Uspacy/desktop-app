import { app } from 'electron';

import { initBadgeListener } from './utils/badge';
import { getStartUrl } from './utils/cluster';
import { setApplicationMenu } from './utils/menu';
import { createWindow } from './utils/window';

const start = () => {
	const mainWindow = createWindow();
	initBadgeListener(mainWindow);
	setApplicationMenu(mainWindow);
	const url = getStartUrl();
	mainWindow.loadURL(url);
};

app.whenReady().then(() => {
	start();
});

app.once('window-all-closed', () => app.quit());
