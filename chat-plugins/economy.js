'use strict';

const fs = require('fs');

// This should be the default amount of money users have.
// Ideally, this should be zero.
const DEFAULT_AMOUNT = 0;

global.moneyName = 'Galaxy Point';
global.moneyPlural = 'Galaxy Points';

/**
 * Gets an amount and returns the amount with the name of the money.
 *
 * @examples
 * currencyName(0); // 0 bucks
 * currencyName(1); // 1 buck
 * currencyName(5); // 5 bucks
 *
 * @param {Number} amount
 * @returns {String}
 */
function currencyName(amount) {
	let name = " Galaxy Point";
	return amount === 1 ? name : name + "s";
}

/**
 * Checks if the money input is actually money.
 *
 * @param {String} money
 * @return {String|Number}
 */
function isMoney(money) {
	let numMoney = Number(money);
	if (isNaN(money)) return "Must be a number.";
	if (numMoney < 1) return "Cannot be less than one buck.";
	return numMoney;
}

let shop = [
	['Symbol', 'Compra un simbolo personalizzato da sfoggiare in userlist. (durata temporanea fino al restart seguente, certi simboli non funzionano)', 5],
	['Coupon Lotteria B', 'Compra un biglietto della lotteria Base con un massimo di vincita di 15 bucks! Chiedi a uno staffer per maggiori info', 9],
    ['Coupon Lotteria DC', 'Compra un biglietto della lotteria Doppia Chance, con un massimo di vincita di 15 bucks!  Grazie a questo speciale coupon, se non gradisci il primo premio estratto, ne puoi richiedere un secondo, gratis! Chiedi a uno staffer per maggiori info', 10],
	['Coupon Lotteria M', 'Compra un biglietto della lotteria Medium con un massimo di vincita di 30 bucks! Chiedi a uno staffer per maggiori info', 17],
	['Coupon Lotteria S', 'Compra un biglietto della lotteria Super con un massimo di vincita di 60 bucks! Chiedi a uno staffer per maggiori info', 32],
	['Coupon Lotteria XL', 'Compra un biglietto della lotteria  ExtraLarge con un massimo di vincita di 100 bucks! Chiedi a uno staffer per maggiori info', 58],
	['Coupon Lotteria Deluxe', 'Compra un biglietto della lotteria Deluxe con un massimo di vincita da 500 bucks! Chiedi a uno staffer per maggiori info', 275],
	['Coupon Lotteria ExtraDeluxe', 'Compra un biglietto della lotteria ExtraDel con un massimo di vincita da 1000 bucks! Chiedi a uno staffer per maggiori info', 660],
/*	['Money Mode', 'Dona una piccola somma per aiutare lo sviluppo del meta! Il minimo da donare è 20 bucks.', 20],*/
	['Musica', 'Compra una canzone o una composizione musicale da aggiungere al tuo profilo!', 40],
	['Room privata', 'Compra una room privata, ma ricorda che in caso di contravvenzioni può essere cancellata.', 580],
	['Avatar', 'Compra un avatar personalizzato da applicare al tuo nickname! (Immagini superiori alle dimensioni 80x80 potrebbero non mostrarsi correttamente)', 30],
	['Profile Team', 'Compra un team personalizzato da applicare al tuo profile!', 45],
	['Profile Background', 'Compra uno sfondo personalizzato da applicare al tuo profile!', 25],
	['Profile 3D Sprite', 'Compra uno sprite Pokémon 3D da applicare al tuo profile!', 25],
	['Profile Extra Info', 'Compra il permesso di inserire informazioni extra (Natura, Tipo, Pokémon preferito...) da applicare al tuo profile!', 15],
	['Icon', 'Compra una icon personalizzata da applicare in tutte le room. Le dimensioni devono essere 32x32.', 30],
	['Fix', 'Acquistando questo elemento potrai cambiare un qualsiasi oggetto già acquistato nello shop (icon, avatar...) senza doverlo ricomprare!', 10],
	['Color', 'Compra un colore personalizzato per il tuo nickname!', 30],
        ['Custom PM Box', 'Compra un riquadro personalizzato per la tua schermata PM per il tuo profilo!', 220],
/*	['Trainer Card', 'Compra una trainer card personalizzata per il tuo nickname!', 40],*/
	['VIP Status', 'Compra il VIP Status! Chi è VIP ha diritto a sconti del 15% su tutti i prodotti del server, un bonus di +3 [Solo se arrivate almeno 5°] in ogni torneo serale ed è ambito ed invidiato da tutti! [I VIP SI RESETTANO OGNI FINE MESE]', 2000],
];

let shopDisplay = getShopDisplay(shop);

