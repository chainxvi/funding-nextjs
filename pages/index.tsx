import { NextPage } from 'next'
import Head from 'next/head'
import { Balance, Form, Nav } from '../components';
import styles from '../styles/Home.module.scss'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>web3 funding</title>
        <meta name="description" content="A DApp to fund a smart contract and withdraw funds from it." />
        <link rel="icon" href="/webfun.svg" />
      </Head>
      <Nav />
      <main className={styles.main}>
        <h1 className={styles.title}>
          Web3 Funding
        </h1>
        <Form />
        <Balance />
      </main>
    </div>
  )
}

export default Home;