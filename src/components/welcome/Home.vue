<template>
    <div>
        <div>
            <ContactTabs />
        </div>
        <div>
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