<template>
    <div class="w-100 pl-2 pr-2">
        <div>
            <h1 class="text-center">{{ lg('contact_us') }}</h1>
        </div>
        <div class="text-left mt-2 mb-2">
            <button type="button" class="btn btn-primary pl-2 pr-2" @click="showQuestionModal">{{ lg('ask') }}</button>
            <ContactUsModal @close="closeQuestionModal" @saved="questionAsked" :show="showQuastionModal"/>
        </div>
        <div>
            Ask-answers cards
        </div>
    </div>
</template>

<script>
    import { mapState } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';
    import ContactUsModal from './ContactUsModal.vue';

    export default {
        components: {
            ContactUsModal,
        },

        data() {
            return {
                paginationIndex: 0,
                conatct_requests: [],
                showQuastionModal: false,
            }
        },

        computed: {
            ...mapState(useLgStore, ['lg']),
        },

        methods: {
            closeQuestionModal() {
                this.showQuastionModal = false;
            },

            showQuestionModal() {
                this.showQuastionModal = true;
            },

            questionAsked() {
                //refetch questions, with new one, then close
                this.closeQuestionModal();
            },
        },
    }
</script>