<template>
    <div class="profile-updates">
        <div class="profile-updates-body">
            <div class="profile-updates-img-preview">
                <span v-if="newImgUrl" class="profile-updates-img-holder">
                    <img :src="newImgUrl" class="profile-img md" alt="Profile Image Preview">
                    <span role="button" class="profile-updates-img-remove" @click="removeImg">X</span>
                </span>
                <span v-else class="icon-lg"><IconUser /></span>
            </div>
            <div class="mb-2 image-upload">
                <label for="profile_input_field">{{ lg('select_profile_img') }}</label>
                <input type="file" id="profile_input_field" accept="image/*" @change="fileChange">
                <p v-if="imgError" class="invalid-text">{{ lg('img_upload_error') }}</p>
            </div>
        </div>
        <div class="profile-updates-btns">
            <button type="button" class="btn btn-secondary" @click="cancel">{{ lg('cancel') }}</button>
            <button type="button" class="btn btn-primary" @click="save">{{ lg('save') }}</button>
        </div>
    </div>
</template>

<script>
    import { mapStores, mapState } from 'pinia';
    import { userStore } from '@/stores/user';
    import { useLgStore } from '@/stores/active__lg';
    import IconUser from '@/components/icons/IconUser.vue';
    import ImgResize from '@/utils/ImgResize.js';

    export default {
        components: {
            IconUser,
        },

        data() {
            return {
                newImgUrl: null,
                imgError: false,
            }
        },

        computed: {
            ...mapStores(userStore),
            ...mapState(useLgStore, ['lg']),
        },

        methods: {
            fileChange(event) {
                let file = event.target.files[0];
                this.imgError = false;
                if (!file) {
                    this.imgError = true;
                    setTimeout(() => {
                        this.imgError = false;
                    }, 3000);
                    return;
                }

                this.$emit('startLoading');

                const reader = new FileReader();
                reader.onload = (e) => {
                    ImgResize(e.target.result, 128)
                    .then((r) => {
                        this.$emit('finishLoading');
                        this.newImgUrl = r;
                    })
                    .catch((e) => {
                        this.$emit('finishLoading');
                        console.log(e);
                        event.target.files = null;
                        this.newImgUrl = null;
                        this.$emit('fail');
                    })
                };

                reader.onerror = (err) => {
                    this.$emit('finishLoading');
                    event.target.files = null;
                    this.imgError = true;
                    setTimeout(() => {
                        this.imgError = false;
                    }, 3000);
                };

                reader.readAsDataURL(file);
            },

            removeImg() {
                this.newImgUrl = null;
            },

            save() {
                let payload = {
                    profileImg: this.newImgUrl
                }
                this.$emit('startLoading');
                this.userStore.updateUser(payload)
                    .then(() => {
                        this.$emit('finishLoading');
                        this.$emit('success');
                    })
                    .catch((e) => {
                        this.$emit('finishLoading');
                        if (e == 401) {
                            this.$router.push('/login');
                        } else {
                            this.$emit('fail');
                        }
                    });
            },
            cancel() {
                this.newImgUrl = null;
                this.$emit('cancel');
            },
        },

        mounted() {
            this.newImgUrl = this.userStore.profileImg;
        }
    }
</script>
