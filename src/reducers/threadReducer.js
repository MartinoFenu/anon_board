import * as actionTypes from './actions/actionTypes';

const localStateInit = (state, action) => {
  return {
    ...state,
    ...action.state
  };
}

const deleteReply = (state, action) => {
  return {
    ...state,
    replies: state.replies.map(el => {
      if(el._id === action.replyId) return {...el, text: '[deleted]'}
      else return el
    })
  };
}

const newReply = ( state, action ) => {
  return {
    ...state,
    replies: [action.reply, ...state.replies]
  }
}

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case actionTypes.LOCAL_STATE_INIT:
      return localStateInit( state, action );
    case actionTypes.DELETE_REPLY:
      return deleteReply( state, action );
    case actionTypes.NEW_REPLY:
      return newReply( state, action );
    default:
      throw new Error();
  }
};

export default dataFetchReducer;
