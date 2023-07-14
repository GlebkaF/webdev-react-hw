import { useParams } from 'react-router-dom'

export default function CategoryPage() {
  const params = useParams()
  return <h1>CategoryPage {params.id}</h1>
}
