const apiGet = function(){
  console.debug('[D][apiGet] GET data.json')

  // The path is relative. See 'base' in index.html
  return fetch('api/v1/data.json', {method: 'GET'}).then((resp) => {
    return resp.json()
  })
}

export {apiGet}