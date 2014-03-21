goog.provide('lessons.interop');
goog.require('cljs.core');
lessons.interop.hi = (function hi(name){
return alert([cljs.core.str("Hi "),cljs.core.str(name),cljs.core.str("!")].join(''));
});
lessons.interop.empty_array = (new Array());
lessons.interop.get_length = (function get_length(array){
return array.length;
});
lessons.interop.push_thing = (function push_thing(array,thing){
return array.push(thing);
});
lessons.interop.also_push_thing = (function also_push_thing(array,thing){
return array.push(thing);
});
