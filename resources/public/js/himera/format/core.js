goog.provide('himera.format.core');
goog.require('cljs.core');
goog.require('goog.events');
goog.require('goog.dom.classes');
goog.require('goog.color');
goog.require('goog.style');
goog.require('goog.dom');
goog.require('clojure.string');
goog.require('domina.xpath');
goog.require('domina');
himera.format.core.span = (function span(class$,body){
return [cljs.core.str("<span class='"),cljs.core.str(class$),cljs.core.str("'>"),cljs.core.str(body),cljs.core.str("</span>")].join('');
});
himera.format.core.literal = (function literal(class$,x){
return himera.format.core.span.call(null,class$,cljs.core.pr_str.call(null,x));
});
himera.format.core.join = (function join(separator,coll){
return clojure.string.join.call(null,himera.format.core.span.call(null,"separator",separator),cljs.core.map.call(null,himera.format.core.html,coll));
});
himera.format.core.html_collection = (function html_collection(class$,opener,closer,coll){
return himera.format.core.span.call(null,[cljs.core.str("collection "),cljs.core.str(class$)].join(''),[cljs.core.str(himera.format.core.span.call(null,"opener",opener)),cljs.core.str(himera.format.core.span.call(null,"contents",himera.format.core.join.call(null," ",coll))),cljs.core.str(himera.format.core.span.call(null,"closer",closer))].join(''));
});
himera.format.core.html_keyval = (function html_keyval(p__3728){
var vec__3730 = p__3728;
var k = cljs.core.nth.call(null,vec__3730,0,null);
var v = cljs.core.nth.call(null,vec__3730,1,null);
return himera.format.core.span.call(null,"keyval",[cljs.core.str(himera.format.core.html.call(null,k)),cljs.core.str(himera.format.core.span.call(null,"separator"," ")),cljs.core.str(himera.format.core.html.call(null,v))].join(''));
});
himera.format.core.html_keyvals = (function html_keyvals(coll){
return clojure.string.join.call(null,himera.format.core.span.call(null,"separator",", "),cljs.core.map.call(null,himera.format.core.html_keyval,coll));
});
himera.format.core.html_map = (function html_map(coll){
return himera.format.core.span.call(null,"collection map",[cljs.core.str(himera.format.core.span.call(null,"opener","{")),cljs.core.str(himera.format.core.span.call(null,"contents",himera.format.core.html_keyvals.call(null,coll))),cljs.core.str(himera.format.core.span.call(null,"closer","}"))].join(''));
});
himera.format.core.html_string = (function html_string(s){
return himera.format.core.span.call(null,"string",[cljs.core.str(himera.format.core.span.call(null,"opener","\"")),cljs.core.str(himera.format.core.span.call(null,"contents",s)),cljs.core.str(himera.format.core.span.call(null,"closer","\""))].join(''));
});
himera.format.core.html = (function html(x){
if(typeof x === 'number')
{return himera.format.core.literal.call(null,"number",x);
} else
{if(cljs.core.keyword_QMARK_.call(null,x))
{return himera.format.core.literal.call(null,"keyword",x);
} else
{if((x instanceof cljs.core.Symbol))
{return himera.format.core.literal.call(null,"symbol",x);
} else
{if(cljs.core.string_QMARK_.call(null,x))
{return himera.format.core.html_string.call(null,x);
} else
{if(cljs.core.map_QMARK_.call(null,x))
{return himera.format.core.html_map.call(null,x);
} else
{if(cljs.core.set_QMARK_.call(null,x))
{return himera.format.core.html_collection.call(null,"set","#{","}",x);
} else
{if(cljs.core.vector_QMARK_.call(null,x))
{return himera.format.core.html_collection.call(null,"vector","[","]",x);
} else
{if(cljs.core.seq_QMARK_.call(null,x))
{return himera.format.core.html_collection.call(null,"seq","(",")",x);
} else
{if("\uFDD0:else")
{return himera.format.core.literal.call(null,"literal",x);
} else
{return null;
}
}
}
}
}
}
}
}
}
});
himera.format.core.overflow_QMARK_ = (function overflow_QMARK_(child,parent){
var parent_box = goog.style.getBounds(parent).toBox();
var child_box = goog.style.getBounds(child).toBox();
return (parent_box.right < child_box.right);
});
himera.format.core.max_inline_width = (function max_inline_width(elem,container){
var child = domina.single_node.call(null,elem);
var parent = domina.single_node.call(null,elem).parentNode;
var container_node = domina.single_node.call(null,container);
var left_bound = goog.style.getBounds(child).toBox().left;
var parent_right_bound = goog.style.getBounds(parent).toBox().right;
var container_right_bound = goog.style.getBounds(container_node).toBox().right;
return ((function (){var x__2652__auto__ = parent_right_bound;
var y__2653__auto__ = container_right_bound;
return ((x__2652__auto__ < y__2653__auto__) ? x__2652__auto__ : y__2653__auto__);
})() - left_bound);
});
himera.format.core.width = (function width(elem){
return goog.style.getBounds(domina.single_node.call(null,elem)).width;
});
himera.format.core.initial_arrange_state = cljs.core.cycle.call(null,cljs.core.PersistentVector.fromArray(["#e6f3f7","#f2ffff","#e5f2ff","#ebf7f4","#e5fff1"], true));
himera.format.core.color = cljs.core.first;
himera.format.core.next_state = cljs.core.rest;
himera.format.core.arrange_keyval_BANG_ = (function arrange_keyval_BANG_(state,elem,container){
var vec__3732 = domina.children.call(null,elem);
var key = cljs.core.nth.call(null,vec__3732,0,null);
var separator = cljs.core.nth.call(null,vec__3732,1,null);
var val = cljs.core.nth.call(null,vec__3732,2,null);
himera.format.core.arrange_element_BANG_.call(null,state,key,container);
himera.format.core.arrange_element_BANG_.call(null,state,val,container);
if(cljs.core.truth_(himera.format.core.overflow_QMARK_.call(null,elem,container)))
{domina.set_styles_BANG_.call(null,separator,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:display","none"], true));
domina.set_styles_BANG_.call(null,key,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:display","block"], true));
return domina.set_styles_BANG_.call(null,val,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:display","block","\uFDD0:margin-left","1em"], true));
} else
{return null;
}
});
himera.format.core.collection_styles = cljs.core.PersistentHashMap.fromArrays(["\uFDD0:border-top-left-radius","\uFDD0:margin-bottom","\uFDD0:padding-left","\uFDD0:display","\uFDD0:border-top-right-radius","\uFDD0:border-bottom-left-radius","\uFDD0:padding-right","\uFDD0:color","\uFDD0:padding-bottom","\uFDD0:border-bottom-right-radius","\uFDD0:padding-top"],["5px","1ex","2px","inline-block","10px","10px","2px","black","2px","5px","1px"]);
himera.format.core.arrange_collection_BANG_ = (function arrange_collection_BANG_(state,elem,container){
domina.add_class_BANG_.call(null,elem,"arranged");
domina.set_styles_BANG_.call(null,elem,cljs.core.merge.call(null,himera.format.core.collection_styles,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:background-color",himera.format.core.color.call(null,state)], true)));
var vec__3738 = domina.children.call(null,elem);
var opener = cljs.core.nth.call(null,vec__3738,0,null);
var contents = cljs.core.nth.call(null,vec__3738,1,null);
var closer = cljs.core.nth.call(null,vec__3738,2,null);
domina.set_styles_BANG_.call(null,opener,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:display","inline","\uFDD0:vertical-align","top"], true));
domina.set_styles_BANG_.call(null,closer,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:display","inline","\uFDD0:vertical-align","bottom"], true));
domina.set_styles_BANG_.call(null,contents,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:display","inline-block","\uFDD0:vertical-align","top"], true));
var seq__3739_3743 = cljs.core.seq.call(null,domina.children.call(null,contents));
var chunk__3740_3744 = null;
var count__3741_3745 = 0;
var i__3742_3746 = 0;
while(true){
if((i__3742_3746 < count__3741_3745))
{var child_3747 = cljs.core._nth.call(null,chunk__3740_3744,i__3742_3746);
if(cljs.core.truth_(domina.has_class_QMARK_.call(null,child_3747,"separator")))
{domina.set_styles_BANG_.call(null,child_3747,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:display","none"], true));
} else
{himera.format.core.arrange_element_BANG_.call(null,himera.format.core.next_state.call(null,state),child_3747,container);
domina.set_styles_BANG_.call(null,child_3747,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:display","block"], true));
}
{
var G__3748 = seq__3739_3743;
var G__3749 = chunk__3740_3744;
var G__3750 = count__3741_3745;
var G__3751 = (i__3742_3746 + 1);
seq__3739_3743 = G__3748;
chunk__3740_3744 = G__3749;
count__3741_3745 = G__3750;
i__3742_3746 = G__3751;
continue;
}
} else
{var temp__4092__auto___3752 = cljs.core.seq.call(null,seq__3739_3743);
if(temp__4092__auto___3752)
{var seq__3739_3753__$1 = temp__4092__auto___3752;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3739_3753__$1))
{var c__3049__auto___3754 = cljs.core.chunk_first.call(null,seq__3739_3753__$1);
{
var G__3755 = cljs.core.chunk_rest.call(null,seq__3739_3753__$1);
var G__3756 = c__3049__auto___3754;
var G__3757 = cljs.core.count.call(null,c__3049__auto___3754);
var G__3758 = 0;
seq__3739_3743 = G__3755;
chunk__3740_3744 = G__3756;
count__3741_3745 = G__3757;
i__3742_3746 = G__3758;
continue;
}
} else
{var child_3759 = cljs.core.first.call(null,seq__3739_3753__$1);
if(cljs.core.truth_(domina.has_class_QMARK_.call(null,child_3759,"separator")))
{domina.set_styles_BANG_.call(null,child_3759,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:display","none"], true));
} else
{himera.format.core.arrange_element_BANG_.call(null,himera.format.core.next_state.call(null,state),child_3759,container);
domina.set_styles_BANG_.call(null,child_3759,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:display","block"], true));
}
{
var G__3760 = cljs.core.next.call(null,seq__3739_3753__$1);
var G__3761 = null;
var G__3762 = 0;
var G__3763 = 0;
seq__3739_3743 = G__3760;
chunk__3740_3744 = G__3761;
count__3741_3745 = G__3762;
i__3742_3746 = G__3763;
continue;
}
}
} else
{}
}
break;
}
return domina.set_styles_BANG_.call(null,elem,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:width",[cljs.core.str(((himera.format.core.width.call(null,contents) + himera.format.core.width.call(null,opener)) + himera.format.core.width.call(null,closer))),cljs.core.str("px")].join('')], true));
});
himera.format.core.remove_all_styles_BANG_ = (function remove_all_styles_BANG_(elem){
domina.set_attr_BANG_.call(null,elem,"\uFDD0:style","");
domina.remove_class_BANG_.call(null,elem,"arranged");
var seq__3768 = cljs.core.seq.call(null,domina.children.call(null,elem));
var chunk__3769 = null;
var count__3770 = 0;
var i__3771 = 0;
while(true){
if((i__3771 < count__3770))
{var child = cljs.core._nth.call(null,chunk__3769,i__3771);
remove_all_styles_BANG_.call(null,child);
{
var G__3772 = seq__3768;
var G__3773 = chunk__3769;
var G__3774 = count__3770;
var G__3775 = (i__3771 + 1);
seq__3768 = G__3772;
chunk__3769 = G__3773;
count__3770 = G__3774;
i__3771 = G__3775;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__3768);
if(temp__4092__auto__)
{var seq__3768__$1 = temp__4092__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__3768__$1))
{var c__3049__auto__ = cljs.core.chunk_first.call(null,seq__3768__$1);
{
var G__3776 = cljs.core.chunk_rest.call(null,seq__3768__$1);
var G__3777 = c__3049__auto__;
var G__3778 = cljs.core.count.call(null,c__3049__auto__);
var G__3779 = 0;
seq__3768 = G__3776;
chunk__3769 = G__3777;
count__3770 = G__3778;
i__3771 = G__3779;
continue;
}
} else
{var child = cljs.core.first.call(null,seq__3768__$1);
remove_all_styles_BANG_.call(null,child);
{
var G__3780 = cljs.core.next.call(null,seq__3768__$1);
var G__3781 = null;
var G__3782 = 0;
var G__3783 = 0;
seq__3768 = G__3780;
chunk__3769 = G__3781;
count__3770 = G__3782;
i__3771 = G__3783;
continue;
}
}
} else
{return null;
}
}
break;
}
});
himera.format.core.condense_collection_BANG_ = (function condense_collection_BANG_(elem,container){
var vec__3785 = domina.children.call(null,elem);
var opener = cljs.core.nth.call(null,vec__3785,0,null);
var contents = cljs.core.nth.call(null,vec__3785,1,null);
var closer = cljs.core.nth.call(null,vec__3785,2,null);
var w = (himera.format.core.max_inline_width.call(null,elem,container) - (2 * (himera.format.core.width.call(null,opener) + himera.format.core.width.call(null,closer))));
domina.set_styles_BANG_.call(null,opener,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:font-weight","bold"], true));
domina.set_styles_BANG_.call(null,closer,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:font-weight","bold"], true));
return domina.set_styles_BANG_.call(null,contents,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:color","gray","\uFDD0:display","inline-block","\uFDD0:max-width",[cljs.core.str(w),cljs.core.str("px")].join(''),"\uFDD0:overflow","hidden","\uFDD0:text-overflow","ellipsis"], true));
});
himera.format.core.arrange_element_BANG_ = (function arrange_element_BANG_(state,elem,container){
himera.format.core.remove_all_styles_BANG_.call(null,elem);
domina.set_styles_BANG_.call(null,elem,cljs.core.PersistentArrayMap.fromArray(["\uFDD0:white-space","pre"], true));
if(cljs.core.truth_(himera.format.core.overflow_QMARK_.call(null,elem,container)))
{if(cljs.core.truth_(domina.has_class_QMARK_.call(null,elem,"collection")))
{if(cljs.core.truth_(domina.has_class_QMARK_.call(null,elem,"condensed")))
{return himera.format.core.condense_collection_BANG_.call(null,elem,container);
} else
{return himera.format.core.arrange_collection_BANG_.call(null,state,elem,container);
}
} else
{if(cljs.core.truth_(domina.has_class_QMARK_.call(null,elem,"keyval")))
{return himera.format.core.arrange_keyval_BANG_.call(null,state,elem,container);
} else
{return null;
}
}
} else
{return null;
}
});
himera.format.core.arrange_BANG_ = (function arrange_BANG_(elem,container){
return himera.format.core.arrange_element_BANG_.call(null,himera.format.core.initial_arrange_state,elem,container);
});
himera.format.core.find_arranged_parent = (function find_arranged_parent(elem,container){
while(true){
if(cljs.core._EQ_.call(null,container,elem))
{return elem;
} else
{if(cljs.core.truth_((function (){var and__3941__auto__ = goog.dom.isElement(elem);
if(cljs.core.truth_(and__3941__auto__))
{var and__3941__auto____$1 = domina.has_class_QMARK_.call(null,elem,"collection");
if(cljs.core.truth_(and__3941__auto____$1))
{return domina.has_class_QMARK_.call(null,elem,"arranged");
} else
{return and__3941__auto____$1;
}
} else
{return and__3941__auto__;
}
})()))
{return elem;
} else
{if("\uFDD0:else")
{{
var G__3786 = elem.parentNode;
var G__3787 = container;
elem = G__3786;
container = G__3787;
continue;
}
} else
{return null;
}
}
}
break;
}
});
himera.format.core.toggle_BANG_ = (function toggle_BANG_(target_elem,arranged_elem,container){
if(cljs.core.truth_(domina.has_class_QMARK_.call(null,target_elem,"condensed")))
{domina.remove_class_BANG_.call(null,target_elem,"condensed");
} else
{domina.add_class_BANG_.call(null,target_elem,"condensed");
}
return himera.format.core.arrange_BANG_.call(null,arranged_elem,container);
});
himera.format.core.set_toggle_on_click_BANG_ = (function set_toggle_on_click_BANG_(elem,container){
return goog.events.listen(domina.single_node.call(null,elem),"click",(function (event){
var t = event.target;
while(true){
if(cljs.core.truth_(t))
{if(cljs.core.truth_((function (){var and__3941__auto__ = goog.dom.isElement(t);
if(cljs.core.truth_(and__3941__auto__))
{var and__3941__auto____$1 = domina.has_class_QMARK_.call(null,t,"collection");
if(cljs.core.truth_(and__3941__auto____$1))
{var or__3943__auto__ = domina.has_class_QMARK_.call(null,t,"condensed");
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return domina.has_class_QMARK_.call(null,t,"arranged");
}
} else
{return and__3941__auto____$1;
}
} else
{return and__3941__auto__;
}
})()))
{event.stopPropagation();
event.preventDefault();
return himera.format.core.toggle_BANG_.call(null,t,elem,container);
} else
{{
var G__3788 = t.parentNode;
t = G__3788;
continue;
}
}
} else
{return null;
}
break;
}
}));
});
