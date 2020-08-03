import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import ContactsListComponent from './ui/contacts/contact-list-component';
import ContactFormComponent from './ui/contacts/contact-form-component';
import AccountsListComponent from './ui/accounts/account-list-component';
import AccountFormComponent from './ui/accounts/account-form-component';
import ContentLayout from './ui/content-layout';
import { Container, Grid } from '@material-ui/core';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ContactsIcon from '@material-ui/icons/Contacts';
import BusinessIcon from '@material-ui/icons/Business';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';

function ContentListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

/* Home component */
const Home = () => (
  <div>
    <Container maxWidth="lg">
			<Grid container alignItems="center" direction="row"  justify="center" spacing={2}>
        <Grid item xs={12}>
          <h1>Welcome to the Pharma Demo</h1>
        </Grid>
        <Grid item xs={6}>      
          <h2>Contacts</h2>
          <List>
            <ContentListItemLink button key={'Review your contacts'} href="/contacts">
                <ListItemIcon><ContactsIcon /></ListItemIcon>
                <ListItemText primary={'Review your contacts'} />
              </ContentListItemLink>
              <ContentListItemLink button key={'Add a new contact'} href="/contact">
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary={'Add a new contact'} />
              </ContentListItemLink>
          </List>          
        </Grid>
        <Grid item xs={6}>
        <h2>Accounts</h2>
        <List>
        <ContentListItemLink button key={'Review your accounts'} href="/accounts">
                <ListItemIcon><BusinessIcon /></ListItemIcon>
                <ListItemText primary={'Review your  Accounts'} />
              </ContentListItemLink>
              <ContentListItemLink button key={'Add a new account'} href="/account">
                <ListItemIcon><AddIcon /></ListItemIcon>
                <ListItemText primary={'Add a new account'} />
              </ContentListItemLink>
              </List>
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
      
      <Route path={["/home"]} component={Home} />      
      <Route path="/contacts" component={ContactsListComponent} />
      <Route path="/contact" component={ContactFormComponent} />
      <Route path="/accounts" component={AccountsListComponent} />      
      <Route path="/account" component={AccountFormComponent} />
    
     </div>
  );
}

