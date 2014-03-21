goog.provide('himera.client.repl');
goog.require('cljs.core');
goog.require('lessons.interop');
goog.require('lessons.interop');
goog.require('clojure.zip');
goog.require('clojure.walk');
goog.require('clojure.set');
goog.require('clojure.string');
goog.require('cljs.reader');
himera.client.repl.map__GT_js = (function map__GT_js(m){
var out = {};
var seq__3530_3536 = cljs.core.seq.call(null,m);
var chunk__3531_3537 = null;
var count__3532_3538 = 0;
var i__3533_3539 = 0;
while(true){
if((i__3533_3539 < count__3532_3538))
{var vec__3534_3540 = cljs.core._nth.call(null,chunk__3531_3537,i__3533_3539);
var k_3541 = cljs.core.nth.call(null,vec__3534_3540,0,null);
var v_3542 = cljs.core.nth.call(null,vec__3534_3540,1,null);
(out[cljs.core.name.call(null,k_3541)] = v_3542);
{
var G__3543 = seq__3530_3536;
var G__3544 = chunk__3531_3537;
var G__3545 = count__3532_3538;
var G__3546 = (i__3533_3539 + 1);
seq__3530_3536 = G__3543;
chunk__3531_3537 = G__3544;
count__3532_3538 = G__3545;
i__3533_3539 = G__3546;
continue;
}
} else
{var temp__4092__auto___3547 = cljs.core.seq.call(null,seq__3530_3536);
if(temp__4092__auto___3547)
{var seq__3530_3548__$1 = temp__4092__auto___3547;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3530_3548__$1))
{var c__3049__auto___3549 = cljs.core.chunk_first.call(null,seq__3530_3548__$1);
{
var G__3550 = cljs.core.chunk_rest.call(null,seq__3530_3548__$1);
var G__3551 = c__3049__auto___3549;
var G__3552 = cljs.core.count.call(null,c__3049__auto___3549);
var G__3553 = 0;
seq__3530_3536 = G__3550;
chunk__3531_3537 = G__3551;
count__3532_3538 = G__3552;
i__3533_3539 = G__3553;
continue;
}
} else
{var vec__3535_3554 = cljs.core.first.call(null,seq__3530_3548__$1);
var k_3555 = cljs.core.nth.call(null,vec__3535_3554,0,null);
var v_3556 = cljs.core.nth.call(null,vec__3535_3554,1,null);
(out[cljs.core.name.call(null,k_3555)] = v_3556);
{
var G__3557 = cljs.core.next.call(null,seq__3530_3548__$1);
var G__3558 = null;
var G__3559 = 0;
var G__3560 = 0;
seq__3530_3536 = G__3557;
chunk__3531_3537 = G__3558;
count__3532_3538 = G__3559;
i__3533_3539 = G__3560;
continue;
}
}
} else
{}
}
break;
}
return out;
});
himera.client.repl.go_compile = (function go_compile(code){
var data = cljs.core.atom.call(null,null);
var params = himera.client.repl.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:url","/compile","\uFDD0:data",[cljs.core.str("{:expr "),cljs.core.str(code),cljs.core.str("}")].join(''),"\uFDD0:contentType","application/clojure; charset=utf-8","\uFDD0:async",false,"\uFDD0:type","POST","\uFDD0:dataType","text","\uFDD0:success",((function (data){
return (function (p1__3561_SHARP_){
return cljs.core.reset_BANG_.call(null,data,cljs.reader.read_string.call(null,p1__3561_SHARP_));
});})(data))
], true));
jQuery.ajax(params);
return cljs.core.deref.call(null,data);
});
himera.client.repl.on_validate = (function on_validate(input){
return !(cljs.core.empty_QMARK_.call(null,input));
});
himera.client.repl.build_msg = (function build_msg(title,msg,klass){
return [himera.client.repl.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:msg",[cljs.core.str(title),cljs.core.str(msg)].join(''),"\uFDD0:className",klass], true))];
});
himera.client.repl.starts_with_QMARK_ = (function starts_with_QMARK_(o,s){
return cljs.core._EQ_.call(null,clojure.string.trim.call(null,s).slice(0,o.length),o);
});
himera.client.repl.is_comment_QMARK_ = (function is_comment_QMARK_(p1__3562_SHARP_){
return himera.client.repl.starts_with_QMARK_.call(null,";",p1__3562_SHARP_);
});
himera.client.repl.on_handle = (function on_handle(line,report){
if(cljs.core.truth_(himera.client.repl.is_comment_QMARK_.call(null,line)))
{return himera.client.repl.build_msg.call(null,"","","jquery-console-message-value");
} else
{var input = jQuery.trim(line);
var compiled = himera.client.repl.go_compile.call(null,input);
var temp__4090__auto__ = (function (){var and__3941__auto__ = compiled;
if(cljs.core.truth_(and__3941__auto__))
{return (new cljs.core.Keyword("\uFDD0:error")).call(null,compiled);
} else
{return and__3941__auto__;
}
})();
if(cljs.core.truth_(temp__4090__auto__))
{var err = temp__4090__auto__;
return himera.client.repl.build_msg.call(null,"Compilation error: ",err,"jquery-console-message-error");
} else
{try{return himera.client.repl.build_msg.call(null,"",cljs.core.pr_str.call(null,eval((new cljs.core.Keyword("\uFDD0:js")).call(null,compiled))),"jquery-console-message-value");
}catch (e3564){if((e3564 instanceof Error))
{var e = e3564;
return himera.client.repl.build_msg.call(null,"Compilation error: ",e,"jquery-console-message-error");
} else
{if("\uFDD0:else")
{throw e3564;
} else
{return null;
}
}
}}
}
});
himera.client.repl.go = (function go(){
return jQuery(document).ready((function (){
return controller = (function (){var G__3566 = jQuery("#console");
G__3566.console(himera.client.repl.map__GT_js.call(null,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:welcomeMessage","Himera REPL v0.2.6","\uFDD0:promptLabel","cljs.user> ","\uFDD0:commandValidate",himera.client.repl.on_validate,"\uFDD0:commandHandle",himera.client.repl.on_handle,"\uFDD0:autofocus",true,"\uFDD0:animateScroll",true,"\uFDD0:promptHistory",true], true)));
return G__3566;
})();
}));
});
goog.exportSymbol('himera.client.repl.go', himera.client.repl.go);
