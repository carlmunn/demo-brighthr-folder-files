const apiGet = function(){
  console.debug('[D][apiGet] GET data.json')

  return fetch('/api/v1/data.json', {method: 'GET'}).then((resp) => {
    return resp.json()
  })
}

export {apiGet}