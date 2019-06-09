import React, { Component } from 'react';
import { connect } from 'react-redux';
import { allowedRoles } from '../../hoc/allowedRoles';
import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Checkbox,
  Tooltip,
  Icon,
  message
} from 'antd';
import moment from 'moment';
import './ApplicationForm.css';
import {
  onBirthDateChange,
  onIssuedDateChange,
  onPassportNumberChange,
  onIssuedByChange,
  onAgreementChange,
  onSubmit
} from './redux/actions';

const { MonthPicker, RangePicker } = DatePicker;
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

class ApplicationForm extends Component {
  componentDidUpdate() {
    const { passportNumberInvalid, issuedByInvalid, error, sent } = this.props;
    if (sent && error) {
      message.error(error);
    }

    if (sent && !error) {
      message.success('Success');
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

    return (
      <div className='ApplicationForm'>
        <div className='Form'>
          <h3>Application Form</h3>
          <Form {...formItemLayout}>
            <Form.Item required label='Date of birth'>
              <DatePicker
                onChange={this.props.onBirthDateChange}
                value={this.props.birthDate}
                format={dateFormatList} />
            </Form.Item>
            <Form.Item
              required
              validateStatus={this.props.passportNumberInvalid ? 'error' : ''}
              help={this.props.passportNumberInvalid ? this.props.error : null}
              label='Passport number'
            >
              <Input
                addonBefore='AN'
                allowClear
                value={this.props.passportNumber}
                onChange={this.props.onPassportNumberChange}
                suffix={(
                  <Tooltip title='Passport number must be 7 characters long'>
                    <Icon type='info-circle' />
                  </Tooltip>
                )}
              />
            </Form.Item>
            <Form.Item
              required
              validateStatus={this.props.issuedByInvalid ? 'error' : ''}
              help={this.props.issuedByInvalid ? this.props.error : null}
              label='Issued by'
            >
              <Input
                value={this.props.issuedBy}
                onChange={this.props.onIssuedByChange}
                addonBefore='MKK'
                allowClear
                suffix={(
                  <Tooltip title="MKK must be 5 characters long including '-'">
                    <Icon type='info-circle' />
                  </Tooltip>
                )}
              />
            </Form.Item>
            <Form.Item required label='Issued on'>
              <DatePicker
                onChange={this.props.onIssuedDateChange}
                value={this.props.issuedDate}
                format={dateFormatList} />
            </Form.Item>
            <div>
              <p>Обязуюсь:</p>
              <p>1. Выполнить правила внутреннего распорядка  в общежитии.</p>
              <p>
                2. Выполнить Государственный закон Кыргызской Республики №87-ФЗ "Об ограничении курения",<br />
                "Об охране здоровья граждан от взаимодействия окружающего табачного дыма и последсвтий потреблений табака".
              </p>
              <p>3. Выполнять требования органов студенческого самоуправления.</p>
              <p>В случае нарушения данных Обязательств расторгнуть договор проживания в студенческом общежитии.</p>
            </div>
            <Checkbox
              checked={this.props.agreed}
              onChange={this.props.onAgreementChange}>I Agree</Checkbox>
          </Form>
          <Button
            type="primary"
            className='application-submit'
            disabled={!this.props.agreed}
            onClick={this.props.onSubmit}
            htmlType='submit'
          >
            Submit
          </Button>
        </div>
      </div>
    );
  }
}

const roles = ['student', 'employee'];
const mapStateToProps = ({ applicationForm }) => ({
  birthDate: applicationForm.birthDate,
  issuedDate: applicationForm.issuedDate,
  passportNumber: applicationForm.passportNumber,
  issuedBy: applicationForm.issuedBy,
  passportNumberInvalid: applicationForm.passportNumberInvalid,
  issuedByInvalid: applicationForm.issuedByInvalid,
  agreed: applicationForm.agreed,
  error: applicationForm.error,
  sent: applicationForm.sent
});

const actions = {
  onBirthDateChange,
  onIssuedDateChange,
  onIssuedByChange,
  onPassportNumberChange,
  onAgreementChange,
  onSubmit
};

export default allowedRoles(roles)(connect(mapStateToProps, actions)(ApplicationForm));
