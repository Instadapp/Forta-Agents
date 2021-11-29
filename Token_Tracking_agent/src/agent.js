
const BigNumber = require("bignumber.js");
const { ethers } = require("ethers");
const abi = require("./abi.json");
const { Finding, FindingSeverity, FindingType, getEthersProvider } = require("forta-agent");
const {
  tokens,
  TRANSFER_EVENT,
} = require("./constants");

const ethersProvider = getEthersProvider();


// making instance of contract
const instaList = new ethers.Contract("0x4c8a1BEb8a87765788946D6B19C6C6355194AbEb", abi, ethersProvider);


const AMOUNT_THRESHOLD = "1000000"; //100k

function provideHandleTransaction(amountThreshold) {
  return async function handleTransaction(txEvent) {


    const findings = [];

    for (let token in tokens) {

      const tokenTransferEvents = txEvent.filterLog(
        TRANSFER_EVENT,
        tokens[token].address
      );

      // No transfer event found
      if (tokenTransferEvents.length == 0) {
        continue;
      }


      for (const tokenTransfer of tokenTransferEvents) {

        const to = tokenTransfer.args.to;
        const from = tokenTransfer.args.from;

        const from_account = await instaList.accountID(from)
        const to_account = await instaList.accountID(to)

        const from_account_id = from_account.toNumber();
        const to_account_id = to_account.toNumber();

        // Not a dsa address if account_id is 0
        if (from_account_id == 0 && to_account_id == 0) {
          continue;
        }


        const amount = new BigNumber(
          tokenTransfer.args.value.toString()
        ).dividedBy(10 ** (tokens[token].decimals))

        if (amount.isLessThan(amountThreshold)) return findings;

        const formattedAmount = amount.toFixed(2);

        findings.push(
          Finding.fromObject({
            name: `Large ${tokens[token].name} Transfer`,
            description: `${formattedAmount} ${tokens[token].name} Transferred`,
            alertId: "INST-41",
            severity: FindingSeverity.Info,
            type: FindingType.Info,
            metadata: {
              from: tokenTransfer.args.from,
              to: tokenTransfer.args.to,
              amount: formattedAmount,
            },
          })
        );
      };
    }
    return findings;
  };
}

module.exports = {
  provideHandleTransaction,
  handleTransaction: provideHandleTransaction(AMOUNT_THRESHOLD),
};
