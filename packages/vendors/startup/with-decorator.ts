type Constructor = new (...args: any[]) => any;

function withAppDecorator<T extends Constructor>(App: T) {
	document.addEventListener('readystatechange', handler);

	function handler() {
		if (document.readyState !== 'complete') return;
		console.log('[app] : try to run app');

		try {
			new App();
			console.log('[app] : app is startup!');
		} catch (error: unknown) {
			console.error('[app] : running app failed!');
		}
	}

	return class extends App {
		constructor(...args: any[]) {
			super(...args);
		}
	};
}

export default withAppDecorator;
