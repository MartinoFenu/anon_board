import React, { lazy, Suspense } from 'react';
import ThreadList from '../Lists/ThreadList/ThreadList';
import Form from '../Form/Form';
import Loader from '../UI/Loader/Loader';
import useBoardPage from '../../hooks/useBoardPage';
import { useParams } from 'react-router-dom';
import {useIsUserAuth} from '../../hooks/hooks';

const Modal = lazy(() => import('../UI/Modal/Modal')) ;

const Board = () => {
  //board hook
  const {
    state,
    handleThreadClick,
    handleReportThread,
    isModalVisible,
    hideModal,
    modalContent,
    handleDeleteBoard,
    newThreadFormController
  } = useBoardPage();
  const { board_id } = useParams();
  const isAuthenticated = useIsUserAuth();
  let threads = state.isLoading ? <Loader /> : <p>Threads can't be loaded</p>;

  if(state.data.threads) {
    threads = state.data.threads.map(el => <ThreadList
      key={el._id}
      data={el}
      clickItem={() => handleThreadClick(el._id)}
      reportThread={() => handleReportThread(el._id)} />
    )
  }
  const newThreadForm = (
    <Form
      obj={newThreadFormController.state}
      handleSubmit={newThreadFormController.handleSubmit}
      handleChange={newThreadFormController.handleChange}
      isValid={newThreadFormController.isFormValid}
      serverErrorMessage={newThreadFormController.serverErrorMessage}
      action='Post new Thread'
      formClass='NewThreadForm' />
  );
  return (
    <div>
      {
        isModalVisible ?
        <Suspense fallback={<Loader />} >
          <Modal
            backDropClick={hideModal} >
            {modalContent}
          </Modal>
        </Suspense> :
        null
      }
      <h1>Welcome to {board_id}</h1>
      {
        isAuthenticated ?
        <span
          className="AdminDelete Link"
          onClick={() => handleDeleteBoard()}>Delete</span>
        : null
      }
      {newThreadForm}
      {threads}
    </div>
  )
};

export default Board;
