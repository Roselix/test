'use strict';

let https = require('https');
const Autolinker = require('autolinker');

Galaxy.nameColor = function (name, bold, userGroup) {
	let userGroupSymbol = Users.usergroups[toId(name)] ? '<b><font color=#948A88>' + Users.usergroups[toId(name)].substr(0, 1) + '</font></b>' : "";
	return (userGroup ? userGroupSymbol : "") + (bold ? "<b>" : "") + "<font color=" + Galaxy.hashColor(name) + ">" + (Users(name) && Users(name).connected && Users.getExact(name) ? Chat.escapeHTML(Users.getExact(name).name) : Chat.escapeHTML(name)) + "</font>" + (bold ? "</b>" : "");
};
// usage: Galaxy.nameColor(user.name, true) for bold OR Galaxy.nameColor(user.name, false) for non-bolded.

Galaxy.messageSeniorStaff = function (message, pmName, from) {
	pmName = (pmName ? pmName : '~Galaxy Server');
	from = (from ? ' (PM from ' + from + ')' : '');
	Users.users.forEach(curUser => {
		if (curUser.group === '~' || curUser.group === '☥' || curUser.group === '&') {
			curUser.send('|pm|' + pmName + '|' + curUser.getIdentity() + '|' + message + from);
		}
	});
};
// format: Galaxy.messageSeniorStaff('message', 'person')
//
// usage: Galaxy.messageSeniorStaff('Mystifi is a confirmed user and they were banned from a public room. Assess the situation immediately.', '~Server')
//
// this makes a PM from ~Server stating the message

Galaxy.parseMessage = function (message) {
	if (message.substr(0, 5) === "/html") {
		message = message.substr(5);
		message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, '<i>$1</i>'); // italics
		message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, '<b>$1</b>'); // bold
		message = message.replace(/\~\~([^< ](?:[^<]*?[^< ])?)\~\~/g, '<strike>$1</strike>'); // strikethrough
		message = message.replace(/&lt;&lt;([a-z0-9-]+)&gt;&gt;/g, '&laquo;<a href="/$1" target="_blank">$1</a>&raquo;'); // <<roomid>>
		message = Autolinker.link(message.replace(/&#x2f;/g, '/'), {stripPrefix: false, phone: false, twitter: false});
		return message;
	}
	message = Chat.escapeHTML(message).replace(/&#x2f;/g, '/');
	message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, '<i>$1</i>'); // italics
	message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, '<b>$1</b>'); // bold
	message = message.replace(/\~\~([^< ](?:[^<]*?[^< ])?)\~\~/g, '<strike>$1</strike>'); // strikethrough
	message = message.replace(/&lt;&lt;([a-z0-9-]+)&gt;&gt;/g, '&laquo;<a href="/$1" target="_blank">$1</a>&raquo;'); // <<roomid>>
	message = Autolinker.link(message, {stripPrefix: false, phone: false, twitter: false});
	return message;
};

Galaxy.randomString = function (length) {
	return Math.round((Math.pow(36, length + 1) - Math.random() * Math.pow(36, length))).toString(36).slice(1);
};

Galaxy.reloadCSS = function () {
	const cssPath = 'Galaxy'; // This should be the server id if Config.serverid doesn't exist. Ex: 'serverid'
	let options = {
		host: 'play.pokemonshowdown.com',
		port: 80,
		path: '/customcss.php?server=' + (Config.serverid || cssPath),
		method: 'GET',
	};
	https.get(options);
};

//Daily Rewards System for SpacialGaze by Lord Haji
Galaxy.giveDailyReward = function (userid, user) {
	if (!user || !userid) return false;
	userid = toId(userid);
	if (!Db('DailyBonus').has(userid)) {
		Db('DailyBonus').set(userid, [1, Date.now()]);
		return false;
	}
	let lastTime = Db('DailyBonus').get(userid)[1];
	if ((Date.now() - lastTime) < 86400000) return false;
	if ((Date.now() - lastTime) >= 127800000) Db('DailyBonus').set(userid, [1, Date.now()]);
	if (Db('DailyBonus').get(userid)[0] === 8) Db('DailyBonus').set(userid, [7, Date.now()]);
	Economy.writeMoney(userid, Db('DailyBonus').get(userid)[0]);
	user.send('|popup||wide||html| <center><u><b><font size="3">Galaxy Daily Bonus</font></b></u><br>You have been awarded ' + Db('DailyBonus').get(userid)[0] + ' Buck.<br>' + showDailyRewardAni(userid) + '<br>Because you have connected to the server for the past ' + Db('DailyBonus').get(userid)[0] + ' Days.</center>');
	Db('DailyBonus').set(userid, [(Db('DailyBonus').get(userid)[0] + 1), Date.now()]);
};


function showDailyRewardAni(userid) {
	userid = toId(userid);
	let streak = Db('DailyBonus').get(userid)[0];
	let output = '';
	for (let i = 1; i <= streak; i++) {
		output += "<img src='http://i.imgur.com/ZItWCLB.png' width='16' height='16'> ";
	}
	return output;
}
