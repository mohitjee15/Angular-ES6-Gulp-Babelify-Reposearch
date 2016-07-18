import template from './errorMessage.html';
const ErrorMessage = {
    template: template,
    bindings: {
        message: '@'
    }
};

export default ErrorMessage;