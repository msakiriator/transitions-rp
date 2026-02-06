import Studio from './Studio'

export function generateStaticParams() {
  return [{ index: [] }]
}

export const dynamic = 'force-static'
export default function StudioPage() {
  return <Studio />
}