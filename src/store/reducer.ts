const INITIAL_STATE = {
  dados: '',
  Medics: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'SESSION_KEY':
      return {...state, dados: action.title};
  }
  switch (action.type) {
    case 'SET_ID':
      return {...state, Medics: [action]};
    default:
      return state;
  }
};
