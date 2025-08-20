import { useState, useEffect } from 'react'
import {type Node} from '@/types/nodes.ts'

interface NodeListProps {
  name?: string | null;
  nodes?: Node[];
  orderBy?: string;
}

type SortableNodeKeys = keyof Pick<Node, 'name' | 'added'>

const NodeList = function(props: NodeListProps){
  //const {data, setData} = useState<Datum>([])
  const name: string | null = props?.name || null


  const nodes: Node[] = props?.nodes || []
  const orderBy = props?.orderBy ?? 'name'

  const sortedNodes = [...nodes].sort((n1, n2) => {
    const oKey = orderBy as SortableNodeKeys
    const a = n1[oKey] ?? '';
    const b = n2[oKey] ?? '';

    if(a < b) return -1
    if(a > b) return 1
    return 0
  })
  console.info('DEBUG: orderBy', orderBy)


  // TODO: Sort nodes using orderDir. Kept state too.
  // Event/function to change order
  // Event/function to open/close

  return (<section className='node-list'>
    { name &&  (<h6>[ROOT]{ name }</h6> )}

    <ul className='list-nodes'>
      { sortedNodes.map((node, idx) => {
        console.info(node.type)
        if(node.type === 'folder')
          return <NodeList name={node.name} nodes={node.files}/>
        else
          return (<li key={idx} className={`node-type_${node.type}`}>{ node.name }</li>)
      }) }
    </ul>
  </section>)
}

export default NodeList