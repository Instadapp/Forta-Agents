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
  INSTADAPP_IMPLEMENTATION_ADDRESS,
  SETDEFAULT_IMPLEMENTATION,
  ADD_IMPLEMENTATION,
  REMOVE_IMPLEMENTATION,
  generateHash,
} from './utils'

describe('Detect Instadapp Implementation Contract Event', () => {
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
        address: INSTADAPP_IMPLEMENTATION_ADDRESS,
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
      })
      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([])
    })

    it('should return empty finding - wrong address', async () => {
      const topicHash: string = generateHash(ADD_IMPLEMENTATION)

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
      const topicHash: string = generateHash(ADD_IMPLEMENTATION)

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

  describe('Successed Implementation Transactions', () => {
    it('should return SETDEFAULT Event finding', async () => {
      const topicHash: string = generateHash(SETDEFAULT_IMPLEMENTATION)

      const GovEvent = {
        topics: [topicHash],
        address: INSTADAPP_IMPLEMENTATION_ADDRESS,
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
      })

      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: 'Instadapp Implementation EVENT',
          description: `Instadapp SETDEFAULT Implementation Event is detected.`,
          alertId: 'Instadapp-14',
          protocol: 'Instadapp',
          type: FindingType.Unknown,
          severity: FindingSeverity.Info,
        }),
      ])
    })

    it('should return ADD Event finding', async () => {
      const topicHash: string = generateHash(ADD_IMPLEMENTATION)

      const GovEvent = {
        topics: [topicHash],
        address: INSTADAPP_IMPLEMENTATION_ADDRESS,
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
      })

      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: 'Instadapp Implementation EVENT',
          description: `Instadapp ADD Implementation Event is detected.`,
          alertId: 'Instadapp-14',
          protocol: 'Instadapp',
          type: FindingType.Unknown,
          severity: FindingSeverity.Info,
        }),
      ])
    })

    it('should return REMOVE Event finding', async () => {
      const topicHash: string = generateHash(REMOVE_IMPLEMENTATION)

      const GovEvent = {
        topics: [topicHash],
        address: INSTADAPP_IMPLEMENTATION_ADDRESS,
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
      })

      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: 'Instadapp Implementation EVENT',
          description: `Instadapp REMOVE Implementation Event is detected.`,
          alertId: 'Instadapp-14',
          protocol: 'Instadapp',
          type: FindingType.Unknown,
          severity: FindingSeverity.Info,
        }),
      ])
    })
  })

  describe('Failed implementation Transactions', () => {
    it('should return Failed SETDEFAULT Implementation Event finding', async () => {
      const topicHash: string = generateHash(SETDEFAULT_IMPLEMENTATION)

      const GovEvent = {
        topics: [topicHash],
        address: INSTADAPP_IMPLEMENTATION_ADDRESS,
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
        status: false,
      })

      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: 'Instadapp Implementation EVENT',
          description: `Instadapp Failed SETDEFAULT Implementation event is detected.`,
          alertId: 'Instadapp-13',
          protocol: 'Instadapp',
          type: FindingType.Suspicious,
          severity: FindingSeverity.High,
        }),
      ])
    })

    it('should return Failed ADD Implementation Event finding', async () => {
      const topicHash: string = generateHash(ADD_IMPLEMENTATION)

      const GovEvent = {
        topics: [topicHash],
        address: INSTADAPP_IMPLEMENTATION_ADDRESS,
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
        status: false,
      })

      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: 'Instadapp Implementation EVENT',
          description: `Instadapp Failed ADD Implementation event is detected.`,
          alertId: 'Instadapp-13',
          protocol: 'Instadapp',
          type: FindingType.Suspicious,
          severity: FindingSeverity.High,
        }),
      ])
    })

    it('should return Failed REMOVE Event finding', async () => {
      const topicHash: string = generateHash(REMOVE_IMPLEMENTATION)

      const GovEvent = {
        topics: [topicHash],
        address: INSTADAPP_IMPLEMENTATION_ADDRESS,
      }
      const txEvent = createTxEvent({
        logs: [GovEvent],
        status: false,
      })

      const findings = await handleTransaction(txEvent)

      expect(findings).toStrictEqual([
        Finding.fromObject({
          name: 'Instadapp Implementation EVENT',
          description: `Instadapp Failed REMOVE Implementation event is detected.`,
          alertId: 'Instadapp-13',
          protocol: 'Instadapp',
          type: FindingType.Suspicious,
          severity: FindingSeverity.High,
        }),
      ])
    })
  })
})

