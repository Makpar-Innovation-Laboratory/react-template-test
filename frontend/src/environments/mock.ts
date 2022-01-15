import { News } from "src/app/models/news";

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
export const mock={ 
    auth:{
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
}

export const TEST_ID = 57;
export const TEST_NEWS : News = {
    news_id: TEST_ID, 
    submitted: null,
    subject: ['test'],
    title: 'test',
    snippet: 'test',
    content: 'test',
    comments: [],
    author: 'test'
}
export const TEST_RESULT={
  results: [ TEST_NEWS ]
}