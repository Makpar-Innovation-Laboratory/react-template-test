class Auth {

    /**
     * 
     * @param {*} token 
     */
    static authenticateUser(token) {
        localStorage.setItem('token', token)
    }

    /**
     * 
     * @returns 
     */
    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null
    }

    /**
     * 
     */
    static deauthenticateUser() {
        localStorage.removeItem('token')
    }

    /**
     * 
     * @returns 
     */
    static getToken() {
        return localStorage.getItem('token')
    }
}

export default Auth