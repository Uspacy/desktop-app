import { importRemote as importRemoteMF } from 'module-federation-import-remote';
import { ComponentType } from 'react';
export type Scope = 'container' | 'auth' | 'chat' | 'profile' | 'newsfeed' | 'migration' | 'company' | 'tasks' | 'crm' | 'marketplace';

export const getPortByScope = (scope: Scope) => {
	switch (scope) {
		case 'container':
			return 3000;
		case 'auth':
			return 3001;
		case 'chat':
			return 3002;
		case 'profile':
			return 3003;
		case 'newsfeed':
			return 3004;
		case 'migration':
			return 3005;
		case 'company':
			return 3006;
		case 'tasks':
			return 3007;
		case 'crm':
			return 3008;
		case 'marketplace':
			return 3009;
	}
};

export const getUrlByScope = (scope: Scope) => {
	const port = getPortByScope(scope);
	if (process.env.NODE_ENV === 'development' && port) {
		return `http://localhost:${port}`;
	}
	return `https://auth.uspacy.com/${scope === 'container' ? '' : scope}`;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const importRemote = <T extends object>(scope: Scope, module: string, defaultComponent = (): any => null) => {
	const url = getUrlByScope(scope);
	return importRemoteMF<{ default: ComponentType<T> }>({ url, scope, module }).catch(() => {
		return { default: defaultComponent };
	});
};
