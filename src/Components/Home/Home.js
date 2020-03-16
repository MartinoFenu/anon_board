import React, { useEffect } from 'react';
import BoardListItem from '../Lists/BoardListItem/BoardListItem';
import Loader from '../UI/Loader/Loader';
import useDataFetch from '../../hooks/useDataFetch';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const history = useHistory();
  const [state, apiCall] = useDataFetch();
  useEffect(() => {
    apiCall('GET', '/api/boards')
  }, [apiCall]);

  const handleClick = name => {
    history.push(`/${name}`)
  }
  let boards = state.isLoading ? <Loader /> : <p>Boards can't be loaded</p>;
  if(state.data.length > 0) {
    boards = state.data.map(el => <BoardListItem
      key={el._id}
      data={el}
      clickItem={() => handleClick(el.name)} />);
  }


  return (
    <div className="boards">HELLO HOME
      {boards}
    </div>
  )
}

export default Home;