/**
 * Displays the shop
 *
 * @param {Array} shop
 * @return {String} display
 */
function getShopDisplay(shop) {
	let display = "<table border='1' cellspacing='0' cellpadding='5' width='100%'>" +
					"<tbody><tr><th>Command</th><th>Description</th><th>Cost</th></tr>";
	let start = 0;
	while (start < shop.length) {
		display += "<tr>" +
						"<td align='center'><button name='send' value='/buy " + shop[start][0] + "'><b>" + shop[start][0] + "</b></button>" + "</td>" +
						"<td align='center'>" + shop[start][1] + "</td>" +
						"<td align='center'>" + shop[start][2] + "</td>" +
					"</tr>";
		start++;
	}
	display += "</tbody></table><center>To buy an item from the shop, use /buy <em>command</em>.</center>";
	return display;
}

let Economy = global.Economy = {
	/**
 	* Reads the specified user's money.
 	* If they have no money, DEFAULT_AMOUNT is returned.
 	*
 	* @param {String} userid
 	* @param {Function} callback
 	* @return {Function} callback
 	*/
	readMoney: function (userid, callback) {
		if (typeof callback !== 'function') {
			throw new Error("Economy.readMoney: Expected callback parameter to be a function, instead received " + typeof callback);
		}

		// In case someone forgot to turn `userid` into an actual ID...
		userid = toId(userid);

		let amount = Db('money').get(userid, DEFAULT_AMOUNT);
		return callback(amount);
	},
	/**
 	* Writes the specified amount of money to the user's "bank."
 	* If a callback is specified, the amount is returned through the callback.
 	*
 	* @param {String} userid
 	* @param {Number} amount
 	* @param {Function} callback (optional)
 	* @return {Function} callback (optional)
 	*/
	writeMoney: function (userid, amount, callback) {
		// In case someone forgot to turn `userid` into an actual ID...
		userid = toId(userid);

		// In case someone forgot to make sure `amount` was a Number...
		amount = Number(amount);
		if (isNaN(amount)) {
			throw new Error("Economy.writeMoney: Expected amount parameter to be a Number, instead received " + typeof amount);
		}

		let curTotal = Db('money').get(userid, DEFAULT_AMOUNT);
		Db('money').set(userid, curTotal + amount);
		let newTotal = Db('money').get(userid);

		if (callback && typeof callback === 'function') {
			// If a callback is specified, return `newTotal` through the callback.
			return callback(newTotal);
		}
	},
	writeMoneyArr: function (users, amount) {
		this.writeMoney(users[0], amount, () => {
			users.splice(0, 1);
			if (users.length > 0) this.writeMoneyArr(users, amount);
		});
	},
	logTransaction: function (message) {
		if (!message) return false;
		fs.appendFile('logs/transactions.log', '[' + new Date().toUTCString() + '] ' + message + '\n');
	},

	logDice: function (message) {
		if (!message) return false;
		fs.appendFile('logs/dice.log', '[' + new Date().toUTCString() + '] ' + message + '\n');
	},
};

function findItem(item, money) {
	let len = shop.length;
	let price = 0;
	let amount = 0;
	while (len--) {
		if (item.toLowerCase() !== shop[len][0].toLowerCase()) continue;
		price = shop[len][2];
		if (price > money) {
			amount = price - money;
			this.errorReply("You don't have you enough money for this. You need " + amount + currencyName(amount) + " more to buy " + item + ".");
			return false;
		}
		return price;
	}
	this.errorReply(item + " not found in shop.");
}

function handleBoughtItem(item, user, cost) {
	if (item === 'symbol') {
		user.canCustomSymbol = true;
		this.sendReply("You have purchased a custom symbol. You can use /customsymbol to get your custom symbol.");
		this.sendReply("You will have this until you log off for more than an hour.");
		this.sendReply("If you do not want your custom symbol anymore, you may use /resetsymbol to go back to your old symbol.");
	} else if (item === 'icon') {
		this.sendReply('You purchased an icon, contact an administrator to obtain the article.');
	} else if (item === 'profileteam') {
		Db('hasteam').set(user);
		this.sendReply('You can now set your team!');
	} else {
		let msg = '**' + user.name + " has bought " + item + ".**";
		Rooms.rooms.get("staff").add('|c|~Galaxy Server|' + msg);
		Rooms.rooms.get("staff").update();
		Users.users.forEach(function (user) {
			if (user.group === '~' || user.group === '&' || user.group === '@') {
				user.send('|pm|~Galaxy Server|' + user.getIdentity() + '|' + msg);
			}
		});
	}
}

