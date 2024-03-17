import { ReactElement, ReactNode } from 'react';
import { ptBR, enUS } from '@mui/x-date-pickers/locales';

export enum Roles {
  USER = 'user',
  ADMIN = 'admin',
}

export enum EnvironmentStatus {
  AVAILABLE = 'available',
  MAINTENANCE = 'maintenance',
  DISABLED = 'disabled',
}

export enum ReservationStatus {
  APPROVED = 'approved',
  PENDING = 'pending',
  NOT_APPROVED = 'not_approved',
  CANCELLED = 'cancelled',
}

export const dateTimeConfig = {
  'en-US': { format: 'MM/DD/YYYY HH:mm', locale: enUS.components.MuiLocalizationProvider.defaultProps.localeText },
  'pt-BR': { format: 'DD/MM/YYYY HH:mm', locale: ptBR.components.MuiLocalizationProvider.defaultProps.localeText },
};

export interface IDashboardData {
  userQty: number;
  environmentQty: number;
  envReservationsQty: number;
}

export interface IGoogleOAuth {
  token: string;
}

export interface IFacebookOAuth {
  email: string;
  accessToken: string;
}

export interface IAuthProps {
  email: string;
  password: string;
}

export interface IDataElementProps<T> {
  data: T;
}

export interface IModalReservations {
  isOpen: boolean;
  data: any;
}

export interface IUser {
  id: string;
  avatar: string;
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: Roles;
  is_active: boolean;
  partial_token: string;
  created_at: string;
  updated_at: string;
}

export interface IEnvironment {
  id: string;
  name: string;
  description: string;
  status: string;
  image: string;
  capacity: string;
  created_at: string;
  updated_at: string;
}

export interface ICreateEnvironment {
  name: string;
  description: string;
  image?: File;
  capacity: string;
}
export interface IDeleteModal {
  id: string;
  name: string;
  source?: string;
}

export interface IEditUser {
  id: string;
  avatar: string | File;
  password: string;
  passwordConfirmation: string;
  name?: string;
  created_at: string;
  role: Roles;
}

export interface IEditEnvironment {
  id: string;
  name: string;
  description: string;
  status?: string;
  image: string | File;
  capacity: string;
}

export interface IReservations {
  id: string;
  environment: IEnvironment;
  user: IUser;
  date_in: string;
  date_out: string;
  status: string;
  created_at: string;
}
export interface ICreateReservation {
  environment_id: string;
  date_in: string;
  date_out: string;
}

export interface ICancelReservation {
  id: string;
  name: string;
  index: number;
}
export interface IApproveReservation {
  id: string;
  name: string;
  index: number;
}
export interface IDisapproveReservation {
  id: string;
  name: string;
  index: number;
}

export const handleStatus: { [key: string]: { value: string; customClass: string } } = {
  approved: { value: 'Aprovado', customClass: 'status-approved' },
  pending: { value: 'Pendente', customClass: 'status-pending' },
  not_approved: { value: 'Não aprovado', customClass: 'status-not-approved' },
  cancelled: { value: 'Cancelado', customClass: 'status-cancelled' },
  available: { value: 'Disponível', customClass: 'status-available' },
  maintenance: { value: 'Em manutenção', customClass: 'status-maintenance' },
  disabled: { value: 'Desativado', customClass: 'status-disabled' },
};

export const createUserMessages: { [key: string]: string } = {
  'User created successfully': 'Email cadastrado com sucesso.',
  'This email exist on our databases, an email with confirmate instructions will be sent':
    'Email previamente cadastrado, instruções serão enviadas para cadastro de senha.',
  "There's an email conflict": 'Email já existe.',
  'email must be valid': 'Email deve ser válido.',
};

export const resetUserPasswordMessages: { [key: string]: string } = {
  'An email with recovery password instructions will be sent': 'Enviaremos um email com as instruções.',
  "There are something wrong in email's smtp": 'Estamos passando por inconcistências, agradecemos a compreensão.',
};

export const deleteMessages: { [key: string]: string } = {
  'User deleted successfully': 'Usuário apagado com sucesso.',
  'Not Found': 'Já excluido.',
  'Validation failed (uuid is expected)': 'ID inválido.',
  'Environment deleted successfully': 'Ambiente apagado com sucesso.',
};

export const editUserMessages: { [key: string]: string } = {
  OK: 'Usuário atualizado com sucesso.',
};

export const editMyselUserfMessages: { [key: string]: string } = {
  OK: 'Suas informações foram atualizadas com sucesso.',
};

export const editEnvironmentMessages: { [key: string]: string } = {
  OK: 'Ambiente atualizado com sucesso.',
};

export const createEnvironmentMessages: { [key: string]: string } = {
  Created: 'Ambiente criado com sucesso.',
};

export interface IResultReservation {
  message: string;
  icon: ReactElement;
}

export interface IResult {
  result: boolean;
  message: string;
}

export interface Iprops {
  children: ReactNode;
}

export interface IStorageState<T> {
  state: T;
  set: (newValue: T) => void;
  remove: () => void;
}

export enum Case {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
}

export interface IToastNotification {
  type: Case;
  customClass?: string;
  message: string;
}

export interface IUpdateReservationDto {
  status: ReservationStatus;
}
