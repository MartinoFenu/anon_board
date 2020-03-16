import React, { lazy, Suspense } from 'react';
import RepliesListItem from '../Lists/RepliesListItem/RepliesListItem';
import Form from '../Form/Form';
import Loader from '../UI/Loader/Loader';
import useThreadPage from '../../hooks/useThreadPage';
import { useIsUserAuth } from '../../hooks/hooks';

const Modal = lazy(() => import('../UI/Modal/Modal')) ;

const Thread = () => {
  //thread hook
  const {
    state,
    isLoading,
    handleDeleteReply,
    handleReportThread,
    handleDeleteThread,
    isModalVisible,
    hideModal,
    initiModal,
    modalContent,
    newReplyFormController,
    deleteThreadFormController,
    dispatch
  } = useThreadPage();

  const isAuthenticated = useIsUserAuth();
  let threadPage = isLoading ? <Loader /> : <p>Thread page can't be loaded</p>;

  const newReplyForm = (
    <Form
      obj={newReplyFormController.state}
      handleSubmit={newReplyFormController.handleSubmit}
      handleChange={newReplyFormController.handleChange}
      isValid={newReplyFormController.isFormValid}
      serverErrorMessage={newReplyFormController.serverErrorMessage}
      action='Post new Reply'
      formClass='NewReplyForm' />
    );

  const deleteThreadForm = (
    <Form
      obj={deleteThreadFormController.state}
      handleSubmit={deleteThreadFormController.handleSubmit}
      handleChange={deleteThreadFormController.handleChange}
      isValid={deleteThreadFormController.isFormValid}
      serverErrorMessage={deleteThreadFormController.serverErrorMessage}
      action='Delete Thread'
      formClass='DeleteForm' />
    );
  const actionsBlock = (
    <div className='ActionsBlock'>
      {deleteThreadForm}
      <span className="Report Link" onClick={handleReportThread}> Report </span>
      {
        isAuthenticated ?
        <span
          className="AdminDelete Link"
          onClick={() => handleDeleteThread()}>Delete</span>
        : null
      }
    </div>
  );

  if(state.replies && !isLoading) {
    const replies = state.replies.map(el => <RepliesListItem
      key={el._id}
      data={el}
      dispatch={dispatch}
      handleDelete={handleDeleteReply}
      initiModal={initiModal} />
    );

    threadPage = (
      <>
        <h2>{state.title}</h2>
        <p>{state.text}</p>
        {actionsBlock}
        {newReplyForm}
        {replies}
      </>
    )
  }

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
      {threadPage}
    </div>

  )
};

export default Thread;
