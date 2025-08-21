import {type Node} from '@/types/nodes'

/*
  Functions to help with node ordering and filtering
  - orderNodesBy
  - filterNodesByName
*/

const allVisible = function(nodes: Node[]) : Node[] {
  return nodes.map(node => {
    const visibleNode = { ...node, hidden: false };
    if (node.files && Array.isArray(node.files)) {
        visibleNode.files = filterNodesByName(node.files, '');
    }
    return visibleNode;
  });
}

export function orderNodesBy(nodes: Node[], orderBy: string, direction?: 'DESC' | 'ASC') : Node[] {
  direction ??= 'ASC'

  // Create a deep copy to avoid mutating original
  const newNodes = nodes.map(node => {
    const copiedNode = { ...node };

    // Recursively sort children if they exist
    if (node.files && Array.isArray(node.files)) {
      copiedNode.files = orderNodesBy(node.files, orderBy, direction);
    }

    return copiedNode;
  });

  // Sort the current level
  newNodes.sort((a, b) => {
    console.info('orderBy', orderBy, direction)
    if (orderBy === 'name') {
      const nameA = a.name.toLowerCase();
      const nameB = b.name.toLowerCase();

      if (direction === 'ASC') {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }

    } else if (orderBy === 'added') {
      // Handle nodes that might not have 'added' field (like some folders)
      const dateA = a.added ? new Date(a.added) : new Date(0);
      const dateB = b.added ? new Date(b.added) : new Date(0);

      // Check for invalid dates
      const timeA = isNaN(dateA.getTime()) ? 0 : dateA.getTime();
      const timeB = isNaN(dateB.getTime()) ? 0 : dateB.getTime();

      if (direction === 'DESC') {
        return timeA - timeB;
      } else {
        return timeB - timeA;
      }
    } else {
      // Break since the UI options are hard coded
      throw `Unknown orderBy option: ${orderBy}`
    }
  });

  return newNodes;
}

export function filterNodesByName(nodes: Node[], searchTerm: string) : Node[] {
  const lowerSearchTerm = searchTerm.toLowerCase().trim();

  if (lowerSearchTerm === '') return allVisible(nodes)

  return nodes.map(node => {
    // Check if current node matches
    const nodeMatches = node.name.toLowerCase().includes(lowerSearchTerm);

    // Create a copy of the node to avoid mutating original
    let filteredNode = { ...node };

    // If node has children (files), process them recursively
    if (node.files && Array.isArray(node.files)) {
      const processedChildren = filterNodesByName(node.files, searchTerm);
      filteredNode.files = processedChildren;

      // Check if any children are visible (not hidden)
      const hasVisibleChildren = processedChildren.some(child => !child.hidden);

      // Hide parent folder only if:
      // 1. The folder name doesn't match AND
      // 2. It has no visible children
      filteredNode.hidden = !nodeMatches && !hasVisibleChildren;
    } else {
      // For leaf nodes, hide if name doesn't match
      filteredNode.hidden = !nodeMatches;
    }

    return filteredNode;
  });
}