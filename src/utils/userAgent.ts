import { BrowserWindow } from 'electron';

export const getUserAgent = (mainWindow: BrowserWindow) => `${mainWindow.webContents.getUserAgent()} (DesktopApp)`;
