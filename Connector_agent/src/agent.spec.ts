import {
  TransactionEvent,
  FindingType,
  FindingSeverity,
  Finding,
  EventType,
  Network,
  HandleTransaction,
} from 'forta-agent'

import agent from './agent'
import {
  INSTADAPP_CONNECTOR_ADDRESS,
  UPDATED_CONNECTOR,
  ADDED_CONNECTOR,
  REMOVED_CONNECTOR,
  generateHash,
} from './utils'

describe('Detect Instadapp Connector Contract Event', () => {
  let handleTransaction: HandleTransaction

  const createTxEvent = ({
    logs,
    addresses,
    status = true,
  }: any): TransactionEvent => {
    const tx: any = {}
    const receipt: any = { logs, status }
    const block: any = {}
    const address: any = { ...addresses }

    return new TransactionEvent(
      EventType.BLOCK,
      Network.MAINNET,
      tx,
      receipt,
      [],
      address,
      block
    )
  }

  beforeAll(() => {
    handleTransaction = agent.handleTransaction
  })

  describe('Handle Transaction', () => {
    it('should return empty finding', async () => {
      const GovEvent = {
        topics: [],
        address: INSTADAPP_CONNECTOR_ADDRESS,
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
      })
      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([])
    })

    it('should return empty finding - wrong address', async () => {
      const topicHash: string = generateHash(ADDED_CONNECTOR)

      const GovEvent = {
        topics: [topicHash],
        address: '0x01',
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
      })
      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([])
    })

    it('should return empty finding - empty address', async () => {
      const topicHash: string = generateHash(ADDED_CONNECTOR)

      const GovEvent = {
        topics: [topicHash],
        address: '',
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
      })
      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([])
    })


  })

  describe('Successed Connector Transactions', () => {
    it('should return Added Connector Event finding', async () => {
      const topicHash: string = generateHash(ADDED_CONNECTOR)

      const GovEvent = {
        topics: [topicHash],
        address: INSTADAPP_CONNECTOR_ADDRESS,
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
      })

      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: 'INSTADAPP CONNECTOR EVENT',
          description: `Instadapp ADDED Connector Event is detected.`,
          alertId: 'INSTADAPP-16',
          protocol: 'INSTADAPP',
          type: FindingType.Info,
          severity: FindingSeverity.Info,
        }),
      ])
    })

    it('should return Updated Connector Event finding', async () => {
      const topicHash: string = generateHash(UPDATED_CONNECTOR)

      const GovEvent = {
        topics: [topicHash],
        address: INSTADAPP_CONNECTOR_ADDRESS,
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
      })

      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: 'INSTADAPP CONNECTOR EVENT',
          description: `Instadapp UPDATED Connector Event is detected.`,
          alertId: 'INSTADAPP-16',
          protocol: 'INSTADAPP',
          type: FindingType.Info,
          severity: FindingSeverity.Info,
        }),
      ])
    })

    it('should return Removed Connector Event finding', async () => {
      const topicHash: string = generateHash(REMOVED_CONNECTOR)

      const GovEvent = {
        topics: [topicHash],
        address: INSTADAPP_CONNECTOR_ADDRESS,
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
      })

      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: 'INSTADAPP CONNECTOR EVENT',
          description: `Instadapp REMOVED Connector Event is detected.`,
          alertId: 'INSTADAPP-16',
          protocol: 'INSTADAPP',
          type: FindingType.Info,
          severity: FindingSeverity.Info,
        }),
      ])
    })
  })

  describe('Failed connector Transactions', () => {
    it('should return Failed Added Connector Event finding', async () => {
      const topicHash: string = generateHash(ADDED_CONNECTOR)

      const GovEvent = {
        topics: [topicHash],
        address: INSTADAPP_CONNECTOR_ADDRESS,
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
        status: false,
      })

      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: 'INSTADAPP CONNECTOR EVENT',
          description: `Instadapp Failed ADDED Connector event is detected.`,
          alertId: 'INSTADAPP-15',
          protocol: 'INSTADAPP',
          type: FindingType.Suspicious,
          severity: FindingSeverity.High,
        }),
      ])
    })

    it('should return Failed Updated Connector Event finding', async () => {
      const topicHash: string = generateHash(UPDATED_CONNECTOR)

      const GovEvent = {
        topics: [topicHash],
        address: INSTADAPP_CONNECTOR_ADDRESS,
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
        status: false,
      })

      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: 'INSTADAPP CONNECTOR EVENT',
          description: `Instadapp Failed UPDATED Connector event is detected.`,
          alertId: 'INSTADAPP-15',
          protocol: 'INSTADAPP',
          type: FindingType.Suspicious,
          severity: FindingSeverity.High,
        }),
      ])
    })

    it('should return Failed Removed Connector Event finding', async () => {
      const topicHash: string = generateHash(REMOVED_CONNECTOR)

      const GovEvent = {
        topics: [topicHash],
        address: INSTADAPP_CONNECTOR_ADDRESS,
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
        status: false,
      })

      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: 'INSTADAPP CONNECTOR EVENT',
          description: `Instadapp Failed REMOVED Connector event is detected.`,
          alertId: 'INSTADAPP-15',
          protocol: 'INSTADAPP',
          type: FindingType.Suspicious,
          severity: FindingSeverity.High,
        }),
      ])
    })
  })
})
