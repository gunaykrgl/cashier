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
    async getProducts(){
        throw new Error('Method "get" must be implemented by subclasses.');
    }
    async getProduct(key:any) {
        throw new Error('Method "get" must be implemented by subclasses.');
    }
}

export default { databaseHandler }