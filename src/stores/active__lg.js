import { defineStore } from 'pinia'

export const useLgStore = defineStore('active_lg', {
    state: () => ({
        activeLg: 'HU',
        words: {
            terms: {
              HU: 'Feltételek',
              SR: 'Uslovi',
              EN: 'Terms',
            },
            privacy: {
              HU: 'Adatvédelem',
              SR: 'Privatnost',
              EN: 'Privacy',
            },
            register: {
              HU: 'Regisztráció',
              SR: 'Registracija',
              EN: 'Register',
            },
            login: {
              HU: 'Bejelentkezés',
              SR: 'Prijavi',
              EN: 'Login',
            },
            username: {
              HU: 'Felhasználó név',
              SR: 'Korisničko ime',
              EN: 'Username',
            },
            password: {
              HU: 'Jelszó',
              SR: 'Lozinka',
              EN: 'Password',
            },
            no_account_yet: {
              HU: 'Még nem regisztrált?',
              SR: 'Još nema naloga?',
              EN: 'No account yet?',
            },
            remember_me: {
              HU: 'Emlékez rám',
              SR: 'Zapamti me',
              EN: 'Remember me',
            },
            missing_username: {
              HU: 'Kérem adja meg a felhasználó nevét',
              SR: 'Unesite korisničko ime',
              EN: 'Please enter the username',
            },
            invalid_user: {
              HU: 'Rosz jelszó, vagy felhasználói név',
              SR: 'Nevažeća lozinka ili korisničko ime',
              EN: 'Invalid password or username',
            },
            missing_password: {
              HU: 'Kérem adja meg a jelszavát',
              SR: 'Unesite lozinku',
              EN: 'Please enter the password',
            }
        },
    }),
    getters: {
        lg: (state) => {
            return (word) => {
              try {
                return state.words[word][state.activeLg];
              } catch (error) {
                console.log(error);
                return word;
              }
            }
        },
    },
    actions: {
        setActiveLg(lg) {
            if (lg === 'HU' || lg === 'SR' || lg === 'EN') {
                this.activeLg = lg;
            }
        },
    },
})
