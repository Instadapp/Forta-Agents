import keccak256 from 'keccak256'

export const INSTADAPP_IMPLEMENTATION_ADDRESS =
  '0xCBA828153d3a85b30B5b912e1f2daCac5816aE9D'

export const SETDEFAULT_IMPLEMENTATION =
  'LogSetDefaultImplementation(address,address)'

export const ADD_IMPLEMENTATION =
  'LogAddImplementation(address,bytes4[])'

export const REMOVE_IMPLEMENTATION =
  'LogRemoveImplementation(address,bytes4[])'


export const generateHash = (signature: string): string => {
  const hash = keccak256(signature).toString('hex')
  return '0x' + hash
}

export const Sigs: any = {
  SETDEFAULT: SETDEFAULT_IMPLEMENTATION,
  ADD: ADD_IMPLEMENTATION,
  REMOVE: REMOVE_IMPLEMENTATION,
}

