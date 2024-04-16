export type CreateUserParams = {
  username: string;
  password: string;
  picture?: string;
};
export type LoginParams = {
  username: string;
  password: string;
};
export type ChangePasswordParams = {
  password: string;
};
export type ChangePictureParams = {
  picture: string;
};

export type TokenResult = { token: string };

/**
 * Creates a user
 * @param params 
 * @returns a new token
 */
export function createUser(params: CreateUserParams): Promise<TokenResult> {
  return fetch('/api/auth/signup', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  }).then(result => result.ok
    ? result.json() as Promise<TokenResult>
    : Promise.reject(result)
  );
}

/**
 * Tests if username exists
 * @param params 
 * @returns a new token
 */
export function usernameFree(username: string): Promise<boolean> {
  return fetch('/api/auth/username-free?username=' + encodeURI(username))
    .then( result => result.json().then(({exists}: {exists: boolean}) => exists));
}

/**
 * Authenticates a user
 * @param params 
 * @returns a new token
 */
export function loginUser(params: LoginParams): Promise<TokenResult> {
  return fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  }).then(result => result.ok
    ? result.json() as Promise<TokenResult>
    : Promise.reject(result)
  );
}

/**
 * Changes user's password
 * @param params 
 * @param token the user's authorized token
 * @returns a new token
 */
export function changeUserPassword(params: ChangePasswordParams, token: string): Promise<TokenResult> {
  return fetch('/api/user/password', {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(params)
  }).then(result => result.ok
    ? result.json() as Promise<TokenResult>
    : Promise.reject(result)
  );
}

/**
 * Changes user's profile picture
 * @param params 
 * @param token the user's authorized token
 * @returns a new token
 */
export function changeUserPicture(params: ChangePictureParams, token: string): Promise<TokenResult> {
  return fetch('/api/user/password', {
    method: 'PATCH',
    headers: { 
      'Content-Type': 'application/json', 
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(params)
  }).then(result => result.ok
    ? result.json() as Promise<TokenResult>
    : Promise.reject(result)
  );
}


const LS_KEY = 'GRANIMAL_JWT';
export function storeTokenIntoLocalStorage(token: string): void {
  localStorage.setItem(LS_KEY, token);
}
export function dropTokenFromLocalStorage(): void {
  localStorage.removeItem(LS_KEY);
}
export function loadTokenFromLocalStorage(): string | null {
  const token = localStorage.getItem(LS_KEY);
  return token;
}
