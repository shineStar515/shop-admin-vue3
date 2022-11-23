import nprogress from 'nprogress';

export function showFullLoading() {
	nprogress.start();
}

export function doneFullLoading() {
	nprogress.done();
}
