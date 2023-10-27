import isDev from 'electron-is-dev';

import { getClusterByLocale } from './locale';

export const getStartUrl = () => {
	if (isDev) return 'https://stage1.staging.uspacy.tech';
	const cluster = getClusterByLocale();
	return `https://auth.uspacy.${cluster}`;
};
