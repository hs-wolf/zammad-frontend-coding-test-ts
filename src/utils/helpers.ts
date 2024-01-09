export const GET_POKEMON_ID_FROM_URL = (url: string) => {
  const id =
    url
      .split('/')
      .filter((split) => split)
      .pop() ?? '0'
  return parseInt(id, 10)
}

export const CAPITALIZED_NAME = (name?: string) => {
  if (!name) {
    return ''
  }
  return name.charAt(0).toUpperCase() + name.slice(1)
}
