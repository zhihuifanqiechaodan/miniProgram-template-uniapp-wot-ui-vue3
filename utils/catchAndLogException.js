export default {
	install(app) {
		app.config.errorHandler = (err, vm, info) => {
			console.error('========================👇 catchAndLogException 👇========================\n\n', err, vm,
				info,
				'\n\n');
		}
	}
}