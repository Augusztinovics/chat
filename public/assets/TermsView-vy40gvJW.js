import{B as m}from"./BaseLayout-Bbrkt0nn.js";import{T as _,a as p,b as u}from"./TermsEn-BPAlFNXq.js";import{_ as d,e as i,q as e,w as l,u as T,s,x as o,h as f}from"./index-CCkHcHBl.js";const g={components:{BaseLayout:m,TermsHu:_,TermsSr:p,TermsEn:u},props:["socket"],computed:{...i(T,["lg","lgCode"]),activeLg(){return this.lgCode??"HU"}}},B={class:"card"};function L(k,y,S,h,v,t){const a=s("TermsSr"),r=s("TermsEn"),c=s("TermsHu"),n=s("BaseLayout");return o(),e(n,null,{default:l(()=>[f("div",B,[t.activeLg=="SR"?(o(),e(a,{key:0})):t.activeLg=="EN"?(o(),e(r,{key:1})):(o(),e(c,{key:2}))])]),_:1})}const H=d(g,[["render",L]]);export{H as default};
