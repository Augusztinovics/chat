import{_ as a,s as c,f as l,g as e,R as L,x as T,a as k,L as x,e as $,h as o,w as i,t as r,p as m,u as y,r as n,j as d}from"./index-mw9h7JAw.js";import{I as C}from"./IconUser-uXL123Ye.js";const w={};function E(t,s){return c(),l("div",null,s[0]||(s[0]=[e("p",null,"magyar terms",-1)]))}const R=a(w,[["render",E]]),B={};function H(t,s){return c(),l("div",null,s[0]||(s[0]=[e("p",null,"Szerb terms",-1)]))}const N=a(B,[["render",H]]),U={};function V(t,s){return c(),l("div",null,s[0]||(s[0]=[e("p",null,"Angol terms",-1)]))}const b=a(U,[["render",V]]),j={components:{RouterLink:L,IconUser:C,IconIdCard:T,IconShield:k,LgSelector:x,TermsHu:R,TermsSr:N,TermsEn:b},computed:{...$(y,["lg","lgCode"]),activeLg(){return this.lgCode??"HU"}}},z={class:"welcome-wrapper"},A={class:"welcome-register"},D={class:"menu-box"},q={class:"icon"},F={class:"icon"},G={class:"menu-box"},J={class:"icon"},K={class:"text-center m-2"},M={class:"card"};function O(t,s,P,Q,W,u){const p=n("IconShield"),_=n("RouterLink"),g=n("IconUser"),f=n("IconIdCard"),h=n("LgSelector"),S=n("TermsSr"),v=n("TermsEn"),I=n("TermsHu");return c(),l("div",z,[e("header",A,[e("div",D,[o(_,{to:"/privacy",class:"menu--item mr-2"},{default:i(()=>[e("span",q,[o(p)]),d(" "+r(t.lg("privacy")),1)]),_:1}),o(_,{to:"/",class:"menu--item"},{default:i(()=>[e("span",F,[o(g)]),d(" "+r(t.lg("login")),1)]),_:1})]),e("div",G,[o(_,{to:"/register",class:"menu--item mr-2"},{default:i(()=>[e("span",J,[o(f)]),d(" "+r(t.lg("register")),1)]),_:1}),o(h,{class:"menu--item"})])]),e("h1",K,r(t.lg("terms")),1),e("main",null,[e("div",M,[u.activeLg=="SR"?(c(),m(S,{key:0})):u.activeLg=="EN"?(c(),m(v,{key:1})):(c(),m(I,{key:2}))])])])}const Z=a(j,[["render",O]]);export{Z as default};
