<template>
    <div class="resurce">
        <div v-if="questionDetail" class="detail-container">
            <div class="details-header">
                <h2><span>#{{ questionDetail.id }}</span></h2>
                <div>
                    <button v-if="isEdit" class="btn btn-success mr-2" @click="saveDetail">Save</button>
                    <button class="btn-sm btn-secondary" @click="closeDetail">X</button>
                </div>
            </div>
            <div class="detail">
                <p><b>User Id: </b>{{ questionDetail.user_id }}</p>
                <p><b>Title: </b>{{ questionDetail.title }}</p>
                <p><b>Question: </b>{{ questionDetail.question }}</p>
                <p><b>Created At: </b>{{ questionDetail.created_at }}</p>
                <p><b>Answer: </b><textarea name="answer" :readonly="!isEdit" v-model="questionDetail.answer"></textarea></p>
                <p><b>Answered At: </b>{{ questionDetail.answered_at }}</p>
            </div>
        </div>
        <div v-else>
            <h2>User Questions</h2>
            <div class="resurce-control">
                <div class="reource-search">
                    <div class="password-container">
                        <input id="search_input" type="text" v-model="searchText" :disabled="submitting" @keypress.enter="fetchQuestions">
                        <button type="button" @click="fetchQuestions" :disabled="submitting">
                            <span class="icon"><IconSearch /></span>
                        </button>
                    </div>
                    <div>
                        <select name="search_key" id="search_key" v-model="searchKey">
                            <option value="id">Model Id</option>
                            <option value="user_id">User Id</option>
                            <option value="title">Title</option>
                            <option value="question">Question</option>
                            <option value="answer">Answer</option>
                        </select>
                        <div class="simple-checkbox" style="display: inline-block;">
                            <label for="with_answered">
                                <input type="checkbox" id="with_answered" v-model="withAnswered"> Include Answered
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <select name="pag_size" id="pag_size" v-model="limit" @change="fetchQuestions">
                        <option value="2">2 / page</option>
                        <option value="10">10 / page</option>
                        <option value="15">15 / page</option>
                        <option value="20">20 / page</option>
                        <option value="25">25 / page</option>
                    </select>
                    <button class="btn-sm btn-primary" @click="fetchQuestionsAll">Fetch All Questions</button>
                </div>
            </div>
            <table>
                <tr>
                    <th>ID</th>
                    <th>User Id</th>
                    <th>Created At</th>
                    <th>Title</th>
                    <th>Question</th>
                    <th>Answer</th>
                    <th>Actions</th>
                </tr>
                <tr v-for="question in questions" :key="question.id">
                    <td>{{ question.id }}</td>
                    <td>{{ question.user_id }}</td>
                    <td>{{ question.created_at }}</td>
                    <td>{{ question.title }}</td>
                    <td>{{ question.question }}</td>
                    <td>{{ question.answer }}</td>
                    <td>
                        <span class="icon-edit-btn ml-1" @click="viewQuestion(question)"><IconEyeOpen /></span>
                        <span v-if="canEdit" class="icon-edit-btn ml-1" @click="viewEditQuestion(question)"><IconEdit /></span>
                        <span v-if="canEdit" class="icon-edit-btn danger ml-1" @click="deleteQuestion(question.id)"><IconX /></span>
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
            :show="showConfirmModal"
            size="sm"
            title="Confirm Action"
            :showCancel="true"
            @close="cancelAction"
            @cancel="cancelAction"
            @ok="performAction"
        >
            <div>
                <h4>Do youwant to delete this question?</h4>
                <p>The action can't be undone later</p>
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
                questions: [],
                questionDetail: null,
                isEdit: false,
                updateId: null,
                limit: 10,
                offset: 1,
                totalCount: 0,
                searchText: '',
                searchKey: 'user_id',
                submitting: false,
                errorMsg: '',
                saveSuccess: false,
                saveError: false,
                showConfirmModal: false,
                deleteQuestionId: null,
                withAnswered: false,
            }
        },

        computed: {
            ...mapStores(adminUserStore, loadingStore),
            canEdit() {
                return this.adminUserStore.roleId > 1;
            },
            questionNum() {
                return this.questions.length;
            },
            hasResult() {
                return this.questionNum > 0;
            },
            pageCount() {
                if (this.totalCount < 1) return 0;
                return Math.ceil(this.totalCount / this.limit);
            },
        },
        methods: {
            paginateLeft() {
                if (this.offset < 2) return;
                this.offset--;
                this.fetchQuestions(null, this.offset);
            },

            paginatRight() {
                if (this.offset >= this.pageCount) return;
                this.offset++;
                this.fetchQuestions(null, this.offset);
            },

            fetchQuestionsAll() {
                this.searchText = '';
                this.fetchQuestions(null, this.offset);
            },

            fetchQuestions(e,set = 1) {
                if (this.searchKey == 'answer') {
                    this.withAnswered = true;
                }
                let params = {
                    s: set,
                    l: parseInt(this.limit),
                    st: this.searchText,
                    sk: this.searchKey,
                    wa: this.withAnswered,
                };

                this.loadingStore.startLoading();
                axios.get('/api/admin/questions?' +  new URLSearchParams(params).toString())
                    .then((r) => {
                        this.questions = r.data.questions;
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

            viewQuestion(question) {
                this.questionDetail = question;
            },

            viewEditQuestion(question) {
                this.isEdit = true;
                this.updateId = question.id;
                this.questionDetail = { ...question };
            },

            closeDetail() {
                this.isEdit = false;
                this.questionDetail = null;
                this.updateId = null;
            },

            cancelAction() {
                this.showConfirmModal = false;
                this.deleteQuestionId = null;
            },

            performAction() {
                let data = null;
                if (this.deleteQuestionId) {
                    data = {
                        method: 'DELETE',
                        delete_id: this.deleteQuestionId
                    };
                    this.postData(data);
                } else if (this.isEdit && this.questionDetail) {
                    if (this.questionDetail.id > 0 && this.updateId) {
                        data = {
                            method: 'UPDATE',
                            group_id: this.questionDetail.id,
                        };
                        let originalQuestion = this.questions.find(g => { return g.id == this.updateId;});
                        if (!originalQuestion) {
                            this.showConfirmModal = false;
                            this.updateId = null;
                            this.questionDetail = null;
                            this.errorMsg = 'Unable to find original group!';
                            this.saveError = true;
                            setTimeout(() => {
                                this.errorMsg = '';
                                this.saveError = false;
                            }, 5000);
                            return;
                        }

                        let hasUpdateData = false;

                        if (originalQuestion.answer !== this.questionDetail.answer.trim()) {
                            data.answer = this.questionDetail.answer.trim();
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
                    }
                } else {
                    this.cancelAction();
                }
            },

            deleteQuestion(id) {
                this.deleteQuestionId = id;
                this.isEdit = false;
                this.updateId = null;
                this.questionDetail = null;
                this.showConfirmModal = true;
            },

            saveDetail() {
                this.deleteQuestionId = null;
                if (!this.isEdit) return;
                this.performAction();
            },

            postData(data) {
                this.loadingStore.startLoading();
                this.showConfirmModal = false;
                axios.post('/api/admin/questions', data)
                    .then(() => {
                        this.loadingStore.finishLoading();
                        this.deleteQuestionId = null;
                        this.fetchQuestions(null, 1);
                        this.saveSuccess = true;
                        setTimeout(() => {
                            this.saveSuccess = false;
                        }, 3000);
                        this.closeDetail();
                    })
                    .catch((e) => {
                        this.loadingStore.finishLoading();
                        this.deleteQuestionId = null;
                        this.updateId = null;
                        this.questionDetail = null;
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