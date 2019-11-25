import axios from 'axios'
import qs from 'qs'

export const userLogin = (username, password) => {
	return {
		type: 'USER_LOGIN',
		payload: axios({
  		method: 'post',
  		url: 'http://localhost:8080/login',
  		data: qs.stringify({
  			username,
  			password
  		}),
  		headers: {
    		'content-type': 'application/x-www-form-urlencoded;charset=utf-8'
  		}
		})
	}
}

export const userLogout = () => {
	console.log('USER LOGOUT')
	return {
		type: 'USER_LOGOUT',
	}
}
