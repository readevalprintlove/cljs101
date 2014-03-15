(ns lessons.interop)

(defn hi [name]
  (js/alert (str "Hi " name "!")))
