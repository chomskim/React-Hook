import { shortISO } from './date-wrangler'

export default async function getData(url) {
  const resp = await fetch(url)
  if (!resp.ok) {
    throw Error('There was a problem fetching data.')
  }
  const res = await resp.json()
  console.log('getData resp.json()=', res)
  return res
}

export function getBookings(bookableId, startDate, endDate) {
  const start = shortISO(startDate)
  const end = shortISO(endDate)

  const urlRoot = 'http://localhost:3001/bookings'

  const query = `bookableId=${bookableId}&date_gte=${start}&date_lte=${end}`
  console.log('query=', query)
  return getData(`${urlRoot}?${query}`)
}

export function createItem(url, item) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  }).then((r) => {
    if (!r.ok) {
      throw new Error('There was a problem creating the item!')
    }
    return r.json()
  })
}

export function editItem(url, item) {
  return fetch(url, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  }).then((r) => {
    if (!r.ok) {
      throw new Error('There was a problem updating the item!')
    }
    return r.json()
  })
}

export function deleteItem(url) {
  return fetch(url, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  }).then((r) => {
    if (!r.ok) {
      throw new Error('There was a problem deleting the item!')
    }
    return r.json()
  })
}
