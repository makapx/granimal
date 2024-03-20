import sqlite, { RunResult, Statement } from "sqlite3";

export class Database {
    constructor( public db: sqlite.Database ) { }
    close() {
        this.db.close();
    }
    run(sql: string): Promise<RunResult>;
    run(sql: string, params: any): Promise<RunResult>;
    run(sql: string, ...params: any[]): Promise<RunResult> {
        return new Promise<RunResult>((Ok,Err) => {
            this.db.run(sql,...params, function(this: RunResult, error?: Error )  {
                if ( error ) {
                    Err(error);
                }
                else {
                    Ok(this);
                }
            })
        });
    }
    array<T>(sql: string): Promise<T[]>;
    array<T>(sql: string, params: any): Promise<T[]>;
    array<T>(sql: string, ...params: any[]): Promise<T[]> {
        return new Promise<T[]>((Ok,Err) => {
            this.db.all(sql,...params, function(this: Statement, error: Error|undefined, rows: Array<T> )  {
                if ( error ) {
                    Err(error);
                }
                else {
                    Ok(rows);
                }
            })
        });    
    }
    get<T>(sql: string): Promise<T>;
    get<T>(sql: string, params: any): Promise<T>;
    get<T>(sql: string, ...params: any[]): Promise<T> {
        return new Promise<T>((Ok,Err) => {
            this.db.get(sql,...params, function(this: Statement, error: Error|undefined, el: T )  {
                if ( error ) {
                    Err(error);
                }
                else {
                    Ok(el);
                }
            })
        });    
    }

    prepare(sql: string): (...params: any[]) => Promise<RunResult> {
        const prepare =  this.db.prepare(sql);
        return ( ...params: any[] ) => new Promise((Ok, Err) => {
            prepare.run(...params, function(this: RunResult, err: Error) {
                if ( err ) return Err(err);
                else return Ok(this);
            })
        });
    } 
}

const db = new Database(new sqlite.Database("data/database.db"));

db.run(`
    CREATE TABLE IF NOT EXISTS user (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT NOT NULL UNIQUE,
        password_hash TEXT NOT NULL,
        picture TEXT
    )
`).catch(console.error);

db.run(`
    CREATE TABLE IF NOT EXISTS anime (
        id INTEGER PRIMARY KEY,
        title TEXT NOT NULL,
        main_picture_medium TEXT,
        main_picture_large TEXT,
        popularity REAL,
        rank INT,
        mean REAL
    )
`).catch(console.error);

db.run(`
    CREATE TABLE IF NOT EXISTS watches  (
        user_id INTEGER NOT NULL,
        anime_id INTEGER NOT NULL,
        status INTEGER NOT NULL,
        rating REAL,
        progress INTEGER NOT NULL DEFAULT 0,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (anime_id) REFERENCES anime(id) ON DELETE CASCADE
    )
`).catch(console.error);

db.run(`
    CREATE TABLE IF NOT EXISTS review  (
        user_id INTEGER NOT NULL,
        anime_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        FOREIGN KEY (user_id,anime_id) REFERENCES watches(user_id,anime_id) ON DELETE NO ACTION
    )
`).catch(console.error);

process.once('beforeExit', db.close.bind(db));

export default db;