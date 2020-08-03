import * as React from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { IAccount, IContactListItem } from '../../dal/data-model';
import { DataQueries } from '../../dal/data-queries';
import { Container, Grid } from '@material-ui/core';
import AccountContactLink from './account-contact';

export default class AccountFormComponent extends React.Component {
	constructor(props) {
		super(props);	 
		
		this.state = { email: '', name: '', phone: '' };

		this.dbQueries = new DataQueries();

		const params = new URLSearchParams((this.props as any).location?.search);

		this.isReadOnly = params.get("readonly") === 'true' ?? false;	
		this.primaryKey = params.get("primaryKey") ?? '';
	}

	protected isReadOnly: boolean;
	protected primaryKey: string;

	async componentDidMount() 
	{
		//await this.dbQueries.createDummyData();
		if (this.primaryKey)
		{
			const data: IAccount = await this.dbQueries.getAccount(this.primaryKey);
			if (data)			
			{
				this.setState({email: data.email});
				this.setState({name: data.name});
				this.setState({phone: data.phone});
				this.selectedContacts = data.contacts ?? [];
				this.setState({contacts: data.contacts});
			}
		}
	}

	protected selectedContacts : number[] = []
	protected dbQueries;

	onSubmitHandler = async (event) => {
		event.preventDefault();
		
		let phone =  (this.state as any).phone;
		let isValid = false;		
		var phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
		if (phone.match(phoneRegex))
		{
			isValid = true;				
		}
		else
		{
			alert("Invalid phone number.");
		}

		if (isValid)
		{
			const account: IAccount =
			{
					key: this.primaryKey,
					name: (this.state as any).name,
					email: (this.state as any).email,
					phone: (this.state as any).phone,
					contacts: this.selectedContacts,
			}

			await this.dbQueries.upsertAccount(account);
			(this.props as any).history.push('/accounts');
		}
	}
	onChangeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		this.setState({[nam]: val});
	}

	onDeleteHandler = async () => {
		await this.dbQueries.deleteAccount(this.primaryKey);
		(this.props as any).history.push('/accounts');   		
	}	

	onContactsChanged = (value)=>
	{
		this.selectedContacts = (value as IContactListItem[]).map(c => c.key);

		// const index = this.selectedContacts.indexOf(value, 0);
		// if (index > -1) {
		// 	if (!isSelected)
		// 	{
		// 		this.selectedContacts.splice(index, 1);
		// 	}
		// }
		// else
		// {
		// 	if (isSelected)
		// 	{
		// 		this.selectedContacts.push(value);
		// 	}
		// }
		//this.setState({contacts: contacts});  		
		//console.log(value);
	}
	render() {
		return (
			
			<Container maxWidth="lg">
			<Grid container spacing={3}>
			<Grid item xs={12}>
				<h1>Account form</h1>
			</Grid>
			<Grid item xs={12}>
			<form autoComplete="off" onSubmit={this.onSubmitHandler}>
			
			<TextField
					required
					id="name-input"
					label="Name"          
					variant="outlined"
					name='name'
					value = {(this.state as any).name}						
					onChange={this.onChangeHandler}
					InputProps={{
						readOnly: this.isReadOnly,
					}}
				/>
			<br/>
			<br/>
			<TextField
					required
					id="email-input"
					label="Email"
					type="email"
					variant="outlined"
					name='email'
					value = {(this.state as any).email}
					onChange={this.onChangeHandler}
					InputProps={{
						readOnly: this.isReadOnly,
					}}
				/>  
			<br/>
			<br/>
			<TextField
					required
					id="phone-input"
					label="Phone"          
					variant="outlined"
					name='phone'
					value = {(this.state as any).phone}
					onChange={this.onChangeHandler}
					InputProps={{
						readOnly: this.isReadOnly,
					}}
				/>  
			<br/>
			<br/>
			<AccountContactLink 
				onUpdateInput={this.onContactsChanged.bind(this)}
				initialContacts={(this.state as any).contacts}
			/>		




			

			<br/>
			<br/>
			<Button type='submit' color="primary">Save</Button>
			<br/>
			<br/>
			<Button onClick={this.onDeleteHandler} color="primary">Delete</Button>			 
			</form>
			</Grid>
			</Grid>		
			</Container>	
		);
	}
}
