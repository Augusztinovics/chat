<template>
    <div class="resurce">
        <div v-if="logDetail" class="detail-container">
            <div class="details-header">
                <h2><span>#{{ logDetail.id }}</span></h2>
                <div>
                    <button class="btn-sm btn-secondary" @click="closeDetail">X</button>
                </div>
            </div>
            <div class="detail">
                <p><b>Level: </b>{{ logDetail.level }}</p>
                <p><b>Log: </b>{{ logDetail.log }}</p>
                <p><b>Created At: </b>{{ logDetail.created_at }}</p>
            </div>
        </div>
        <div v-else>
            <h2>Logs</h2>
            <div class="resurce-control">
                <div class="password-container">
                    <select name="search_input" id="search_input" v-model="searchText" @change="fetchLogs">
                        <option value="">All Type</option>
                        <option value="INFO">INFO</option>
                        <option value="WARNING">WARNING</option>
                        <option value="ERROR">ERROR</option>
                        <option value="CRITICAL">CRITICAL</option>
                    </select>
                </div>
                <div>
                    <select name="pag_size" id="pag_size" v-model="limit" @change="fetchLogs">
                        <option value="2">2 / page</option>
                        <option value="10">10 / page</option>
                        <option value="15">15 / page</option>
                        <option value="20">20 / page</option>
                        <option value="25">25 / page</option>
                    </select>
                    <button class="btn-sm btn-primary" @click="fetchLogs">Fetch All Logs</button>
                </div>
            </div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>Level</th>
                    <th>Log</th>
                    <th>Created At</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="log in logs" :key="log.id">
                    <td>{{ log.id }}</td>
                    <td>{{ log.level }}</td>
                    <td>{{ log.log }}</td>
                    <td>{{ log.created_at }}</td>
                    <td>
                        <span class="icon-edit-btn ml-1" @click="viewLog(log)"><IconEyeOpen /></span>
                        <span v-if="canEdit" class="icon-edit-btn danger ml-1" @click="deleteLog(log.id)"><IconX /></span>
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
    import IconEyeOpen from '@/components/icons/IconEyeOpen.vue';
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
            IconEyeOpen,
            IconEyeClose,
            IconX,
            SuccessToast,
            FailToast,
            Modal,
        },

        data() {
            return {
                logs: [],
                logDetail: null,
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
                deleteLogId: null,
            }
        },

        computed: {
            ...mapStores(adminUserStore, loadingStore),
            canEdit() {
                return this.adminUserStore.roleId > 1;
            },
            logNum() {
                return this.logs.length;
            },
            hasResult() {
                return this.logNum > 0;
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
                this.fetchLogs(null, this.offset);
            },

            paginatRight() {
                if (this.offset >= this.pageCount) return;
                this.offset++;
                this.fetchLogs(null, this.offset);
            },

            fetchLogs(e,set = 1) {
                let params = {
                    s: set,
                    l: parseInt(this.limit),
                    st: this.searchText,
                };

                this.loadingStore.startLoading();
                axios.get('/api/admin/logs?' +  new URLSearchParams(params).toString())
                    .then((r) => {
                        this.logs = r.data.logs;
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

            viewLog(log) {
                this.logDetail = log;
            },

            closeDetail() {
                this.isEdit = false;
                this.logDetail = null;
                this.updateId = null;
            },

            cancelAction() {
                this.showPswModal = false;
                this.confirmPsw = '';
                this.deleteLogId = null;
            },

            performAction() {
                if (this.confirmPsw.length < 1) {
                    this.missingPassword = true;
                    return;
                }
                let data = null;
                if (this.deleteLogId) {
                    data = {
                        method: 'DELETE',
                        psw: this.confirmPsw,
                        delete_id: this.deleteLogId
                    };
                    this.postData(data);
                } else {
                    this.cancelAction();
                }
            },

            deleteLog(id) {
                this.deleteLogId = id;
                this.logDetail = null;
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
                axios.post('/api/admin/logs', data)
                    .then(() => {
                        this.loadingStore.finishLoading();
                        this.deleteLogId = null;
                        this.confirmPsw = '';
                        this.fetchLogs(null, 1);
                        this.saveSuccess = true;
                        setTimeout(() => {
                            this.saveSuccess = false;
                        }, 3000);
                    })
                    .catch((e) => {
                        this.loadingStore.finishLoading();
                        this.deleteLogId = null;
                        this.logDetail = null;
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