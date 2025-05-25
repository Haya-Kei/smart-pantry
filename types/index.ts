export interface Schema {
  fields: Field[];
}

export interface Field {
  name: string;
  label: string;
  type: 'string' | 'textarea' | 'file' | 'reaction';
  required: boolean;
  column_width: number;
  options?: FieldOption[];
}

export interface FieldOption {
  value: string;
  label: string;
} 