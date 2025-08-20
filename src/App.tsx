import { useState, useEffect } from 'react'
import {apiGet} from '@/services/api.ts'
import {type Node} from '@/types/nodes'
import NodeList from '@/components/NodeList'
import {logDebug} from '@/utilities/logging'
import ListOptions from '@/components/ListOptions'
import {filterNodesByName, orderNodesBy} from '@/utilities/nodes'

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'

// Features ignored based on simplicity of task
//
// Handle errors from API call
// - Shown to the user instead of silent failures
// Handle empty Node arrays

function App() {
  const [nodes, setNodes] = useState<Node[]>([])

  // TODO: Open/Close list (details/summary HTML tags should do)
  // TODO: Filter by filename
  // TODO: Add ordering on 'select' change

  // Note: useMemo hook for API calls if caching is necessary. invalidation would
  //       need consideration too
  //
  useEffect(() => {
    (async ()=>{
      logDebug('useEffect making #apiGet call')
      setNodes(await apiGet())
    })()
  }, []);

  const onChange = function({name, orderBy} : {name: string, orderBy: string}) : void {
    console.info('Called onChange', {name, orderBy})

    let newNodes : Node[]

    newNodes = filterNodesByName(nodes, name)
    newNodes = orderNodesBy(newNodes, orderBy)
    console.info('newNodes', newNodes)
    setNodes(newNodes)
  }

  return (
    <>
      <h1>Demo Task</h1>
      <p>By Carl Munn</p>
      <p> (<a href='https://github.com/brighthr/Front-End-Tech-Tasks/blob/main/junior-and-middleweight.md' target='_blank'>GitHub</a>)</p>
      <code>node COUNT={nodes.length}</code>
      <ListOptions onChange={onChange}/>
      <NodeList name='root' nodes={nodes} orderBy={ 'name' }/>
    </>
  )
}

export default App
