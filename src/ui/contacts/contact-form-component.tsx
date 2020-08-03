// src/components/Hello.tsx

import * as React from 'react';
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import { IContact } from '../../dal/data-model';
import { DataQueries } from '../../dal/data-queries';
import { Container, Grid } from '@material-ui/core';

export default class ContactFormComponent extends React.Component {
	constructor(props) {
		super(props);
		 
		//this.state = { email: 'test', name: '', phone: '' }; // as IContact;
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
			const data: IContact = await this.dbQueries.getContact(this.primaryKey);
			if (data)			
			{
				this.setState({email: data.email});
				this.setState({name: data.name});
				this.setState({phone: data.phone});
			}
		}
	}
	
	protected dbQueries;

	onSubmitHandler = async (event) => {
		event.preventDefault();
		// let age = this.state.age;
		// if (!Number(age)) {
		//   alert("Your age must be a number");
		// }
		const contact: IContact =
		{
				key: this.primaryKey,
				name: (this.state as any).name,
				email: (this.state as any).email,
				phone: (this.state as any).phone,
		}
		//this.dalDb.addContact(contact);
		await this.dbQueries.upsertContact(contact);
		(this.props as any).history.push('/contacts');
	}
	onChangeHandler = (event) => {
		let nam = event.target.name;
		let val = event.target.value;
		this.setState({[nam]: val});
	}

	onDeleteHandler = async () => {
		await this.dbQueries.deleteContact(this.primaryKey);
		(this.props as any).history.push('/contacts');   		
	}
	render() {
		return (
			
			<Container maxWidth="lg">
			<Grid container spacing={3}>
			<Grid item xs={12}>
				<h1>Contact form</h1>
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
					variant="outlined"
					name='email'
					type="email"
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
					type="phone"
					value = {(this.state as any).phone}
					onChange={this.onChangeHandler}
					InputProps={{
						readOnly: this.isReadOnly,
					}}
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