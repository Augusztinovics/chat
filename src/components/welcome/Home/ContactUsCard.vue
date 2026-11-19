<template>
    <div class="contac-us-card">
        <div class="contact-us-card-title">
            <h5>{{ question.title }}</h5>
            <span class="icon-edit-btn danger" @click="confirmDelete"><IconX /></span>
        </div>
        <div class="contact-us-card-body">
            <p><small>{{ lg('contact_us_question_asked_at') }}</small> : <small>{{ question.created_at }}</small></p>
            <p class="com-text">{{ question.question }}</p>
            <div v-if="question.answer" class="ml-2">
                <p><small>{{ lg('contact_us_question_answered_at') }}</small> : <small>{{ question.anwered_at }}</small></p>
                <p class="com-text">{{ question.answer }}</p>
            </div>
            <p v-else class="ml-2">{{ lg('contact_us_not_answered_yet') }}</p>
        </div>

        <Modal 
            :show="showDeleteModal"
            size="sm"
            :title="lg('contact_us_question_delete_title')"
            :showCancel="true"
            :cancelBtnText="lg('cancel')"
            :okBtnText="lg('delete')"
            :backdropClass="'delete-account-backdrop'"
            @ok="deleteQuestion"
            @close="modalClose"
            @cancel="modalClose"
        >
            <div class="text-center">
                <p>{{ lg('contact_us_question_delete_confirm') }}</p>
            </div>
        </Modal>

        <FailToast v-if="saveError":msg="lg('general_error')"/>
    </div>
</template>

<script>
    import { mapStores, mapState } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';
    import { loadingStore } from '@/stores/loadin';
    import IconX from '@/components/icons/IconX.vue';
    import Modal from '@/components/Modal.vue';
    import axios from 'axios';
    import FailToast from '@/components/FailToast.vue';

    export default {
        components: {
            IconX,
            Modal,
            FailToast,
        },
        props: {
            question: {
                type: Object,
                default(rawProps) {
                    return { 
                        id:         null,
                        title:      null,
                        question:   null,
                        answer:     null,
                        anwered_at: null,
                        created_at: null,
                    };
                }
            }
        },

        data() {
            return {
                showDeleteModal:false,
                saveError: false,
            }
        },

        computed: {
            ...mapStores(loadingStore),
            ...mapState(useLgStore, ['lg']),
        },

        methods: {
            confirmDelete() {
                this.showDeleteModal = true;
            },

            modalClose() {
                this.showDeleteModal = false;
            },

            deleteQuestion() {
                this.loadingStore.startLoading();
                this.saveError = false;

                axios.post('/api/resources/questions-delete', {delete_id : this.question.id})
                    .then(() => {
                        this.modalClose();
                        this.$emit('saved');
                    })
                    .catch((e) => {
                        this.loadingStore.finishLoading();
                        this.modalClose();
                        this.saveError = true;
                        setTimeout(() => {
                            this.saveError = false;
                        }, 3000);
                    });
            }
        },
    }
</script>