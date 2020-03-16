import React from 'react';
import useReply from '../../../hooks/useReply';
import { useIsUserAuth } from '../../../hooks/hooks';
import Form from '../../Form/Form';

const RepliesListItem = props => {
  const {
    deleteReplyController,
    handleReport,
    handleDelete
  } = useReply(props.dispatch, props.initiModal);//dispatch to update thread state
  const isAuthenticated = useIsUserAuth();
  const deleteForm = (
    <Form
      obj={deleteReplyController.state}
      handleSubmit={e => deleteReplyController.handleSubmit(e, props.data._id)}
      handleChange={deleteReplyController.handleChange}
      isValid={deleteReplyController.isValid}
      serverErrorMessage={deleteReplyController.serverErrorMessage}
      action='Delete Reply'
      formClass='DeleteForm' />
  );
  const actionsBlock = (
    <div className="ActionsBlock">
      {deleteForm}
      <span className="Report Link" onClick={() => handleReport(props.data._id)}>Report</span>
      {
        isAuthenticated ?
        <span
          className="AdminDelete Link"
          onClick={() => handleDelete(props.data._id)}>Delete</span>
        : null
      }
    </div>
  );

  return (
    <div>
      <p className="text">{props.data.text}</p>
      {props.data.text !== '[deleted]' ? actionsBlock : null}
    </div>
  )
}

export default RepliesListItem;
