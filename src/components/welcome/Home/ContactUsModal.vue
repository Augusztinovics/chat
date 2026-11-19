<template>
    <div>
        <Modal
            :show="show"
            :size="'md'"
            :title="lg('ask')"
            :headerClass="'text-left'"
            :showCancel="true"
            :cancelBtnText="lg('cancel')"
            :okBtnText="lg('ask')"
            @close="modalClose"
            @cancel="modalClose"
            @ok="submitQuestion"
        >
            <div class="request-modal-body">
                <p class="disclaimer">{{ lg('contact_us_form_disclaimer') }}</p>
                <div>
                    <label for="title">{{ lg('contact_us_question_title_lbl') }}</label>
                    <input type="text" id="title" @input="clearTitleError" v-model="title">
                    <p v-if="titleError" class="text-danger">{{ lg('contact_us_question_title_missing') }}</p>
                    <label for="question">{{ lg('contact_us_question_lbl') }}</label>
                    <textarea name="question" id="question"  @input="clearQuestionError" v-model="question"></textarea>
                    <p v-if="questionError" class="text-danger">{{ lg('contact_us_question_missing') }}</p>
                </div>
                <div v-if="submitError">
                    <p class="text-danger">{{ lg('general_error') }}</p>
                </div>
            </div>
        </Modal>
    </div>
</template>

<script>
    import { mapStores, mapState } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';
    import { loadingStore } from '@/stores/loadin';
    import Modal from '@/components/Modal.vue';
    import axios from 'axios';

    export default {
        components: {
            Modal,
        },

        props: ['show'],

        data() {
            return {
                title: '',
                titleError: false,
                question: '',
                questionError: false,
                submitError: false,
            }
        },

        computed: {
            ...mapStores(loadingStore),
            ...mapState(useLgStore, ['lg']),
        },

        methods: {
            modalClose() {
                this.titleError = false;
                this.questionError = false;
                this.title = '';
                this.question = '';
                this.$emit('close');
            },

            submitQuestion() {
                if (!this.validForm()) return;
                this.loadingStore.startLoading();

                let data = {
                    title: this.title.trim(),
                    question: this.question.trim()
                };

                this.submitError = false;

                axios.post('/api/resources/questions-create', data)
                    .then(() => {
                        this.titleError = false;
                        this.questionError = false;
                        this.title = '';
                        this.question = '';
                        this.$emit('saved');
                    })
                    .catch((e) => {
                        this.loadingStore.finishLoading();
                        console.log(e);
                        this.submitError = true;
                    });
            },

            clearTitleError() {
                this.titleError = false;
                this.submitError = false;
            },

            clearQuestionError() {
                this.questionError = false;
                this.submitError = false;
            },

            validForm() {
                let isValid = true;
                if (this.title.trim().length < 2) {
                    this.titleError = true;
                    isValid = false;
                }
                if (this.question.trim().length < 2) {
                    this.questionError = true;
                    isValid = false;
                }
                if (!isValid) {
                    this.focusOnErrorField();
                }
                return isValid;
            },

            focusOnErrorField() {
                if (this.titleError) {
                    document.getElementById('title').focus();
                    return;
                }
                if (this.questionError) {
                    document.getElementById('question').focus();
                    return;
                }
            },
        },
    }
</script>