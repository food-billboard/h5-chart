(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([[80],{"2M+T":function(e,t,n){e.exports={"component-interactive-switch-icon":"component-interactive-switch-icon___3cn6T"}},PHFZ:function(e,t,n){"use strict";n.r(t);n("BoS7");var a=n("Sdc0"),o=(n("OaEy"),n("2fM7")),i=n("jrin"),c=n("fWQN"),l=n("mtLc"),s=n("yKVA"),h=n("879j"),r=n("q1tI"),u=n.n(r),d=n("b7Zg"),p=n("+8FR"),f=n("JcTt"),b=n("eLKO"),v=n("+NTE"),m=n("8dFQ"),$=n("Ix2a"),g=n("WIoH"),k=p["a"].Item,y=function(e){Object(s["a"])(n,e);var t=Object(h["a"])(n);function n(){var e;Object(c["a"])(this,n);for(var a=arguments.length,o=new Array(a),l=0;l<a;l++)o[l]=arguments[l];return e=t.call.apply(t,[this].concat(o)),e.onKeyChange=function(t,n){e.props.onChange({config:{options:Object(i["a"])({},t,n)}})},e}return Object(l["a"])(n,[{key:"render",value:function(){var e=this,t=this.props.value,n=t.config.options,i=n.defaultChecked,c=n.offColor,l=n.onColor,s=n.onHandleColor,h=n.offHandleColor,r=n.checkedIcon,y=n.uncheckedIcon,C=n.boxShadow,w=n.activeBoxShadow;return u.a.createElement(d["b"],{items:[{label:u.a.createElement(d["a"],null,"\u72b6\u6001\u6837\u5f0f"),children:u.a.createElement(p["a"],{level:1},u.a.createElement(f["a"],{child:{key:"on",header:"\u5f00\u542f\u72b6\u6001"},parent:{defaultActiveKey:["on"]}},u.a.createElement(k,{label:"\u80cc\u666f\u8272"},u.a.createElement(b["a"],null,u.a.createElement(m["a"],{value:l,ignoreAlpha:!0,onChange:this.onKeyChange.bind(this,"onColor")}))),u.a.createElement(k,{label:"\u6309\u94ae\u989c\u8272"},u.a.createElement(b["a"],null,u.a.createElement(m["a"],{value:s,ignoreAlpha:!0,onChange:this.onKeyChange.bind(this,"onHandleColor")}))),u.a.createElement(f["a"],{child:{header:"\u6587\u6848",key:"checkedIcon",visibleRender:!0,value:r.show,onChange:function(t){e.onKeyChange("checkedIcon",{show:t})}}},u.a.createElement(k,{label:"\u7c7b\u578b"},u.a.createElement(b["a"],null,u.a.createElement(o["a"],{value:r.type,onChange:function(t){e.onKeyChange("checkedIcon",{type:t})},className:"w-100",options:[{label:"\u56fe\u6807",value:"icon"},{label:"\u6587\u5b57",value:"text"}]}))),"icon"===r.type&&u.a.createElement(v["a"],{value:r.value,onChange:function(t){e.onKeyChange("checkedIcon",{value:t})}}),"text"===r.type&&u.a.createElement(k,{label:"\u5185\u5bb9"},u.a.createElement(b["a"],null,u.a.createElement($["a"],{value:r.value,onChange:function(t){e.onKeyChange("checkedIcon",{value:t})}}))),u.a.createElement(k,{label:"\u989c\u8272"},u.a.createElement(b["a"],null,u.a.createElement(m["a"],{value:r.color,onChange:function(t){e.onKeyChange("checkedIcon",{color:t})}}))))),u.a.createElement(f["a"],{child:{key:"off",header:"\u5173\u95ed\u72b6\u6001"},parent:{defaultActiveKey:["off"]}},u.a.createElement(k,{label:"\u80cc\u666f\u8272"},u.a.createElement(b["a"],null,u.a.createElement(m["a"],{value:c,ignoreAlpha:!0,onChange:this.onKeyChange.bind(this,"offColor")}))),u.a.createElement(k,{label:"\u6309\u94ae\u989c\u8272"},u.a.createElement(b["a"],null,u.a.createElement(m["a"],{value:h,ignoreAlpha:!0,onChange:this.onKeyChange.bind(this,"offHandleColor")}))),u.a.createElement(f["a"],{child:{header:"\u6587\u6848",key:"uncheckedIcon",visibleRender:!0,value:y.show,onChange:function(t){e.onKeyChange("uncheckedIcon",{show:t})}}},u.a.createElement(k,{label:"\u7c7b\u578b"},u.a.createElement(b["a"],null,u.a.createElement(o["a"],{value:y.type,onChange:function(t){e.onKeyChange("uncheckedIcon",{type:t})},className:"w-100",options:[{label:"\u56fe\u6807",value:"icon"},{label:"\u6587\u5b57",value:"text"}]}))),"icon"===y.type&&u.a.createElement(v["a"],{value:y.value,onChange:function(t){e.onKeyChange("uncheckedIcon",{value:t})}}),"text"===y.type&&u.a.createElement(k,{label:"\u5185\u5bb9"},u.a.createElement(b["a"],null,u.a.createElement($["a"],{value:y.value,onChange:function(t){e.onKeyChange("uncheckedIcon",{value:t})}}))),u.a.createElement(k,{label:"\u989c\u8272"},u.a.createElement(b["a"],null,u.a.createElement(m["a"],{value:y.color,onChange:function(t){e.onKeyChange("uncheckedIcon",{color:t})}}))))),u.a.createElement(f["a"],{child:{header:"\u9634\u5f71",key:"boxShadow"}},u.a.createElement(g["a"],{value:C,onChange:this.onKeyChange.bind(this,"boxShadow"),collapseProps:{child:{header:"\u57fa\u7840\u9634\u5f71",key:"boxShadow-base"}}}),u.a.createElement(g["a"],{value:w,onChange:this.onKeyChange.bind(this,"activeBoxShadow"),collapseProps:{child:{header:"\u9009\u4e2d\u9634\u5f71",key:"boxShadow-active"}}}))),key:"1"},{label:u.a.createElement(d["a"],null,"\u4ea4\u4e92"),children:u.a.createElement(p["a"],{level:1},u.a.createElement(k,{label:"\u521d\u59cb\u72b6\u6001"},u.a.createElement(b["a"],null,u.a.createElement(a["a"],{checked:i,onChange:this.onKeyChange.bind(this,"defaultChecked")})))),key:"2"}]})}}]),n}(r["Component"]);t["default"]=y},VzG4:function(e,t,n){"use strict";n.r(t);var a=n("jrin"),o=n("tJVT"),i=n("q1tI"),c=n.n(i),l=n("LvDl"),s=n("TSYQ"),h=n.n(s),r=n("CQem"),u=n("jySm"),d=n("8dFQ"),p=n("0Owb"),f=n("PpiC"),b=n("fWQN"),v=n("mtLc"),m=n("tS8v"),$=n("yKVA"),g=n("879j"),k=c.a.createElement("svg",{viewBox:"-2 -5 14 20",height:"100%",width:"100%",style:{position:"absolute",top:0}},c.a.createElement("path",{d:"M9.9 2.12L7.78 0 4.95 2.828 2.12 0 0 2.12l2.83 2.83L0 7.776 2.123 9.9 4.95 7.07 7.78 9.9 9.9 7.776 7.072 4.95 9.9 2.12",fill:"#fff",fillRule:"evenodd"})),y=c.a.createElement("svg",{height:"100%",width:"100%",viewBox:"-2 -5 17 21",style:{position:"absolute",top:0}},c.a.createElement("path",{d:"M11.264 0L5.26 6.004 2.103 2.847 0 4.95l5.26 5.26 8.108-8.107L11.264 0",fill:"#fff",fillRule:"evenodd"}));function C(e,t,n,a,o){var i=(e-n)/(t-n);if(0===i)return a;if(1===i)return o;for(var c="#",l=1;l<8;l+=2){var s=parseInt(a.substr(l,2),16),h=parseInt(o.substr(l,2),16),r=Math.round((1-i)*s+i*h),u=r.toString(16);1===u.length&&(u="0".concat(u)),c+=u}return c}function w(e){if(9===e.length)return e;if(7===e.length)return e+"FF";for(var t="#",n=1;n<4;n+=1)t+=e[n]+e[n];return t+"FF"}function E(e,t,n,a,o){var i=w(a),c=w(o);return C(e,t,n,i,c)}var S=["checked","disabled","className","offColor","onColor","offHandleColor","onHandleColor","checkedIcon","uncheckedIcon","checkedHandleIcon","uncheckedHandleIcon","boxShadow","activeBoxShadow","height","width","borderRadius","handleDiameter"],M=function(e){Object($["a"])(n,e);var t=Object(g["a"])(n);function n(e){var a;return Object(b["a"])(this,n),a=t.call(this,e),a.$initStyle(),a.state={$pos:e.checked?a.$checkedPos:a.$uncheckedPos},a.$lastDragAt=0,a.$lastKeyUpAt=0,a.$onMouseDown=a.$onMouseDown.bind(Object(m["a"])(a)),a.$onMouseMove=a.$onMouseMove.bind(Object(m["a"])(a)),a.$onMouseUp=a.$onMouseUp.bind(Object(m["a"])(a)),a.$onTouchStart=a.$onTouchStart.bind(Object(m["a"])(a)),a.$onTouchMove=a.$onTouchMove.bind(Object(m["a"])(a)),a.$onTouchEnd=a.$onTouchEnd.bind(Object(m["a"])(a)),a.$onClick=a.$onClick.bind(Object(m["a"])(a)),a.$onInputChange=a.$onInputChange.bind(Object(m["a"])(a)),a.$onKeyUp=a.$onKeyUp.bind(Object(m["a"])(a)),a.$setHasOutline=a.$setHasOutline.bind(Object(m["a"])(a)),a.$unsetHasOutline=a.$unsetHasOutline.bind(Object(m["a"])(a)),a.$getInputRef=a.$getInputRef.bind(Object(m["a"])(a)),a}return Object(v["a"])(n,[{key:"componentDidMount",value:function(){this.$isMounted=!0}},{key:"componentDidUpdate",value:function(e){if(e.checked!==this.props.checked||e.width!==this.props.width||e.height!==this.props.height||e.handleDiameter!==this.props.handleDiameter){this.$initStyle();var t=this.props.checked?this.$checkedPos:this.$uncheckedPos;this.setState({$pos:t})}}},{key:"componentWillUnmount",value:function(){this.$isMounted=!1}},{key:"$initStyle",value:function(){var e=this.props,t=e.height,n=e.width,a=e.handleDiameter;this.$handleDiameter=a||t-2,this.$checkedPos=Math.max(n-t,n-(t+this.$handleDiameter)/2),this.$uncheckedPos=Math.max(0,(t-this.$handleDiameter)/2)}},{key:"$onDragStart",value:function(e){this.$inputRef.focus(),this.setState({$startX:e,$hasOutline:!0,$dragStartingTime:Date.now()})}},{key:"$onDrag",value:function(e){var t=this.state,n=t.$startX,a=t.$isDragging,o=t.$pos,i=this.props.checked,c=i?this.$checkedPos:this.$uncheckedPos,l=c+e-n;a||e===n||this.setState({$isDragging:!0});var s=Math.min(this.$checkedPos,Math.max(this.$uncheckedPos,l));s!==o&&this.setState({$pos:s})}},{key:"$onDragStop",value:function(e){var t=this.state,n=t.$pos,a=t.$isDragging,o=t.$dragStartingTime,i=this.props.checked,c=(this.$checkedPos+this.$uncheckedPos)/2,l=this.props.checked?this.$checkedPos:this.$uncheckedPos;this.setState({$pos:l});var s=Date.now()-o,h=!a||s<250,r=i&&n<=c||!i&&n>=c;(h||r)&&this.$onChange(e),this.$isMounted&&this.setState({$isDragging:!1,$hasOutline:!1}),this.$lastDragAt=Date.now()}},{key:"$onMouseDown",value:function(e){e.preventDefault(),"number"===typeof e.button&&0!==e.button||(this.$onDragStart(e.clientX),window.addEventListener("mousemove",this.$onMouseMove),window.addEventListener("mouseup",this.$onMouseUp))}},{key:"$onMouseMove",value:function(e){e.preventDefault(),this.$onDrag(e.clientX)}},{key:"$onMouseUp",value:function(e){this.$onDragStop(e),window.removeEventListener("mousemove",this.$onMouseMove),window.removeEventListener("mouseup",this.$onMouseUp)}},{key:"$onTouchStart",value:function(e){this.$checkedStateFromDragging=null,this.$onDragStart(e.touches[0].clientX)}},{key:"$onTouchMove",value:function(e){this.$onDrag(e.touches[0].clientX)}},{key:"$onTouchEnd",value:function(e){e.preventDefault(),this.$onDragStop(e)}},{key:"$onInputChange",value:function(e){Date.now()-this.$lastDragAt>50&&(this.$onChange(e),Date.now()-this.$lastKeyUpAt>50&&this.$isMounted&&this.setState({$hasOutline:!1}))}},{key:"$onKeyUp",value:function(){this.$lastKeyUpAt=Date.now()}},{key:"$setHasOutline",value:function(){this.setState({$hasOutline:!0})}},{key:"$unsetHasOutline",value:function(){this.setState({$hasOutline:!1})}},{key:"$getInputRef",value:function(e){this.$inputRef=e}},{key:"$onClick",value:function(e){e.preventDefault(),this.$inputRef.focus(),this.$onChange(e),this.$isMounted&&this.setState({$hasOutline:!1})}},{key:"$onChange",value:function(e){var t=this.props,n=t.checked,a=t.onChange,o=t.id;a(!n,e,o)}},{key:"render",value:function(){var e=this.props,t=e.checked,n=e.disabled,a=e.className,o=e.offColor,i=e.onColor,l=e.offHandleColor,s=e.onHandleColor,h=e.checkedIcon,r=e.uncheckedIcon,u=e.checkedHandleIcon,d=e.uncheckedHandleIcon,b=e.boxShadow,v=e.activeBoxShadow,m=e.height,$=e.width,g=e.borderRadius,k=(e.handleDiameter,Object(f["a"])(e,S)),y=this.state,C=y.$pos,w=y.$isDragging,M=y.$hasOutline,D={position:"relative",display:"inline-block",textAlign:"left",opacity:n?.5:1,direction:"ltr",borderRadius:m/2,WebkitTransition:"opacity 0.25s",MozTransition:"opacity 0.25s",transition:"opacity 0.25s",touchAction:"none",WebkitTapHighlightColor:"rgba(0, 0, 0, 0)",WebkitUserSelect:"none",MozUserSelect:"none",msUserSelect:"none",userSelect:"none"},O={height:m,width:$,margin:Math.max(0,(this.$handleDiameter-m)/2),position:"relative",background:E(C,this.$checkedPos,this.$uncheckedPos,o,i),borderRadius:"number"===typeof g?g:m/2,cursor:n?"default":"pointer",WebkitTransition:w?null:"background 0.25s",MozTransition:w?null:"background 0.25s",transition:w?null:"background 0.25s"},x={height:m,width:Math.min(1.5*m,$-(this.$handleDiameter+m)/2+1),position:"relative",opacity:(C-this.$uncheckedPos)/(this.$checkedPos-this.$uncheckedPos),pointerEvents:"none",WebkitTransition:w?null:"opacity 0.25s",MozTransition:w?null:"opacity 0.25s",transition:w?null:"opacity 0.25s"},I={height:m,width:Math.min(1.5*m,$-(this.$handleDiameter+m)/2+1),position:"absolute",opacity:1-(C-this.$uncheckedPos)/(this.$checkedPos-this.$uncheckedPos),right:0,top:0,pointerEvents:"none",WebkitTransition:w?null:"opacity 0.25s",MozTransition:w?null:"opacity 0.25s",transition:w?null:"opacity 0.25s"},j={height:this.$handleDiameter,width:this.$handleDiameter,background:E(C,this.$checkedPos,this.$uncheckedPos,l,s),display:"inline-block",cursor:n?"default":"pointer",borderRadius:"number"===typeof g?g-1:"50%",position:"absolute",transform:"translateX(".concat(C,"px)"),top:Math.max(0,(m-this.$handleDiameter)/2),outline:0,boxShadow:M?v:b,border:0,WebkitTransition:w?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s",MozTransition:w?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s",transition:w?null:"background-color 0.25s, transform 0.25s, box-shadow 0.15s"},T={height:this.$handleDiameter,width:this.$handleDiameter,opacity:Math.max(2*(1-(C-this.$uncheckedPos)/(this.$checkedPos-this.$uncheckedPos)-.5),0),position:"absolute",left:0,top:0,pointerEvents:"none",WebkitTransition:w?null:"opacity 0.25s",MozTransition:w?null:"opacity 0.25s",transition:w?null:"opacity 0.25s"},P={height:this.$handleDiameter,width:this.$handleDiameter,opacity:Math.max(2*((C-this.$uncheckedPos)/(this.$checkedPos-this.$uncheckedPos)-.5),0),position:"absolute",left:0,top:0,pointerEvents:"none",WebkitTransition:w?null:"opacity 0.25s",MozTransition:w?null:"opacity 0.25s",transition:w?null:"opacity 0.25s"},H={border:0,clip:"rect(0 0 0 0)",height:1,margin:-1,overflow:"hidden",padding:0,position:"absolute",width:1};return c.a.createElement("div",{className:a,style:D},c.a.createElement("div",{className:"react-switch-bg",style:O,onClick:n?null:this.$onClick,onMouseDown:function(e){return e.preventDefault()}},h&&c.a.createElement("div",{style:x},h),r&&c.a.createElement("div",{style:I},r)),c.a.createElement("div",{className:"react-switch-handle",style:j,onClick:function(e){return e.preventDefault()},onMouseDown:n?null:this.$onMouseDown,onTouchStart:n?null:this.$onTouchStart,onTouchMove:n?null:this.$onTouchMove,onTouchEnd:n?null:this.$onTouchEnd,onTouchCancel:n?null:this.$unsetHasOutline},d&&c.a.createElement("div",{style:T},d),u&&c.a.createElement("div",{style:P},u)),c.a.createElement("input",Object(p["a"])({type:"checkbox",role:"switch","aria-checked":t,checked:t,disabled:n,style:H},k,{ref:this.$getInputRef,onFocus:this.$setHasOutline,onBlur:this.$unsetHasOutline,onKeyUp:this.$onKeyUp,onChange:this.$onInputChange})))}}]),n}(i["Component"]);M.defaultProps={disabled:!1,offColor:"#888",onColor:"#080",offHandleColor:"#fff",onHandleColor:"#fff",uncheckedIcon:k,checkedIcon:y,boxShadow:null,activeBoxShadow:"0 0 2px 3px #3bf",height:28,width:56};var D=M,O=n("Qt0a"),x=n("2M+T"),I=n.n(x),j=d["b"].getRgbaString,T=d["b"].getHexString,P=function(e){var t=e.className,n=e.style,s=e.value,d=e.global,p=e.children,f=e.wrapper,b=s.config,v=b.options,m=b.style,$=m.width,g=m.height,k=m.border,y=v.defaultChecked,C=v.offColor,w=v.onColor,E=v.onHandleColor,S=v.offHandleColor,M=v.checkedIcon,x=v.uncheckedIcon,P=v.boxShadow,H=v.activeBoxShadow,K=Object(i["useRef"])(Object(l["uniqueId"])(O["a"])),R=Object(i["useState"])(!!y),A=Object(o["a"])(R,2),U=A[0],N=A[1],W=Object(r["f"])({component:s,global:d},{current:{}}),L=W.syncInteractiveAction,z=function(e){N(e),L("change",{value:e})},B=Object(i["useMemo"])((function(){return!!M.show&&c.a.createElement("i",{className:h()("bi","dis-flex","w-100","h-100",I.a["component-interactive-switch-icon"],Object(a["a"])({},M.value,"icon"===M.type)),style:{fontSize:.5*g,color:j(M.color)}},"text"===M.type&&M.value)}),[M,g]),F=Object(i["useMemo"])((function(){return!!x.show&&c.a.createElement("i",{className:h()("bi","dis-flex","w-100","h-100",I.a["component-interactive-switch-icon"],Object(a["a"])({},x.value,"icon"===x.type)),style:{fontSize:.5*g,color:j(x.color)}},"text"===x.type&&x.value)}),[x,g]),Q=Object(i["useMemo"])((function(){return h()("dis-flex",t,I.a["component-interactive-switch"])}),[t]);return Object(i["useEffect"])((function(){N(!!y)}),[y]),Object(i["useEffect"])((function(){z(!!y)}),[]),c.a.createElement(c.a.Fragment,null,c.a.createElement("div",{className:Q,style:Object(l["merge"])({width:"100%",height:"100%"},n),id:K.current},c.a.createElement(f,{border:k},p,c.a.createElement(D,{width:$,height:g,checked:U,onChange:z,offColor:T(C,!0),onColor:T(w,!0),onHandleColor:T(E,!0),offHandleColor:T(S,!0),checkedIcon:B,uncheckedIcon:F,boxShadow:Object(u["a"])(P)||void 0,activeBoxShadow:Object(u["a"])(H)||void 0,handleDiameter:.8*g}))))},H=P;H.id=O["a"];t["default"]=H}}]);