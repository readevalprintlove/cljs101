# ClojureScript 101

A living tutorial for ClojureScript.

## Build

    lein deps
	lein cljsbuild once

## Usage

To start CLojureScript 101 locally using [Leiningen](https://github.com/technomancy/leiningen), type the following from the project directory.

    lein run 8080

Then visit <http://localhost:8080/> and hack away.

For example, common ClojureScript functions and macros work as expected:

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

To use [jQuery](http://jquery.com) from the Himera REPL, try the following:

```clojure

    (def anchor (js/jQuery "a"))
	
	(.text anchor)
	;=> "Source..."
	
	(.text anchor "Github repo...")
```

## License

Copyright (C) 2014, Fogus

Distributed under the Eclipse Public License, the same as Clojure.

