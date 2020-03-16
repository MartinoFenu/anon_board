import React from 'react';

const ThreadList = props => {
  return (
    <div className="ThreadItem">
      <div className="ThreadPreview" onClick={props.clickItem}>
        <h3 className='thread_title'>{props.data.title}</h3>
        <p className='thread_text'>{props.data.text}</p>
        <span className='counter'>Replies: {props.data.repliescount}</span>
      </div>
      <span
        className="ReportThread Link"
        onClick={props.reportThread} >
        Report Thread
      </span>
    </div>
  )
}

export default ThreadList;
