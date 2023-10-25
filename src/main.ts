import { app, BrowserWindow } from 'electron';
import isDev from 'electron-is-dev';

const userAgent = 'DesktopApp';

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		icon: './assets/logo.svg',
		webPreferences: {
			devTools: isDev,
		},
	});

	mainWindow.maximize();

	// mainWindow.loadFile("dist/index.html");
	if (isDev) mainWindow.loadURL('https://stage1.staging.uspacy.tech/', { userAgent });
	else mainWindow.loadURL('https://auth.uspacy.com', { userAgent });
};

app.whenReady().then(() => {
	createWindow();
});

app.once('window-all-closed', () => app.quit());
