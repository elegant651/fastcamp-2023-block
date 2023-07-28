'use client'
import SearchInput from '@/components/list/SearchInput'
import styles from './page.module.css'
import CoinList from '@/containers/list/CoinList'
import { useCallback, useState } from 'react'

export default function Home() {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.currentTarget.value;
    if (newVal) {
      setSearchTerm(newVal)
    } else {
      setSearchTerm('')
    }
  }, [searchTerm])

  return (
    <main className={styles.main}>
      <SearchInput onChange={handleSearch} />

      <CoinList searchTerm={searchTerm} />
    </main>
  )
}
