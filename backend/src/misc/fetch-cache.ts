import {LRUCache} from "lru-cache";
import crypto from "crypto"
const _fetch = global.fetch;
const cache = new LRUCache<string, Response>({
    max: 256,
    ttl: 5 * 60e3,
    updateAgeOnGet: false,
    updateAgeOnHas: true
})
global.fetch =  function fetch(
    input: string | URL | globalThis.Request,
    init?: RequestInit,
): Promise<Response> {
    const hash = crypto.createHash('sha256')
        .update(input.toString())
        .update(JSON.stringify(init ?? ''))
        .digest('hex');
    
    const hit = cache.has(hash);
    if ( hit ) {
        return Promise.resolve(cache.get(hash)?.clone() as Response)
    }
    else {
        return _fetch(input, init).then( response => {
            if ( response.ok )
                cache.set(hash, response.clone());
            return response.clone();
        })
    }

}
