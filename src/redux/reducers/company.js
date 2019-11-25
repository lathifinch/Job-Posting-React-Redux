/* eslint-disable default-case */
const initState = {
	isLoading: false,
	isError: false,
	createMessage: '',
	updateMessage: '',
	deleteMessage: '',
	// number: 10,
	data: [],
}

const comReducer = (state = initState, action) => {
	switch (action.type) {
		case 'GET_COM_PENDING':
			return {
				...state,
				isLoading: true,
			}
		case 'GET_COM_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true,
			}
		case 'GET_COM_FULFILLED':
			return {
				...state,
				isLoading: false,
				isError: false,
				data: action.payload.data.result,
			}

		case 'ADD_COM_PENDING':
			return {
				...state,
				isLoading: true,
			}
		case 'ADD_COM_REJECTED':
			return {
				...state,
				isLoading: false,
				isError: true,
				createMessage: action.payload.message,
			}
		case 'ADD_COM_FULFILLED':
			return {
				...state,
				isLoading: false,
				isError: false,
				createMessage: action.payload.data.message,
				data: [...state.data, action.payload.data.result.company],
			}

		case 'EDIT_COM_PENDING':
      return {
        ...state,
        isLoading: true
      }
    case 'EDIT_COM_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError:true,
        updateMessage: action.payload.message,
      }
    case 'EDIT_COM_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError:false,
        updateMessage: action.payload.data.message,
        data: state.data.map(dat =>
        		({ ...dat, 
            ...((dat.id === action.payload.data.result.data.id) ? 
                action.payload.data.result.data : {})
          	})
        )
      }

    case 'DEL_COM_PENDING':
      return {
        ...state,
        isLoading: true,
      }
    case 'DEL_COM_REJECTED':
      return {
        ...state,
        isLoading: false,
        isError: true,
        deleteMessage: action.payload.message,
      }
    case 'DEL_COM_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isError: false,
        deleteMessage: action.payload.data.message,
        data: state.data.filter(dat => dat.id !== action.payload.data.result.id),
      }

		default:
			return state
	}
}

export default comReducer
