import { useEffect, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import useDataFetch from './useDataFetch';
import useModal from './useModal';
import useForms from './useForms';
import { newThread } from '../schemas/formsSchemas';
import { AuthContext } from '../Context/Context';

const useBoardPage = () => {
  //routing
  const history = useHistory();
  const { board_id } = useParams();
  //API calls
  const [postState, postCall] = useDataFetch();
  const [reportState, reportCall] = useDataFetch();
  const [state, apiCall] = useDataFetch();
  const [deleteBoardState, deleteCall] = useDataFetch();
  //modal
  const {
    isModalVisible,
    hideModal,
    modalContent,
    initiModal
  } = useModal(false);
  //form
  const {setServerErrorMessage: newThreadServerError, ...newThreadForm} = useForms(newThread);
  //auth state
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    //when landing, loads the content of the board (threads and boards description)
    apiCall('GET', `/api/threads/${board_id}`)
  }, [apiCall, board_id]);

  useEffect(() => {
    if(reportState.statusCode === 200) {
      initiModal('You have successfully reported this thread');
    }
  }, [reportState, initiModal])

  useEffect(() => {
    //after success redirects to new thread page
    if(postState.statusCode === 200 && postState.data.thread) {
      history.push(`${board_id}/${postState.data.thread}`)
    }
    else if(postState.statusCode >= 400) newThreadServerError(postState.data.error)
  }, [board_id, postState, history, newThreadServerError])

  useEffect(() => {
    //CALL MODAL WITH SUCCESS RESPONSE AND TIMEOUT TO REDIRECT
    if(deleteBoardState.statusCode === 200) history.replace(`/`)
  }, [deleteBoardState, history, board_id,]);

  const handleNewThread = ( title, text, delete_password) => {
    postCall('POST', `/api/threads/${state.data._id}`, {text, title, delete_password});
  }

  const handleThreadClick = id => {
    //click on a thread to go to the thread page
    history.push(`${board_id}/${id}`)
  }

  const handleReportThread = thread_id => {
    reportCall('PATCH', `/api/threads/${state.data._id}`, {thread_id})
  }

  const handleDeleteBoard = () => {
    deleteCall('DELETE', `/api/boards/`, { board_id: state.data._id }, authState.token);
  }

  const newThreadFormController = {
    ...newThreadForm,
    handleSubmit: e => newThreadForm.handleSubmit(e,[newThreadForm.state.title.value, newThreadForm.state.text.value, newThreadForm.state.delete_password.value], handleNewThread)
  }

  return {
    state,
    handleNewThread,
    handleThreadClick,
    handleReportThread,
    isModalVisible,
    hideModal,
    modalContent,
    handleDeleteBoard,
    newThreadFormController
  }
}

export default useBoardPage;
