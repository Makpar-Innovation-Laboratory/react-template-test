import { User, UserLogin } from "src/app/models/user";

/**
 * # MockSessionStorage
 * ## Description
 */
export class MockSessionStorage{

    /**
     * 
     */
    private session: any = {};

    constructor(){}

    /**
     * # Description
     * @param key 
     * @returns 
     */
    public retrieve(key: string): string{ return key in this.session ? this.session[key] : null; }

    /**
     * # Description
     * @param key 
     * @param value 
     */
    public store(key: string, value: string): void { this.session[key] = `${value}`; }

    /**
     * # Description
     * @param key 
     */
    public clear(key: string): void { delete this.session[key]; }
}

export const mockNews={
    news_id: 57,
    news: {
        news_id: 57,  submitted: null,
        subject: ['test'], title: 'test',
        snippet: 'test', content: 'test',
        comments: [], author: 'test'
    },
    news_response: {
        results: [
            {
                news_id: 57,  submitted: null,
                subject: ['test'], title: 'test',
                snippet: 'test', content: 'test',
                comments: [], author: 'test'
            }
        ]
    }
}

export const mockActivatedRoute = {
    snapshot: { 
      url: { toString: () => { return 'news/1'; } },
      params: { id: 1 }
    } 
  }

export const mockUser: User = {
    username: 'test', email: 'test', 
    business_name: 'test', address: 'test', 
    notifications: true
}

export const mockCredentials: UserLogin = {
    username: 'test', password: 'test'
}

/**
 * Mock JWT token with the following payload,
 * ```json
 * {
 *  "sub": "1234567890",
 *  "name": "fscottfitzgerald@makpar.com",
 *  "iat": 1516239022
 * }
 * ```
 */
 export const mockAuth={ 
    token:{
        ChallengeParameters: {},
        AuthenticationResult:{
            AccessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiY29nbml0bzp1c2VybmFtZSI6ImZzY290dGZpdHpnZXJhbGRAbWFrcGFyLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.dP75nndjNlujZH0n5VUa5C_LEhiercEwVJ5wmo97xlA',
            ExpiresIn: 3600,  
            TokenType: 'HS256',
            RefreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiY29nbml0bzp1c2VybmFtZSI6ImZzY290dGZpdHpnZXJhbGRAbWFrcGFyLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.dP75nndjNlujZH0n5VUa5C_LEhiercEwVJ5wmo97xlA',
            IdToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwiY29nbml0bzp1c2VybmFtZSI6ImZzY290dGZpdHpnZXJhbGRAbWFrcGFyLmNvbSIsImlhdCI6MTUxNjIzOTAyMn0.dP75nndjNlujZH0n5VUa5C_LEhiercEwVJ5wmo97xlA',
            Groups: [ 'Administrator', 'Developer' ]
        }
    },
    decoded_payload:{
        sub: 1234567890,
        name: "fscottfitzgerald@makpar.com",
        iat: 1516239022
    }
}