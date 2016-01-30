(function e(t,n,r){function i(o,u){if(!n[o]){if(!t[o]){var f=typeof require=="function"&&require;if(!u&&f)return f(o,!0);if(s)return s(o,!0);var l=new Error("Cannot find module '"+o+"'");throw l.code="MODULE_NOT_FOUND",l}var a=n[o]={exports:{}};t[o][0].call(a.exports,function(e){var n=t[o][1][e];return i(n?n:e)},a,a.exports,e,t,n,r)}return n[o].exports}var s=typeof require=="function"&&require;for(var o=0;o<r.length;o++)i(r[o]);return i})({1:[function(e,t,n){var r=e("tab-emitter")();var i=document.querySelector("input");function s(e){if(i.value!==e)i.value=e;if(e)document.body.style.backgroundColor=e}s("white");r.on("color",s);i.addEventListener("keydown",function(){setTimeout(function(){r.emit("color",i.value)},0)})},{"tab-emitter":3}],2:[function(e,t,n){function r(){this._events=this._events||{};this._maxListeners=this._maxListeners||undefined}t.exports=r;r.EventEmitter=r;r.prototype._events=undefined;r.prototype._maxListeners=undefined;r.defaultMaxListeners=10;r.prototype.setMaxListeners=function(e){if(!s(e)||e<0||isNaN(e))throw TypeError("n must be a positive number");this._maxListeners=e;return this};r.prototype.emit=function(e){var t,n,r,s,f,l;if(!this._events)this._events={};if(e==="error"){if(!this._events.error||o(this._events.error)&&!this._events.error.length){t=arguments[1];if(t instanceof Error){throw t}throw TypeError('Uncaught, unspecified "error" event.')}}n=this._events[e];if(u(n))return false;if(i(n)){switch(arguments.length){case 1:n.call(this);break;case 2:n.call(this,arguments[1]);break;case 3:n.call(this,arguments[1],arguments[2]);break;default:s=Array.prototype.slice.call(arguments,1);n.apply(this,s)}}else if(o(n)){s=Array.prototype.slice.call(arguments,1);l=n.slice();r=l.length;for(f=0;f<r;f++)l[f].apply(this,s)}return true};r.prototype.addListener=function(e,t){var n;if(!i(t))throw TypeError("listener must be a function");if(!this._events)this._events={};if(this._events.newListener)this.emit("newListener",e,i(t.listener)?t.listener:t);if(!this._events[e])this._events[e]=t;else if(o(this._events[e]))this._events[e].push(t);else this._events[e]=[this._events[e],t];if(o(this._events[e])&&!this._events[e].warned){if(!u(this._maxListeners)){n=this._maxListeners}else{n=r.defaultMaxListeners}if(n&&n>0&&this._events[e].length>n){this._events[e].warned=true;console.error("(node) warning: possible EventEmitter memory "+"leak detected. %d listeners added. "+"Use emitter.setMaxListeners() to increase limit.",this._events[e].length);if(typeof console.trace==="function"){console.trace()}}}return this};r.prototype.on=r.prototype.addListener;r.prototype.once=function(e,t){if(!i(t))throw TypeError("listener must be a function");var n=false;function r(){this.removeListener(e,r);if(!n){n=true;t.apply(this,arguments)}}r.listener=t;this.on(e,r);return this};r.prototype.removeListener=function(e,t){var n,r,s,u;if(!i(t))throw TypeError("listener must be a function");if(!this._events||!this._events[e])return this;n=this._events[e];s=n.length;r=-1;if(n===t||i(n.listener)&&n.listener===t){delete this._events[e];if(this._events.removeListener)this.emit("removeListener",e,t)}else if(o(n)){for(u=s;u-->0;){if(n[u]===t||n[u].listener&&n[u].listener===t){r=u;break}}if(r<0)return this;if(n.length===1){n.length=0;delete this._events[e]}else{n.splice(r,1)}if(this._events.removeListener)this.emit("removeListener",e,t)}return this};r.prototype.removeAllListeners=function(e){var t,n;if(!this._events)return this;if(!this._events.removeListener){if(arguments.length===0)this._events={};else if(this._events[e])delete this._events[e];return this}if(arguments.length===0){for(t in this._events){if(t==="removeListener")continue;this.removeAllListeners(t)}this.removeAllListeners("removeListener");this._events={};return this}n=this._events[e];if(i(n)){this.removeListener(e,n)}else if(n){while(n.length)this.removeListener(e,n[n.length-1])}delete this._events[e];return this};r.prototype.listeners=function(e){var t;if(!this._events||!this._events[e])t=[];else if(i(this._events[e]))t=[this._events[e]];else t=this._events[e].slice();return t};r.prototype.listenerCount=function(e){if(this._events){var t=this._events[e];if(i(t))return 1;else if(t)return t.length}return 0};r.listenerCount=function(e,t){return e.listenerCount(t)};function i(e){return typeof e==="function"}function s(e){return typeof e==="number"}function o(e){return typeof e==="object"&&e!==null}function u(e){return e===void 0}},{}],3:[function(e,t,n){var r=e("events").EventEmitter;t.exports=function i(e){e="tabemitter"+(e||"");var t=new r;var n=t.emit;t.emit=function i(){var r=[].slice.call(arguments);localStorage.setItem(e,JSON.stringify(r));localStorage.removeItem(e);return n.apply(t,r)};window.addEventListener("storage",function(r){if(r.key===e&&r.newValue){var i=JSON.parse(r.newValue);n.apply(t,i)}});return t}},{events:2}]},{},[1]);