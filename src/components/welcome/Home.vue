<template>
    <div class="content-body">
        <div>
            <ContactTabs />
        </div>
        <div class="mt-2">
            <Contacts />
        </div>
    </div>
</template>

<script>
    import ContactTabs from './Home/ContactTabs.vue';
    import Contacts from './Home/Contacts.vue';

    export default {
        components: {
            ContactTabs,
            Contacts,
        },

    }
</script>