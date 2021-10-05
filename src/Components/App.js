import React, { Component } from 'react';
import ContactsForm from './contactsForm/ContactsForm';
import ContactsList from './contactsList/ContactsList';
import Filter from './filter/Filter';
import GlobalStyles from '../styles/globalStyles';

class App extends Component {
    state = { 
        contacts: [],
        filter: ''
    };

    componentDidMount() {
        const contactsArr = localStorage.getItem('contacts');
        const parsedContacts = JSON.parse(contactsArr);

        if(parsedContacts) {
            this.setState({contacts: parsedContacts});
        };
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.contacts !== prevState.contacts) {
            localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
        };
    };

    addContact = (contact) => {
        const {contacts} = this.state;
        const isCopy = contacts.some((item) => 
               item.name.toLowerCase() === contact.name.toLowerCase()
            );
        if(isCopy) {
            alert(`${contact.name} is already in contacts.`);
            return;
        }
        this.setState((prev) => ({
            contacts: [...prev.contacts, contact]
        }));
    };

    removeContactById = (id) => {
        this.setState((prev) => ({
            contacts: [...prev.contacts.filter(contact => contact.id !== id)]
        }));
    };

    onFilterChange = (e) => {
        const {name, value} = e.target;
        this.setState({ [name]: value });
    };

    contactsFilter = (e) => {
        const {contacts, filter} = this.state;
        const normalizedFilter = filter.toLowerCase();
        return contacts.filter(contact => 
            contact.name.toLowerCase().includes(normalizedFilter)
        );
    };

    render() {
        const visibleContacts = this.contactsFilter();
        return (
            <main>
                <GlobalStyles></GlobalStyles>
                <h1>Phonebook</h1>
                <ContactsForm addContact={this.addContact}/>
                <Filter 
                    value={this.state.filter} 
                    onChange={this.onFilterChange}
                />
                <h2>Contacts</h2>
                <ContactsList 
                    contacts={visibleContacts} 
                    removeContactById={this.removeContactById}
                />
            </main>

        );
    }
}

export default App;