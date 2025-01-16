<template>
    <div v-if="show" id="modal" class="modal-backdrop" :class="backdropClass" @click.stop="close">
        <div class="modal" :class="size" @click.stop="prevent">
            <div v-if="showHeader" class="modal-header" :class="headerClass">
                <h4>{{ title }}</h4>
                <span v-if="showClose" class="modal-x" @click.stop="close">&times;</span>
            </div>
            <div class="modal-body" :class="bodyClass">
                <slot></slot>
            </div>
            <div v-if="showFooter" class="modal-footer" :class="footerClass">
                <button v-if="showCancel" type="button" class="btn btn-secondary" @click.stop="cancel">{{ cancelBtnText }}</button>
                <button type="button" class="btn btn-primary" @click.stop="ok">{{ okBtnText }}</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        show: {
            type: Boolean,
            default: false,
        },
        showCancel: {
            type: Boolean,
            default: false,
        },
        cancelBtnText: {
            type: String,
            default: 'Cancel',
        },
        okBtnText: {
            type: String,
            default: 'Ok',
        },
        title: {
            type: String,
            default: 'Modal',
        },
        showFooter: {
            type: Boolean,
            default: true,
        },
        showHeader: {
            type: Boolean,
            default: true,
        },
        showClose: {
            type: Boolean,
            default: true,
        },
        backdropClass: {
            type: [String, Array, null],
            default: null,
        },
        headerClass: {
            type: [String, Array, null],
            default: null,
        },
        bodyClass: {
            type: [String, Array, null],
            default: null,
        },
        footerClass: {
            type: [String, Array, null],
            default: null,
        },
        size: {
            type: String,
            default: 'md',
            validator(value, props) {
                return ['sm', 'md', 'lg', 'full'].includes(value)
            }
        },
    },

    methods: {
        close() {
            this.$emit('close');
        },
        ok() {
            this.$emit('ok');
        },
        cancel() {
            this.$emit('cancel');
        },
        prevent() {},
    },
}
</script>