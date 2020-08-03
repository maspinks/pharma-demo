import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ContactsListComponent from './ui/contacts/contact-list-component';
import ContactFormComponent from './ui/contacts/contact-form-component';
import AccountsListComponent from './ui/accounts/account-list-component';
import AccountFormComponent from './ui/accounts/account-form-component';
import ContentLayout from './ui/content-layout';


/* Home component */
const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
);

export default function App() {

  return (
     <div>   
     <ContentLayout>     
     </ContentLayout>
      
      <Route path="/" component={Home} />
      <Route path="/contacts" component={ContactsListComponent} />
      <Route path="/contact" component={ContactFormComponent} />
      <Route path="/accounts" component={AccountsListComponent} />      
      <Route path="/account" component={AccountFormComponent} />
    
     </div>
  );
}

