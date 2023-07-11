'use client'
import SearchInput from '@/components/list/SearchInput'
import styles from './page.module.css'
import CoinList from '@/containers/list/CoinList'

export default function Home() {
  return (
    <main className={styles.main}>
      <SearchInput />

      <CoinList />
    </main>
  )
}
