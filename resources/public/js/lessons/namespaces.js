goog.provide('lessons.namespaces');
goog.require('cljs.core');
goog.require('clojure.string');
lessons.namespaces.hello = (function hello(the_name){
return alert(clojure.string.join.call(null," ",cljs.core.PersistentVector.fromArray(["Hello",clojure.string.upper_case.call(null,the_name),":-)"], true)));
});
