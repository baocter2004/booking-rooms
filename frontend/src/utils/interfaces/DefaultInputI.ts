import { Control } from 'react-hook-form';

export default interface DefaultInputI {
  name: string;
  /* eslint-disable  @typescript-eslint/no-explicit-any */
  control?: Control<any>;
  rules?: any;
  defaultValue?: string | number;
  type?: 'text' | 'password' | 'email' | 'number' | 'time' | 'radio' | 'date';
  required?: boolean;
  label?: string;
  showLabel?: boolean;
  disabled?: boolean;
  placeholder?: string;
  description?: string;
  descriptionClass?: string;
}
