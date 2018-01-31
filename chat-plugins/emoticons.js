'use strict';

let color = require('../config/color');
let Autolinker = require('autolinker');

exports.parseEmoticons = parseEmoticons;

let emotes = {
	'feelscri': 'http://i.imgur.com/QAuUW7u.jpg',
	'#murica': 'http://i.imgur.com/d4XueEr.jpg',
	'yeahboi': 'http://i.imgur.com/nyNKZYz.jpg',
	'urmom': 'https://static-cdn.jtvnw.net/emoticons/v1/35218/1.0',
	'eczz': 'http://i.imgur.com/MhPe1px.jpg',
	'feelscry': 'http://i.imgur.com/JEMjW4f.jpg',
	'feelsautismo': 'http://i.imgur.com/62NYDEH.jpg?1',
	'facepalm': 'http://i.imgur.com/lv3GmpM.png',
	'feelscool': 'http://i.imgur.com/qdGngVl.jpg',
	'FacePalm': 'http://i.imgur.com/ylrqFwJ.png',
	'feelsemo': 'http://i.imgur.com/FPolh5d.jpg',
	'feelsfdra': 'http://i.imgur.com/ZIcl9Zy.jpg',
	'feelsbd': 'http://i.imgur.com/YyEdmwX.png',
	'feelsbm': 'http://i.imgur.com/xwfJb2z.png',
	'feelswtf': 'http://i.imgur.com/BzZJedC.jpg',
	'feelsgro': 'http://i.imgur.com/jLhP0bZ.png',
	'feelsky': 'http://i.imgur.com/BtATPId.png',
	'udonsay': 'http://r32.imgfast.net/users/3215/23/26/64/smiles/280467785.jpg',
	'feelslot': 'http://i.imgur.com/tl88F7i.png',
	'feelsarbk': 'http://i.imgur.com/HqyjN7G.png',
	'feelsbn': 'http://i.imgur.com/wp51rIg.png',
	'feelsdd': 'http://i.imgur.com/fXtdLtV.png',
	'feelsdoge': 'http://i.imgur.com/GklYWvi.png',
	'feelsgd': 'http://i.imgur.com/Jf0n4BL.png',
	'feelsgn': 'http://i.imgur.com/juJQh0J.png',
	'feelsjig': 'http://i.imgur.com/hSzqy5z.png',
	'feelsshrk': 'http://i.imgur.com/amTG3jF.jpg',
	'Kappa': 'http://i.imgur.com/ZxRU4z3.png',
	'feelsHigh': 'http://i.imgur.com/s9I2bxp.jpg',
	'meGusta': 'http://cdn.overclock.net/3/36/50x50px-ZC-369517fd_me-gusta-me-gusta-s.png',
	'feelshp': 'http://i.imgur.com/1W19BDG.png',
	'feelsmd': 'http://i.imgur.com/DJHMdSw.png',
	'feelslit': 'http://i3.kym-cdn.com/photos/images/original/000/968/807/1be.gif',
	'feelsnv': 'http://i.imgur.com/XF6kIdJ.png',
	'feelsok': 'http://i.imgur.com/gu3Osve.png',
	'feelspika': 'http://i.imgur.com/mBq3BAW.png',
	'feelspink': 'http://i.imgur.com/jqfB8Di.png',
	'feelspn': 'http://i.imgur.com/wSSM6Zk.png',
	'pyukufuku': 'http://i.imgur.com/gQJo2CM.png',
	'feelspd': 'http://i.imgur.com/3VtkKfJ.png',
	'feelsrg': 'http://i.imgur.com/DsRQCsI.png',
	'feelsrs': 'http://i.imgur.com/qGEot0R.png',
	'feelssc': 'http://i.imgur.com/cm6oTZ1.png',
	'feelscrazy': 'http://i.imgur.com/NiJsT5W.png',
	'fukya': 'http://i.imgur.com/ampqCZi.gif',
	'fukno': 'http://i.imgur.com/QjQTx9W.png',
	'funnylol': 'http://i.imgur.com/SlzCghq.png',
	'hmmface': 'http://i.imgur.com/Z5lOwfZ.png',
	'noface': 'http://i.imgur.com/H744eRE.png',
	'durp': 'http://i.imgur.com/2BloGXG.jpg',
	'Obama': 'http://i.imgur.com/rBA9M7A.png',
	'oshet': 'http://i.imgur.com/yr5DjuZ.png',
	'Sanic': 'http://i.imgur.com/Y6etmna.png',
	'wtfman': 'http://i.imgur.com/kwR8Re9.png',
	'waitwat': 'http://i.imgur.com/FpxTQxU.jpg',
	'xaa': 'http://i.imgur.com/V728AvL.png',
	'yayface': 'http://i.imgur.com/anY1jf8.png',
	'trollface': 'http://cdn.overclock.net/a/a0/50x50px-ZC-a0e3f9a7_troll-troll-face.png',
	'feelswin': 'http://i.imgur.com/rbs9pZG.png',
	'hypnotoad': 'http://i.imgur.com/lJtbSfl.gif',
	'Kreygasm': 'https://static-cdn.jtvnw.net/emoticons/v1/41/1.0',
	'feelsilum': 'http://i.imgur.com/CnyGTTD.png',
	'PeoplesChamp': 'http://i.imgur.com/QMiMBKe.png',
	'nicememe': 'http://i.imgur.com/61SelMS.png',
	'spongegar': 'http://i.imgur.com/L0mK1f5.jpg',
	'TrashCan': 'http://i.imgur.com/rghiV9b.png',
	'feelsrb': 'http://i.imgur.com/L6ak1Uk.png',
	'EleGiggle': 'https://static-cdn.jtvnw.net/emoticons/v1/4339/2.0',
	'4Head': 'https://static-cdn.jtvnw.net/emoticons/v1/354/1.0',
	'DansGame': 'https://static-cdn.jtvnw.net/emoticons/v1/33/1.0',
	'feelstea': 'http://i.imgur.com/M0f2zgJ.jpg',
	'gudone': 'http://i.imgur.com/USkp1b9.png',
	'brkgod': 'http://i.imgur.com/SQgq5wU.png',
	'UTgod': 'http://i.imgur.com/DdShUbi.png',
	'afruca': 'http://i.imgur.com/jojooyw.png',
	'feelsFU': 'http://i.imgur.com/3SBUEuY.jpg',
	'feelscreep': 'http://i.imgur.com/zJp7oJL.gif',
	'feelsWave': 'http://i.imgur.com/VwCJqjD.gif',
	'feelsacid': 'http://i.imgur.com/8JLSPcr.gif',
	'feelssprout': 'http://i.imgur.com/D1p76vd.gif',
	'feelsevil': 'http://i.imgur.com/OPmBOeJ.jpg',
	'feels9000': 'http://i.imgur.com/1J8r5wR.jpg',
	'feelsskel': 'http://i.imgur.com/4oMCCSf.jpg',
	'feelscompton': 'http://i.imgur.com/mhbfJjF.jpg',
	'feelsShkspr': 'http://i.imgur.com/LSPY5ui.png',
	'feelssuggest': 'http://i.imgur.com/MErmMby.jpg',
	'unoanime': 'http://i.imgur.com/2bMZ0Hw.png',
	'feelskiller': 'http://i.imgur.com/TxfK1kc.gif',
	'feelsterror': 'http://i.imgur.com/U5v9uOY.jpg',
	'feelsdepressed': 'http://i.imgur.com/tO1qB32.jpg',
	'feelsgiggle': 'http://i.imgur.com/7GEK2iS.jpg',
	'feelsshade': 'http://i.imgur.com/Tuza6Y4.png',
	'feelsorly': 'http://i.imgur.com/iMd6UE8.jpg',
	'feelsmage': 'http://i.imgur.com/bCsvhJO.gif',
	'feelsgyara': 'http://i.imgur.com/qHR0leo.png',
	'Thumbsup': 'http://i.imgur.com/kCqFQtU.jpg',
	'feelshill': 'http://i.imgur.com/cE94TBS.jpg',
	'kittymadness': 'http://i.imgur.com/9Zjff5d.gif',
	'feelstoast': 'http://i.imgur.com/M3Xj8RB.png',
	'passbleach': 'http://i.imgur.com/jf2ZNoZ.jpg',
	'feelshitler': 'http://i.imgur.com/OAB7tBi.jpg',
	'feels10yrold': 'http://i.imgur.com/su7hKmw.gif',
	'feelsbug': 'http://i.imgur.com/XSHQvAr.png',
	'feelsbomber': 'http://i.imgur.com/mFHjb4B.jpg',
	'feelsfreezer': 'http://i.imgur.com/EnmDAxX.png',
	'feelssuper': 'http://i.imgur.com/aheEov7.jpg',
	'feelsck': 'http://i.imgur.com/IUB7N1D.png',
	'Pnoivern': 'http://i.imgur.com/M2sHXyB.png',
	'Ppyroar': 'http://i.imgur.com/kz35y1U.png',
	'feelschime': 'http://i.imgur.com/uIIBChH.png',
	'feelsreally': 'https://cdn.betterttv.net/emote/55b0fa13f54d6ecb7927ec54/2x',
	'feelssans': 'http://i.imgur.com/DPr9ifK.gif',
	'feelstired': 'http://i.imgur.com/EgYViOs.jpg',
	'lenny': 'http://i.imgur.com/FhOwY2P.png',
	'feelsgoomy': 'https://orig03.deviantart.net/fcd4/f/2013/339/2/b/free_squishy_goomy_icon_by_glitchedvirus-d6wway3.gif',
	'feelsvulpix': 'https://a.deviantart.net/avatars/d/a/daneisthebest.gif',
	'datboi': 'http://i.imgur.com/9s6gd3U.gif',
	'feelssota': 'https://puu.sh/rrfeJ/ae2712ab63.gif',
	'tinitini': 'http://i.imgur.com/kfzNCWe.gif',
	'feelstini': 'http://i.imgur.com/uJkiovr.gif',
	'feelslatias': 'http://i.imgur.com/OPZuG3f.gif',
	'gardekiss': 'http://i.imgur.com/Vouhhw9.gif',
	'feelslatios': 'http://i.imgur.com/QCoBmpe.gif',
	'dogelit': 'http://i.imgur.com/JTEU1dx.gif',
	'feelspride': 'https://i.imgur.com/U16oDQK.gif',
	'feelsincog': 'http://i.imgur.com/o4KxmWe.png',
	'feelsScizor': 'http://i.imgur.com/sDWpTYN.gif',
	'feelsamp': 'http://orig06.deviantart.net/d756/f/2015/255/f/3/pokemon_ampharos_lick_icon___free_to_use_by_icelemontea83-d97jr15.gif',
	'feelseevee': 'http://a.deviantart.net/avatars/f/r/frostrus.gif',
	'feelstorchic': 'http://orig11.deviantart.net/477e/f/2010/113/f/7/torchic_free_lick_avatar_by_yakalentos.gif',
	'feelsshaymin': 'http://i.imgur.com/Aw8KAmi.gif',
	'feelsespeon': 'http://i.imgur.com/R6uJPav.gif',
	'feelspichu': 'http://i.imgur.com/vqEpogr.gif',
	'feelscx': 'http://i.imgur.com/zRSUw2n.gif',
	'feelsfox': 'http://orig10.deviantart.net/4383/f/2012/172/f/1/victini_lick_avatar_by_neogalactic54-d54daqi.gif',
	'feelskairak': 'http://orig12.deviantart.net/e443/f/2010/297/e/8/nidorina_lick_icon_by_aquamightyena-d31f7ry.gif',
	'feelslucario': 'http://i.imgur.com/ZQbYp9l.gif',
	'feelsfloat': 'http://i.imgur.com/XKP1Kpf.gif',
	'feelslux': 'http://i.imgur.com/hDKCZMt.gif',
	'feelsnii': 'http://orig11.deviantart.net/9d39/f/2011/165/8/6/request_from_colleenkat_by_kisa013-d3iwvbv.gif',
	'feelsvpn': 'http://i.imgur.com/ODTZISl.gif',
	'feelsChar': 'https://orig04.deviantart.net/9abc/f/2013/118/8/e/charizard_lick_icon_by_spritegirl999-d63d7sf.gif',
	'feelsem': 'http://orig01.deviantart.net/3f09/f/2010/128/0/a/pika_lick_icon_by_brawler_pika.gif',
	'feelsnyan': 'http://i.imgur.com/sUZkR32.gif',
	'feelstyph': 'http://orig13.deviantart.net/50f8/f/2010/193/1/2/typhlosion_lick_icon_by_aquamightyena.gif',
	'feelssneasel': 'http://orig02.deviantart.net/3443/f/2010/182/0/a/shiny_sneasel_avatar_by_oh_2beatoa.gif',
	'feelsabsol': 'http://orig10.deviantart.net/ab3e/f/2011/160/7/5/absol_lick_by_missdrawsalot-d3ii5pq.gif',
	'feelsflare': 'http://orig05.deviantart.net/1afa/f/2011/177/9/4/flareon_lick_by_9000boy-d3k3g36.gif',
	'feelsarcanine': 'http://orig12.deviantart.net/afca/f/2010/154/7/5/free_arcanine_lick_icon_by_fennekvee.gif',
	'feelsgatr': 'http://orig15.deviantart.net/4032/f/2010/229/0/b/_rq__feraligatr_lick_icon_by_fennekvee.gif',
	'feelsmeowth': 'http://i.imgur.com/VIDPyCS.gif',
	'feelszapdos': 'http://a.deviantart.net/avatars/z/a/zapdosrockz.gif',
	'feelszangoose': 'http://orig03.deviantart.net/f2d7/f/2010/148/a/8/zangoose_free_lick_avatar_by_yakalentos.gif',
	'feelsstar': 'http://orig10.deviantart.net/3489/f/2011/040/5/2/emolga_free_lick_avatar_by_yakalentos-d395uzl.gif',
	'feelsshinx': 'http://orig02.deviantart.net/2897/f/2010/232/e/0/shinx_free_lick_avatar_by_yakalentos.gif',
	'feelsleafeon': 'http://orig11.deviantart.net/6f76/f/2012/022/6/a/pkmn_leafeon_lickie_by_pplyra-d4nb1x5.gif',
	'feelsbulba': 'http://orig00.deviantart.net/b4fe/f/2010/204/1/3/bulbasaur_free_lick_avatar_by_yakalentos.gif',
	'feelssuicune': 'http://orig15.deviantart.net/e4ad/f/2010/139/5/a/suicune_free_lick_avatar_by_yakalentos.gif',
	'feelschikorita': 'http://orig10.deviantart.net/de15/f/2010/193/9/4/chikorita_free_lick_avatar_by_yakalentos.gif',
	'feelspsy': 'http://orig04.deviantart.net/b3f4/f/2010/119/8/8/psyduck_free_lick_avatar_by_yakalentos.gif',
	'feelsentei': 'http://a.deviantart.net/avatars/j/i/jiangweichick100.gif',
	'feelsbd': 'http://i.imgur.com/YyEdmwX.png',
	'feelsbn': 'http://i.imgur.com/wp51rIg.png',
	'feelsdd': 'http://i.imgur.com/fXtdLtV.png',
	'feelsbm': 'http://i.imgur.com/xwfJb2z.png',
	'feelsdoge': 'http://i.imgur.com/GklYWvi.png',
	'feelspd': 'http://i.imgur.com/3VtkKfJ.png',
	'feelsrg': 'http://i.imgur.com/DsRQCsI.png',
	'feelsgd': 'http://i.imgur.com/Jf0n4BL.png',
	'feelsgn': 'http://i.imgur.com/juJQh0J.png',
	'feelsmd': 'http://i.imgur.com/DJHMdSw.png',
	'feelsnv': 'http://i.imgur.com/XF6kIdJ.png',
	'feelsok': 'http://i.imgur.com/gu3Osve.png',
	'feelspika': 'http://i.imgur.com/mBq3BAW.png',
	'feelspink': 'http://i.imgur.com/jqfB8Di.png',
	'feelspn': 'http://i.imgur.com/wSSM6Zk.png',
	'feelsrs': 'http://i.imgur.com/qGEot0R.png',
	'feelssc': 'http://i.imgur.com/cm6oTZ1.png',
	'feelscri': 'http://i.imgur.com/QAuUW7u.jpg?1',
	'feelstia': 'http://i.imgur.com/M0f2zgJ.jpg?1',
	'feelsfra': 'http://i.imgur.com/ZIcl9Zy.jpg',
	'feelsdrg': 'http://i.imgur.com/UZzWcA3.png',
	'feelscool': 'http://i.imgur.com/qdGngVl.jpg?1',
	'feelscol': 'http://i.imgur.com/JMDjAgU.jpg',
	'feelstired': 'http://i.imgur.com/EgYViOs.jpg',
	'feelsackbr': 'http://i.imgur.com/BzZJedC.jpg?1',
	'feelsjig': 'http://i.imgur.com/hSzqy5z.png?1',
	'feelsshrk': 'http://i.imgur.com/amTG3jF.jpg',
	'feelsfuku': 'http://i.imgur.com/m018Q4S.jpg',
	'feelshp': 'http://i.imgur.com/1W19BDG.png',
	'feelsrb': 'http://i.imgur.com/L6ak1Uk.png',
	'feelsbepop': 'http://i.imgur.com/TDwC3wL.png',
	'feelssnake': 'http://i.imgur.com/xoJnDUD.png',
	'feelscrazy': 'http://i.imgur.com/NiJsT5W.png',
	'feelsemo': 'http://i.imgur.com/FPolh5d.jpg',
	'feelspoli': 'http://i.imgur.com/FnzhrWa.jpg?1',
	'feelsPoli': 'http://i.imgur.com/sbKhXZE.jpg?1',
	'feelsya': 'https://cdn.betterttv.net/emote/5678a310bf317838643c8188/2x',
	'feelscop': 'http://i.imgur.com/eNaFHvR.png?1',
	'feelsjm': 'https://cdn.betterttv.net/emote/5638163f55dee26813aebbf1/2x',
	'feelsautismo': 'http://i.imgur.com/62NYDEH.jpg?1',
	'feelsdrug': 'http://i.imgur.com/wGnS4u5.png?1',
	'feelscry': 'http://i.imgur.com/JEMjW4f.jpg',
	'feelsbrtman': 'https://cdn.betterttv.net/emote/55b6524154eefd53777b2580/2x',
	'feelscute': 'https://cdn.betterttv.net/emote/55aeba450d87fd2766bee7cd/2x',
	'feelsevil': 'http://i.imgur.com/zOemc0n.png',
	'feelskawaii': 'http://i.imgur.com/kLnDaYD.png',
	'feelsjpn': 'http://i.imgur.com/Zz2WrQf.jpg',
	'feelslag': 'https://cdn.betterttv.net/emote/56758c29bf317838643c7e97/2x',
	'feelsmerry': 'https://cdn.betterttv.net/emote/5658e10f18d1dbe358624e35/2x',
	'feelscreep': 'http://i.imgur.com/zJp7oJL.gif',
	'feelswave': 'http://i.imgur.com/VwCJqjD.gif',
	'feelsacid': 'http://i.imgur.com/8JLSPcr.gif',
	'feelssprout': 'http://i.imgur.com/D1p76vd.gif',
	'feelsevl': 'http://i.imgur.com/OPmBOeJ.jpg',
	'feels9000': 'http://i.imgur.com/1J8r5wR.jpg',
	'feelsskel': 'http://i.imgur.com/4oMCCSf.jpg',
	'feelscompton': 'http://i.imgur.com/mhbfJjF.jpg',
	'feelsShkspr': 'http://i.imgur.com/LSPY5ui.png',
	'feelssuggest':'http://i.imgur.com/MErmMby.jpg',
	'feelssmug': 'http://i.imgur.com/vw04has.jpg?1',
	'feelsterror': 'http://i.imgur.com/U5v9uOY.jpg',
	'feelstater': 'http://i.imgur.com/D1pWnHa.jpg',
	'feelsgiggle': 'http://i.imgur.com/7GEK2iS.jpg',
	'feelsshade': 'http://i.imgur.com/Tuza6Y4.png',
	'feelsoreally': 'http://i.imgur.com/iMd6UE8.jpg',
	'feelsmmyea': 'https://cdn.betterttv.net/emote/562bf1bec6035e430db80824/2x',
	'feelsohwait': 'https://cdn.betterttv.net/emote/55ab96ce9406e5482db53424/2x',
	'feelspuke': 'http://i.imgur.com/nQbRspU.png?1',
	'feelssad': 'https://cdn.betterttv.net/emote/5613b7ca141069f91f48acca/2x',
	'feelsbarbone': 'https://static-cdn.jtvnw.net/emoticons/v1/62793/2.0',
	'feelspig': 'https://static-cdn.jtvnw.net/emoticons/v1/55861/2.0',
	'feelspikachu': 'https://static-cdn.jtvnw.net/emoticons/v1/82425/2.0',
	'feelsmudkip': 'https://static-cdn.jtvnw.net/emoticons/v1/84518/2.0',
	'feelscrash': 'https://static-cdn.jtvnw.net/emoticons/v1/87880/2.0',
	'feelsreally': 'https://cdn.betterttv.net/emote/55b0fa13f54d6ecb7927ec54/2x',
	'feelstrump': 'http://i.imgur.com/tqW8s6Y.png',
	'feelsweird': 'https://cdn.betterttv.net/emote/5603731ce5fc5eff1de93229/2x',
	'feelsnerd': 'https://cdn.rawgit.com/CreaturePhil/dem-feels/master/emotes/feelsnerd.png',
	'feelssht': 'http://i.imgur.com/s9owArF.png?1',
	'feelsfox': 'https://static-cdn.jtvnw.net/emoticons/v1/64940/2.0',
	'feelshigh': 'http://i.imgur.com/s9I2bxp.jpg?1',
	'feelshitler': 'http://i.imgur.com/OAB7tBi.jpg',
	'feelshtler': 'http://104.251.212.134/emotes/feelshitler.png',
	'feelsbomber':'http://i.imgur.com/mFHjb4B.jpg',
	'feelsgangsta': 'http://i.imgur.com/mH6UmJ0.jpg',
	'feelslove': 'http://i.imgur.com/DA2BOfD.png',
	'feelsmexican': 'http://i.imgur.com/G3c9o0E.jpg',
	'feelspanties': 'http://i.imgur.com/0XTolac.png',
	'feelskebab': 'http://i.imgur.com/MXaHZf0.png',
	'feelsjew': 'http://i.imgur.com/vpDH2T6.jpg?1',
	'feelsnigger': 'http://i.imgur.com/9MbU5MK.jpg?1',
	'feelsiron': 'http://i.imgur.com/Sl1l1Fu.jpg',
	'feelshill': 'http://i.imgur.com/cE94TBS.jpg',
	'feelsogod': 'http://i.imgur.com/BUE727G.jpg',
	'feelsnolife': 'http://i.imgur.com/CeTjkw9.jpg',
	'feelsfeel': 'http://i.imgur.com/s8kN3AV.png',
	'feelsel': 'http://i.imgur.com/Uw0T5Rn.png',
	'feelssp': 'http://i.imgur.com/2IBvQVL.gif',
	'feelssq': 'https://i.imgur.com/YelLKkS.gif',
	'feelsmu': 'https://i.imgur.com/NU9msS4.gif',
	'feelsduke': 'http://i.imgur.com/39NY4tG.gif',
	'feelsweat': 'http://i.imgur.com/lfP8yX6.png',
	'feelssniper': 'http://i.imgur.com/2Vhfixm.jpg?1',
	'feelsono': 'http://i.imgur.com/1qEHZoE.png',
	'feelsillusion': 'http://image.prntscr.com/image/b76f775ef9704870ac56b3c4aa985a01.jpg',
	'feelsphl': 'http://i.imgur.com/RIOKSJ3.gif',
	'feelsgrow': 'http://orig02.deviantart.net/a5e5/f/2013/042/e/4/free_bouncy_growlithe_icon_by_kattling-d5um16j.gif',
	'feelsvapo': 'http://orig03.deviantart.net/fe3b/f/2012/315/5/e/free_bouncy_vaporeon_icon_by_kattling-d5k3udr.gif',
	'feelsrai': 'http://orig05.deviantart.net/255c/f/2012/337/b/0/free_bouncy_raichu_icon_by_kattling-d5mxk3v.gif',
	'feelsart': 'http://orig08.deviantart.net/0079/f/2013/003/8/f/free_bouncy_articuno_icon_by_kattling-d5q8y4z.gif',
	'feelsmolt': 'http://orig01.deviantart.net/7861/f/2013/011/3/1/free_bouncy_moltres_icon_by_kattling-d5r5x9a.gif',
	'feelszap': 'http://orig01.deviantart.net/d1df/f/2013/006/2/a/free_bouncy_zapdos_icon_by_kattling-d5qo7yc.gif',
	'feelseeve': 'http://orig06.deviantart.net/378e/f/2012/305/2/1/free_bouncy_eevee_icon_by_kattling-d5jnjl3.gif',
	'feelsumbre': 'http://orig15.deviantart.net/bd77/f/2012/315/b/6/free_bouncy_umbreon_icon_by_kattling-d5koqlt.gif',
	'feelsnin': 'http://orig08.deviantart.net/4c0a/f/2012/343/8/e/free_bouncy_ninetales_icon_by_kattling-d5ni5lb.gif',
	'feelsabsol': 'http://orig13.deviantart.net/1e15/f/2014/338/8/6/free_bouncy_absol_icon_by_kattling-d88mtvu.gif',
	'feelsgoomy': 'https://orig03.deviantart.net/fcd4/f/2013/339/2/b/free_squishy_goomy_icon_by_glitchedvirus-d6wway3.gif',
	'feelsralts': 'http://orig06.deviantart.net/9d32/f/2015/152/c/e/free_bouncy_ralts_icon_by_kattling-d8uyv4h.gif',
	'feelstyph': 'http://orig00.deviantart.net/71c6/f/2015/152/3/a/free_bouncy_typhlosion_icon_by_kattling-d8ux89l.gif',
	'feelschiko': 'http://orig05.deviantart.net/2ad7/f/2014/325/9/0/free_bouncy_chikorita_icon_by_kattling-d875yp4.gif',
	'feelsskit': 'http://orig04.deviantart.net/6af2/f/2013/322/8/8/free_bouncy_skitty_icon_by_kattling-d6ur78h.gif',
	'feelsquil': 'http://orig13.deviantart.net/31f3/f/2013/319/9/3/free_bouncy_quilava_icon_by_kattling-d6uccg6.gif',
	'feelssyl': 'http://orig05.deviantart.net/aa0a/f/2013/314/3/9/free_bouncy_sylveon_icon_by_kattling-d6tr6y7.gif',
	'feelsweav': 'http://orig01.deviantart.net/3324/f/2013/313/c/9/free_bouncy_weavile_icon_by_kattling-d6tki1k.gif',
	'feelscaterp': 'http://orig13.deviantart.net/efe1/f/2013/308/a/1/free_bouncy_caterpie_icon_by_kattling-d6t0tp6.gif',
	'feelsphan': 'http://orig04.deviantart.net/94ec/f/2013/303/7/2/free_bouncy_phantump_icon_by_kattling-d6sdiwe.gif',
	'feelspumpk': 'http://orig12.deviantart.net/c4e2/f/2013/302/f/f/free_bouncy_pumpkaboo_icon_by_kattling-d6s8puz.gif',
	'feelslitw': 'http://orig01.deviantart.net/b7a3/f/2013/301/0/6/free_bouncy_litwick_icon_by_kattling-d6s4ch2.gif',
	'feelsdrifl': 'http://orig04.deviantart.net/f5dd/f/2013/300/4/9/free_bouncy_drifloon_icon_by_kattling-d6rznsk.gif',
	'feelsdrifsh': 'http://i.imgur.com/YvjNygI.gif',
	'feelsshup': 'http://orig00.deviantart.net/7893/f/2013/299/2/0/free_bouncy_shuppet_icon_by_kattling-d6rupxe.gif',
	'feelshound': 'http://orig12.deviantart.net/60a3/f/2013/298/0/7/free_bouncy_houndour_icon_by_kattling-d6rql9p.gif',
	'feelsgeng': 'http://orig14.deviantart.net/5da2/f/2013/297/e/b/free_bouncy_gengar_icon_by_kattling-d6rim2w.gif',
	'feelspooc': 'http://orig06.deviantart.net/9ecc/f/2013/293/b/1/free_bouncy_poochyena_icon_by_kattling-d6r6g74.gif',
	'feelstorc': 'http://orig05.deviantart.net/d49f/f/2013/292/a/1/free_bouncy_torchic_icon_by_kattling-d6r0g8y.gif',
	'feelsrat': 'http://orig10.deviantart.net/57bd/f/2013/287/9/4/free_bouncy_rattata_icon_by_kattling-d6qghwo.gif',
	'feelsmudkp': 'http://orig07.deviantart.net/636c/f/2013/285/b/0/free_bouncy_mudkip_icon_by_kattling-d6q57fd.gif',
	'feelsbulb': 'http://orig05.deviantart.net/257e/f/2013/284/7/6/free_bouncy_bulbasaur_icon_by_kattling-d6q2fij.gif',
	'feelsdusk': 'http://orig09.deviantart.net/de2e/f/2013/055/d/f/free_bouncy_duskull_icon_by_kattling-d5w1cxr.gif',
	'feelssuicune': 'http://orig00.deviantart.net/3981/f/2013/038/a/9/free_bouncy_suicune_icon_by_kattling-d5u4dym.gif',
	'feelscharm': 'http://orig08.deviantart.net/056a/f/2013/033/7/f/free_bouncy_charmander_icon_by_kattling-d5tk1q4.gif',
	'feelszorua': 'http://orig02.deviantart.net/d2cd/f/2012/359/e/7/free_bouncy_zorua_icon_by_kattling-d5p3ptq.gif',
	'feelsfenk': 'http://orig05.deviantart.net/bc95/f/2013/030/1/9/free_bouncy_fennekin_icon_by_kattling-d5t8ci8.gif',
	'feelspic': 'http://orig08.deviantart.net/baf0/f/2012/350/a/e/free_pichu_bouncy_icon_by_kattling-d5o6lik.gif',
	'feelsvul': 'http://orig01.deviantart.net/09e6/f/2012/336/2/2/free_bouncy_vulpix_icon_by_kattling-d5mwd4d.gif',
	'feelsmew': 'http://orig00.deviantart.net/f6d6/f/2012/333/a/f/free_bouncy_mew_icon_by_kattling-d5mil1f.gif',
	'feelsjiggly': 'http://orig11.deviantart.net/2c3e/f/2012/322/f/3/free_bouncy_jigglypuff_icon_by_kattling-d5ldahs.gif',
	'feelsleaf': 'http://orig15.deviantart.net/90fb/f/2012/319/6/3/free_bouncy_leafeon_icon_by_kattling-d5l2fle.gif',
	'feelsglac': 'http://orig06.deviantart.net/d9b2/f/2012/316/a/c/free_bouncy_glaceon_icon_by_kattling-d5kt02m.gif',
	'feelsesp': 'http://orig03.deviantart.net/f925/f/2012/315/f/6/free_bouncy_espeon_icon_by_kattling-d5kmktt.gif',
	'feelsjolt': 'http://orig03.deviantart.net/8e59/f/2012/308/a/f/free_bouncy_jolteon_icon_by_kattling-d5jypo8.gif',
	'feelsflar': 'http://orig12.deviantart.net/443b/f/2012/307/5/c/free_bouncy_flareon_icon_by_kattling-d5ju0kd.gif',
	'feelspka': 'http://orig15.deviantart.net/11b5/f/2012/303/c/7/free_bouncy_pikachu_icon_by_kattling-d5jgq5l.gif',
	'feelscynd': 'http://orig06.deviantart.net/a8c2/f/2012/302/1/3/free_bouncy_cyndaquil_icon_by_kattling-d5j83f7.gif',
	'feelssqui': 'http://orig04.deviantart.net/ea21/f/2012/300/3/a/free_bouncy_squirtle_icon_by_kattling-d5j4neo.gif',
	'feelspidg': 'http://orig08.deviantart.net/3fdd/f/2012/295/c/2/free_bouncey_pidgey_icon_by_kattling-d5imd3t.gif',
	'feelslavghost': 'http://i.imgur.com/kQ9THf6.gif',
	'RareChar': 'https://cdn.betterttv.net/emote/562b9101a6646e202bcc5447/2x',
	/*'fukya': 'http://i.imgur.com/ampqCZi.gif',*/
	'#freewolf': 'http://i.imgur.com/ybxWXiG.png',
	'funnylol': 'http://i.imgur.com/SlzCghq.png',
	'hmmface': 'http://i.imgur.com/Z5lOwfZ.png',
	'Doge': 'http://fc01.deviantart.net/fs71/f/2014/279/4/5/doge__by_honeybunny135-d81wk54.png',
	'noface': 'http://i.imgur.com/H744eRE.png',
	'Obama': 'http://i.imgur.com/rBA9M7A.png',
	'oshet': 'http://i.imgur.com/yr5DjuZ.png',
	'Sanic': 'http://i.imgur.com/Y6etmna.png',
	'trumpW': 'https://static-cdn.jtvnw.net/emoticons/v1/35218/1.0',
	'wtfman': 'http://i.imgur.com/kwR8Re9.png',
	'xaa': 'http://i.imgur.com/V728AvL.png',
	'jcena': 'http://i.imgur.com/hPz30Ol.jpg?2',
	'meGusta': 'http://cdn.overclock.net/3/36/50x50px-ZC-369517fd_me-gusta-me-gusta-s.png',
	'udontsay': 'http://r32.imgfast.net/users/3215/23/26/64/smiles/280467785.jpg',
	'dafuq': 'http://cdn.overclock.net/6/6c/50x50px-ZC-6c0e35eb_jackie-chan-meme.png',
	'yayface': 'http://i.imgur.com/anY1jf8.png',
	'yesface': 'http://i.imgur.com/k9YCF6K.png',
	'truestory': 'http://i.imgur.com/gba2Tuw.png',
	'trollface': 'http://i.imgur.com/YdZ72N8.png?1',
	'fukiu': 'http://i.imgur.com/DqPskTb.gif',
	'Lennyface': 'http://i.imgur.com/NYaFpou.png',
	'Caghei': 'http://i.imgur.com/tIeHHBP.gif',
	'NotBad': 'http://i.imgur.com/4DbU7P9.jpg',
	'feelsbordello': 'http://i.imgur.com/vwokt1F.jpg',
	'feelsmosconi': 'http://i.imgur.com/ubDBXDc.jpg?1',
	'feelsobama': 'http://i.imgur.com/dkLRjUK.jpg',
	'eczz': 'http://i.imgur.com/MhPe1px.jpg',
	'feelsconte': 'http://i.imgur.com/2rl75MX.jpg',
	'feelsyotobi': 'http://i.imgur.com/f9YcS62.jpg',
	'proprioLui': 'http://i.imgur.com/wDE4G8L.png',
	'snjap': 'http://i.imgur.com/WvdQTTQ.jpg',
	'feelsuddio': 'http://i.imgur.com/roxt7Ch.jpg',
	'ehvolevi': 'http://i.imgur.com/3TxL1Mz.jpg',
	'feelssgarbi': 'http://i.imgur.com/MqbxHPw.jpg',
	'feelsbenson': 'http://i.imgur.com/w6ZP3oS.png',
	'feelspollo': 'http://image.prntscr.com/image/23a2bde9867e4cfca748ef6fc104e21b.png',
	'feelsdurso': 'http://i.imgur.com/uMxPnyh.gif?1',
	'feelstina': 'http://i.imgur.com/gjZZNeI.gif?1',
	'feelstrucebaldazzi': 'http://i.imgur.com/vTNxBja.png?1',
	'feelssimone': 'http://i.imgur.com/zBcoP6k.png?1',
	'feelsmonella': 'http://i.imgur.com/iSXb7EZ.jpg?2',
	'feelstroia': 'http://i.imgur.com/v2tT9qK.jpg?1',
	'feelsmontesi': 'http://image.prntscr.com/image/5820301947f144dbbff5cd8f90096aa1.png',
	'feelsbonolis': 'http://i.imgur.com/wNaSLhh.jpg?1',
	'feelsibra': 'http://i.imgur.com/DMS5ewL.jpg?1',
	'feelsmc': 'http://i.imgur.com/C7MlHAQ.jpg?1',
	'feelsfiga': 'http://i.imgur.com/waiDMPb.jpg?1',
	'feelslesgold': 'http://i.imgur.com/K8OqkUz.jpg?1',
	'feelsdafuck': 'https://i.imgur.com/P7JSTpp.png?2',
	'feelswut': 'https://i.imgur.com/kvz9UAi.png?2',
	'feelstrmp': 'http://i.imgur.com/6Qx0lPF.png',
	'feelsputin1': 'http://i.imgur.com/egSRKs1.png',
	'feelsputin2': 'http://i.imgur.com/NOPV6a7.png',
	'feelsputin3': 'http://i.imgur.com/I4XzkEV.jpg?1',
	'faceputin': 'http://i.imgur.com/ik8Awjd.png',
	'feel1': 'http://i.imgur.com/58yuftz.png',
	'feelscake' : 'http://i.imgur.com/H2eITdZ.png?1',
	'waitwat': 'http://i.imgur.com/FpxTQxU.jpg',
	'happyface': 'https://qph.ec.quoracdn.net/main-qimg-f207eb810b1fb6f5655a1bf942a5cf7f?convert_to_webp=true',
	'oHcrap': 'https://qph.ec.quoracdn.net/main-qimg-3516216e3a75bfe14d2dca65c985e49b?convert_to_webp=true',
	'mRd': 'https://qph.ec.quoracdn.net/main-qimg-28fc438ca99507a43a04a6c1f52dd0f7?convert_to_webp=true',
	'feelsdoh': 'https://qph.ec.quoracdn.net/main-qimg-7e4c50aad1f115c27f648673cc81e57f?convert_to_webp=true',
	'feelsfrega': 'http://i.imgur.com/5GoQNbo.jpg',
	'feelsponge': 'http://i.imgur.com/RC0nP9v.gif?1',
	'feelsidgaf': 'http://i.imgur.com/ZJMq9Zw.gif?1',
	'feelsfun': 'http://i.imgur.com/SXVIXMo.gif?1',
	'mickeye': 'http://i.imgur.com/3E01036.jpg',
	'mOn': 'http://i.imgur.com/BGI9tAR.png',
	'BTte': 'http://i.imgur.com/YiG3oJB.jpg',
	'GAy': 'http://i.imgur.com/w3xsrhO.png',
	'piKa': 'http://i.imgur.com/viGgYqN.png',
	'faCe': 'https://qph.ec.quoracdn.net/main-qimg-e88588d1f672c2cd982317fc68bbac3b?convert_to_webp=true',
	'facE': 'http://i.imgur.com/lv3GmpM.png',
	'facepalm': 'http://i.imgur.com/ylrqFwJ.png',
	'Kappa': 'http://i.imgur.com/5qRROqN.png',
    'supahot': 'http://i.imgur.com/7ynfxDG.gif?1',
    'supaht': 'http://i.imgur.com/s0vJkA4.gif',
    'supatrain': 'http://i.imgur.com/PuG1Im7.gif',
	'4Head': 'https://static-cdn.jtvnw.net/emoticons/v1/354/1.0',
	'DansGame': 'https://static-cdn.jtvnw.net/emoticons/v1/33/1.0',
	'EleGiggle': 'https://static-cdn.jtvnw.net/emoticons/v1/4339/1.0',
	'SeemsGood': 'https://static-cdn.jtvnw.net/emoticons/v1/64138/1.0',
	'FailFish': 'https://static-cdn.jtvnw.net/emoticons/v1/360/1.0',
	'MingLee': 'https://static-cdn.jtvnw.net/emoticons/v1/68856/1.0',
	'PogChamp': 'https://static-cdn.jtvnw.net/emoticons/v1/88/1.0',
	'Kreygasm': 'https://static-cdn.jtvnw.net/emoticons/v1/41/1.0',
	'NotLikeThis': 'https://static-cdn.jtvnw.net/emoticons/v1/58765/1.0',
	'WutFace': 'https://static-cdn.jtvnw.net/emoticons/v1/28087/1.0',
	'BabyRage': 'https://static-cdn.jtvnw.net/emoticons/v1/22639/1.0',
	'TriHard': 'http://static-cdn.jtvnw.net/emoticons/v1/171/1.0',
	'KappPride': 'https://static-cdn.jtvnw.net/emoticons/v1/55338/1.0',
	'KappHD': 'https://static-cdn.jtvnw.net/jtv_user_pictures/emoticon-2867-src-f02f9d40f66f0840-28x28.png',
	'KappRoss': 'https://static-cdn.jtvnw.net/emoticons/v1/70433/1.0',
	'Keepo': 'https://static-cdn.jtvnw.net/emoticons/v1/1902/1.0',
	'ResidentSleeper': 'https://static-cdn.jtvnw.net/emoticons/v1/245/1.0',
	'OpieOP': 'http://static-cdn.jtvnw.net/emoticons/v1/356/1.0',
	'ANELE': 'https://static-cdn.jtvnw.net/emoticons/v1/3792/1.0',
	'chrisWTF': 'https://static-cdn.jtvnw.net/emoticons/v1/48855/1.0',
	'SwiftRage': 'https://static-cdn.jtvnw.net/emoticons/v1/34/1.0',
	'gachiGASM': 'https://cdn.betterttv.net/emote/55999813f0db38ef6c7c663e/1x',
	'OhMyDog': 'https://static-cdn.jtvnw.net/emoticons/v1/81103/1.0',
	'hrt': 'https://static-cdn.jtvnw.net/jtv_user_pictures/chansub-global-emoticon-577ade91d46d7edc-24x18.png',
	'KappCool': 'https://cdn.betterttv.net/emote/560577560874de34757d2dc0/1x',
	'diTTo': 'https://cdn.betterttv.net/emote/554da1a289d53f2d12781907/2x',
	'lLl': 'http://i45.tinypic.com/34dkiki.gif',
	'dogk': 'http://i.imgur.com/qlgRbI7.png?1',
	'dog2': 'http://i.imgur.com/t3w43gQ.png?1',
	'dogface': 'http://i.imgur.com/WYUMcHv.jpg?1',
	'dograge': 'http://i.imgur.com/pNoobus.png?1',
	'dogears': 'http://i.imgur.com/kdSVCp4.png?1',
	'dogfun': 'http://i.imgur.com/oEVuJ9A.png?1',
	'dogdevil': 'http://i.imgur.com/WP184pZ.png?1',
	'dogcaffe': 'http://i.imgur.com/IVPI4WK.png?1',
	'dogcry': 'http://i.imgur.com/jxWq1wz.png?1',
	'trumpface1':'http://i.imgur.com/w5GNj6a.png?1',
	'trumpface2':'http://i.imgur.com/BxPUQ0i.png?1',
	'trumpface3':'http://i.imgur.com/JfQ0dmg.png?1',
	'trumpface4':'http://i.imgur.com/AKXe34e.png?1',
	'fodase': 'http://i.imgur.com/6Y3zfPm.gif',
	'feelsdialga': 'http://orig10.deviantart.net/7f9c/f/2011/232/9/c/dialgalickicon___request_by_zekrom622-d479wzz.gif',
	'feelsflaaffy': 'http://orig05.deviantart.net/0cc2/f/2010/125/6/8/flaaffy_free_lick_avatar_by_yakalentos.gif',
	'feelsmunch': 'http://orig04.deviantart.net/c0c8/f/2010/114/b/e/munchlax_free_lick_avatar_by_yakalentos.gif',
	'feelsjolt': 'http://orig01.deviantart.net/e655/f/2011/363/1/8/jolteon_licky_by_dragonfeatherz-d4k5gqp.gif',
	'feelsvul': 'http://orig00.deviantart.net/c3e8/f/2010/120/1/1/vulpix_free_lick_avatar_by_yakalentos.gif',
	'feelspachi': 'http://orig12.deviantart.net/aaaa/f/2012/096/8/e/lick_icon_pachirisu_by_camillajo1-d4v6256.gif',
	'feelsflygon': 'http://orig05.deviantart.net/98a3/f/2010/107/6/6/flygon_free_lick_avatar_by_yakalentos.gif',
	'feelsskymin': 'http://orig04.deviantart.net/41ff/f/2010/108/0/2/skymin_free_lick_avatar_by_yakalentos.gif',
	'feelspooch': 'http://orig13.deviantart.net/87d0/f/2012/049/9/2/poochyena_licks_heaps_by_wolf6660-d3i9o60.gif',
	'feelsmewth': 'http://orig10.deviantart.net/79e7/f/2010/097/b/9/glameow_licking_avatar_by_byakughan.gif',
	'feelsarceus': 'http://static.planetminecraft.com/files/avatar/112222_0.gif',
	'feelsweavile': 'http://orig07.deviantart.net/620a/f/2010/220/1/8/_rq__weavile_lick_icon_by_fennekvee.gif',
	'feelshound': 'http://orig05.deviantart.net/7b61/f/2010/314/c/b/houndour_by_mushydog-d32lmif.gif',
	'feelslpd': 'http://orig06.deviantart.net/b1da/f/2011/145/0/f/liepard_lick_icon_by_mushydog-d3h8rk7.gif',
	'feelssnivy': 'http://orig10.deviantart.net/2cae/f/2011/251/6/6/snivy_lick_by_mushydog-d499t8d.gif',
	'feelshydra': 'http://orig10.deviantart.net/0124/f/2012/340/0/b/hydreigon_lick_icon_by_d12345t-d5n62ok.gif',
	'feelsdrud': 'http://orig02.deviantart.net/a139/f/2012/223/6/d/druddigon_lick_icon_by_d12345t-d5aracp.gif',
	'feelsmudkip': 'http://orig08.deviantart.net/76df/f/2010/223/a/7/mudkip_lick_by_scenekiddowntheroad.gif',
	'feelsskitty': 'http://a.deviantart.net/avatars/s/i/silver-skitty.gif',
	'feelstank': 'http://orig00.deviantart.net/56b2/f/2010/353/0/0/miltank_licking_avatar_by_seigyuu-d356hud.gif',
	'feelsjoshy': 'http://orig00.deviantart.net/b970/f/2010/134/1/2/mew_lick_avatar_by_mythicazurel.gif',
	'feelsturtwig': 'http://orig03.deviantart.net/93cc/f/2010/120/f/5/turtwig_free_lick_avatar_by_yakalentos.gif',
	'feelszorua': 'http://a.deviantart.net/avatars/z/o/zorua-zuilam.gif',
	'feelscinno': 'http://orig15.deviantart.net/4340/f/2010/182/7/1/chi_lick_by_joalsses.gif',
	'feelsdoom': 'http://orig03.deviantart.net/5e28/f/2010/178/3/5/request_hound_lick_by_joalsses.gif',
	'feelskiss': 'http://orig12.deviantart.net/baa4/f/2010/178/1/4/kissu_lick_by_joalsses.gif',
	'feelsgallade': 'http://orig14.deviantart.net/12a1/f/2010/214/6/7/galla_lick_by_joalsses.gif',
	'rarechar': 'https://cdn.betterttv.net/emote/562b9101a6646e202bcc5447/2x',
	'Cate': 'http://i.imgur.com/728AQQN.jpg',
	'feelsyawn': 'http://orig00.deviantart.net/e710/f/2015/169/4/3/cat_yawn_by_iamverylucky-d8xsx9q.gif',
	'happyface': 'http://imgur.com/krzCL3j.jpg',
	'wynaut': 'http://i.imgur.com/3QriNT2.png',
	'KappaPride': 'http://i.imgur.com/GMs8OxU.jpg',
	'llamahide': 'http://i.imgur.com/Z9GYSkZ.gif',
	'feelstales': 'http://a.deviantart.net/avatars/l/u/lumeraz.gif',
	'prfmcri': 'http://media.tumblr.com/tumblr_lidby6NOqp1qb8q4h.gif',
	'prfmyay': 'http://media.tumblr.com/tumblr_lkg1p32vyJ1qb8q4h.gif',
	'prfmwhimper': 'https://lh3.googleusercontent.com/-I7vmpiJ78KM/VlhCux0KYcI/AAAAAAAABBk/W40qzCRajro/w426-h353/1424361981391.gif',
	'prfmplsno': 'http://media.tumblr.com/tumblr_li4o4l0LHA1qb8q4h.gif',
	'prfmlmao': 'http://media.tumblr.com/tumblr_li80q3RshA1qb8q4h.gif',
	'prfmador': 'http://media.tumblr.com/tumblr_lidc29c6yW1qb8q4h.gif',
	'prfmapplause': 'http://i.imgur.com/zvJlmz2.gif',
	'prfmhai': 'http://i.imgur.com/4up3jVu.gif',
	'feelsweird': 'https://cdn.betterttv.net/emote/5603731ce5fc5eff1de93229/2x',
	'feelssad': 'https://cdn.betterttv.net/emote/5613b7ca141069f91f48acca/2x',
	'feelsspl': 'http://i.imgur.com/RIOKSJ3.gif',
	'feelspop': 'http://orig02.deviantart.net/c569/f/2016/131/8/b/popplio_icon_by_rayfierying-da244yn.gif',
	'feelscop': 'http://i.imgur.com/eNaFHvR.png',
	'jcena': 'http://i.imgur.com/hPz30Ol.jpg',
	'owait': 'https://cdn.betterttv.net/emote/55ab96ce9406e5482db53424/2x',
	'feelslag': 'https://cdn.betterttv.net/emote/56758c29bf317838643c7e97/2x',
	'stonedaf': 'https://cdn.betterttv.net/emote/5638163f55dee26813aebbf1/2x',
	'sanik': 'http://i.imgur.com/Y6etmna.png',
	'uliek': 'http://orig15.deviantart.net/f7e5/f/2015/044/6/c/pokemon_gif_mudkip_by_dottypurrs-d8huvrv.gif',
	'feelsarken': 'http://imgur.com/YCCDZWq.png',
	'orats': 'http://orig12.deviantart.net/edbf/f/2014/279/2/5/shiny_female_rattata_sprite_by_pokemon__sprites-d81w4pv.gif',
	'feelstrump': 'http://i.imgur.com/tqW8s6Y.png',
	'feelschara': 'http://i.imgur.com/LH303HL.gif',
	'feelsithi': 'http://i.picresize.com/images/2016/05/31/IXCqY.jpg',
	'joshawott': 'http://orig08.deviantart.net/a30d/f/2015/010/5/8/oshawott_swag_by_whatiget4beinganerd-d82v3br.gif',
	'feelsvivid': 'http://i.imgur.com/n3p5GeQ.gif',
	'despface': 'http://i.imgur.com/ArIGZ1X.gif',
	'wrOng': 'http://i.imgur.com/RTJAUqE.gif',
	'cOrrect': 'http://i.imgur.com/XHgPEjY.gif',
	'151gif': 'http://i.imgur.com/qVN1HoT.gif',
	'pramina': 'http://i.imgur.com/dyDn8hl.gif',
	'eponyta': 'http://i.imgur.com/3Ogk4Zn.gif',
	'francok': 'http://i.imgur.com/Kuz5FWV.gif',
	'feelsSuke': 'http://i.imgur.com/O2FGflw.gif',
	'feelsveno': 'http://i.imgur.com/HdoPK9x.png',
	'feelsllama': 'http://i.imgur.com/oSLSk2I.gif',
	'llamacool': 'http://i.imgur.com/X1x3728.gif',
	'llamanoodle': 'http://i.imgur.com/SUZkz5p.gif',
	'llamarawr': 'http://i.imgur.com/KWAQbPu.gif',
	'llamatea': 'http://i.imgur.com/nJnakEU.gif',
	'llamayawn': 'http://i.imgur.com/SVj8kBt.gif',
	'llamamad': 'http://i.imgur.com/eT7kdww.gif',
	'llamanv': 'http://i.imgur.com/9PgUk4M.gif',
	'llamacute': 'http://i.imgur.com/5hi0kjz.gif',
	'llamacry': 'http://i.imgur.com/ID6i8rl.gif',
	'llamapretty': 'http://i.imgur.com/mBPcOQW.gif',
	'llamabouncy': 'http://i.imgur.com/PiMDmNd.gif',
	'llamahi': 'http://i.imgur.com/2BeipQ8.gif',
	'llamasneaky': 'http://i.imgur.com/8XT3CyT.gif',
	'llamadance': 'http://i.imgur.com/Tl8xmiq.gif',
	'llamawink': 'http://i.imgur.com/Xtjjjlm.gif',
	'llamashades': 'http://i.imgur.com/jBlIicx.gif',
	'llama:3': 'http://i.imgur.com/dkV8FSY.gif',
	'llamashy': 'http://i.imgur.com/Bj7jSrc.gif',
	'llamafun': 'http://i.imgur.com/eJIALUZ.gif',
	'llamawhat': 'http://i.imgur.com/KdH5d2T.gif',
	'hoSway': 'https://cdn.betterttv.net/emote/56396c857e538de14bd747a5/2x',
	'xoxo': 'http://orig00.deviantart.net/b49d/f/2014/220/5/3/ichigo_not_impressed_icon_by_magical_icon-d7u92zg.png',
	'PogChamp': 'http://i.imgur.com/DaamYkA.png',
	'CopyThis': 'http://i.imgur.com/eZyblKn.png',
	'PastaThat': 'http://i.imgur.com/UoDtbqv.png',
	'KappaHD': 'http://i.imgur.com/Ux6uqWf.png',
	'Loominati': 'http://i.imgur.com/Cl2Hybg.png',
	'HeyGuys': 'http://i.imgur.com/I27iAfx.png',
	'dogeception': 'https://i.imgur.com/5VI6Akv.gif',
	'OhMyDog': 'http://i.imgur.com/dDWXmVN.png',
	'PraiseIt': 'http://i.imgur.com/mIgJsgZ.png',
	'riPepperonis': 'http://i.imgur.com/HfepYda.png',
	'FlexL': 'http://i.imgur.com/HOaVb7X.png',
	'FlexR': 'http://i.imgur.com/LMml9AK.png',
	'BearShark': 'http://i.imgur.com/8loNh3c.png',
	'NiceCream': 'http://i.imgur.com/e5j7qaH.png',
	'HellsYeah': 'http://i.imgur.com/BFWTMZe.png',
	'RIGGED': 'http://i.imgur.com/ZZFKaPR.png',
	'KappaDong': 'http://i.imgur.com/utDzMil.png',
	'BadTimeHD': 'http://i.imgur.com/qOucY3g.png',
	'DOITos': 'http://i.imgur.com/FqMjAli.png',
	'fIRe': 'https://www.emojibase.com/resources/img/emojis/apple/x1f525.png.pagespeed.ic.62QVMlIn1k.png',
	'WobzAway': 'http://i.imgur.com/2MynKgN.png',
	'FlexChest': 'http://i.imgur.com/xF5BEwJ.png',
	'iseeit': 'http://a.deviantart.net/avatars/i/s/iseewhatudidtherplz.png?2',
	'SquidKid': 'http://i.imgur.com/kRK3jBr.jpg',
	'Splatim': 'http://i.imgur.com/kSuGaVz.png',
	'panic': 'http://i.imgur.com/SWEVxU8.gif',
	'sp00py': 'http://i.imgur.com/Vhq1G3r.gif',
	'SPLASHING': 'http://i.imgur.com/LiTE0id.jpg',
	'SMASHING': 'http://i.imgur.com/6IDAbGR.gif',
	'Splatina': 'http://i.imgur.com/3HjAZ6T.png',
	'SPLATink': 'https://tworowtimes.com/wp-content/uploads/2016/02/Splatoon_2_-_Turquoise_ink.png',
	'Splatink': 'http://vignette2.wikia.nocookie.net/videogames-fanon/images/c/c8/Splatoon_2_-_Orange_ink.png/revision/latest?cb=20150726113201',
	'SPLATINK': 'http://vignette2.wikia.nocookie.net/videogames-fanon/images/6/61/Splatoon_2_-_Blue_ink.png/revision/latest?cb=20150726113232',
	'splatink': 'http://vignette1.wikia.nocookie.net/videogames-fanon/images/1/1d/Splatoon_2_-_Yellow_ink.png/revision/latest?cb=20150726113322',
	'sPLATINK': 'http://vignette4.wikia.nocookie.net/videogames-fanon/images/a/a0/Splatoon_2_-_Purple_ink.png/revision/latest?cb=20150726113101',
	'Splatastic': 'http://i.imgur.com/qSlSCbF.png',
	'feelsbadman': 'http://i.imgur.com/jaPiNPX.jpg',
	'feelsgoodman': 'http://i.imgur.com/UCePRuI.png',
	'feelsfeel': 'http://i.imgur.com/s8kN3AV.png',
	'feelssweet': 'http://i.imgur.com/7FDtLTq.jpg',
	'uwot': 'http://i.imgur.com/3VsV5pN.png',
	'spmeme': 'http://i.imgur.com/gYtxtDP.jpg',
	'feelssammich': 'http://i.imgur.com/sVgkUF1.png',
	'Egg1': 'http://i.imgur.com/J1Tuhua.png',
	'Egg2': 'http://i.imgur.com/BEUUdAD.png',
	'Egg3': 'http://i.imgur.com/3EcGf8h.png',
	'lelelol': 'http://i.imgur.com/R2g0RHT.gif',
	'lelepn': 'http://i.imgur.com/AtFxRsd.jpg',
	'lelegasp': 'http://i.imgur.com/lF2FPxL.png',
	'lelewhat': 'http://i.imgur.com/capG93y.png',
	'lelesad': 'http://i.imgur.com/E8hne72.png',
	'trumpin': 'http://i.imgur.com/5WVaY4U.gif',
	'shrewlove': 'http://i.imgur.com/0XPSbUp.gif',
	'planK': 'http://i.imgur.com/t96OIWw.png',
	'lelefp': 'http://i.imgur.com/pWlEKa3.jpg',
	'muddance': 'http://i.imgur.com/rae4R3Z.gif',
	'feelssavage': 'http://i.imgur.com/Vw3xwmU.jpg',
	'llamabored': 'http://orig15.deviantart.net/7929/f/2013/347/f/e/llama_emoji_36__bored___v2__by_jerikuto-d6ut3nn.gif',
	'jazz': 'http://i.imgur.com/o5gEMoA.gif',
	'DogE': '//i.imgur.com/jfVcWbz.jpg',
	/*'feelsmiguel': 'http://68.media.tumblr.com/11c5b846207ed38389ae4b6dec3fcae4/tumblr_npbpfrztSN1uxp9xfo1_1280.jpg',*/
	'NewYorkRedBullsFC': 'http://img.fifa.com/mm/teams/2147482235/2147482235x2.png',
};

