import BigNumber from 'bignumber.js'
import {
  Finding,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType,
} from 'forta-agent'

import { INSTADAPP_CONNECTOR_ADDRESS, Sigs } from './utils'

const handleTransaction: HandleTransaction = async (
  txEvent: TransactionEvent
) => {
  const findings: Finding[] = []

  // iterating through the event signatures
  for (let sig in Sigs) {

    // filtering the transaction events 
    const logs = txEvent.filterEvent(Sigs[sig], INSTADAPP_CONNECTOR_ADDRESS)

    // if no events found then continue
    if (!logs.length) continue;

    // failed transaction 
    if (!txEvent.status) {
      findings.push(
        Finding.fromObject({
          name: 'INSTADAPP CONNECTOR EVENT',
          description: `Instadapp Failed ${sig} Connector event is detected.`,
          alertId: 'INSTADAPP-15',
          protocol: 'INSTADAPP',
          type: FindingType.Suspicious,
          severity: FindingSeverity.High,
        })
      )
    }
    // successful transaction
    else {
      findings.push(
        Finding.fromObject({
          name: 'INSTADAPP CONNECTOR EVENT',
          description: `Instadapp ${sig} Connector Event is detected.`,
          alertId: 'INSTADAPP-16',
          protocol: 'INSTADAPP',
          type: FindingType.Info,
          severity: FindingSeverity.Info,
        })
      )
    }
  }

  return findings
}

export default {
  handleTransaction,
}
