module.exports = {
    validateCreateContactInput: (request) => {
        request.checkBody('name', 'Name is required').notEmpty();
        request.checkBody('phonenumber', 'Phone Number is required').notEmpty();
        request.sanitize('name').escape();
        request.sanitize('name').trim();
        request.sanitize('phonenumber').escape();
        request.sanitize('phonenumber').trim();
    },

    validateSmsInput: (request) => {
        request.checkBody('sender', 'A receiver is required').notEmpty();
        request.checkBody('receiver', 'A receiver is required').notEmpty();
        request.checkBody('message', 'Message body is required').notEmpty();
        request.sanitize('sender').escape();
        request.sanitize('sender').trim();
        request.sanitize('receiver').escape();
        request.sanitize('receiver').trim();
        request.sanitize('message').escape();
        request.sanitize('message').trim();
    }
};