import Image from 'next/image'
// import styles from './page.module.css'
import Featured from '@/components/Featured'
import PizzaList from '@/components/PizzaList'

export default async function Home() {
  return (
    <main>
      <Featured/>
      <PizzaList/>
    </main>
  )
}
