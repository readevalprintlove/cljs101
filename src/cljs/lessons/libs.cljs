(ns lessons.libs
  (:require [goog.string :as gstring]))

;; Using the internal Google CloSure libraries
;; ============================================================================

(defn digitesque? [thing]
  (gstring/isNumeric thing))






;; Using the external libraries (e.g. jQuery)
;; ============================================================================


(def jq js/jQuery)

(defn get-text [thing]
  (.text thing))
