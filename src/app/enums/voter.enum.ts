export enum VoterError {
    FORM_ERROR = 'Por favor complete todos los campos correctamente.',
    VOTER_ALREADY_EXIST = 'Voter already exists',
    ERROR = 'Error'
}

export enum VoterMessageSummary {
    VOTE_SUCCESS = 'Exitoso',
    ERROR = 'Error',
    UNKNOWN_ERROR = 'Error desconocido'
}

export enum VoterMessageDetail {
    VOTER_ALREADY_EXIST = 'El votante ya esta registrado',
    VOTER_ADDED_SUCCESS = 'Votante agregado exitosamente.',
    UNKNOWN_ERROR = 'Ha ocurrido un error. Intente nuevamente.'
}