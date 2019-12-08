import axios from 'axios'
import qs from 'qs'

const {host, port} = require('../../hostport')

export const userLogin = (username, password) => {
	return {
		type: 'USER_LOGIN',
		payload: axios({
  		method: 'post',
  		url: 'https://'+host+'/login',
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
