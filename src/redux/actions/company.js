import axios from 'axios'
import qs from 'qs'

export const getCompany = () => {
	return {
		type: 'GET_COM',
		payload: axios.get('http://localhost:8080/company'),
	}
}

export const addCompany = (createData, resToken) => {
	return {
		type: 'ADD_COM',
		payload: axios({
  		method: 'post',
  		url: 'http://localhost:8080/company',
  		data: qs.stringify(createData),
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
  		url: 'http://localhost:8080/company/' + comId,
  		data: qs.stringify(updateData),
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
  		url: 'http://localhost:8080/company/' + comId,
  		// data: qs.stringify(loginData),
  		headers: {
    		'content-type': 'application/x-www-form-urlencoded;charset=utf-8',
    		'authorization': resToken,
  		}
		})
	}
}
