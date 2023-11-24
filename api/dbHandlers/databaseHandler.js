class databaseHandler {
    constructor() {
        this.db = null;
    }
    async connect() {
        throw new Error('Method "connect" must be implemented by subclasses.');
    }
    async close() {
        throw new Error('Method "close" must be implemented by subclasses.');
    }
    async getProduct(key) {
        throw new Error('Method "get" must be implemented by subclasses.');
    }
}

module.exports = {
    databaseHandler: databaseHandler
};