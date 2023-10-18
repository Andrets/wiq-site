const REQUIRED_FILL = 'You shoild fill it'

export const usernameValidation = {
    required: REQUIRED_FILL,
    validate: (value: string) => {
        if (value.match(/[а-яА-Я./^%$#@!&*()~`]/)) {
            return 'The password must consist of letters and numbers'
        } else {
            return true;
        }
    }
}

export const passwordValidation = {
    required: REQUIRED_FILL,
    validate: (value: string) => {
        if(value.length > 20) {
            return 'Password to long'
        } else {
            return true;
        }
    }
}

export const emailValidation = {
    required: REQUIRED_FILL,
    validate: (value:string) => {
        if (value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)) {
            return true;
        } else {
            return 'Use correct email'
        }
    }
}