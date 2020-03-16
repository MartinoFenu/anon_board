import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { newBoard } from '../schemas/formsSchemas';
import useDataFetch from './useDataFetch';
import useForms from './useForms';

const useDashboard = () => {
  //routing
  const history = useHistory();
  //data fetching
  const [newBoardState, newBoardCall] = useDataFetch();
  //form
  const { setServerErrorMessage: setNewBoardError, ...newBoardForm } = useForms(newBoard);

  useEffect(() => {
    if(newBoardState.statusCode === 200) history.push(`/${newBoardState.data.name}`);
    else if( newBoardState.statusCode >= 400 )
      setNewBoardError(newBoardState.data.error);
  }, [newBoardState, history, setNewBoardError])

  const handleSubmitBoard = (name, description) => {
    const expirationDate = localStorage.getItem('expirationDate');
    const now = new Date().getTime();
    if(expirationDate < now) history.push('/login');
    else {
      const token = localStorage.getItem('token');
      setNewBoardError(null);
      newBoardCall('POST', `/api/boards`, { name, description }, token);
    }
  }

  const newBoardFormController = {
    ...newBoardForm,
    handleSubmit: e => newBoardForm.handleSubmit(e, [newBoardForm.state.name.value, newBoardForm.state.description.value], handleSubmitBoard)
  };

  return {
    newBoardFormController
  }
}

export default useDashboard;
