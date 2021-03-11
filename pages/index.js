import Head from 'next/head'
import styles from '../styles/Home.module.css'

import useSWR from 'swr';
import fetcher from '@/util/fetch';

export default function Home() {
  const { data, error } = useSWR('/api/bg-items?itemName=throne', fetcher)

  console.log(12, data)

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  )
}
