export const authService = {
    isAuthenticated() {
        return localStorage.getItem('isLoggedIn') === 'true'
    },

    setAuthenticated() {
        localStorage.setItem('isLoggedIn', 'true')
    },

    setUnauthenticated() {
        localStorage.setItem('isLoggedIn', 'false')
    },

    clear() {
        localStorage.removeItem('isLoggedIn')
    }
}
