import React, { Component } from 'react';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Checkbox,
  message
} from 'antd';
import moment from 'moment';
import { request } from '../../api/requests';
import './ApplyForm.css';

const { MonthPicker, RangePicker } = DatePicker;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

class ApplyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      birthDate: moment('01/01/2015', dateFormatList[0]),
      issuedDate: moment('01/01/2015', dateFormatList[0]),
      passportNumber: '',
      passportNumberInvalid: false,
      issuedBy: '',
      issuedByInvalid: false,
      agreed: false
    };
    this.handleBirthDate = this.handleBirthDate.bind(this);
    this.onAgreementChange = this.onAgreementChange.bind(this);
    this.handlePassportNumber = this.handlePassportNumber.bind(this);
    this.handleIssuedBy = this.handleIssuedBy.bind(this);
    this.handleIssuedDate = this.handleIssuedDate.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleBirthDate(date, dateString) {
    this.setState({ birthDate: date });
  }

  handleIssuedDate(date, dateString) {
    this.setState({ issuedDate: date });
  }

  handlePassportNumber(e) {
    this.setState({
      passportNumber: e.target.value,
      passportNumberInvalid: false
    });
  }

  handleIssuedBy(e) {
    this.setState({
      issuedBy: e.target.value,
      issuedByInvalid: false
    });
  }

  onAgreementChange(e) {
    this.setState({ agreed: e.target.checked });
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.state.passportNumber.length !== 7) {
      this.setState({ passportNumberInvalid: true });
    }
    if (!this.state.issuedBy) {
      this.setState({ issuedByInvalid: true });
    }

    if (!this.state.passportNumberInvalid && !this.state.issuedByInvalid) {
      let submitObj = {
        birthDate: this.state.birthDate.toDate(),
        passportNumber: this.state.passportNumber,
        issuedBy: this.state.issuedBy,
        issuedDate: this.state.issuedDate.toDate()
      };
      request({
        method: 'post',
        url: '/applications',
        data: submitObj
      }).then((response) => {
        if (response.status === 200) message.success('success');
      }).catch((err) => {
        console.log(err);
        message.error('Couldn\'t perform operation ');
      });
    }
  }

  render() {
    const formItemLayout = {
      layout: 'vertical',
      wrapperCol: {
        sm: { span: 16 },
        md: { span: 10 }
      }
    };
    const inputError = 'Input is required';

    return (
      <div className='ApplyForm'>
        <div className='Form'>
          <h3>Application Form</h3>
          <Form {...formItemLayout}>
            <Form.Item required label='Date of birth'>
              <DatePicker
                onChange={this.handleBirthDate}
                value={this.state.birthDate}
                format={dateFormatList} />
            </Form.Item>
            <Form.Item
              required
              validateStatus={this.state.passportNumberInvalid ? 'error' : ''}
              help={this.state.passportNumberInvalid ? inputError : null}
              label='Passport number'
            >
              <Input
                addonBefore='AN'
                allowClear
                value={this.state.passportNumber}
                onChange={this.handlePassportNumber}  />
            </Form.Item>
            <Form.Item
              required
              validateStatus={this.state.issuedByInvalid ? 'error' : ''}
              help={this.state.issuedByInvalid ? inputError : null}
              label='Issued by'
            >
              <Input
                value={this.state.issuedBy}
                onChange={this.handleIssuedBy}
                addonBefore='MKK' />
            </Form.Item>
            <Form.Item required label='Issued on'>
              <DatePicker
                onChange={this.handleIssuedDate}
                value={this.state.issuedDate}
                format={dateFormatList} />
            </Form.Item>
            <div className="">
              <p>Обязуюсь:</p>
              <p>1. Выполнить правила внутреннего распорядка  в общежитии.</p>
              <p>
                2. Выполнить Государственный закон Кыргызской Республики №87-ФЗ "Об ограничении курения",<br />
                "Об охране здоровья граждан от взаимодействия окружающего табачного дыма и последсвтий потреблений табака".
              </p>
              <p>3. Выполнять требования органов студенческого самоуправления.</p>
              <p>В случае нарушения данных Обязательств расторгнуть договор проживания в студенческом общежитии.</p>
            </div>
            <Checkbox onChange={this.onAgreementChange}>I Agree</Checkbox>
          </Form>
          <Button
            type="primary"
            className='application-submit'
            disabled={!this.state.agreed}
            onClick={this.onSubmit}
            htmlType='submit'
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

export default ApplyForm;
