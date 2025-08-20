import { useState, useEffect } from 'react'
import {apiGet} from '@/services/api.ts'
import {type Node} from '@/types/nodes'
import NodeList from '@/components/NodeList'
import {logDebug} from '@/utilities/logging'

// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'


// Features ignored based on simplicity of task
//
// Handle errors from API call
// - Shown to the user instead of silent failures
// Handle empty Node arrays

function App() {
  const [nodes, setNodes] = useState([])

  // TODO: Open/Close list (details/summary HTML tags should do)
  // TODO: Filter by filename
  // TODO: Add ordering on 'select' change
  const [orderBy, setOrderBy] = useState('name')

  // Note: useMemo hook for API calls if caching is necessary. invalidation would
  //       need consideration too
  //
  useEffect(() => {
    (async ()=>{
      logDebug('useEffect making #apiGet call')
      setNodes(await apiGet())
    })()
  }, []);

  return (
    <>
      <h1>Demo Task</h1>
      <p>By Carl Munn</p>
      <p> (<a href='https://github.com/brighthr/Front-End-Tech-Tasks/blob/main/junior-and-middleweight.md' target='_blank'>GitHub</a>)</p>
      <code>node COUNT={nodes.length}</code>

      <section>
        <label htmlFor="order-by">Order</label>
        <select name='order-by'>
          <option value="name">Name</option>
          <option value="date">Date</option>
          <option value="type">Type</option>
        </select>
      </section>

      <NodeList name='root' nodes={nodes} orderBy={ orderBy }/>
    </>
  )
}

export default App
