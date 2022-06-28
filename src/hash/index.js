



const passwordEnteredByUser = 'mypass13';
const hash = '$2a$10$GuIjyfKKYCaSuAq9/BkTaeHlYGre2FJBj.4DxngtlTmIyWQBUPkoW';

bcrypt.compare(passwordEnteredByUser, hash, function (err, isMatch) {
	if (err) {
		throw err;
	} else if (!isMatch) {
		console.log("Password doesn't match!");
	} else {
		console.log('Password matches!');
	}
});