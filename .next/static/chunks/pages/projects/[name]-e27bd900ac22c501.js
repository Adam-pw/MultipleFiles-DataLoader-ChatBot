(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[553],{63645:function(e,r,a){(window.__NEXT_P=window.__NEXT_P||[]).push(["/projects/[name]",function(){return a(67030)}])},15415:function(e,r,a){"use strict";a.d(r,{R:function(){return i},l:function(){return o}});var t=a(98690),s=a.n(t),l=a(48764).lW;s().config.update({accessKeyId:"AKIASR6BAKZYEE7KBYVM",secretAccessKey:"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",region:"ap-south-1"});let n=new(s()).S3,o=new(s()).DynamoDB.DocumentClient,i=async(e,r,a)=>{try{let t="user_".concat(e);console.log(a);let s=a.map(e=>{let s={Bucket:"multiple-file-chatbot",Key:"".concat(t,"/").concat(r,"/").concat(e.name),Body:a},o=new FileReader,i=new Promise((e,r)=>{o.onload=r=>{var a;return e(null===(a=r.target)||void 0===a?void 0:a.result)},o.onerror=e=>r(e)});return o.readAsArrayBuffer(e),i.then(e=>{let r=l.from(e);return s.Body=r,n.upload(s).promise()})});await Promise.all(s),console.log('All files uploaded successfully to "'.concat(t,'" folder.'))}catch(e){console.error("Error uploading files:",e)}}},67030:function(e,r,a){"use strict";a.r(r),a.d(r,{default:function(){return w}});var t=a(85893),s=a(11163),l=a(67294),n=a(24903),o=a(15415),i=a(74403),c=a(39828),d=a(3349);let m=e=>{let{setLoadinghe:r,appName:a}=e,[s,n]=(0,l.useState)([]),[m,u,p]=(0,d.F_)(i.I),[x,g]=(0,l.useState)(""),[h,f]=(0,l.useState)([]),[b,y]=(0,l.useState)([]);(0,l.useEffect)(()=>{let e=(0,c.IO)((0,c.hJ)(i.db,"projects"));(0,c.cf)(e,e=>{y(e.docs.map(e=>({id:e.id,data:e.data()})))})},[]);let _=()=>{r(!0),s.length>0&&console.log("Locally stored files:",s)},j=e=>{let r=Array.from(e.target.files);n(r)},v=async e=>{let t;e.preventDefault();let l=new FormData;(0,o.R)(null==m?void 0:m.uid,a,s),s.forEach(e=>{l.append("files",e)}),b.map(e=>{e.data.projectName===a&&(t=e.data.nameSpace)}),l.append("nameSpace",t),l.append("links",JSON.stringify(h));try{let e=await fetch("/api/upload",{method:"POST",body:l});e.ok?(console.log("Files uploaded successfully"),r(!1)):(console.error("Failed to upload files"),r(!1))}catch(e){r(!1),console.error("Error occurred while uploading files",e)}},w=e=>{e.preventDefault(),f([...h,x])},k=e=>{e.preventDefault(),r(!0),fetch("/api/crawl?url=".concat(encodeURIComponent("".concat(x)))).then(e=>e.json()).then(e=>{console.log(e),f(e),r(!1)})};return(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("div",{className:"flex items-center justify-center w-full",children:(0,t.jsxs)("form",{className:"w-[60vw] py-8 flex flex-col",children:[(0,t.jsx)("div",{className:"px-2 my-4 text-center font-semibold text-lg",children:"Train the bot using any URL, File or both"}),(0,t.jsx)("div",{className:"px-2 text-md font-semibold",children:"Automatic fetch links :"}),(0,t.jsxs)("div",{className:"flex relative gap-4 my-4 w-full items-center",children:[(0,t.jsx)("input",{type:"text",id:"floating_outlined",className:"block px-2.5 flex-1 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#440034] focus:outline-none focus:ring-0 focus:border-[#440034] peer",placeholder:"",onChange:e=>g(e.target.value)}),(0,t.jsx)("label",{htmlFor:"floating_outlined",className:"absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#440034] peer-focus:dark:text-[#440034] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1",children:"Enter your URL"}),(0,t.jsx)("button",{className:"text-md font-semibold text-white bg-[#3a0035] px-4 py-2 rounded-lg",onClick:k,children:"Fetch Links"})]}),(0,t.jsx)("div",{className:"text-center py-2 font-semibold",children:"OR"}),(0,t.jsx)("div",{className:"px-2 text-md font-semibold",children:"Manually add links"}),(0,t.jsxs)("div",{className:"flex relative gap-4 my-4 w-full items-center",children:[(0,t.jsx)("input",{type:"text",id:"floating_outlined",className:"block px-2.5 flex-1 pb-2.5 pt-4 text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-[#440034] focus:outline-none focus:ring-0 focus:border-[#440034] peer",placeholder:"",onChange:e=>g(e.target.value)}),(0,t.jsx)("label",{htmlFor:"floating_outlined",className:"absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-[#440034] peer-focus:dark:text-[#440034] peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1",children:"Enter your URL"}),(0,t.jsx)("button",{className:"text-md font-semibold text-white bg-[#3a0035] px-4 py-2 rounded-lg",onClick:w,children:"Add Link"})]}),h.length>0&&(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("div",{className:"h-60 overflow-y-scroll my-8 shadow-lg border border-neutral-200 rounded-lg p-4",children:null==h?void 0:h.map((e,r)=>(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("div",{className:"my-1 rounded-lg py-2 px-2",children:e})}))})}),(0,t.jsxs)("label",{htmlFor:"dropzone-file",className:"flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600",children:[(0,t.jsxs)("div",{className:"flex flex-col items-center justify-center pt-5 pb-6",children:[(0,t.jsx)("svg",{"aria-hidden":"true",className:"w-10 h-10 mb-3 text-gray-400",fill:"none",stroke:"currentColor",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"})}),(0,t.jsxs)("p",{className:"mb-2 text-sm text-gray-500 dark:text-gray-400",children:[(0,t.jsx)("span",{className:"font-semibold",children:"Click to upload"})," or drag and drop"]}),(0,t.jsx)("p",{className:"mb-2 text-sm text-gray-500 dark:text-gray-400",children:"The files you want to train the boat on"}),(0,t.jsx)("p",{className:"text-xs text-gray-500 dark:text-gray-400",children:"SVG, PNG, JPG or GIF (MAX. 800x400px)"})]}),(0,t.jsx)("input",{id:"dropzone-file",type:"file",className:"hidden",onChange:e=>{j(e)},multiple:!0})]}),(0,t.jsx)("div",{className:"flex justify-center pt-8 pb-4",children:s.length>0&&(0,t.jsxs)("div",{className:"flex gap-4 text-[#ff001b] font-medium",children:[(0,t.jsx)("p",{children:"Selected files :"}),(0,t.jsx)("ul",{children:s.map((e,r)=>(0,t.jsx)("li",{children:e.name},r))})]})}),(0,t.jsx)("div",{className:"flex justify-center pb-4",children:(0,t.jsx)("button",{className:"px-4 py-2 bg-[#310036] text-white rounded-lg",onClick:e=>{_(),v(e)},type:"submit",children:"Train the boat"})})]})})})};var u=a(97184),p=a(55299),x=a(4871),g=a.n(x);let h=e=>{let{color:r="#000",style:a="small"}=e;return(0,t.jsxs)("span",{className:"small"==a?g().loading2:g().loading,children:[(0,t.jsx)("span",{style:{backgroundColor:r}}),(0,t.jsx)("span",{style:{backgroundColor:r}}),(0,t.jsx)("span",{style:{backgroundColor:r}})]})};h.defaultProps={style:"small"};var f=a(28122),b=a.n(f),y=a(25675),_=a.n(y);let j=e=>{let{appName:r}=e,[a,s]=(0,l.useState)(""),[n,o]=(0,l.useState)(!1),[i,c]=(0,l.useState)(null),[d,m]=(0,l.useState)({messages:[{message:"Ask me anything about ".concat(r),type:"apiMessage"}],history:[]}),{messages:x,history:g}=d,f=(0,l.useRef)(null),y=(0,l.useRef)(null);async function j(e){if(e.preventDefault(),c(null),!a){alert("Please input a question");return}let r=a.trim();m(e=>({...e,messages:[...e.messages,{type:"userMessage",message:r}]})),o(!0),s("");try{var t;let e=await fetch("/api/askMeRealTimeData",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({question:r,history:g})}),a=await e.json();console.log("data",a),a.error?c(a.error):m(e=>({...e,messages:[...e.messages,{type:"apiMessage",message:a.text,sourceDocs:a.sourceDocuments}],history:[...e.history,[r,a.text]]})),console.log("messageState",d),o(!1),null===(t=f.current)||void 0===t||t.scrollTo(0,f.current.scrollHeight)}catch(e){o(!1),c("An error occurred while fetching the data. Please try again."),console.log("error",e)}}let v=e=>{"Enter"===e.key&&a?j(e):"Enter"==e.key&&e.preventDefault()};return(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)("div",{className:"mx-auto flex flex-col gap-4 mt-6",children:[(0,t.jsxs)("h1",{className:"text-2xl font-bold leading-[1.1] text-center tracking-wide",children:[(0,t.jsx)("span",{className:"text-[#280036]",children:"Chat With "}),(0,t.jsx)("span",{className:"text-[#ff0041]",children:"".concat(r)})]}),(0,t.jsxs)("main",{className:b().main,children:[(0,t.jsx)("div",{className:b().cloud,children:(0,t.jsx)("div",{ref:f,className:b().messagelist,children:x.map((e,r)=>{let a,s;return"apiMessage"===e.type?(a=(0,t.jsx)(_(),{src:"/bot-image.png",alt:"AI",width:"40",height:"40",className:b().boticon,priority:!0},r),s=b().apimessage):(a=(0,t.jsx)(_(),{src:"/usericon.png",alt:"Me",width:"30",height:"30",className:b().usericon,priority:!0},r),s=n&&r===x.length-1?b().usermessagewaiting:b().usermessage),(0,t.jsxs)("div",{children:[(0,t.jsxs)("div",{className:s,children:[a,(0,t.jsx)("div",{className:b().markdownanswer,children:(0,t.jsx)(p.D,{linkTarget:"_blank",children:e.message})})]},"chatMessage-".concat(r)),e.sourceDocs&&(0,t.jsx)("div",{className:"p-5",children:(0,t.jsx)(u.UQ,{type:"single",collapsible:!0,className:"flex-col",children:e.sourceDocs.map((e,r)=>(0,t.jsx)("div",{children:(0,t.jsxs)(u.Qd,{value:"item-".concat(r),children:[(0,t.jsx)(u.o4,{children:(0,t.jsxs)("h3",{children:["Source ",r+1]})}),(0,t.jsxs)(u.vF,{children:[(0,t.jsx)(p.D,{linkTarget:"_blank",children:e.pageContent}),(0,t.jsxs)("p",{className:"mt-2",children:[(0,t.jsx)("b",{children:"Source:"})," ",e.metadata.source]})]})]})},"messageSourceDocs-".concat(r)))})},"sourceDocsAccordion-".concat(r))]},"chatMessage-".concat(r))})})}),(0,t.jsx)("div",{className:b().center,children:(0,t.jsx)("div",{className:b().cloudform,children:(0,t.jsxs)("form",{onSubmit:j,className:"flex",children:[(0,t.jsx)("textarea",{disabled:n,onKeyDown:v,ref:y,autoFocus:!1,rows:1,maxLength:512,id:"userInput",name:"userInput",placeholder:n?"Waiting for response...":"Ask us anything?",value:a,onChange:e=>s(e.target.value),className:b().textarea}),(0,t.jsx)("button",{type:"submit",disabled:n,className:b().generatebutton,children:n?(0,t.jsx)("div",{className:b().loadingwheel,children:(0,t.jsx)(h,{color:"#000"})}):(0,t.jsx)("svg",{viewBox:"0 0 20 20",className:b().svgicon,xmlns:"http://www.w3.org/2000/svg",children:(0,t.jsx)("path",{d:"M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"})})})]})})}),i&&(0,t.jsx)("div",{className:"border border-red-400 rounded-md p-4",children:(0,t.jsx)("p",{className:"text-red-500",children:i})})]})]})})},v=()=>{let e=(0,s.useRouter)(),r=e.query.name,a="".concat(r),[o,i]=(0,l.useState)(),[c,d]=(0,l.useState)(!1);return(0,t.jsx)(t.Fragment,{children:(0,t.jsxs)(n.Z,{children:[(0,t.jsx)("div",{className:"text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700 w-96 mx-auto flex justify-center",children:(0,t.jsxs)("ul",{className:"flex flex-wrap -mb-px",children:[(0,t.jsx)("li",{className:"mr-2",children:(0,t.jsx)("a",{href:"#",onClick:()=>d(!1),className:!1===c?"inline-block p-4 text-[#440034] border-b-2 border-[#440034] rounded-t-lg active dark:text-[#440034] dark:border-[#440034]":"inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300",children:"Train the Boat"})}),(0,t.jsx)("li",{className:"mr-2",children:(0,t.jsx)("a",{href:"#",onClick:()=>d(!0),className:!0===c?"inline-block p-4 text-[#440034] border-b-2 border-[#440034] rounded-t-lg active dark:text-[#440034] dark:border-[#440034]":"inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300","aria-current":"page",children:"Chat with the Boat"})})]})}),o&&(0,t.jsx)(t.Fragment,{children:(0,t.jsx)("div",{className:"flex justify-center items-center mt-8",children:(0,t.jsx)("div",{children:(0,t.jsx)("div",{className:"inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]",role:"status",children:(0,t.jsx)("span",{className:"!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]",children:"Loading..."})})})})}),!1===c?(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(m,{appName:a,setLoadinghe:i})}):(0,t.jsx)(t.Fragment,{children:(0,t.jsx)(j,{appName:a})})]})})};var w=v},28122:function(e){e.exports={main:"Home_main__nLjiQ",header:"Home_header__GCVRv",cloudform:"Home_cloudform__W4PLJ",textarea:"Home_textarea__lSHf7",generatebutton:"Home_generatebutton__omKYX",loadingwheel:"Home_loadingwheel__IWJnE",svgicon:"Home_svgicon__PLaWz",messagelist:"Home_messagelist__YHr8p",messagelistloading:"Home_messagelistloading__tlCYV",usermessage:"Home_usermessage__tWHWR",usermessagewaiting:"Home_usermessagewaiting__PYv_4","loading-gradient":"Home_loading-gradient__8jpVG",apimessage:"Home_apimessage__VhfTn",fadein:"Home_fadein__CBLON",markdownanswer:"Home_markdownanswer__UUDfu",boticon:"Home_boticon__Xr0Q4",usericon:"Home_usericon___BrVD",center:"Home_center__4BFgC",cloud:"Home_cloud__S7par",pointsnormal:"Home_pointsnormal__yRwA_",pointsdim:"Home_pointsdim__x_zcw",footer:"Home_footer____T7K",topnav:"Home_topnav__BfkuW",navlogo:"Home_navlogo__AhPAx"}},4871:function(e){e.exports={loading:"loading-dots_loading__LomzL",spacer:"loading-dots_spacer__nBBvk",blink:"loading-dots_blink__yy72w",loading2:"loading-dots_loading2___zCAu"}},28022:function(){}},function(e){e.O(0,[445,16,551,586,810,275,911,903,774,888,179],function(){return e(e.s=63645)}),_N_E=e.O()}]);