import crypto from 'crypto';
import fs from "fs/promises";
type KeyPair = {
    public: string;
    private: string;
};

function generateKeys(): Promise<KeyPair> {
    return new Promise((Ok, Err) => {
        crypto.generateKeyPair('rsa', {
            modulusLength: 2048, // lunghezza del modulo in bit
            publicKeyEncoding: {
                type: 'pkcs1', // formato della chiave pubblica
                format: 'pem' // formato di output
            },
            privateKeyEncoding: {
                type: 'pkcs1', // formato della chiave privata
                format: 'pem' // formato di output
            }
        }, (err, publicKey, privateKey) => {
            
            if (err) {
                return Err(err);
            }
            else {
                Ok({public: publicKey, private: privateKey});
            }
        });
        
    })
}

function storeKeys(keyPair: KeyPair): KeyPair {
    Promise.all([
        fs.writeFile('data/privateKey.pem', keyPair.private),
        fs.writeFile('data/publicKey.pem', keyPair.public)    
    ]).catch(console.error);
    return keyPair;
}
async function loadKeys(): Promise<KeyPair> {
    const [
        privateKey,
        publicKey
    ] = await Promise.all([
        fs.readFile('data/privateKey.pem', 'utf-8'),
        fs.readFile('data/publicKey.pem', 'utf-8'),
    ]);
    return { private: privateKey, public: publicKey };
}

export const keyPair = () =>  loadKeys().catch(
    err => generateKeys()
            .then(storeKeys)
);

// export async function signToken<T extends Object>(payload: T): Promise<string> {
//     const {private: privateKey} = await keyPair;
//     return jwt.sign(payload, privateKey, { algorithm: 'RS256', expiresIn: '2h'});
// }
// export async function verifyToken<T extends Object>(token: string): Promise<T & JwtPayload> {
//     const {public: publicKey} = await keyPair;
//     return jwt.verify(token, publicKey, { algorithms: ['RS256']}) as T & JwtPayload;
// }