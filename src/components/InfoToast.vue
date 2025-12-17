<template>
    <div class="toaster info">
        <h5><span>!</span>{{ message }}</h5>
    </div>
</template>

<script>
    // TODO
    //Need early close and cloce on action posibility
    //Possibly types:
    //New message on not opened chatbox. Need: sender name, groupe name, short msg or reaction, button to open chatbox
    //New friend request send. Need sender name, short text from friend request message
    //You friend request accepted. Need friend name, some text like: [Name] accepted your request
    //Your friend request denided. Need friend name, some text like: [Name] denided your request
    //Added to group (not for default). Need: sender name, group name, some text like: [Sender] added you to [Group Name], button to open the chatbox
    //Removed to group. Need: sender name, group name, some text like: [Sender] removed from [Group Name]
    //Maybe marketing toast. Need title, img, description and action button (maybe separate toast)

    import { mapState } from 'pinia';
    import { useLgStore } from '@/stores/active__lg';

    export default {
        props: ['msg'],
        computed: {
            ...mapState(useLgStore, ['lg']),
            message() {
                return this.msg ?? this.lg('saved');
            },
        },
    }
</script>