import { useEffect, useReducer, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useDataFetch from './useDataFetch';
import useModal from './useModal';
import useForms from './useForms';
import { newReply, deletePassword } from '../schemas/formsSchemas';
import threadReducer from '../reducers/threadReducer';
import { AuthContext } from '../Context/Context';
import * as actions from '../reducers/actions/index';

const initialState = {
  title: '',
  text: '',
  replies: []
}

const useThreadPage = () => {
  //routing
  const history = useHistory();
  const { board_id, thread_id } = useParams();
  //API calls
  const [deleteThreadState, deleteCall] = useDataFetch();
  const [reportState, reportCall] = useDataFetch();
  const [thread, apiCall] = useDataFetch();
  const [newReplyState, newReplyCall] = useDataFetch();
  //local state
  const [state, dispatch] = useReducer( threadReducer, initialState );
  //modal
  const {
    isModalVisible,
    hideModal,
    modalContent,
    initiModal
  } = useModal(false);
  //forms
  const {
    setServerErrorMessage: newReplyServerError,
    onServerSuccessRes: onNewReplySuccess,
    ...newReplyForm
  } = useForms(newReply);
  const {
    setServerErrorMessage: deleteThreadServerError,
    ...deleteThreadForm
  } = useForms(deletePassword);
  //auth state
  const { authState } = useContext(AuthContext);
  useEffect(() => {
    //load thread with replies
    apiCall('GET', `/api/replies/${thread_id}`)
  }, [apiCall, thread_id]);

  useEffect(() => {
    if(thread.statusCode === 200)
      dispatch(actions.localStateInit(thread.data));
  }, [thread])

  useEffect(() => {
    //CALL MODAL WITH SUCCESS RESPONSE AND TIMEOUT TO REDIRECT
    if(deleteThreadState.statusCode === 200) history.replace(`/${board_id}`)
    else if( deleteThreadState.statusCode >= 400 ) {
      deleteThreadServerError(deleteThreadState.data.error);
    }
  }, [deleteThreadState, history, board_id, deleteThreadServerError]);

  useEffect(() => {
    if(newReplyState.statusCode === 200) {
      //form clenup after success
      onNewReplySuccess();
      dispatch(actions.newReply(newReplyState.data))
    } else if(newReplyState.statusCode >= 400)
      newReplyServerError(newReplyState.data.error)
  }, [newReplyState.data, newReplyState.statusCode, newReplyServerError, onNewReplySuccess])

  useEffect(() => {
    if(reportState.statusCode === 200) {
      initiModal('Successfully reported');
    }
  }, [reportState, initiModal]);

  const handleNewReply = ( text, delete_password) => {
    newReplyServerError(null);
    newReplyCall('POST', `/api/replies/${thread_id}`, { text, delete_password });
  }
  const handleReportThread = () => {
    reportCall('PATCH', `/api/threads/${board_id}`, {thread_id});
  }

  const handleDeleteThread = delete_password => {
    deleteThreadServerError(null);
    if(authState.isAuthenticated) return deleteCall('DELETE', `/api/threads/${board_id}`, { thread_id }, authState.token);

    deleteCall('DELETE', `/api/threads/${board_id}`, { thread_id, delete_password })
  }

  //controllers for forms, handlesubmit need the cb to make the api call
  const newReplyFormController = {
    ...newReplyForm,
    handleSubmit: e => newReplyForm.handleSubmit(e,[newReplyForm.state.text.value, newReplyForm.state.delete_password.value], handleNewReply)
  };
  const deleteThreadFormController = {
    ...deleteThreadForm,
    handleSubmit: e => deleteThreadForm.handleSubmit(e, [deleteThreadForm.state.delete_password.value], handleDeleteThread)
  };


  return {
    state,
    isLoading: thread.isLoading,
    handleReportThread,
    handleDeleteThread,
    isModalVisible,
    hideModal,
    initiModal,
    modalContent,
    newReplyFormController,
    deleteThreadFormController,
    dispatch
  };
}

export default useThreadPage;
