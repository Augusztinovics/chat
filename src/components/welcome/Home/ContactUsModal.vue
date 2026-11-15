<template>
    <div>
        <Modal
            :show="show"
            :size="'md'"
            :title="lg('ask')"
            :headerClass="'text-left'"
            :showCancel="true"
            @close="modalClose"
            @cancel="modalClose"
            @ok="submitQuestion"
        >
            <div class="request-modal-body">
                <p>disclaimer</p>
                <div>
                    <label for="title">{{ lg('group_new_name_lbl') }}</label>
                    <input type="text" id="title" @input="clearTitleError" v-model="title">
                    <p v-if="titleError" class="text-danger">{{ lg('group_new_name_missing') }}</p>
                    <hr>
                    <label for="question">{{ lg('from_self') }}</label>
                    <textarea name="question" id="question"  @input="clearQuestionError" v-model="question"></textarea>
                    <p v-if="questionError" class="text-danger">{{ lg('group_new_name_missing') }}</p>
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
    import { toastsStore } from '@/stores/toasts';

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
            }
        },

        computed: {
            ...mapStores(loadingStore, toastsStore),
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

                this.$emit('saved');
            },

            clearTitleError() {
                this.titleError = false;
            },

            clearQuestionError() {
                this.questionError = false;
            },
        },
    }
</script>