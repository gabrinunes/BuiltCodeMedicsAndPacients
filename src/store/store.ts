import {createStore} from 'redux';

const INITIAL_STATE = {
  dados: '',
};

function persist(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case 'SESSION_KEY':
      return {...state, dados: action.title};
    default:
      return state;
  }
}

export default createStore(persist);
