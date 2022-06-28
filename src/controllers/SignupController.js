const db = require('../db.js');
const bcrypt = require('bcryptjs');

const saltRounds = 12;

class SignupController {
	async checkPhone(req, res) {
		try {
			const phone = req.body.phone.toString();
			const pw = req.body.pw.toString();
			// console.log(phone);

			const users = await (await db.collection('users').get()).docs;

			const success = users.some((user, index) => {
				return user.data().phone == phone || phone == '';
			});

			console.log(success.id);
			// console.log((users[users.length - 1].uid));

			if (!success) {
				bcrypt.genSalt(saltRounds, function (err, salt) {
					if (err) {
						throw err;
					} else {
						bcrypt.hash(pw, salt, function (err, hash) {
							if (err) {
								throw err;
							} else {
								// console.log(hash);
								const uid = users.length + 1;
								db.collection('users').add({
									name: req.body.name,
									phone: phone,
									pw: hash,
									uid: uid.toString(),
									friend: [],
								});
							}
						});
					}
				});
			}

			return res.send({ success: success });
		} catch (err) {}
	}
}

module.exports = new SignupController();
