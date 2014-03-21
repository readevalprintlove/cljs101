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

;; (.getSeconds a-date)

;; The above desugars into the following.

;; (. a-date (getSeconds))

;; For example, you can write a `console.log` call like so.

;; (. js/console (log "Interop!"))


;; Primitive Array Operations
;; ----------------------------------------------------------------------------

;; When writing performance sensitive code, sometimes dealing with mutable
;; arrays is unavoidable. ClojureScript provides a variety of functions for
;; creating and manipulating JavaScript arrays.

;; You can make an array of specific size with `make-array`

;; (make-array 32)


;; You can access an element of an array with `aget`.

;; You can set the contents of an array with aset.


