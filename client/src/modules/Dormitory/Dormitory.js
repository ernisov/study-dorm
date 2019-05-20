import React, { Component } from 'react';
import { Tabs } from 'antd';
import './Dormitory.css';
import Map from './containers/Map';
const TabPane = Tabs.TabPane;

class Dormitory extends Component {
  render() {
    return (
      <div className='Dormitory'>
        <Tabs className='Tab' size='small'>
          <TabPane tab='Dormitory 1' key='1' className='TabPane'>
            <Map dormitory={1} floors={2}/>
          </TabPane>
          <TabPane tab='Dormitory 2' key='2' className='TabPane'>
            <p>No Data Yet</p>
          </TabPane>
          <TabPane tab='Dormitory 3' key='3' className='TabPane'>
            <p>No Data Yet</p>
          </TabPane>
        </Tabs>
      </div>
    );
  }
}

export default Dormitory;
