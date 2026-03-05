export interface SignedEnvelope<T> {
  payload: T
  signature: string
  timestamp: string
  agent_id: string
}