
import * as React from "react";
import { DataGrid, ToolbarOptions } from "tubular-react";
import Snackbar from "@material-ui/core/Snackbar";
import { Container, Grid} from '@material-ui/core'
import {
	ColumnDataType,
	ColumnSortDirection,
	createColumn
  } from "tubular-common";
import { DataQueries, IQueryParams } from "../../dal/data-queries";


export interface DetailBaseComponentProps {
	row: any;
  }


  const columns = [	
	createColumn("key", {
		dataType: ColumnDataType.String,				
		label: "key",
		visible: false,	
		}),	
	createColumn("email", {
		dataType: ColumnDataType.String,
		filterable: true,		
		label: "Email",
		sortDirection: ColumnSortDirection.Ascending,
		sortOrder: 1,
		sortable: true
		}),
	createColumn("name", {
		dataType: ColumnDataType.String,
		filterable: true,
		label: "Name",
		sortable: true
		}),
	createColumn("phone", {
		dataType: ColumnDataType.String,
		filterable: true,                    
		label: "Phone",		
		}),			
	  ];  

  const toolbarOptions = new ToolbarOptions({
	advancePagination: true,
	enablePagination: true,
	exportButton: false,
	printButton: false,
	searchText: false,
  });

export default class AccountsListComponent extends React.Component {
	constructor(props) {
	  super(props);
	  this.state = {data: [], errorMessage: null};  	  
	
	}

	async componentDidMount() {
		await this.getData();
	}

	protected dbQueries = new DataQueries();
	protected queryParams: IQueryParams =
	{
		page: 1,
		rowsPerPage: 50,	
	};
	
	protected async getData()
	{
		const data = await this.dbQueries.getAccounts(null);
		this.setState({data: data});        
	}	  
	
	protected setErrorMessage = (errorMessage: string) => {this.setState({errorMessage: errorMessage})}

	protected rowClick(props: any, row: any) 
	{		
		props.history.push(`/account?primaryKey=${row.key}`);	 		 		
	}
	
	render() {
		return (
			<Container maxWidth="lg">
			<Grid container spacing={3}>
			<Grid item xs={12}>
				<h1>Accounts</h1>
			</Grid>
			<Grid item xs={12}>

			<div className="root">
			   {((this.state as any).errorMessage) as string && (
				<Snackbar
				anchorOrigin={{ vertical: "top", horizontal: "center" }}
				style={{ paddingTop: "10px" }}
				open={true}
				ContentProps={{ "aria-describedby": "message-id" }}
				message={<span id="message-id">{((this.state as any).errorMessage) as string}</span>}
				/>
			)}
			  <DataGrid
				columns={columns}
				dataSource={(this.state as any).data}
				gridName="AccountsGrid"        
				onError={this.setErrorMessage}
				toolbarOptions={toolbarOptions}
				onRowClick={(row) => this.rowClick(this.props, row)}
			  />
			</div>
			</Grid>
			</Grid>		
			</Container>	
		  );
	}
  }

  
  
  