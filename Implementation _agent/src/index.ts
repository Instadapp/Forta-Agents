import BigNumber from 'bignumber.js'
import {
  Finding,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType,
} from 'forta-agent'
import { INSTADAPP_IMPLEMENTATION_ADDRESS, Sigs } from './utils'

const handleTransaction: HandleTransaction = async (
  txEvent: TransactionEvent
) => {
  const findings: Finding[] = []

  for (let sig in Sigs) {
    const logs = txEvent.filterEvent(Sigs[sig], INSTADAPP_IMPLEMENTATION_ADDRESS)

    if (!logs.length) continue

    if (!txEvent.status) {
      findings.push(
        Finding.fromObject({
          name: 'INSTADAPP IMPLEMENTATION EVENT',
          description: `INSTADAPP Failed ${sig} Implementation event is detected.`,
          alertId: 'INSTADAPP-13',
          protocol: 'INSTADAPP',
          type: FindingType.Suspicious,
          severity: FindingSeverity.High,
        })
      )
    } else {
      findings.push(
        Finding.fromObject({
          name: 'INSTADAPP IMPLEMENTATION EVENT',
          description: `INSTADAPP ${sig} Implementation Event is detected.`,
          alertId: 'INSTADAPP-14',
          protocol: 'INSTADAPP',
          type: FindingType.Unknown,
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
