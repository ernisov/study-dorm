import React, { Component } from 'react';
import { Tabs } from 'antd';
import { connect } from 'react-redux';
import { onDormitoryChange } from './redux/actions';
import './Dormitory.css';
import { allowedRoles } from '../../hoc/allowedRoles';
import Map from './containers/Map';
const TabPane = Tabs.TabPane;

class Dormitory extends Component {
  render() {
    return (
      <div className='Dormitory'>
        <Tabs className='Tab' size='small' onChange={this.props.onDormitoryChange}>
          <TabPane tab='Dormitory 1' key='1' className='TabPane'>
            <Map dormitory={1} floors={2}/>
          </TabPane>
          <TabPane tab='Dormitory 2' key='2' className='TabPane'>
            <Map dormitory={2} floors={2}/>
          </TabPane>
          <TabPane tab='Dormitory 3' key='3' className='TabPane'>
            <Map dormitory={3} floors={2}/>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default allowedRoles(['admin', 'commandant'])(connect(null, { onDormitoryChange })(Dormitory));
