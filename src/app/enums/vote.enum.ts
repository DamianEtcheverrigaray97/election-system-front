export enum VoteMessageSummary {
    FORM_ERROR = 'Error en el formulario',
    VOTE_SUCCESS = 'Voto Enviado',
    VOTE_ALREADY_REGISTERED = 'Voto ya registrado',
    VOTER_NOT_FOUND = 'Error',
    UNKNOWN_ERROR = 'Error desconocido'
}

export enum VoteMessageDetail {
    FORM_ERROR = 'Por favor complete todos los campos correctamente.',
    VOTE_SUCCESS = 'Tu voto ha sido registrado correctamente.',
    VOTE_ALREADY_REGISTERED = 'No puedes votar más de una vez.',
    VOTER_NOT_FOUND = 'El votante no fue encontrado.',
    UNKNOWN_ERROR = 'Ha ocurrido un error. Intente nuevamente.'
}

export enum VoteError {
    VOTER_ALREADY_VOTED = 'Voter has already voted',
    VOTER_NOT_FOUND = 'Voter not found'
}

