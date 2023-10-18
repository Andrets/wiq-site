export const linkValidation = {
    required: 'You should fill it',
    validate: (value: string) => {
        if (value.match(/[https://www.+.com]/)) {
            return true;
        } else {
            return 'Please fill right link'
        }
    }
}