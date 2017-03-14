export const objectToArray = obj =>
  Object.keys(obj).map(key => obj[key])

export const parseJson = response =>
  response.json().then(json => {
    if(response.ok)
      return json
    else
      throw json
  })

export const arrayToObject = (array, keyField) =>
  array.reduce((acc, cur) => {
    acc[cur[keyField]] = cur
    return acc
  }, {})

export const onUnauthorized = action => response => {
  if(response.status == "Unauthorized") {
    action()
  } else {
    alert(response.message)
  }
}
