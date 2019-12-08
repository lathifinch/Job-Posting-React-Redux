import axios from 'axios'
import qs from 'qs'

const {host, port} = require('../../hostport')

export const getCompany = () => {
	return {
		type: 'GET_COM',
		payload: axios.get('https://'+host+'/company'),
	}
}

export const addCompany = (createData, resToken) => {
	return {
		type: 'ADD_COM',
		payload: axios({
  		method: 'post',
  		url: 'https://'+host+'/company',
  		data: createData,
  		headers: {
    		'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    		'authorization': resToken,
  		}
		})
	}
}

export const editCompany = (updateData, comId, resToken) => {
	return {
		type: 'EDIT_COM',
		payload: axios({
  		method: 'patch',
  		url: 'https://'+host+'/company/' + comId,
  		data: updateData,
  		headers: {
    		'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    		'authorization': resToken,
  		}
		})
	}
}

export const delCompany = (comId, resToken) => {
	return {
		type: 'DEL_COM',
		payload: axios({
  		method: 'delete',
  		url: 'https://'+host+'/company/' + comId,
  		// data: qs.stringify(loginData),
  		headers: {
    		'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    		'authorization': resToken,
  		}
		})
	}
}
