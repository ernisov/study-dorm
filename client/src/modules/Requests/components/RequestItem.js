import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import moment from 'moment';
import './RequestItem.css';

const RequestItem = (props) => {
  let isServiceWorker = props.user.role === 'service';

  return (
    <div className='RequestItem'>
      <div className='RequestItem-row'>
        <div className='RequestItem-col'>
          <h5>{props.title}</h5>
          <p className='RequestItem-description'>{props.description}</p>
        </div>
        <div className='RequestItem-col'>
          <p><b>room: </b>{props.room}</p>
          <p><b>author: </b>{props.author}</p>
        </div>
      </div>
      <div className='RequestItem-row'>
        <div className='RequestItem-col'>
          <p><b>category: </b>{props.category}</p>
          <p><b>date: </b>{moment(props.date).format('DD.MM.YYYY')}</p>
        </div>
        <div className='RequestItem-buttons'>
          {isServiceWorker && props.status !== 'done'? (
            <Button type='primary' onClick={() => props.onSubmit(props)}>
              {props.status === 'awaiting' ? 'start' : 'finish'}
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps)(RequestItem);