let emotesKeys = Object.keys(emotes);
let patterns = [];
let metachars = /[[\]{}()*+?.\\|^$\-,&#\s]/g;

for (let i in emotes) {
	if (emotes.hasOwnProperty(i)) {
		patterns.push('(' + i.replace(metachars, '\\$&') + ')');
	}
}
let patternRegex = new RegExp(patterns.join('|'), 'g');

/**
 * Parse emoticons in message.
 *
 * @param {String} message
 * @param {Object} room
 * @param {Object} user
 * @param {Boolean} pm - returns a string if it is in private messages
 * @returns {Boolean|String}
 */
function parseEmoticons(message, room, user, pm) {
	if (typeof message !== 'string' || (!pm && room.disableEmoticons)) return false;

	let match = false;
	let len = emotesKeys.length;


	while (len--) {
		if (message && message.indexOf(emotesKeys[len]) >= 0) {
			match = true;
			break;
		}
	}

	if (!match) return false;

	//shadowbanroom message
	let sbanmsg = message;

	// escape HTML
	message = Chat.escapeHTML(message);

	// add emotes
	message = message.replace(patternRegex, function (match) {
		let emote = emotes[match];
		return typeof emote === 'string' ? '<img src="' + emote + '" title="' + match + '" />' : match;
	});

	// __italics__
	message = message.replace(/\_\_([^< ](?:[^<]*?[^< ])?)\_\_(?![^<]*?<\/a)/g, '<i>$1</i>');

	// **bold**
	message = message.replace(/\*\*([^< ](?:[^<]*?[^< ])?)\*\*/g, '<b>$1</b>');
	
	// ~~strikethrough~~
	message = message.replace(/\~\~([^< ](?:[^<]*?[^< ])?)\~\~/g, '<strike>$1</strike>');
	
	// ``code``
	message = message.replace(/\`\`([^< ](?:[^<]*?[^< ])?)\`\`/g, '<code>$1</code>');
	
	
	// Hyperlink URL
	message = Autolinker.link(message, {stripPrefix: false, phone: false, twitter: false});

	let group = user.getIdentity().charAt(0);
	if (room && room.auth) group = room.auth[user.userid] || group;
	if (pm && !user.hiding) group = user.group;

	if (pm) return "<div class='chat' style='display:inline'>" + "<em class='mine'>" + message + "</em></div>";

	let style = "background:none;border:0;padding:0 5px 0 0;font-family:Verdana,Helvetica,Arial,sans-serif;font-size:9pt;cursor:pointer";
	message = "<div class='chat'>" + "<small>" + group + "</small>" + "<button name='parseCommand' value='/user " + user.name + "' style='" + style + "'>" + "<b><font color='" + Galaxy.hashColor(user.userid) + "'>" + user.name + ":</font></b>" + "</button><em class='mine'>" + message + "</em></div>";

	/*if (Users.ShadowBan.checkBanned(user)) {
		user.sendTo(room, '|html|' + message);
		Users.ShadowBan.addMessage(user, "To " + room, sbanmsg);
	}
	if (!Users.ShadowBan.checkBanned(user)) room.addRaw(message);*/
	
	room.addRaw(message);

	room.update();
	
	return true;
}

/**
 * Create a two column table listing emoticons.
 *
 * @return {String} emotes table
 */
function create_table() {
	let emotes_name = Object.keys(emotes);
	let emotes_list = [];
	let emotes_group_list = [];
	let len = emotes_name.length;

	for (let i = 0; i < len; i++) {
		emotes_list.push("<td style='padding: 5px; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.5) inset; border-radius: 5px;'>" + "<img src='" + emotes[emotes_name[i]] + "'' title='" + emotes_name[i] + "' height='50' width='50' style='vertical-align: middle;  padding-right: 5px;' />" + emotes_name[i] + "</td>");
	}

	for (let i = 0; i < len; i += 3) {
		let emoteOutput = [emotes_list[i], emotes_list[i + 1], emotes_list[i + 2]];
		if (i < len) emotes_group_list.push("<tr>" + emoteOutput.join('') + "</tr>");
	}

	return (
		"<div class='infobox'><center><font style='font-weight: bold; text-decoration: underline; color: #555;'>List of Emoticons</font></center>" +
		"<div style='max-height: 300px; overflow-y: scroll; padding: 5px 0px;'><table style='background: rgba(245, 245, 245, 0.4); border: 1px solid #BBB;' width='100%'>" +
		emotes_group_list.join("") +
		"</table></div></div>"
	);
}

let emotes_table = create_table();

exports.commands = {
	blockemote: 'blockemoticons',
	blockemotes: 'blockemoticons',
	blockemoticon: 'blockemoticons',
	blockemoticons: function (target, room, user) {
		if (user.blockEmoticons === (target || true)) return this.sendReply("You are already blocking emoticons in private messages! To unblock, use /unblockemoticons");
		user.blockEmoticons = true;
		return this.sendReply("You are now blocking emoticons in private messages.");
	},
	blockemoticonshelp: ["/blockemoticons - Blocks emoticons in private messages. Unblock them with /unblockemoticons."],

	unblockemote: 'unblockemoticons',
	unblockemotes: 'unblockemoticons',
	unblockemoticon: 'unblockemoticons',
	unblockemoticons: function (target, room, user) {
		if (!user.blockEmoticons) return this.sendReply("You are not blocking emoticons in private messages! To block, use /blockemoticons");
		user.blockEmoticons = false;
		return this.sendReply("You are no longer blocking emoticons in private messages.");
	},
	unblockemoticonshelp: ["/unblockemoticons - Unblocks emoticons in private messages. Block them with /blockemoticons."],

	'!emoticons': true,
	emotes: 'emoticons',
	emoticons: function (target, room, user) {
		if (!this.runBroadcast()) return;
		this.sendReply("|raw|" + emotes_table);
	},
	emoticonshelp: ["/emoticons - Get a list of emoticons."],

	toggleemote: 'toggleemoticons',
	toggleemotes: 'toggleemoticons',
	toggleemoticons: function (target, room, user) {
		if (!this.can('declare', null, room)) return false;
		room.disableEmoticons = !room.disableEmoticons;
		this.sendReply("Disallowing emoticons is set to " + room.disableEmoticons + " in this room.");
		if (room.disableEmoticons) {
			this.add("|raw|<div class=\"broadcast-red\"><b>Emoticons are disabled!</b><br />Emoticons will not work.</div>");
		} else {
			this.add("|raw|<div class=\"broadcast-blue\"><b>Emoticons are enabled!</b><br />Emoticons will work now.</div>");
		}
	},
	toggleemoticonshelp: ["/toggleemoticons - Toggle emoticons on or off."],
	
};
