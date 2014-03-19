;; ClojureScript supports modularity via namespaces. They allow you to group
;; logical definitions together.

(ns lessons.namespaces
  (:require [clojure.string :as string]))

;; :require is how you can import functionality from a different namespace into
;; the current one. Here we are requiring `clojure.string` and giving it an
;; alias.

(defn hello [the-name]
  (js/alert (clojure.string/join " "
                                 ["Hello"
                                  (string/upper-case the-name)
                                  ":-)"])))
