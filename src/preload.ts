import { ipcRenderer } from 'electron';

window.addEventListener('showNotification', (e: CustomEvent) => {
	const { title, body, icon } = e.detail;
	const notification = sendNotification(title, { body, icon, silent: false });
	notification.addEventListener('click', () => {
		const event = new CustomEvent('desktopNotificationClick', { detail: e.detail.data });
		ipcRenderer.send('respore-window');
		window.dispatchEvent(event);
	});
});

window.addEventListener('setBadgeCount', (e: CustomEvent) => {
	const { count = 0 } = e.detail;
	ipcRenderer.send('update-badge', count);
});

const sendNotification = (title: string, body: NotificationOptions) => {
	if (!('Notification' in window)) {
		return;
	}
	if (Notification.permission === 'granted') {
		return new Notification(title, body);
	}

	if (Notification.permission !== 'denied') {
		Notification.requestPermission().then((permission) => {
			if (permission === 'granted') {
				return new Notification(title, body);
			}
		});
	}
};

Notification.requestPermission();
