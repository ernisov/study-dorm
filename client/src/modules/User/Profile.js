import React, { Component } from 'react';
import { Select } from 'antd';
import './Profile.css';
import { connect } from 'react-redux';
import { changeLanguage } from '../AppLoading/redux/actions';
import i18next from '../../i18n/i18n';

const Option = Select.Option;

class Profile extends Component {
  render() {
    return (
      <div className='Profile'>
        <div className='Profile-Aside'>
          <div className='Profile-Language'>
            <p>{i18next.t('profile.languageLabel')}</p>
            <Select
              className='Profile-Language-Select'
              onChange={this.props.changeLanguage}
              value={this.props.language}
            >
              <Option value='ky'>Кыргызча</Option>
              <Option value='en'>English</Option>
              <Option value='ru'>Русский</Option>
            </Select>
          </div>
        </div>
        <div className='Profile-Main'>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  language: state.app.language
});

export default connect(mapStateToProps, { changeLanguage })(Profile);
