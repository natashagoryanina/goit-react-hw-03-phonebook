import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { FormContainer } from './ContactsFormStyled';

class ContactsForm extends Component {
    state = { 
        name: '',
        number: ''
    };

    onFormChange = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]: value });
    };

    onFormSubmit = (e) => {
        const {name, number} = this.state;
        e.preventDefault();
        this.props.addContact({name: name, id:uuidv4(), number: number});
    };
    
    render() {
        return (
            <FormContainer onSubmit={this.onFormSubmit}>
                    <span className="formText">Name:</span>
                    <label className="formLabel">
                        <input
                            className="formInput"
                            type="text"
                            name="name"
                            onChange={this.onFormChange}
                            value={this.state.name}
                            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                            title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                            required
                        />
                    </label>
                    <span className="formText">Number:</span>
                    <label className="formLabel">
                        <input
                            className="formInput"
                            type="tel"
                            name="number"
                            onChange={this.onFormChange}
                            value={this.state.number}
                            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                            title="Номер телефона должен состоять цифр и может содержать пробелы, тире, круглые скобки и может начинаться с +"
                            required
                            />
                    </label>
                    <button className="addContactBtn" type="submit">
                        Add contact
                    </button>
            </FormContainer>
        );
    }
}

export default ContactsForm;