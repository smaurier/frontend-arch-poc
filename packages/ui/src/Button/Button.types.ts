export type ButtonVariant = 'primary' | 'secondary';

export interface ButtonProps {
  disabled?: boolean;
  variant?: ButtonVariant;
  ariaLabel?: string;
}
