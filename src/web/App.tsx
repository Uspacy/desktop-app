import React, { lazy, Suspense } from 'react';

import { importRemote } from './helpers/importRemote';

const UspacyApp = lazy(() => importRemote<{ isDesktopApp: boolean }>('container', 'UspacyApp'));

export const App = () => {
	return (
		<>
			<Suspense fallback={null}>
				<UspacyApp isDesktopApp />
			</Suspense>
		</>
	);
};
