class Auth {

    /**
     * @description set user's token in localStorage
     * @todo this isn't really 'authenticateUser', it's 'storeToken'. Should be refactored. 
     *          'authenticateUser' should make an API call to the /verify endpoint to check if
     *          token is still valid.
     * @param {string} token - user's JWT token
     */
    static authenticateUser(token) {
        localStorage.setItem('token', token)
    }

    /**
     * @description checks if the user has a token in localStorage
     * @todo see previous todo. This isn't really determining if user is authenticated. Needs to be
     *          refactored to make calls to API.
     * @returns {boolean} - if user's token exists in localStorage
     */
    static isUserAuthenticated() {
        return localStorage.getItem('token') !== null
    }

    /**
     * @description - remove user's token from localStorage
     * @returns {void}
     */
    static deauthenticateUser() {
        localStorage.removeItem('token')
    }

    /**
     * @description retrieve user's token from localStorage
     * @returns {string} token - user's token
     */
    static getToken() {
        return localStorage.getItem('token')
    }
}

export default Auth