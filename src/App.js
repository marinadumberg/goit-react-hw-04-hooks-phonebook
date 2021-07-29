import React, { Component } from "react";
import Section from "./components/Section/Section";
import Form from "./components/Form/Form";
import ContactsList from "./components/ContactsList/ContactsList";
import Filter from "./components/Filter/Filter";
import { v4 as unId } from "uuid";

export default class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

  isInList = (contact, contacts) =>
    contacts.find((cont) =>
      cont.name.toLocaleLowerCase().includes(contact.name.toLocaleLowerCase())
    );
  addContact = (e) => {
    const { contacts } = this.state;
    console.log({ contacts });
    const contact = {
      id: unId(),
      name: e.name,
      number: e.number,
    };

    this.isInList(contact, contacts)
      ? alert(`${contact.name} is already in your list`)
      : this.setState(({ contacts }) => ({
          contacts: [contact, ...contacts],
        }));
  };

  deleteContact = (contactId) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((cont) => cont.id !== contactId),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };
  componentDidMount() {
    // console.log('didmount');
    const contacts = localStorage.getItem("contacts");
    // console.log(contacts);
    const parsedContacts = JSON.parse(contacts);
    // console.log(parsedContacts);
    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  render() {
    const normalizeContacts = this.state.filter.toLocaleLowerCase();
    const visibleContacts = this.state.contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(normalizeContacts)
    );
    const { filter } = this.state;
    return (
      <div>
        <Section title="Phonebook">
          <Form onSubmit={this.addContact} />
        </Section>
        <Section title="Contacts">
          <Filter value={filter} onChange={this.changeFilter} />
          <ContactsList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </div>
    );
  }
}
