;; ClojureScript supports modularity via namespaces. They allow you to group
;; logical definitions together.

(ns lessons.namespaces
  (:require [clojure.string :as string]))

;; :require is how you can import functionality from a different namespace into
;; the current one. Here we are requiring `clojure.string` and giving it an
;; alias.

(defn hello [the-name]
  (js/alert (clojure.string/join             ;; Fully qualified (i.e. annoying)
             " "                           
             ["Hello"
              (string/upper-case the-name)   ;; Alias!
              ":-)"])))

;; Once you have a namespace, you can start creating things in
;; that namespace.

;; You can run `lein cljsbuild once` at the command line and
;; then run `lein run 8080` and inspect the JS console to
;; view this namespace and its things contained in the
;; `lessons.namespaces` object.


