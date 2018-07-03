const getters = {
	sidebar: state => state.app.sidebar,
	language: state => state.app.language,
	namespace: state => state.app.namespace,

	token: state => state.user.token,
	name: state => state.user.name,
	introduction: state => state.user.introduction,
	roles: state => state.user.roles,
	menuRouters: state => state.permission.menuRouters,

	errorLogs: state => state.errorLog.logs
}
export default getters
