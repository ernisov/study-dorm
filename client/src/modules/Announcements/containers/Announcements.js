import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { loadAnnouncements, deleteAnnouncement } from '../redux/actions';
import { List, Button } from 'antd';
import './Announcements.css';

class Announcements extends Component {
  componentDidMount() {
    if (this.props.page === 1 && this.props.announcements.length === 0) {
      this.props.loadAnnouncements(this.props.page);
    }
  }

  render() {
    const { announcements, loading, hasNextPage } = this.props;
    const loadMore = hasNextPage ? (
      <div
        style={{
          textAlign: 'center',
          marginTop: 12,
          height: 32,
          lineHeight: '32px',
        }}
      >
        <Button
          onClick={() => this.props.loadAnnouncements(this.props.page)}
        >
          load more
        </Button>
      </div>
    ) : null;

    return (
      <div className="Announcements">
        <h3>Announcements</h3>
        <List
          className='announcements-list'
          loading={(loading && hasNextPage)}
          itemLayout='horizontal'
          loadMore={loadMore}
          dataSource={announcements}
          renderItem={item => {
            let edit = (
              <Link to={{
                pathname: `${this.props.match.path}/${item.id}/edit`,
                state: item
              }}>
                edit
              </Link>
            );

            let deleteAnnouncement = (
              <span onClick={() => this.props.deleteAnnouncement(item.id)}>
                delete
              </span>
            );

            return (
              <List.Item actions={[edit, deleteAnnouncement]}>
                <List.Item.Meta
                  title={`${item.title}`}
                  description={item.description}/>
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

  return {
    announcements,
    page,
    hasNextPage,
    hasPrevPage,
    totalDocs,
    totalPages,
    loading
  }
}

export default connect(mapStateToProps, { loadAnnouncements, deleteAnnouncement })(Announcements);
