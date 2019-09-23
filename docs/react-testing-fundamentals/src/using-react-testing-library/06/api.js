export function loadArticles() {
  if (process.env === 'test') {
    throw new Error('it test i will die!')
  }
  return fetch('https://jsonplaceholder.typicode.com/users/1/posts')
    .then(res => res.json())
    .catch(console.error)
}
