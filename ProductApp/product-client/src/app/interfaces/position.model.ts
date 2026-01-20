export interface Position {
  id?: number;
  name: string;
  description?: string;
  department: string;
  salary?: number;
  isActive: boolean;
  permissions?: string[];
}

export interface PositionFilter {
  department?: string;
  isActive?: boolean;
  search?: string;
}

export interface PositionFormData {
  name: string;
  description: string;
  department: string;
  salary: number;
  isActive: boolean;
  permissions: string[];
}
