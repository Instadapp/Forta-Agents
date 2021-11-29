import keccak256 from 'keccak256'

export const INSTADAPP_CONNECTOR_ADDRESS =
  '0x97b0B3A8bDeFE8cB9563a3c610019Ad10DB8aD11'

export const UPDATED_CONNECTOR =
  'LogConnectorUpdated(bytes32,string,address,address)'

export const ADDED_CONNECTOR =
  'LogConnectorAdded(bytes32,string,address)'

export const REMOVED_CONNECTOR =
  'LogConnectorRemoved(bytes32,string,address)'


export const generateHash = (signature: string): string => {
  const hash = keccak256(signature).toString('hex')
  return '0x' + hash
}

export const Sigs: any = {
  UPDATED: UPDATED_CONNECTOR,
  ADDED: ADDED_CONNECTOR,
  REMOVED: REMOVED_CONNECTOR,
}

export enum TOPICS {
  UPDATED = 'UPDATED',
  ADDED = 'ADDED',
  REMOVED = 'REMOVED',
}
