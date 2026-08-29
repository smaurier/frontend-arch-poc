export type AlarmSeverity = 'warning' | 'critical';

export interface AlarmIndicatorProps {
  severity: AlarmSeverity;
  label: string;
  since?: number; // Unix ms — when the alarm started
  now?: number;
}
