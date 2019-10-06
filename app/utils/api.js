const api = 'https://hacker-news.firebaseio.com/v0'
const json = '.json?print=pretty'

function removeDead(posts) {
  return posts.filter( (post) => !post.dead)
}

function removeDeleted(posts) {
  return posts.filter((post) => !post.delted)
}

function onlyPosts(items) {
  return items.filter((item) => item.type==='story')
}

function onlyComments(items) {
  return items.filter((item) => item.type==='comment')
}

export function fetchItem(id) {
  return fetch(`${api}/item/${id}${json}`)
    .then((res) => res.json())
}

export function fetchComments(ids) {
  return Promise.all(ids.map(fetchItem))
    .then((comments) => removeDeleted(onlyComments(removeDead(comments))))
}

export function fetchMainPosts(type) {
  return fetch(`${api}/${type}stories${json}`)
    .then((res)=>res.json())
    .then((ids) => {
      if (!ids) {
        throw new Error(`There was an error fetching ${type} posts.`)
      }
      
      return ids.slice(0,50)
    })
    .then((ids) => Promise.all(ids.map(fetchItem)))
    .then((posts) => removeDeleted(onlyPosts(removeDead(posts))))
}

export function fetchUser(id) {
  return fetch(`${api}/user/${id}${json}`)
    .then((res) => res.json())
}

export function fetchPosts(ids) {
  return Promise.all(ids.map(fetchItem))
    .then((posts) => removeDeleted(onlyPosts(removeDead(posts))))
}