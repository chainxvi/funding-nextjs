import { WalletConnector } from "./WalletConnector";
import Image from 'next/image'
import styles from '../styles/Nav.module.scss';

export function Nav() {
  return (
    <nav className={styles.nav}>
      <Logo />
      <WalletConnector />
    </nav>
  )
}

function Logo () {
  return (
    <Image src="/webfun.svg" alt="web3 funding Logo" width={48} height={48} />
  )
}