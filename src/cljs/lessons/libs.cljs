(ns lessons.libs
  (:require [goog.string :as gstring]))


(defn digitesque? [thing]
  (gstring/isNumeric thing))



(def jq js/jQuery)

(defn get-text [thing]
  (.text thing))
