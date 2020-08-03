export interface IData
{
	key?: any;
} 

export interface IContact extends IData
{	name: string;
	email: string;
	phone: string;
}

export interface IAccount extends IData
{	
	name: string;
	email: string;
	phone: string;
	contacts?: number[];
}

// export class DAL
// {
// 	protected _db!: IDBDatabase;

// 	protected readonly contactsTable = 'contacts';
// 	protected readonly accountsTable = 'accounts';

// 	protected async initialize()
// 	{
// 		if(this._db === null || this._db === undefined)
// 		{
// 			const request = indexedDB.open("pharma-crm-db", 1);
// 			const promise = new Promise((resolve, reject) =>
// 			{               
// 				request.onsuccess = (event: any) =>
// 				{
// 					if (!this._db)
// 					{
// 						this._db = event.target.result;
// 					}
// 					resolve();
// 				};

// 			  request.onerror = (event: any) =>
// 			  {
// 				  const errorMsg = `Unable to establish connection to IndexedDB: ${event.target.error}`;
// 				  console.log(errorMsg);
// 				  reject(errorMsg);
// 			  };

// 			  request.onupgradeneeded = (event: any) =>
// 			  {
// 					if (!this._db)
// 					{
// 						this._db = event.target.result;
// 					}

// 					const contactsStore = this._db.createObjectStore(this.contactsTable, {keyPath: 'email'});
//         			contactsStore.createIndex('name', 'name', {unique: false});
// 					contactsStore.createIndex('phone', 'phone', {unique: false});  
					
// 					const accountsStore = this._db.createObjectStore(this.accountsTable, {keyPath: 'name'});        
//         			accountsStore.createIndex('address', 'address', {unique: false});
//         			accountsStore.createIndex('phone', 'phone', {unique: false});
// 			  };
				
// 			});
// 			await promise;
// 		}
// 	}

// 	public async addContact(contact: IContact)
// 	{
// 		if (!this._db) { await this.initialize(); }

// 		return new Promise<void>((resolve, reject) =>
// 		{
// 			const transaction = this._db.transaction(this.contactsTable, "readwrite");
// 			transaction.oncomplete = (event: any) =>
// 			{
// 				resolve();
// 			};

// 			transaction.onerror = (event: any) =>
// 			{
// 				reject();
// 			};
// 			transaction.objectStore(this.contactsTable).add(contact);
// 		});
// 	}	

// 	public async getContacts()
// 	{
// 		if (!this._db) { await this.initialize(); }

// 		return new Promise<IContact[]>((resolve, reject) =>
// 		{
// 			const transaction = this._db.transaction(this.contactsTable, "readonly");
// 			const contactsStore = transaction.objectStore(this.contactsTable);
// 			const contactsIndex = contactsStore.index('name');

// 			//var range = IDBKeyRange.bound(['101', 999],['101', 2001]);
// 			const contactsRequest = contactsIndex.openCursor();
// 			const contacts: IContact[] = [];

// 			contactsRequest.onsuccess = () =>
// 			{
// 				const cursor = contactsRequest.result;
// 				if (cursor)
// 				{
// 					const contact: IContact =
// 					{
// 						name: cursor.value.name,
// 						email: cursor.value.email,
// 						phone: cursor.value.phone,
// 					}
// 					contacts.push(contact);
// 					cursor.continue();
// 				}
// 				else
// 				{
// 					resolve(contacts);
// 				}
// 			}

// 			contactsRequest.onerror = (e) =>
// 			{
// 				const errorMessage = `Encountered an error while trying to retireve contacts ${e}`;
// 				console.log(errorMessage);
// 				reject(errorMessage);
// 			};			
// 		});
// 	}
// 	public async getContact(key: string)
// 	{
// 		if (!this._db) { await this.initialize(); }

// 		return new Promise<IContact>((resolve, reject) =>
// 		{
// 			const transaction = this._db.transaction(this.contactsTable, "readonly");
// 			const contactsStore = transaction.objectStore(this.contactsTable);			
// 			const contactsRequest = contactsStore.get(key);		

// 			contactsRequest.onsuccess = () =>
// 			{
// 				const cursor = contactsRequest.result;
// 				if (cursor)
// 				{
// 					const contact: IContact =
// 					{
// 						name: cursor.name,
// 						email: cursor.email,
// 						phone: cursor.phone,
// 					};					
// 					resolve(contact);
// 				}				
// 			}

// 			contactsRequest.onerror = (e) =>
// 			{
// 				const errorMessage = `Encountered an error while trying to retrieve contact ${e}`;
// 				console.log(errorMessage);
// 				reject(errorMessage);
// 			};			
// 		});
// 	}
// }