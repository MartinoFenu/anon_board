import * as actionTypes from './actionTypes';

export const localStateInit = state => {
  return {
    type: actionTypes.LOCAL_STATE_INIT,
    state
  }
}

export const deleteReply = replyId => {
  return {
    type: actionTypes.DELETE_REPLY,
    replyId
  }
}

export const newReply = reply => {
  return {
    type: actionTypes.NEW_REPLY,
    reply
  }
}
