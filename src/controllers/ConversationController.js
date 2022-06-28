const db = require('../db.js');

class Conversation {
	async getCvs(req, res) {
		try {
			const uid1 = req.body.uid1.toString();
			const uid2 = req.body.uid2.toString();
			// console.log(uid1, uid2, typeof uid1, typeof uid2);

			const docs = await (await db.collection('conversation').get()).docs;

			const result = docs.find((cur) => {
				return cur.data().uids.includes(uid1) && cur.data().uids.includes(uid2);
			});
			// console.log(result);

			return res.send({
				id: result.id,
				cvs: result.data().conv,
			});
		} catch (err) {}
	}

	async updateCvs(req, res) {
		try {
			const id = req.body.id.toString();
			const uids = req.body.uids;
			const conv = req.body.conv;

			await db.collection('conversation').doc(id).update({
				uids: uids,
				conv: conv,
			});
			return res.sendStatus(200);
		} catch (err) {}
	}
}

module.exports = new Conversation();
