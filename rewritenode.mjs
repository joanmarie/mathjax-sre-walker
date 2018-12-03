const speechers = function (node) {
  if (node.hasAttribute('data-semantic-speech')) {
    node.setAttribute('aria-label', node.getAttribute('data-semantic-speech'));
    node.setAttribute('role', 'math');
  }
  else {
    node.setAttribute('role', 'presentation');
  }
};


/**
 * Rewrites the DOM node.
 * @param {Node} node The DOM node to rewrite.
 * @param {tree} tree The semantic tree structure.
 */
export function rewriteNode (node, tree) {
  rewriteNodeRec(node, tree.root);
};


/**
 * Rewrites the DOM node to reflect semantic ids and aria-owns children.
 * @param {Node} node The DOM node to rewrite.
 * @param {node} snode The semantic node id object.
 */
function rewriteNodeRec (node, snode) {
  let domNode = node.getAttribute('data-semantic-id') == snode.id ? node :
      node.querySelector(`[data-semantic-id="${snode.id}"]`);
  domNode.setAttribute('id', snode.name);
  speechers(domNode);
  let owned = snode.children.map(n => n.name);
  if (owned.length) {
    domNode.setAttribute('aria-owns', owned.join(' '));
    snode.children.forEach(x => rewriteNodeRec(node, x));
  }
};
