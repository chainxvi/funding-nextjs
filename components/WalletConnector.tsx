import React from 'react';
import styles from '../styles/WalletConnector.module.scss';
import { useMetaMask } from "metamask-react";

export function WalletConnector() {
  const [copied, setCopied] = React.useState<boolean>(false)
  const { status, connect, account, ethereum } = useMetaMask();

  const text = React.useMemo(
    function () {
      switch (status) {
        case 'initializing':
          return 'Loading...';
          break;
        case 'notConnected':
          return 'Connect Wallet';
          break;
        case 'connecting':
          return 'Connecting...';
          break;
        case 'connected':
          return account.substring(0, 7) + '...' + account.substring(account.length - 5, account.length);
          break;
        case 'unavailable':
          return 'Install MetaMask';
          break;
        default:
          return 'Connect Wallet';
          break;
      }
    }, [status, account]
  );

  function connectWallet() {
    if(status === 'notConnected') {
      connect();
    } else if(status === "connected") {
      navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  }

  return (
    <div title={copied ? 'Copied' : 'Click to copy'} className={styles.connect} onClick={connectWallet}>
      <span>
        {text}
      </span>
    </div>
  )
}