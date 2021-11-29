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
    // console.log(Sigs[sig]);
    const logs = txEvent.filterEvent(Sigs[sig], INSTADAPP_IMPLEMENTATION_ADDRESS)
    // console.log(txEvent);
    if (!logs.length) continue

    if (!txEvent.status) {
      findings.push(
        Finding.fromObject({
          name: 'Instadapp Implementation EVENT',
          description: `Instadapp Failed ${sig} Implementation event is detected.`,
          alertId: 'Instadapp-13',
          protocol: 'Instadapp',
          type: FindingType.Suspicious,
          severity: FindingSeverity.High,
        })
      )
    } else {
      findings.push(
        Finding.fromObject({
          name: 'Instadapp Implementation EVENT',
          description: `Instadapp ${sig} Implementation Event is detected.`,
          alertId: 'Instadapp-14',
          protocol: 'Instadapp',
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
