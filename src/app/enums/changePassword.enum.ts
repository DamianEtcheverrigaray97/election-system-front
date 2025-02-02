export enum ChangePasswordMessageSummary {
    ERROR = 'Error',
    SUCCESS = 'Exitoso',
}

export enum ChangePasswordError {
    NEW_PASSWORD_SAME_AS_CURRENT = 'New password cannot be the same as the current password',
    INCORRECT_CURRENT_PASSWORD = 'The current password is incorrect',
    UNKNOWN_ERROR = 'Hubo un error inesperado',
}
  
export enum ChangePasswordMessage {
    INCORRECT_CURRENT_PASSWORD = 'La contraseña actual es incorrecta',
    FORM_INCOMPLETE = 'Por favor, complete todos los campos.',
    PASSWORD_MISMATCH = 'Las contraseñas no coinciden',
    PASSWORD_SUCCESS = 'Contraseña actualizada exitosamente',
}
  
