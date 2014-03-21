(ns lessons.interop)

;; The magic of js/

(defn hi [name]
  (js/alert (str "Hi " name "!")))


(def empty-array (js/Array.))





;; JavaScript Interop
;; ============================================================================

;; Property Access
;; ----------------------------------------------------------------------------

;; You can access properties with the `.-` property access syntax.

(defn get-length [array]
  (.-length array))

;; Method Calls
;; ----------------------------------------------------------------------------

;; Methods can be invoked with the `.` syntax.

(defn push-thing [array thing]
  (.push array thing))

;; The above desugars into the following.

(defn also-push-thing [array thing]
  (. array (push thing)))

;; Most of the rest is the same as Clojure
