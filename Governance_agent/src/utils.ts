import keccak256 from 'keccak256'

export const INSTADAPP_GOVERNANCE_ADDRESS =
  '0x0204Cd037B2ec03605CFdFe482D8e257C765fA1B'


// An event emitted when a proposal has been canceled
export const PROPOSAL_CANCEL_SIGNATURE = 'ProposalCanceled(uint256)'

// An event emitted when a proposal has been queued
export const PROPOSAL_QUEUED_SIGNATURE = 'ProposalQueued(uint256,uint256)'

// An event emitted when a proposal has been executed
export const PROPOSAL_EXECUTED_SIGNATURE = 'ProposalExecuted(uint256)'


export const generateHash = (signature: string): string => {
  const hash = keccak256(signature).toString('hex')
  return '0x' + hash
}

export const Sigs: any = {
  QUEUE: PROPOSAL_QUEUED_SIGNATURE,
  EXECUTE: PROPOSAL_EXECUTED_SIGNATURE,
  CANCEL: PROPOSAL_CANCEL_SIGNATURE,
}

