# Token transfer tracking Agent

## Description

This agent detects High volume of DAI and USDC tokens moving in and out of per DSA ($1M USD)

## Supported Chains

- Ethereum

## Alerts

- INST-41
  - Fired when a transaction contains a Transfer event of over 1,000,000 dollar moving in and out of per dsa
  - Severity is set to "info"
  - Type is set to "info"
  - Metadata
    - from: sender of token
    - to: receiver of token
    - amount: how many token were sent

## Test Data 

The agent behaviour can be verified with the following transactions (npm run tx <Transaction_Hash>):

- 0x307504dd7a9193987531f4acc171e4c98651640384b3223a9e24acfb1b8e10fb(large Dai transfer from dsa address)