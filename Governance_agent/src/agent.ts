import BigNumber from 'bignumber.js'
import {
  Finding,
  HandleTransaction,
  TransactionEvent,
  FindingSeverity,
  FindingType,
} from 'forta-agent'
import { INSTADAPP_GOVERNANCE_ADDRESS, Sigs } from './utils'

const handleTransaction: HandleTransaction = async (
  txEvent: TransactionEvent
) => {
  const findings: Finding[] = []

  for (let sig in Sigs) {
    const logs = txEvent.filterEvent(Sigs[sig], INSTADAPP_GOVERNANCE_ADDRESS)

    if (!logs.length) continue

    // console.log(Sigs[sig]);
    if (!txEvent.status) {
      findings.push(
        Finding.fromObject({
          name: 'Instadapp Governance Event',
          description: `Instadapp Failed ${sig} Proposal event is detected.`,
          alertId: 'Instadapp-11',
          protocol: 'Instadapp',
          type: FindingType.Suspicious,
          severity: FindingSeverity.High,
        })
      )
    } else {
      findings.push(
        Finding.fromObject({
          name: 'Instadapp Governance Event',
          description: `Instadapp ${sig} Proposal Event is detected.`,
          alertId: 'Instadapp-12',
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