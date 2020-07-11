const gateway = 'http://localhost:8796';
const prometheus = `${gateway}/prometheus`;
const hades = `${gateway}/hades`;

export const csrfURL = `${gateway}/csrf`;
export const authenticateURL = `${prometheus}/authenticate`;
export const isAuthenticatedURL = `${authenticateURL}/currentUser`;
export const publicKeyURL = `${prometheus}/rsa`;
export const registerURL = `${prometheus}/register`;
export const clientsURL = `${prometheus}/clients`;

export const oauthURL = `${prometheus}/oauth`;
export const authorizeURL = `${oauthURL}/authorize`;
export const userInfoURL = `${oauthURL}/userinfo`;

export const documentsURL = `${hades}/documents`;
export const foldersURL = `${hades}/folders`;
