import{S as n,i as e,s as r,e as a,t,c as o,a as l,g as s,d as c,f as u,I as i,V as h,W as f,l as d,x as m,u as p,X as v,k as P,n as g,Y as E,Q as k,h as x,w as T,Z as y,_ as V,R as b,$ as w,r as N,a0 as M,J as I,a1 as R,a2 as $}from"../../chunks/vendor-5935b4ac.js";function A(n,e,r){const a=n.slice();return a[8]=e[r],a}function B(n){let e,r,d,m;return{c(){e=a("p"),r=t("The rando is even!")},l(n){e=o(n,"P",{});var a=l(e);r=s(a,"The rando is even!"),a.forEach(c)},m(n,a){u(n,e,a),i(e,r),m=!0},i(n){m||(h((()=>{d||(d=f(e,w,{},!0)),d.run(1)})),m=!0)},o(n){d||(d=f(e,w,{},!1)),d.run(0),m=!1},d(n){n&&c(e),n&&d&&d.end()}}}function L(n){let e,r,f,d,m,p,v=n[8]+"";return{c(){e=a("p"),r=t(v),f=t(" is not even...")},l(n){e=o(n,"P",{});var a=l(e);r=s(a,v),f=s(a," is not even..."),a.forEach(c)},m(n,a){u(n,e,a),i(e,r),i(e,f),p=!0},p:I,i(n){p||(h((()=>{m&&m.end(1),d=R(e,M,{x:1e3,duration:1e3}),d.start()})),p=!0)},o(n){d&&d.invalidate(),m=$(e,M,{x:-500,duration:1e3}),p=!1},d(n){n&&c(e),n&&m&&m.end()}}}function U(n){let e,r,h,f=n[8]+"";return{c(){e=a("p"),r=t(f),h=t(" is exactly one")},l(n){e=o(n,"P",{});var a=l(e);r=s(a,f),h=s(a," is exactly one"),a.forEach(c)},m(n,a){u(n,e,a),i(e,r),i(e,h)},p:I,i:I,o:I,d(n){n&&c(e)}}}function j(n){let e,r,h,f=n[8]+"";return{c(){e=a("p"),r=t(f),h=t(" is even!!!")},l(n){e=o(n,"P",{});var a=l(e);r=s(a,f),h=s(a," is even!!!"),a.forEach(c)},m(n,a){u(n,e,a),i(e,r),i(e,h)},p:I,i:I,o:I,d(n){n&&c(e)}}}function C(n){let e,r,a,t;const o=[j,U,L],l=[];var s;return e=(s=n)[8]%2==0?0:1==s[8]?1:2,r=l[e]=o[e](n),{c(){r.c(),a=d()},l(n){r.l(n),a=d()},m(n,r){l[e].m(n,r),u(n,a,r),t=!0},p(n,e){r.p(n,e)},i(n){t||(m(r),t=!0)},o(n){p(r),t=!1},d(n){l[e].d(n),n&&c(a)}}}function D(n){let e,r;return{c(){e=a("p"),r=t("There was and issue! peep the promise error")},l(n){e=o(n,"P",{});var a=l(e);r=s(a,"There was and issue! peep the promise error"),a.forEach(c)},m(n,a){u(n,e,a),i(e,r)},p:I,d(n){n&&c(e)}}}function F(n){let e,r,h,f=n[7]+"";return{c(){e=a("p"),r=t("VAL! -- "),h=t(f)},l(n){e=o(n,"P",{});var a=l(e);r=s(a,"VAL! -- "),h=s(a,f),a.forEach(c)},m(n,a){u(n,e,a),i(e,r),i(e,h)},p:I,d(n){n&&c(e)}}}function J(n){let e,r;return{c(){e=a("p"),r=t("Promise Value is working")},l(n){e=o(n,"P",{});var a=l(e);r=s(a,"Promise Value is working"),a.forEach(c)},m(n,a){u(n,e,a),i(e,r)},p:I,d(n){n&&c(e)}}}function O(n){let e,r,d,I,R,$,L,U,j,O,S,W,X,Y,Z,_,q,z,G,H,K,nn,en,rn,an,tn,on,ln,sn,cn,un,hn,fn,dn,mn,pn=Math.floor(Q())%2+"",vn=Q()%2+"",Pn=n[1]%2==0&&B(),gn=n[3],En=[];for(let a=0;a<gn.length;a+=1)En[a]=C(A(n,gn,a));const kn=n=>p(En[n],1,1,(()=>{En[n]=null}));let xn={ctx:n,current:null,token:null,hasCatch:!0,pending:J,then:F,catch:D,value:7};return v(n[4],xn),{c(){e=a("div"),r=a("p"),d=t(n[0]),R=P(),$=a("p"),L=t(n[1]),j=P(),O=a("p"),S=t(n[2]),X=P(),Y=a("p"),Z=t(n[2]),q=P(),z=a("p"),G=t(n[2]),K=P(),nn=a("button"),en=t("Rando"),rn=P(),an=a("input"),tn=P(),on=t(pn),ln=P(),sn=t(vn),cn=P(),Pn&&Pn.c(),un=P();for(let n=0;n<En.length;n+=1)En[n].c();hn=P(),xn.block.c()},l(a){e=o(a,"DIV",{});var t=l(e);r=o(t,"P",{});var u=l(r);d=s(u,n[0]),u.forEach(c),R=g(t),$=o(t,"P",{});var i=l($);L=s(i,n[1]),i.forEach(c),j=g(t),O=o(t,"P",{});var h=l(O);S=s(h,n[2]),h.forEach(c),X=g(t),Y=o(t,"P",{});var f=l(Y);Z=s(f,n[2]),f.forEach(c),q=g(t),z=o(t,"P",{});var m=l(z);G=s(m,n[2]),m.forEach(c),K=g(t),nn=o(t,"BUTTON",{});var p=l(nn);en=s(p,"Rando"),p.forEach(c),rn=g(t),an=o(t,"INPUT",{}),tn=g(t),on=s(t,pn),ln=g(t),sn=s(t,vn),cn=g(t),Pn&&Pn.l(t),un=g(t);for(let n=0;n<En.length;n+=1)En[n].l(t);hn=g(t),xn.block.l(t),t.forEach(c)},m(a,t){u(a,e,t),i(e,r),i(r,d),i(e,R),i(e,$),i($,L),i(e,j),i(e,O),i(O,S),i(e,X),i(e,Y),i(Y,Z),i(e,q),i(e,z),i(z,G),i(e,K),i(e,nn),i(nn,en),i(e,rn),i(e,an),E(an,n[1]),i(e,tn),i(e,on),i(e,ln),i(e,sn),i(e,cn),Pn&&Pn.m(e,null),i(e,un);for(let n=0;n<En.length;n+=1)En[n].m(e,null);i(e,hn),xn.block.m(e,xn.anchor=null),xn.mount=()=>e,xn.anchor=null,fn=!0,dn||(mn=[k(nn,"click",n[5]),k(an,"input",n[6])],dn=!0)},p(r,[a]){if(n=r,(!fn||1&a)&&x(d,n[0]),(!fn||2&a)&&x(L,n[1]),(!fn||4&a)&&x(S,n[2]),(!fn||4&a)&&x(Z,n[2]),(!fn||4&a)&&x(G,n[2]),2&a&&an.value!==n[1]&&E(an,n[1]),n[1]%2==0?Pn?2&a&&m(Pn,1):(Pn=B(),Pn.c(),m(Pn,1),Pn.m(e,un)):Pn&&(N(),p(Pn,1,1,(()=>{Pn=null})),T()),8&a){let r;for(gn=n[3],r=0;r<gn.length;r+=1){const t=A(n,gn,r);En[r]?(En[r].p(t,a),m(En[r],1)):(En[r]=C(t),En[r].c(),m(En[r],1),En[r].m(e,hn))}for(N(),r=gn.length;r<En.length;r+=1)kn(r);T()}y(xn,n,a)},i(n){if(!fn){h((()=>{I||(I=f(r,w,{},!0)),I.run(1)})),h((()=>{U||(U=f($,w,{},!0)),U.run(1)})),h((()=>{W||(W=f(O,w,{},!0)),W.run(1)})),h((()=>{_||(_=f(Y,w,{},!0)),_.run(1)})),h((()=>{H||(H=f(z,M,{},!0)),H.run(1)})),m(Pn);for(let n=0;n<gn.length;n+=1)m(En[n]);fn=!0}},o(n){I||(I=f(r,w,{},!1)),I.run(0),U||(U=f($,w,{},!1)),U.run(0),W||(W=f(O,w,{},!1)),W.run(0),_||(_=f(Y,w,{},!1)),_.run(0),H||(H=f(z,M,{},!1)),H.run(0),p(Pn),En=En.filter(Boolean);for(let e=0;e<En.length;e+=1)p(En[e]);fn=!1},d(n){n&&c(e),n&&I&&I.end(),n&&U&&U.end(),n&&W&&W.end(),n&&_&&_.end(),n&&H&&H.end(),Pn&&Pn.d(),V(En,n),xn.block.d(),xn.token=null,xn=null,dn=!1,b(mn)}}}function Q(){return Math.random()+1}function S(n,e,r){let a,{myName:t="Freddy"}=e,o=(l=2e3,new Promise((n=>setTimeout((()=>n("Promise Value")),l))));var l;let s=Math.random();return n.$$set=n=>{"myName"in n&&r(0,t=n.myName)},r(2,a=Math.random()),[t,s,a,[0,1,2,3,4,5,6,7,8,9,19],o,function(n){console.log(n),r(1,s=Math.random())},function(){s=this.value,r(1,s)}]}class W extends n{constructor(n){super(),e(this,n,S,O,r,{myName:0})}}export{W as default};
