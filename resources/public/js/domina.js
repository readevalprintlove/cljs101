goog.provide('domina');
goog.require('cljs.core');
goog.require('domina.support');
goog.require('goog.dom.classes');
goog.require('goog.events');
goog.require('goog.dom.xml');
goog.require('goog.dom.forms');
goog.require('goog.dom');
goog.require('goog.string');
goog.require('clojure.string');
goog.require('goog.style');
goog.require('cljs.core');
domina.re_html = /<|&#?\w+;/;
domina.re_leading_whitespace = /^\s+/;
domina.re_xhtml_tag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/i;
domina.re_tag_name = /<([\w:]+)/;
domina.re_no_inner_html = /<(?:script|style)/i;
domina.re_tbody = /<tbody/i;
var opt_wrapper_4772 = cljs.core.PersistentVector.fromArray([1,"<select multiple='multiple'>","</select>"], true);
var table_section_wrapper_4773 = cljs.core.PersistentVector.fromArray([1,"<table>","</table>"], true);
var cell_wrapper_4774 = cljs.core.PersistentVector.fromArray([3,"<table><tbody><tr>","</tr></tbody></table>"], true);
domina.wrap_map = cljs.core.PersistentHashMap.fromArrays(["col","\uFDD0:default","tfoot","caption","optgroup","legend","area","td","thead","th","option","tbody","tr","colgroup"],[cljs.core.PersistentVector.fromArray([2,"<table><tbody></tbody><colgroup>","</colgroup></table>"], true),cljs.core.PersistentVector.fromArray([0,"",""], true),table_section_wrapper_4773,table_section_wrapper_4773,opt_wrapper_4772,cljs.core.PersistentVector.fromArray([1,"<fieldset>","</fieldset>"], true),cljs.core.PersistentVector.fromArray([1,"<map>","</map>"], true),cell_wrapper_4774,table_section_wrapper_4773,cell_wrapper_4774,opt_wrapper_4772,table_section_wrapper_4773,cljs.core.PersistentVector.fromArray([2,"<table><tbody>","</tbody></table>"], true),table_section_wrapper_4773]);
domina.remove_extraneous_tbody_BANG_ = (function remove_extraneous_tbody_BANG_(div,html,tag_name,start_wrap){
var no_tbody_QMARK_ = cljs.core.not.call(null,cljs.core.re_find.call(null,domina.re_tbody,html));
var tbody = (((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,tag_name,"table");
if(and__3941__auto__)
{return no_tbody_QMARK_;
} else
{return and__3941__auto__;
}
})())?(function (){var and__3941__auto__ = div.firstChild;
if(cljs.core.truth_(and__3941__auto__))
{return div.firstChild.childNodes;
} else
{return and__3941__auto__;
}
})():(((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,start_wrap,"<table>");
if(and__3941__auto__)
{return no_tbody_QMARK_;
} else
{return and__3941__auto__;
}
})())?divchildNodes:cljs.core.PersistentVector.EMPTY));
var seq__4779 = cljs.core.seq.call(null,tbody);
var chunk__4780 = null;
var count__4781 = 0;
var i__4782 = 0;
while(true){
if((i__4782 < count__4781))
{var child = cljs.core._nth.call(null,chunk__4780,i__4782);
if((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,child.nodeName,"tbody");
if(and__3941__auto__)
{return cljs.core._EQ_.call(null,child.childNodes.length,0);
} else
{return and__3941__auto__;
}
})())
{child.parentNode.removeChild(child);
} else
{}
{
var G__4783 = seq__4779;
var G__4784 = chunk__4780;
var G__4785 = count__4781;
var G__4786 = (i__4782 + 1);
seq__4779 = G__4783;
chunk__4780 = G__4784;
count__4781 = G__4785;
i__4782 = G__4786;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__4779);
if(temp__4092__auto__)
{var seq__4779__$1 = temp__4092__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4779__$1))
{var c__3039__auto__ = cljs.core.chunk_first.call(null,seq__4779__$1);
{
var G__4787 = cljs.core.chunk_rest.call(null,seq__4779__$1);
var G__4788 = c__3039__auto__;
var G__4789 = cljs.core.count.call(null,c__3039__auto__);
var G__4790 = 0;
seq__4779 = G__4787;
chunk__4780 = G__4788;
count__4781 = G__4789;
i__4782 = G__4790;
continue;
}
} else
{var child = cljs.core.first.call(null,seq__4779__$1);
if((function (){var and__3941__auto__ = cljs.core._EQ_.call(null,child.nodeName,"tbody");
if(and__3941__auto__)
{return cljs.core._EQ_.call(null,child.childNodes.length,0);
} else
{return and__3941__auto__;
}
})())
{child.parentNode.removeChild(child);
} else
{}
{
var G__4791 = cljs.core.next.call(null,seq__4779__$1);
var G__4792 = null;
var G__4793 = 0;
var G__4794 = 0;
seq__4779 = G__4791;
chunk__4780 = G__4792;
count__4781 = G__4793;
i__4782 = G__4794;
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
domina.restore_leading_whitespace_BANG_ = (function restore_leading_whitespace_BANG_(div,html){
return div.insertBefore(document.createTextNode(cljs.core.first.call(null,cljs.core.re_find.call(null,domina.re_leading_whitespace,html))),div.firstChild);
});
/**
* takes an string of html and returns a NodeList of dom fragments
*/
domina.html_to_dom = (function html_to_dom(html){
var html__$1 = clojure.string.replace.call(null,html,domina.re_xhtml_tag,"<$1></$2>");
var tag_name = [cljs.core.str(cljs.core.second.call(null,cljs.core.re_find.call(null,domina.re_tag_name,html__$1)))].join('').toLowerCase();
var vec__4796 = cljs.core.get.call(null,domina.wrap_map,tag_name,(new cljs.core.Keyword("\uFDD0:default")).call(null,domina.wrap_map));
var depth = cljs.core.nth.call(null,vec__4796,0,null);
var start_wrap = cljs.core.nth.call(null,vec__4796,1,null);
var end_wrap = cljs.core.nth.call(null,vec__4796,2,null);
var div = (function (){var wrapper = (function (){var div = document.createElement("div");
div.innerHTML = [cljs.core.str(start_wrap),cljs.core.str(html__$1),cljs.core.str(end_wrap)].join('');
return div;
})();
var level = depth;
while(true){
if((level > 0))
{{
var G__4797 = wrapper.lastChild;
var G__4798 = (level - 1);
wrapper = G__4797;
level = G__4798;
continue;
}
} else
{return wrapper;
}
break;
}
})();
if(cljs.core.truth_(domina.support.extraneous_tbody_QMARK_))
{domina.remove_extraneous_tbody_BANG_.call(null,div,html__$1,tag_name,start_wrap);
} else
{}
if(cljs.core.truth_((function (){var and__3941__auto__ = cljs.core.not.call(null,domina.support.leading_whitespace_QMARK_);
if(and__3941__auto__)
{return cljs.core.re_find.call(null,domina.re_leading_whitespace,html__$1);
} else
{return and__3941__auto__;
}
})()))
{domina.restore_leading_whitespace_BANG_.call(null,div,html__$1);
} else
{}
return div.childNodes;
});
domina.string_to_dom = (function string_to_dom(s){
if(cljs.core.truth_(cljs.core.re_find.call(null,domina.re_html,s)))
{return domina.html_to_dom.call(null,s);
} else
{return document.createTextNode(s);
}
});
domina.DomContent = {};
domina.nodes = (function nodes(content){
if((function (){var and__3941__auto__ = content;
if(and__3941__auto__)
{return content.domina$DomContent$nodes$arity$1;
} else
{return and__3941__auto__;
}
})())
{return content.domina$DomContent$nodes$arity$1(content);
} else
{var x__2908__auto__ = (((content == null))?null:content);
return (function (){var or__3943__auto__ = (domina.nodes[goog.typeOf(x__2908__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (domina.nodes["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"DomContent.nodes",content);
}
}
})().call(null,content);
}
});
domina.single_node = (function single_node(nodeseq){
if((function (){var and__3941__auto__ = nodeseq;
if(and__3941__auto__)
{return nodeseq.domina$DomContent$single_node$arity$1;
} else
{return and__3941__auto__;
}
})())
{return nodeseq.domina$DomContent$single_node$arity$1(nodeseq);
} else
{var x__2908__auto__ = (((nodeseq == null))?null:nodeseq);
return (function (){var or__3943__auto__ = (domina.single_node[goog.typeOf(x__2908__auto__)]);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{var or__3943__auto____$1 = (domina.single_node["_"]);
if(or__3943__auto____$1)
{return or__3943__auto____$1;
} else
{throw cljs.core.missing_protocol.call(null,"DomContent.single-node",nodeseq);
}
}
})().call(null,nodeseq);
}
});
domina._STAR_debug_STAR_ = true;
/**
* @param {...*} var_args
*/
domina.log_debug = (function() { 
var log_debug__delegate = function (mesg){
if(cljs.core.truth_((function (){var and__3941__auto__ = domina._STAR_debug_STAR_;
if(cljs.core.truth_(and__3941__auto__))
{return !(cljs.core._EQ_.call(null,window.console,undefined));
} else
{return and__3941__auto__;
}
})()))
{return console.log(cljs.core.apply.call(null,cljs.core.str,mesg));
} else
{return null;
}
};
var log_debug = function (var_args){
var mesg = null;
if (arguments.length > 0) {
  mesg = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return log_debug__delegate.call(this, mesg);
};
log_debug.cljs$lang$maxFixedArity = 0;
log_debug.cljs$lang$applyTo = (function (arglist__4799){
var mesg = cljs.core.seq(arglist__4799);
return log_debug__delegate(mesg);
});
log_debug.cljs$core$IFn$_invoke$arity$variadic = log_debug__delegate;
return log_debug;
})()
;
/**
* @param {...*} var_args
*/
domina.log = (function() { 
var log__delegate = function (mesg){
if(cljs.core.truth_(window.console))
{return console.log(cljs.core.apply.call(null,cljs.core.str,mesg));
} else
{return null;
}
};
var log = function (var_args){
var mesg = null;
if (arguments.length > 0) {
  mesg = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return log__delegate.call(this, mesg);
};
log.cljs$lang$maxFixedArity = 0;
log.cljs$lang$applyTo = (function (arglist__4800){
var mesg = cljs.core.seq(arglist__4800);
return log__delegate(mesg);
});
log.cljs$core$IFn$_invoke$arity$variadic = log__delegate;
return log;
})()
;
/**
* Returns content containing a single node by looking up the given ID
*/
domina.by_id = (function by_id(id){
return goog.dom.getElement(cljs.core.name.call(null,id));
});
/**
* Returns content containing nodes which have the specified CSS class.
*/
domina.by_class = (function by_class(class_name){
if((void 0 === domina.t4804))
{goog.provide('domina.t4804');

/**
* @constructor
*/
domina.t4804 = (function (class_name,by_class,meta4805){
this.class_name = class_name;
this.by_class = by_class;
this.meta4805 = meta4805;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
domina.t4804.cljs$lang$type = true;
domina.t4804.cljs$lang$ctorStr = "domina/t4804";
domina.t4804.cljs$lang$ctorPrWriter = (function (this__2849__auto__,writer__2850__auto__,opt__2851__auto__){
return cljs.core._write.call(null,writer__2850__auto__,"domina/t4804");
});
domina.t4804.prototype.domina$DomContent$ = true;
domina.t4804.prototype.domina$DomContent$nodes$arity$1 = (function (_){
var self__ = this;
return domina.normalize_seq.call(null,goog.dom.getElementsByClass(cljs.core.name.call(null,self__.class_name)));
});
domina.t4804.prototype.domina$DomContent$single_node$arity$1 = (function (_){
var self__ = this;
return domina.normalize_seq.call(null,goog.dom.getElementByClass(cljs.core.name.call(null,self__.class_name)));
});
domina.t4804.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_4806){
var self__ = this;
return self__.meta4805;
});
domina.t4804.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_4806,meta4805__$1){
var self__ = this;
return (new domina.t4804(self__.class_name,self__.by_class,meta4805__$1));
});
domina.__GT_t4804 = (function __GT_t4804(class_name__$1,by_class__$1,meta4805){
return (new domina.t4804(class_name__$1,by_class__$1,meta4805));
});
} else
{}
return (new domina.t4804(class_name,by_class,null));
});
/**
* Gets all the child nodes of the elements in a content. Same as (xpath content '*') but more efficient.
*/
domina.children = (function children(content){
return cljs.core.doall.call(null,cljs.core.mapcat.call(null,goog.dom.getChildren,domina.nodes.call(null,content)));
});
/**
* Returns the deepest common ancestor of the argument contents (which are presumed to be single nodes), or nil if they are from different documents.
* @param {...*} var_args
*/
domina.common_ancestor = (function() { 
var common_ancestor__delegate = function (contents){
return cljs.core.apply.call(null,goog.dom.findCommonAncestor,cljs.core.map.call(null,domina.single_node,contents));
};
var common_ancestor = function (var_args){
var contents = null;
if (arguments.length > 0) {
  contents = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return common_ancestor__delegate.call(this, contents);
};
common_ancestor.cljs$lang$maxFixedArity = 0;
common_ancestor.cljs$lang$applyTo = (function (arglist__4807){
var contents = cljs.core.seq(arglist__4807);
return common_ancestor__delegate(contents);
});
common_ancestor.cljs$core$IFn$_invoke$arity$variadic = common_ancestor__delegate;
return common_ancestor;
})()
;
/**
* Returns true if the first argument is an ancestor of the second argument. Presumes both arguments are single-node contents.
*/
domina.ancestor_QMARK_ = (function ancestor_QMARK_(ancestor_content,descendant_content){
return cljs.core._EQ_.call(null,domina.common_ancestor.call(null,ancestor_content,descendant_content),domina.single_node.call(null,ancestor_content));
});
/**
* Returns a deep clone of content.
*/
domina.clone = (function clone(content){
return cljs.core.map.call(null,(function (p1__4808_SHARP_){
return p1__4808_SHARP_.cloneNode(true);
}),domina.nodes.call(null,content));
});
/**
* Given a parent and child contents, appends each of the children to all of the parents. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.append_BANG_ = (function append_BANG_(parent_content,child_content){
domina.apply_with_cloning.call(null,goog.dom.appendChild,parent_content,child_content);
return parent_content;
});
/**
* Given a parent and child contents, appends each of the children to all of the parents at the specified index. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.insert_BANG_ = (function insert_BANG_(parent_content,child_content,idx){
domina.apply_with_cloning.call(null,(function (p1__4809_SHARP_,p2__4810_SHARP_){
return goog.dom.insertChildAt(p1__4809_SHARP_,p2__4810_SHARP_,idx);
}),parent_content,child_content);
return parent_content;
});
/**
* Given a parent and child contents, prepends each of the children to all of the parents. If there is more than one node in the parent content, clones the children for the additional parents. Returns the parent content.
*/
domina.prepend_BANG_ = (function prepend_BANG_(parent_content,child_content){
domina.insert_BANG_.call(null,parent_content,child_content,0);
return parent_content;
});
/**
* Given a content and some new content, inserts the new content immediately before the reference content. If there is more than one node in the reference content, clones the new content for each one.
*/
domina.insert_before_BANG_ = (function insert_before_BANG_(content,new_content){
domina.apply_with_cloning.call(null,(function (p1__4812_SHARP_,p2__4811_SHARP_){
return goog.dom.insertSiblingBefore(p2__4811_SHARP_,p1__4812_SHARP_);
}),content,new_content);
return content;
});
/**
* Given a content and some new content, inserts the new content immediately after the reference content. If there is more than one node in the reference content, clones the new content for each one.
*/
domina.insert_after_BANG_ = (function insert_after_BANG_(content,new_content){
domina.apply_with_cloning.call(null,(function (p1__4814_SHARP_,p2__4813_SHARP_){
return goog.dom.insertSiblingAfter(p2__4813_SHARP_,p1__4814_SHARP_);
}),content,new_content);
return content;
});
/**
* Given some old content and some new content, replaces the old content with new content. If there are multiple nodes in the old content, replaces each of them and clones the new content as necessary.
*/
domina.swap_content_BANG_ = (function swap_content_BANG_(old_content,new_content){
domina.apply_with_cloning.call(null,(function (p1__4816_SHARP_,p2__4815_SHARP_){
return goog.dom.replaceNode(p2__4815_SHARP_,p1__4816_SHARP_);
}),old_content,new_content);
return old_content;
});
/**
* Removes all the nodes in a content from the DOM and returns them.
*/
domina.detach_BANG_ = (function detach_BANG_(content){
return cljs.core.doall.call(null,cljs.core.map.call(null,goog.dom.removeNode,domina.nodes.call(null,content)));
});
/**
* Removes all the nodes in a content from the DOM. Returns nil.
*/
domina.destroy_BANG_ = (function destroy_BANG_(content){
return cljs.core.dorun.call(null,cljs.core.map.call(null,goog.dom.removeNode,domina.nodes.call(null,content)));
});
/**
* Removes all the child nodes in a content from the DOM. Returns the original content.
*/
domina.destroy_children_BANG_ = (function destroy_children_BANG_(content){
cljs.core.dorun.call(null,cljs.core.map.call(null,goog.dom.removeChildren,domina.nodes.call(null,content)));
return content;
});
/**
* Gets the value of a CSS property. Assumes content will be a single node. Name may be a string or keyword. Returns nil if there is no value set for the style.
*/
domina.style = (function style(content,name){
var s = goog.style.getStyle(domina.single_node.call(null,content),cljs.core.name.call(null,name));
if(cljs.core.truth_(clojure.string.blank_QMARK_.call(null,s)))
{return null;
} else
{return s;
}
});
/**
* Gets the value of an HTML attribute. Assumes content will be a single node. Name may be a stirng or keyword. Returns nil if there is no value set for the style.
*/
domina.attr = (function attr(content,name){
return domina.single_node.call(null,content).getAttribute(cljs.core.name.call(null,name));
});
/**
* Sets the value of a CSS property for each node in the content. Name may be a string or keyword. Value will be cast to a string, multiple values wil be concatenated.
* @param {...*} var_args
*/
domina.set_style_BANG_ = (function() { 
var set_style_BANG___delegate = function (content,name,value){
var seq__4821_4825 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4822_4826 = null;
var count__4823_4827 = 0;
var i__4824_4828 = 0;
while(true){
if((i__4824_4828 < count__4823_4827))
{var n_4829 = cljs.core._nth.call(null,chunk__4822_4826,i__4824_4828);
goog.style.setStyle(n_4829,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__4830 = seq__4821_4825;
var G__4831 = chunk__4822_4826;
var G__4832 = count__4823_4827;
var G__4833 = (i__4824_4828 + 1);
seq__4821_4825 = G__4830;
chunk__4822_4826 = G__4831;
count__4823_4827 = G__4832;
i__4824_4828 = G__4833;
continue;
}
} else
{var temp__4092__auto___4834 = cljs.core.seq.call(null,seq__4821_4825);
if(temp__4092__auto___4834)
{var seq__4821_4835__$1 = temp__4092__auto___4834;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4821_4835__$1))
{var c__3039__auto___4836 = cljs.core.chunk_first.call(null,seq__4821_4835__$1);
{
var G__4837 = cljs.core.chunk_rest.call(null,seq__4821_4835__$1);
var G__4838 = c__3039__auto___4836;
var G__4839 = cljs.core.count.call(null,c__3039__auto___4836);
var G__4840 = 0;
seq__4821_4825 = G__4837;
chunk__4822_4826 = G__4838;
count__4823_4827 = G__4839;
i__4824_4828 = G__4840;
continue;
}
} else
{var n_4841 = cljs.core.first.call(null,seq__4821_4835__$1);
goog.style.setStyle(n_4841,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__4842 = cljs.core.next.call(null,seq__4821_4835__$1);
var G__4843 = null;
var G__4844 = 0;
var G__4845 = 0;
seq__4821_4825 = G__4842;
chunk__4822_4826 = G__4843;
count__4823_4827 = G__4844;
i__4824_4828 = G__4845;
continue;
}
}
} else
{}
}
break;
}
return content;
};
var set_style_BANG_ = function (content,name,var_args){
var value = null;
if (arguments.length > 2) {
  value = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return set_style_BANG___delegate.call(this, content, name, value);
};
set_style_BANG_.cljs$lang$maxFixedArity = 2;
set_style_BANG_.cljs$lang$applyTo = (function (arglist__4846){
var content = cljs.core.first(arglist__4846);
arglist__4846 = cljs.core.next(arglist__4846);
var name = cljs.core.first(arglist__4846);
var value = cljs.core.rest(arglist__4846);
return set_style_BANG___delegate(content, name, value);
});
set_style_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_style_BANG___delegate;
return set_style_BANG_;
})()
;
/**
* Sets the value of an HTML property for each node in the content. Name may be a string or keyword. Value will be cast to a string, multiple values wil be concatenated.
* @param {...*} var_args
*/
domina.set_attr_BANG_ = (function() { 
var set_attr_BANG___delegate = function (content,name,value){
var seq__4851_4855 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4852_4856 = null;
var count__4853_4857 = 0;
var i__4854_4858 = 0;
while(true){
if((i__4854_4858 < count__4853_4857))
{var n_4859 = cljs.core._nth.call(null,chunk__4852_4856,i__4854_4858);
n_4859.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__4860 = seq__4851_4855;
var G__4861 = chunk__4852_4856;
var G__4862 = count__4853_4857;
var G__4863 = (i__4854_4858 + 1);
seq__4851_4855 = G__4860;
chunk__4852_4856 = G__4861;
count__4853_4857 = G__4862;
i__4854_4858 = G__4863;
continue;
}
} else
{var temp__4092__auto___4864 = cljs.core.seq.call(null,seq__4851_4855);
if(temp__4092__auto___4864)
{var seq__4851_4865__$1 = temp__4092__auto___4864;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4851_4865__$1))
{var c__3039__auto___4866 = cljs.core.chunk_first.call(null,seq__4851_4865__$1);
{
var G__4867 = cljs.core.chunk_rest.call(null,seq__4851_4865__$1);
var G__4868 = c__3039__auto___4866;
var G__4869 = cljs.core.count.call(null,c__3039__auto___4866);
var G__4870 = 0;
seq__4851_4855 = G__4867;
chunk__4852_4856 = G__4868;
count__4853_4857 = G__4869;
i__4854_4858 = G__4870;
continue;
}
} else
{var n_4871 = cljs.core.first.call(null,seq__4851_4865__$1);
n_4871.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__4872 = cljs.core.next.call(null,seq__4851_4865__$1);
var G__4873 = null;
var G__4874 = 0;
var G__4875 = 0;
seq__4851_4855 = G__4872;
chunk__4852_4856 = G__4873;
count__4853_4857 = G__4874;
i__4854_4858 = G__4875;
continue;
}
}
} else
{}
}
break;
}
return content;
};
var set_attr_BANG_ = function (content,name,var_args){
var value = null;
if (arguments.length > 2) {
  value = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return set_attr_BANG___delegate.call(this, content, name, value);
};
set_attr_BANG_.cljs$lang$maxFixedArity = 2;
set_attr_BANG_.cljs$lang$applyTo = (function (arglist__4876){
var content = cljs.core.first(arglist__4876);
arglist__4876 = cljs.core.next(arglist__4876);
var name = cljs.core.first(arglist__4876);
var value = cljs.core.rest(arglist__4876);
return set_attr_BANG___delegate(content, name, value);
});
set_attr_BANG_.cljs$core$IFn$_invoke$arity$variadic = set_attr_BANG___delegate;
return set_attr_BANG_;
})()
;
/**
* Removes the specified HTML property for each node in the content. Name may be a string or keyword.
*/
domina.remove_attr_BANG_ = (function remove_attr_BANG_(content,name){
var seq__4881_4885 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4882_4886 = null;
var count__4883_4887 = 0;
var i__4884_4888 = 0;
while(true){
if((i__4884_4888 < count__4883_4887))
{var n_4889 = cljs.core._nth.call(null,chunk__4882_4886,i__4884_4888);
n_4889.removeAttribute(cljs.core.name.call(null,name));
{
var G__4890 = seq__4881_4885;
var G__4891 = chunk__4882_4886;
var G__4892 = count__4883_4887;
var G__4893 = (i__4884_4888 + 1);
seq__4881_4885 = G__4890;
chunk__4882_4886 = G__4891;
count__4883_4887 = G__4892;
i__4884_4888 = G__4893;
continue;
}
} else
{var temp__4092__auto___4894 = cljs.core.seq.call(null,seq__4881_4885);
if(temp__4092__auto___4894)
{var seq__4881_4895__$1 = temp__4092__auto___4894;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4881_4895__$1))
{var c__3039__auto___4896 = cljs.core.chunk_first.call(null,seq__4881_4895__$1);
{
var G__4897 = cljs.core.chunk_rest.call(null,seq__4881_4895__$1);
var G__4898 = c__3039__auto___4896;
var G__4899 = cljs.core.count.call(null,c__3039__auto___4896);
var G__4900 = 0;
seq__4881_4885 = G__4897;
chunk__4882_4886 = G__4898;
count__4883_4887 = G__4899;
i__4884_4888 = G__4900;
continue;
}
} else
{var n_4901 = cljs.core.first.call(null,seq__4881_4895__$1);
n_4901.removeAttribute(cljs.core.name.call(null,name));
{
var G__4902 = cljs.core.next.call(null,seq__4881_4895__$1);
var G__4903 = null;
var G__4904 = 0;
var G__4905 = 0;
seq__4881_4885 = G__4902;
chunk__4882_4886 = G__4903;
count__4883_4887 = G__4904;
i__4884_4888 = G__4905;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Parses a CSS style string and returns the properties as a map.
*/
domina.parse_style_attributes = (function parse_style_attributes(style){
return cljs.core.reduce.call(null,(function (acc,pair){
var vec__4907 = pair.split(/\s*:\s*/);
var k = cljs.core.nth.call(null,vec__4907,0,null);
var v = cljs.core.nth.call(null,vec__4907,1,null);
if(cljs.core.truth_((function (){var and__3941__auto__ = k;
if(cljs.core.truth_(and__3941__auto__))
{return v;
} else
{return and__3941__auto__;
}
})()))
{return cljs.core.assoc.call(null,acc,cljs.core.keyword.call(null,k.toLowerCase()),v);
} else
{return acc;
}
}),cljs.core.PersistentArrayMap.EMPTY,style.split(/\s*;\s*/));
});
/**
* Returns a map of the CSS styles/values. Assumes content will be a single node. Style names are returned as keywords.
*/
domina.styles = (function styles(content){
var style = domina.attr.call(null,content,"style");
if(cljs.core.string_QMARK_.call(null,style))
{return domina.parse_style_attributes.call(null,style);
} else
{if(cljs.core.truth_(style.cssText))
{return domina.parse_style_attributes.call(null,style.cssText);
} else
{return null;
}
}
});
/**
* Returns a map of the HTML attributes/values. Assumes content will be a single node. Attribute names are returned as keywords.
*/
domina.attrs = (function attrs(content){
var node = domina.single_node.call(null,content);
var attrs__$1 = node.attributes;
return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.nil_QMARK_),cljs.core.map.call(null,(function (p1__4908_SHARP_){
var attr = attrs__$1.item(p1__4908_SHARP_);
var value = attr.nodeValue;
if((function (){var and__3941__auto__ = cljs.core.not_EQ_.call(null,null,value);
if(and__3941__auto__)
{return cljs.core.not_EQ_.call(null,"",value);
} else
{return and__3941__auto__;
}
})())
{return cljs.core.PersistentArrayMap.fromArray([cljs.core.keyword.call(null,attr.nodeName.toLowerCase()),attr.nodeValue], true);
} else
{return null;
}
}),cljs.core.range.call(null,attrs__$1.length))));
});
/**
* Sets the specified CSS styles for each node in the content, given a map of names and values. Style names may be keywords or strings.
*/
domina.set_styles_BANG_ = (function set_styles_BANG_(content,styles){
var seq__4915_4921 = cljs.core.seq.call(null,styles);
var chunk__4916_4922 = null;
var count__4917_4923 = 0;
var i__4918_4924 = 0;
while(true){
if((i__4918_4924 < count__4917_4923))
{var vec__4919_4925 = cljs.core._nth.call(null,chunk__4916_4922,i__4918_4924);
var name_4926 = cljs.core.nth.call(null,vec__4919_4925,0,null);
var value_4927 = cljs.core.nth.call(null,vec__4919_4925,1,null);
domina.set_style_BANG_.call(null,content,name_4926,value_4927);
{
var G__4928 = seq__4915_4921;
var G__4929 = chunk__4916_4922;
var G__4930 = count__4917_4923;
var G__4931 = (i__4918_4924 + 1);
seq__4915_4921 = G__4928;
chunk__4916_4922 = G__4929;
count__4917_4923 = G__4930;
i__4918_4924 = G__4931;
continue;
}
} else
{var temp__4092__auto___4932 = cljs.core.seq.call(null,seq__4915_4921);
if(temp__4092__auto___4932)
{var seq__4915_4933__$1 = temp__4092__auto___4932;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4915_4933__$1))
{var c__3039__auto___4934 = cljs.core.chunk_first.call(null,seq__4915_4933__$1);
{
var G__4935 = cljs.core.chunk_rest.call(null,seq__4915_4933__$1);
var G__4936 = c__3039__auto___4934;
var G__4937 = cljs.core.count.call(null,c__3039__auto___4934);
var G__4938 = 0;
seq__4915_4921 = G__4935;
chunk__4916_4922 = G__4936;
count__4917_4923 = G__4937;
i__4918_4924 = G__4938;
continue;
}
} else
{var vec__4920_4939 = cljs.core.first.call(null,seq__4915_4933__$1);
var name_4940 = cljs.core.nth.call(null,vec__4920_4939,0,null);
var value_4941 = cljs.core.nth.call(null,vec__4920_4939,1,null);
domina.set_style_BANG_.call(null,content,name_4940,value_4941);
{
var G__4942 = cljs.core.next.call(null,seq__4915_4933__$1);
var G__4943 = null;
var G__4944 = 0;
var G__4945 = 0;
seq__4915_4921 = G__4942;
chunk__4916_4922 = G__4943;
count__4917_4923 = G__4944;
i__4918_4924 = G__4945;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Sets the specified CSS styles fpr each node in the content, given a map of names and values. Style names may be keywords or strings.
*/
domina.set_attrs_BANG_ = (function set_attrs_BANG_(content,attrs){
var seq__4952_4958 = cljs.core.seq.call(null,attrs);
var chunk__4953_4959 = null;
var count__4954_4960 = 0;
var i__4955_4961 = 0;
while(true){
if((i__4955_4961 < count__4954_4960))
{var vec__4956_4962 = cljs.core._nth.call(null,chunk__4953_4959,i__4955_4961);
var name_4963 = cljs.core.nth.call(null,vec__4956_4962,0,null);
var value_4964 = cljs.core.nth.call(null,vec__4956_4962,1,null);
domina.set_attr_BANG_.call(null,content,name_4963,value_4964);
{
var G__4965 = seq__4952_4958;
var G__4966 = chunk__4953_4959;
var G__4967 = count__4954_4960;
var G__4968 = (i__4955_4961 + 1);
seq__4952_4958 = G__4965;
chunk__4953_4959 = G__4966;
count__4954_4960 = G__4967;
i__4955_4961 = G__4968;
continue;
}
} else
{var temp__4092__auto___4969 = cljs.core.seq.call(null,seq__4952_4958);
if(temp__4092__auto___4969)
{var seq__4952_4970__$1 = temp__4092__auto___4969;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4952_4970__$1))
{var c__3039__auto___4971 = cljs.core.chunk_first.call(null,seq__4952_4970__$1);
{
var G__4972 = cljs.core.chunk_rest.call(null,seq__4952_4970__$1);
var G__4973 = c__3039__auto___4971;
var G__4974 = cljs.core.count.call(null,c__3039__auto___4971);
var G__4975 = 0;
seq__4952_4958 = G__4972;
chunk__4953_4959 = G__4973;
count__4954_4960 = G__4974;
i__4955_4961 = G__4975;
continue;
}
} else
{var vec__4957_4976 = cljs.core.first.call(null,seq__4952_4970__$1);
var name_4977 = cljs.core.nth.call(null,vec__4957_4976,0,null);
var value_4978 = cljs.core.nth.call(null,vec__4957_4976,1,null);
domina.set_attr_BANG_.call(null,content,name_4977,value_4978);
{
var G__4979 = cljs.core.next.call(null,seq__4952_4970__$1);
var G__4980 = null;
var G__4981 = 0;
var G__4982 = 0;
seq__4952_4958 = G__4979;
chunk__4953_4959 = G__4980;
count__4954_4960 = G__4981;
i__4955_4961 = G__4982;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns true if the node has the specified CSS class. Assumes content is a single node.
*/
domina.has_class_QMARK_ = (function has_class_QMARK_(content,class$){
return goog.dom.classes.has(domina.single_node.call(null,content),class$);
});
/**
* Adds the specified CSS class to each node in the content.
*/
domina.add_class_BANG_ = (function add_class_BANG_(content,class$){
var seq__4987_4991 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4988_4992 = null;
var count__4989_4993 = 0;
var i__4990_4994 = 0;
while(true){
if((i__4990_4994 < count__4989_4993))
{var node_4995 = cljs.core._nth.call(null,chunk__4988_4992,i__4990_4994);
goog.dom.classes.add(node_4995,class$);
{
var G__4996 = seq__4987_4991;
var G__4997 = chunk__4988_4992;
var G__4998 = count__4989_4993;
var G__4999 = (i__4990_4994 + 1);
seq__4987_4991 = G__4996;
chunk__4988_4992 = G__4997;
count__4989_4993 = G__4998;
i__4990_4994 = G__4999;
continue;
}
} else
{var temp__4092__auto___5000 = cljs.core.seq.call(null,seq__4987_4991);
if(temp__4092__auto___5000)
{var seq__4987_5001__$1 = temp__4092__auto___5000;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4987_5001__$1))
{var c__3039__auto___5002 = cljs.core.chunk_first.call(null,seq__4987_5001__$1);
{
var G__5003 = cljs.core.chunk_rest.call(null,seq__4987_5001__$1);
var G__5004 = c__3039__auto___5002;
var G__5005 = cljs.core.count.call(null,c__3039__auto___5002);
var G__5006 = 0;
seq__4987_4991 = G__5003;
chunk__4988_4992 = G__5004;
count__4989_4993 = G__5005;
i__4990_4994 = G__5006;
continue;
}
} else
{var node_5007 = cljs.core.first.call(null,seq__4987_5001__$1);
goog.dom.classes.add(node_5007,class$);
{
var G__5008 = cljs.core.next.call(null,seq__4987_5001__$1);
var G__5009 = null;
var G__5010 = 0;
var G__5011 = 0;
seq__4987_4991 = G__5008;
chunk__4988_4992 = G__5009;
count__4989_4993 = G__5010;
i__4990_4994 = G__5011;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Removes the specified CSS class from each node in the content.
*/
domina.remove_class_BANG_ = (function remove_class_BANG_(content,class$){
var seq__5016_5020 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__5017_5021 = null;
var count__5018_5022 = 0;
var i__5019_5023 = 0;
while(true){
if((i__5019_5023 < count__5018_5022))
{var node_5024 = cljs.core._nth.call(null,chunk__5017_5021,i__5019_5023);
goog.dom.classes.remove(node_5024,class$);
{
var G__5025 = seq__5016_5020;
var G__5026 = chunk__5017_5021;
var G__5027 = count__5018_5022;
var G__5028 = (i__5019_5023 + 1);
seq__5016_5020 = G__5025;
chunk__5017_5021 = G__5026;
count__5018_5022 = G__5027;
i__5019_5023 = G__5028;
continue;
}
} else
{var temp__4092__auto___5029 = cljs.core.seq.call(null,seq__5016_5020);
if(temp__4092__auto___5029)
{var seq__5016_5030__$1 = temp__4092__auto___5029;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5016_5030__$1))
{var c__3039__auto___5031 = cljs.core.chunk_first.call(null,seq__5016_5030__$1);
{
var G__5032 = cljs.core.chunk_rest.call(null,seq__5016_5030__$1);
var G__5033 = c__3039__auto___5031;
var G__5034 = cljs.core.count.call(null,c__3039__auto___5031);
var G__5035 = 0;
seq__5016_5020 = G__5032;
chunk__5017_5021 = G__5033;
count__5018_5022 = G__5034;
i__5019_5023 = G__5035;
continue;
}
} else
{var node_5036 = cljs.core.first.call(null,seq__5016_5030__$1);
goog.dom.classes.remove(node_5036,class$);
{
var G__5037 = cljs.core.next.call(null,seq__5016_5030__$1);
var G__5038 = null;
var G__5039 = 0;
var G__5040 = 0;
seq__5016_5020 = G__5037;
chunk__5017_5021 = G__5038;
count__5018_5022 = G__5039;
i__5019_5023 = G__5040;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns a seq of all the CSS classes currently applied to a node. Assumes content is a single node.
*/
domina.classes = (function classes(content){
return cljs.core.seq.call(null,goog.dom.classes.get(domina.single_node.call(null,content)));
});
/**
* Sets the class attribute of the content nodes to classes, which can
* be either a class attribute string or a seq of classname strings.
*/
domina.set_classes_BANG_ = (function set_classes_BANG_(content,classes){
var classes_5049__$1 = ((cljs.core.coll_QMARK_.call(null,classes))?clojure.string.join.call(null," ",classes):classes);
var seq__5045_5050 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__5046_5051 = null;
var count__5047_5052 = 0;
var i__5048_5053 = 0;
while(true){
if((i__5048_5053 < count__5047_5052))
{var node_5054 = cljs.core._nth.call(null,chunk__5046_5051,i__5048_5053);
goog.dom.classes.set(node_5054,classes_5049__$1);
{
var G__5055 = seq__5045_5050;
var G__5056 = chunk__5046_5051;
var G__5057 = count__5047_5052;
var G__5058 = (i__5048_5053 + 1);
seq__5045_5050 = G__5055;
chunk__5046_5051 = G__5056;
count__5047_5052 = G__5057;
i__5048_5053 = G__5058;
continue;
}
} else
{var temp__4092__auto___5059 = cljs.core.seq.call(null,seq__5045_5050);
if(temp__4092__auto___5059)
{var seq__5045_5060__$1 = temp__4092__auto___5059;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5045_5060__$1))
{var c__3039__auto___5061 = cljs.core.chunk_first.call(null,seq__5045_5060__$1);
{
var G__5062 = cljs.core.chunk_rest.call(null,seq__5045_5060__$1);
var G__5063 = c__3039__auto___5061;
var G__5064 = cljs.core.count.call(null,c__3039__auto___5061);
var G__5065 = 0;
seq__5045_5050 = G__5062;
chunk__5046_5051 = G__5063;
count__5047_5052 = G__5064;
i__5048_5053 = G__5065;
continue;
}
} else
{var node_5066 = cljs.core.first.call(null,seq__5045_5060__$1);
goog.dom.classes.set(node_5066,classes_5049__$1);
{
var G__5067 = cljs.core.next.call(null,seq__5045_5060__$1);
var G__5068 = null;
var G__5069 = 0;
var G__5070 = 0;
seq__5045_5050 = G__5067;
chunk__5046_5051 = G__5068;
count__5047_5052 = G__5069;
i__5048_5053 = G__5070;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the text of a node. Assumes content is a single node. For consistency across browsers, will always trim whitespace of the beginning and end of the returned text.
*/
domina.text = (function text(content){
return goog.string.trim(goog.dom.getTextContent(domina.single_node.call(null,content)));
});
/**
* Sets the text value of all the nodes in the given content.
*/
domina.set_text_BANG_ = (function set_text_BANG_(content,value){
var seq__5075_5079 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__5076_5080 = null;
var count__5077_5081 = 0;
var i__5078_5082 = 0;
while(true){
if((i__5078_5082 < count__5077_5081))
{var node_5083 = cljs.core._nth.call(null,chunk__5076_5080,i__5078_5082);
goog.dom.setTextContent(node_5083,value);
{
var G__5084 = seq__5075_5079;
var G__5085 = chunk__5076_5080;
var G__5086 = count__5077_5081;
var G__5087 = (i__5078_5082 + 1);
seq__5075_5079 = G__5084;
chunk__5076_5080 = G__5085;
count__5077_5081 = G__5086;
i__5078_5082 = G__5087;
continue;
}
} else
{var temp__4092__auto___5088 = cljs.core.seq.call(null,seq__5075_5079);
if(temp__4092__auto___5088)
{var seq__5075_5089__$1 = temp__4092__auto___5088;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5075_5089__$1))
{var c__3039__auto___5090 = cljs.core.chunk_first.call(null,seq__5075_5089__$1);
{
var G__5091 = cljs.core.chunk_rest.call(null,seq__5075_5089__$1);
var G__5092 = c__3039__auto___5090;
var G__5093 = cljs.core.count.call(null,c__3039__auto___5090);
var G__5094 = 0;
seq__5075_5079 = G__5091;
chunk__5076_5080 = G__5092;
count__5077_5081 = G__5093;
i__5078_5082 = G__5094;
continue;
}
} else
{var node_5095 = cljs.core.first.call(null,seq__5075_5089__$1);
goog.dom.setTextContent(node_5095,value);
{
var G__5096 = cljs.core.next.call(null,seq__5075_5089__$1);
var G__5097 = null;
var G__5098 = 0;
var G__5099 = 0;
seq__5075_5079 = G__5096;
chunk__5076_5080 = G__5097;
count__5077_5081 = G__5098;
i__5078_5082 = G__5099;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the value of a node (presumably a form field). Assumes content is a single node.
*/
domina.value = (function value(content){
return goog.dom.forms.getValue(domina.single_node.call(null,content));
});
/**
* Sets the value of all the nodes (presumably form fields) in the given content.
*/
domina.set_value_BANG_ = (function set_value_BANG_(content,value){
var seq__5104_5108 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__5105_5109 = null;
var count__5106_5110 = 0;
var i__5107_5111 = 0;
while(true){
if((i__5107_5111 < count__5106_5110))
{var node_5112 = cljs.core._nth.call(null,chunk__5105_5109,i__5107_5111);
goog.dom.forms.setValue(node_5112,value);
{
var G__5113 = seq__5104_5108;
var G__5114 = chunk__5105_5109;
var G__5115 = count__5106_5110;
var G__5116 = (i__5107_5111 + 1);
seq__5104_5108 = G__5113;
chunk__5105_5109 = G__5114;
count__5106_5110 = G__5115;
i__5107_5111 = G__5116;
continue;
}
} else
{var temp__4092__auto___5117 = cljs.core.seq.call(null,seq__5104_5108);
if(temp__4092__auto___5117)
{var seq__5104_5118__$1 = temp__4092__auto___5117;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5104_5118__$1))
{var c__3039__auto___5119 = cljs.core.chunk_first.call(null,seq__5104_5118__$1);
{
var G__5120 = cljs.core.chunk_rest.call(null,seq__5104_5118__$1);
var G__5121 = c__3039__auto___5119;
var G__5122 = cljs.core.count.call(null,c__3039__auto___5119);
var G__5123 = 0;
seq__5104_5108 = G__5120;
chunk__5105_5109 = G__5121;
count__5106_5110 = G__5122;
i__5107_5111 = G__5123;
continue;
}
} else
{var node_5124 = cljs.core.first.call(null,seq__5104_5118__$1);
goog.dom.forms.setValue(node_5124,value);
{
var G__5125 = cljs.core.next.call(null,seq__5104_5118__$1);
var G__5126 = null;
var G__5127 = 0;
var G__5128 = 0;
seq__5104_5108 = G__5125;
chunk__5105_5109 = G__5126;
count__5106_5110 = G__5127;
i__5107_5111 = G__5128;
continue;
}
}
} else
{}
}
break;
}
return content;
});
/**
* Returns the innerHTML of a node. Assumes content is a single node.
*/
domina.html = (function html(content){
return domina.single_node.call(null,content).innerHTML;
});
domina.replace_children_BANG_ = (function replace_children_BANG_(content,inner_content){
return domina.append_BANG_.call(null,domina.destroy_children_BANG_.call(null,content),inner_content);
});
domina.set_inner_html_BANG_ = (function set_inner_html_BANG_(content,html_string){
var allows_inner_html_QMARK_ = cljs.core.not.call(null,cljs.core.re_find.call(null,domina.re_no_inner_html,html_string));
var leading_whitespace_QMARK_ = cljs.core.re_find.call(null,domina.re_leading_whitespace,html_string);
var tag_name = [cljs.core.str(cljs.core.second.call(null,cljs.core.re_find.call(null,domina.re_tag_name,html_string)))].join('').toLowerCase();
var special_tag_QMARK_ = cljs.core.contains_QMARK_.call(null,domina.wrap_map,tag_name);
if(cljs.core.truth_((function (){var and__3941__auto__ = allows_inner_html_QMARK_;
if(and__3941__auto__)
{var and__3941__auto____$1 = (function (){var or__3943__auto__ = domina.support.leading_whitespace_QMARK_;
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return cljs.core.not.call(null,leading_whitespace_QMARK_);
}
})();
if(cljs.core.truth_(and__3941__auto____$1))
{return !(special_tag_QMARK_);
} else
{return and__3941__auto____$1;
}
} else
{return and__3941__auto__;
}
})()))
{var value_5139 = clojure.string.replace.call(null,html_string,domina.re_xhtml_tag,"<$1></$2>");
try{var seq__5135_5140 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__5136_5141 = null;
var count__5137_5142 = 0;
var i__5138_5143 = 0;
while(true){
if((i__5138_5143 < count__5137_5142))
{var node_5144 = cljs.core._nth.call(null,chunk__5136_5141,i__5138_5143);
goog.events.removeAll(node_5144);
node_5144.innerHTML = value_5139;
{
var G__5145 = seq__5135_5140;
var G__5146 = chunk__5136_5141;
var G__5147 = count__5137_5142;
var G__5148 = (i__5138_5143 + 1);
seq__5135_5140 = G__5145;
chunk__5136_5141 = G__5146;
count__5137_5142 = G__5147;
i__5138_5143 = G__5148;
continue;
}
} else
{var temp__4092__auto___5149 = cljs.core.seq.call(null,seq__5135_5140);
if(temp__4092__auto___5149)
{var seq__5135_5150__$1 = temp__4092__auto___5149;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5135_5150__$1))
{var c__3039__auto___5151 = cljs.core.chunk_first.call(null,seq__5135_5150__$1);
{
var G__5152 = cljs.core.chunk_rest.call(null,seq__5135_5150__$1);
var G__5153 = c__3039__auto___5151;
var G__5154 = cljs.core.count.call(null,c__3039__auto___5151);
var G__5155 = 0;
seq__5135_5140 = G__5152;
chunk__5136_5141 = G__5153;
count__5137_5142 = G__5154;
i__5138_5143 = G__5155;
continue;
}
} else
{var node_5156 = cljs.core.first.call(null,seq__5135_5150__$1);
goog.events.removeAll(node_5156);
node_5156.innerHTML = value_5139;
{
var G__5157 = cljs.core.next.call(null,seq__5135_5150__$1);
var G__5158 = null;
var G__5159 = 0;
var G__5160 = 0;
seq__5135_5140 = G__5157;
chunk__5136_5141 = G__5158;
count__5137_5142 = G__5159;
i__5138_5143 = G__5160;
continue;
}
}
} else
{}
}
break;
}
}catch (e5134){if((e5134 instanceof Error))
{var e_5161 = e5134;
domina.replace_children_BANG_.call(null,content,value_5139);
} else
{if("\uFDD0:else")
{throw e5134;
} else
{}
}
}} else
{domina.replace_children_BANG_.call(null,content,html_string);
}
return content;
});
/**
* Sets the innerHTML value for all the nodes in the given content.
*/
domina.set_html_BANG_ = (function set_html_BANG_(content,inner_content){
if(cljs.core.string_QMARK_.call(null,inner_content))
{return domina.set_inner_html_BANG_.call(null,content,inner_content);
} else
{return domina.replace_children_BANG_.call(null,content,inner_content);
}
});
/**
* Returns data associated with a node for a given key. Assumes
* content is a single node. If the bubble parameter is set to true,
* will search parent nodes if the key is not found.
*/
domina.get_data = (function() {
var get_data = null;
var get_data__2 = (function (node,key){
return get_data.call(null,node,key,false);
});
var get_data__3 = (function (node,key,bubble){
var m = domina.single_node.call(null,node).__domina_data;
var value = (cljs.core.truth_(m)?cljs.core.get.call(null,m,key):null);
if(cljs.core.truth_((function (){var and__3941__auto__ = bubble;
if(cljs.core.truth_(and__3941__auto__))
{return (value == null);
} else
{return and__3941__auto__;
}
})()))
{var temp__4092__auto__ = domina.single_node.call(null,node).parentNode;
if(cljs.core.truth_(temp__4092__auto__))
{var parent = temp__4092__auto__;
return get_data.call(null,parent,key,true);
} else
{return null;
}
} else
{return value;
}
});
get_data = function(node,key,bubble){
switch(arguments.length){
case 2:
return get_data__2.call(this,node,key);
case 3:
return get_data__3.call(this,node,key,bubble);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
get_data.cljs$core$IFn$_invoke$arity$2 = get_data__2;
get_data.cljs$core$IFn$_invoke$arity$3 = get_data__3;
return get_data;
})()
;
/**
* Sets a data on the node for a given key. Assumes content is a
* single node. Data should be ClojureScript values and data structures
* only; using other objects as data may result in memory leaks on some
* browsers.
*/
domina.set_data_BANG_ = (function set_data_BANG_(node,key,value){
var m = (function (){var or__3943__auto__ = domina.single_node.call(null,node).__domina_data;
if(cljs.core.truth_(or__3943__auto__))
{return or__3943__auto__;
} else
{return cljs.core.PersistentArrayMap.EMPTY;
}
})();
return domina.single_node.call(null,node).__domina_data = cljs.core.assoc.call(null,m,key,value);
});
/**
* Takes a two-arg function, a reference DomContent and new
* DomContent. Applies the function for each reference / content
* combination. Uses clones of the new content for each additional
* parent after the first.
*/
domina.apply_with_cloning = (function apply_with_cloning(f,parent_content,child_content){
var parents = domina.nodes.call(null,parent_content);
var children = domina.nodes.call(null,child_content);
var first_child = (function (){var frag = document.createDocumentFragment();
var seq__5168_5172 = cljs.core.seq.call(null,children);
var chunk__5169_5173 = null;
var count__5170_5174 = 0;
var i__5171_5175 = 0;
while(true){
if((i__5171_5175 < count__5170_5174))
{var child_5176 = cljs.core._nth.call(null,chunk__5169_5173,i__5171_5175);
frag.appendChild(child_5176);
{
var G__5177 = seq__5168_5172;
var G__5178 = chunk__5169_5173;
var G__5179 = count__5170_5174;
var G__5180 = (i__5171_5175 + 1);
seq__5168_5172 = G__5177;
chunk__5169_5173 = G__5178;
count__5170_5174 = G__5179;
i__5171_5175 = G__5180;
continue;
}
} else
{var temp__4092__auto___5181 = cljs.core.seq.call(null,seq__5168_5172);
if(temp__4092__auto___5181)
{var seq__5168_5182__$1 = temp__4092__auto___5181;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5168_5182__$1))
{var c__3039__auto___5183 = cljs.core.chunk_first.call(null,seq__5168_5182__$1);
{
var G__5184 = cljs.core.chunk_rest.call(null,seq__5168_5182__$1);
var G__5185 = c__3039__auto___5183;
var G__5186 = cljs.core.count.call(null,c__3039__auto___5183);
var G__5187 = 0;
seq__5168_5172 = G__5184;
chunk__5169_5173 = G__5185;
count__5170_5174 = G__5186;
i__5171_5175 = G__5187;
continue;
}
} else
{var child_5188 = cljs.core.first.call(null,seq__5168_5182__$1);
frag.appendChild(child_5188);
{
var G__5189 = cljs.core.next.call(null,seq__5168_5182__$1);
var G__5190 = null;
var G__5191 = 0;
var G__5192 = 0;
seq__5168_5172 = G__5189;
chunk__5169_5173 = G__5190;
count__5170_5174 = G__5191;
i__5171_5175 = G__5192;
continue;
}
}
} else
{}
}
break;
}
return frag;
})();
var other_children = cljs.core.doall.call(null,cljs.core.repeatedly.call(null,(cljs.core.count.call(null,parents) - 1),((function (parents,children,first_child){
return (function (){
return first_child.cloneNode(true);
});})(parents,children,first_child))
));
if(cljs.core.seq.call(null,parents))
{f.call(null,cljs.core.first.call(null,parents),first_child);
return cljs.core.doall.call(null,cljs.core.map.call(null,(function (p1__5162_SHARP_,p2__5163_SHARP_){
return f.call(null,p1__5162_SHARP_,p2__5163_SHARP_);
}),cljs.core.rest.call(null,parents),other_children));
} else
{return null;
}
});
domina.lazy_nl_via_item = (function() {
var lazy_nl_via_item = null;
var lazy_nl_via_item__1 = (function (nl){
return lazy_nl_via_item.call(null,nl,0);
});
var lazy_nl_via_item__2 = (function (nl,n){
if((n < nl.length))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,nl.item(n),lazy_nl_via_item.call(null,nl,(n + 1)));
}),null));
} else
{return null;
}
});
lazy_nl_via_item = function(nl,n){
switch(arguments.length){
case 1:
return lazy_nl_via_item__1.call(this,nl);
case 2:
return lazy_nl_via_item__2.call(this,nl,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lazy_nl_via_item.cljs$core$IFn$_invoke$arity$1 = lazy_nl_via_item__1;
lazy_nl_via_item.cljs$core$IFn$_invoke$arity$2 = lazy_nl_via_item__2;
return lazy_nl_via_item;
})()
;
domina.lazy_nl_via_array_ref = (function() {
var lazy_nl_via_array_ref = null;
var lazy_nl_via_array_ref__1 = (function (nl){
return lazy_nl_via_array_ref.call(null,nl,0);
});
var lazy_nl_via_array_ref__2 = (function (nl,n){
if((n < nl.length))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,(nl[n]),lazy_nl_via_array_ref.call(null,nl,(n + 1)));
}),null));
} else
{return null;
}
});
lazy_nl_via_array_ref = function(nl,n){
switch(arguments.length){
case 1:
return lazy_nl_via_array_ref__1.call(this,nl);
case 2:
return lazy_nl_via_array_ref__2.call(this,nl,n);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
lazy_nl_via_array_ref.cljs$core$IFn$_invoke$arity$1 = lazy_nl_via_array_ref__1;
lazy_nl_via_array_ref.cljs$core$IFn$_invoke$arity$2 = lazy_nl_via_array_ref__2;
return lazy_nl_via_array_ref;
})()
;
/**
* A lazy seq view of a js/NodeList, or other array-like javascript things
*/
domina.lazy_nodelist = (function lazy_nodelist(nl){
if(cljs.core.truth_(nl.item))
{return domina.lazy_nl_via_item.call(null,nl);
} else
{return domina.lazy_nl_via_array_ref.call(null,nl);
}
});
domina.array_like_QMARK_ = (function array_like_QMARK_(obj){
var and__3941__auto__ = obj;
if(cljs.core.truth_(and__3941__auto__))
{return obj.length;
} else
{return and__3941__auto__;
}
});
/**
* Some versions of IE have things that are like arrays in that they
* respond to .length, but are not arrays nor NodeSets. This returns a
* real sequence view of such objects. If passed an object that is not
* a logical sequence at all, returns a single-item seq containing the
* object.
*/
domina.normalize_seq = (function normalize_seq(list_thing){
if((list_thing == null))
{return cljs.core.List.EMPTY;
} else
{if((function (){var G__5194 = list_thing;
if(G__5194)
{if((function (){var or__3943__auto__ = (G__5194.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__5194.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__5194.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5194);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5194);
}
})())
{return cljs.core.seq.call(null,list_thing);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,list_thing)))
{return domina.lazy_nodelist.call(null,list_thing);
} else
{if("\uFDD0:default")
{return cljs.core.seq.call(null,cljs.core.PersistentVector.fromArray([list_thing], true));
} else
{return null;
}
}
}
}
});
(domina.DomContent["_"] = true);
(domina.nodes["_"] = (function (content){
if((content == null))
{return cljs.core.List.EMPTY;
} else
{if((function (){var G__5195 = content;
if(G__5195)
{if((function (){var or__3943__auto__ = (G__5195.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__5195.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__5195.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5195);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5195);
}
})())
{return cljs.core.seq.call(null,content);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,content)))
{return domina.lazy_nodelist.call(null,content);
} else
{if("\uFDD0:default")
{return cljs.core.seq.call(null,cljs.core.PersistentVector.fromArray([content], true));
} else
{return null;
}
}
}
}
}));
(domina.single_node["_"] = (function (content){
if((content == null))
{return null;
} else
{if((function (){var G__5196 = content;
if(G__5196)
{if((function (){var or__3943__auto__ = (G__5196.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__5196.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__5196.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5196);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5196);
}
})())
{return cljs.core.first.call(null,content);
} else
{if(cljs.core.truth_(domina.array_like_QMARK_.call(null,content)))
{return content.item(0);
} else
{if("\uFDD0:default")
{return content;
} else
{return null;
}
}
}
}
}));
(domina.DomContent["string"] = true);
(domina.nodes["string"] = (function (s){
return cljs.core.doall.call(null,domina.nodes.call(null,domina.string_to_dom.call(null,s)));
}));
(domina.single_node["string"] = (function (s){
return domina.single_node.call(null,domina.string_to_dom.call(null,s));
}));
if(cljs.core.truth_((typeof NodeList != 'undefined')))
{NodeList.prototype.cljs$core$ISeqable$ = true;
NodeList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (nodelist){
return domina.lazy_nodelist.call(null,nodelist);
});
NodeList.prototype.cljs$core$IIndexed$ = true;
NodeList.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (nodelist,n){
return nodelist.item(n);
});
NodeList.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (nodelist,n,not_found){
if((nodelist.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,nodelist,n);
}
});
NodeList.prototype.cljs$core$ICounted$ = true;
NodeList.prototype.cljs$core$ICounted$_count$arity$1 = (function (nodelist){
return nodelist.length;
});
} else
{}
if(cljs.core.truth_((typeof StaticNodeList != 'undefined')))
{StaticNodeList.prototype.cljs$core$ISeqable$ = true;
StaticNodeList.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (nodelist){
return domina.lazy_nodelist.call(null,nodelist);
});
StaticNodeList.prototype.cljs$core$IIndexed$ = true;
StaticNodeList.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (nodelist,n){
return nodelist.item(n);
});
StaticNodeList.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (nodelist,n,not_found){
if((nodelist.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,nodelist,n);
}
});
StaticNodeList.prototype.cljs$core$ICounted$ = true;
StaticNodeList.prototype.cljs$core$ICounted$_count$arity$1 = (function (nodelist){
return nodelist.length;
});
} else
{}
if(cljs.core.truth_((typeof HTMLCollection != 'undefined')))
{HTMLCollection.prototype.cljs$core$ISeqable$ = true;
HTMLCollection.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (coll){
return domina.lazy_nodelist.call(null,coll);
});
HTMLCollection.prototype.cljs$core$IIndexed$ = true;
HTMLCollection.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (coll,n){
return coll.item(n);
});
HTMLCollection.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (coll,n,not_found){
if((coll.length <= n))
{return not_found;
} else
{return cljs.core.nth.call(null,coll,n);
}
});
HTMLCollection.prototype.cljs$core$ICounted$ = true;
HTMLCollection.prototype.cljs$core$ICounted$_count$arity$1 = (function (coll){
return coll.length;
});
} else
{}
