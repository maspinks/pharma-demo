import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ContactsListComponent from './ui/contacts/contact-list-component';
import ContactFormComponent from './ui/contacts/contact-form-component';
import AccountsListComponent from './ui/accounts/account-list-component';
import AccountFormComponent from './ui/accounts/account-form-component';
import ContentLayout from './ui/content-layout';
import { Container, Grid } from '@material-ui/core';

/* Home component */
const Home = () => (
  <div>
    <Container maxWidth="lg">
			<Grid container >
			<Grid item xs={12}>
      <h1>Welcome to Pharma CRM</h1>
    </Grid>
    </Grid>
    </Container>
  </div>
);

export default function App() {

  return (
     <div>   
     <ContentLayout>     
     </ContentLayout>
      
      <Route path="/" component={Home} />
      <Route path="/Home" component={Home} />
      <Route path="/contacts" component={ContactsListComponent} />
      <Route path="/contact" component={ContactFormComponent} />
      <Route path="/accounts" component={AccountsListComponent} />      
      <Route path="/account" component={AccountFormComponent} />
    
     </div>
  );
}

