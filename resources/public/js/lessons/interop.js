goog.provide('lessons.interop');
goog.require('cljs.core');
lessons.interop.hi = (function hi(name){
return alert([cljs.core.str("Hi "),cljs.core.str(name),cljs.core.str("!")].join(''));
});
