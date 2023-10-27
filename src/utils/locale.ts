import { app } from 'electron';

export const getClusterByLocale = () => {
	const [locale] = app.getLocale().split('-');
	switch (locale) {
		case 'uk':
		case 'ru':
			return 'ua';
		case 'pl':
			return 'pl';
		case 'pt':
			return 'com.br';
		default:
			return 'com';
	}
};
