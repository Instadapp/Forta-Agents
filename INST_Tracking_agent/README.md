# Large INST transfer Tracking Agent

## Description

This agent  Detects Transactions with large INST Transfers (100k)

## Supported Chains

- Ethereum

## Alerts

- INST-31
  - Fired when a transaction contains a Transfer event of over 100000 INST
  - Severity is set to "info"
  - Type is set to "info"
  - Metadata
    - from: sender of token
    - to: receiver of token
    - amount: how many token were sent

