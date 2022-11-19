import nprogress from 'nprogress'

export function showFullLoading() {
	nprogress.start('Loading...')
}

export function doneFullLoading() {
	nprogress.done()
}
