export interface ConnectionConfig {
  id: string;
  signalServerConfig: SignalServerConfig;
  stunServerConfig: StunServerConfig;
  turnServerConfig: TurnServerConfig;
}

export interface SignalServerConfig {
  protocol: Protocol;
  ip: string;
  port: PortInputType;
}

export interface StunServerConfig {
  ip: string;
  port: PortInputType;
}

export interface TurnServerConfig {
  ip: string;
  port: PortInputType;
  username?: string;
  password?: string;
}

export interface ConnectionRecord {
  config: ConnectionConfig;
  time: string;
}

export type PortInputType = number | '';

export type Protocol = 'http' | 'https' | 'ws' | 'wss';