exports.commands = {
	'!wallet': true,
	atm: 'wallet',
	wallet: function (target, room, user) {
		if (!target) target = user.name;
		if (!this.runBroadcast()) return;
		let userid = toId(target);
		if (userid.length < 1) return this.sendReply("/wallet - Please specify a user.");
		if (userid.length > 19) return this.sendReply("/wallet - [user] can't be longer than 19 characters.");

		Economy.readMoney(userid, money => {
			this.sendReplyBox(Galaxy.nameColor(target, true) + " has " + money + ((money === 1) ? " " + moneyName + "." : " " + moneyPlural + "."));
			//if (this.broadcasting) room.update();
		});
	},

	givebuck: 'givemoney',
	givebucks: 'givemoney',
	givemoney: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help givemoney');

		let parts = target.split(',');
		let username = parts[0];
		let amount = isMoney(parts[1]);

		if (typeof amount === 'string') return this.errorReply(amount);

		let total = Db('money').set(toId(username), Db('money').get(toId(username), 0) + amount).get(toId(username));
		amount = amount + currencyName(amount);
		total = total + currencyName(total);
		this.sendReply(username + " was given " + amount + ". " + username + " now has " + total + ".");
		if (Users.get(username)) Users(username).popup(user.name + " has given you " + amount + ". You now have " + total + ".");
		Economy.logTransaction(username + " was given " + amount + " by " + user.name + ". " + username + " now has " + total);
	},
	givemoneyhelp: ["/givemoney [user], [amount] - Give a user a certain amount of money."],

	takebuck: 'takemoney',
	takebucks: 'takemoney',
	takemoney: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target || target.indexOf(',') < 0) return this.parse('/help takemoney');

		let parts = target.split(',');
		let username = parts[0];
		let amount = isMoney(parts[1]);

		if (typeof amount === 'string') return this.errorReply(amount);

		let total = Db('money').set(toId(username), Db('money').get(toId(username), 0) - amount).get(toId(username));
		amount = amount + currencyName(amount);
		total = total + currencyName(total);
		this.sendReply(username + " lost " + amount + ". " + username + " now has " + total + ".");
		if (Users.get(username)) Users(username).popup(user.name + " has taken " + amount + " from you. You now have " + total + ".");
		Economy.logTransaction(username + " had " + amount + " taken away by " + user.name + ". " + username + " now has " + total);
	},
	takemoneyhelp: ["/takemoney [user], [amount] - Take a certain amount of money from a user."],

	transfer: 'transfermoney',
	transferbuck: 'transfermoney',
	transferbucks: 'transfermoney',
	transfermoney: function (target, room, user) {
		if (!target || target.indexOf(',') < 0) return this.parse('/help transfermoney');

		let parts = target.split(',');
		let username = parts[0];
		let uid = toId(username);
		let amount = isMoney(parts[1]);

		if (toId(username) === user.userid) return this.errorReply("You cannot transfer to yourself.");
		if (username.length > 19) return this.errorReply("Username cannot be longer than 19 characters.");
		if (typeof amount === 'string') return this.errorReply(amount);
		if (amount > Db('money').get(user.userid, 0)) return this.errorReply("You cannot transfer more money than what you have.");

		Db('money')
			.set(user.userid, Db('money').get(user.userid) - amount)
			.set(uid, Db('money').get(uid, 0) + amount);

		let userTotal = Db('money').get(user.userid) + currencyName(Db('money').get(user.userid));
		let targetTotal = Db('money').get(uid) + currencyName(Db('money').get(uid));
		amount = amount + currencyName(amount);

		this.sendReply("You have successfully transferred " + amount + ". You now have " + userTotal + ".");
		if (Users.get(username)) Users(username).popup(user.name + " has transferred " + amount + ". You now have " + targetTotal + ".");
		Economy.logTransaction(user.name + " transferred " + amount + " to " + username + ". " + user.name + " now has " + userTotal + " and " + username + " now has " + targetTotal + ".");
	},
	transfermoneyhelp: ["/transfer [user], [amount] - Transfer a certain amount of money to a user."],

	moneylog: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		if (!target) return this.sendReply("Usage: /moneylog [number] to view the last x lines OR /moneylog [text] to search for text.");
		let word = false;
		if (isNaN(Number(target))) word = true;
		let lines = fs.readFileSync('logs/transactions.log', 'utf8').split('\n').reverse();
		let output = '';
		let count = 0;
		let regex = new RegExp(target.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), "gi");

		if (word) {
			output += 'Displaying last 50 lines containing "' + target + '":\n';
			for (let line in lines) {
				if (count >= 50) break;
				if (!~lines[line].search(regex)) continue;
				output += lines[line] + '\n';
				count++;
			}
		} else {
			if (target > 100) target = 100;
			output = lines.slice(0, (lines.length > target ? target : lines.length));
			output.unshift("Displaying the last " + (lines.length > target ? target : lines.length) + " lines:");
			output = output.join('\n');
		}
		user.popup("|wide|" + output);
	},

	store: 'shop',
	shop: function (target, room, user) {
		if (!this.runBroadcast()) return;
		return this.sendReply("|raw|" + shopDisplay);
	},
	shophelp: ["/shop - Display items you can buy with money."],

	buy: function (target, room, user) {
		if (!target) return this.parse('/help buy');
		let amount = Db('money').get(user.userid, 0);
		let cost = findItem.call(this, target, amount);
		if (!cost) return;
		let total = Db('money').set(user.userid, amount - cost).get(user.userid);
		this.sendReply("You have bought " + target + " for " + cost + currencyName(cost) + ". You now have " + total + currencyName(total) + " left.");
		room.addRaw(user.name + " has bought <b>" + target + "</b> from the shop.");
		Economy.logTransaction(user.name + " has bought " + target + " from the shop. This user now has " + total + currencyName(total) + ".");
		handleBoughtItem.call(this, target.toLowerCase(), user, cost);
	},
	buyhelp: ["/buy [command] - Buys an item from the shop."],

	'!richestuser': true,
	richestusers: 'richestuser',
	richestuser: function (target, room, user) {
		if (!target) target = 10;
		target = Number(target);
		if (isNaN(target)) target = 10;
		if (!this.runBroadcast()) return;
		if (this.broadcasting && target > 10) target = 10; // limit to 10 while broadcasting
		if (target > 500) target = 500;

		let self = this;

		function showResults(rows) {
			let output = '<table border="1" cellspacing ="0" cellpadding="3"><tr><th>Rank</th><th>Name</th><th>' + moneyPlural + '</th></tr>';
			let count = 1;
			for (let u in rows) {
				if (rows[u].amount < 1) continue;
				output += '<tr><td>' + count + '</td><td>' + Galaxy.nameColor(rows[u].name, true) + '</td><td>' + rows[u].amount + '</td></tr>';
				count++;
			}
			self.sendReplyBox(output);
			if (room) room.update();
		}
		let obj = Db('money').keys().map(function (name) {return {name: name, amount: Db('money').get(name)};});
		let results = obj.sort(function (a, b) {
			return b.amount - a.amount;
		});
		showResults(results.slice(0, target));
	},

	resetbuck: 'resetmoney',
	resetbucks: 'resetmoney',
	resetmoney: function (target, room, user) {
		if (!this.can('forcewin')) return false;
		Db('money').set(toId(target), 0);
		this.sendReply(target + " now has 0 bucks.");
		Economy.logTransaction(user.name + " reset the money of " + target + ".");
	},
	resetmoneyhelp: ["/resetmoney [user] - Reset user's money to zero."],

	customsymbol: function (target, room, user) {
		let bannedSymbols = ['!', '|', '‽', '\u2030', '\u534D', '\u5350', '\u223C'];
		for (let u in Config.groups) if (Config.groups[u].symbol) bannedSymbols.push(Config.groups[u].symbol);
		if (!user.canCustomSymbol && !user.can('vip')) return this.sendReply('You need to buy this item from the shop to use.');
		if (!target || target.length > 1) return this.sendReply('/customsymbol [symbol] - changes your symbol (usergroup) to the specified symbol. The symbol can only be one character');
		if (target.match(/([a-zA-Z ^0-9])/g) || bannedSymbols.indexOf(target) >= 0) {
			return this.sendReply('This symbol is banned.');
		}
		user.customSymbol = target;
		user.updateIdentity();
		user.canCustomSymbol = false;
		this.sendReply('Your symbol is now ' + target + '. It will be saved until you log off for more than an hour, or the server restarts. You can remove it with /resetsymbol');
	},

	removesymbol: 'resetsymbol',
	resetsymbol: function (target, room, user) {
		if (!user.customSymbol) return this.sendReply("You don't have a custom symbol!");
		delete user.customSymbol;
		user.updateIdentity();
		this.sendReply('Your symbol has been removed.');
	},

	bucks: 'economystats',
	economystats: function (target, room, user) {
		if (!this.runBroadcast()) return;
		const users = Object.keys(Db('money').object());
		const total = users.reduce(function (acc, cur) {
			return acc + Db('money').get(cur);
		}, 0);
		let average = Math.floor(total / users.length) || '0';
		let output = "There " + (total > 1 ? "are " : "is ") + total + currencyName(total) + " circulating in the economy. ";
		output += "The average user has " + average + currencyName(average) + ".";
		this.sendReplyBox(output);
	},
};
