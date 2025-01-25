import{B as C}from"./BaseLayout-DmujWIgd.js";import{I as E}from"./IconUser-BgbnHKmH.js";import{_ as d,x as o,g as c,h as s,e as v,u as T,t as u,l as k,v as I,i as a,s as r,z as y,n as b,o as p,q as L,w as B}from"./index-BjlBbflz.js";const N={},M={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"};function z(n,t){return o(),c("svg",M,t[0]||(t[0]=[s("path",{d:"M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"},null,-1)]))}const $=d(N,[["render",z]]),H={},U={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"};function O(n,t){return o(),c("svg",U,t[0]||(t[0]=[s("path",{d:"M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"},null,-1)]))}const R=d(H,[["render",O]]),D={},V={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 448 512"};function A(n,t){return o(),c("svg",V,t[0]||(t[0]=[s("path",{d:"M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"},null,-1)]))}const q=d(D,[["render",A]]),G={components:{IconSearch:$},data(){return{submitting:!1,searchText:"",firstSearch:!0}},computed:{...v(T,["lg"])},methods:{searchUsers(){this.firstSearch=!1}},mounted(){this.submitting=!1,this.searchText="",this.firstSearch=!0,document.getElementById("search_input").focus()}},j={for:"search_input"},K={class:"password-container"},F=["disabled"],J=["disabled"],P={class:"icon"},Q={key:0},W={key:1};function X(n,t,h,m,e,i){const _=r("IconSearch");return o(),c("div",null,[s("div",null,[s("div",null,[s("label",j,u(n.lg("password")),1),s("div",K,[k(s("input",{id:"search_input",type:"text","onUpdate:modelValue":t[0]||(t[0]=l=>e.searchText=l),disabled:e.submitting},null,8,F),[[I,e.searchText]]),s("button",{type:"button",onClick:t[1]||(t[1]=(...l)=>i.searchUsers&&i.searchUsers(...l)),disabled:e.submitting},[s("span",P,[a(_)])],8,J)])])]),s("div",null,[e.firstSearch?(o(),c("p",Q,"Eloszor")):(o(),c("div",W,"Has allready"))])])}const Y=d(G,[["render",X]]),Z={components:{IconUser:E,IconEarth:y,IconSearch:$,IconLeft:R,IconRight:q,SearchContactTab:Y},data(){return{selectedTab:"SOME"}},computed:{...v(T,["lg"])},methods:{selectTab(n){n==this.selectedTab?this.selectedTab="NONE":this.selectedTab=n}}},ss={class:"contact-tabs"},ts={class:"tab"},es={class:"icon"},ns={class:"icon"},os={class:"tab-text"},cs={class:"icon"},as={class:"icon"},rs={class:"tab-text"},is={class:"icon"},_s={class:"icon"},ls={class:"tab-text"},ds={class:"icon"},ps={class:"icon"},us={class:"tab-text"},hs={key:0,class:"tab-content"},ms={key:0},bs={key:1},fs={key:2},vs={key:3};function Ts(n,t,h,m,e,i){const _=r("IconUser"),l=r("IconEarth"),g=r("IconSearch"),S=r("IconLeft"),w=r("IconRight"),x=r("SearchContactTab");return o(),c("div",ss,[s("div",ts,[s("span",{class:b(["tab-menu",{"active-tab":e.selectedTab=="SOME"}]),onClick:t[0]||(t[0]=f=>i.selectTab("SOME"))},[s("span",es,[a(_)]),s("span",ns,[a(l)]),s("span",os,u(n.lg("who_can_know")),1)],2),s("span",{class:b(["tab-menu",{"active-tab":e.selectedTab=="SEARCH"}]),onClick:t[1]||(t[1]=f=>i.selectTab("SEARCH"))},[s("span",cs,[a(_)]),s("span",as,[a(g)]),s("span",rs,u(n.lg("contact_search")),1)],2),s("span",{class:b(["tab-menu",{"active-tab":e.selectedTab=="GET"}]),onClick:t[2]||(t[2]=f=>i.selectTab("GET"))},[s("span",is,[a(_)]),s("span",_s,[a(S)]),s("span",ls,u(n.lg("friend_requests")),1)],2),s("span",{class:b(["tab-menu",{"active-tab":e.selectedTab=="SEND"}]),onClick:t[3]||(t[3]=f=>i.selectTab("SEND"))},[s("span",ds,[a(_)]),s("span",ps,[a(w)]),s("span",us,u(n.lg("send_requests")),1)],2)]),e.selectedTab!="NONE"?(o(),c("div",hs,[e.selectedTab=="SOME"?(o(),c("div",ms,"Ajanlas")):p("",!0),e.selectedTab=="SEARCH"?(o(),c("div",bs,[a(x)])):p("",!0),e.selectedTab=="GET"?(o(),c("div",fs,"Kapottak")):p("",!0),e.selectedTab=="SEND"?(o(),c("div",vs,"Elkuldtem, de hun a valasz")):p("",!0)])):p("",!0)])}const $s=d(Z,[["render",Ts]]),gs={};function Ss(n,t,h,m,e,i){return o(),c("div",null," contacts ")}const ws=d(gs,[["render",Ss]]),xs={components:{ContactTabs:$s,Contacts:ws}},Cs={class:"mt-2"};function Es(n,t,h,m,e,i){const _=r("ContactTabs"),l=r("Contacts");return o(),c("div",null,[s("div",null,[a(_)]),s("div",Cs,[a(l)])])}const ks=d(xs,[["render",Es]]),Is={components:{BaseLayout:C,Home:ks},props:["socket"]};function ys(n,t,h,m,e,i){const _=r("Home"),l=r("BaseLayout");return o(),L(l,null,{default:B(()=>[a(_)]),_:1})}const Ms=d(Is,[["render",ys]]);export{Ms as default};
