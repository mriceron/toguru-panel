export const objectToArray = obj =>
  Object.keys(obj).map(key => obj[key])

export const parseJson = response => response.json()
