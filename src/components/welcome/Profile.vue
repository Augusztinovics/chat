<template>
    <div class="content-body profile">
        <h1 class="m-2">{{ lg('profile') }}</h1>
        <div class="p-2">
            <div class="">
                <img v-if="userStore.profileImg" :src="userStore.profileImg" alt="Profile Image" class="profile-img md">
                <span v-else class="icon-lg"><IconUser /></span>
                <span class="icon-edit-btn ml-1" @click="showUpdateModal('IMG')"><IconEdit /></span>
            </div>
            <div class="mt-2">
                <h4>{{ userStore.username }}</h4>
            </div>
            <div class="mt-2">
                <p>{{ lg('from_self') }} <span role="button" class="icon-edit-btn ml-1" @click="showUpdateModal('DES')"><IconEdit /></span></p>
                <div class="self-preview">
                    <p>{{ userStore.description }}</p>
                </div>
            </div>
            <div class="mt-2">
                <p>{{ lg('lg_of_interest') }} <span class="icon-edit-btn ml-1" @click="showUpdateModal('LG')"><IconEdit /></span></p>
                <div v-if="userStore.lg == 'HU'" class="preview">
                    <h4>
                        <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#fff" d="M1 11H31V21H1z"></path><path d="M5,4H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z" fill="#be373c"></path><path d="M5,20H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z" transform="rotate(180 16 24)" fill="#4f6f52"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>
                        </span>
                        <span class="ml-05">Magyar</span>
                    </h4>
                </div>
                <div v-if="userStore.lg == 'SR'" class="preview">
                    <h4>
                        <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><path fill="#1a3d73" d="M1 11H31V21H1z"></path><path d="M5,4H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z" fill="#b8403f"></path><path d="M5,20H27c2.208,0,4,1.792,4,4v4H1v-4c0-2.208,1.792-4,4-4Z" transform="rotate(180 16 24)" fill="#fff"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path><path d="M13.669,9.423c.207-.03,.134-.355-.066-.293,.083-.137-.099-.295-.223-.194,.027-.145-.171-.234-.262-.122,.025-.143-.17-.232-.261-.121-.006-.128-.181-.185-.262-.087-.018-.133-.24-.222-.35-.151-.005-.129-.181-.188-.262-.089-.006-.132-.189-.186-.267-.082-.028-.124-.214-.149-.274-.037-.034-.129-.23-.142-.281-.019-.037-.09-.17-.117-.239-.047,.036-.198-.104-.402-.302-.439,.011-.101-.048-.17,.099-.15,.047,.19,.343-.106,.152-.152-.009-.086-.142-.086-.152,0-.131,.013-.095-.017-.099-.121,.146-.04,.006-.202-.076-.218-.082,.016-.222,.178-.076,.218-.003,.106,.031,.133-.099,.121-.01-.086-.143-.085-.151,0-.147,.039-.007,.202,.076,.218,.089-.014,.049-.089,.175-.066,.051,.261-.366,.174-.302,.589-.069-.07-.202-.043-.239,.047-.05-.123-.247-.11-.281,.019-.06-.112-.246-.087-.274,.037-.078-.105-.261-.05-.267,.082-.081-.099-.258-.04-.262,.089-.11-.071-.332,.018-.35,.151-.081-.098-.256-.04-.262,.087-.092-.11-.287-.022-.261,.121-.092-.112-.289-.023-.262,.122-.123-.101-.306,.057-.223,.194-.201-.062-.273,.264-.066,.293-.135,.06-.095,.28,.055,.285-.078,.097,.006,.254,.131,.24-.058,.084-.011,.161-.002,.254,.037,.088,.124,.04,.181,.06,.101,.354,.349,.588,.522,.918-.103,.031-.061,.143,.032,.125,.002-.003,.009,.039,.009,.04-.063,.095-.163,.347,.014,.397,.084,.152,.11,.048,.03,.186,.604,.244,1.466,.103,2.152,.161,.686-.058,1.549,.082,2.152-.161-.085-.143-.047-.035,.031-.186,.172-.045,.079-.304,.014-.397,0-.013,.004-.051,.025-.039,.086,.006,.111-.099,.017-.125,.173-.33,.421-.564,.522-.918,.056-.02,.146,.028,.181-.06,.011-.094,.055-.17-.002-.254,.125,.013,.209-.143,.131-.24,.15-.006,.19-.226,.055-.285Z" fill="#e6bd4c"></path><path d="M14.231,12.033v6.004c0,.983-.437,1.945-1.093,2.644s-1.573,1.18-2.595,1.18-1.939-.481-2.595-1.18-1.093-1.661-1.093-2.644v-6.004h7.375Z" fill="#b8403f"></path><path d="M10.543,21.888c-.967,0-1.896-.422-2.615-1.188-.699-.746-1.1-1.716-1.1-2.662v-6.031h7.43v6.031c0,.946-.401,1.917-1.1,2.662-.719,.767-1.647,1.188-2.615,1.188Zm-3.66-9.827v5.977c0,.932,.396,1.889,1.085,2.625,.708,.755,1.623,1.171,2.575,1.171s1.867-.416,2.575-1.171c.689-.735,1.085-1.692,1.085-2.625v-5.977H6.883Z" fill="#fff"></path><path d="M14.062,14.242c-.054-.845-.562-2.119-1.289-1.837,.458,1.041,.017,1.234-.784,2.183-.043-.024-.365-.015-.148-.114-.298-.151-.748-.725-.397-1.095,.178-.054,.416,.167,.513-.069,.253-.011,.44-.125,.445-.316-.183,.208-.391,.215-.613,.131-.176-.047-.228-.026-.081-.136,.202,.051,.141-.115,.283-.111,.127,0,.094,.301,.233,.135,.53-.48,.123-.628-.236-.725-.243-.169-1.021,.284-1.263,.257-.054,.142-.008,.274,.128,.259-.172,.284-.262,.573-.309,1.001,.049-.432-.395-.889-.195-1.037,.145-.357-.19-.162-.539-.381-.625-.34-1.741,.069-.861,.677,.173-.381,.165-.057,.432-.076,.255,.2-.578,.248-.7,.017,.021,.249,.408,.299,.585,.41,.441-.191,.609,.252,.448,.578-.162,.277-.342,.372-.468,.497,.22,.042-.124,.097-.147,.097-.463-.514-1.332-1.373-.869-1.89,.367-.961-1.206,.159-1.149,1.168-.317,1.488,.376,3.682,.131,5.243,.384-.004,.376-.526,.546-.022,.164-.098,.252-.307,.295-.549,.078,.262,.175-.027,.234-.147,.204-.055,.297-.522,.301-.785,.131,.294,.289-.257,.259-.477,.212,.507-.263,1.204-.545,1.501,.126,.089,.401,.013,.501-.108-.069,.223-.088,.532,.188,.271,.012,.322,.203,.203,.308-.088,.237,.412,.143-.137,.34-.407,.493,.48,.05,.778,.023,1.244,.155,.21-.384,.504-.265,.763,.299,.227-.592,.816-.119,1.002,.091,.022,.226,.094,.26-.046-.032,.183,.33,.263,.393,.112,.023,.156,.37,.192,.41,.031,.017,.163,.385,.164,.403,0,.039,.161,.387,.125,.41-.032,.062,.151,.425,.072,.394-.111,.035,.139,.171,.067,.262,.044,.38-.182-.177-.632-.213-.945,.313-.154-.167-.535-.234-.765,.218-.187-.135-.515-.187-.756,.168-.658,.393-.517,.465,.047,.19-.322,.208,.073,.38,.119,.107-.419,.422,.223,.262-.485,.1,.121,.375,.197,.501,.108-.282-.298-.756-.993-.545-1.501-.029,.22,.128,.772,.259,.477,.004,.264,.097,.731,.301,.785,.058,.118,.155,.41,.234,.147,.043,.242,.131,.45,.295,.549,.169-.509,.163,.022,.546,.022-.228-1.384,.357-3.571,.186-4.867Z" fill="#fff"></path></svg>
                        </span>
                        <span class="ml-05">Srpski</span>
                    </h4>
                </div>
                <div v-if="userStore.lg == 'EN'" class="preview">
                    <h4>
                        <span class="icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32"><rect x="1" y="4" width="30" height="24" rx="4" ry="4" fill="#071b65"></rect><path d="M5.101,4h-.101c-1.981,0-3.615,1.444-3.933,3.334L26.899,28h.101c1.981,0,3.615-1.444,3.933-3.334L5.101,4Z" fill="#fff"></path><path d="M22.25,19h-2.5l9.934,7.947c.387-.353,.704-.777,.929-1.257l-8.363-6.691Z" fill="#b92932"></path><path d="M1.387,6.309l8.363,6.691h2.5L2.316,5.053c-.387,.353-.704,.777-.929,1.257Z" fill="#b92932"></path><path d="M5,28h.101L30.933,7.334c-.318-1.891-1.952-3.334-3.933-3.334h-.101L1.067,24.666c.318,1.891,1.952,3.334,3.933,3.334Z" fill="#fff"></path><rect x="13" y="4" width="6" height="24" fill="#fff"></rect><rect x="1" y="13" width="30" height="6" fill="#fff"></rect><rect x="14" y="4" width="4" height="24" fill="#b92932"></rect><rect x="14" y="1" width="4" height="30" transform="translate(32) rotate(90)" fill="#b92932"></rect><path d="M28.222,4.21l-9.222,7.376v1.414h.75l9.943-7.94c-.419-.384-.918-.671-1.471-.85Z" fill="#b92932"></path><path d="M2.328,26.957c.414,.374,.904,.656,1.447,.832l9.225-7.38v-1.408h-.75L2.328,26.957Z" fill="#b92932"></path><path d="M27,4H5c-2.209,0-4,1.791-4,4V24c0,2.209,1.791,4,4,4H27c2.209,0,4-1.791,4-4V8c0-2.209-1.791-4-4-4Zm3,20c0,1.654-1.346,3-3,3H5c-1.654,0-3-1.346-3-3V8c0-1.654,1.346-3,3-3H27c1.654,0,3,1.346,3,3V24Z" opacity=".15"></path><path d="M27,5H5c-1.657,0-3,1.343-3,3v1c0-1.657,1.343-3,3-3H27c1.657,0,3,1.343,3,3v-1c0-1.657-1.343-3-3-3Z" fill="#fff" opacity=".2"></path></svg>
                        </span>
                        <span class="ml-05">English</span>
                    </h4>
                </div>
            </div>
            <div class="mt-2">
                <p>{{ lg('country') }} <span class="icon-edit-btn ml-1" @click="showUpdateModal('CO')"><IconEdit /></span></p>
                <div class="preview">
                    <h4>{{ userStore.country ? userStore.country : '-' }}</h4>
                </div>
            </div>
            <div class="mt-2">
                <p>{{ lg('city') }} <span class="icon-edit-btn ml-1" @click="showUpdateModal('CI')"><IconEdit /></span></p>
                <div class="preview">
                    <h4>{{ userStore.city ? userStore.city : '-' }}</h4>
                </div>
            </div>
            <div class="mt-2">
                <p>{{ lg('email') }} <span class="icon-edit-btn ml-1" @click="showUpdateModal('EM')"><IconEdit /></span></p>
                <div class="preview">
                    <h4>{{ userStore.email ? userStore.email : '-' }}</h4>
                </div>
            </div>
            <hr class="mt-2">
            <div class="mt-2">
                <button type="button" class="btn btn-primary" @click="showUpdateModal('PS')">{{ lg('change_password') }}</button>
            </div>
            <div class="mt-2">
                <button type="button" class="btn btn-danger" @click="showDeleteConfirmModal">{{ lg('delete_profile') }}</button>
            </div>
        </div>
        <Modal 
            :show="showModal"
            :size="modalSize"
            :title="modalTitle"
            :showFooter="false"
            @close="modalClose"
        >
            <DescriptionUpdate v-if="selectedUpdate == 'DES'"
                @startLoading="startLoad"
                @finishLoading="finishLoad"
                @success="successUpdate"
                @fail="failUpdate"
                @cancel="modalClose"
            />
            <UserLgUpdate v-if="selectedUpdate == 'LG'"
                @startLoading="startLoad"
                @finishLoading="finishLoad"
                @success="successUpdate"
                @fail="failUpdate"
                @cancel="modalClose"
            />
            <CountryUpdate v-if="selectedUpdate == 'CO'"
                @startLoading="startLoad"
                @finishLoading="finishLoad"
                @success="successUpdate"
                @fail="failUpdate"
                @cancel="modalClose"
            />
            <CityUpdate v-if="selectedUpdate == 'CI'"
                @startLoading="startLoad"
                @finishLoading="finishLoad"
                @success="successUpdate"
                @fail="failUpdate"
                @cancel="modalClose"
            />
            <EmailUpdate v-if="selectedUpdate == 'EM'"
                @startLoading="startLoad"
                @finishLoading="finishLoad"
                @success="successUpdate"
                @fail="failUpdate"
                @cancel="modalClose"
            />
            <PasswordUpdate v-if="selectedUpdate == 'PS'"
                @startLoading="startLoad"
                @finishLoading="finishLoad"
                @success="successUpdate"
                @fail="failUpdate"
                @cancel="modalClose"
            />
            <ImgUpdate v-if="selectedUpdate == 'IMG'"
                @startLoading="startLoad"
                @finishLoading="finishLoad"
                @success="successUpdate"
                @fail="failUpdate"
                @cancel="modalClose"
            />
        </Modal>
        <Modal
            :show="showDeleteConfirm"
            :showCancel="true"
            :cancelBtnText="lg('cancel')"
            :okBtnText="lg('delete_profile')"
            :title="lg('delete_profile')"
            :size="'sm'"
            :backdropClass="'delete-account-backdrop'"
            :headerClass="'delete-account-header'"
            :footerClass="'delete-account-footer'"
            @close="deleteCancel"
            @cancel="deleteCancel"
            @ok="deleteConfirm"
        >
            <div>
                <p>{{ lg('delete_notice') }}</p>
                <div class="mt-1 mb-1">
                    <label for="confirm_password_input">{{ lg('password') }} <span>*</span></label>
                    <div class="password-container">
                        <input id="confirm_password_input" :type="passwordInputType" :class="{'invalid-input': missingPassword}" v-model="password" @input="clearErrors">
                        <button type="button" @click="toogleShowPassword">
                            <span class="icon"><IconEyeClose v-if="showPassword" /><IconEyeOpen v-else /></span>
                        </button>
                    </div>
                    <p v-if="missingPassword" class="invalid-text">{{ lg('missing_password') }}</p>
                </div>
            </div>
        </Modal>
        <SuccessToast v-if="saveSuccess"/>
        <FailToast v-if="saveError"/>
    </div>
