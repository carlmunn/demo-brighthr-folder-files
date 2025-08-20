import { useState, useEffect } from 'react'
import {type Node} from '@/types/nodes.ts'

interface NodeListProps {
  name?: string | null;
  nodes?: Node[];
  orderBy?: string;
  indentBy?: number;
}

type SortableNodeKeys = keyof Pick<Node, 'name' | 'added'>

const NodeList = function(props: NodeListProps){
  const indentBy = props.indentBy ?? 0
  const name: string | null = props?.name || null
  const nodes: Node[] = props?.nodes || []
  const orderBy = props?.orderBy ?? 'name'

  // Not adding an event to change state. This will mean
  // any refreshing/render calls will close the list
  const [openState, setOpenState] = useState(false)

  const sortedNodes = [...nodes].sort((n1, n2) => {
    const oKey = orderBy as SortableNodeKeys
    const a = n1[oKey] ?? '';
    const b = n2[oKey] ?? '';

    if(a < b) return -1
    if(a > b) return 1
    return 0
  })

  // TODO: Sort nodes using orderDir. Kept state too.
  // Event/function to change order
  // Event/function to open/close

  // Using CSS variable --indentBy to push the element right to help with
  // visual representation. The actual CSS margin is in App.css
  //
  return (<section className='node-list'>
    <details open={openState}>
      { (<summary>{ name ?? 'Unknown Node' }</summary> )}

      <ul className='list-nodes'>
        { sortedNodes.map((node, idx) => {
          console.info(node.type)
          if(node.type === 'folder')
            return <li className={`node-type_${node.type}`}>
              <NodeList
                      name={node.name}
                      indentBy={indentBy}
                      nodes={node.files}/>
            </li>
          else
            return (<li
              key={idx}
              style={ {'--indentBy': indentBy} as React.CSSProperties}
              className={`node-type_${node.type}`}
              title='File'>
                { node.name }
              </li>)
        }) }
      </ul>
    </details>
  </section>)
}

export default NodeList