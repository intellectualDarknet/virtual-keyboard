(()=>{"use strict";var e={674:(e,t,s)=>{s.r(t)},395:(e,t,s)=>{s.r(t)},244:(e,t,s)=>{s.r(t)},817:(e,t,s)=>{s.r(t)},752:function(e,t,s){var i=this&&this.__awaiter||function(e,t,s,i){return new(s||(s=Promise))((function(o,n){function a(e){try{c(i.next(e))}catch(e){n(e)}}function r(e){try{c(i.throw(e))}catch(e){n(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,r)}c((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.App=void 0;const o=s(235),n=s(747);s(674);class a{static initialize(){return i(this,void 0,void 0,(function*(){o.mainModule.defineComponents(),yield o.mainModule.whenComponentsDefined(),a.keyboard=yield n.loadService.load("./assets/layouts.json")}))}static render(){a.body.innerHTML=`\n      <div class="app">\n          <div class="keyboard">\n              <keyboard-textarea></keyboard-textarea>\n              ${a.keyboard.map((e=>`\n                  <div class="row">\n                      ${e.map((e=>`\n                          <keyboard-btn btn-info='${JSON.stringify(e)}'></keyboard-btn>\n                      `)).join("")}\n                  </div>\n              `)).join("")}\n          </div>\n      </div>\n    `}static start(){a.render()}}t.App=a,a.body=document.querySelector("body")},105:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.BaseComponent=void 0;class s extends HTMLElement{constructor(){super(),this.subscriptions=[],this.watchers=[],this.isInitialized=!1,this.isDynamicallyInitiated=!1,this.init(),this.render()}update(e,t,s){}initHosts(){}initHandlers(){}render(){if(!this.template)throw new Error(`template should be provided for ${this.nodeName}`);this.innerHTML=this.template}connectedCallback(){this.initHosts(),this.initHandlers(),this.isInitialized=!0,this.subscriptions.forEach((e=>e.init())),this.watchers.forEach((e=>e.observe()))}disconnectedCallback(){this.subscriptions.forEach((e=>e.remove())),this.watchers.forEach((e=>e.unobserve()))}attributeChangedCallback(e,t,s){(this.isInitialized||this.isDynamicallyInitiated)&&this.update(e,t,s)}}t.BaseComponent=s},210:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Component=void 0,t.Component=class{constructor(e,t){this.name=e,this.element=t}define(){window.customElements.define(this.name,this.element)}whenDefined(){return window.customElements.whenDefined(this.name)}}},339:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Module=void 0,t.Module=class{constructor(e){this.components=e}defineComponents(){this.components.forEach((e=>e.define()))}whenComponentsDefined(){return Promise.all(this.components.map((e=>e.whenDefined())))}}},246:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Observer=void 0,t.Observer=class{constructor(){this.callbacks=[]}observe(e){this.callbacks.push(e)}unobserve(e){this.callbacks=this.callbacks.filter((t=>t!==e))}broadcast(...e){this.callbacks.forEach((t=>t(...e)))}}},109:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Subscription=void 0;class s{constructor(e,t,s,i=!1){this.host=e,this.type=t,this.eventFunction=s,this.capture=i}init(){this.host.addEventListener(this.type,this.eventFunction,this.capture)}remove(){this.host.removeEventListener(this.type,this.eventFunction)}static createAndInit(e,t,i,o=!1){const n=new s(e,t,i,o);return n.init(),n}}t.Subscription=s},910:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.Watcher=void 0;class s{constructor(e,t){this.observer=e,this.fn=t}observe(){this.observer.observe(this.fn)}unobserve(){this.observer.unobserve(this.fn)}static createAndObserve(e,t){const i=new s(e,t);return i.observer.observe(i.fn),i}}t.Watcher=s},519:function(e,t,s){var i=this&&this.__awaiter||function(e,t,s,i){return new(s||(s=Promise))((function(o,n){function a(e){try{c(i.next(e))}catch(e){n(e)}}function r(e){try{c(i.throw(e))}catch(e){n(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,r)}c((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0});const o=s(752);s(817),function(){i(this,void 0,void 0,(function*(){yield o.App.initialize(),o.App.start()}))}()},154:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.buttonComponent=void 0;const i=s(105),o=s(210),n=s(109),a=s(84),r=s(910);s(395);class c extends i.BaseComponent{constructor(){super(...arguments),this.isPressed=!1}init(){var e;this.btnInfo=JSON.parse(this.getAttribute("btn-info")),"Quote"===this.btnInfo.key&&(this.btnInfo.en={lowercase:"&#39",uppercase:"&#34",capsLowercase:"&#39",capsUppercase:"&#34"}),this.template=`\n\t\t\t<div class="key ${null!==(e=this.btnInfo.customClass)&&void 0!==e?e:""}">\n\t\t\t\t${this.btnInfo[a.keyboardService.language][a.keyboardService.currentCase]}\n\t\t\t</div>\n\t\t`}initHosts(){this.host=this.querySelector(".key")}toggleState(e){e!==this.isPressed&&(this.isPressed=e,this.host.classList.toggle("azure"))}onKeyDown(){switch(this.btnInfo.key){case"ShiftLeft":case"ShiftRight":a.keyboardService.shiftKeyDown();break;case"CapsLock":a.keyboardService.capsKeyDown();break;case"AltLeft":case"AltRight":a.keyboardService.altKeyDown();break;case"ControlLeft":case"ControlRight":case"MetaLeft":case"MetaRight":break;default:a.keyboardService.buttonPress.broadcast(this.host.innerHTML.trim())}}onKeyUp(){switch(this.btnInfo.key){case"ShiftLeft":case"ShiftRight":a.keyboardService.shiftKeyUp();break;case"AltLeft":case"AltRight":a.keyboardService.altKeyUp();break;case"CapsLock":a.keyboardService.capsKeyUp()}}initHandlers(){this.subscriptions.push(new n.Subscription(this.host,"mousedown",(()=>{this.toggleState(!0),this.onKeyDown()})),new n.Subscription(this.host,"mouseup",(()=>{this.toggleState(!1),this.onKeyUp()})),new n.Subscription(this.host,"mouseleave",(()=>{this.toggleState(!1)})),new n.Subscription(window,"keydown",(e=>{e.code===this.btnInfo.key&&(this.toggleState(!0),this.onKeyDown())})),new n.Subscription(window,"keyup",(e=>{e.code===this.btnInfo.key&&(this.toggleState(!1),this.onKeyUp())}))),this.watchers.push(new r.Watcher(a.keyboardService.keyboardcase,(()=>{this.host.innerHTML=this.btnInfo[a.keyboardService.language][a.keyboardService.currentCase]})))}}t.buttonComponent=new o.Component("keyboard-btn",c)},407:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.textareaComponent=void 0;const i=s(105),o=s(210),n=s(109),a=s(910),r=s(84);s(244);class c extends i.BaseComponent{init(){this.template='\n\t\t\t<textarea class="textarea" placeholder="Смена раскладки производится нажатием на alt + shift"></textarea>\n\t\t'}initHosts(){this.host=this.querySelector(".textarea"),this.host.focus()}initHandlers(){this.watchers.push(new a.Watcher(r.keyboardService.buttonPress,(e=>{if(["space","enter","backspace","del","tab","←","→","ctrl"].includes(e))switch(e){case"space":this.insertSymbol(" ");break;case"enter":this.insertSymbol("\n");break;case"tab":this.insertSymbol("\t");break;case"backspace":this.host.selectionEnd&&(this.host.value=this.host.value.slice(0,this.host.selectionEnd-1)+this.host.value.slice(this.host.selectionEnd));break;case"del":if(this.host.selectionEnd<this.host.value.length){const e=this.host.selectionEnd;this.host.value=this.host.value.slice(0,this.host.selectionEnd)+this.host.value.slice(this.host.selectionEnd+1),this.host.selectionEnd=e,this.host.selectionStart=e}break;case"←":this.host.selectionEnd&&(this.host.selectionStart=this.host.selectionStart-1,this.host.selectionEnd=this.host.selectionEnd-1);break;case"→":this.host.selectionStart<this.host.value.length&&(this.host.selectionStart=this.host.selectionStart+1)}else this.insertSymbol(e)}))),this.subscriptions.push(new n.Subscription(window,"keydown",(e=>{e.preventDefault()})),new n.Subscription(document,"mousedown",(e=>{e.preventDefault()})))}insertSymbol(e){const t=this.host.selectionEnd;this.host.value=this.host.value.slice(0,this.host.selectionEnd)+e+this.host.value.slice(this.host.selectionEnd),this.host.selectionEnd=t+1,this.host.selectionStart=t+1}}t.textareaComponent=new o.Component("keyboard-textarea",c)},115:(e,t)=>{var s;Object.defineProperty(t,"__esModule",{value:!0}),t.KeyboardTransform=void 0,(s=t.KeyboardTransform||(t.KeyboardTransform={})).Lowercase="lowercase",s.Uppercase="uppercase",s.CapsLowercase="capsLowercase",s.CapsUppercase="capsUppercase"},799:(e,t)=>{var s;Object.defineProperty(t,"__esModule",{value:!0}),t.Language=void 0,(s=t.Language||(t.Language={})).En="en",s.Ru="ru"},235:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.mainModule=void 0;const i=s(339),o=s(154),n=s(407);t.mainModule=new i.Module([o.buttonComponent,n.textareaComponent])},84:(e,t,s)=>{Object.defineProperty(t,"__esModule",{value:!0}),t.keyboardService=void 0;const i=s(246),o=s(115),n=s(799);t.keyboardService=new class{constructor(){var e;this.keyboardcase=new i.Observer,this.buttonPress=new i.Observer,this.isShiftPress=!1,this.isAltPress=!1,this.isCapsFlowBlocked=!1,this.isLanguageFlowBlocked=!1,this.currentCase=o.KeyboardTransform.Lowercase,this.language=null!==(e=localStorage.getItem("language"))&&void 0!==e?e:n.Language.En}capsKeyDown(){if(!this.isCapsFlowBlocked){switch(this.currentCase){case o.KeyboardTransform.Lowercase:this.currentCase=o.KeyboardTransform.CapsLowercase;break;case o.KeyboardTransform.Uppercase:this.currentCase=o.KeyboardTransform.CapsUppercase;break;case o.KeyboardTransform.CapsLowercase:this.currentCase=o.KeyboardTransform.Lowercase;break;case o.KeyboardTransform.CapsUppercase:this.currentCase=o.KeyboardTransform.Uppercase}this.isCapsFlowBlocked=!0,this.keyboardcase.broadcast()}}capsKeyUp(){this.isCapsFlowBlocked=!1}shiftKeyDown(){if(this.isShiftPress=!0,this.isAltPress&&this.isShiftPress)this.changeLanguage();else switch(this.currentCase){case o.KeyboardTransform.CapsLowercase:this.currentCase=o.KeyboardTransform.CapsUppercase,this.keyboardcase.broadcast();break;case o.KeyboardTransform.Lowercase:this.currentCase=o.KeyboardTransform.Uppercase,this.keyboardcase.broadcast()}}shiftKeyUp(){switch(this.currentCase){case o.KeyboardTransform.CapsUppercase:this.currentCase=o.KeyboardTransform.CapsLowercase,this.keyboardcase.broadcast();break;case o.KeyboardTransform.Uppercase:this.currentCase=o.KeyboardTransform.Lowercase,this.keyboardcase.broadcast()}this.isShiftPress=!1,this.isLanguageFlowBlocked=!1}altKeyDown(){this.isAltPress=!0,this.isShiftPress&&this.changeLanguage()}altKeyUp(){this.isLanguageFlowBlocked=!1,this.isAltPress=!1}changeLanguage(){if(!this.isLanguageFlowBlocked){switch(this.isLanguageFlowBlocked=!0,this.language){case n.Language.En:this.language=n.Language.Ru;break;case n.Language.Ru:this.language=n.Language.En}localStorage.setItem("language",this.language)}this.keyboardcase.broadcast()}}},747:function(e,t){var s=this&&this.__awaiter||function(e,t,s,i){return new(s||(s=Promise))((function(o,n){function a(e){try{c(i.next(e))}catch(e){n(e)}}function r(e){try{c(i.throw(e))}catch(e){n(e)}}function c(e){var t;e.done?o(e.value):(t=e.value,t instanceof s?t:new s((function(e){e(t)}))).then(a,r)}c((i=i.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.loadService=void 0,t.loadService=new class{load(e){return s(this,void 0,void 0,(function*(){const t=yield fetch(e);return yield t.json()}))}}}},t={};function s(i){var o=t[i];if(void 0!==o)return o.exports;var n=t[i]={exports:{}};return e[i].call(n.exports,n,n.exports,s),n.exports}s.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s(519)})();