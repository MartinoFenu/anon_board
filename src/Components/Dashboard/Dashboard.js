import React from 'react';
import Form from '../Form/Form';
import useDashboard from '../../hooks/useDashboard';

const Dashboard = () => {
  const { newBoardFormController } = useDashboard();

  const boardForm = <Form
      obj={newBoardFormController.state}
      handleSubmit={newBoardFormController.handleSubmit}
      handleChange={newBoardFormController.handleChange}
      isValid={newBoardFormController.isFormValid}
      serverErrorMessage={newBoardFormController.serverErrorMessage}
      action='Post new board'
      formClass="NewBoardForm" />;
  return(
    <>{boardForm}</>
  )
}

export default Dashboard;
