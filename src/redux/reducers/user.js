const initState = {
	isLoadingIn: false,
	isErrorIn: false,
	loginMessage: '',
	isLoadingOut: false,
	isErrorOut: false,
	token: '',
	username: '',
}

const userReducer = (state = initState, action) => {
	switch (action.type) {

		// user login
		case 'USER_LOGIN_PENDING':
			return {
				...state,
				isLoadingIn: true,
			}
		case 'USER_LOGIN_REJECTED':
			return {
				...state,
				isLoadingIn: false,
				isErrorIn: true,
				loginMessage: action.payload.response.data.status + ', ' + action.payload.response.data.message,
			}
		case 'USER_LOGIN_FULFILLED':
			return {
				...state,
				isLoadingIn: false,
				isErrorIn: false,
				loginMessage: action.payload.data.message,
				token: action.payload.data.result.authorization,
				username: action.payload.data.message.substring(9, action.payload.data.message.length),
			}

		// user logout
		// case 'USER_LOGOUT_PENDING':
		// 	return {
		// 		...state,
		// 		isLoadingOut: true,
		// 	}
		// case 'USER_LOGOUT_REJECTED':
		// 	return {
		// 		...state,
		// 		isLoadingOut: false,
		// 		isErrorOut: true,
		// 	}
		// case 'USER_LOGOUT_FULFILLED':
		// 	return {
		// 		...state,
		// 		isLoadingOut: false,
		// 		isErrorOut: false,
		// 		token: '',
		// 		username: '',
		// 	}
		case 'USER_LOGOUT':
			return {
				...state,
				loginMessage: '',
				token: '',
				username: '',
			}

		default:
			return state
	}
}

export default userReducer
