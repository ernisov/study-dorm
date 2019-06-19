import React from 'react';
import { connect } from 'react-redux';
import { Button } from 'antd';
import moment from 'moment';
import './RequestItem.css';
import i18next from '../../../i18n/i18n';

const RequestItem = (props) => {
  let isServiceWorker = props.user.role === 'service';
  let btnText = props.status === 'awaiting' ? 'start' : 'finish';

  return (
    <div className='RequestItem'>
      <div className='RequestItem-row'>
        <div className='RequestItem-col'>
          <h5>{props.title}</h5>
          <p className='RequestItem-description'>{props.description}</p>
        </div>
        <div className='RequestItem-col'>
          <p><b>{`${i18next.t('requests.request.room')}: `}</b>{props.room}</p>
          <p><b>{`${i18next.t('requests.request.author')}: `}</b>{props.author}</p>
        </div>
      </div>
      <div className='RequestItem-row'>
        <div className='RequestItem-col'>
          <p><b>{`${i18next.t('requests.request.category')}: `}</b>{i18next.t('requests.request.categories.' + props.category)}</p>
          <p><b>{`${i18next.t('requests.request.date')}: `}</b>{moment(props.date).format('DD.MM.YYYY')}</p>
        </div>
        <div className='RequestItem-buttons'>
          {isServiceWorker && props.status !== 'done'? (
            <Button type='primary' onClick={() => props.onSubmit(props)}>
              {i18next.t('requests.request.' + btnText)}
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
