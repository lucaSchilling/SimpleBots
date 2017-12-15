!(function () {
    'use strict'
  
    function include (array, item) {
      return array.indexOf(item) > -1
    }
  
    function _traverseDown (context, iterator) {
      var doContinue = true;
  
      (function walkDown (node) {
        var i, newContext
  
        if (!doContinue) return
  
        if (iterator(node) === false) {
            // break the traversal loop if the iterator returns a falsy value
          doContinue = false
        } else {
          for (i = 0; i < node.children.length; i++) {
            newContext = node.children[i]
            walkDown(newContext)
          }
        }
      })(context)
    }
  
    function _traverseUp (context, iterator) {
      var i, node, doContinue
  
      while (context) {
        if (iterator(context) === false) return
  
        for (i = 0; i < context.children.length; i++) {
          node = context.children[i]
          if (iterator(node) === false) return
        }
        context = context.parent
      }
    }
  
    function _traverse (context, iterator, callback) {
      var visited = [],
        callIterator = function (node) {
          var id = node.id,
            returned
  
          if (!include(visited, id)) {
            returned = iterator.call(node, node)
            visited.push(id)
  
            if (returned === false) {
              return returned
            }
          }
        },
        i, node
  
      callback(context, callIterator)
    }
  
    function _removeChild (node) {
      var parent = node.parent,
        child,
        i
  
      for (i = 0; i < parent.children.length; i++) {
        child = parent.children[i]
  
        if (child === node) {
          return parent.children.splice(i, 1).shift()
        }
      }
    }
  
    function nodeId (parent, separator) {
      separator = separator || '/'
      if (parent) {
        return [parent.id, parent.children.length ].join(separator)
      } else {
        return '0'
      }
    }
  
    function Arboreal (parent, data, id) {
      this.depth = parent ? parent.depth + 1 : 0
      this.data = data || {}
      this.parent = parent || null
      this.id = id || nodeId(parent)
      this.children = []
    }