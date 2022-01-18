import { SafeHtml } from "@angular/platform-browser";
import { News, NewsResponse } from "src/app/models/news";
import { User, UserLogin } from "src/app/models/user";

/**
 * # MockSessionStorage
 * ## Description
 * Class to mock `SessionStorageService`. Stores key-value pairs in memory, instead of in browser session. Exposes the same methods as the `SessionStorageService`, so it can be swithced out for it without affecting the application. Used in unit tests where the tests run in headless mode, i.e. without a browser.
 * ## Example Usage
 * In the `TestBed` providers section, use this class as the provider for `SessionStorageService`,
 * ```javascript
 * TestBed.configureTestingModule({
 *  providers:[
 *      { provide: SessionStorageService, useClass: MockSessionStorage }
 *  ]}).compileComponents()
 * ```
 */
export class MockSessionStorage{

    /**
     * Object to hold key-value pairs in memory.
     */
    private session: any = {};

    constructor(){}

    /**
     * # Description
     * Retrieve a value from a key.
     * @param key 
     * @returns 
     */
    public retrieve(key: string): string{ return key in this.session ? this.session[key] : null; }

    /**
     * # Description
     * Store a value under a key.
     * @param key 
     * @param value 
     */
    public store(key: string, value: string): void { this.session[key] = `${value}`; }

    /**
     * # Description
     * Remove a key-value pair.
     * @param key 
     */
    public clear(key: string): void { delete this.session[key]; }
}

/**
 * # MockActivateRoute
 * ## Description
 * Class to mock `ActivatedRoute`. Uses constructor parameters to initialize an object that will expose the same properties as a normal `ActivatedRoute`, allowing for it to be switched out for the actual class without affecting the application. Used in unit tests where the tests run in headless mode, i.e. without a browser.
 * * ## Example Usage
 * In the `TestBed` providers section, use a factory method as the provider for `ActivatedRoute` and construct the instance with the paramaters desired,
 * ```javascript
 * TestBed.configureTestingModule({
 *  providers:[
 *      { provide: ActivatedRoute, useFactory: ()=>{ return new MockActivatedRoute('path/to/something', 1); } }
 *  ]}).compileComponents()
 */
export class MockActivatedRoute{

    /**
     * Object that simulates an `ActivatedRoute` snapshot.
     */
    public snapshot : any;
    
    /**
     * # Description
     * Construct an instance of a {@link MockActivatedRoute}
     * @param mockPath Path that is being mocked.
     * @param mockParam *Optional*. Path parameter that is being mocked. Defaults to `null`.
     */
    constructor(private mockPath: string, private mockParam: number | string | null = null){
        this.snapshot = {
            url: { 
                toString: () => { 
                    return this.mockParam ? `${this.mockPath}/${this.mockParam}` : this.mockPath ; 
                } 
            },
            params:{
                id: this.mockParam
            }
        }
    }

}

export class MockSanitizer{

    public bypassSecurityTrustHtml(content: any){ return content; }
}

export class MockNews{

    public mockNews : News;

    constructor(private news: News ={
        news_id: 57,  submitted: null,
        subject: ['test subject'], title: 'test title',
        snippet: 'test snippet', content: 'test content',
        comments: [], author: 'test author'
    }){ this.mockNews = news; }

    public getNewsResponse(): NewsResponse{ return { results: [ this.mockNews ] }; }

    public getNewsId(): number | null{ return this.mockNews.news_id; }
}

export const mockUser: User = {
    username: 'test', email: 'test', 
    business_name: 'test', address: 'test', 
    notifications: true
}

export const mockCredentials: UserLogin = {
    username: 'test', password: 'test'
}

// TODO: MockAuth class that generates tokens on the fly from inputted user name.

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