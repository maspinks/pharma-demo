import { IContact, IData, IAccount } from "./data-model";
import { openDB, DBSchema, IDBPDatabase } from 'idb';

const contactsTable = 'contacts';
const accountsTable = 'accounts';

export interface IQueryParams
{
	page: number;
	rowsPerPage: number;	
}


interface PharmCrmDB extends DBSchema {
	accounts: {
	  key: string;
	  value: IAccount;
	  indexes: { 'by-name': string, 'by-email': string };
	};
	contacts: {
	  value: IContact;
	  key: string;
	  indexes: { 'by-name': string, 'by-email': string };
	};
  }

export class DataQueries
{
	protected _db!: IDBPDatabase<PharmCrmDB>;

	protected async initialize()
	{
		if(this._db === null || this._db === undefined)
		{
			this._db = await openDB<PharmCrmDB>('pharma-crm-db', 1, {
				upgrade(db) {
				  const accountsStore = db.createObjectStore('accounts', {
					//keyPath: 'name',
					autoIncrement: true,
				  });
				  accountsStore.createIndex('by-name', 'name');
				  accountsStore.createIndex('by-email', 'email');
			
				  const contactsStore = db.createObjectStore('contacts', {
					//keyPath: 'email',
					autoIncrement: true,
				  });
				  contactsStore.createIndex('by-name', 'name');
				  contactsStore.createIndex('by-email', 'email');
				},
			  });

		}
	}

	//#region Contacts
	public async upsertContact(contact: IContact)
	{
		return await this.upsert(contactsTable, contact);
	}

	public async getContact(key: string)
	{	
		return await this.getSingleData(contactsTable, key);
	}

	public async deleteContact(key: string)
	{	
		return await this.deleteSingleData(contactsTable, key);
	}

	public async getContacts(query: any)
	{
		return await this.getListOfData<IContact>(contactsTable, query);
	}
	//#endregion
	
	//#region Accounts
	public async upsertAccount(account: IAccount)
	{
		return await this.upsert(accountsTable, account);
	}

	public async getAccount(key: string)
	{	
		return await this.getSingleData(accountsTable, key);
	}

	public async deleteAccount(key: string)
	{	
		return await this.deleteSingleData(accountsTable, key);
	}

	public async getAccounts(query: any)
	{
		return await this.getListOfData<IAccount>(accountsTable, query);
	}
	//#endregion


	protected async getListOfData<T>(tableName: any, query: any)
	{
		try
		{
			if (!this._db) { await this.initialize(); }
			let advanceValue: number;
			
			let dataBound;
			if (query)
			{
				const rowsPerPage =  (query as IQueryParams).rowsPerPage;
				const page = (query as IQueryParams).page;
			
				advanceValue = (page-1) * rowsPerPage;

				dataBound = IDBKeyRange.bound(advanceValue, advanceValue + rowsPerPage);
			}
				const data: T[] = [];
				const tx = this._db.transaction(tableName, "readonly");

				let cursor = dataBound
				 	? await tx.store.openCursor(dataBound)		
					: await tx.store.openCursor();				

				while (cursor) {
					const value = cursor.value;
					(value as IData).key = cursor.key;
					data.push(value);
					cursor = await cursor.continue();
				}

				return data;
			//}
			// else
			// {				
			// 	const data: T[] = await this._db.getAll(tableName); // TODO: add limit here
			// 	return data;
			// }
		}
		catch(e)
		{
			const errorMessage = `Encountered an error while trying to retrieving ${tableName} ${e}`;
			console.log(errorMessage);
		}
	}

	protected async getSingleData(tableName: any, key: string)
	{
		try
		{
			if (!this._db) { await this.initialize(); }
			const data = await this._db.get(tableName, +key); // should be typed
			return data;
		}
		catch(e)
		{
			const errorMessage = `Encountered an error while trying to retrieving ${tableName} ${e}`;
			console.log(errorMessage);
		}
	}

	protected async deleteSingleData(tableName: any, key: string)
	{
		try
		{
			if (!this._db) { await this.initialize(); }
			const data = await this._db.delete(tableName, +key); // should be typed
			return data;
		}
		catch(e)
		{
			const errorMessage = `Encountered an error while trying to deleting ${tableName} ${e}`;
			console.log(errorMessage);
		}
	}


	protected async upsert(tableName: any, data: any)
	{
		try
		{
			const dataKey = +data.key;
			data.key = null;
			if (!this._db) { await this.initialize(); }
			const value = dataKey
				 ? await this._db.put(tableName, data, dataKey)
				 : await this._db.put(tableName, data);
			return value;
		}
		catch(e)
		{
			const errorMessage = `Encountered an error while trying to upserting ${tableName} ${e}`;
			console.log(errorMessage);
		}
	}

	public async createDummyData()
	{
		for (let i=200; i<4000;i++)
		{
			const contact: IContact =
			{
				email: `email${i}`,
				phone: `phone${i}`,
				name: `name${i}`,
			}
			await this.upsertContact(contact);
		}
	}

}