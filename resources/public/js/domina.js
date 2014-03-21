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
var opt_wrapper_4782 = cljs.core.PersistentVector.fromArray([1,"<select multiple='multiple'>","</select>"], true);
var table_section_wrapper_4783 = cljs.core.PersistentVector.fromArray([1,"<table>","</table>"], true);
var cell_wrapper_4784 = cljs.core.PersistentVector.fromArray([3,"<table><tbody><tr>","</tr></tbody></table>"], true);
domina.wrap_map = cljs.core.PersistentHashMap.fromArrays(["col","\uFDD0:default","tfoot","caption","optgroup","legend","area","td","thead","th","option","tbody","tr","colgroup"],[cljs.core.PersistentVector.fromArray([2,"<table><tbody></tbody><colgroup>","</colgroup></table>"], true),cljs.core.PersistentVector.fromArray([0,"",""], true),table_section_wrapper_4783,table_section_wrapper_4783,opt_wrapper_4782,cljs.core.PersistentVector.fromArray([1,"<fieldset>","</fieldset>"], true),cljs.core.PersistentVector.fromArray([1,"<map>","</map>"], true),cell_wrapper_4784,table_section_wrapper_4783,cell_wrapper_4784,opt_wrapper_4782,table_section_wrapper_4783,cljs.core.PersistentVector.fromArray([2,"<table><tbody>","</tbody></table>"], true),table_section_wrapper_4783]);
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
var seq__4789 = cljs.core.seq.call(null,tbody);
var chunk__4790 = null;
var count__4791 = 0;
var i__4792 = 0;
while(true){
if((i__4792 < count__4791))
{var child = cljs.core._nth.call(null,chunk__4790,i__4792);
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
var G__4793 = seq__4789;
var G__4794 = chunk__4790;
var G__4795 = count__4791;
var G__4796 = (i__4792 + 1);
seq__4789 = G__4793;
chunk__4790 = G__4794;
count__4791 = G__4795;
i__4792 = G__4796;
continue;
}
} else
{var temp__4092__auto__ = cljs.core.seq.call(null,seq__4789);
if(temp__4092__auto__)
{var seq__4789__$1 = temp__4092__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4789__$1))
{var c__3049__auto__ = cljs.core.chunk_first.call(null,seq__4789__$1);
{
var G__4797 = cljs.core.chunk_rest.call(null,seq__4789__$1);
var G__4798 = c__3049__auto__;
var G__4799 = cljs.core.count.call(null,c__3049__auto__);
var G__4800 = 0;
seq__4789 = G__4797;
chunk__4790 = G__4798;
count__4791 = G__4799;
i__4792 = G__4800;
continue;
}
} else
{var child = cljs.core.first.call(null,seq__4789__$1);
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
var G__4801 = cljs.core.next.call(null,seq__4789__$1);
var G__4802 = null;
var G__4803 = 0;
var G__4804 = 0;
seq__4789 = G__4801;
chunk__4790 = G__4802;
count__4791 = G__4803;
i__4792 = G__4804;
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
var vec__4806 = cljs.core.get.call(null,domina.wrap_map,tag_name,(new cljs.core.Keyword("\uFDD0:default")).call(null,domina.wrap_map));
var depth = cljs.core.nth.call(null,vec__4806,0,null);
var start_wrap = cljs.core.nth.call(null,vec__4806,1,null);
var end_wrap = cljs.core.nth.call(null,vec__4806,2,null);
var div = (function (){var wrapper = (function (){var div = document.createElement("div");
div.innerHTML = [cljs.core.str(start_wrap),cljs.core.str(html__$1),cljs.core.str(end_wrap)].join('');
return div;
})();
var level = depth;
while(true){
if((level > 0))
{{
var G__4807 = wrapper.lastChild;
var G__4808 = (level - 1);
wrapper = G__4807;
level = G__4808;
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
{var x__2918__auto__ = (((content == null))?null:content);
return (function (){var or__3943__auto__ = (domina.nodes[goog.typeOf(x__2918__auto__)]);
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
{var x__2918__auto__ = (((nodeseq == null))?null:nodeseq);
return (function (){var or__3943__auto__ = (domina.single_node[goog.typeOf(x__2918__auto__)]);
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
log_debug.cljs$lang$applyTo = (function (arglist__4809){
var mesg = cljs.core.seq(arglist__4809);
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
log.cljs$lang$applyTo = (function (arglist__4810){
var mesg = cljs.core.seq(arglist__4810);
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
if((void 0 === domina.t4814))
{goog.provide('domina.t4814');

/**
* @constructor
*/
domina.t4814 = (function (class_name,by_class,meta4815){
this.class_name = class_name;
this.by_class = by_class;
this.meta4815 = meta4815;
this.cljs$lang$protocol_mask$partition1$ = 0;
this.cljs$lang$protocol_mask$partition0$ = 393216;
})
domina.t4814.cljs$lang$type = true;
domina.t4814.cljs$lang$ctorStr = "domina/t4814";
domina.t4814.cljs$lang$ctorPrWriter = (function (this__2859__auto__,writer__2860__auto__,opt__2861__auto__){
return cljs.core._write.call(null,writer__2860__auto__,"domina/t4814");
});
domina.t4814.prototype.domina$DomContent$ = true;
domina.t4814.prototype.domina$DomContent$nodes$arity$1 = (function (_){
var self__ = this;
return domina.normalize_seq.call(null,goog.dom.getElementsByClass(cljs.core.name.call(null,self__.class_name)));
});
domina.t4814.prototype.domina$DomContent$single_node$arity$1 = (function (_){
var self__ = this;
return domina.normalize_seq.call(null,goog.dom.getElementByClass(cljs.core.name.call(null,self__.class_name)));
});
domina.t4814.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_4816){
var self__ = this;
return self__.meta4815;
});
domina.t4814.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_4816,meta4815__$1){
var self__ = this;
return (new domina.t4814(self__.class_name,self__.by_class,meta4815__$1));
});
domina.__GT_t4814 = (function __GT_t4814(class_name__$1,by_class__$1,meta4815){
return (new domina.t4814(class_name__$1,by_class__$1,meta4815));
});
} else
{}
return (new domina.t4814(class_name,by_class,null));
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
common_ancestor.cljs$lang$applyTo = (function (arglist__4817){
var contents = cljs.core.seq(arglist__4817);
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
return cljs.core.map.call(null,(function (p1__4818_SHARP_){
return p1__4818_SHARP_.cloneNode(true);
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
domina.apply_with_cloning.call(null,(function (p1__4819_SHARP_,p2__4820_SHARP_){
return goog.dom.insertChildAt(p1__4819_SHARP_,p2__4820_SHARP_,idx);
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
domina.apply_with_cloning.call(null,(function (p1__4822_SHARP_,p2__4821_SHARP_){
return goog.dom.insertSiblingBefore(p2__4821_SHARP_,p1__4822_SHARP_);
}),content,new_content);
return content;
});
/**
* Given a content and some new content, inserts the new content immediately after the reference content. If there is more than one node in the reference content, clones the new content for each one.
*/
domina.insert_after_BANG_ = (function insert_after_BANG_(content,new_content){
domina.apply_with_cloning.call(null,(function (p1__4824_SHARP_,p2__4823_SHARP_){
return goog.dom.insertSiblingAfter(p2__4823_SHARP_,p1__4824_SHARP_);
}),content,new_content);
return content;
});
/**
* Given some old content and some new content, replaces the old content with new content. If there are multiple nodes in the old content, replaces each of them and clones the new content as necessary.
*/
domina.swap_content_BANG_ = (function swap_content_BANG_(old_content,new_content){
domina.apply_with_cloning.call(null,(function (p1__4826_SHARP_,p2__4825_SHARP_){
return goog.dom.replaceNode(p2__4825_SHARP_,p1__4826_SHARP_);
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
var seq__4831_4835 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4832_4836 = null;
var count__4833_4837 = 0;
var i__4834_4838 = 0;
while(true){
if((i__4834_4838 < count__4833_4837))
{var n_4839 = cljs.core._nth.call(null,chunk__4832_4836,i__4834_4838);
goog.style.setStyle(n_4839,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__4840 = seq__4831_4835;
var G__4841 = chunk__4832_4836;
var G__4842 = count__4833_4837;
var G__4843 = (i__4834_4838 + 1);
seq__4831_4835 = G__4840;
chunk__4832_4836 = G__4841;
count__4833_4837 = G__4842;
i__4834_4838 = G__4843;
continue;
}
} else
{var temp__4092__auto___4844 = cljs.core.seq.call(null,seq__4831_4835);
if(temp__4092__auto___4844)
{var seq__4831_4845__$1 = temp__4092__auto___4844;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4831_4845__$1))
{var c__3049__auto___4846 = cljs.core.chunk_first.call(null,seq__4831_4845__$1);
{
var G__4847 = cljs.core.chunk_rest.call(null,seq__4831_4845__$1);
var G__4848 = c__3049__auto___4846;
var G__4849 = cljs.core.count.call(null,c__3049__auto___4846);
var G__4850 = 0;
seq__4831_4835 = G__4847;
chunk__4832_4836 = G__4848;
count__4833_4837 = G__4849;
i__4834_4838 = G__4850;
continue;
}
} else
{var n_4851 = cljs.core.first.call(null,seq__4831_4845__$1);
goog.style.setStyle(n_4851,cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__4852 = cljs.core.next.call(null,seq__4831_4845__$1);
var G__4853 = null;
var G__4854 = 0;
var G__4855 = 0;
seq__4831_4835 = G__4852;
chunk__4832_4836 = G__4853;
count__4833_4837 = G__4854;
i__4834_4838 = G__4855;
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
set_style_BANG_.cljs$lang$applyTo = (function (arglist__4856){
var content = cljs.core.first(arglist__4856);
arglist__4856 = cljs.core.next(arglist__4856);
var name = cljs.core.first(arglist__4856);
var value = cljs.core.rest(arglist__4856);
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
var seq__4861_4865 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4862_4866 = null;
var count__4863_4867 = 0;
var i__4864_4868 = 0;
while(true){
if((i__4864_4868 < count__4863_4867))
{var n_4869 = cljs.core._nth.call(null,chunk__4862_4866,i__4864_4868);
n_4869.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__4870 = seq__4861_4865;
var G__4871 = chunk__4862_4866;
var G__4872 = count__4863_4867;
var G__4873 = (i__4864_4868 + 1);
seq__4861_4865 = G__4870;
chunk__4862_4866 = G__4871;
count__4863_4867 = G__4872;
i__4864_4868 = G__4873;
continue;
}
} else
{var temp__4092__auto___4874 = cljs.core.seq.call(null,seq__4861_4865);
if(temp__4092__auto___4874)
{var seq__4861_4875__$1 = temp__4092__auto___4874;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4861_4875__$1))
{var c__3049__auto___4876 = cljs.core.chunk_first.call(null,seq__4861_4875__$1);
{
var G__4877 = cljs.core.chunk_rest.call(null,seq__4861_4875__$1);
var G__4878 = c__3049__auto___4876;
var G__4879 = cljs.core.count.call(null,c__3049__auto___4876);
var G__4880 = 0;
seq__4861_4865 = G__4877;
chunk__4862_4866 = G__4878;
count__4863_4867 = G__4879;
i__4864_4868 = G__4880;
continue;
}
} else
{var n_4881 = cljs.core.first.call(null,seq__4861_4875__$1);
n_4881.setAttribute(cljs.core.name.call(null,name),cljs.core.apply.call(null,cljs.core.str,value));
{
var G__4882 = cljs.core.next.call(null,seq__4861_4875__$1);
var G__4883 = null;
var G__4884 = 0;
var G__4885 = 0;
seq__4861_4865 = G__4882;
chunk__4862_4866 = G__4883;
count__4863_4867 = G__4884;
i__4864_4868 = G__4885;
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
set_attr_BANG_.cljs$lang$applyTo = (function (arglist__4886){
var content = cljs.core.first(arglist__4886);
arglist__4886 = cljs.core.next(arglist__4886);
var name = cljs.core.first(arglist__4886);
var value = cljs.core.rest(arglist__4886);
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
var seq__4891_4895 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4892_4896 = null;
var count__4893_4897 = 0;
var i__4894_4898 = 0;
while(true){
if((i__4894_4898 < count__4893_4897))
{var n_4899 = cljs.core._nth.call(null,chunk__4892_4896,i__4894_4898);
n_4899.removeAttribute(cljs.core.name.call(null,name));
{
var G__4900 = seq__4891_4895;
var G__4901 = chunk__4892_4896;
var G__4902 = count__4893_4897;
var G__4903 = (i__4894_4898 + 1);
seq__4891_4895 = G__4900;
chunk__4892_4896 = G__4901;
count__4893_4897 = G__4902;
i__4894_4898 = G__4903;
continue;
}
} else
{var temp__4092__auto___4904 = cljs.core.seq.call(null,seq__4891_4895);
if(temp__4092__auto___4904)
{var seq__4891_4905__$1 = temp__4092__auto___4904;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4891_4905__$1))
{var c__3049__auto___4906 = cljs.core.chunk_first.call(null,seq__4891_4905__$1);
{
var G__4907 = cljs.core.chunk_rest.call(null,seq__4891_4905__$1);
var G__4908 = c__3049__auto___4906;
var G__4909 = cljs.core.count.call(null,c__3049__auto___4906);
var G__4910 = 0;
seq__4891_4895 = G__4907;
chunk__4892_4896 = G__4908;
count__4893_4897 = G__4909;
i__4894_4898 = G__4910;
continue;
}
} else
{var n_4911 = cljs.core.first.call(null,seq__4891_4905__$1);
n_4911.removeAttribute(cljs.core.name.call(null,name));
{
var G__4912 = cljs.core.next.call(null,seq__4891_4905__$1);
var G__4913 = null;
var G__4914 = 0;
var G__4915 = 0;
seq__4891_4895 = G__4912;
chunk__4892_4896 = G__4913;
count__4893_4897 = G__4914;
i__4894_4898 = G__4915;
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
var vec__4917 = pair.split(/\s*:\s*/);
var k = cljs.core.nth.call(null,vec__4917,0,null);
var v = cljs.core.nth.call(null,vec__4917,1,null);
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
return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.filter.call(null,cljs.core.complement.call(null,cljs.core.nil_QMARK_),cljs.core.map.call(null,(function (p1__4918_SHARP_){
var attr = attrs__$1.item(p1__4918_SHARP_);
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
var seq__4925_4931 = cljs.core.seq.call(null,styles);
var chunk__4926_4932 = null;
var count__4927_4933 = 0;
var i__4928_4934 = 0;
while(true){
if((i__4928_4934 < count__4927_4933))
{var vec__4929_4935 = cljs.core._nth.call(null,chunk__4926_4932,i__4928_4934);
var name_4936 = cljs.core.nth.call(null,vec__4929_4935,0,null);
var value_4937 = cljs.core.nth.call(null,vec__4929_4935,1,null);
domina.set_style_BANG_.call(null,content,name_4936,value_4937);
{
var G__4938 = seq__4925_4931;
var G__4939 = chunk__4926_4932;
var G__4940 = count__4927_4933;
var G__4941 = (i__4928_4934 + 1);
seq__4925_4931 = G__4938;
chunk__4926_4932 = G__4939;
count__4927_4933 = G__4940;
i__4928_4934 = G__4941;
continue;
}
} else
{var temp__4092__auto___4942 = cljs.core.seq.call(null,seq__4925_4931);
if(temp__4092__auto___4942)
{var seq__4925_4943__$1 = temp__4092__auto___4942;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4925_4943__$1))
{var c__3049__auto___4944 = cljs.core.chunk_first.call(null,seq__4925_4943__$1);
{
var G__4945 = cljs.core.chunk_rest.call(null,seq__4925_4943__$1);
var G__4946 = c__3049__auto___4944;
var G__4947 = cljs.core.count.call(null,c__3049__auto___4944);
var G__4948 = 0;
seq__4925_4931 = G__4945;
chunk__4926_4932 = G__4946;
count__4927_4933 = G__4947;
i__4928_4934 = G__4948;
continue;
}
} else
{var vec__4930_4949 = cljs.core.first.call(null,seq__4925_4943__$1);
var name_4950 = cljs.core.nth.call(null,vec__4930_4949,0,null);
var value_4951 = cljs.core.nth.call(null,vec__4930_4949,1,null);
domina.set_style_BANG_.call(null,content,name_4950,value_4951);
{
var G__4952 = cljs.core.next.call(null,seq__4925_4943__$1);
var G__4953 = null;
var G__4954 = 0;
var G__4955 = 0;
seq__4925_4931 = G__4952;
chunk__4926_4932 = G__4953;
count__4927_4933 = G__4954;
i__4928_4934 = G__4955;
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
var seq__4962_4968 = cljs.core.seq.call(null,attrs);
var chunk__4963_4969 = null;
var count__4964_4970 = 0;
var i__4965_4971 = 0;
while(true){
if((i__4965_4971 < count__4964_4970))
{var vec__4966_4972 = cljs.core._nth.call(null,chunk__4963_4969,i__4965_4971);
var name_4973 = cljs.core.nth.call(null,vec__4966_4972,0,null);
var value_4974 = cljs.core.nth.call(null,vec__4966_4972,1,null);
domina.set_attr_BANG_.call(null,content,name_4973,value_4974);
{
var G__4975 = seq__4962_4968;
var G__4976 = chunk__4963_4969;
var G__4977 = count__4964_4970;
var G__4978 = (i__4965_4971 + 1);
seq__4962_4968 = G__4975;
chunk__4963_4969 = G__4976;
count__4964_4970 = G__4977;
i__4965_4971 = G__4978;
continue;
}
} else
{var temp__4092__auto___4979 = cljs.core.seq.call(null,seq__4962_4968);
if(temp__4092__auto___4979)
{var seq__4962_4980__$1 = temp__4092__auto___4979;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4962_4980__$1))
{var c__3049__auto___4981 = cljs.core.chunk_first.call(null,seq__4962_4980__$1);
{
var G__4982 = cljs.core.chunk_rest.call(null,seq__4962_4980__$1);
var G__4983 = c__3049__auto___4981;
var G__4984 = cljs.core.count.call(null,c__3049__auto___4981);
var G__4985 = 0;
seq__4962_4968 = G__4982;
chunk__4963_4969 = G__4983;
count__4964_4970 = G__4984;
i__4965_4971 = G__4985;
continue;
}
} else
{var vec__4967_4986 = cljs.core.first.call(null,seq__4962_4980__$1);
var name_4987 = cljs.core.nth.call(null,vec__4967_4986,0,null);
var value_4988 = cljs.core.nth.call(null,vec__4967_4986,1,null);
domina.set_attr_BANG_.call(null,content,name_4987,value_4988);
{
var G__4989 = cljs.core.next.call(null,seq__4962_4980__$1);
var G__4990 = null;
var G__4991 = 0;
var G__4992 = 0;
seq__4962_4968 = G__4989;
chunk__4963_4969 = G__4990;
count__4964_4970 = G__4991;
i__4965_4971 = G__4992;
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
var seq__4997_5001 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__4998_5002 = null;
var count__4999_5003 = 0;
var i__5000_5004 = 0;
while(true){
if((i__5000_5004 < count__4999_5003))
{var node_5005 = cljs.core._nth.call(null,chunk__4998_5002,i__5000_5004);
goog.dom.classes.add(node_5005,class$);
{
var G__5006 = seq__4997_5001;
var G__5007 = chunk__4998_5002;
var G__5008 = count__4999_5003;
var G__5009 = (i__5000_5004 + 1);
seq__4997_5001 = G__5006;
chunk__4998_5002 = G__5007;
count__4999_5003 = G__5008;
i__5000_5004 = G__5009;
continue;
}
} else
{var temp__4092__auto___5010 = cljs.core.seq.call(null,seq__4997_5001);
if(temp__4092__auto___5010)
{var seq__4997_5011__$1 = temp__4092__auto___5010;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__4997_5011__$1))
{var c__3049__auto___5012 = cljs.core.chunk_first.call(null,seq__4997_5011__$1);
{
var G__5013 = cljs.core.chunk_rest.call(null,seq__4997_5011__$1);
var G__5014 = c__3049__auto___5012;
var G__5015 = cljs.core.count.call(null,c__3049__auto___5012);
var G__5016 = 0;
seq__4997_5001 = G__5013;
chunk__4998_5002 = G__5014;
count__4999_5003 = G__5015;
i__5000_5004 = G__5016;
continue;
}
} else
{var node_5017 = cljs.core.first.call(null,seq__4997_5011__$1);
goog.dom.classes.add(node_5017,class$);
{
var G__5018 = cljs.core.next.call(null,seq__4997_5011__$1);
var G__5019 = null;
var G__5020 = 0;
var G__5021 = 0;
seq__4997_5001 = G__5018;
chunk__4998_5002 = G__5019;
count__4999_5003 = G__5020;
i__5000_5004 = G__5021;
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
var seq__5026_5030 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__5027_5031 = null;
var count__5028_5032 = 0;
var i__5029_5033 = 0;
while(true){
if((i__5029_5033 < count__5028_5032))
{var node_5034 = cljs.core._nth.call(null,chunk__5027_5031,i__5029_5033);
goog.dom.classes.remove(node_5034,class$);
{
var G__5035 = seq__5026_5030;
var G__5036 = chunk__5027_5031;
var G__5037 = count__5028_5032;
var G__5038 = (i__5029_5033 + 1);
seq__5026_5030 = G__5035;
chunk__5027_5031 = G__5036;
count__5028_5032 = G__5037;
i__5029_5033 = G__5038;
continue;
}
} else
{var temp__4092__auto___5039 = cljs.core.seq.call(null,seq__5026_5030);
if(temp__4092__auto___5039)
{var seq__5026_5040__$1 = temp__4092__auto___5039;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5026_5040__$1))
{var c__3049__auto___5041 = cljs.core.chunk_first.call(null,seq__5026_5040__$1);
{
var G__5042 = cljs.core.chunk_rest.call(null,seq__5026_5040__$1);
var G__5043 = c__3049__auto___5041;
var G__5044 = cljs.core.count.call(null,c__3049__auto___5041);
var G__5045 = 0;
seq__5026_5030 = G__5042;
chunk__5027_5031 = G__5043;
count__5028_5032 = G__5044;
i__5029_5033 = G__5045;
continue;
}
} else
{var node_5046 = cljs.core.first.call(null,seq__5026_5040__$1);
goog.dom.classes.remove(node_5046,class$);
{
var G__5047 = cljs.core.next.call(null,seq__5026_5040__$1);
var G__5048 = null;
var G__5049 = 0;
var G__5050 = 0;
seq__5026_5030 = G__5047;
chunk__5027_5031 = G__5048;
count__5028_5032 = G__5049;
i__5029_5033 = G__5050;
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
var classes_5059__$1 = ((cljs.core.coll_QMARK_.call(null,classes))?clojure.string.join.call(null," ",classes):classes);
var seq__5055_5060 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__5056_5061 = null;
var count__5057_5062 = 0;
var i__5058_5063 = 0;
while(true){
if((i__5058_5063 < count__5057_5062))
{var node_5064 = cljs.core._nth.call(null,chunk__5056_5061,i__5058_5063);
goog.dom.classes.set(node_5064,classes_5059__$1);
{
var G__5065 = seq__5055_5060;
var G__5066 = chunk__5056_5061;
var G__5067 = count__5057_5062;
var G__5068 = (i__5058_5063 + 1);
seq__5055_5060 = G__5065;
chunk__5056_5061 = G__5066;
count__5057_5062 = G__5067;
i__5058_5063 = G__5068;
continue;
}
} else
{var temp__4092__auto___5069 = cljs.core.seq.call(null,seq__5055_5060);
if(temp__4092__auto___5069)
{var seq__5055_5070__$1 = temp__4092__auto___5069;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5055_5070__$1))
{var c__3049__auto___5071 = cljs.core.chunk_first.call(null,seq__5055_5070__$1);
{
var G__5072 = cljs.core.chunk_rest.call(null,seq__5055_5070__$1);
var G__5073 = c__3049__auto___5071;
var G__5074 = cljs.core.count.call(null,c__3049__auto___5071);
var G__5075 = 0;
seq__5055_5060 = G__5072;
chunk__5056_5061 = G__5073;
count__5057_5062 = G__5074;
i__5058_5063 = G__5075;
continue;
}
} else
{var node_5076 = cljs.core.first.call(null,seq__5055_5070__$1);
goog.dom.classes.set(node_5076,classes_5059__$1);
{
var G__5077 = cljs.core.next.call(null,seq__5055_5070__$1);
var G__5078 = null;
var G__5079 = 0;
var G__5080 = 0;
seq__5055_5060 = G__5077;
chunk__5056_5061 = G__5078;
count__5057_5062 = G__5079;
i__5058_5063 = G__5080;
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
var seq__5085_5089 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__5086_5090 = null;
var count__5087_5091 = 0;
var i__5088_5092 = 0;
while(true){
if((i__5088_5092 < count__5087_5091))
{var node_5093 = cljs.core._nth.call(null,chunk__5086_5090,i__5088_5092);
goog.dom.setTextContent(node_5093,value);
{
var G__5094 = seq__5085_5089;
var G__5095 = chunk__5086_5090;
var G__5096 = count__5087_5091;
var G__5097 = (i__5088_5092 + 1);
seq__5085_5089 = G__5094;
chunk__5086_5090 = G__5095;
count__5087_5091 = G__5096;
i__5088_5092 = G__5097;
continue;
}
} else
{var temp__4092__auto___5098 = cljs.core.seq.call(null,seq__5085_5089);
if(temp__4092__auto___5098)
{var seq__5085_5099__$1 = temp__4092__auto___5098;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5085_5099__$1))
{var c__3049__auto___5100 = cljs.core.chunk_first.call(null,seq__5085_5099__$1);
{
var G__5101 = cljs.core.chunk_rest.call(null,seq__5085_5099__$1);
var G__5102 = c__3049__auto___5100;
var G__5103 = cljs.core.count.call(null,c__3049__auto___5100);
var G__5104 = 0;
seq__5085_5089 = G__5101;
chunk__5086_5090 = G__5102;
count__5087_5091 = G__5103;
i__5088_5092 = G__5104;
continue;
}
} else
{var node_5105 = cljs.core.first.call(null,seq__5085_5099__$1);
goog.dom.setTextContent(node_5105,value);
{
var G__5106 = cljs.core.next.call(null,seq__5085_5099__$1);
var G__5107 = null;
var G__5108 = 0;
var G__5109 = 0;
seq__5085_5089 = G__5106;
chunk__5086_5090 = G__5107;
count__5087_5091 = G__5108;
i__5088_5092 = G__5109;
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
var seq__5114_5118 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__5115_5119 = null;
var count__5116_5120 = 0;
var i__5117_5121 = 0;
while(true){
if((i__5117_5121 < count__5116_5120))
{var node_5122 = cljs.core._nth.call(null,chunk__5115_5119,i__5117_5121);
goog.dom.forms.setValue(node_5122,value);
{
var G__5123 = seq__5114_5118;
var G__5124 = chunk__5115_5119;
var G__5125 = count__5116_5120;
var G__5126 = (i__5117_5121 + 1);
seq__5114_5118 = G__5123;
chunk__5115_5119 = G__5124;
count__5116_5120 = G__5125;
i__5117_5121 = G__5126;
continue;
}
} else
{var temp__4092__auto___5127 = cljs.core.seq.call(null,seq__5114_5118);
if(temp__4092__auto___5127)
{var seq__5114_5128__$1 = temp__4092__auto___5127;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5114_5128__$1))
{var c__3049__auto___5129 = cljs.core.chunk_first.call(null,seq__5114_5128__$1);
{
var G__5130 = cljs.core.chunk_rest.call(null,seq__5114_5128__$1);
var G__5131 = c__3049__auto___5129;
var G__5132 = cljs.core.count.call(null,c__3049__auto___5129);
var G__5133 = 0;
seq__5114_5118 = G__5130;
chunk__5115_5119 = G__5131;
count__5116_5120 = G__5132;
i__5117_5121 = G__5133;
continue;
}
} else
{var node_5134 = cljs.core.first.call(null,seq__5114_5128__$1);
goog.dom.forms.setValue(node_5134,value);
{
var G__5135 = cljs.core.next.call(null,seq__5114_5128__$1);
var G__5136 = null;
var G__5137 = 0;
var G__5138 = 0;
seq__5114_5118 = G__5135;
chunk__5115_5119 = G__5136;
count__5116_5120 = G__5137;
i__5117_5121 = G__5138;
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
{var value_5149 = clojure.string.replace.call(null,html_string,domina.re_xhtml_tag,"<$1></$2>");
try{var seq__5145_5150 = cljs.core.seq.call(null,domina.nodes.call(null,content));
var chunk__5146_5151 = null;
var count__5147_5152 = 0;
var i__5148_5153 = 0;
while(true){
if((i__5148_5153 < count__5147_5152))
{var node_5154 = cljs.core._nth.call(null,chunk__5146_5151,i__5148_5153);
goog.events.removeAll(node_5154);
node_5154.innerHTML = value_5149;
{
var G__5155 = seq__5145_5150;
var G__5156 = chunk__5146_5151;
var G__5157 = count__5147_5152;
var G__5158 = (i__5148_5153 + 1);
seq__5145_5150 = G__5155;
chunk__5146_5151 = G__5156;
count__5147_5152 = G__5157;
i__5148_5153 = G__5158;
continue;
}
} else
{var temp__4092__auto___5159 = cljs.core.seq.call(null,seq__5145_5150);
if(temp__4092__auto___5159)
{var seq__5145_5160__$1 = temp__4092__auto___5159;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5145_5160__$1))
{var c__3049__auto___5161 = cljs.core.chunk_first.call(null,seq__5145_5160__$1);
{
var G__5162 = cljs.core.chunk_rest.call(null,seq__5145_5160__$1);
var G__5163 = c__3049__auto___5161;
var G__5164 = cljs.core.count.call(null,c__3049__auto___5161);
var G__5165 = 0;
seq__5145_5150 = G__5162;
chunk__5146_5151 = G__5163;
count__5147_5152 = G__5164;
i__5148_5153 = G__5165;
continue;
}
} else
{var node_5166 = cljs.core.first.call(null,seq__5145_5160__$1);
goog.events.removeAll(node_5166);
node_5166.innerHTML = value_5149;
{
var G__5167 = cljs.core.next.call(null,seq__5145_5160__$1);
var G__5168 = null;
var G__5169 = 0;
var G__5170 = 0;
seq__5145_5150 = G__5167;
chunk__5146_5151 = G__5168;
count__5147_5152 = G__5169;
i__5148_5153 = G__5170;
continue;
}
}
} else
{}
}
break;
}
}catch (e5144){if((e5144 instanceof Error))
{var e_5171 = e5144;
domina.replace_children_BANG_.call(null,content,value_5149);
} else
{if("\uFDD0:else")
{throw e5144;
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
var seq__5178_5182 = cljs.core.seq.call(null,children);
var chunk__5179_5183 = null;
var count__5180_5184 = 0;
var i__5181_5185 = 0;
while(true){
if((i__5181_5185 < count__5180_5184))
{var child_5186 = cljs.core._nth.call(null,chunk__5179_5183,i__5181_5185);
frag.appendChild(child_5186);
{
var G__5187 = seq__5178_5182;
var G__5188 = chunk__5179_5183;
var G__5189 = count__5180_5184;
var G__5190 = (i__5181_5185 + 1);
seq__5178_5182 = G__5187;
chunk__5179_5183 = G__5188;
count__5180_5184 = G__5189;
i__5181_5185 = G__5190;
continue;
}
} else
{var temp__4092__auto___5191 = cljs.core.seq.call(null,seq__5178_5182);
if(temp__4092__auto___5191)
{var seq__5178_5192__$1 = temp__4092__auto___5191;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__5178_5192__$1))
{var c__3049__auto___5193 = cljs.core.chunk_first.call(null,seq__5178_5192__$1);
{
var G__5194 = cljs.core.chunk_rest.call(null,seq__5178_5192__$1);
var G__5195 = c__3049__auto___5193;
var G__5196 = cljs.core.count.call(null,c__3049__auto___5193);
var G__5197 = 0;
seq__5178_5182 = G__5194;
chunk__5179_5183 = G__5195;
count__5180_5184 = G__5196;
i__5181_5185 = G__5197;
continue;
}
} else
{var child_5198 = cljs.core.first.call(null,seq__5178_5192__$1);
frag.appendChild(child_5198);
{
var G__5199 = cljs.core.next.call(null,seq__5178_5192__$1);
var G__5200 = null;
var G__5201 = 0;
var G__5202 = 0;
seq__5178_5182 = G__5199;
chunk__5179_5183 = G__5200;
count__5180_5184 = G__5201;
i__5181_5185 = G__5202;
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
return cljs.core.doall.call(null,cljs.core.map.call(null,(function (p1__5172_SHARP_,p2__5173_SHARP_){
return f.call(null,p1__5172_SHARP_,p2__5173_SHARP_);
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
{if((function (){var G__5204 = list_thing;
if(G__5204)
{if((function (){var or__3943__auto__ = (G__5204.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__5204.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__5204.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5204);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5204);
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
{if((function (){var G__5205 = content;
if(G__5205)
{if((function (){var or__3943__auto__ = (G__5205.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__5205.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__5205.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5205);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5205);
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
{if((function (){var G__5206 = content;
if(G__5206)
{if((function (){var or__3943__auto__ = (G__5206.cljs$lang$protocol_mask$partition0$ & 8388608);
if(or__3943__auto__)
{return or__3943__auto__;
} else
{return G__5206.cljs$core$ISeqable$;
}
})())
{return true;
} else
{if((!G__5206.cljs$lang$protocol_mask$partition0$))
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5206);
} else
{return false;
}
}
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeqable,G__5206);
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
