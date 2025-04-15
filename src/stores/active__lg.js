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
            from_self: {
                HU: 'Magamról',
                SR: 'O sebi',
                EN: 'About myself',
            },
            lg_of_interest: {
                HU: 'Társalgási nyelv',
                SR: 'Konverzacijski jezik',
                EN: 'Conversational language',
            },
            country: {
                HU: 'Országod',
                SR: 'Država Prebivališta',
                EN: 'Country of Residence',
            },
            city: {
                HU: 'Város',
                SR: 'Grad',
                EN: 'City',
            },
            email: {
                HU: 'Email',
                SR: 'Email',
                EN: 'E-mail',
            },
            change_password: {
                HU: 'Jelszó Megváltoztatása',
                SR: 'Promeni Lozinku',
                EN: 'Change Password',
            },
            current_password: {
                HU: 'Jelenlegi Jelszó',
                SR: 'Trenutna Lozinka',
                EN: 'Current Password',
            },
            new_password: {
                HU: 'Új Jelszó',
                SR: 'Nova Lozinka',
                EN: 'New Password',
            },
            new_password_again: {
                HU: 'Új Jelszó Ismét',
                SR: 'Ponovo Nova Lozinka',
                EN: 'New Password Again',
            },
            save: {
                HU: 'Mentés',
                SR: 'Sačuvaj',
                EN: 'Save',
            },
            cancel: {
                HU: 'Mégse',
                SR: 'Otkaži',
                EN: 'Cancel',
            },
            delete_profile: {
                HU: 'Fiók Törlése',
                SR: 'Izbriši Nalog',
                EN: 'Delete Account',
            },
            saved: {
                HU: 'Elmentve',
                SR: 'Sačuvana',
                EN: 'Saved',
            },
            enter_valid_email: {
                HU: 'Kérem valós emailt adjon meg',
                SR: 'Unesite važeći e-mail',
                EN: 'Please enter a valid e-mail',
            },
            enter_different_email: {
                HU: 'Az email már foglalt, kérlek adj meg másikat',
                SR: 'Ovaj e-mail se već koristi, unesite drugi',
                EN: 'This e-mail already in use, please enter different one',
            },
            delete_notice: {
                HU: 'Figyelem! Bisztosan törölni szeretné fiókját és minden fiókjával kapcsolatos eseményt? Ez a művelet nem fisszafordítható!',
                SR: 'Pažnja! Da li ste sigurni da želite da izbrišete svoj nalog i sve događaje u vezi sa vašim nalogom? Ova operacija nije reverzibilna!',
                EN: 'Attention! Are you sure you want to delete your account and all events related to your account? This operation is not reversible!',
            },
            profile_img: {
                HU: 'Profil Kép',
                SR: 'Slika Profila',
                EN: 'Profile Image',
            },
            select_profile_img: {
                HU: 'Választjon egy profil képet',
                SR: 'Izaberite sliku profila',
                EN: 'Select a profile image',
            },
            img_upload_error: {
                HU: 'Hiba történt a kiválasztott kép olvasásánál, kérem választjon másik képet',
                SR: 'Došlo je do greške pri čitanju izabrane slike, izaberite drugu sliku',
                EN: 'An error occurred while reading the selected image, please choose another image',
            },
            contact_search: {
                HU: 'Ismerős keresése',
                SR: 'Nađi prijatelja',
                EN: 'Find a friend',
            },
            friend_requests: {
                HU: 'Barát kérelmek',
                SR: 'Zahtevi za prijatelje',
                EN: 'Friend requests',
            },
            send_requests: {
                HU: 'Elküldött kérelmek',
                SR: 'Zahtevi su poslati',
                EN: 'Requests sent',
            },
            user_search: {
                HU: 'Ismerős keresése felhasználó név alapján',
                SR: 'Potražite prijatelja po korisničkom imenu',
                EN: 'Search for a friend by username',
            },
            user_search_before: {
                HU: 'Keressél valakit...',
                SR: 'Nađi nekoga...',
                EN: 'Find someone...',
            },
            user_search_not_find: {
                HU: 'Sajnos nem találtunk senkit, próbálj másik nevet.',
                SR: 'Žao nam je, nismo mogli nikoga da pronađemo, pokušajte sa drugim imenom.',
                EN: 'Sorry, we couldn\'t find anyone, try another name.',
            },
            results: {
                HU: 'találat',
                SR: 'pogodak',
                EN: 'user(s) found',
            },
            friend_country: {
                HU: 'Ország',
                SR: 'Država',
                EN: 'Country',
            },
            friend_des: {
                HU: 'Bemutatkozó',
                SR: 'Predstavljamo',
                EN: 'Introducing',
            },
            send_message: {
                HU: 'Üzenet Küldése',
                SR: 'Pošalji Poruku',
                EN: 'Send Message',
            },
            accept_request: {
                HU: 'Kérelem Elfogadása',
                SR: 'Prihvati Zahtev',
                EN: 'Accept Request',
            },
            already_send: {
                HU: 'Már elküldve',
                SR: 'Već Poslati',
                EN: 'Already Send',
            },
            send_request: {
                HU: 'Kérelem Küldése',
                SR: 'Pošalji Zahtev',
                EN: 'Send Request',
            },
            sending: {
                HU: 'Küldés...',
                SR: 'Slanje...',
                EN: 'Sending...',
            },
            send: {
                HU: 'Küldés',
                SR: 'Pošalji',
                EN: 'Send',
            },
            few_words: {
                HU: 'Irj pár szavat leendő ismerősödnek:',
                SR: 'Napišite nekoliko reči svom budućem prijatelju:',
                EN: 'Write a few words to your future friend:',
            },
            addresse: {
                HU: 'Címzett:',
                SR: 'Za:',
                EN: 'Addresse:',
            },
            denie_request: {
                HU: 'Elutasít',
                SR: 'Odbij',
                EN: 'Refuse',
            },
            cancel_request: {
                HU: 'Visszavon',
                SR: 'Uzeti Nazad',
                EN: 'Take Back',
            },
            you_request_text: {
                HU: 'Üzeneted:',
                SR: 'Tvoj Poruka:',
                EN: 'Your Message:',
            },
            no_request_send_text: {
                HU: 'Nem üzentél semmit...',
                SR: 'Niste ništa poslali...',
                EN: 'You didn\'t message anything...',
            },
            not_send_any_request_yet: {
                HU: 'Nincs aktív kérelmed!',
                SR: 'Nemaš aktivnih zahteva!',
                EN: 'You have no active requests!',
            },
            frind_request_send: {
                HU: 'Kérelem sikeresen elküldve!',
                SR: 'Zahtev je uspešno poslat!',
                EN: 'Request sent successfully!',
            },
            frind_request_send_fail: {
                HU: 'Nemvárt esemény történt a kérelem küldése közben!',
                SR: 'Došlo je do neočekivanog događaja prilikom slanja zahteva!',
                EN: 'An unexpected event occurred while sending the request!',
            },
            frien_request_accepted: {
                HU: 'Gratulálun, új ismerősöd van!',
                SR: 'Čestitamo, imate novog prijatelja!',
                EN: 'Congratulations, you have a new friend!',
            },
            request_denited: {
                HU: 'Kérelmet sikeresen elutasítottad, többé már nem fog zavarni!',
                SR: 'Uspešno ste odbili zahtev, to vam više neće smetati!',
                EN: 'You have successfully rejected the request, it will not bother you anymore!',
            },
            request_canceled: {
                HU: 'Kérelmedet sikeresen visszavontad!',
                SR: 'Uspešno ste povukli svoj zahtev!',
                EN: 'You have successfully withdrawn your request!',
            },
            message: {
                HU: 'Üzenet',
                SR: 'Poruka',
                EN: 'Message',
            },
            no_message: {
                HU: 'Nem üzent semmit',
                SR: 'Nije ništa rekao',
                EN: 'Didn\'t say anything',
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
