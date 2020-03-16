import { useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import useDataFetch from './useDataFetch';
import useForms from './useForms';
import { deletePassword } from '../schemas/formsSchemas';
import { AuthContext } from '../Context/Context';
import * as actions from '../reducers/actions/index';

//It gets dispatch and initModal from thread to maintain the structure from the fcc challenge, otherwise it was easier making separate calls for replies and thread
const useReply = ( dispatch, initiModal ) => {
  //routing
  const { thread_id } = useParams();
  //API calls
  const [deleteReplyState, deleteReplyCall] = useDataFetch();
  const [reportState, reportCall] = useDataFetch();
  //state
  const { authState } = useContext(AuthContext);
  //forms
    const {
      setServerErrorMessage: deleteReplyServerError,
      onServerSuccessRes: onDeleteSuccess,
      ...deleteReplyForm
    } = useForms(deletePassword);

  useEffect(() => {
    if(reportState.statusCode === 200) {
      initiModal('Successfully reported');
    }
  }, [reportState, initiModal]);

  useEffect(() => {
    //reload or change state?
    if(deleteReplyState.statusCode === 200) {
      //cleanup form on server response
      onDeleteSuccess()
      dispatch(actions.deleteReply(deleteReplyState.data.id))
    }
    else if( deleteReplyState.statusCode >= 400 )
      deleteReplyServerError(deleteReplyState.data.error);
  }, [deleteReplyState, deleteReplyServerError, dispatch, onDeleteSuccess])

  const handleDelete = ( reply_id, delete_password) => {
    //clean error, if any, on submit
    deleteReplyServerError(null);
    if(authState.isAuthenticated) {
      return deleteReplyCall('DELETE', `/api/replies/${thread_id}`, {reply_id}, authState.token)
    }
    deleteReplyCall('DELETE', `/api/replies/${thread_id}`, {reply_id, delete_password})
  }

  const handleReport = id => {
    reportCall('PATCH', `/api/replies/${thread_id}`, {reply_id: id})
  }
  const deleteReplyController = {
    ...deleteReplyForm,
    handleSubmit: (e, id) => deleteReplyForm.handleSubmit(e, [id, deleteReplyForm.state.delete_password.value] ,handleDelete)
  }
  return {
    handleDelete,
    deleteReplyController,
    handleReport
  }
}

export default useReply;
