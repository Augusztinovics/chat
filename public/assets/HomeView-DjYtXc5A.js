import{L,p as D,B}from"./BaseLayout-BFuc6CAr.js";import{I as C}from"./IconUser-BsT4kyE4.js";import{_ as p,x as r,g as a,h as s,d as x,f as q,e as y,z as w,u as k,i as u,t as d,w as I,k as v,o as g,l as M,v as E,s as h,m as N,A,F as P,B as O,q as R,C as U,n as b}from"./index-Bg-hGGET.js";import{M as G,F as H}from"./Modal-aqRUfoxh.js";const V={},$={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"};function K(t,e){return r(),a("svg",$,e[0]||(e[0]=[s("path",{d:"M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"},null,-1)]))}const F=p(V,[["render",K]]),j={},J={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"};function Q(t,e){return r(),a("svg",J,e[0]||(e[0]=[s("path",{d:"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"},null,-1)]))}const W=p(j,[["render",Q]]),X={},Y={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"};function Z(t,e){return r(),a("svg",Y,e[0]||(e[0]=[s("path",{d:"M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"},null,-1)]))}const ee=p(X,[["render",Z]]),se=x("requestSend",{state:()=>({requests:[]}),actions:{loadRequests(){return new Promise((t,e)=>{q.get("/api/resources/sended-friend-requests").then(o=>{var l;this.requests=((l=o.data)==null?void 0:l.sendedRequests)??[],t(!0)}).catch(o=>{o.response.status==401?e(401):e(o)})})},sendRequest(t){return new Promise((e,o)=>{q.post("/api/resources/friend-request-send",t).then(l=>{var n;this.requests=((n=l.data)==null?void 0:n.sendedRequests)??[],e(!0)}).catch(l=>{l.response.status==401?o(401):o(l)})})},cancelFrienRequest(t){return new Promise((e,o)=>{q.post("/api/resources/friend-request-delete",t).then(l=>{var n;this.requests=((n=l.data)==null?void 0:n.sendedRequests)??[],e(!0)}).catch(l=>{l.response.status==401?o(401):o(l)})})}}}),te=x("requestGet",{state:()=>({requests:[]}),actions:{loadRequests(){return new Promise((t,e)=>{})},acceptRequest(t){return new Promise((e,o)=>{console.log(t),setTimeout(()=>{e(!0)},1e3)})}}}),ne={props:{friend:{type:Object,default(t){return{friendId:null,friendName:"",friendDescription:"",friendCountry:"",friendCity:"",friendImg:null,reqId:null,reqAcceptedDate:null,sendId:null,sendAcceptedDate:null}}}},components:{IconUser:C,Modal:G},data(){return{showDetails:!1,sending:!1,showRequestModal:!1,requestText:""}},computed:{...y(k,["lg"]),hasFriend(){return this.friend.friendId!=null},isFriend(){return this.friend.reqId&&this.friend.reqAcceptedDate||this.friend.sendId&&this.friend.sendAcceptedDate},isReqGet(){return this.friend.reqId&&!this.friend.reqAcceptedDate},isReqSend(){return this.friend.sendId&&!this.friend.sendAcceptedDate}},methods:{...w(se,["sendRequest"]),...w(te,["acceptRequest"]),modalClose(){this.showDetails=!1},openModal(){this.showDetails=!0},openRequestModal(){this.requestText="",this.showRequestModal=!0,setTimeout(()=>{document.getElementById("request_text_input_field").focus()},300)},sendFriendRequest(){this.showRequestModal=!1,this.sending=!0,this.sendRequest({friendId:this.friend.friendId,text:this.requestText.trim()}).then(()=>{this.sending=!1,this.requestText="",this.friend.sendId=1}).catch(()=>{this.sending=!1})},acceptFriendRequest(){this.sending=!0,this.acceptRequest({friendId:this.friend.friendId,reqId:this.friend.reqId}).then(()=>{this.sending=!1,this.friend.reqAcceptedDate=!0}).catch(()=>{this.sending=!1})},denieFriendRequest(){},cancelRequest(){},sendMessage(){}}},ie={key:0,class:"friend-card"},re={class:"friend-card-img"},oe=["src"],ae={key:1,class:"icon-lg"},de={class:"friend-card-action"},le=["disabled"],ce={key:1},ue=["disabled"],he=["disabled"],_e={key:2},fe=["disabled"],ge=["disabled"],me={class:"text-left"},pe={class:"text-center mt-1 mb-2"},be=["src"],qe={key:1,class:"icon-lg"},ve={class:"friend-modal-des"},Re={class:"text-bold"},Se={class:"text-bold"},Te={class:"text-bold"},Ie={class:"mb-2"},ye={key:0},ke={class:"request-modal-body"},we={for:"request_text_input_field"};function Ce(t,e,o,l,n,i){const f=h("IconUser"),m=h("Modal");return i.hasFriend?(r(),a("div",ie,[s("div",re,[o.friend.friendImg?(r(),a("img",{key:0,src:o.friend.friendImg,alt:"Profile Image",class:"profile-img md"},null,8,oe)):(r(),a("span",ae,[u(f)]))]),s("div",{class:"friend-card-name",onClick:e[0]||(e[0]=(...c)=>i.openModal&&i.openModal(...c))},[s("h5",null,d(o.friend.friendName),1)]),s("div",de,[i.isFriend?(r(),a("button",{key:0,class:"btn-sm btn-primary",onClick:e[1]||(e[1]=(...c)=>i.sendMessage&&i.sendMessage(...c)),disabled:n.sending},d(n.sending?t.lg("sending"):t.lg("send_message")),9,le)):i.isReqGet?(r(),a("div",ce,[s("button",{class:"btn-sm btn-primary",onClick:e[2]||(e[2]=(...c)=>i.acceptFriendRequest&&i.acceptFriendRequest(...c)),disabled:n.sending},d(n.sending?t.lg("sending"):t.lg("accept_request")),9,ue),s("button",{class:"btn-sm btn-danger",onClick:e[3]||(e[3]=(...c)=>i.denieFriendRequest&&i.denieFriendRequest(...c)),disabled:n.sending},d(n.sending?t.lg("sending"):t.lg("denie_request")),9,he)])):i.isReqSend?(r(),a("div",_e,[s("p",null,d(t.lg("already_send")),1),s("button",{class:"btn-sm btn-danger",onClick:e[4]||(e[4]=(...c)=>i.cancelRequest&&i.cancelRequest(...c)),disabled:n.sending},d(n.sending?t.lg("sending"):t.lg("cancel_request")),9,fe)])):(r(),a("button",{key:3,class:"btn-sm btn-primary",onClick:e[5]||(e[5]=(...c)=>i.openRequestModal&&i.openRequestModal(...c)),disabled:n.sending},d(n.sending?t.lg("sending"):t.lg("send_request")),9,ge))]),u(m,{show:n.showDetails,size:"md",title:o.friend.friendName,headerClass:"text-left",showFooter:!1,onClose:i.modalClose},{default:I(()=>[s("div",me,[s("div",pe,[o.friend.friendImg?(r(),a("img",{key:0,src:o.friend.friendImg,alt:"Profile Image",class:"profile-img md"},null,8,be)):(r(),a("span",qe,[u(f)]))]),s("div",ve,[s("p",null,[s("span",Re,d(t.lg("city"))+" :",1),v(d(o.friend.friendCity??"????"),1)]),s("p",null,[s("span",Se,d(t.lg("friend_country"))+" :",1),v(d(o.friend.friendCountry??"????"),1)]),s("p",null,[s("span",Te,d(t.lg("friend_des")),1)]),s("p",Ie,d(o.friend.friendDescription??"??????"),1),i.isReqGet?(r(),a("div",ye)):g("",!0)])])]),_:1},8,["show","title","onClose"]),u(m,{show:n.showRequestModal,size:"sm",title:t.lg("send_request"),headerClass:"text-left",showCancel:!0,cancelBtnText:t.lg("cancel"),okBtnText:t.lg("send"),onClose:e[7]||(e[7]=c=>n.showRequestModal=!1),onCancel:e[8]||(e[8]=c=>n.showRequestModal=!1),onOk:i.sendFriendRequest},{default:I(()=>[s("div",ke,[s("p",null,[v(d(t.lg("addresse"))+" ",1),s("span",null,d(o.friend.friendName),1)]),s("label",we,d(t.lg("few_words")),1),M(s("textarea",{name:"requestText",id:"request_text_input_field","onUpdate:modelValue":e[6]||(e[6]=c=>n.requestText=c)},null,512),[[E,n.requestText]])])]),_:1},8,["show","title","cancelBtnText","okBtnText","onOk"])])):g("",!0)}const xe=p(ne,[["render",Ce]]),Me={components:{IconSearch:F,LoadingOverlay:L,FailToast:H,FriendCard:xe},data(){return{submitting:!1,searchText:"",firstSearch:!0,searchResult:[],searchError:!1,paginationIndex:0}},computed:{...y(k,["lg"]),...N(D),hasSearchResult(){return this.searchResult.length>0},hasPagination(){return this.searchResult.length>this.paginationSizesStore.topSize},rightPaginationDisabled(){return this.paginationIndex*this.paginationSizesStore.topSize+this.paginationSizesStore.topSize>=this.searchResult.length},cardsToShow(){let t=[];if(!this.hasSearchResult)return t;let e=this.paginationIndex*this.paginationSizesStore.topSize;e>this.searchResult.length-1&&(e=this.searchResult.length-1),this.paginationSizesStore.topSize>=this.searchResult.length&&(e=0);let o=e+this.paginationSizesStore.topSize;o>this.searchResult.length&&(o=this.searchResult.length);for(let l=e;l<o;l++)t.push(this.searchResult[l]);return t}},methods:{searchUsers(){this.searchText.trim()!=""&&(this.firstSearch=!1,this.submitting=!0,this.searchError=!1,q.get("/api/resources/search-user?un="+this.searchText.trim()).then(t=>{this.submitting=!1,this.searchResult=t.data.users}).catch(t=>{this.submitting=!1,this.searchError=!0,setTimeout(()=>{this.searchError=!1},3e3),console.log(t)}))},paginateLeft(){this.paginationIndex--},paginateRight(){this.paginationIndex++}},mounted(){this.submitting=!1,this.searchText="",this.firstSearch=!0,document.getElementById("search_input").focus()}},Ee={class:"search-menu"},Fe={class:"user-search-input"},ze={for:"search_input"},Le={class:"password-container"},De=["disabled"],Be=["disabled"],Ne={class:"icon"},Ae={key:0,class:"search-result-holder"},Pe={class:"results"},Oe={key:0},Ue=["disabled"],Ge={class:"result-cards"},He={key:1},Ve=["disabled"],$e={key:1,class:"search-result-no-result-holder"},Ke={key:0},je={key:1};function Je(t,e,o,l,n,i){const f=h("IconSearch"),m=h("FriendCard"),c=h("LoadingOverlay"),S=h("FailToast");return r(),a("div",null,[s("div",Ee,[s("div",Fe,[s("label",ze,d(t.lg("user_search")),1),s("div",Le,[M(s("input",{id:"search_input",type:"text","onUpdate:modelValue":e[0]||(e[0]=_=>n.searchText=_),disabled:n.submitting,onKeypress:e[1]||(e[1]=A((..._)=>i.searchUsers&&i.searchUsers(..._),["enter"]))},null,40,De),[[E,n.searchText]]),s("button",{type:"button",onClick:e[2]||(e[2]=(..._)=>i.searchUsers&&i.searchUsers(..._)),disabled:n.submitting},[s("span",Ne,[u(f)])],8,Be)])])]),s("div",null,[i.hasSearchResult?(r(),a("div",Ae,[s("p",null,[s("span",null,d(n.searchResult.length),1),e[5]||(e[5]=v()),s("span",null,d(t.lg("results")),1)]),s("div",Pe,[i.hasPagination?(r(),a("div",Oe,[s("button",{type:"button",disabled:n.paginationIndex==0,class:"pag-btn",onClick:e[3]||(e[3]=(..._)=>i.paginateLeft&&i.paginateLeft(..._))},"<",8,Ue)])):g("",!0),s("div",Ge,[(r(!0),a(P,null,O(i.cardsToShow,_=>(r(),R(m,{key:"friend_"+_.friendId,friend:_},null,8,["friend"]))),128))]),i.hasPagination?(r(),a("div",He,[s("button",{type:"button",disabled:i.rightPaginationDisabled,class:"pag-btn",onClick:e[4]||(e[4]=(..._)=>i.paginateRight&&i.paginateRight(..._))},">",8,Ve)])):g("",!0)])])):(r(),a("div",$e,[n.firstSearch?(r(),a("p",Ke,d(t.lg("user_search_before")),1)):(r(),a("p",je,d(t.lg("user_search_not_find")),1))]))]),n.submitting?(r(),R(c,{key:0})):g("",!0),n.searchError?(r(),R(S,{key:1})):g("",!0)])}const Qe=p(Me,[["render",Je]]),We={components:{IconUser:C,IconEarth:U,IconSearch:F,IconLeft:W,IconRight:ee,SearchContactTab:Qe},data(){return{selectedTab:"SOME"}},computed:{...y(k,["lg"])},methods:{selectTab(t){t==this.selectedTab?this.selectedTab="NONE":this.selectedTab=t}}},Xe={class:"contact-tabs"},Ye={class:"tab"},Ze={class:"icon"},es={class:"icon"},ss={class:"tab-text"},ts={class:"icon"},ns={class:"icon"},is={class:"tab-text"},rs={class:"icon"},os={class:"icon"},as={class:"tab-text"},ds={class:"icon"},ls={class:"icon"},cs={class:"tab-text"},us={key:0,class:"tab-content"},hs={key:0},_s={key:1},fs={key:2},gs={key:3};function ms(t,e,o,l,n,i){const f=h("IconUser"),m=h("IconEarth"),c=h("IconSearch"),S=h("IconLeft"),_=h("IconRight"),z=h("SearchContactTab");return r(),a("div",Xe,[s("div",Ye,[s("span",{class:b(["tab-menu",{"active-tab":n.selectedTab=="SOME"}]),onClick:e[0]||(e[0]=T=>i.selectTab("SOME"))},[s("span",Ze,[u(f)]),s("span",es,[u(m)]),s("span",ss,d(t.lg("who_can_know")),1)],2),s("span",{class:b(["tab-menu",{"active-tab":n.selectedTab=="SEARCH"}]),onClick:e[1]||(e[1]=T=>i.selectTab("SEARCH"))},[s("span",ts,[u(f)]),s("span",ns,[u(c)]),s("span",is,d(t.lg("contact_search")),1)],2),s("span",{class:b(["tab-menu",{"active-tab":n.selectedTab=="GET"}]),onClick:e[2]||(e[2]=T=>i.selectTab("GET"))},[s("span",rs,[u(f)]),s("span",os,[u(S)]),s("span",as,d(t.lg("friend_requests")),1)],2),s("span",{class:b(["tab-menu",{"active-tab":n.selectedTab=="SEND"}]),onClick:e[3]||(e[3]=T=>i.selectTab("SEND"))},[s("span",ds,[u(f)]),s("span",ls,[u(_)]),s("span",cs,d(t.lg("send_requests")),1)],2)]),n.selectedTab!="NONE"?(r(),a("div",us,[n.selectedTab=="SOME"?(r(),a("div",hs,"Ajanlas")):g("",!0),n.selectedTab=="SEARCH"?(r(),a("div",_s,[u(z)])):g("",!0),n.selectedTab=="GET"?(r(),a("div",fs,"Kapottak")):g("",!0),n.selectedTab=="SEND"?(r(),a("div",gs,"Elkuldtem, de hun a valasz")):g("",!0)])):g("",!0)])}const ps=p(We,[["render",ms]]),bs={};function qs(t,e,o,l,n,i){return r(),a("div",null," contacts ")}const vs=p(bs,[["render",qs]]),Rs={components:{ContactTabs:ps,Contacts:vs}},Ss={class:"mt-2"};function Ts(t,e,o,l,n,i){const f=h("ContactTabs"),m=h("Contacts");return r(),a("div",null,[s("div",null,[u(f)]),s("div",Ss,[u(m)])])}const Is=p(Rs,[["render",Ts]]),ys={components:{BaseLayout:B,Home:Is},props:["socket"]};function ks(t,e,o,l,n,i){const f=h("Home"),m=h("BaseLayout");return r(),R(m,null,{default:I(()=>[u(f)]),_:1})}const Es=p(ys,[["render",ks]]);export{Es as default};
