import { useState, useEffect } from 'react'

const ListOptions = function(props: {onChange: (opts: any)=>void }){

  const [orderBy, setOrderBy] = useState('name')
  const [filterName, setfilterName] = useState('')

  useEffect(()=>{
    // TODO: Debounce but since this is basic it's not necessary
    props.onChange && props.onChange({name: filterName, orderBy: orderBy})
  }, [orderBy, filterName])

  return (
    <section id='node-options'>
      <section id='filter'>
        <input
          id='filter-name'
          value={filterName}
          onChange={ (evt) => { setfilterName(evt.target.value) } }
          name='filter-name'
          type="text"
          placeholder="Filter file names"
          tabIndex={1}
        />
      </section>

      <section id='order-by'>
        <label htmlFor="order-by">Order Files By</label>
        <select id='order-by'
                value={orderBy}
                name='order-by'
                onChange={ (evt) => { setOrderBy(evt.target.value) } }
                tabIndex={2}>
          <option value="name">Name (a→z)</option>
          <option value="added">Newest First</option>
        </select>
      </section>
    </section>
  )
}

export default ListOptions