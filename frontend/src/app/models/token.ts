export interface Token{
    ChallengeParameters: Object,
    AuthenticationResult:{
        AccessToken: string,
        ExpiresIn: number,  
        TokenType: string,
        RefreshToken: string,
        IdToken: string
    }
}