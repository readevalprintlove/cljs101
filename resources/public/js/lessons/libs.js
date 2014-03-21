goog.provide('lessons.libs');
goog.require('cljs.core');
goog.require('goog.string');
lessons.libs.digitesque_QMARK_ = (function digitesque_QMARK_(thing){
return goog.string.isNumeric(thing);
});
lessons.libs.jq = jQuery;
lessons.libs.get_text = (function get_text(thing){
return thing.text();
});
