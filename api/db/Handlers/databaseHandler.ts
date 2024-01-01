abstract class databaseHandler {
    abstract connect(): Promise<void>;
    abstract close(): Promise<void>;
}

export default databaseHandler;