(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{106:function(e,t,a){},107:function(e,t,a){},108:function(e,t,a){},109:function(e,t,a){"use strict";a.r(t);var n=a(0),i=a.n(n),s=a(10),r=a.n(s),o=(a(73),a(18)),l=a(19),c=a(23),m=a(20),d=a(22),u=a(28),h=a(24),f=a(3),p=a(62),b=a.n(p),y=a(29),v=a.n(y),k=a(5),g=a(141),E={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"},formcontrol:{fontSize:"10px"}},w=Object(k.a)({root:{"& label.Mui-focused":{color:"#5f28c4"},"& .MuiOutlinedInput-root":{"&.Mui-focused fieldset":{borderColor:"#5f28c4"}}}})(g.a);v.a.setAppElement("#root");var C=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={userdata:[],date:new Date,receptionDate:new Date,stamp:"x",stamptime:"",deadline:"",default_month_days:[],month_days:[],shifttimes:["09:00","09:30","10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30","18:00","18:30","19:00","19:30","20:00","20:30","21:00","21:30","22:00","22:30","23:00","23:30","23:45"],startTime:"09:00",endTime:"09:00",complementdaysText:"",wishdays:["",1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16],default_comments:[],comments:[],wishday:"",comment:"",nowprintcommentday:"",modalIsOpen:!1,isUpdateshift:[]},a.setdefaultshifts=a.setdefaultshifts.bind(Object(f.a)(a)),a.setdefaultcomment=a.setdefaultcomment.bind(Object(f.a)(a)),a.setComplementdays=a.setComplementdays.bind(Object(f.a)(a)),a.getDateReception=a.getDateReception.bind(Object(f.a)(a)),a.dayspreOnclick=a.dayspreOnclick.bind(Object(f.a)(a)),a.daysbackOnclick=a.daysbackOnclick.bind(Object(f.a)(a)),a.dayspreback=a.dayspreback.bind(Object(f.a)(a)),a.wishdayOnchange=a.wishdayOnchange.bind(Object(f.a)(a)),a.commentOnchange=a.commentOnchange.bind(Object(f.a)(a)),a.openModal=a.openModal.bind(Object(f.a)(a)),a.afterOpenModal=a.afterOpenModal.bind(Object(f.a)(a)),a.closeModal=a.closeModal.bind(Object(f.a)(a)),a.setShiftTime=a.setShiftTime.bind(Object(f.a)(a)),a.startTimeChange=a.startTimeChange.bind(Object(f.a)(a)),a.endTimeChange=a.endTimeChange.bind(Object(f.a)(a)),a.addDataOnClick=a.addDataOnClick.bind(Object(f.a)(a)),a.shiftupdateChecker=a.shiftupdateChecker.bind(Object(f.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;this.getDateReception(),fetch("/userdata").then(function(e){return e.json()}).then(function(t){return e.setState({userdata:t})}),fetch("/shiftdata").then(function(e){return e.json()}).then(function(t){return e.setdefaultshifts(t)}),fetch("/getcommentdata").then(function(e){return e.json()}).then(function(t){return e.setdefaultcomment(t)})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("h1",null,"\u30b7\u30d5\u30c8\u5e0c\u671b"),"\u3088\u3046\u3053\u305d",this.state.userdata.username,"\u3055\u3093",i.a.createElement("span",null,i.a.createElement(u.b,{to:"/Setting",id:"setting"},i.a.createElement("div",{id:"settingimg"})),i.a.createElement("a",{href:"/logout"},i.a.createElement("span",{className:"redbutton"},"\u30ed\u30b0\u30a2\u30a6\u30c8"))),i.a.createElement("h2",{className:"reception"},this.state.receptionDate.getFullYear()," ",this.state.receptionDate.getMonth()+1,"\u6708",this.state.receptionDate.getDate(),"\u65e5\uff5e\u53d7\u4ed8\u4e2d"),i.a.createElement("div",{id:"dateText"},this.state.deadline),i.a.createElement("div",{className:"itemholder"},i.a.createElement("button",{className:"redbutton",onClick:this.onClickstamp.bind(this,"x")},"\u2715"),i.a.createElement("button",{className:"greenbutton",onClick:this.onClickstamp.bind(this,"\u25b3")},"\u25b3"),i.a.createElement("button",{className:"bluebutton",onClick:this.onClickstamp.bind(this,"time")},"\u6642\u9593\u6307\u5b9a")),i.a.createElement("div",{id:"calendar"},i.a.createElement(b.a,{locale:"ja-JP",calendarType:"US",value:this.state.receptionDate,tileContent:this.getTileContent.bind(this),onChange:function(t){return e.dayClick(t)}})),i.a.createElement("div",{className:"flameholder"},i.a.createElement("div",{className:"flame"},"\u88dc\u8db3\u5e0c\u671b:",this.state.complementdaysText,i.a.createElement("span",{id:"termbuttons"},i.a.createElement("button",{onClick:this.dayspreOnclick,className:"bluebutton"},"\u25c1"),i.a.createElement("button",{onClick:this.daysbackOnclick,className:"bluebutton"},"\u25b7")),i.a.createElement("br",null),i.a.createElement("div",{id:"wishday"},"\u5e0c\u671b\u51fa\u52e4\u65e5\u6570\uff1a",i.a.createElement("select",{onChange:this.wishdayOnchange,value:this.state.wishday},this.state.wishdays.map(function(e){return i.a.createElement("option",{key:e},e)})),"\u65e5"),i.a.createElement("div",null,i.a.createElement(w,{id:"outlined-name",label:"\u8ffd\u8a18",value:this.state.comment,onChange:this.commentOnchange,margin:"normal",variant:"outlined",placeholder:"\u5e0c\u671b\u3092\u8a18\u5165"}),i.a.createElement("button",{id:"submit_shiftdata",onClick:this.addDataOnClick},"\u767b\u9332")))),i.a.createElement(v.a,{isOpen:this.state.modalIsOpen,onAfterOpen:this.afterOpenModal,onRequestClose:this.closeModal,style:E,contentLabel:"worktime Modal"},i.a.createElement("h2",null,"\u51fa\u52e4\u53ef\u80fd\u6642\u9593\u3092\u9078\u629e"),i.a.createElement("div",null,i.a.createElement("select",{onChange:this.startTimeChange,value:this.state.startTime},this.state.shifttimes.map(function(e){return i.a.createElement("option",{key:e},e)})),"\uff5e",i.a.createElement("select",{onChange:this.endTimeChange,value:this.state.endTime},this.state.shifttimes.map(function(e){return i.a.createElement("option",{key:e},e)}))),i.a.createElement("button",{onClick:this.closeModal},"\u9589\u3058\u308b"),i.a.createElement("button",{onClick:this.setShiftTime},"\u6c7a\u5b9a")))}},{key:"getintdate",value:function(e,t,a){return e+("0"+(t+1)).slice(-2)+("0"+a).slice(-2)}},{key:"setdefaultshifts",value:function(e){var t=[],a=[],n=!0,i=!1,s=void 0;try{for(var r,o=e[Symbol.iterator]();!(n=(r=o.next()).done);n=!0){var l=r.value;a[l.date]={text:l.detail},t[l.date]={text:l.detail}}}catch(c){i=!0,s=c}finally{try{n||null==o.return||o.return()}finally{if(i)throw s}}this.setState({default_month_days:t,month_days:a})}},{key:"setdefaultcomment",value:function(e){if(""!==e){var t=[],a=[],n=!0,i=!1,s=void 0;try{for(var r,o=e[Symbol.iterator]();!(n=(r=o.next()).done);n=!0){var l=r.value,c=new Date(l.date),m=c.getFullYear()+("0"+(c.getMonth()+1)).slice(-2)+("0"+c.getDate()).slice(-2);a[m]={comment:l.text,wishday:l.wishday},t[m]={comment:l.text,wishday:l.wishday}}}catch(p){i=!0,s=p}finally{try{n||null==o.return||o.return()}finally{if(i)throw s}}var d=this.state.receptionDate,u=d.getFullYear()+("0"+(d.getMonth()+1)).slice(-2)+("0"+d.getDate()).slice(-2),h="",f="";null!=a[u]&&(h=a[u].comment,f=a[u].wishday),this.setState({default_comments:t,comments:a,comment:h,wishday:f,nowprintcommentday:u}),this.setComplementdays(d)}}},{key:"getFormatDate",value:function(e){return"".concat(e.getFullYear()).concat(("0"+(e.getMonth()+1)).slice(-2)).concat(("0"+e.getDate()).slice(-2))}},{key:"getDateReception",value:function(){var e=this.state.date.getFullYear(),t=this.state.date.getMonth()+1,a=this.state.date.getDate(),n="",i="",s="";if(a<=10)i=t+"/10\u307e\u3067("+(n=t+"/16\uff5e"+t+"/"+new Date(e,t,0).getDate())+")",s=e+"/"+t+"/16";else if(a>24){12===t&&(e++,t=0),i=t+1+"/10\u307e\u3067("+(n=t+1+"/16\uff5e"+(t+1)+"/"+new Date(e,t,0).getDate())+")",s=e+"/"+(t+1)+"/16"}else 12===t&&(e++,t=0),i=t+"/24\u307e\u3067("+(n=t+1+"/1\uff5e"+(t+1)+"/15")+")",s=e+"/"+(t+1)+"/1";this.setState({complementdaysText:n,deadline:i,receptionDate:new Date(s)})}},{key:"setComplementdays",value:function(e){var t=e.getMonth()+1,a=e.getDate(),n="";if(1===a)n=t+"/1\uff5e"+t+"/15";else if(16===a){n=t+"/16\uff5e"+t+"/"+new Date(e.getFullYear(),t,0).getDate()}this.setState({complementdaysText:n})}},{key:"getTileContent",value:function(e){var t=e.date;if("month"!==e.view)return null;var a=this.getFormatDate(t);return i.a.createElement("p",{className:"calendaritem"},this.state.month_days[a]&&this.state.month_days[a].text?this.state.month_days[a].text:"  ")}},{key:"onClickstamp",value:function(e){this.setState({stamp:e})}},{key:"dayClick",value:function(e){if(this.state.receptionDate<=e){var t=this.state.month_days,a=e.getFullYear()+("0"+(e.getMonth()+1)).slice(-2)+("0"+e.getDate()).slice(-2);this.setState({clickdate:a}),null==t[a]||""===t[a].text?"time"===this.state.stamp?this.openModal():(t[a]={text:this.state.stamp},this.setState({month_days:t})):this.state.stamp===t[a].text?(t[a]={text:""},this.setState({month_days:t})):this.state.stamp!==t[a].text&&("time"===this.state.stamp?t[a]={text:""}:(t[a]={text:this.state.stamp},this.setState({month_days:t})))}}},{key:"dayspreOnclick",value:function(){this.dayspreback("pre")}},{key:"daysbackOnclick",value:function(){this.dayspreback("back")}},{key:"dayspreback",value:function(e){this.state.comments[this.state.nowprintcommentday]={comment:this.state.comment,wishday:this.state.wishday};var t=this.state.nowprintcommentday,a=(t.substr(0,4)+"/"+t.substr(4,2)+"/"+t.substr(6,2)).split("/"),n=new Date(a[0],a[1]-1,a[2]),i=n.getFullYear(),s=n.getMonth(),r=n.getDate();"pre"===e?16===r?r=1:0===s?(i--,s=11,r=16):(s--,r=16):"back"===e&&(1===r?r=16:11===s?(i++,s=0,r=1):(s++,r=1)),null==this.state.comments[this.getintdate(i,s,r)]&&(this.state.comments[this.getintdate(i,s,r)]={comment:"",wishday:""}),this.setComplementdays(new Date(i,s,r)),this.setState({comment:this.state.comments[this.getintdate(i,s,r)].comment,wishday:this.state.comments[this.getintdate(i,s,r)].wishday,nowprintcommentday:this.getintdate(i,s,r)})}},{key:"wishdayOnchange",value:function(e){this.setState({wishday:e.target.value})}},{key:"commentOnchange",value:function(e){this.setState({comment:e.target.value})}},{key:"openModal",value:function(){this.setState({modalIsOpen:!0})}},{key:"afterOpenModal",value:function(){}},{key:"closeModal",value:function(){this.setState({modalIsOpen:!1})}},{key:"setShiftTime",value:function(){if(this.state.startTime>=this.state.endTime)alert("\u4e0d\u53ef\u80fd\u306a\u6642\u9593\u3067\u3059");else{this.closeModal();var e=this.state.month_days;e[this.state.clickdate]={text:this.state.startTime+"-"+this.state.endTime},this.setState({month_days:e})}}},{key:"startTimeChange",value:function(e){this.setState({startTime:e.target.value})}},{key:"endTimeChange",value:function(e){this.setState({endTime:e.target.value})}},{key:"addDataOnClick",value:function(){this.state.comments[this.state.nowprintcommentday]={comment:this.state.comment,wishday:this.state.wishday};var e=this.state.default_month_days,t=this.state.month_days,a=[];for(var n in t)null==e[n]&&(a[n]={text:t[n].text});var i=[];for(var s in e)""===t[s].text&&(i[s]={text:e[s].text});var r=[];for(var o in t)null!=e[o]&&""!==t[o].text&&e[o].text!==t[o].text&&(r[o]={text:t[o].text});a.length>0&&(this.setState({isUpdateshift:this.state.isUpdateshift.concat("add")}),this.dbUpdater("/addshiftdata",a)),i.length>0&&(this.setState({isUpdateshift:this.state.isUpdateshift.concat("delete")}),this.dbUpdater("/deleteshiftdata",i)),r.length>0&&(this.setState({isUpdateshift:this.state.isUpdateshift.concat("update")}),this.dbUpdater("/updateshiftdata",r));var l=[];for(var c in this.state.comments)null==this.state.default_comments[c]&&l.push({date:c,comment:this.state.comments[c].comment,wishday:this.state.comments[c].wishday});var m=[];for(var d in this.state.default_comments)this.state.comments[d].comment===this.state.default_comments[d].comment&&this.state.comments[d].wishday===this.state.default_comments[d].wishday||m.push({date:d,comment:this.state.comments[d].comment,wishday:this.state.comments[d].wishday});fetch("/updatecommentdata",{method:"POST",body:JSON.stringify(m),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}),fetch("/addcommentdata",{method:"POST",body:JSON.stringify(l),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}).then(function(e){return alert("\u767b\u9332\u3057\u307e\u3057\u305f")}),this.shiftupdateChecker("")}},{key:"dbUpdater",value:function(e,t){var a=this,n=[];for(var i in t)n.push({date:i,text:t[i].text});fetch(e,{method:"POST",body:JSON.stringify(n),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}).then(function(e){return a.shiftupdateChecker(e)})}},{key:"shiftupdateChecker",value:function(e){var t=this;if(""!==e){var a=[],n=!0,i=!1,s=void 0;try{for(var r,o=this.state.isUpdateshift[Symbol.iterator]();!(n=(r=o.next()).done);n=!0){var l=r.value;l!==e&&a.push(l)}}catch(c){i=!0,s=c}finally{try{n||null==o.return||o.return()}finally{if(i)throw s}}a.length<=0&&(fetch("/shiftdata").then(function(e){return e.json()}).then(function(e){return t.setdefaultshifts(e)}),fetch("/getcommentdata").then(function(e){return e.json()}).then(function(e){return t.setdefaultcomment(e)})),this.setState({isUpdateshift:a})}else this.state.isUpdateshift.length<=0&&(fetch("/shiftdata").then(function(e){return e.json()}).then(function(e){return t.setdefaultshifts(e)}),fetch("/getcommentdata").then(function(e){return e.json()}).then(function(e){return t.setdefaultcomment(e)}))}}]),t}(n.Component),O=a(140),j=a(139),S=Object(O.a)(function(e){return{container:{display:"flex",flexWrap:"wrap"},input:{margin:e.spacing(1)}}}),D={content:{top:"50%",left:"50%",right:"auto",bottom:"auto",marginRight:"-50%",transform:"translate(-50%, -50%)"}};v.a.setAppElement("#root");var M=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).pushtoHome=function(){a.props.history.push("/")},a.state={userdata:[],username:"",worktime:"",memberlist:[],administerlist:[],nonadministerlist:[],addministeroption:[],ischangeworktime:!1,test:"",memberModalopen:!1,administerModalopen:!1,isAddadminister:!1},a.loadmemberlist=a.loadmemberlist.bind(Object(f.a)(a)),a.onChangeusername=a.onChangeusername.bind(Object(f.a)(a)),a.updateUsername=a.updateUsername.bind(Object(f.a)(a)),a.onChangeworktime=a.onChangeworktime.bind(Object(f.a)(a)),a.setworktime=a.setworktime.bind(Object(f.a)(a)),a.onClickunsubsribe=a.onClickunsubsribe.bind(Object(f.a)(a)),a.pushtoHome=a.pushtoHome.bind(Object(f.a)(a)),a.openmemberModal=a.openmemberModal.bind(Object(f.a)(a)),a.closememberModal=a.closememberModal.bind(Object(f.a)(a)),a.closeadministerModal=a.closeadministerModal.bind(Object(f.a)(a)),a.onChangeaddministeroption=a.onChangeaddministeroption.bind(Object(f.a)(a)),a.onClickadminister=a.onClickadminister.bind(Object(f.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;fetch("/testuserdata").then(function(e){return e.json()}).then(function(t){e.setState({userdata:t,username:t.username,worktime:t.worktime}),t.administer&&e.loadmemberlist()})}},{key:"loadmemberlist",value:function(){var e=this;fetch("/memberlist").then(function(e){return e.json()}).then(function(t){e.setState({memberlist:t});var a=[],n=[],i=!0,s=!1,r=void 0;try{for(var o,l=t[Symbol.iterator]();!(i=(o=l.next()).done);i=!0){var c=o.value;c.administer?a.push(c):n.push(c)}}catch(m){s=!0,r=m}finally{try{i||null==l.return||l.return()}finally{if(s)throw r}}e.setState({administerlist:a,nonadministerlist:n,addministeroption:n[0]})})}},{key:"render",value:function(){var e=this;return i.a.createElement("div",null,i.a.createElement("h1",null,"\u8a2d\u5b9a"),i.a.createElement("div",{className:"profileholder"},i.a.createElement("div",{className:"profilesetting"},i.a.createElement("div",{className:"profilecard"},i.a.createElement("img",{src:this.state.userdata.picture,id:"profileimage"}),i.a.createElement("p",{id:"linename"},this.state.userdata.displayName)),i.a.createElement("div",null,"\u30e6\u30fc\u30b6\u30fc\u540d",i.a.createElement(j.a,{id:"username",value:this.state.username,onChange:this.onChangeusername,className:S.input,inputProps:{"aria-label":"username"}}),i.a.createElement("button",{onClick:this.updateUsername,className:"bluebutton",id:"updatebutton"},"\u66f4\u65b0")),i.a.createElement("div",{className:"worktime"},"\u52e4\u52d9\u533a\u5206:",this.state.ischangeworktime?i.a.createElement("span",null,i.a.createElement("input",{type:"radio",name:"worktime",value:"\u65e9",checked:"\u65e9"===this.state.worktime,onChange:function(){return e.setState({worktime:"\u65e9"})}}),"\u65e9\u756a",i.a.createElement("input",{type:"radio",name:"worktime",value:"\u9045",checked:"\u9045"===this.state.worktime,onChange:function(){return e.setState({worktime:"\u9045"})}}),"\u9045\u756a",i.a.createElement("button",{onClick:this.setworktime,className:"bluebutton"},"\u66f4\u65b0")):i.a.createElement("span",null,this.state.userdata.worktime,"\u756a",i.a.createElement("button",{onClick:this.onChangeworktime,className:"bluebutton"},"\u5909\u66f4"))),i.a.createElement("button",{onClick:this.onClickunsubsribe,className:"redbutton",id:"disbutton"},"\u9000\u4f1a"))),i.a.createElement("div",{style:{display:this.state.userdata.administer?"":"none"},className:"administerview"},i.a.createElement("h2",{className:"administerheader"},"\u7ba1\u7406\u8005\u6a29\u9650"),i.a.createElement(u.b,{to:{pathname:"/Wishlist",query:{pass:"administer"}}},i.a.createElement("span",{className:"administerbutton",id:"wishlistbutton"},"\u5e0c\u671b\u4e00\u89a7")),i.a.createElement("br",null),i.a.createElement("button",{onClick:this.openmemberModal,className:"administerbutton"},"\u767b\u9332\u8005\u4e00\u89a7"),i.a.createElement("button",{onClick:function(t){return e.setState({administerModalopen:!0})},className:"administerbutton"},"\u7ba1\u7406\u8005\u4e00\u89a7")),i.a.createElement(v.a,{isOpen:this.state.memberModalopen,onRequestClose:this.closememberModal,style:D,contentLabel:"Register Modal"},i.a.createElement("h2",null,"\u767b\u9332\u8005\u4e00\u89a7"),this.state.memberlist.map(function(t){return i.a.createElement("div",{key:t.userid},t.name,i.a.createElement("span",{style:{display:t.userid!==e.state.userdata.userId?"":"none"}},i.a.createElement("button",{value:t.userid,onClick:function(a){return e.onClickdeletemember(t)}},"\u767b\u9332\u524a\u9664")))}),i.a.createElement("button",{onClick:this.closememberModal},"\u9589\u3058\u308b")),i.a.createElement(v.a,{isOpen:this.state.administerModalopen,onRequestClose:this.closeadministerModal,style:D,contentLabel:"Administer Modal"},i.a.createElement("h2",null,"\u7ba1\u7406\u8005\u4e00\u89a7"),this.state.administerlist.map(function(t){return i.a.createElement("div",{key:t.userid},t.name,i.a.createElement("span",{style:{display:t.userid!==e.state.userdata.userId?"":"none"}},i.a.createElement("button",{onClick:function(a){return e.onClickdeleteadminister(t)}},"\u89e3\u9664")))}),this.state.isAddadminister&&this.state.nonadministerlist.length>0?i.a.createElement("span",null,i.a.createElement("select",{onChange:this.onChangeaddministeroption,value:this.state.addministeroption.name},this.state.nonadministerlist.map(function(e){return i.a.createElement("option",null,e.name)})),i.a.createElement("button",{onClick:function(t){return e.onClickaddAdminister()}},"\u8ffd\u52a0")):i.a.createElement("button",{onClick:function(t){return e.onClickadminister()}},"\u8ffd\u52a0"),i.a.createElement("button",{onClick:this.closeadministerModal},"\u9589\u3058\u308b")))}},{key:"onChangeusername",value:function(e){this.setState({username:e.target.value})}},{key:"updateUsername",value:function(){var e=this;this.state.username!==this.state.userdata.username&&fetch("/updateusername",{method:"POST",body:JSON.stringify([this.state.username]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}).then(function(t){alert("\u767b\u9332\u3057\u307e\u3057\u305f"),e.state.userdata.username=e.state.username})}},{key:"onChangeworktime",value:function(){this.setState({ischangeworktime:!0})}},{key:"setworktime",value:function(){this.state.userdata.worktime!==this.state.worktime&&(fetch("/updateworktime",{method:"POST",body:JSON.stringify([this.state.worktime]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}),this.state.userdata.worktime=this.state.worktime),this.setState({ischangeworktime:!1})}},{key:"onClickunsubsribe",value:function(){window.confirm("\u9000\u4f1a\u3057\u307e\u3059\u304b\uff1f\n\u5168\u30e6\u30fc\u30b6\u30fc\u30c7\u30fc\u30bf\u304c\u524a\u9664\u3055\u308c\u307e\u3059")&&(fetch("/deleteuser",{method:"POST",headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}),fetch("/logout").then(function(e){return e.json()}),this.pushtoHome())}},{key:"openmemberModal",value:function(){this.setState({memberModalopen:!0})}},{key:"closememberModal",value:function(){this.setState({memberModalopen:!1})}},{key:"onClickdeletemember",value:function(e){var t=this;window.confirm(e.name+"\u3092\u672c\u5f53\u306b\u524a\u9664\u3057\u307e\u3059\u304b\uff1f\n\u8a72\u5f53\u30e6\u30fc\u30b6\u30fc\u306e\u30b7\u30d5\u30c8\u60c5\u5831\u3082\u524a\u9664\u3055\u308c\u307e\u3059")&&fetch("/deletemember",{method:"POST",body:JSON.stringify([e.userid]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}).then(function(e){t.closememberModal(),t.loadmemberlist()})}},{key:"onClickdeleteadminister",value:function(e){var t=this;window.confirm(e.name+"\u306e\u7ba1\u7406\u8005\u6a29\u9650\u3092\u5265\u596a\u3057\u307e\u3059\u304b\uff1f")&&fetch("/deleteadminister",{method:"POST",body:JSON.stringify([e.userid]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}).then(function(e){t.closeadministerModal(),t.loadmemberlist()})}},{key:"onChangeaddministeroption",value:function(e){var t=!0,a=!1,n=void 0;try{for(var i,s=this.state.nonadministerlist[Symbol.iterator]();!(t=(i=s.next()).done);t=!0){var r=i.value;if(r.name===e.target.value){this.setState({addministeroption:r});break}}}catch(o){a=!0,n=o}finally{try{t||null==s.return||s.return()}finally{if(a)throw n}}}},{key:"onClickadminister",value:function(){this.setState({isAddadminister:!0})}},{key:"onClickaddAdminister",value:function(){var e=this,t=this.state.addministeroption;window.confirm(t.name+"\u306b\u7ba1\u7406\u8005\u6a29\u9650\u3092\u6388\u4e0e\u3057\u307e\u3059\u304b\uff1f")&&fetch("/addadminister",{method:"POST",body:JSON.stringify([t.userid]),headers:{"Content-Type":"application/json"},mode:"cors"}).then(function(e){return e.json()}).then(function(t){e.closeadministerModal(),e.loadmemberlist()})}},{key:"closeadministerModal",value:function(){this.setState({administerModalopen:!1,isAddadminister:!1})}}]),t}(n.Component),N=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(c.a)(this,Object(m.a)(t).call(this,e))).state={query:a.props.location.query,accessable:!1,memberlist:[],allshiftdata:[],allcommentdata:[],printlist:[],printcommentlist:[],deadlineearly:10,deallinelate:24,startdate:"",printdays:[]},a.onClickchangeterm=a.onClickchangeterm.bind(Object(f.a)(a)),a.setprintDays=a.setprintDays.bind(Object(f.a)(a)),a.sortmembershift=a.sortmembershift.bind(Object(f.a)(a)),a.sortmembercomment=a.sortmembercomment.bind(Object(f.a)(a)),a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;void 0!==this.props.location.query&&"administer"===this.props.location.query.pass&&(this.setState({accessable:!0}),this.setdefaultDays(),fetch("/memberlist").then(function(e){return e.json()}).then(function(t){e.setState({memberlist:t}),fetch("/allshiftdata").then(function(e){return e.json()}).then(function(a){e.setState({allshiftdata:a}),e.sortmembershift(t,a,e.state.startdate)}),fetch("/allcommentdata").then(function(e){return e.json()}).then(function(a){e.setState({allcommentdata:a}),e.sortmembercomment(t,a,e.state.startdate)})}))}},{key:"render",value:function(){return i.a.createElement("div",null,this.state.accessable?i.a.createElement("div",null,i.a.createElement("h1",null,"Wishlist"),"\u30b7\u30d5\u30c8\u5e0c\u671b\u4e00\u89a7",i.a.createElement("button",{className:"bluebutton",value:"pre",onClick:this.onClickchangeterm},"\u25c1"),i.a.createElement("button",{className:"bluebutton",value:"back",onClick:this.onClickchangeterm},"\u25b7"),i.a.createElement("div",{className:"shittablediv"},i.a.createElement("table",{className:"shifttable"},i.a.createElement("thead",null,i.a.createElement("tr",null,i.a.createElement("th",{className:"blank"},"\u540d\u524d"),this.state.printdays.map(function(e){return i.a.createElement("th",{key:e},e)}))),i.a.createElement("tbody",null,this.state.printlist.map(function(e){return i.a.createElement("tr",{key:e.name},i.a.createElement("th",{key:e.name},e.name),e.shift.map(function(e){return i.a.createElement("td",null,e)}))})))),i.a.createElement("div",{className:"wishtablediv"},i.a.createElement("h2",null,"\u88dc\u8db3\u5e0c\u671b"),i.a.createElement("table",{className:"wishtable"},i.a.createElement("thead",null,i.a.createElement("tr",{className:"tableheader"},i.a.createElement("th",{className:"tablename"},"\u540d\u524d"),i.a.createElement("th",{className:"tableday"},"\u65e5\u6570"),i.a.createElement("th",{className:"tablecomment"},"\u8ffd\u8a18"))),i.a.createElement("tbody",null,this.state.printcommentlist.map(function(e){return i.a.createElement("tr",{key:e.name},i.a.createElement("td",{className:"tablename"},e.name),i.a.createElement("td",{className:"tableday"},e.wishday),i.a.createElement("td",{className:"tablecommenttd"},e.comment))}))))):i.a.createElement("div",null,"\u30a2\u30af\u30bb\u30b9\u3067\u304d\u307e\u305b\u3093"))}},{key:"setdefaultDays",value:function(){var e=new Date,t=e.getFullYear(),a=e.getMonth(),n=e.getDate(),i="";n<this.state.deadlineearly?i=new Date(t,a,1):n<this.state.deallinelate?i=new Date(t,a,16):n>=this.state.deallinelate&&(i=11===a?new Date(t+1,a+1,1):new Date(t,a+1,1)),this.setprintDays(i)}},{key:"onClickchangeterm",value:function(e){var t=this.state.startdate,a=t.getFullYear(),n=t.getMonth(),i=t.getDate(),s=e.target.value;"pre"===s?16===i?i=1:1===i&&(0===n?(a--,n=11,i=16):(n--,i=16)):"back"===s&&(1===i?i=16:16===i&&(11===n?(a++,n=0,i=1):(n++,i=1)));var r=new Date(a,n,i);this.setState({startdate:r}),this.setprintDays(r),this.sortmembershift(this.state.memberlist,this.state.allshiftdata,r),this.sortmembercomment(this.state.memberlist,this.state.allcommentdata,r)}},{key:"setprintDays",value:function(e){var t=[];if(1===e.getDate())for(var a=0;a<15;a++)t.push(e.getMonth()+1+"/"+(e.getDate()+a));else if(16===e.getDate())for(var n=new Date(e.getFullYear(),e.getMonth()+1,0),i=0;i<n.getDate()-e.getDate()+1;i++)t.push(e.getMonth()+1+"/"+(e.getDate()+i));this.setState({startdate:e,printdays:t})}},{key:"sortmembershift",value:function(e,t,a){var n=a,i="",s=[];1===n.getDate()?(i=new Date(n.getFullYear(),n.getMonth(),15),s=Array(15)):16===n.getDate()&&(i=new Date(n.getFullYear(),n.getMonth()+1,0),s=Array(i.getDate()-15));var r=[],o=!0,l=!1,c=void 0;try{for(var m,d=e[Symbol.iterator]();!(o=(m=d.next()).done);o=!0){var u=m.value,h=s.slice();h.fill("/");var f=!0,p=!1,b=void 0;try{for(var y,v=t[Symbol.iterator]();!(f=(y=v.next()).done);f=!0){var k=y.value;if(k.userid===u.userid){var g=String(k.date),E=parseInt(g.slice(0,4)),w=parseInt(g.slice(4,6)),C=parseInt(g.slice(6));E===n.getFullYear()&&w===n.getMonth()+1&&C>=n.getDate()&&C<=i.getDate()&&(h[C-n.getDate()]=k.detail)}}}catch(O){p=!0,b=O}finally{try{f||null==v.return||v.return()}finally{if(p)throw b}}r.push({name:u.name,shift:h})}}catch(O){l=!0,c=O}finally{try{o||null==d.return||d.return()}finally{if(l)throw c}}this.setState({printlist:r})}},{key:"sortmembercomment",value:function(e,t,a){var n=a,i=[],s=!0,r=!1,o=void 0;try{for(var l,c=e[Symbol.iterator]();!(s=(l=c.next()).done);s=!0){var m=l.value,d=!1,u=!0,h=!1,f=void 0;try{for(var p,b=t[Symbol.iterator]();!(u=(p=b.next()).done);u=!0){var y=p.value;if(m.userid===y.userid){var v=new Date(y.date);if(n.getFullYear()+"/"+n.getMonth()+"/"+n.getDate()===v.getFullYear()+"/"+v.getMonth()+"/"+v.getDate()){i.push({name:m.name,wishday:y.wishday,comment:y.text}),d=!0;break}}}}catch(k){h=!0,f=k}finally{try{u||null==b.return||b.return()}finally{if(h)throw f}}d||(i.push({name:m.name,wishday:"",comment:""}),d=!1)}}catch(k){r=!0,o=k}finally{try{s||null==c.return||c.return()}finally{if(r)throw o}}this.setState({printcommentlist:i})}}]),t}(n.Component),T=(a(106),a(107),a(108),function(e){function t(){return Object(o.a)(this,t),Object(c.a)(this,Object(m.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(l.a)(t,[{key:"render",value:function(){return i.a.createElement("div",{className:"App"},i.a.createElement("h1",null,"Shift-Resercher"),i.a.createElement("span",null,"\u30b7\u30d5\u30c8\u5e0c\u671b\u8a18\u5165\u30b5\u30a4\u30c8",i.a.createElement("br",null),"LINE\u3067\u767b\u9332\uff06\u30ed\u30b0\u30a4\u30f3",i.a.createElement("br",null),"\u2193\u3000\u2193\u3000\u2193"),i.a.createElement("form",{action:"/auth",method:"GET"},i.a.createElement("input",{type:"submit",className:"login_button",value:""})),i.a.createElement("span",{id:"developer"},"Developed by itoyu"),i.a.createElement("div",null,"------------------",i.a.createElement("br",null),i.a.createElement(u.b,{to:"/Home"},"HomeChecker in local"),i.a.createElement("br",null),"-------------------------"))}}]),t}(n.Component)),x=function(){return i.a.createElement(u.a,null,i.a.createElement("div",null,i.a.createElement(h.a,{exact:!0,path:"/",component:T}),i.a.createElement(h.a,{path:"/Home",component:C}),i.a.createElement(h.a,{path:"/Setting",component:M}),i.a.createElement(h.a,{path:"/Wishlist",component:N})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(i.a.createElement(x,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},68:function(e,t,a){e.exports=a(109)},73:function(e,t,a){}},[[68,1,2]]]);
//# sourceMappingURL=main.0e386696.chunk.js.map