import{_,s as m,y as B,c as b,j as y,n as v,a3 as o,a6 as q,o as w,a7 as x}from"./chunks/framework.CmW1YqwU.js";const f="_poster_wrap_tjtv8_2",P={poster_wrap:f},I=o("",8),T=y("canvas",{id:"poster"},null,-1),S=[T],M=o("",4),U=JSON.parse('{"title":"提取图片主色调","description":"","frontmatter":{"title":"提取图片主色调","author":"刘军","location":"武汉","date":"2022-02-15T00:00:00.000Z"},"headers":[],"relativePath":"web/javascript/getBgColor.md","filePath":"web/javascript/getBgColor.md","lastUpdated":1718940490000}'),j={name:"web/javascript/getBgColor.md"},$=Object.assign(j,{setup(V){const F=m(q),c=()=>{let s=new Image;s.src=F.value;let i=document.querySelector("#poster"),t=i.getContext("2d");s.onload=function(){const{width:k,height:l}=s;let p=0,E=0,e=0,r=null,g=null,d=null;i.width=k,i.height=l;const n=k*l;t.drawImage(s,0,0);const h=t.getImageData(0,0,i.width,i.height);for(let a=0;a<h.data.length;a+=4)r=h.data[a],g=h.data[a+1],d=h.data[a+2],p+=r,E+=g,e+=d;const C=Math.round(p/n),D=Math.round(E/n),u=Math.round(e/n),A=`rgb(${C}, ${D}, ${u})`;document.querySelector(".poster_wrap1").style.backgroundColor=A}};return B(()=>{c()}),(s,i)=>(w(),b("div",null,[I,y("div",{class:v([s.$style.poster_wrap,"poster_wrap1"])},S,2),M]))}}),N={$style:P},z=_($,[["__cssModules",N]]);export{U as __pageData,z as default};