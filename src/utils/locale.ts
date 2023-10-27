import { app } from 'electron';

export const getAppLocale = () => {
	const [locale] = app.getLocale().split('-');
	switch (locale) {
		case 'uk':
		case 'ru':
			return 'uk';
		case 'en':
			return 'en-US';
		case 'pl':
			return 'pl';
		case 'pt':
			return 'pt-BR';
		default:
			return 'en-US';
	}
};
