import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

const BookablesView = lazy(() => import('./BookablesView'))
const BookableEdit = lazy(() => import('./BookableEdit'))
const BookableNew = lazy(() => import('./BookableNew'))

export default function BookablesPage() {
  return (
    <Routes>
      <Route path='/:id' element={<BookablesView />} />
      <Route path='/' element={<BookablesView />} />
      <Route path='/:id/edit' element={<BookableEdit />} />
      <Route path='/new' element={<BookableNew />} />
    </Routes>
  )
}
