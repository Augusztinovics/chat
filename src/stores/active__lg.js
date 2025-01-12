import { defineStore } from 'pinia';

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
            },
            username_exists: {
              HU: 'Felhasználó név már foglalt',
              SR: 'Korisničko ime već postoji',
              EN: 'Username already exist',
            },
            accept_terms: {
              HU: 'Olvastam és elfogadom a feltételeket!',
              SR: 'Pročitao sam i prihvatam uslove i odredbe!',
              EN: 'I have read and accept the terms and conditions!',
            },
            password_repeate: {
              HU: 'Jelszó mégegyszer',
              SR: 'Ponovo lozinka',
              EN: 'Password again',
            },
            missing_password_repeate: {
              HU: 'Kérem ismételje meg jelszavát',
              SR: 'Ponovite lozinku',
              EN: 'Please repeat your password',
            },
            password_repeate_not_match: {
              HU: 'A két megadott jelszó nem egyezik',
              SR: 'Dve unete lozinke se ne poklapaju',
              EN: 'The two passwords entered do not match',
            },
            terms_not_accepted: {
              HU: 'A feltételeket el kell fogadnia! A feltételek:',
              SR: 'Morate prihvatiti uslove! Uslovi su:',
              EN: 'You must accept the terms! The conditions are:',
            },
            general_error: {
              HU: 'Valami nem sikerült, próbáld újra, frissítsd az oldalt, majd próbáld újra, vagy add fel!',
              SR: 'Nešto nije pošlo naopako, pokušajte ponovo, osvežite stranicu pa pokušajte ponovo ili jednostavno odustanite!',
              EN: 'Something wen\'t wrong, please try again, refresh the page then try again or just give up!',
            },
            home: {
                HU: 'Kezdőlap',
                SR: 'Početna',
                EN: 'Home',
            },
            profile: {
                HU: 'Adatlap',
                SR: 'Profil',
                EN: 'Profile',
            },
            logout: {
                HU: 'Kijelentkezés',
                SR: 'Odjava',
                EN: 'Logout',
            },
        },
    }),
    getters: {
        lg: (state) => {
            return (word) => {
              try {
                let result = state.words[word][state.activeLg];
                return result ?? word;
              } catch (error) {
                console.log(error);
                return word;
              }
            }
        },
        lgCode: (state) => {
          return state.activeLg;
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
