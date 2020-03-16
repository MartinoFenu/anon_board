import React from 'react';

const BoardListItem = props => {
  return (
    <div className="BoardItem" onClick={props.clickItem}>
      <h3 className='listResult_Title'>{props.data.name}</h3>
      <p className="description">{props.data.description}</p>
      <span className='counter'>Threads: {props.data.threadscount}</span>
    </div>
  )
}

export default BoardListItem;
