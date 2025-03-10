import{e as g,_ as m,u as k,x as n,g as o,h as a,k as p,t as i,n as d,j as c,o as u,D as C}from"./index-Cg3yNC9Z.js";const h={props:["msg"],computed:{...g(k,["lg"]),message(){return this.msg??this.lg("general_error")}}},_={class:"toaster danger"};function w(r,e,t,f,y,s){return n(),o("div",_,[a("h5",null,[e[0]||(e[0]=a("span",null,"✕",-1)),p(i(s.message),1)])])}const A=m(h,[["render",w]]),v={props:{show:{type:Boolean,default:!1},showCancel:{type:Boolean,default:!1},cancelBtnText:{type:String,default:"Cancel"},okBtnText:{type:String,default:"Ok"},title:{type:String,default:"Modal"},showFooter:{type:Boolean,default:!0},showHeader:{type:Boolean,default:!0},showClose:{type:Boolean,default:!0},backdropClass:{type:[String,Array,null],default:null},headerClass:{type:[String,Array,null],default:null},bodyClass:{type:[String,Array,null],default:null},footerClass:{type:[String,Array,null],default:null},size:{type:String,default:"md",validator(r,e){return["sm","md","lg","full"].includes(r)}}},methods:{close(){this.$emit("close")},ok(){this.$emit("ok")},cancel(){this.$emit("cancel")},prevent(){}}};function b(r,e,t,f,y,s){return t.show?(n(),o("div",{key:0,id:"modal",class:d(["modal-backdrop",t.backdropClass]),onClick:e[4]||(e[4]=c((...l)=>s.close&&s.close(...l),["stop"]))},[a("div",{class:d(["modal",t.size]),onClick:e[3]||(e[3]=c((...l)=>s.prevent&&s.prevent(...l),["stop"]))},[t.showHeader?(n(),o("div",{key:0,class:d(["modal-header",t.headerClass])},[a("h4",null,i(t.title),1),t.showClose?(n(),o("span",{key:0,class:"modal-x",onClick:e[0]||(e[0]=c((...l)=>s.close&&s.close(...l),["stop"]))},"×")):u("",!0)],2)):u("",!0),a("div",{class:d(["modal-body",t.bodyClass])},[C(r.$slots,"default")],2),t.showFooter?(n(),o("div",{key:1,class:d(["modal-footer",t.footerClass])},[t.showCancel?(n(),o("button",{key:0,type:"button",class:"btn btn-secondary",onClick:e[1]||(e[1]=c((...l)=>s.cancel&&s.cancel(...l),["stop"]))},i(t.cancelBtnText),1)):u("",!0),a("button",{type:"button",class:"btn btn-primary",onClick:e[2]||(e[2]=c((...l)=>s.ok&&s.ok(...l),["stop"]))},i(t.okBtnText),1)],2)):u("",!0)],2)],2)):u("",!0)}const F=m(v,[["render",b]]),x={},S={xmlns:"http://www.w3.org/2000/svg",viewBox:"0 0 512 512"};function B(r,e){return n(),o("svg",S,e[0]||(e[0]=[a("path",{d:"M471.6 21.7c-21.9-21.9-57.3-21.9-79.2 0L362.3 51.7l97.9 97.9 30.1-30.1c21.9-21.9 21.9-57.3 0-79.2L471.6 21.7zm-299.2 220c-6.1 6.1-10.8 13.6-13.5 21.9l-29.6 88.8c-2.9 8.6-.6 18.1 5.8 24.6s15.9 8.7 24.6 5.8l88.8-29.6c8.2-2.7 15.7-7.4 21.9-13.5L437.7 172.3 339.7 74.3 172.4 241.7zM96 64C43 64 0 107 0 160L0 416c0 53 43 96 96 96l256 0c53 0 96-43 96-96l0-96c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 96c0 17.7-14.3 32-32 32L96 448c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l96 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 64z"},null,-1)]))}const N=m(x,[["render",B]]),L={props:["msg"],computed:{...g(k,["lg"]),message(){return this.msg??this.lg("saved")}}},T={class:"toaster success"};function z(r,e,t,f,y,s){return n(),o("div",T,[a("h5",null,[e[0]||(e[0]=a("span",null,"✓",-1)),p(i(s.message),1)])])}const V=m(L,[["render",z]]);export{A as F,N as I,F as M,V as S};
