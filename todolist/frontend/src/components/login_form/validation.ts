export const loginValidation = {
    required: 'You should fill it',
    validate: (value: string) => {
        if(value.match(/[а-яА-Я]/)) {
            return 'Login cannot fill this letters'
        } else {
            return true;
        }
    }
}

export const passwordValidation = {
    required: 'You should fill it',
    validate: (value: string) => {
        if(value.length > 15) {
            return 'Password to long!'
        } else {
            return true;
        }
    }
}