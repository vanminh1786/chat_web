const db = require('../db.js');
const bcrypt = require('bcryptjs');

class LoginController {
	async login(req, res) {
		try {
			const phone = req.body.phone.toString();
			const pw = req.body.pw.toString();
			// console.log(phone, pw);

			if (phone == '') return res.send({ success: 0 });

			//Check phone
			const users = await (await db.collection('users').get()).docs;
			const success = users.find((user) => {
				return user.data().phone == phone;
			});

			// console.log(success.id);

			if (!success) return res.send({ success: 0 });

			//Check password
			const hash = success.data().pw;
			bcrypt.compare(pw, hash, async function (err, isMatch) {
				if (err) return console.error(err);
				if (isMatch) {
					console.log('Password match!');
					//Send user's data to client
					const user = {
						name: success.data().name,
						userId: success.data().uid,
						phone: success.data().phone,
						id: success.id,
						friend: success.data().friend,
					};

					//Send user's conversation to client
					const userConversation = [];
					const docs = await (await db.collection('conversation').get()).docs;
					const cvs = docs.map((doc) => {
						return doc.data();
					});
					// console.log(cvs);
					cvs.forEach((curCvs) => {
						// console.log(dialog.chatroom);
						if (curCvs.uids.includes(user.userId)) {
							userConversation.push(curCvs);
						}
					});
					// console.log(userConversation);

					return res.send({
						success: 1,
						user: user,
						conversation: userConversation,
					});
				} else {
					console.log("Password doesn't match!");
					return res.send({ success: 0 });
				}
			});
		} catch (err) {}
	}
}

module.exports = new LoginController();
