(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{58:function(t,e,a){t.exports=a(96)},63:function(t,e,a){},96:function(t,e,a){"use strict";a.r(e);var n=a(0),i=a.n(n),s=a(37),o=a.n(s),r=(a(63),a(15)),l=a(16),c=a(18),h=a(17),m=a(19),d=a(21),u=a(25),f=a(2),p=a(30),y=a.n(p),b=a(20),v=a.n(b),k={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}};v.a.setAppElement("#root");var g=function(t){function e(t){var a;return Object(r.a)(this,e),(a=Object(c.a)(this,Object(h.a)(e).call(this,t))).state={userdata:[],date:new Date,receptionDate:new Date,stamp:"x",stamptime:"",deadline:"",default_month_days:[],month_days:[],shifttimes:["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30","23:45"],startTime:"09:00",endTime:"09:00",complementdaysText:"",wishdays:["",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],default_comments:[],comments:[],wishday:"",comment:"",nowprintcommentday:"",modalIsOpen:!1,isUpdateshift:[]},a.setdefaultshifts=a.setdefaultshifts.bind(Object(f.a)(a)),a.setdefaultcomment=a.setdefaultcomment.bind(Object(f.a)(a)),a.getDateReception=a.getDateReception.bind(Object(f.a)(a)),a.dayspreOnclick=a.dayspreOnclick.bind(Object(f.a)(a)),a.daysbackOnclick=a.daysbackOnclick.bind(Object(f.a)(a)),a.dayspreback=a.dayspreback.bind(Object(f.a)(a)),a.wishdayOnchange=a.wishdayOnchange.bind(Object(f.a)(a)),a.commentOnchange=a.commentOnchange.bind(Object(f.a)(a)),a.openModal=a.openModal.bind(Object(f.a)(a)),a.afterOpenModal=a.afterOpenModal.bind(Object(f.a)(a)),a.closeModal=a.closeModal.bind(Object(f.a)(a)),a.setShiftTime=a.setShiftTime.bind(Object(f.a)(a)),a.startTimeChange=a.startTimeChange.bind(Object(f.a)(a)),a.endTimeChange=a.endTimeChange.bind(Object(f.a)(a)),a.addDataOnClick=a.addDataOnClick.bind(Object(f.a)(a)),a.shiftupdateChecker=a.shiftupdateChecker.bind(Object(f.a)(a)),a}return Object(m.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.getDateReception(),fetch("/userdata").then(function(t){return t.json()}).then(function(e){return t.setState({userdata:e})}),fetch("/shiftdata").then(function(t){return t.json()}).then(function(e){return t.setdefaultshifts(e)}),fetch("/getcommentdata").then(function(t){return t.json()}).then(function(e){return t.setdefaultcomment(e)})}},{key:"render",value:function(){var t=this;return i.a.createElement("div",null,i.a.createElement("h1",null,"\u30b7\u30d5\u30c8\u5e0c\u671b"),"\u3088\u3046\u3053\u305d",this.state.userdata.username,"\u3055\u3093",i.a.createElement(d.b,{to:"/Setting"},"\u8a2d\u5b9a"),i.a.createElement("a",{href:"/logout"},"logout"),i.a.createElement("h2",null,this.state.receptionDate.getFullYear()," ",this.state.receptionDate.getMonth()+1,"\u6708",this.state.receptionDate.getDate(),"\u65e5\uff5e\u53d7\u4ed8\u4e2d"),i.a.createElement("div",{id:"dateText"},this.state.deadline),i.a.createElement("button",{id:"batu",onClick:this.onClickstamp.bind(this,"x")},"\xd7"),i.a.createElement("button",{id:"sankaku",onClick:this.onClickstamp.bind(this,"\u25b3")},"\u25b3"),i.a.createElement("button",{id:"timeset",onClick:this.onClickstamp.bind(this,"time")},"Time"),i.a.createElement("div",{id:"calendar"}),i.a.createElement(y.a,{locale:"ja-JP",calendarType:"US",value:this.state.receptionDate,tileContent:this.getTileContent.bind(this),onChange:function(e){return t.dayClick(e)}}),i.a.createElement("div",null,"\u88dc\u8db3\u5e0c\u671b:",this.state.complementdaysText,i.a.createElement("button",{onClick:this.dayspreOnclick},"\u25c1"),i.a.createElement("button",{onClick:this.daysbackOnclick},"\u25b7"),i.a.createElement("br",null),i.a.createElement("div",null,"\u5e0c\u671b\u51fa\u52e4\u65e5\u6570\uff1a",i.a.createElement("select",{onChange:this.wishdayOnchange,value:this.state.wishday},this.state.wishdays.map(function(t){return i.a.createElement("option",{key:t},t)})),"\u65e5"),i.a.createElement("div",null,"\u4f1d\u8a00\uff1a",i.a.createElement("input",{type:"textarea",name:"comment",value:this.state.comment,onChange:this.commentOnchange}),i.a.createElement("button",{onClick:this.addDataOnClick},"\u767b\u9332"))),i.a.createElement(v.a,{isOpen:this.state.modalIsOpen,onAfterOpen:this.afterOpenModal,onRequestClose:this.closeModal,style:k,contentLabel:"worktime Modal"},i.a.createElement("h2",null,"\u51fa\u52e4\u53ef\u80fd\u6642\u9593\u3092\u9078\u629e"),i.a.createElement("div",null,i.a.createElement("select",{onChange:this.startTimeChange,value:this.state.startTime},this.state.shifttimes.map(function(t){return i.a.createElement("option",{key:t},t)})),"\uff5e",i.a.createElement("select",{onChange:this.endTimeChange,value:this.state.endTime},this.state.shifttimes.map(function(t){return i.a.createElement("option",{key:t},t)}))),i.a.createElement("button",{onClick:this.closeModal},"\u9589\u3058\u308b"),i.a.createElement("button",{onClick:this.setShiftTime},"\u6c7a\u5b9a")))}},{key:"getintdate",value:function(t,e,a){return t+("0"+(e+1)).slice(-2)+("0"+a).slice(-2)}},{key:"setdefaultshifts",value:function(t){var e=[],a=[],n=!0,i=!1,s=void 0;try{for(var o,r=t[Symbol.iterator]();!(n=(o=r.next()).done);n=!0){var l=o.value;a[l.date]={text:l.detail},e[l.date]={text:l.detail}}}catch(c){i=!0,s=c}finally{try{n||null==r.return||r.return()}finally{if(i)throw s}}this.setState({default_month_days:e,month_days:a})}},{key:"setdefaultcomment",value:function(t){if(""!==t){var e=[],a=[],n=!0,i=!1,s=void 0;try{for(var o,r=t[Symbol.iterator]();!(n=(o=r.next()).done);n=!0){var l=o.value,c=new Date(l.date),h=c.getFullYear()+("0"+(c.getMonth()+1)).slice(-2)+("0"+c.getDate()).slice(-2);a[h]={comment:l.text,wishday:l.wishday},e[h]={comment:l.text,wishday:l.wishday}}}catch(p){i=!0,s=p}finally{try{n||null==r.return||r.return()}finally{if(i)throw s}}var m=this.state.receptionDate,d=m.getFullYear()+("0"+(m.getMonth()+1)).slice(-2)+("0"+m.getDate()).slice(-2),u="",f="";null!=a[d]&&(u=a[d].comment,f=a[d].wishday),console.log(d),this.setState({default_comments:e,comments:a,comment:u,wishday:f,nowprintcommentday:d})}}},{key:"getFormatDate",value:function(t){return"".concat(t.getFullYear()).concat(("0"+(t.getMonth()+1)).slice(-2)).concat(("0"+t.getDate()).slice(-2))}},{key:"getDateReception",value:function(){var t=this.state.date.getFullYear(),e=this.state.date.getMonth()+1,a=this.state.date.getDate(),n="",i="",s="";if(a<=10)i=e+"/10\u307e\u3067("+(n=e+"/16\uff5e"+e+"/"+new Date(t,e,0).getDate())+")",s=t+"/"+e+"/16";else if(a>24){12===e&&(t++,e=0),i=e+1+"/10\u307e\u3067("+(n=e+1+"/16\uff5e"+(e+1)+"/"+new Date(t,e,0).getDate())+")",s=t+"/"+(e+1)+"/16"}else 12===e&&(t++,e=0),i=e+"/24\u307e\u3067("+(n=e+1+"/1\uff5e"+(e+1)+"/15")+")",s=t+"/"+(e+1)+"/1";this.setState({complementdaysText:n,deadline:i,receptionDate:new Date(s)})}},{key:"getTileContent",value:function(t){var e=t.date;if("month"!==t.view)return null;var a=this.getFormatDate(e);return i.a.createElement("p",null,this.state.month_days[a]&&this.state.month_days[a].text?this.state.month_days[a].text:"  ")}},{key:"onClickstamp",value:function(t){this.setState({stamp:t})}},{key:"dayClick",value:function(t){if(this.state.receptionDate<=t){var e=this.state.month_days,a=t.getFullYear()+("0"+(t.getMonth()+1)).slice(-2)+("0"+t.getDate()).slice(-2);this.setState({clickdate:a}),null==e[a]||""===e[a].text?"time"===this.state.stamp?this.openModal():(e[a]={text:this.state.stamp},this.setState({month_days:e})):this.state.stamp===e[a].text?(e[a]={text:""},this.setState({month_days:e})):this.state.stamp!==e[a].text&&("time"===this.state.stamp?e[a]={text:""}:(e[a]={text:this.state.stamp},this.setState({month_days:e})))}}},{key:"dayspreOnclick",value:function(){this.dayspreback("pre")}},{key:"daysbackOnclick",value:function(){this.dayspreback("back")}},{key:"dayspreback",value:function(t){this.state.comments[this.state.nowprintcommentday]={comment:this.state.comment,wishday:this.state.wishday};var e=this.state.nowprintcommentday,a=(e.substr(0,4)+"/"+e.substr(4,2)+"/"+e.substr(6,2)).split("/"),n=new Date(a[0],a[1]-1,a[2]),i=n.getFullYear(),s=n.getMonth(),o=n.getDate();"pre"===t?16===o?o=1:0===s?(i--,s=11,o=16):(s--,o=16):"back"===t&&(1===o?o=16:11===s?(i++,s=0,o=1):(s++,o=1));var r="";16===o?r=s+1+"/"+o+"\uff5e"+(s+1)+"/"+new Date(i,s,0).getDate():r=s+1+"/"+o+"\uff5e"+(s+1)+"/15";null==this.state.comments[this.getintdate(i,s,o)]&&(this.state.comments[this.getintdate(i,s,o)]={comment:"",wishday:""}),this.setState({comment:this.state.comments[this.getintdate(i,s,o)].comment,wishday:this.state.comments[this.getintdate(i,s,o)].wishday,nowprintcommentday:this.getintdate(i,s,o),complementdaysText:r})}},{key:"wishdayOnchange",value:function(t){this.setState({wishday:t.target.value})}},{key:"commentOnchange",value:function(t){this.setState({comment:t.target.value})}},{key:"openModal",value:function(){this.setState({modalIsOpen:!0})}},{key:"afterOpenModal",value:function(){}},{key:"closeModal",value:function(){this.setState({modalIsOpen:!1})}},{key:"setShiftTime",value:function(){if(this.state.startTime>=this.state.endTime)alert("\u4e0d\u53ef\u80fd\u306a\u6642\u9593\u3067\u3059");else{this.closeModal();var t=this.state.month_days;t[this.state.clickdate]={text:this.state.startTime+"-"+this.state.endTime},this.setState({month_days:t})}}},{key:"startTimeChange",value:function(t){this.setState({startTime:t.target.value})}},{key:"endTimeChange",value:function(t){this.setState({endTime:t.target.value})}},{key:"addDataOnClick",value:function(){console.log(this.state.nowprintcommentday),this.state.comments[this.state.nowprintcommentday]={comment:this.state.comment,wishday:this.state.wishday};var t=this.state.default_month_days,e=this.state.month_days,a=[];for(var n in e)null==t[n]&&(a[n]={text:e[n].text});var i=[];for(var s in t)""===e[s].text&&(i[s]={text:t[s].text});var o=[];for(var r in e)null!=t[r]&&""!==e[r].text&&t[r].text!==e[r].text&&(o[r]={text:e[r].text});a.length>0&&(this.setState({isUpdateshift:this.state.isUpdateshift.concat("add")}),this.dbUpdater("/addshiftdata",a)),i.length>0&&(this.setState({isUpdateshift:this.state.isUpdateshift.concat("delete")}),this.dbUpdater("/deleteshiftdata",i)),o.length>0&&(this.setState({isUpdateshift:this.state.isUpdateshift.concat("update")}),this.dbUpdater("/updateshiftdata",o));var l=[];for(var c in console.log(this.state.comments),this.state.comments)null==this.state.default_comments[c]&&l.push({date:c,comment:this.state.comments[c].comment,wishday:this.state.comments[c].wishday});var h=[];for(var m in this.state.default_comments)this.state.comments[m].comment===this.state.default_comments[m].comment&&this.state.comments[m].wishday===this.state.default_comments[m].wishday||h.push({date:m,comment:this.state.comments[m].comment,wishday:this.state.comments[m].wishday});console.log(h),fetch("/updatecommentdata",{method:"POST",body:JSON.stringify(h),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(t){return t.json()}),console.log(l),fetch("/addcommentdata",{method:"POST",body:JSON.stringify(l),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(t){return t.json()}).then(function(t){return alert("\u767b\u9332\u3057\u307e\u3057\u305f")}),this.shiftupdateChecker("")}},{key:"dbUpdater",value:function(t,e){var a=this,n=[];for(var i in e)n.push({date:i,text:e[i].text});fetch(t,{method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(t){return t.json()}).then(function(t){return a.shiftupdateChecker(t)})}},{key:"shiftupdateChecker",value:function(t){var e=this;if(""!==t){var a=[],n=!0,i=!1,s=void 0;try{for(var o,r=this.state.isUpdateshift[Symbol.iterator]();!(n=(o=r.next()).done);n=!0){var l=o.value;l!==t&&a.push(l)}}catch(c){i=!0,s=c}finally{try{n||null==r.return||r.return()}finally{if(i)throw s}}a.length<=0&&fetch("/shiftdata").then(function(t){return t.json()}).then(function(t){return e.setdefaultshifts(t)}),this.setState({isUpdateshift:a})}else this.state.isUpdateshift.length<=0&&fetch("/shiftdata").then(function(t){return t.json()}).then(function(t){return e.setdefaultshifts(t)})}}]),e}(n.Component),C=a(114),O=a(120),E=Object(C.a)(function(t){return{container:{display:"flex",flexWrap:"wrap"},input:{margin:t.spacing(1)}}}),w={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}};v.a.setAppElement("#root");var j=function(t){function e(t){var a;return Object(r.a)(this,e),(a=Object(c.a)(this,Object(h.a)(e).call(this,t))).pushtoHome=function(){a.props.history.push("/")},a.state={userdata:[],username:"",worktime:"",memberlist:[],administerlist:[],nonadministerlist:[],addministeroption:[],ischangeworktime:!1,test:"",memberModalopen:!1,administerModalopen:!1,isAddadminister:!1},a.loadmemberlist=a.loadmemberlist.bind(Object(f.a)(a)),a.onChangeusername=a.onChangeusername.bind(Object(f.a)(a)),a.updateUsername=a.updateUsername.bind(Object(f.a)(a)),a.onChangeworktime=a.onChangeworktime.bind(Object(f.a)(a)),a.setworktime=a.setworktime.bind(Object(f.a)(a)),a.onClickunsubsribe=a.onClickunsubsribe.bind(Object(f.a)(a)),a.pushtoHome=a.pushtoHome.bind(Object(f.a)(a)),a.openmemberModal=a.openmemberModal.bind(Object(f.a)(a)),a.closememberModal=a.closememberModal.bind(Object(f.a)(a)),a.closeadministerModal=a.closeadministerModal.bind(Object(f.a)(a)),a.onChangeaddministeroption=a.onChangeaddministeroption.bind(Object(f.a)(a)),a.onClickadminister=a.onClickadminister.bind(Object(f.a)(a)),a}return Object(m.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){var t=this;fetch("/userdata").then(function(t){return t.json()}).then(function(e){t.setState({userdata:e,username:e.username,worktime:e.worktime}),e.administer&&t.loadmemberlist()})}},{key:"loadmemberlist",value:function(){var t=this;fetch("/memberlist").then(function(t){return t.json()}).then(function(e){t.setState({memberlist:e});var a=[],n=[],i=!0,s=!1,o=void 0;try{for(var r,l=e[Symbol.iterator]();!(i=(r=l.next()).done);i=!0){var c=r.value;c.administer?a.push(c):n.push(c)}}catch(h){s=!0,o=h}finally{try{i||null==l.return||l.return()}finally{if(s)throw o}}t.setState({administerlist:a,nonadministerlist:n,addministeroption:n[0]})})}},{key:"render",value:function(){var t=this;return i.a.createElement("div",null,i.a.createElement("h1",null,"\u8a2d\u5b9a"),i.a.createElement("img",{src:this.state.userdata.picture}),i.a.createElement("p",null,this.state.userdata.displayName),i.a.createElement("div",null,"\u30e6\u30fc\u30b6\u30fc\u540d",i.a.createElement(O.a,{id:"username",value:this.state.username,onChange:this.onChangeusername,className:E.input,inputProps:{"aria-label":"username"}}),i.a.createElement("button",{onClick:this.updateUsername},"\u66f4\u65b0")),i.a.createElement("div",null,"\u52e4\u52d9\u533a\u5206:",this.state.ischangeworktime?i.a.createElement("span",null,i.a.createElement("input",{type:"radio",name:"worktime",value:"\u65e9",checked:"\u65e9"===this.state.worktime,onChange:function(){return t.setState({worktime:"\u65e9"})}}),"\u65e9\u756a",i.a.createElement("input",{type:"radio",name:"worktime",value:"\u9045",checked:"\u9045"===this.state.worktime,onChange:function(){return t.setState({worktime:"\u9045"})}}),"\u9045\u756a",i.a.createElement("button",{onClick:this.setworktime},"\u66f4\u65b0")):i.a.createElement("span",null,this.state.userdata.worktime,"\u756a",i.a.createElement("button",{onClick:this.onChangeworktime},"\u5909\u66f4"))),i.a.createElement("button",{onClick:this.onClickunsubsribe},"\u9000\u4f1a"),i.a.createElement("div",{style:{display:this.state.userdata.administer?"":"none"}},"\u7ba1\u7406\u8005\u6a29\u9650",i.a.createElement("br",null),i.a.createElement("button",null,"\u5e0c\u671b\u4e00\u89a7"),i.a.createElement(d.b,{to:{pathname:"/Wishlist",query:{pass:"administer"}}},"hope"),i.a.createElement("button",{onClick:this.openmemberModal},"\u767b\u9332\u8005\u4e00\u89a7"),i.a.createElement("button",{onClick:function(e){return t.setState({administerModalopen:!0})}},"\u7ba1\u7406\u8005\u4e00\u89a7")),i.a.createElement(v.a,{isOpen:this.state.memberModalopen,onRequestClose:this.closememberModal,style:w,contentLabel:"Register Modal"},i.a.createElement("h2",null,"\u767b\u9332\u8005\u4e00\u89a7"),this.state.memberlist.map(function(e){return i.a.createElement("div",{key:e.userid},e.name,i.a.createElement("span",{style:{display:e.userid!==t.state.userdata.userId?"":"none"}},i.a.createElement("button",{value:e.userid,onClick:function(a){return t.onClickdeletemember(e)}},"\u767b\u9332\u524a\u9664")))}),i.a.createElement("button",{onClick:this.closememberModal},"\u9589\u3058\u308b")),i.a.createElement(v.a,{isOpen:this.state.administerModalopen,onRequestClose:this.closeadministerModal,style:w,contentLabel:"Administer Modal"},i.a.createElement("h2",null,"\u7ba1\u7406\u8005\u4e00\u89a7"),this.state.administerlist.map(function(e){return i.a.createElement("div",{key:e.userid},e.name,i.a.createElement("span",{style:{display:e.userid!==t.state.userdata.userId?"":"none"}},i.a.createElement("button",{onClick:function(a){return t.onClickdeleteadminister(e)}},"\u89e3\u9664")))}),this.state.isAddadminister&&this.state.nonadministerlist.length>0?i.a.createElement("span",null,i.a.createElement("select",{onChange:this.onChangeaddministeroption,value:this.state.addministeroption.name},this.state.nonadministerlist.map(function(t){return i.a.createElement("option",null,t.name)})),i.a.createElement("button",{onClick:function(e){return t.onClickaddAdminister()}},"\u8ffd\u52a0")):i.a.createElement("button",{onClick:function(e){return t.onClickadminister()}},"\u8ffd\u52a0"),i.a.createElement("button",{onClick:this.closeadministerModal},"\u9589\u3058\u308b")))}},{key:"onChangeusername",value:function(t){this.setState({username:t.target.value})}},{key:"updateUsername",value:function(){var t=this;this.state.username!==this.state.userdata.username&&fetch("/updateusername",{method:"POST",body:JSON.stringify([this.state.username]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(t){return t.json()}).then(function(e){alert("\u767b\u9332\u3057\u307e\u3057\u305f"),t.state.userdata.username=t.state.username})}},{key:"onChangeworktime",value:function(){this.setState({ischangeworktime:!0})}},{key:"setworktime",value:function(){this.state.userdata.worktime!==this.state.worktime&&(fetch("/updateworktime",{method:"POST",body:JSON.stringify([this.state.worktime]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(t){return t.json()}),this.state.userdata.worktime=this.state.worktime),this.setState({ischangeworktime:!1})}},{key:"onClickunsubsribe",value:function(){window.confirm("\u9000\u4f1a\u3057\u307e\u3059\u304b\uff1f\n\u5168\u30e6\u30fc\u30b6\u30fc\u30c7\u30fc\u30bf\u304c\u524a\u9664\u3055\u308c\u307e\u3059")&&(fetch("/deleteuser",{method:"POST",headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(t){return t.json()}),fetch("/logout").then(function(t){return t.json()}),this.pushtoHome())}},{key:"openmemberModal",value:function(){this.setState({memberModalopen:!0})}},{key:"closememberModal",value:function(){this.setState({memberModalopen:!1})}},{key:"onClickdeletemember",value:function(t){var e=this;window.confirm(t.name+"\u3092\u672c\u5f53\u306b\u524a\u9664\u3057\u307e\u3059\u304b\uff1f\n\u8a72\u5f53\u30e6\u30fc\u30b6\u30fc\u306e\u30b7\u30d5\u30c8\u60c5\u5831\u3082\u524a\u9664\u3055\u308c\u307e\u3059")&&fetch("/deletemember",{method:"POST",body:JSON.stringify([t.userid]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(t){return t.json()}).then(function(t){e.closememberModal(),e.loadmemberlist()})}},{key:"onClickdeleteadminister",value:function(t){var e=this;window.confirm(t.name+"\u306e\u7ba1\u7406\u8005\u6a29\u9650\u3092\u5265\u596a\u3057\u307e\u3059\u304b\uff1f")&&fetch("/deleteadminister",{method:"POST",body:JSON.stringify([t.userid]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(t){return t.json()}).then(function(t){e.closeadministerModal(),e.loadmemberlist()})}},{key:"onChangeaddministeroption",value:function(t){var e=!0,a=!1,n=void 0;try{for(var i,s=this.state.nonadministerlist[Symbol.iterator]();!(e=(i=s.next()).done);e=!0){var o=i.value;if(o.name===t.target.value){this.setState({addministeroption:o});break}}}catch(r){a=!0,n=r}finally{try{e||null==s.return||s.return()}finally{if(a)throw n}}}},{key:"onClickadminister",value:function(){this.setState({isAddadminister:!0})}},{key:"onClickaddAdminister",value:function(){var t=this,e=this.state.addministeroption;window.confirm(e.name+"\u306b\u7ba1\u7406\u8005\u6a29\u9650\u3092\u6388\u4e0e\u3057\u307e\u3059\u304b\uff1f")&&fetch("/addadminister",{method:"POST",body:JSON.stringify([e.userid]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(t){return t.json()}).then(function(e){t.closeadministerModal(),t.loadmemberlist()})}},{key:"closeadministerModal",value:function(){this.setState({administerModalopen:!1,isAddadminister:!1})}}]),e}(n.Component),S=a(116),D=a(119),T=a(121),M=a(117),x=a(118),_=a(115),U=Object(C.a)(function(t){return{root:{width:"100%",marginTop:t.spacing(3),overflowX:"auto"},table:{minWidth:650}}}),F=function(t){function e(t){var a;return Object(r.a)(this,e),(a=Object(c.a)(this,Object(h.a)(e).call(this,t))).state={query:a.props.location.query,accessable:!1,memberlist:[],allshiftdata:[],printlist:[],deadlineearly:10,deallinelate:24,startdate:"",printdays:[]},a.setprintDays=a.setprintDays.bind(Object(f.a)(a)),a.sortmembershift=a.sortmembershift.bind(Object(f.a)(a)),a}return Object(m.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){var t=this;void 0!==this.props.location.query&&"administer"===this.props.location.query.pass&&(this.setState({accessable:!0}),this.setprintDays(),fetch("/memberlist").then(function(t){return t.json()}).then(function(e){t.setState({memberlist:e}),fetch("/allshiftdata").then(function(t){return t.json()}).then(function(a){t.setState({allshiftdata:a}),t.sortmembershift(e,a)})}))}},{key:"render",value:function(){var t=U;return i.a.createElement("div",null,this.state.accessable?i.a.createElement("div",null,i.a.createElement("h1",null,"Wishlist"),"\u30a2\u30af\u30bb\u30b9\u53ef\u80fd",i.a.createElement(_.a,{className:t.root,style:{overflowX:"scroll"}},i.a.createElement(S.a,{className:t.table},i.a.createElement(M.a,null,i.a.createElement(x.a,null,i.a.createElement(T.a,null,"name"),this.state.printdays.map(function(t){return i.a.createElement(T.a,{key:t},t)}))),i.a.createElement(D.a,null,this.state.printlist.map(function(t){return i.a.createElement(x.a,{key:t.name},i.a.createElement(T.a,{component:"th",scope:"row",key:t.name},t.name),t.shift.map(function(t){return i.a.createElement(T.a,{component:"th",scope:"row"},t)}))}))))):i.a.createElement("div",null,"\u30a2\u30af\u30bb\u30b9\u3067\u304d\u307e\u305b\u3093"))}},{key:"setprintDays",value:function(){var t=new Date,e=t.getFullYear(),a=t.getMonth(),n=t.getDate(),i="";n<this.state.deadlineearly?i=new Date(e,a,1):n<this.state.deallinelate?i=new Date(e,a,16):n>=this.state.deallinelate&&(i=11===a?new Date(e+1,a+1,1):new Date(e,a+1,1));var s=[];if(1===i.getDate())for(var o=0;o<15;o++)s.push(i.getMonth()+1+"/"+(i.getDate()+o));else if(16===i.getDate())for(var r=new Date(i.getFullYear(),i.getMonth()+1,0),l=0;l<r.getDate()-i.getDate()+1;l++)s.push(i.getMonth()+1+"/"+(i.getDate()+l));this.setState({startdate:i,printdays:s})}},{key:"sortmembershift",value:function(t,e){var a=this.state.startdate,n="",i=[];1===a.getDate()?(n=new Date(a.getFullYear(),a.getMonth(),15),i=Array(15)):16===a.getDate()&&(n=new Date(a.getFullYear(),a.getMonth(),0),i=Array(n.getDate()-15));var s=[],o=!0,r=!1,l=void 0;try{for(var c,h=t[Symbol.iterator]();!(o=(c=h.next()).done);o=!0){var m=c.value,d=i.slice();d.fill("/");var u=!0,f=!1,p=void 0;try{for(var y,b=e[Symbol.iterator]();!(u=(y=b.next()).done);u=!0){var v=y.value;if(v.userid===m.userid){var k=String(v.date),g=parseInt(k.slice(0,4)),C=parseInt(k.slice(4,6)),O=parseInt(k.slice(6));g===a.getFullYear()&&C===a.getMonth()+1&&O>=a.getDate()&&O<=n.getDate()&&(d[O-a.getDate()]=v.detail)}}}catch(E){f=!0,p=E}finally{try{u||null==b.return||b.return()}finally{if(f)throw p}}s.push({name:m.name,shift:d})}}catch(E){r=!0,l=E}finally{try{o||null==h.return||h.return()}finally{if(r)throw l}}this.setState({printlist:s})}}]),e}(n.Component),R={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}};v.a.setAppElement("#root");var Y=function(t){function e(t){var a;return Object(r.a)(this,e),(a=Object(c.a)(this,Object(h.a)(e).call(this,t))).state={userdata:[],date:new Date,receptionDate:new Date,stamp:"x",stamptime:"",deadline:"",default_month_days:[],month_days:[],shifttimes:["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30","23:45"],startTime:"09:00",endTime:"09:00",comment:"",modalIsOpen:!1,isUpdateshift:[]},a.setdefaultshifts=a.setdefaultshifts.bind(Object(f.a)(a)),a.getDateReception=a.getDateReception.bind(Object(f.a)(a)),a.commentOnchange=a.commentOnchange.bind(Object(f.a)(a)),a.openModal=a.openModal.bind(Object(f.a)(a)),a.afterOpenModal=a.afterOpenModal.bind(Object(f.a)(a)),a.closeModal=a.closeModal.bind(Object(f.a)(a)),a.setShiftTime=a.setShiftTime.bind(Object(f.a)(a)),a.startTimeChange=a.startTimeChange.bind(Object(f.a)(a)),a.endTimeChange=a.endTimeChange.bind(Object(f.a)(a)),a.addDataOnClick=a.addDataOnClick.bind(Object(f.a)(a)),a.shiftupdateChecker=a.shiftupdateChecker.bind(Object(f.a)(a)),a}return Object(m.a)(e,t),Object(l.a)(e,[{key:"componentDidMount",value:function(){var t=this;this.getDateReception(),fetch("/testuserdata").then(function(t){return t.json()}).then(function(e){return t.setState({userdata:e})}),fetch("/testshiftdata").then(function(t){return t.json()}).then(function(e){return t.setdefaultshifts(e)}),fetch("/testgetcommentdata").then(function(t){return t.json()}).then(function(e){return t.setState({comment:e[0].text})})}},{key:"render",value:function(){var t=this;return i.a.createElement("div",null,i.a.createElement("h1",null,"\u30b7\u30d5\u30c8\u5e0c\u671b"),"\u3088\u3046\u3053\u305d",this.state.userdata.username,"\u3055\u3093",i.a.createElement(d.b,{to:"/Setting"},"\u8a2d\u5b9a"),i.a.createElement("a",{href:"/logout"},"logout"),i.a.createElement("h2",null,this.state.receptionDate.getFullYear()," ",this.state.receptionDate.getMonth()+1,"\u6708",this.state.receptionDate.getDate(),"\u65e5\uff5e\u53d7\u4ed8\u4e2d"),i.a.createElement("div",{id:"dateText"},this.state.deadline),i.a.createElement("button",{id:"batu",onClick:this.onClickstamp.bind(this,"x")},"\xd7"),i.a.createElement("button",{id:"sankaku",onClick:this.onClickstamp.bind(this,"\u25b3")},"\u25b3"),i.a.createElement("button",{id:"timeset",onClick:this.onClickstamp.bind(this,"time")},"Time"),i.a.createElement("div",{id:"calendar"}),i.a.createElement(y.a,{locale:"ja-JP",calendarType:"US",value:this.state.receptionDate,tileContent:this.getTileContent.bind(this),onChange:function(e){return t.dayClick(e)}}),i.a.createElement("div",null,"\u88dc\u8db3\u5e0c\u671b",i.a.createElement("input",{type:"textarea",name:"comment",value:this.state.comment,onChange:this.commentOnchange}),i.a.createElement("button",{onClick:this.addDataOnClick},"\u767b\u9332")),i.a.createElement(v.a,{isOpen:this.state.modalIsOpen,onAfterOpen:this.afterOpenModal,onRequestClose:this.closeModal,style:R,contentLabel:"Example Modal"},i.a.createElement("h2",null,"\u51fa\u52e4\u53ef\u80fd\u6642\u9593\u3092\u9078\u629e"),i.a.createElement("div",null,i.a.createElement("select",{onChange:this.startTimeChange,value:this.state.startTime},this.state.shifttimes.map(function(t){return i.a.createElement("option",{key:t},t)})),"\uff5e",i.a.createElement("select",{onChange:this.endTimeChange,value:this.state.endTime},this.state.shifttimes.map(function(t){return i.a.createElement("option",{key:t},t)}))),i.a.createElement("button",{onClick:this.closeModal},"\u9589\u3058\u308b"),i.a.createElement("button",{onClick:this.setShiftTime},"\u6c7a\u5b9a")))}},{key:"setdefaultshifts",value:function(t){var e=[],a=[],n=!0,i=!1,s=void 0;try{for(var o,r=t[Symbol.iterator]();!(n=(o=r.next()).done);n=!0){var l=o.value;a[l.date]={text:l.detail},e[l.date]={text:l.detail}}}catch(c){i=!0,s=c}finally{try{n||null==r.return||r.return()}finally{if(i)throw s}}this.setState({default_month_days:e,month_days:a})}},{key:"getFormatDate",value:function(t){return"".concat(t.getFullYear()).concat(("0"+(t.getMonth()+1)).slice(-2)).concat(("0"+t.getDate()).slice(-2))}},{key:"getDateReception",value:function(){var t=this.state.date.getFullYear(),e=this.state.date.getMonth()+1,a=this.state.date.getDate(),n="",i="";if(a<=10)n=e+"/10\u307e\u3067("+e+"/16\uff5e"+e+"/"+new Date(t,e,0).getDate()+")",i=t+"/"+e+"/16";else if(a>24){12===e&&(t++,e=0),n=e+1+"/10\u307e\u3067("+(e+1)+"/16\uff5e"+(e+1)+"/"+new Date(t,e,0).getDate()+")",i=t+"/"+(e+1)+"/16"}else 12===e&&(t++,e=0),n=e+"/24\u307e\u3067("+(e+1)+"/1\uff5e"+(e+1)+"/15)",i=t+"/"+(e+1)+"/1";this.setState({deadline:n,receptionDate:new Date(i)})}},{key:"getTileContent",value:function(t){var e=t.date;if("month"!==t.view)return null;var a=this.getFormatDate(e);return i.a.createElement("p",null,this.state.month_days[a]&&this.state.month_days[a].text?this.state.month_days[a].text:"  ")}},{key:"onClickstamp",value:function(t){this.setState({stamp:t})}},{key:"dayClick",value:function(t){if(this.state.receptionDate<=t){var e=this.state.month_days,a=t.getFullYear()+("0"+(t.getMonth()+1)).slice(-2)+("0"+t.getDate()).slice(-2);this.setState({clickdate:a}),null==e[a]||""===e[a].text?"time"===this.state.stamp?this.openModal():(e[a]={text:this.state.stamp},this.setState({month_days:e})):this.state.stamp===e[a].text?(e[a]={text:""},this.setState({month_days:e})):this.state.stamp!==e[a].text&&("time"===this.state.stamp?e[a]={text:""}:(e[a]={text:this.state.stamp},this.setState({month_days:e})))}}},{key:"commentOnchange",value:function(t){this.setState({comment:t.target.value})}},{key:"openModal",value:function(){this.setState({modalIsOpen:!0})}},{key:"afterOpenModal",value:function(){}},{key:"closeModal",value:function(){this.setState({modalIsOpen:!1})}},{key:"setShiftTime",value:function(){if(this.state.startTime>=this.state.endTime)alert("\u4e0d\u53ef\u80fd\u306a\u6642\u9593\u3067\u3059");else{this.closeModal();var t=this.state.month_days;t[this.state.clickdate]={text:this.state.startTime+"-"+this.state.endTime},this.setState({month_days:t})}}},{key:"startTimeChange",value:function(t){this.setState({startTime:t.target.value})}},{key:"endTimeChange",value:function(t){this.setState({endTime:t.target.value})}},{key:"addDataOnClick",value:function(){var t=this.state.default_month_days,e=this.state.month_days,a=[];for(var n in e)null==t[n]&&(a[n]={text:e[n].text});var i=[];for(var s in t)""===e[s].text&&(i[s]={text:t[s].text});var o=[];for(var r in e)null!=t[r]&&""!==e[r].text&&t[r].text!==e[r].text&&(o[r]={text:e[r].text});a.length>0&&(this.setState({isUpdateshift:this.state.isUpdateshift.concat("add")}),this.dbUpdater("/testaddshiftdata",a)),i.length>0&&(this.setState({isUpdateshift:this.state.isUpdateshift.concat("delete")}),this.dbUpdater("/testdeleteshiftdata",i)),o.length>0&&(this.setState({isUpdateshift:this.state.isUpdateshift.concat("update")}),this.dbUpdater("/testupdateshiftdata",o)),fetch("/testupdatecommentdata",{method:"POST",body:JSON.stringify([this.state.comment]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(t){return t.json()}).then(function(t){return alert("\u767b\u9332\u3057\u307e\u3057\u305f")}),this.shiftupdateChecker("")}},{key:"dbUpdater",value:function(t,e){var a=this,n=[];for(var i in e)n.push({date:i,text:e[i].text});fetch(t,{method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(t){return t.json()}).then(function(t){return a.shiftupdateChecker(t)})}},{key:"shiftupdateChecker",value:function(t){var e=this;if(""!==t){var a=[],n=!0,i=!1,s=void 0;try{for(var o,r=this.state.isUpdateshift[Symbol.iterator]();!(n=(o=r.next()).done);n=!0){var l=o.value;l!==t&&a.push(l)}}catch(c){i=!0,s=c}finally{try{n||null==r.return||r.return()}finally{if(i)throw s}}a.length<=0&&fetch("/testshiftdata").then(function(t){return t.json()}).then(function(t){return e.setdefaultshifts(t)}),this.setState({isUpdateshift:a})}else this.state.isUpdateshift.length<=0&&fetch("/testshiftdata").then(function(t){return t.json()}).then(function(t){return e.setdefaultshifts(t)})}}]),e}(n.Component),A=function(t){function e(t){var a;return Object(r.a)(this,e),(a=Object(c.a)(this,Object(h.a)(e).call(this,t))).setRedirect=function(){a.setState({redirect:!0})},a.renderRedirect=function(){if(a.state.redirect)return i.a.createElement(u.a,{to:"/Home"})},a.getTest=function(){console.log("test")},a.state={redirect:!1},a}return Object(m.a)(e,t),Object(l.a)(e,[{key:"render",value:function(){return i.a.createElement("div",{className:"App"},this.renderRedirect(),i.a.createElement("h1",null,"\u30ed\u30b0\u30a4\u30f3"),i.a.createElement("a",{href:"/auth"},"\u30ed\u30b0\u30a4\u30f3\uff12"),i.a.createElement("div",null,i.a.createElement("h2",null,"tester"),"------------------",i.a.createElement("br",null),i.a.createElement("a",{href:"/callback"},"callback"),i.a.createElement("br",null),i.a.createElement("a",{href:"/db"},"DBChecker"),i.a.createElement("br",null),i.a.createElement(d.b,{to:"/Home"},"HomeChecker in local"),i.a.createElement("br",null),"-------------------------"),i.a.createElement("button",{onClick:this.setRedirect},"redirect"))}}]),e}(n.Component),N=function(){return i.a.createElement(d.a,null,i.a.createElement("div",null,i.a.createElement(u.b,{exact:!0,path:"/",component:A}),i.a.createElement(u.b,{path:"/Home",component:g}),i.a.createElement(u.b,{path:"/Setting",component:j}),i.a.createElement(u.b,{path:"/Wishlist",component:F}),i.a.createElement(u.b,{path:"/Testpage",component:g}),i.a.createElement(u.b,{path:"/Homelocal",component:Y})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(i.a.createElement(N,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[58,1,2]]]);
//# sourceMappingURL=main.332a5f9c.chunk.js.map