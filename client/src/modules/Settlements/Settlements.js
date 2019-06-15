import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allowedRoles } from '../../hoc/allowedRoles';
import { Button, Radio, List, Icon } from 'antd';
import {
  loadSettlements,
  onActionChange,
  clearSettlements
} from './redux/actions';
import './Settlements.css';
import Settlement from './components/Settlement';

const RadioGroup = Radio.Group;
const RadioButton = Radio.Button;

class Settlements extends Component {
  componentDidMount() {
    this.props.loadSettlements();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.action !== this.props.action) {
      this.props.loadSettlements();
    }
  }

  componentWillUnmount() {
    this.props.clearSettlements();
  }

  render() {
    let { list, loading, hasNextPage, action } = this.props;
    let loadMore = !loading && hasNextPage ? (
      <div className='list-load-more'>
        <Button onClick={this.props.loadSettlements}>
          load more
        </Button>
      </div>
    ) : null;

    return (
      <div className="Settlements">
        <div className="Settlements-header">
        <h3>Settlements: </h3>
        <RadioGroup
          onChange={this.props.onActionChange}
          value={this.props.action}
          defaultValue={this.props.action}
        >
          <RadioButton value='all'>All</RadioButton>
          <RadioButton value='settle'>settle</RadioButton>
          <RadioButton value='move'>move</RadioButton>
          <RadioButton value='unsettle'>unsettle</RadioButton>
        </RadioGroup>
        </div>
        <List
          className='Settlements-List'
          dataSource={list}
          loading={(loading && hasNextPage)}
          loadMore={loadMore}
          renderItem={(item) => (
            <Settlement key={item._id} {...item} />
          )}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  list: state.settlements.list,
  page: state.settlements.page,
  action: state.settlements.action,
  hasNextPage: state.settlements.hasNextPage,
  hasPrevPage: state.settlements.hasPrevPage,
  totalDocs: state.settlements.totalDocs,
  totalPages: state.settlements.totalPages,
  loading: state.settlements.loading
});

const roles = ['admin', 'commandant'];
const actions = {
  loadSettlements,
  onActionChange,
  clearSettlements
};

export default allowedRoles(roles)(connect(mapStateToProps, actions)(Settlements));
