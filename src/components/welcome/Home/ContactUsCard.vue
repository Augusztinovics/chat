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
    </div>
</template>

<script>
    import { mapStores, mapState } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';
    import { loadingStore } from '@/stores/loadin';
    import IconX from '@/components/icons/IconX.vue';
    import Modal from '@/components/Modal.vue';

    export default {
        components: {
            IconX,
            Modal,
        },
        props: {
            question: {
                type: Object,
                default(rawProps) {
                    return { 
                        id:         null,
                        title:      'Dummy title',
                        question:   'Whats Up',
                        answer:     'Nothing special',
                        anwered_at: '2026-11-16',
                        created_at: '2021-11-12',
                    };
                }
            }
        },

        data() {
            return {
                showDeleteModal:false,
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
                //TODO make real submit
                setTimeout(() => {
                    //success rout, finish load go otherside, in error route will be here with message
                    this.modalClose();
                    this.$emit('saved');
                }, 800);
            }
        },
    }
</script>