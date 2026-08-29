export type BadgeStatus = 'ok' | 'warning' | 'critical' | 'neutral';

export interface BadgeProps {
  status: BadgeStatus;
  label: string;
}
