<template>
    <div class="contac-us-card">
        <div class="contact-us-card-title">
            <h5>{{ question.title }}</h5>
            <span class="icon-edit-btn danger"><IconX /></span>
        </div>
        <div class="contact-us-card-body">
            <p><small>{{ question.created_at }}</small></p>
            <p class="com-text">{{ question.question }}</p>
            <div v-if="question.answer" class="ml-2">
                <p><small>{{ question.anwered_at }}</small></p>
                <p class="com-text">{{ question.answer }}</p>
            </div>
            <p v-else class="ml-2">No answer yet</p>
        </div>
    </div>
</template>

<script>
    import IconX from '@/components/icons/IconX.vue';

    export default {
        components: {
            IconX,
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
    }
</script>