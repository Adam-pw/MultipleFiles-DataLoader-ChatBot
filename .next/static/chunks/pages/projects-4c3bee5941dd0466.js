(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[327],{37670:function(e,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/projects",function(){return r(28086)}])},15415:function(e,t,r){"use strict";r.d(t,{R:function(){return i},l:function(){return n}});var a=r(98690),s=r.n(a),o=r(48764).lW;s().config.update({accessKeyId:"AKIASR6BAKZYEE7KBYVM",secretAccessKey:"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",region:"ap-south-1"});let l=new(s()).S3,n=new(s()).DynamoDB.DocumentClient,i=async(e,t,r)=>{try{let a="user_".concat(e);console.log(r);let s=r.map(e=>{let s={Bucket:"multiple-file-chatbot",Key:"".concat(a,"/").concat(t,"/").concat(e.name),Body:r},n=new FileReader,i=new Promise((e,t)=>{n.onload=t=>{var r;return e(null===(r=t.target)||void 0===r?void 0:r.result)},n.onerror=e=>t(e)});return n.readAsArrayBuffer(e),i.then(e=>{let t=o.from(e);return s.Body=t,l.upload(s).promise()})});await Promise.all(s),console.log('All files uploaded successfully to "'.concat(a,'" folder.'))}catch(e){console.error("Error uploading files:",e)}}},28086:function(e,t,r){"use strict";let a;r.r(t),r.d(t,{default:function(){return w}});var s=r(85893),o=r(24903),l=r(67294),n=r(89583),i=r(44080),c=r(91479),d=r(74403),u=r(41664),m=r.n(u),p=r(3349);let f="undefined"!=typeof crypto&&crypto.randomUUID&&crypto.randomUUID.bind(crypto);var x={randomUUID:f};let h=new Uint8Array(16);function y(){if(!a&&!(a="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)))throw Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return a(h)}let g=[];for(let e=0;e<256;++e)g.push((e+256).toString(16).slice(1));var v=function(e,t,r){if(x.randomUUID&&!t&&!e)return x.randomUUID();e=e||{};let a=e.random||(e.rng||y)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,t){r=r||0;for(let e=0;e<16;++e)t[r+e]=a[e];return t}return function(e,t=0){return(g[e[t+0]]+g[e[t+1]]+g[e[t+2]]+g[e[t+3]]+"-"+g[e[t+4]]+g[e[t+5]]+"-"+g[e[t+6]]+g[e[t+7]]+"-"+g[e[t+8]]+g[e[t+9]]+"-"+g[e[t+10]]+g[e[t+11]]+g[e[t+12]]+g[e[t+13]]+g[e[t+14]]+g[e[t+15]]).toLowerCase()}(a)},b=r(15415);let j=()=>{let[e,t]=(0,l.useState)(!1),[r,a,u]=(0,p.F_)(d.I),[f,x]=(0,l.useState)({projectName:"",visibility:""}),h=async e=>{e.preventDefault();let s=new Date().getTime();try{if(r){let e={TableName:"projects",Item:{id:v(),projectName:f.projectName,visibility:f.visibility,nameSpace:(null==r?void 0:r.uid)+s,userId:null==r?void 0:r.uid}};await b.l.put(e).promise(),x({projectName:"",visibility:""})}if(console.log("Data stored successfully!"),!a){let e={TableName:"projects",FilterExpression:"userId = :userId",ExpressionAttributeValues:{":userId":null==r?void 0:r.uid}};b.l.scan(e,(e,t)=>{e?console.error("Error retrieving data:",e):g(t.Items)})}}catch(e){console.error("Error storing data:",e)}t(!1)},[y,g]=(0,l.useState)([]);return(0,l.useEffect)(()=>{if(!a){let e={TableName:"projects",FilterExpression:"userId = :userId",ExpressionAttributeValues:{":userId":null==r?void 0:r.uid}};b.l.scan(e,(e,t)=>{e?console.error("Error retrieving data:",e):g(t.Items)})}},[r,a]),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.Z,{children:(0,s.jsxs)("div",{className:"flex max-w-screen-xl w-full mx-auto flex-wrap justify-center gap-8 p-4",children:[(0,s.jsxs)("div",{onClick:()=>t(!e),className:"hover:shadow-lg border border-neutral-400 p-4 rounded-xl w-56 text-white bg-[#3a0035] hover:border-black cursor-pointer m-4",children:[(0,s.jsxs)("div",{className:"text-lg font-semibold flex items-center gap-2",children:[(0,s.jsx)(n.wEH,{})," Create Project"]}),(0,s.jsx)("div",{className:"text-md font-medium mt-4",children:"Enter namespace"})]}),y.map((e,t)=>(0,s.jsx)(s.Fragment,{children:(0,s.jsx)(m(),{href:"/projects/".concat(e.projectName),children:(0,s.jsxs)("div",{className:"border-2 border-neutral-400 p-4 rounded-xl w-56 hover:border-black cursor-pointer hover:shadow-lg m-4",children:[(0,s.jsxs)("div",{className:"text-lg font-semibold flex items-center gap-2",children:[(0,s.jsx)(n.iNY,{})," ",e.projectName]}),(0,s.jsxs)("div",{className:"text-md font-medium mt-4",children:["Visibility : ",e.visibility]})]})},t)}))]})}),(0,s.jsx)(i.u.Root,{show:e,as:l.Fragment,children:(0,s.jsxs)(c.V,{as:"div",className:"relative z-10",onClose:()=>t(!e),children:[(0,s.jsx)(i.u.Child,{as:l.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0",enterTo:"opacity-100",leave:"ease-in duration-200",leaveFrom:"opacity-100",leaveTo:"opacity-0",children:(0,s.jsx)("div",{className:"fixed inset-0 bg-gray-200 bg-opacity-75 transition-opacity"})}),(0,s.jsx)("div",{className:"fixed inset-0 z-10 overflow-y-auto ",children:(0,s.jsx)("div",{className:"flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0",children:(0,s.jsx)(i.u.Child,{as:l.Fragment,enter:"ease-out duration-300",enterFrom:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",enterTo:"opacity-100 translate-y-0 sm:scale-100",leave:"ease-in duration-200",leaveFrom:"opacity-100 translate-y-0 sm:scale-100",leaveTo:"opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95",children:(0,s.jsx)(c.V.Panel,{className:"relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg",children:(0,s.jsxs)("form",{className:"p-4",children:[(0,s.jsx)("div",{className:"font-semibold",children:"Enter details"}),(0,s.jsxs)("div",{className:"relative mt-6 w-full",children:[(0,s.jsx)("input",{type:"text",id:"floating_outlined",className:"block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#440034] focus:outline-none focus:ring-0 focus:border-[#440034] peer",placeholder:"",onChange:e=>x(t=>({...t,projectName:e.target.value}))}),(0,s.jsx)("label",{htmlFor:"floating_outlined",className:"absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#440034] peer-focus:dark:text-[#440034] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1",children:"Project Name"})]}),(0,s.jsxs)("div",{className:"relative mt-6 w-full flex items-center gap-6",children:[(0,s.jsx)("label",{className:"font-medium",children:"Visibility : "}),(0,s.jsxs)("select",{onChange:e=>x(t=>({...t,visibility:e.target.value})),className:"px-4 py-2 rounded-lg focus:border-[#440034] border-gray-300 peer-focus:dark:text-[#440034] focus:ring-[#440034] flex-1",children:[(0,s.jsx)("option",{value:"Select",children:"Select"}),(0,s.jsx)("option",{value:"Public",children:"Public"}),(0,s.jsx)("option",{value:"Private",children:"Private"})]})]}),(0,s.jsxs)("div",{className:"mt-6 flex justify-end gap-4",children:[(0,s.jsx)("button",{onClick:r=>{r.preventDefault(),t(!e)},className:"text-md font-semibold border-[1.5px] border-[#3a0035] text-[#3a0035] px-4 py-2 rounded-lg",children:"Cancel"}),(0,s.jsx)("button",{className:"text-md font-semibold text-white bg-[#3a0035] px-4 py-2 rounded-lg",onClick:h,children:"Create Project"})]})]})})})})})]})})]})};var w=j},28022:function(){}},function(e){e.O(0,[445,16,551,586,810,275,903,774,888,179],function(){return e(e.s=37670)}),_N_E=e.O()}]);