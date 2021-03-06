import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadAnnouncements, deleteAnnouncement } from '../redux/actions';
import moment from 'moment';
import { List, Button } from 'antd';
import './Announcements.css';
import i18next from '../../../i18n/i18n';

class Announcements extends Component {
  componentDidMount() {
    if (this.props.page === 1 && this.props.announcements.length === 0) {
      this.props.loadAnnouncements(this.props.page);
    }
  }

  render() {
    const { announcements, loading, hasNextPage } = this.props;
    const loadMore = hasNextPage ? (
      <div className='list-load-more'>
        <Button onClick={() => this.props.loadAnnouncements(this.props.page)}>
          {i18next.t('lists.loadMore')}
        </Button>
      </div>
    ) : null;

    return (
      <div className="Announcements">
        <h3>{i18next.t('announcements.title')}</h3>
          <List
            className='announcements-list'
            loading={(loading && hasNextPage)}
            itemLayout='horizontal'
            loadMore={loadMore}
            dataSource={announcements}
            renderItem={item => {
              let edit = (
                <Link to={{
                  pathname: `${this.props.match.path}/${item._id}/edit`,
                  state: item
                }}>
                  {i18next.t('announcements.edit')}
                </Link>
              );

              let deleteAnnouncement = (
                <span onClick={() => this.props.deleteAnnouncement(item._id)}>
                  {i18next.t('announcements.delete')}
                </span>
              );

              let actions = ['admin', 'commandant'].includes(this.props.user.role) ? [edit, deleteAnnouncement] : null;

              return (
                <List.Item actions={actions}>
                  <List.Item.Meta
                    title={`${item.title}`}
                    description={item.description} />
                    <div className='Announcement-date-container'>
                      <p><b>{moment(item.date).format('HH:mm')}</b></p>
                      <p>{moment(item.date).format('DD.MM.YYYY')}</p>
                    </div>
                </List.Item>
              );
            }} />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const {
    announcements,
    page,
    hasNextPage,
    hasPrevPage,
    totalDocs,
    totalPages,
    loading
  } = state.announcements;
  const user = state.user;

  return {
    announcements,
    page,
    hasNextPage,
    hasPrevPage,
    totalDocs,
    totalPages,
    loading,
    user
  }
}

export default connect(mapStateToProps, { loadAnnouncements, deleteAnnouncement })(Announcements);