</template>

<script>
    import { mapStores, mapState } from 'pinia';
    import { userStore } from '@/stores/user';
    import { useLgStore } from '@/stores/active__lg';
    import { loadingStore } from '@/stores/loadin';
    import IconUser from '@/components/icons/IconUser.vue';
    import IconEdit from '@/components/icons/IconEdit.vue';
    import Modal from '@/components/Modal.vue';
    import DescriptionUpdate from './ProfileUpdates/DescriptionUpdate.vue';
    import SuccessToast from '@/components/SuccessToast.vue';
    import FailToast from '@/components/FailToast.vue';
    import UserLgUpdate from './ProfileUpdates/UserLgUpdate.vue';
    import CountryUpdate from './ProfileUpdates/CountryUpdate.vue';
    import CityUpdate from './ProfileUpdates/CityUpdate.vue';
    import EmailUpdate from './ProfileUpdates/EmailUpdate.vue';
    import PasswordUpdate from './ProfileUpdates/PasswordUpdate.vue';
    import IconEyeClose from '@/components/icons/IconEyeClose.vue';
    import IconEyeOpen from '@/components/icons/IconEyeOpen.vue';
    import ImgUpdate from './ProfileUpdates/ImgUpdate.vue';

    export default {
        components: {
            IconUser,
            IconEdit,
            Modal,
            DescriptionUpdate,
            SuccessToast,
            FailToast,
            UserLgUpdate,
            CountryUpdate,
            CityUpdate,
            EmailUpdate,
            PasswordUpdate,
            IconEyeClose,
            IconEyeOpen,
            ImgUpdate,
        },

        data() {
            return {
                showModal: false,
                selectedUpdate: '',
                saveError: false,
                saveSuccess: false,
                showDeleteConfirm: false,
                password: '',
                showPassword: false,
                missingPassword: false,
            }
        },
        computed: {
            ...mapStores(userStore, loadingStore),
            ...mapState(useLgStore, ['lg']),

            modalTitle() {
                switch (this.selectedUpdate) {
                    case 'DES':
                        return this.lg('from_self');
                    case 'LG':
                        return this.lg('lg_of_interest');
                    case 'CO':
                        return this.lg('country');
                    case 'CI':
                        return this.lg('city');
                    case 'EM':
                        return this.lg('email');
                    case 'PS':
                        return this.lg('change_password');
                    case 'IMG':
                        return this.lg('profile_img');
                    default:
                        return '';
                }
            },

            modalSize() {
                switch (this.selectedUpdate) {
                    case 'DES':
                        return 'md';
                    case 'IMG':
                        return 'md';
                    default:
                        return 'sm';
                }
            },

            passwordInputType() {
                return this.showPassword ? 'text' : 'password';
            },
        },
        methods: {
            modalClose() {
                this.showModal = false;
                this.selectedUpdate = '';
            },

            showUpdateModal(type) {
                this.selectedUpdate = type;
                this.showModal = true;
            },

            startLoad() {
                this.loadingStore.startLoading();
            },

            finishLoad() {
                this.loadingStore.finishLoading();
            },

            successUpdate() {
                this.modalClose();
                this.saveSuccess = true;
                setTimeout(() => {
                    this.saveSuccess = false;
                }, 3000);
            },

            failUpdate() {
                this.modalClose();
                this.saveError = true;
                setTimeout(() => {
                    this.saveError = false;
                }, 3000);
            },

            showDeleteConfirmModal() {
                this.missingPassword = false;
                this.password = '';
                this.showPassword = false;
                this.showDeleteConfirm = true;
                setTimeout(() => {
                    document.getElementById("confirm_password_input").focus();
                }, 300);
            },

            deleteCancel() {
                this.missingPassword = false;
                this.password = '';
                this.showPassword = false;
                this.showDeleteConfirm = false;
            },

            deleteConfirm() {
                if (this.password.trim().length < 6) {
                    this.password = '';
                    this.missingPassword = true;
                    document.getElementById("confirm_password_input").focus();
                    return;
                }

                this.loadingStore.startLoading();
                let payload = {
                    password: this.password
                }

                this.userStore.deleteUser(payload)
                    .then(() => {
                        this.loadingStore.finishLoading();
                        this.$router.push('/register');
                    })
                    .catch((e) => {
                        console.log(e);
                        this.loadingStore.finishLoading();
                        this.deleteCancel();
                        this.saveError = true;
                        setTimeout(() => {
                            this.saveError = false;
                        }, 3000);
                    });
            },

            clearErrors() {
                this.missingPassword = false;
            },

            toogleShowPassword() {
                this.showPassword = !this.showPassword;
            },
        },
    }
</script>