import React, { Component } from 'react';
import { Form, Input, Select, DatePicker,Button,Checkbox } from 'antd';
import './ApplyForm.css';

import moment from 'moment';

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
       
    }

    onAgreementChange(e) {
        this.setState({ agreed: e.target.checked });
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
                    <h3>ApplyForm</h3>
                    <Form {...formItemLayout}>
                    
                    <Form.Item
                        required
                        label='Дата рождения'
                    >
                         <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />
                    </Form.Item>
                    <Form.Item
                        required
                        label='Номер паспорта'
                    >
                         <Input addonBefore="AN" defaultValue="" />
                    </Form.Item>
                    <Form.Item
                        required
                        label='Кем выдан'
                    >
                         <Input addonBefore="MKK" defaultValue="" />
                    </Form.Item>
                    <Form.Item
                        required
                        label='Когда выдан'
                    >
                          <DatePicker defaultValue={moment('01/01/2015', dateFormatList[0])} format={dateFormatList} />
                    </Form.Item>

                    <Form.Item
                        required
                        label='Состав семьи'
                    >      
                    </Form.Item>
                    <Form.Item
                        required
                        label='Отец'
                    >
                        <Input placeholder="ФИО" />
                    </Form.Item>
                    <Form.Item
                        required
                        label='Место работы'
                    >
                        <Input placeholder="Место работы" />
                        <div className='inform-button'>
                          <Button type="primary">Безработный</Button>
                        </div>
                    </Form.Item>
                    <Form.Item
                        required
                        label='Должность'
                    >
                        <Input placeholder="Должность" />
                    </Form.Item>
                    <Form.Item
                        required
                        label='Телефон'
                    >
                        <Input placeholder="Телефон" />
                    </Form.Item>
                    
                    <Form.Item
                        required
                        label='Мать'
                    >
                        <Input placeholder="ФИО" />
                    </Form.Item>
                    <Form.Item
                        required
                        label='Место работы'
                    >
                        <Input placeholder="Место работы" />
                        <div className="inform-button">
                          <Button type="primary">Безработный</Button>
                        </div>
                    </Form.Item>
                    <Form.Item
                        required
                        label='Должность'
                    >
                        <Input placeholder="Должность" />
                    </Form.Item>
                    <Form.Item
                        required
                        label='Телефон'
                    >
                        <Input placeholder="Телефон" />
                    </Form.Item>
                    <div className="">
                        <p>Обязуюсь:</p>
                        <p>1. Выполнить правила внутреннего распорядка  в общежитии.</p>
                        <p>2. Выполнить Государственный закон Кыргызской Республики №87-ФЗ "Об ограничении курения","Об охране здоровья граждан от взаимодействия окружающего табачного дыма и последсвтий потреблений табака".</p>
                        <p>3. Выполнять требования органов студенческого самоуправления.</p>
                        <p>В случае нарушения данных Обязательств расторгнуть договор проживания в студенческом общежитии.</p>

                    
                    </div>
                    <div>  
                    <Checkbox onChange={this.onAgreementChange}>Checkbox</Checkbox>
                   
                    </div>

                    <Button type="primary" block> Отправить </Button>

                    
                    
                    
                </Form>
                </div>
            </div>
            
        );
    }
}

export default ApplyForm;