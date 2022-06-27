import React from 'react';
import { ethers } from "ethers";
import styles from '../styles/Balance.module.scss';
import { useMetaMask } from 'metamask-react';
import { fundingAddress } from '../chain-data/constants';

export function Balance() {
  const { ethereum } = useMetaMask();
  const [balance, setBalance] = React.useState<string>('');

  React.useEffect(
    function() {
      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum as any);
        provider.getBalance(fundingAddress)
        .then((val) => {
          setBalance(ethers.utils.formatEther(val));
        });
      }
    }, [ethereum]
  );

  return (
    <div className={styles.balanceContainer}>
      <div>Balance:</div>
      <div>{balance} ETH</div>
    </div>
  )
}