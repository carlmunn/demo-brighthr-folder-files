import { useState, useEffect } from 'react'
import {type Node} from '@/types/nodes.ts'

interface NodeListProps {
  name?: string | null;
  nodes?: Node[];
  orderBy?: string;
  indentBy?: number;
}

const NodeList = function(props: NodeListProps){
  const indentBy = props.indentBy ?? 0
  const name: string | null = props?.name || null
  const nodes: Node[] = props?.nodes || []

  // Not adding an event to change state. This will mean
  // any refreshing/render calls will close the list
  const [openState, _setOpenState] = useState(false)

  // Using CSS variable --indentBy to push the element right to help with
  // visual representation. The actual CSS margin is in App.css
  //
  return (<section className='node-list'>
    <details open={openState}>
      { (<summary>{ name ?? 'Unknown Node' }</summary> )}

      <ul className='list-nodes'>
        { nodes.map((node, idx) => {

          const classList = [`node-type_${node.type}`]
          const isFolder = node.type === 'folder'

          if(node.hidden && !isFolder) return null

          if(isFolder)
            return <li key={idx} className={classList.join(' ')}>
              <NodeList
                name={node.name}
                indentBy={indentBy}
                nodes={node.files}/>
            </li>
          else
            return (<li
              key={idx}
              style={ {'--indentBy': indentBy} as React.CSSProperties}
              className={classList.join(' ')}
              title={`File added ${node.added}`}>
                { node.name }.{ node.type } <span className='date-added'>Added {node.added}</span>
              </li>)
        }) }
      </ul>
    </details>
  </section>)
}

export default NodeList