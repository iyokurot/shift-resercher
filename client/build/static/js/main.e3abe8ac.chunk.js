(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{105:function(e,t,a){},106:function(e,t,a){},107:function(e,t,a){},108:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),i=a(9),r=a.n(i),o=(a(72),a(14)),l=a(15),c=a(18),m=a(16),u=a(19),d=a(28),h=a(24),f=a(137),p=a(139),b=Object(f.a)(function(e){return{container:{display:"flex",flexWrap:"wrap"},input:{margin:e.spacing(1)}}}),y=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).onChangeusername=function(e){a.setState({username:e.target.value})},a.postdata=function(){if(""===a.state.username)alert("\u540d\u524d\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044");else if(a.state.username.length>10)alert("\u30e6\u30fc\u30b6\u30fc\u540d\u306f10\u6587\u5b57\u4ee5\u5185\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044");else{var e={username:a.state.username,worktime:a.state.worktime};fetch("/register",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}).then(function(e){return a.props.history.push("/Home")})}},a.state={userdata:[],username:"",worktime:"\u65e9"},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/userdata").then(function(e){return e.json()}).then(function(t){null==t.regist||t.regist||e.setState({userdata:t,username:t.displayName})})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("h1",null,"Sign Up"),s.a.createElement("div",{className:"profileholder"},s.a.createElement("div",{className:"profilesetting"},s.a.createElement("div",{className:"profilecard"},s.a.createElement("img",{alt:"profile",src:this.state.userdata.picture,id:"profileimage"}),s.a.createElement("p",{id:"linename"},this.state.userdata.displayName)),s.a.createElement("div",null,"\u30e6\u30fc\u30b6\u30fc\u540d\uff1a",s.a.createElement(p.a,{id:"username",value:this.state.username,onChange:this.onChangeusername,className:b.input,inputProps:{"aria-label":"username"},placeholder:"10\u6587\u5b57\u4ee5\u5185"}),s.a.createElement("p",{id:"namesubtitle"},"\u30b5\u30a4\u30c8\u5185\u3067\u4f7f\u7528\u3059\u308b\u540d\u524d\u3092\u8a18\u5165\u3057\u3066\u304f\u3060\u3055\u3044")),s.a.createElement("div",{className:"worktime"},"\u52e4\u52d9\u533a\u5206:",s.a.createElement("span",null,s.a.createElement("input",{type:"radio",name:"worktime",value:"\u65e9",checked:"\u65e9"===this.state.worktime,onChange:function(){return e.setState({worktime:"\u65e9"})}}),"\u65e9\u756a",s.a.createElement("input",{type:"radio",name:"worktime",value:"\u9045",checked:"\u9045"===this.state.worktime,onChange:function(){return e.setState({worktime:"\u9045"})}}),"\u9045\u756a")),s.a.createElement("button",{onClick:this.postdata,className:"bluebutton",id:"registerbutton"},"\u767b\u9332"))))}}]),t}(n.Component),g=a(63),v=a.n(g),E=a(21),w=a.n(E),k=a(4),C=a(140),S={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"},formcontrol:{fontSize:"10px"}},N=Object(k.a)({root:{"& label.Mui-focused":{color:"#5f28c4"},"& .MuiOutlinedInput-root":{"&.Mui-focused fieldset":{borderColor:"#5f28c4"}}}})(C.a);w.a.setAppElement("#root");var O=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).deadlineEarly=10,a.deadlineLate=24,a.setdefaultshifts=function(e){var t=[],n=!0,s=!1,i=void 0;try{for(var r,o=e[Symbol.iterator]();!(n=(r=o.next()).done);n=!0){var l=r.value;t[l.date]={text:l.detail}}}catch(c){s=!0,i=c}finally{try{n||null==o.return||o.return()}finally{if(s)throw i}}a.setState({default_month_days:t,month_days:t.slice()})},a.setdefaultcomment=function(e){if(""!==e){var t=[],n=!0,s=!1,i=void 0;try{for(var r,o=e[Symbol.iterator]();!(n=(r=o.next()).done);n=!0){var l=r.value,c=new Date(l.date);t[c.getFullYear()+("0"+(c.getMonth()+1)).slice(-2)+("0"+c.getDate()).slice(-2)]={comment:l.text,wishday:l.wishday}}}catch(f){s=!0,i=f}finally{try{n||null==o.return||o.return()}finally{if(s)throw i}}var m=a.state.receptionDate,u=m.getFullYear()+("0"+(m.getMonth()+1)).slice(-2)+("0"+m.getDate()).slice(-2),d="",h="";null!=t[u]&&(d=t[u].comment,h=t[u].wishday),a.setState({default_comments:t.slice(),comments:t,comment:d,wishday:h,nowprintcommentday:u}),a.setComplementdays(m)}},a.getDateReception=function(){var e=a.state.date.getFullYear(),t=a.state.date.getMonth()+1,n=a.state.date.getDate(),s="",i="",r="";if(n<=a.deadlineEarly)i=t+"/10\u307e\u3067("+(s=t+"/16\uff5e"+t+"/"+new Date(e,t,0).getDate())+")",r=e+"/"+t+"/16";else if(n>a.deadlineLate){12===t&&(e++,t=0),i=t+1+"/10\u307e\u3067("+(s=t+1+"/16\uff5e"+(t+1)+"/"+new Date(e,t,0).getDate())+")",r=e+"/"+(t+1)+"/16"}else 12===t&&(e++,t=0),i=t+"/24\u307e\u3067("+(s=t+1+"/1\uff5e"+(t+1)+"/15")+")",r=e+"/"+(t+1)+"/1";a.setState({complementdaysText:s,deadline:i,receptionDate:new Date(r)})},a.setComplementdays=function(e){var t=e.getMonth()+1,n=e.getDate(),s="";if(1===n)s=t+"/1\uff5e"+t+"/15";else if(16===n){s=t+"/16\uff5e"+t+"/"+new Date(e.getFullYear(),t,0).getDate()}a.setState({complementdaysText:s})},a.getTileContent=function(e){var t=e.date;if("month"!==e.view)return null;var n=a.getFormatDate(t);return s.a.createElement("p",{className:"calendaritem"},a.state.month_days[n]&&a.state.month_days[n].text?a.state.month_days[n].text:"  ")},a.onClickstamp=function(e){a.setState({stamp:e})},a.dayClick=function(e){if(a.state.receptionDate<=e){var t=a.state.month_days,n=e.getFullYear()+("0"+(e.getMonth()+1)).slice(-2)+("0"+e.getDate()).slice(-2);a.setState({clickdate:n}),null==t[n]||""===t[n].text?"time"===a.state.stamp?a.openModal():(t[n]={text:a.state.stamp},a.setState({month_days:t})):a.state.stamp===t[n].text?(t[n]={text:""},a.setState({month_days:t})):a.state.stamp!==t[n].text&&("time"===a.state.stamp?t[n]={text:""}:(t[n]={text:a.state.stamp},a.setState({month_days:t})))}},a.dayspreOnclick=function(){a.dayspreback("pre")},a.daysbackOnclick=function(){a.dayspreback("back")},a.dayspreback=function(e){var t=a.state.comments;t[a.state.nowprintcommentday]={comment:a.state.comment,wishday:a.state.wishday},a.setState({comments:t});var n=a.state.nowprintcommentday,s=(n.substr(0,4)+"/"+n.substr(4,2)+"/"+n.substr(6,2)).split("/"),i=new Date(s[0],s[1]-1,s[2]),r=i.getFullYear(),o=i.getMonth(),l=i.getDate();if("pre"===e?16===l?l=1:0===o?(r--,o=11,l=16):(o--,l=16):"back"===e&&(1===l?l=16:11===o?(r++,o=0,l=1):(o++,l=1)),null==a.state.comments[a.getintdate(r,o,l)]){var c=a.state.comments;c[a.getintdate(r,o,l)]={comment:"",wishday:""},a.setState({comments:c})}a.setComplementdays(new Date(r,o,l)),a.setState({comment:a.state.comments[a.getintdate(r,o,l)].comment,wishday:a.state.comments[a.getintdate(r,o,l)].wishday,nowprintcommentday:a.getintdate(r,o,l)})},a.wishdayOnchange=function(e){a.setState({wishday:e.target.value})},a.commentOnchange=function(e){a.setState({comment:e.target.value})},a.openModal=function(){a.setState({modalIsOpen:!0})},a.closeModal=function(){a.setState({modalIsOpen:!1})},a.setShiftTime=function(){if(a.state.startTime>=a.state.endTime)alert("\u4e0d\u53ef\u80fd\u306a\u6642\u9593\u3067\u3059");else{a.closeModal();var e=a.state.month_days;e[a.state.clickdate]={text:a.state.startTime+"-"+a.state.endTime},a.setState({month_days:e})}},a.startTimeChange=function(e){a.setState({startTime:e.target.value})},a.endTimeChange=function(e){a.setState({endTime:e.target.value})},a.addDataOnClick=function(){var e=a.state.comments;e[a.state.nowprintcommentday]={comment:a.state.comment,wishday:a.state.wishday},a.setState({comments:e});var t=a.state.default_month_days,n=a.state.month_days,s=[];for(var i in n)null==t[i]&&(s[i]={text:n[i].text});var r=[];for(var o in t)""===n[o].text&&(r[o]={text:t[o].text});var l=[];for(var c in n)null!=t[c]&&""!==n[c].text&&t[c].text!==n[c].text&&(l[c]={text:n[c].text});s.length>0&&(a.setState({isUpdateshift:a.state.isUpdateshift.concat("add")}),a.dbUpdater("/addshiftdata",s)),r.length>0&&(a.setState({isUpdateshift:a.state.isUpdateshift.concat("delete")}),a.dbUpdater("/deleteshiftdata",r)),l.length>0&&(a.setState({isUpdateshift:a.state.isUpdateshift.concat("update")}),a.dbUpdater("/updateshiftdata",l));var m=[];for(var u in a.state.comments)null==a.state.default_comments[u]&&m.push({date:u,comment:a.state.comments[u].comment,wishday:a.state.comments[u].wishday});var d=[];for(var h in a.state.default_comments)a.state.comments[h].comment===a.state.default_comments[h].comment&&a.state.comments[h].wishday===a.state.default_comments[h].wishday||d.push({date:h,comment:a.state.comments[h].comment,wishday:a.state.comments[h].wishday});fetch("/updatecommentdata",{method:"POST",body:JSON.stringify(d),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}),fetch("/addcommentdata",{method:"POST",body:JSON.stringify(m),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}).then(function(e){return alert("\u767b\u9332\u3057\u307e\u3057\u305f")}),a.shiftupdateChecker("")},a.dbUpdater=function(e,t){var n=[];for(var s in t)n.push({date:s,text:t[s].text});fetch(e,{method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}).then(function(e){return a.shiftupdateChecker(e)})},a.shiftupdateChecker=function(e){if(""!==e){var t=[],n=!0,s=!1,i=void 0;try{for(var r,o=a.state.isUpdateshift[Symbol.iterator]();!(n=(r=o.next()).done);n=!0){var l=r.value;l!==e&&t.push(l)}}catch(c){s=!0,i=c}finally{try{n||null==o.return||o.return()}finally{if(s)throw i}}t.length<=0&&(fetch("/shiftdata").then(function(e){return e.json()}).then(function(e){return a.setdefaultshifts(e)}),fetch("/getcommentdata").then(function(e){return e.json()}).then(function(e){return a.setdefaultcomment(e)})),a.setState({isUpdateshift:t})}else a.state.isUpdateshift.length<=0&&(fetch("/shiftdata").then(function(e){return e.json()}).then(function(e){return a.setdefaultshifts(e)}),fetch("/getcommentdata").then(function(e){return e.json()}).then(function(e){return a.setdefaultcomment(e)}))},a.pushtoInfomation=function(){a.props.history.push("/Information")},a.state={userdata:[],date:new Date,receptionDate:new Date,stamp:"x",stamptime:"",deadline:"",default_month_days:[],month_days:[],shifttimes:["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30","23:45"],startTime:"09:00",endTime:"09:00",complementdaysText:"",wishdays:["",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],default_comments:[],comments:[],wishday:"",comment:"",nowprintcommentday:"",modalIsOpen:!1,isUpdateshift:[],informations:[]},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.getDateReception(),fetch("/userdata").then(function(e){return e.json()}).then(function(t){return e.setState({userdata:t})}),fetch("/shiftdata").then(function(e){return e.json()}).then(function(t){return e.setdefaultshifts(t)}),fetch("/getcommentdata").then(function(e){return e.json()}).then(function(t){return e.setdefaultcomment(t)}),fetch("/informationdatathree").then(function(e){return e.json()}).then(function(t){return e.setState({informations:t})})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("div",{id:"personalheader"},s.a.createElement(d.b,{to:"/Setting",id:"setting"},s.a.createElement("div",{id:"settingimg"})),s.a.createElement("a",{href:"/logout"},s.a.createElement("span",{className:"redbutton"},"\u30ed\u30b0\u30a2\u30a6\u30c8"))),s.a.createElement("h1",null,"Home"),"\u3088\u3046\u3053\u305d\uff01",this.state.userdata.username,"\u3055\u3093",s.a.createElement("h2",{className:"reception"},this.state.receptionDate.getFullYear()," ",this.state.receptionDate.getMonth()+1,"\u6708",this.state.receptionDate.getDate(),"\u65e5\uff5e\u53d7\u4ed8\u4e2d"),s.a.createElement("div",{id:"dateText"},this.state.deadline),s.a.createElement("div",{id:"infoFlame"},s.a.createElement("span",{id:"infoTitle"},"\u304a\u3057\u3089\u305b"),s.a.createElement("div",null,s.a.createElement("table",{id:"infotable"},s.a.createElement("tbody",null,this.state.informations.map(function(t){return s.a.createElement("tr",{key:t.id},s.a.createElement("td",{id:"infotabledate"},e.slashformatDate(t.date)),s.a.createElement("td",{id:"infotabletitle"},s.a.createElement("span",null,t.title)))})))),s.a.createElement("button",{className:"lightgreenbutton",onClick:this.pushtoInfomation},"\u4e00\u89a7\u3078")),s.a.createElement("div",{className:"itemholder"},s.a.createElement("button",{className:"redbutton",onClick:this.onClickstamp.bind(this,"x")},"\u2715"),s.a.createElement("button",{className:"greenbutton",onClick:this.onClickstamp.bind(this,"\u25b3")},"\u25b3"),s.a.createElement("button",{className:"bluebutton",onClick:this.onClickstamp.bind(this,"time")},"\u6642\u9593\u6307\u5b9a")),s.a.createElement("div",{id:"calendar"},s.a.createElement(v.a,{locale:"ja-JP",calendarType:"US",value:this.state.receptionDate,tileContent:this.getTileContent.bind(this),onChange:function(t){return e.dayClick(t)}})),s.a.createElement("div",{className:"flameholder"},s.a.createElement("div",{className:"flame"},"\u88dc\u8db3\u5e0c\u671b:",this.state.complementdaysText,s.a.createElement("span",{id:"termbuttons"},s.a.createElement("button",{onClick:this.dayspreOnclick,className:"bluebutton"},"\u25c1"),s.a.createElement("button",{onClick:this.daysbackOnclick,className:"bluebutton"},"\u25b7")),s.a.createElement("br",null),s.a.createElement("div",{id:"wishday"},"\u5e0c\u671b\u51fa\u52e4\u65e5\u6570\uff1a",s.a.createElement("select",{onChange:this.wishdayOnchange,value:this.state.wishday},this.state.wishdays.map(function(e){return s.a.createElement("option",{key:e},e)})),"\u65e5"),s.a.createElement("div",null,s.a.createElement(N,{id:"outlined-name",label:"\u8ffd\u8a18",value:this.state.comment,onChange:this.commentOnchange,margin:"normal",variant:"outlined",placeholder:"\u5e0c\u671b\u3092\u8a18\u5165"}))),s.a.createElement("button",{id:"submit_shiftdata",onClick:this.addDataOnClick},"\u767b\u9332")),s.a.createElement(w.a,{isOpen:this.state.modalIsOpen,onAfterOpen:this.afterOpenModal,onRequestClose:this.closeModal,style:S,contentLabel:"worktime Modal"},s.a.createElement("h2",{className:"modaltitle"},"\u51fa\u52e4\u53ef\u80fd\u6642\u9593\u3092\u9078\u629e"),s.a.createElement("div",null,s.a.createElement("select",{className:"timeselect",onChange:this.startTimeChange,value:this.state.startTime},this.state.shifttimes.map(function(e){return s.a.createElement("option",{key:e},e)})),"\uff5e",s.a.createElement("select",{className:"timeselect",onChange:this.endTimeChange,value:this.state.endTime},this.state.shifttimes.map(function(e){return s.a.createElement("option",{key:e},e)}))),s.a.createElement("button",{className:"redbutton",onClick:this.closeModal},"\u9589\u3058\u308b"),s.a.createElement("button",{className:"bluebutton",onClick:this.setShiftTime},"\u6c7a\u5b9a")))}},{key:"getintdate",value:function(e,t,a){return e+("0"+(t+1)).slice(-2)+("0"+a).slice(-2)}},{key:"slashformatDate",value:function(e){var t=new Date(e);return t.getFullYear()+"/"+(t.getMonth()+1)+"/"+t.getDate()}},{key:"getFormatDate",value:function(e){return"".concat(e.getFullYear()).concat(("0"+(e.getMonth()+1)).slice(-2)).concat(("0"+e.getDate()).slice(-2))}},{key:"afterOpenModal",value:function(){}}]),t}(n.Component),j=Object(f.a)(function(e){return{container:{display:"flex",flexWrap:"wrap"},input:{margin:e.spacing(1)}}}),D={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}};w.a.setAppElement("#root");var M=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).loadmemberlist=function(){fetch("/memberlist").then(function(e){return e.json()}).then(function(e){a.setState({memberlist:e});var t=[],n=[],s=!0,i=!1,r=void 0;try{for(var o,l=e[Symbol.iterator]();!(s=(o=l.next()).done);s=!0){var c=o.value;c.administer?t.push(c):n.push(c)}}catch(m){i=!0,r=m}finally{try{s||null==l.return||l.return()}finally{if(i)throw r}}a.setState({administerlist:t,nonadministerlist:n,addministeroption:n[0]})})},a.onChangeusername=function(e){a.setState({username:e.target.value})},a.updateUsername=function(){a.state.username!==a.state.userdata.username&&(""===a.state.username?alert("\u540d\u524d\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044"):a.state.username.length>10?alert("\u30e6\u30fc\u30b6\u30fc\u540d\u306f10\u6587\u5b57\u4ee5\u5185\u3067\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044"):fetch("/updateusername",{method:"POST",body:JSON.stringify([a.state.username]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}).then(function(e){alert("\u767b\u9332\u3057\u307e\u3057\u305f");var t=a.state.userdata;t.username=a.state.username,a.setState({userdata:t})}))},a.onChangeworktime=function(){a.setState({ischangeworktime:!0})},a.setworktime=function(){if(a.state.userdata.worktime!==a.state.worktime){fetch("/updateworktime",{method:"POST",body:JSON.stringify([a.state.worktime]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()});var e=a.state.userdata;e.worktime=a.state.worktime,a.setState({userdata:e})}a.setState({ischangeworktime:!1})},a.onClickunsubsribe=function(){window.confirm("\u9000\u4f1a\u3057\u307e\u3059\u304b\uff1f\n\u5168\u30e6\u30fc\u30b6\u30fc\u30c7\u30fc\u30bf\u304c\u524a\u9664\u3055\u308c\u307e\u3059")&&(fetch("/deleteuser",{method:"POST",headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}),fetch("/logout").then(function(e){return e.json()}),a.pushtoHome())},a.pushtoHome=function(){a.props.history.push("/")},a.pushtoInformation=function(){a.props.history.push("/Information")},a.openmemberModal=function(){a.setState({memberModalopen:!0})},a.closememberModal=function(){a.setState({memberModalopen:!1})},a.onClickdeletemember=function(e){window.confirm(e.name+"\u3092\u672c\u5f53\u306b\u524a\u9664\u3057\u307e\u3059\u304b\uff1f\n\u8a72\u5f53\u30e6\u30fc\u30b6\u30fc\u306e\u30b7\u30d5\u30c8\u60c5\u5831\u3082\u524a\u9664\u3055\u308c\u307e\u3059")&&fetch("/deletemember",{method:"POST",body:JSON.stringify([e.userid]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}).then(function(e){a.closememberModal(),a.loadmemberlist()})},a.onClickdeleteadminister=function(e){window.confirm(e.name+"\u306e\u7ba1\u7406\u8005\u6a29\u9650\u3092\u5265\u596a\u3057\u307e\u3059\u304b\uff1f")&&fetch("/deleteadminister",{method:"POST",body:JSON.stringify([e.userid]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}).then(function(e){a.closeadministerModal(),a.loadmemberlist()})},a.onChangeaddministeroption=function(e){var t=!0,n=!1,s=void 0;try{for(var i,r=a.state.nonadministerlist[Symbol.iterator]();!(t=(i=r.next()).done);t=!0){var o=i.value;if(o.name===e.target.value){a.setState({addministeroption:o});break}}}catch(l){n=!0,s=l}finally{try{t||null==r.return||r.return()}finally{if(n)throw s}}},a.onClickadminister=function(){a.setState({isAddadminister:!0})},a.onClickaddAdminister=function(){var e=a.state.addministeroption;window.confirm(e.name+"\u306b\u7ba1\u7406\u8005\u6a29\u9650\u3092\u6388\u4e0e\u3057\u307e\u3059\u304b\uff1f")&&fetch("/addadminister",{method:"POST",body:JSON.stringify([e.userid]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}).then(function(e){a.closeadministerModal(),a.loadmemberlist()})},a.closeadministerModal=function(){a.setState({administerModalopen:!1,isAddadminister:!1})},a.state={userdata:[],username:"",worktime:"",memberlist:[],administerlist:[],nonadministerlist:[],addministeroption:[],ischangeworktime:!1,test:"",memberModalopen:!1,administerModalopen:!1,isAddadminister:!1},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/userdata").then(function(e){return e.json()}).then(function(t){e.setState({userdata:t,username:t.username,worktime:t.worktime}),t.administer&&e.loadmemberlist()})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("h1",null,"Settings"),s.a.createElement("div",{className:"profileholder"},s.a.createElement("div",{className:"profilesetting"},s.a.createElement("div",{className:"profilecard"},s.a.createElement("img",{src:this.state.userdata.picture,id:"profileimage",alt:"profile"}),s.a.createElement("p",{id:"linename"},this.state.userdata.displayName)),s.a.createElement("div",null,"\u30e6\u30fc\u30b6\u30fc\u540d",s.a.createElement(p.a,{id:"username",value:this.state.username,onChange:this.onChangeusername,className:j.input,inputProps:{"aria-label":"username"},placeholder:"10\u6587\u5b57\u4ee5\u5185"}),s.a.createElement("button",{onClick:this.updateUsername,className:"bluebutton",id:"updatebutton"},"\u66f4\u65b0")),s.a.createElement("div",{className:"worktime"},"\u52e4\u52d9\u533a\u5206:",this.state.ischangeworktime?s.a.createElement("span",null,s.a.createElement("input",{type:"radio",name:"worktime",value:"\u65e9",checked:"\u65e9"===this.state.worktime,onChange:function(){return e.setState({worktime:"\u65e9"})}}),"\u65e9\u756a",s.a.createElement("input",{type:"radio",name:"worktime",value:"\u9045",checked:"\u9045"===this.state.worktime,onChange:function(){return e.setState({worktime:"\u9045"})}}),"\u9045\u756a",s.a.createElement("button",{onClick:this.setworktime,className:"bluebutton"},"\u66f4\u65b0")):s.a.createElement("span",null,this.state.userdata.worktime,"\u756a",s.a.createElement("button",{onClick:this.onChangeworktime,className:"bluebutton"},"\u5909\u66f4"))),s.a.createElement("button",{onClick:this.onClickunsubsribe,className:"redbutton",id:"disbutton"},"\u9000\u4f1a"))),s.a.createElement("div",{style:{display:this.state.userdata.administer?"":"none"},className:"administerview"},s.a.createElement("h2",{className:"administerheader"},"\u7ba1\u7406\u8005\u6a29\u9650"),s.a.createElement(d.b,{to:"/Wishlist"},s.a.createElement("span",{className:"administerbutton",id:"wishlistbutton"},"\u5e0c\u671b\u4e00\u89a7")),s.a.createElement("br",null),s.a.createElement("button",{onClick:this.pushtoInformation,className:"administerbutton",style:{width:"250px"}},"\u304a\u77e5\u3089\u305b\u914d\u4fe1"),s.a.createElement("br",null),s.a.createElement("button",{onClick:this.openmemberModal,className:"administerbutton"},"\u767b\u9332\u8005\u4e00\u89a7"),s.a.createElement("button",{onClick:function(t){return e.setState({administerModalopen:!0})},className:"administerbutton"},"\u7ba1\u7406\u8005\u4e00\u89a7")),s.a.createElement(w.a,{isOpen:this.state.memberModalopen,onRequestClose:this.closememberModal,style:D,contentLabel:"Register Modal"},s.a.createElement("h2",{className:"modaltitle"},"\u767b\u9332\u8005\u4e00\u89a7"),this.state.memberlist.map(function(t){return s.a.createElement("div",{key:t.userid},t.name,s.a.createElement("span",{style:{display:t.userid!==e.state.userdata.userId?"":"none"}},s.a.createElement("button",{className:"redbutton",value:t.userid,onClick:function(a){return e.onClickdeletemember(t)}},"\u767b\u9332\u524a\u9664")))}),s.a.createElement("button",{className:"redbutton",onClick:this.closememberModal},"\u9589\u3058\u308b")),s.a.createElement(w.a,{isOpen:this.state.administerModalopen,onRequestClose:this.closeadministerModal,style:D,contentLabel:"Administer Modal"},s.a.createElement("h2",{className:"modaltitle"},"\u7ba1\u7406\u8005\u4e00\u89a7"),this.state.administerlist.map(function(t){return s.a.createElement("div",{key:t.userid},t.name,s.a.createElement("span",{style:{display:t.userid!==e.state.userdata.userId?"":"none"}},s.a.createElement("button",{className:"redbutton",onClick:function(a){return e.onClickdeleteadminister(t)}},"\u89e3\u9664")))}),this.state.isAddadminister&&this.state.nonadministerlist.length>0?s.a.createElement("span",null,s.a.createElement("select",{className:"timeselect",onChange:this.onChangeaddministeroption,value:this.state.addministeroption.name},this.state.nonadministerlist.map(function(e){return s.a.createElement("option",null,e.name)})),s.a.createElement("button",{className:"bluebutton",onClick:function(t){return e.onClickaddAdminister()}},"\u8ffd\u52a0")):s.a.createElement("button",{className:"bluebutton",onClick:function(t){return e.onClickadminister()}},"\u8ffd\u52a0"),s.a.createElement("button",{className:"redbutton",onClick:this.closeadministerModal},"\u9589\u3058\u308b")))}}]),t}(n.Component),T=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).setdefaultDays=function(){var e=new Date,t=e.getFullYear(),n=e.getMonth(),s=e.getDate(),i="";s<a.state.deadlineearly?i=new Date(t,n,1):s<a.state.deallinelate?i=new Date(t,n,16):s>=a.state.deallinelate&&(i=11===n?new Date(t+1,n+1,1):new Date(t,n+1,1)),a.setprintDays(i)},a.onClickchangeterm=function(e){var t=a.state.startdate,n=t.getFullYear(),s=t.getMonth(),i=t.getDate(),r=e.target.value;"pre"===r?16===i?i=1:1===i&&(0===s?(n--,s=11,i=16):(s--,i=16)):"back"===r&&(1===i?i=16:16===i&&(11===s?(n++,s=0,i=1):(s++,i=1)));var o=new Date(n,s,i);a.setState({startdate:o}),a.setprintDays(o),a.sortmembershift(a.state.memberlist,a.state.allshiftdata,o),a.sortmembercomment(a.state.memberlist,a.state.allcommentdata,o)},a.setprintDays=function(e){var t=[];if(1===e.getDate())for(var n=0;n<15;n++)t.push(e.getMonth()+1+"/"+(e.getDate()+n));else if(16===e.getDate())for(var s=new Date(e.getFullYear(),e.getMonth()+1,0),i=0;i<s.getDate()-e.getDate()+1;i++)t.push(e.getMonth()+1+"/"+(e.getDate()+i));a.setState({startdate:e,printdays:t})},a.sortmembershift=function(e,t,n){var s=n,i="",r=[];1===s.getDate()?(i=new Date(s.getFullYear(),s.getMonth(),15),r=Array(15)):16===s.getDate()&&(i=new Date(s.getFullYear(),s.getMonth()+1,0),r=Array(i.getDate()-15));var o=[],l=!0,c=!1,m=void 0;try{for(var u,d=e[Symbol.iterator]();!(l=(u=d.next()).done);l=!0){var h=u.value,f=r.slice();f.fill("/");var p=!0,b=!1,y=void 0;try{for(var g,v=t[Symbol.iterator]();!(p=(g=v.next()).done);p=!0){var E=g.value;if(E.userid===h.userid){var w=String(E.date),k=parseInt(w.slice(0,4)),C=parseInt(w.slice(4,6)),S=parseInt(w.slice(6));k===s.getFullYear()&&C===s.getMonth()+1&&S>=s.getDate()&&S<=i.getDate()&&(f[S-s.getDate()]=E.detail)}}}catch(N){b=!0,y=N}finally{try{p||null==v.return||v.return()}finally{if(b)throw y}}o.push({name:h.name,shift:f})}}catch(N){c=!0,m=N}finally{try{l||null==d.return||d.return()}finally{if(c)throw m}}a.setState({printlist:o})},a.sortmembercomment=function(e,t,n){var s=n,i=[],r=!0,o=!1,l=void 0;try{for(var c,m=e[Symbol.iterator]();!(r=(c=m.next()).done);r=!0){var u=c.value,d=!1,h=!0,f=!1,p=void 0;try{for(var b,y=t[Symbol.iterator]();!(h=(b=y.next()).done);h=!0){var g=b.value;if(u.userid===g.userid){var v=new Date(g.date);if(s.getFullYear()+"/"+s.getMonth()+"/"+s.getDate()===v.getFullYear()+"/"+v.getMonth()+"/"+v.getDate()){i.push({name:u.name,wishday:g.wishday,comment:g.text}),d=!0;break}}}}catch(E){f=!0,p=E}finally{try{h||null==y.return||y.return()}finally{if(f)throw p}}d||(i.push({name:u.name,wishday:"",comment:""}),d=!1)}}catch(E){o=!0,l=E}finally{try{r||null==m.return||m.return()}finally{if(o)throw l}}a.setState({printcommentlist:i})},a.state={nowloading:!0,accessable:!1,memberlist:[],allshiftdata:[],allcommentdata:[],printlist:[],printcommentlist:[],deadlineearly:10,deallinelate:24,startdate:"",printdays:[]},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/userdata").then(function(e){return e.json()}).then(function(t){t.administer?(e.setState({accessable:!0}),e.setdefaultDays(),fetch("/memberlist").then(function(e){return e.json()}).then(function(t){e.setState({memberlist:t}),fetch("/allshiftdata").then(function(e){return e.json()}).then(function(a){e.setState({allshiftdata:a}),e.sortmembershift(t,a,e.state.startdate)}),fetch("/allcommentdata").then(function(e){return e.json()}).then(function(a){e.setState({allcommentdata:a,nowloading:!1}),e.sortmembercomment(t,a,e.state.startdate)})})):e.setState({nowloading:!1})})}},{key:"render",value:function(){return s.a.createElement("div",null,this.state.nowloading?s.a.createElement("div",null,"\u8aad\u307f\u8fbc\u307f\u4e2d"):s.a.createElement("div",null,this.state.accessable?s.a.createElement("div",null,s.a.createElement("h1",null,"Wishlist"),"\u30b7\u30d5\u30c8\u5e0c\u671b\u4e00\u89a7",s.a.createElement("button",{className:"bluebutton",value:"pre",onClick:this.onClickchangeterm},"\u25c1"),s.a.createElement("button",{className:"bluebutton",value:"back",onClick:this.onClickchangeterm},"\u25b7"),s.a.createElement("div",{className:"shittablediv"},s.a.createElement("table",{className:"shifttable"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",{className:"blank"},"\u540d\u524d"),this.state.printdays.map(function(e){return s.a.createElement("th",{key:e},e)}))),s.a.createElement("tbody",null,this.state.printlist.map(function(e){return s.a.createElement("tr",{key:e.name},s.a.createElement("th",{key:e.name},e.name),e.shift.map(function(e){return s.a.createElement("td",null,e)}))})))),s.a.createElement("div",{className:"wishtablediv"},s.a.createElement("h2",null,"\u88dc\u8db3\u5e0c\u671b"),s.a.createElement("table",{className:"wishtable"},s.a.createElement("thead",null,s.a.createElement("tr",{className:"tableheader"},s.a.createElement("th",{className:"tablename"},"\u540d\u524d"),s.a.createElement("th",{className:"tableday"},"\u65e5\u6570"),s.a.createElement("th",{className:"tablecomment"},"\u8ffd\u8a18"))),s.a.createElement("tbody",null,this.state.printcommentlist.map(function(e){return s.a.createElement("tr",{key:e.name},s.a.createElement("td",{className:"tablename"},e.name),s.a.createElement("td",{className:"tableday"},e.wishday),s.a.createElement("td",{className:"tablecommenttd"},e.comment))}))))):s.a.createElement("div",null,"\u30a2\u30af\u30bb\u30b9\u3067\u304d\u307e\u305b\u3093")))}}]),t}(n.Component),x={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}};w.a.setAppElement("#root");var I=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).fetchInfodata=function(){fetch("/informationdata").then(function(e){return e.json()}).then(function(e){return a.setState({informations:e})})},a.changeNewpost=function(){a.state.newpost?a.setState({newpost:!1}):a.setState({newpost:!0})},a.onChangeTitle=function(e){a.setState({title:e.target.value})},a.onChangeMessage=function(e){a.setState({message:e.target.value})},a.addInformation=function(){if(""===a.state.title)alert("\u30bf\u30a4\u30c8\u30eb\u3092\u8a18\u5165\u3057\u3066\u304f\u3060\u3055\u3044");else{var e={title:a.state.title,message:a.state.message};fetch("/addinformationdata",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}).then(function(e){alert("\u6295\u7a3f\u3057\u307e\u3057\u305f"),a.fetchInfodata()})}},a.dateformater=function(e){var t=new Date(e);return t.getFullYear()+"/"+(t.getMonth()+1)+"/"+t.getDate()},a.openModal=function(e){a.setState({modal:!0,selectinfo:a.serchInfobyId(e.target.value)})},a.closeModal=function(){a.setState({modal:!1})},a.openChangeableModal=function(e){a.setState({changeablemodal:!0,selectinfo:a.serchInfobyId(e.target.value)})},a.closeChangeableModal=function(){a.setState({changeablemodal:!1})},a.serchInfobyId=function(e){var t=!0,n=!1,s=void 0;try{for(var i,r=a.state.informations[Symbol.iterator]();!(t=(i=r.next()).done);t=!0){var o=i.value;if(parseInt(e)===o.id)return Object.assign({},o)}}catch(l){n=!0,s=l}finally{try{t||null==r.return||r.return()}finally{if(n)throw s}}},a.updateTitle=function(e){var t=a.state.selectinfo;t.title=e.target.value,a.setState({selectinfo:t})},a.updateMessage=function(e){var t=a.state.selectinfo;t.message=e.target.value,a.setState({selectinfo:t})},a.updateInfo=function(){var e=a.state.selectinfo,t=a.serchInfobyId(e.id);t.title===e.title&&t.message===e.message||fetch("/updateinformationdata",{method:"POST",body:JSON.stringify(e),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}).then(function(e){alert("\u66f4\u65b0\u3057\u307e\u3057\u305f"),a.closeChangeableModal(),a.fetchInfodata()})},a.deleteInfo=function(e){window.confirm("\u524a\u9664\u3057\u307e\u3059\u304b\uff1f")&&fetch("/updateinformationdata",{method:"POST",body:JSON.stringify([e.target.value]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}).then(function(e){alert("\u524a\u9664\u3057\u307e\u3057\u305f"),a.fetchInfodata()})},a.state={newpost:!1,userdata:[],informations:[],title:"",message:"",changeablemodal:!1,modal:!1,selectinfo:[]},a}return Object(u.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/userdata").then(function(e){return e.json()}).then(function(t){return e.setState({userdata:t})}),this.fetchInfodata()}},{key:"render",value:function(){var e=this;return s.a.createElement("div",null,s.a.createElement("h1",null,"Information"),this.state.userdata.administer?s.a.createElement("button",{onClick:this.changeNewpost,className:"administerbuttonreverse",style:{width:"200px"}},this.state.newpost?"\u3068\u3058\u308b \u25b3":"\u65b0\u898f\u6295\u7a3f \u25bd"):"",this.state.newpost?s.a.createElement("div",null,"\u30bf\u30a4\u30c8\u30eb",s.a.createElement("input",{id:"newInfomationtitle",onChange:this.onChangeTitle,placeholder:"17\u6587\u5b57\u4ee5\u5185\u63a8\u5968"}),s.a.createElement("br",null),s.a.createElement("div",{id:"newInfomessageFlame"},s.a.createElement("p",{id:"newInfomessageTop"},"\u672c\u6587"),s.a.createElement("textarea",{id:"newInfomessageText"})),s.a.createElement("br",null),s.a.createElement("button",{onClick:this.addInformation,className:"bluebutton",style:{width:"200px"}},"\u6295\u7a3f")):"",s.a.createElement("div",{id:"infoFlame"},s.a.createElement("p",{id:"infoTableHeader"},"\u304a\u77e5\u3089\u305b\u4e00\u89a7"),s.a.createElement("table",{className:"infoTable"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",{className:"blank",id:"infoTableth"},"\u65e5\u4ed8"),s.a.createElement("th",{className:"blank"},"\u30bf\u30a4\u30c8\u30eb"),this.state.userdata.administer?s.a.createElement("th",{className:"blank",id:"infoTableth"},"\u5909\u66f4\u524a\u9664"):s.a.createElement("th",null))),s.a.createElement("tbody",null,this.state.informations.map(function(t){return s.a.createElement("tr",{key:t.id,id:"infotr"},s.a.createElement("td",null,s.a.createElement("button",{value:t.id,onClick:e.openModal,className:"infotablebutton"},e.dateformater(t.date))),s.a.createElement("td",null,s.a.createElement("button",{value:t.id,onClick:e.openModal,className:"infotablebutton"},t.title)),e.state.userdata.administer?s.a.createElement("td",null,s.a.createElement("button",{onClick:e.openChangeableModal,className:"bluebutton",value:t.id},"\u5909\u66f4"),s.a.createElement("button",{onClick:e.deleteInfo,className:"redbutton",value:t.id},"\u524a\u9664")):s.a.createElement("td",null))})))),s.a.createElement(w.a,{isOpen:this.state.modal,onRequestClose:this.closeModal,style:x,contentLabel:"Register Modal"},"\u767b\u6821\u65e5 ",this.dateformater(this.state.selectinfo.date),s.a.createElement("br",null),"\u30bf\u30a4\u30c8\u30eb",this.state.selectinfo.title,s.a.createElement("div",null,this.state.selectinfo.message)),s.a.createElement(w.a,{isOpen:this.state.changeablemodal,onRequestClose:this.closeChangeableModal,style:x,contentLabel:"Register Modal"},this.dateformater(this.state.selectinfo.date),"\u3000\u6295\u7a3f",s.a.createElement("br",null),"\u30bf\u30a4\u30c8\u30eb",s.a.createElement("input",{onChange:this.updateTitle,value:this.state.selectinfo.title}),s.a.createElement("br",null),"\u672c\u6587",s.a.createElement("br",null),s.a.createElement("textarea",{onChange:this.updateMessage,value:this.state.selectinfo.message}),s.a.createElement("br",null),s.a.createElement("button",{onClick:this.updateInfo,className:"bluebutton"},"\u5909\u66f4"),s.a.createElement("button",{onClick:this.closeChangeableModal,className:"redbutton"},"\u9589\u3058\u308b")))}}]),t}(n.Component),_=(a(105),a(106),a(107),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(u.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"App"},s.a.createElement("h1",null,"Shift-Resercher"),s.a.createElement("span",null,"\u30b7\u30d5\u30c8\u5e0c\u671b\u8a18\u5165\u30b5\u30a4\u30c8",s.a.createElement("br",null),"LINE\u3067\u767b\u9332\uff06\u30ed\u30b0\u30a4\u30f3",s.a.createElement("br",null),"\u2193\u3000\u2193\u3000\u2193"),s.a.createElement("form",{action:"/auth",method:"GET"},s.a.createElement("input",{type:"submit",className:"login_button",value:""})),s.a.createElement("span",{id:"developer"},"Developed by itoyu"),s.a.createElement("div",null,"------------------",s.a.createElement("br",null),s.a.createElement(d.b,{to:"/Home"},"HomeChecker in locals"),s.a.createElement("br",null),"-------------------------"))}}]),t}(n.Component)),F=function(){return s.a.createElement(d.a,null,s.a.createElement("div",null,s.a.createElement("link",{href:"https://fonts.googleapis.com/css?family=Norican&display=swap",rel:"stylesheet"}),s.a.createElement(h.a,{exact:!0,path:"/",component:_}),s.a.createElement(h.a,{path:"/Register",component:y}),s.a.createElement(h.a,{path:"/Home",component:O}),s.a.createElement(h.a,{path:"/Setting",component:M}),s.a.createElement(h.a,{path:"/Wishlist",component:T}),s.a.createElement(h.a,{path:"/Information",component:I})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(s.a.createElement(F,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},67:function(e,t,a){e.exports=a(108)},72:function(e,t,a){}},[[67,1,2]]]);
//# sourceMappingURL=main.e3abe8ac.chunk.js.map