import React from 'react';
import styles from '../styles/Form.module.scss';
import { Input, Button, FormElement } from "@nextui-org/react";
import { useMetaMask } from 'metamask-react';
import { ethers } from "ethers";
import { fundingAbi, fundingAddress } from '../chain-data/constants';

type errorType = {
  message: string
}

export function Form() {
  const [eth, setEth] = React.useState<string>('');
  const [fundingContract, setFundingContract] = React.useState<ethers.Contract | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const { ethereum } = useMetaMask();
  const provider = React.useMemo(
    function() {
      if(ethereum) {
        return new ethers.providers.Web3Provider(ethereum as any);
      }
    }, [ethereum]
  )

  const signer = React.useMemo(
    function () {
      return provider?.getSigner();
    }, [provider]
  )
  
  React.useEffect(
    function() {
      if(provider) {
        initContract();
      }
      async function initContract() {
        const fc = await new ethers.Contract(fundingAddress, fundingAbi, signer);
        setFundingContract(fc as ethers.Contract);
      }
    }, [provider]
  )

  async function fund() {
    if(eth && provider) {
      try {
        const tx = await (fundingContract as ethers.Contract).fund({ value: ethers.utils.parseEther(eth) });
        setEth('');
        provider.once(tx.hash, (transaction) => {
          setSuccess('Transaction was mined successfully');
        })
      } catch (err) {
        setError((err as errorType).message);
      }
    }
  }

  async function withdraw() {
    if(provider) {
      try {
        const tx = await (fundingContract as ethers.Contract).withdraw();
        provider.once(tx.hash, (transaction) => {
          setSuccess('Transaction was mined successfully');
        })
      } catch (err) {
        setError((err as errorType).message);
      }
    }
  }

  return (
    <form className={styles.form}>
      <div className={styles.fundContainer}>
        <div className={styles.fundInput}>
          <Input
            labelPlaceholder="Funding amount (ETH)"
            width="240px"
            value={eth}
            fullWidth
            bordered
            onChange={
              function(e: React.ChangeEvent<FormElement>) {
                setEth(e.target.value);
              }
            }
          />
        </div>
        <Button color="gradient" auto onPress={fund}>
          Fund
        </Button>
      </div>
      <Button color="gradient" auto onPress={withdraw}>
        Withdraw
      </Button>
      {
        error && <div className={styles.error} onClick={() => setError(null)}>{error}</div>
      }
      {
        success && <div className={styles.success} onClick={() => setSuccess(null)}>{success}</div>
      }
    </form>
  )
}