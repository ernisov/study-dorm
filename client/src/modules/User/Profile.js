import React, { Component } from 'react';
import './Profile.css';
import i18next from '../../i18n/i18n';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lang: 'en'
    };
    this.onLanguageChange = this.onLanguageChange.bind(this);
  }

  onLanguageChange() {
    let lang = this.state.lang === 'en' ? 'ru' : 'en';
    i18next.changeLanguage(lang)
      .then(() => this.setState({ lang }))
      .catch((err) => console.log(err));
  }

  render() {
    return (
      <div>
        <h3>
          Profile
        </h3>
        <p onClick={this.onLanguageChange}>{i18next.t('test')}</p>
      </div>
    );
  }
}

export default Profile;
