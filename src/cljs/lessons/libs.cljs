(ns lessons.libs)

(def jq js/jQuery)

(defn get-text [thing]
  (.text thing))

;; (.text anchor "Github repo...")