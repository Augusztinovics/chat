<template>
    <div class="resurce">
        <div v-if="chatDetail" class="detail-container">
            <div class="details-header">
                <h2><span v-if="chatDetail.id>0">#{{ chatDetail.id }}</span></h2>
                <div>
                    <button v-if="isEdit" class="btn btn-success mr-2" @click="saveDetail">Save</button>
                    <button class="btn-sm btn-secondary" @click="closeDetail">X</button>
                </div>
            </div>
            <div class="detail">
                <p><b>Group Id: </b><input type="number" name="group_id" :readonly="!isEdit" v-model="chatDetail.group_id"></p>
                <p><b>From Id: </b><input type="number" name="from_id" :readonly="!isEdit" v-model="chatDetail.from_id"></p>
                <p><b>Sender Name: </b><input type="text" name="sender" :readonly="!isEdit" v-model="chatDetail.sender"></p>
                <p><b>Send Time: </b>{{ chatDetail.send_time }}</p>
                <p><b>Message: </b><input type="text" name="msg" :readonly="!isEdit" v-model="chatDetail.msg"></p>
                <img v-if="chatDetail.img" :src="chatDetail.img" alt="Message Image" class="profile-img md">
                <p><b>Reaction: </b><span v-html="chatDetail.reaction"></span></p>
                <p><b>Created At: </b>{{ chatDetail.created_at }}</p>
            </div>
        </div>
        <div v-else>
            <h2>Chat Messages</h2>
            <div class="resurce-control">
                <div class="password-container">
                    <input id="search_input" type="text" v-model="searchText" :disabled="submitting" @keypress.enter="fetchMessages">
                    <button type="button" @click="fetchMessages" :disabled="submitting">
                        <span class="icon"><IconSearch /></span>
                    </button>
                </div>
                <div>
                    <select name="pag_size" id="pag_size" v-model="limit" @change="fetchMessages">
                        <option value="2">2 / page</option>
                        <option value="10">10 / page</option>
                        <option value="15">15 / page</option>
                        <option value="20">20 / page</option>
                        <option value="25">25 / page</option>
                    </select>
                    <button class="btn-sm btn-primary" @click="fetchMessages">Fetch All Chat Msg</button>
                    <button v-if="canEdit" class="btn-sm btn-success ml-2" @click="createNewChatMsg">Create New Chat Msg</button>
                </div>
            </div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Group Id</th>
                    <th>From Id</th>
                    <th>Sender Name</th>
                    <th>Send Time</th>
                    <th>Message</th>
                    <th>Image</th>
                    <th>Reaction</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="msg in chatMessages" :key="msg.id">
                    <td>{{ msg.id }}</td>
                    <td>{{ msg.group_id }}</td>
                    <td>{{ msg.from_id }}</td>
                    <td>{{ msg.sender }}</td>
                    <td>{{ msg.send_time }}</td>
                    <td>{{ msg.msg }}</td>
                    <td>
                        <img v-if="msg.img" :src="msg.img" alt="Message Image" class="profile-img sm">
                        <span v-else>-</span>
                    </td>
                    <td><span v-html="msg.reaction"></span></td>
                    <td>{{ msg.created_at }}</td>
                    <td>
                        <span class="icon-edit-btn ml-1" @click="viewChatMsg(msg)"><IconEyeOpen /></span>
                        <span v-if="canEdit" class="icon-edit-btn ml-1" @click="viewEditChatMsg(msg)"><IconEdit /></span>
                        <span v-if="canEdit" class="icon-edit-btn danger ml-1" @click="deleteChatMsg(msg.id)"><IconX /></span>
                    </td>
                </tr>
            </table>
            <div v-if="hasResult" class="text-center mt-2">
                <button type="button" class="btn pag-btn" :disabled="offset == 1" @click="paginateLeft">&lt;</button>
                <span class="mr-1 ml-1">Page: {{ offset }} / {{ pageCount }} All Resource: {{ totalCount }}</span>
                <button type="button" class="btn pag-btn" @click="paginatRight" :disabled="offset >= pageCount">&gt;</button>
            </div>
        </div>

        <Modal 
            :show="showPswModal"
            size="sm"
            title="Confirmtion Admin Password"
            :showCancel="true"
            @close="cancelAction"
            @cancel="cancelAction"
            @ok="performAction"
        >
            <div>
                <label for="password_input">Admin Update Password<span>*</span></label>
                <div class="password-container">
                    <input id="password_input" :type="passwordInputType" :class="{'invalid-input': missingPassword}" v-model="confirmPsw" @input="clearErrors">
                    <button type="button" @click="toogleShowPassword">
                        <span class="icon"><IconEyeClose v-if="showPassword" /><IconEyeOpen v-else /></span>
                    </button>
                </div>
                <p v-if="missingPassword" class="invalid-text">Please Enter your Admin Update Password!</p>
            </div>
        </Modal>

        <SuccessToast v-if="saveSuccess"/>
        <FailToast v-if="saveError":msg="errorMsg"/>
    </div>
