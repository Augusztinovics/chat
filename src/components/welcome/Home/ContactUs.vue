<template>
    <div class="w-100 pl-2 pr-2 contact-us">
        <div>
            <h1 class="text-center">{{ lg('contact_us') }}</h1>
        </div>
        <div class="text-left mt-2 mb-2">
            <button type="button" class="btn btn-primary pl-2 pr-2" @click="showQuestionModal">{{ lg('ask') }}</button>
            <ContactUsModal @close="closeQuestionModal" @saved="questionAsked" :show="showQuastionModal"/>
        </div>
        <div v-if="hasRequest">
            <ContactUsCard v-for="question in contact_us_requests" :key="'contact_us_card_' + question.id" :question="question" @saved="questionAsked"/>
        </div>
        <div v-else>
            <p>{{ lg('no_contact_us_yet') }}</p>
        </div>
    </div>
</template>

<script>
    import { mapStores, mapState } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';
    import { loadingStore } from '@/stores/loadin';
    import ContactUsModal from './ContactUsModal.vue';
    import ContactUsCard from './ContactUsCard.vue';

    export default {
        components: {
            ContactUsModal,
            ContactUsCard,
        },

        data() {
            return {
                contact_us_requests: [],
                showQuastionModal: false,
            }
        },

        computed: {
            ...mapStores(loadingStore),
            ...mapState(useLgStore, ['lg']),
            hasRequest() {
                return this.contact_us_requests.length > 0;
            },
        },

        methods: {
            closeQuestionModal() {
                this.showQuastionModal = false;
            },

            showQuestionModal() {
                this.showQuastionModal = true;
                setTimeout(() => {
                    document.getElementById('title').focus();
                }, 300);
            },

            questionAsked() {
                //refetch questions, with new one, then close
                this.closeQuestionModal();
                this.loadingStore.finishLoading();
            },
        },
    }
</script>