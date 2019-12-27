
const getSession = (): string | null => {
    return localStorage.getItem('@adopets/access-key')
}

const setSession = (token: string): void => {
    localStorage.setItem('@adopets/access-key', token)
}

export { getSession, setSession }