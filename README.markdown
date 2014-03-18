# ClojureScript 101

A living tutorial for ClojureScript.

## Prerequisites

   * Java 1.6+
   * Maven 2
   * [Leiningen](http://leiningen.org/)
   * Text editor

## Build

To build the included source files, enter and run the following at a command prompt:

    lein deps
	lein cljsbuild once

## Usage

To start CLojureScript 101 locally using [Leiningen](https://github.com/technomancy/leiningen), type the following command in the project directory:

    lein run 8080

Then visit <http://localhost:8080/> and hack away.

## Examples

Common ClojureScript functions and macros work as expected:

```clojure

    (map (fn [n] (* n n n)) [1 2 3 4])
	;=> (1 8 27 64)
	
	(for [[k v] {:a 1 :b 2}] [v k])
	;=> ([1 :a] [2 :b])
	
	(if (< x 10) :less :more)
	;=> :less
	
	(defn sqr [n] (* n n))
	
	(map sqr [1 2 3])
	;=> (1 4 9)
	
	(deftype Cons [h t])
	
	(.-t (Cons. 1 108))
	;=> 108
	
	(defmulti classify-age :age)
	
	(defmethod classify-age 36 [_] :ancient)
	
	(classify-age {:age 36})
	;=> :ancient
```

### JavaScript interop

To use [jQuery](http://jquery.com) from the ClojureScript 101 REPL, try the following:

```clojure

    (def anchor (js/jQuery "a"))
	
	(.text anchor)
	;=> "Source..."
	
	(.text anchor "Github repo...")
```

## Topics

* ClojureScript 101
    * Target audience: those who know about ClojureScript but have never used it
    * Prerequisite: Clojure 101
    * Getting up and running
        * required tools: lein, editor, Java, etc.
        * `lein cljs-build`
        * TODO ource maps
    * Just enough ClojureScript
    * What is different from Clojure?
	    * Interop
		* Compilation
        * Briefly mention macros, more coverage in 102
    * Compilation
        * High level overview of compilation
		* Google Closure Compiler
        * Will be covered in more detail in ClojureScript 102
    * Namespaces and Libraries
        * In ClojureScript only
		* TODO L@@k https://github.com/swannodette/lt-cljs-tutorial/blob/master/lt-cljs-tutorial.cljs
    * Basic JavaScript interop
        * The `js` magic namespace
        * Interact with JavaScript environment
        * Using Google Closure libraries

## License

Copyright (C) 2014, Fogus

Distributed under the Eclipse Public License, the same as Clojure.

