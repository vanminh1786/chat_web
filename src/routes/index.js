const loginRouter = require('./login');
const signupRouter = require('./signup');
const cvsRouter = require('./cvs');
const userRouter = require('./user');

function router(app) {
	app.use('/login', loginRouter);
	app.use('/signup', signupRouter);
	app.use('/cvs', cvsRouter);
	app.use('/user', userRouter);
}

module.exports = router;
