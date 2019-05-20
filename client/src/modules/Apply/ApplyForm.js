import React, { Component } from 'react';
import { Form, Input, Select, DatePicker,Button,Checkbox } from 'antd';
import moment from 'moment';
import './ApplyForm.css';

const { MonthPicker, RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';
const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];

class ApplyForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      agreed: false
    };
    this.onAgreementChange = this.onAgreementChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onAgreementChange(e) {
    this.setState({ agreed: e.target.checked });
  }

  onSubmit(e) {
    e.preventDefault();
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
      <div className='ApplyForm'>
        <div className='Form'>
          <h3>Application Form</h3>
          <Form {...formItemLayout}>
            <Form.Item required label='Date of birth'>
              <DatePicker
                defaultValue={moment('01/01/2015', dateFormatList[0])}
                format={dateFormatList} />
            </Form.Item>
            <Form.Item required label='Passport number'>
              <Input addonBefore="AN" defaultValue="" />
            </Form.Item>
            <Form.Item required label='Issued by'>
              <Input addonBefore="MKK" defaultValue="" />
            </Form.Item>
            <Form.Item required label='Issued on'>
              <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />
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
