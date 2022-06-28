const db = require('../db.js');

class UserController {
	async getUsers(req, res) {
		try {
			const phone = req.body.phone.toString();
			const users = await (await db.collection('users').get()).docs;
			const rs = users.find((user) => {
				return user.data().phone == phone;
			});

			if (!rs) return res.send({ rs: 0 });
			return res.send({
				name: rs.data().name,
				uid: rs.data().uid,
			});
		} catch (err) {}
	}

	async addFriends(req, res) {
		try {
			const name1 = req.body.name1.toString();
			const name2 = req.body.name2.toString();
			const uid1 = req.body.uid1.toString();
			const uid2 = req.body.uid2.toString();

			const users = await (await db.collection('users').get()).docs;
			const user1 = users.find((user) => {
				return user.data().uid == uid1;
			});
			const user2 = users.find((user) => {
				return user.data().uid == uid2;
			});

			let friend1 = user1.data().friend;
			const rs = friend1.find((friend) => {
				return friend.uid == uid2;
			});

			if (rs) return res.sendStatus(200);

			friend1.push({
				uid: uid2,
				name: name2,
			});
			await db.collection('users').doc(user1.id).set(
				{
					friend: friend1,
				},
				{ merge: true }
			);

			let friend2 = user2.data().friend;
			const rs2 = friend2.find((friend) => {
				return friend.uid == uid1;
			});
			friend2.push({
				uid: uid1,
				name: name1,
			});
			await db.collection('users').doc(user2.id).set(
				{
					friend: friend2,
				},
				{ merge: true }
			);
			// console.log(2);
			// console.log(friend1, friend2);

			await db.collection('conversation').add({
				uids: [uid1, uid2],
				conv: [],
			});

			return res.sendStatus(200);
		} catch (err) {}
	}
}

module.exports = new UserController();
