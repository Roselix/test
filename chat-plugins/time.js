'use strict';
/********************
 * Time Commands
 * This file contains commands that keep track of user's activity.
 ********************/
 let rankLadder = require('../rank-ladder');

function convertTime(time) {
	time = time / 1000;
	let seconds = time % 60;
	time /= 60;
	let minutes = time % 60;
	time /= 60;
	let hours = time;
	return {
		s: Math.floor(seconds),
		m: Math.floor(minutes),
		h: Math.floor(hours),
	};
}

function displayTime(t) {
	return t.h + (t.h === 1 ? " hour " : " hours ") + t.m + (t.m === 1 ? " minute " : " minutes ") + t.s + (t.s === 1 ? " second" : " seconds");
}

exports.commands = {
	'!ontime': true,
	nolife: 'ontime',
	userontime: 'ontime',
	ontime: function (target, room, user) {
		if (!this.runBroadcast()) return;

		const userid = target ? toId(target) : user.userid;
		const currentOntime = Ontime[userid] ? Date.now() - Ontime[userid] : 0;
		const totalOntime = Db('ontime').get(userid, 0) + currentOntime;

		if (!totalOntime) return this.sendReplyBox(Galaxy.nameColor(userid, true) + " has never been online on this server.");
		const isConnected = Users.get(userid) && Users.get(userid).connected;

		// happens when a user opens 2 tabs and closes one of them, removing them from the Ontime object
		if (isConnected && !Ontime[userid]) Ontime[userid] = Date.now();

		if (isConnected) {
			this.sendReplyBox(Galaxy.nameColor(userid, true) + '\'s total ontime is <strong>' + displayTime(convertTime(totalOntime)) + '</strong>.' + ' Current ontime: <strong>' + displayTime(convertTime((currentOntime))) + '</strong>.');
		} else {
			this.sendReplyBox(Galaxy.nameColor(userid, true) + '\'s total ontime is <strong>' + displayTime(convertTime(totalOntime)) + '</strong>.' + ' Currently not online.');
		}
	},

	nolifeladder: 'ontimeladder',
	mostonline: 'ontimeladder',
	ontimeladder: function (target, room, user) {
		if (!this.runBroadcast()) return;
		let keys = Object.keys(Db('ontime').object()).map(function (name) {
			let currentOntime = 0;
			if (Ontime[name]) currentOntime = Date.now() - Ontime[name];
			const totalOntime = Db('ontime').get(name, 0) + currentOntime;
			return {
				name: name,
				time: totalOntime,
			};
		});
		if (!keys.length) return this.sendReplyBox("Ontime ladder is empty.");
		keys.sort(function (a, b) {
			return b.time - a.time;
		});
		keys = keys.slice(0, 100).map(function (user) {
			return {
				name: user.name,
				time: displayTime(convertTime(user.time)),
			};
		});
		this.sendReplyBox(rankLadder('Ontime Ladder', 'Total Ontime', keys, 'time'));
	},
};
