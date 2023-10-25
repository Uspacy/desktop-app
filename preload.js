window.addEventListener('showNotification', (e) => {
	const { title, body, icon, chatId } = e.detail;
	const notification = sendNotification(title, { body, icon, silent: false });
	notification.addEventListener('click', () => {
		const event = new CustomEvent('desktopNotificationClick', { detail: { chatId } });
		window.dispatchEvent(event);
	});
});

const sendNotification = (title, body) => {
	if (!('Notification' in window)) {
		return;
	}
	if (Notification.permission === 'granted') {
		return new Notification(title, body);
	}

	if (Notification.permission !== 'denied') {
		Notification.requestPermission((permission) => {
			if (permission === 'granted') {
				return new Notification(title, body);
			}
		});
	}
};
