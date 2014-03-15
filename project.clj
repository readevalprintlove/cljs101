; Copyright (c) 2014 Fogus. All rights reserved.  The
; use and distribution terms for this software are covered by the Eclipse
; Public License 1.0 (http://opensource.org/licenses/eclipse-1.0.php)
; which can be found in the file COPYING the root of this
; distribution.  By using this software in any fashion, you are
; agreeing to be bound by the terms of this license.  You must not
; remove this notice, or any other, from this software.

(defproject himera "1.0.0"
  :description "ClojureScript 101"
  :dependencies [[org.clojure/clojure "1.5.1"]
                 [ring "1.0.2"]
                 [compojure "1.0.1"]
                 [domina "1.0.1"]
                 [ring-clj-params "0.1.0"]
                 [org.clojure/clojurescript "0.0-1847"]]
  :plugins [[lein-cljsbuild "0.3.2"]]
  :dev-dependencies [[jline "0.9.94"]]
  :cljsbuild {:builds
              [{:source-paths ["src/cljs"],
                :compiler
                {:pretty-print true,
                 :output-dir "resources/public/js/",
                 :output-to "resources/public/js/repl.js",
                 :optimizations :simple},
                :jar true}]}  
  :source-paths ["src/clj"]
  :main himera.server.app
  :min-lein-version "2.0.0")

