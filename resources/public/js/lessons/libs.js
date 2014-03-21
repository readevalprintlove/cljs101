goog.provide('lessons.libs');
goog.require('cljs.core');
lessons.libs.jq = jQuery;
lessons.libs.get_text = (function get_text(thing){
return thing.text();
});