</template>
<script>
    import IconSearch from '@/components/icons/IconSearch.vue';
    import IconEyeOpen from '@/components/icons/IconEyeOpen.vue';
    import IconEdit from '@/components/icons/IconEdit.vue';
    import IconUser from '@/components/icons/IconUser.vue';
    import IconX from '@/components/icons/IconX.vue';
    import IconEyeClose from '@/components/icons/IconEyeClose.vue';
    import axios from 'axios';
    import { mapStores } from 'pinia';
    import { adminUserStore } from '@/stores/admin_user';
    import { loadingStore } from '@/stores/loadin';
    import SuccessToast from '@/components/SuccessToast.vue';
    import FailToast from '@/components/FailToast.vue';
    import Modal from '@/components/Modal.vue';

    export default {
        components: {
            IconSearch,
            IconEyeOpen,
            IconEyeClose,
            IconEdit,
            IconUser,
            IconX,
            SuccessToast,
            FailToast,
            Modal,
        },

        data() {
            return {
                chatMessages: [],
                chatDetail: null,
                isEdit: false,
                updateId: null,
                limit: 10,
                offset: 1,
                totalCount: 0,
                searchText: '',
                submitting: false,
                errorMsg: '',
                saveSuccess: false,
                saveError: false,
                showPswModal: false,
                confirmPsw: '',
                showPassword: false,
                missingPassword: false,
                deleteChatMsgId: null,
            }
        },

        computed: {
            ...mapStores(adminUserStore, loadingStore),
            canEdit() {
                return this.adminUserStore.roleId > 1;
            },
            groupNum() {
                return this.chatMessages.length;
            },
            hasResult() {
                return this.groupNum > 0;
            },
            pageCount() {
                if (this.totalCount < 1) return 0;
                return Math.ceil(this.totalCount / this.limit);
            },
            passwordInputType() {
                return this.showPassword ? 'text' : 'password';
            },
        },
        methods: {
            clearErrors() {
                this.missingPassword = false;
            },

            toogleShowPassword() {
                this.showPassword = !this.showPassword;
            },

            paginateLeft() {
                if (this.offset < 2) return;
                this.offset--;
                this.fetchMessages(null, this.offset);
            },

            paginatRight() {
                if (this.offset >= this.pageCount) return;
                this.offset++;
                this.fetchMessages(null, this.offset);
            },

            fetchMessages(e,set = 1) {
                let params = {
                    s: set,
                    l: parseInt(this.limit),
                    st: this.searchText,
                };

                this.loadingStore.startLoading();
                axios.get('/api/admin/chat-messages?' +  new URLSearchParams(params).toString())
                    .then((r) => {
                        this.chatMessages = r.data.chat_messages;
                        this.totalCount = r.data.result_count;
                        this.offset = set;
                        this.loadingStore.finishLoading();
                    })
                    .catch((e) => {
                        this.loadingStore.finishLoading();
                        console.log(e);
                        this.errorMsg = e.message;
                        this.saveError = true;
                        setTimeout(() => {
                            this.errorMsg = '';
                            this.saveError = false;
                        }, 5000);
                    })
            },

            viewChatMsg(msg) {
                this.chatDetail = msg;
            },

            viewEditChatMsg(msg) {
                this.isEdit = true;
                this.updateId = msg.id;
                this.chatDetail = { ...msg };
            },

            closeDetail() {
                this.isEdit = false;
                this.chatDetail = null;
                this.updateId = null;
            },

            createNewChatMsg() {
                this.isEdit = true;
                this.chatDetail = {
                    id:         0,
                    group_id:   null,
                    from_id:    null,
                    sender:     null,
                    send_time:  null,
                    msg:        null,
                    img:        null,
                    reaction:   null,
                    created_at: null,
                }
            },

            cancelAction() {
                this.showPswModal = false;
                this.confirmPsw = '';
                this.deleteChatMsgId = null;
            },

            performAction() {
                if (this.confirmPsw.length < 1) {
                    this.missingPassword = true;
                    return;
                }
                let data = null;
                if (this.deleteChatMsgId) {
                    data = {
                        method: 'DELETE',
                        psw: this.confirmPsw,
                        delete_id: this.deleteChatMsgId
                    };
                    this.postData(data);
                } else if (this.isEdit && this.chatDetail) {
                    if (this.chatDetail.id > 0 && this.updateId) {
                        data = {
                            method: 'UPDATE',
                            psw: this.confirmPsw,
                            msg_id: this.chatDetail.id,
                        };
                        let originalChatMsg = this.chatMessages.find(cm => { return cm.id == this.updateId;});
                        if (!originalChatMsg) {
                            this.showPswModal = false;
                            this.updateId = null;
                            this.chatDetail = null;
                            this.confirmPsw = '';
                            this.errorMsg = 'Unable to find original chat message!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 5000);
                            return;
                        }

                        let hasUpdateData = false;
                        if (originalChatMsg.group_id !== parseInt(this.chatDetail.group_id)) {
                            data.group_id = parseInt(this.chatDetail.group_id);
                            hasUpdateData = true;
                        }

                        if (originalChatMsg.from_id !== parseInt(this.chatDetail.from_id)) {
                            data.from_id = parseInt(this.chatDetail.from_id);
                            hasUpdateData = true;
                        }

                        if (originalChatMsg.sender !== this.chatDetail.sender.trim()) {
                            data.sender = this.chatDetail.sender.trim();
                            hasUpdateData = true;
                        }

                        if (originalChatMsg.msg !== this.chatDetail.msg.trim()) {
                            data.msg = this.chatDetail.msg.trim();
                            hasUpdateData = true;
                        }

                        if (hasUpdateData) {
                            this.postData(data);
                        } else {
                            this.errorMsg = 'Nothing to update!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 3000);
                            return;
                        }
                    } else {
                        data = {
                            method: 'CREATE',
                            psw: this.confirmPsw,
                        }

                        if (this.chatDetail.group_id) {
                            data.group_id = parseInt(this.chatDetail.group_id);
                        } else {
                            this.errorMsg = 'Group Id is required!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 3000);
                            return;
                        }

                        if (this.chatDetail.from_id) {
                            data.from_id = parseInt(this.chatDetail.from_id);
                        } else {
                            this.errorMsg = 'From Id is required!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 3000);
                            return;
                        }

                        if (this.chatDetail.sender && this.chatDetail.sender.trim().length > 1) {
                            data.sender = this.chatDetail.sender.trim();
                        } else {
                            this.errorMsg = 'Sender Name is required!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 3000);
                            return;
                        }

                        if (this.chatDetail.msg && this.chatDetail.msg.trim().length > 1) {
                            data.msg = this.chatDetail.msg.trim();
                        } else {
                            this.errorMsg = 'Chat Message is required!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 3000);
                            return;
                        }

                        this.postData(data);
                    }
                } else {
                    this.cancelAction();
                }
            },

            deleteChatMsg(id) {
                this.deleteChatMsgId = id;
                this.isEdit = false;
                this.updateId = null;
                this.chatDetail = null;
                this.showPswModal = true;
                this.focusOnPassword();
            },

            saveDetail() {
                this.deleteChatMsgId = null;
                if (!this.isEdit) return;
                this.showPswModal = true;
                this.focusOnPassword();
            },

            focusOnPassword() {
                setTimeout(() => {
                    document.getElementById('password_input').focus();
                }, 300);
            },

            postData(data) {
                this.loadingStore.startLoading();
                this.showPswModal = false;
                axios.post('/api/admin/chat-messages', data)
                    .then(() => {
                        this.loadingStore.finishLoading();
                        this.deleteChatMsgId = null;
                        this.confirmPsw = '';
                        this.fetchMessages(null, 1);
                        this.saveSuccess = true;
                        setTimeout(() => {
                            this.saveSuccess = false;
                        }, 3000);
                    })
                    .catch((e) => {
                        this.loadingStore.finishLoading();
                        this.deleteChatMsgId = null;
                        this.updateId = null;
                        this.chatDetail = null;
                        this.confirmPsw = '';
                        console.log(e);
                        this.errorMsg = e.message;
                        this.saveError = true;
                        setTimeout(() => {
                            this.errorMsg = '';
                            this.saveError = false;
                        }, 5000);
                    });
            },
        },
    }
</script>