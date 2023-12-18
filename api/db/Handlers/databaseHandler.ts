class databaseHandler {
    constructor() {
        // this.db = null;
    }
    async connect() {
        throw new Error('Method "connect" must be implemented by subclasses.');
    }
    async close() {
        throw new Error('Method "close" must be implemented by subclasses.');
    }
    async getProducts() : Promise<any>{
        throw new Error('Method "get" must be implemented by subclasses.');
    }
    async getProduct(key:any) : Promise<any>{
        throw new Error('Method "get" must be implemented by subclasses.');
    }
    async query(params: { [key: string]: any }): Promise<any> {
        throw new Error('Method "query" must be implemented by subclasses.');
    }
}

export default { databaseHandler }