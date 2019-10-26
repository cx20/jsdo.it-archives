// forked from cx20's "空耳メーカー by Clippy.js" http://jsdo.it/cx20/mhnb
// forked from cx20's "空耳メーカー for jsdo.it ver 0.03" http://jsdo.it/cx20/3JTG
// forked from cx20's "空耳メーカー for jsdo.it ver 0.02" http://jsdo.it/cx20/lLfQ
// forked from cx20's "空耳メーカー for jsdo.it ver 0.01" http://jsdo.it/cx20/ggp0
// forked from cx20's "2013-03-31 3rd" http://jsdo.it/cx20/s0Et

function convJapaneseToSoramimiEnglish() {
    convKanjiToHiragana( "txtJapanese", "txtEnglish" );
}

function speakSoramimiEnglish(){
    var text = document.getElementById("txtEnglish").value;
    speak(text);
}

function speakSoramimiEnglishByGoogleTTS(){
    var text = document.getElementById("txtEnglish").value;
    tts(text);
}

function tts(text) {
    var lang = 'en';
    var tts_url = 'http://translate.google.com/translate_tts?tl=' + lang + '&q=';
    var tts_utterance = text;
    tts_utterance = encodeURIComponent(tts_utterance);
    tts_url += tts_utterance;
    var inner_html = '<iframe src="' + tts_url + '" style="display:none;"></iframe>';
    document.getElementById("audio_google_tts").innerHTML = inner_html;
}

var global = this;
var DEFAULT_TIMEOUT = 10 * 1000; //10 seconds
var YQL_URL = "http://query.yahooapis.com/v1/public/yql";
var API_URL = "http://jlp.yahooapis.jp/FuriganaService/V1/furigana";
var appid = "dj0zaiZpPVZHWXJyYm1pbjNqYSZkPVlXazlkbUUzUmtrek5tc21jR285TUEtLSZzPWNvbnN1bWVyc2VjcmV0Jng9NTA-";    // Fork される場合はアプリケーションID の変更をお願いします
var img;

function convKanjiToHiragana( jp, en ) {
    var result = "";
    var script = getScriptTag();
    var i, len, attr;
    var filter, timeout;
    var requestFunc;
    var params = {};
    var yqlparams = {format:'json'};

    var attrs = {};
    attrs['data-url'] = API_URL;
    attrs['data-p-appid'] = appid;
    attrs['data-p-sentence'] = document.getElementById(jp).value;

    img = document.createElement('div');
    img.setAttribute('id', "placeFolder" );

    params.appid = attrs['data-p-appid'];
    params.sentence = attrs['data-p-sentence'];

    var url=false, yql=false, table = 'xml';
    url = attrs['data-url'];
    url += '?' + buildQuery(params);
    yqlparams.q = 'SELECT * FROM ' + table + ' WHERE url="' + url + '"';

    //script.parentNode.replaceChild(img, script);
    script.parentNode.appendChild( img );
    var request = function(){
        requestJSONP(YQL_URL, yqlparams, timeout, function(data){
            var box, credit = '';

            var strHiragana = "";
            for (var i = 0, len = data.query.results.ResultSet.Result.WordList.Word.length; i < len; i++) {
                var word = data.query.results.ResultSet.Result.WordList.Word[i];
                if ( typeof word.Furigana === "undefined" )
                {
                    strHiragana += word.Surface;
                }
                else
                {
                    strHiragana += word.Furigana;
                }
            }

            var soramimi = new SoramimiMaker();
            soramimi.ConvertJapaneseToEnglish( strHiragana );
            document.getElementById(en).value = soramimi.English;
        });
    };

    //APIリクエスト
    request();
}

function getScriptTag() {
    var scripts = document.getElementsByTagName('script');
    var i = scripts.length - 1;
    return scripts[i];
}

function requestJSONP(url, params, timeout, callback) {
    var callbackName = 'yj_callback' + (+new Date()) + ((Math.random() * 100)|0);
    var req = document.createElement('script');
    var timerId;
    
    if (!timeout) timeout = DEFAULT_TIMEOUT;

    params.callback = callbackName;
    req.type = 'text/javascript';
    req.src = url + '?' + buildQuery(params);

    global[callbackName] = function(data) {
        clearTimeout(timerId);
        req.parentNode.removeChild(req);
        global[callbackName] = null;
        return callback(data);
    };

    timerId = setTimeout(function(){
        callback({YahooApiError:true});
    }, timeout);

    img.parentNode.insertBefore(req, img.nextSibling);
}

function buildQuery(hash) {
    var queries = [], key, encode = global.encodeURIComponent;
    for (key in hash) if (hash.hasOwnProperty(key)) {
        queries.push(encode(key) + '=' + encode(hash[key]));
    }
    return queries.join('&');
}

String.prototype.trim = function() {
    return this.replace(/^[ ]+|[ ]+$/g, '');
};

var SoramimiMaker = function() {
    var dic = [];
    this.AppendDic = function(strDic) {
        var strItems = strDic.split(";");
        for (var i = 0; i < strItems.length; i++) {
            var strItem = strItems[i];
            var strKeyValueArray = strItem.split("=");
            var strKey = strKeyValueArray[0].trim();
            var strValue = strKeyValueArray[1].trim();
            dic[strKey] = strValue; // dic["あ"] = "are";
        }
    };
    this.AppendDic("あ   = are;  い   = e;    う   = woo;  え   = eh;   お   = o");
    this.AppendDic("か   = car;  き   = key;  く   = coo;  け   = kay;  こ   = coe");
    this.AppendDic("さ   = saw;  し   = she;  す   = su;   せ   = set;  そ   = so");
    this.AppendDic("た   = ta;   ち   = chee; つ   = two;  て   = tegh; と   = toe");
    this.AppendDic("な   = nar;  に   = knee; ぬ   = new;  ね   = nay;  の   = noe");
    this.AppendDic("は   = ha;   ひ   = he;   ふ   = foo;  へ   = hey;  ほ   = ho");
    this.AppendDic("ま   = maw;  み   = me;   む   = moo;  め   = may;  も   = moe");
    this.AppendDic("や   = yah;               ゆ   = you;               よ   = yeo");
    this.AppendDic("ら   = law;  り   = lee;  る   = rue;  れ   = ray;  ろ   = roe");
    this.AppendDic("わ   = wor;  ゐ   = we;                ゑ   = way;  を   = wo");
    this.AppendDic("ん   = n");
    this.AppendDic("が   = gaw;  ぎ   = gae;  ぐ   = goo;  げ   = get;  ご   = go");
    this.AppendDic("ざ   = zar;  じ   = ji;   ず   = zoo;  ぜ   = zee;  ぞ   = zlo");
    this.AppendDic("だ   = duh;  ぢ   = gee;  づ   = zu;   で   = day;  ど   = doe");
    this.AppendDic("ば   = baw;  び   = be;   ぶ   = boo;  べ   = beh;  ぼ   = bo");
    this.AppendDic("ぱ   = pa;   ぴ   = p;    ぷ   = phu;  ぺ   = pet;  ぽ   = pop");

    this.AppendDic("きゃ = cat;               きゅ = que;               きょ = kyo");
    this.AppendDic("しゃ = sha;               しゅ = shoe;              しょ = show");
    this.AppendDic("ちゃ = cha;               ちゅ = chew;              ちょ = cho");
    this.AppendDic("にゃ = nier;              にゅ = nue;               にょ = gno");
    this.AppendDic("ひゃ = hya ;              ひゅ = hue;               ひょ = heo");
    this.AppendDic("みゃ = mya;               みゅ = mew;               みょ = mio");
    this.AppendDic("りゃ = lya;               りゅ = lue;               りょ = low");
    this.AppendDic("ぎゃ = gap;               ぎゅ = gue;               ぎょ = gheo");
    this.AppendDic("じゃ = jar;               じゅ = jew;               じょ = jo");
    this.AppendDic("びゃ = v'ya;              びゅ = view;              びょ = b'yo");
    this.AppendDic("ぴゃ = pyat;              ぴゅ = pew;               ぴょ = p'yo");

    this.AppendDic("ああ = are;  いい = e;    うう = woo;  ええ = eh;   おお = o");
    this.AppendDic("かあ = car;  きい = key;  くう = cool; けえ = k;    こお = coe");
    this.AppendDic("さあ = sar;  しい = see;  すう = su;   せえ = set;  そお = so");
    this.AppendDic("たあ = tar;  ちい = cheer; つう = two;  てえ = tait; とお = toe");
    this.AppendDic("なあ = nah;  にい = knee; ぬう = new;  ねえ = nay;  のお = noe");
    this.AppendDic("はあ = her;  ひい = he;   ふう = foo;  へえ = hey;  ほお = ho");
    this.AppendDic("まあ = mar;  みい = me;   むう = moo;  めえ = mair; もお = moe");
    this.AppendDic("やあ = yah;               ゆう = you;               よお = yor");
    this.AppendDic("らあ = rah;  りい = lee;  るう = rue;  れえ = ray;  ろお = row");
    this.AppendDic("わあ = war;  ゐい = we;                ゑえ = way;  をお = wo");
    this.AppendDic("があ = gar;  ぎい = geek; ぐう = goo;  げえ = gay;  ごお = goh");
    this.AppendDic("ざあ = zar;  じい = zee;  ずう = zoo;  ぜえ = they; ぞお = soh");
    this.AppendDic("だあ = dah;  ぢい = dee;  づう = zu;   でえ = day;  どお = doh");
    this.AppendDic("ばあ = bar;  びい = bee;  ぶう = boo;  べえ = bay;  ぼお = boh");
    this.AppendDic("ぱあ = per;  ぴい = pee;  ぷう = poor; ぺえ = pay;  ぽお = poh");

    this.AppendDic("あー = are;  いー = e;    うー = woo;  えー = eh;   おー = oh");
    this.AppendDic("かー = car;  きー = key;  くー = coo;  けー = k;    こー = coe");
    this.AppendDic("さー = sar;  しー = see;  すー = su;   せー = set;  そー = soe");
    this.AppendDic("たー = tar;  ちー = cheer;つー = two;  てー = tait; とー = toe");
    this.AppendDic("なー = nah;  にー = knee; ぬー = new;  ねー = nae;  のー = noe");
    this.AppendDic("はー = her;  ひー = he;   ふー = foo;  へー = hey;  ほー = hoe");
    this.AppendDic("まー = mar;  みー = me;   むー = moo;  めー = mair; もー = moe");
    this.AppendDic("やー = yah;               ゆー = you;               よー = yor");
    this.AppendDic("らー = rah;  りー = lee;  るー = rue;  れー = ray;  ろー = row");
    this.AppendDic("わー = war;  ゐー = we;                ゑー = way;  をー = woe");
    this.AppendDic("がー = gar;  ぎー = geek; ぐー = goo;  げー = gay;  ごー = goh");
    this.AppendDic("ざー = zar;  じー = zee;  ずー = zoo;  ぜー = they; ぞー = soh");
    this.AppendDic("だー = dah;  ぢー = dee;  づー = zu;   でー = day;  どー = doh");
    this.AppendDic("ばー = bar;  びー = bee;  ぶー = boo;  べー = bay;  ぼー = boh");
    this.AppendDic("ぱー = per;  ぴー = pee;  ぷー = poor; ぺー = pay;  ぽー = poh");

    this.AppendDic("あい = i;                 うい = we;   えい = eh;   おう = oh");
    this.AppendDic("かい = kite;              くい = cui;  けい = k;    こう = coe");
    this.AppendDic("さい = sigh;              すい = swee; せい = say;  そう = soe");
    this.AppendDic("たい = tai;               つい = twit; てい = take; とう = toe");
    this.AppendDic("ない = nigh;              ぬい = nui;  ねい = nay;  のう = noe");
    this.AppendDic("はい = high;              ふい = hui;  へい = hey;  ほう = hoe");
    this.AppendDic("まい = mai;               むい = mui;  めい = may;  もう = moe");
    this.AppendDic("やい = yawi;              ゆい = youy;              よう = yeo");
    this.AppendDic("らい = rye;               るい = louie;れい = ray;  ろう = row");
    this.AppendDic("わい = y;                              ゑい = way;  をう = woe");
    this.AppendDic("がい = guy;               ぐい = gui;  げい = gay;  ごう = goe");
    this.AppendDic("ざい = zai;               ずい = zy;   ぜい = they; ぞう = zoe");
    this.AppendDic("だい = die;               づい = zooy; でい = day;  どう = doe");
    this.AppendDic("ばい = buy;               ぶい = buoy; べい = bay;  ぼう = boe");
    this.AppendDic("ぱい = pai;               ぷい = puy;  ぺい = pay;  ぽう = poe");

    this.AppendDic("あか = archa; いか= icker;うか = wooca;えか = ecker;おか = walker");
    this.AppendDic("かか = kaka;  きか= kicker;くか= cooca;けか = kekka;こか = coca");
    this.AppendDic("さか = sucker;しか= sicker;すか= sooca;せか = seca; そか = soca");
    this.AppendDic("たか = tucker;ちか= ticker;つか= tooca;てか = teca; とか = talker");
    this.AppendDic("なか = knucker;にか=nicker;ぬか= nuca; ねか = necker;のか= noka");
    this.AppendDic("はか = hacker;ひか= hicker;ふか= hooca;へか = hecker;ほか= hoka");
    this.AppendDic("まか = macca; みか= mika; むか = mooka;めか = meca; もか = moca");
    this.AppendDic("やか = yacker;            ゆか = youka;             よか = yoca");
    this.AppendDic("らか = rucker;りか= rika; るか = luca; れか = recker;ろか= loca");
    this.AppendDic("わか = wacker;ゐか= wicker;            ゑか = weca; をか = walker");
    this.AppendDic("ざか = zacca; じか= jicker;ずか= zooka;ぜか = zeca; ぞか = zoca");
    this.AppendDic("がか = gucker;ぎか= ghika;ぐか = gooka;げか = geca; ごか = goca");
    this.AppendDic("だか = ducker;ぢか= zika; づか = zooka;でか = decker;どか= doca");
    this.AppendDic("ばか = backer;びか= beaker;ぶか= booka;べか = beca; ぼか = boca");
    this.AppendDic("ぱか = parker;ぴか= picker;ぷか= pooca;ぺか = pecker;ぽか= poker");

    this.AppendDic("あき = aki;  いき = iki;  うき = uki;  えき = ecky; おき = okie");
    this.AppendDic("かき = kakee;きき = kiki; くき =cookie;けき = cake; こき = cokie");
    this.AppendDic("さき = sucky;しき = sicky;すき = ski;  せき = secky;そき = socky");
    this.AppendDic("たき = tucky;ちき = ticky;つき = tooki;てき = tecky;とき = talky");
    this.AppendDic("なき = knacky;にき= nicky;ぬき = nuki; ねき = necky;のき = nokie");
    this.AppendDic("はき = hackie;ひき= hicky;ふき = whoky;へき = hecky;ほき = hockey");
    this.AppendDic("まき = marquee;みき=mickey;むき= muki; めき = mecky;もき = mocky");
    this.AppendDic("やき = yacky;             ゆき = youky;             よき = yocky");
    this.AppendDic("らき = lucky;りき = lucky;るき =lookie;れき = recky;ろき = rocky");
    this.AppendDic("わき = wacky;ゐき = wicky;             ゑき = wecky;をき = walky");
    this.AppendDic("ざき = zacky;じき = jicky;ずき = zooky;ぜき = zecky;ぞき = zocky");
    this.AppendDic("がき = gucky;ぎき = ghiky;ぐき = gooky;げき = gekky;ごき = gocky");
    this.AppendDic("だき = ducky;ぢき = dicky;づき = zooky;でき =decking;どき= docky");
    this.AppendDic("ばき = backy;びき = beaky;ぶき = booky;べき = becky;ぼき = bocky");
    this.AppendDic("ぱき = packy;ぴき = picky;ぷき = pooky;ぺき = pecky;ぽき = pocky");

    this.AppendDic("あす = ass;  いす = ist;  うす = woos; えす = s;    おす = woss");
    this.AppendDic("かす = kass; きす = kiss; くす = couss;けす = kess; こす = koss");
    this.AppendDic("さす = sass; しす = sis;  すす = souss;せす = sess; そす = soss");
    this.AppendDic("たす = tass; ちす = cheess;つす= tooss;てす = tess; とす = toss");
    this.AppendDic("なす = nass; にす = neess;ぬす = nooss;ねす = ness; のす = noss");
    this.AppendDic("はす = hass; ひす = hiss; ふす = hooss;へす = hess; ほす = hoss");
    this.AppendDic("ます = mass; みす = miss; むす = mooss;めす = mess; もす = moss");
    this.AppendDic("やす = yass;              ゆす = youss;             よす = yoss");
    this.AppendDic("らす = las;  りす = liss; るす = looss;れす = less; ろす = loss");
    this.AppendDic("わす = wass; ゐす = wiss;              ゑす = wess; をす = woss");
    this.AppendDic("がす = gas;  ぎす = giss; ぐす = gooss;げす = gess; ごす = goss");
    this.AppendDic("ざす = zass; じす = jiss; ずす = zooss;ぜす = zes;  ぞす = zoss");
    this.AppendDic("だす = dass; ぢす = diss; づす = dooss;です = death;どす = doss");
    this.AppendDic("ばす = bus;  びす = bis;  ぶす = booss;べす = bess; ぼす = boss");
    this.AppendDic("ぱす = pass; ぴす = piss; ぷす = pooss;ぺす = pess; ぽす = poss");

    this.AppendDic("あず = as;   いず = is;   うず = woods;えず = aids; おず = woes");
    this.AppendDic("かず = kads; きず = kids; くず = koods;けず = keds; こず = koes");
    this.AppendDic("さず = sads; しず = seas; すず = soods;せず = seds; そず = soes");
    this.AppendDic("たず = tads; ちず = chees;つず = toods;てず = teds; とず = toes");
    this.AppendDic("なず = nads; にず = needs;ぬず = noods;ねず = neds; のず = noes");
    this.AppendDic("はず = hads; ひず = hids; ふず = hoods;へず = heds; ほず = hoes");
    this.AppendDic("まず = mads; みず = mids; むず = moods;めず = meds; もず = moes");
    this.AppendDic("やず = yads;              ゆず = youds;             よず = yoes");
    this.AppendDic("わず = wads; ゐず = wids;              ゑず = weds; をず = woes");
    this.AppendDic("がず = gads; ぎず = gids; ぐず = goods;げず = geds; ごず = goes");
    this.AppendDic("ざず = zads; じず = jids; ずず = zoods;ぜず = zeds; ぞず = zoz");
    this.AppendDic("だず = dads; ぢず = dids; づず = doods;でず = dez;  どず = does");
    this.AppendDic("ばず = bads; びず = bids; ぶず = boods;べず = beds; ぼず = boes");
    this.AppendDic("ぱず = pads; ぴず = piz;  ぷず = poods;ぺず = peds; ぽず = poes");

    this.AppendDic("あた = artar; いた= ita;  うた = wooter;えた= aiter;おた = otac");
    this.AppendDic("かた = cutter;きた= kita; くた = coota;けた = keter;こた = cota");
    this.AppendDic("さた = sutter;した= seater;すた= soota;せた = seter;そた = sota");
    this.AppendDic("たた = tutter;ちた= chita;つた = toota;てた = tetar;とた = tota");
    this.AppendDic("なた = nutter;にた= nita; ぬた = noota;ねた = neter;のた = nota");
    this.AppendDic("はた = hutter;ひた= hita; ふた = hoota;へた = heter;ほた = hota");
    this.AppendDic("また = mutter;みた= mita; むた = moota;めた = meta; もた = mota");
    this.AppendDic("やた = yotter;            ゆた = youta;             よた = yota");
    this.AppendDic("らた = rutter;りた= rita; るた = loota;れた = reta; ろた = lota");
    this.AppendDic("わた = wutter;ゐた= wita;              ゑた = weta; をた = wota");
    this.AppendDic("ざた = zutter;じた= jita; ずた = zooter;ぜた= zeta; ぞた = zota");
    this.AppendDic("がた = gutter;ぎた=guitar;ぐた = gooter;げた= geta; ごた = gota");
    this.AppendDic("だた = dutter;ぢた= zita; づた = zooter;でた= deta; どた = dota");
    this.AppendDic("ばた = butter;びた= buita;ぶた = booter;べた= beta; ぼた = borta");
    this.AppendDic("ぱた = putter;ぴた= pita; ぷた = pooter;ぺた= peta; ぽた = pota");

    this.AppendDic("あら = alar; いら = era;  うら = urra; えら = error;おら = orac");
    this.AppendDic("から = color;きら = kira; くら = clack;けら = keler;こら = cola");
    this.AppendDic("さら = sala; しら = seala;すら = sura; せら = cera; そら = solar");
    this.AppendDic("たら = tala; ちら = chilla;つら= tula; てら = tera; とら = tora");
    this.AppendDic("なら = narra;にら = nira; ぬら = nura; ねら = nera; のら = nora");
    this.AppendDic("はら = hara; ひら = hira; ふら = hoora;へら = hera; ほら = horra");
    this.AppendDic("まら = mara; みら = mira; むら = moora;めら = mera; もら = mora");
    this.AppendDic("やら = yara;              ゆら = yura;              よら = yora");
    this.AppendDic("らら = lara; りら = rira; るら = loola;れら = lehrer;ろら= lora");
    this.AppendDic("わら = wara; ゐら = wira;              ゑら = wera; をら = wora");
    this.AppendDic("ざら = zara; じら = jira; ずら = zoora;ぜら = zera; ぞら = zora");
    this.AppendDic("がら = gulla;ぎら = ghiler;ぐら= goora;げら = gera; ごら = gora");
    this.AppendDic("だら = dura; ぢら = ziler;づら = zoora;でら = dera; どら = dora");
    this.AppendDic("ばら = bara; びら = bila; ぶら = bula; べら = bera; ぼら = borla");
    this.AppendDic("ぱら = para; ぴら = pira; ぷら = pula; ぺら = pera; ぽら = polar");

    this.AppendDic("あり = arie; いり = eley; うり = wooly;えり = elly; おり = ollie");
    this.AppendDic("かり = cali; きり = kili; くり = kooly;けり = kelly;こり = kollie");
    this.AppendDic("さり = sari; しり = ciri; すり = sooly;せり = selly;そり = solly");
    this.AppendDic("たり = tally;ちり = chilly;つり= tooly;てり = telly;とり = tolly");
    this.AppendDic("なり = nally;にり = nili; ぬり = nooly;ねり = nelly;のり = nori");
    this.AppendDic("はり = hally;ひり = hilly;ふり = hooly;へり = helly;ほり = hori");
    this.AppendDic("まり = mally;みり = milli;むり = mooly;めり = melly;もり = molly");
    this.AppendDic("やり = yally;             ゆり = yooly;             より = yori");
    this.AppendDic("らり = rally;りり = lilly;るり = looly;れり = reli; ろり = loli");
    this.AppendDic("わり = wally;ゐり = willy;             ゑり = welly;をり = wollie");
    this.AppendDic("ざり = zally;じり = jilly;ずり = zree; ぜり = zelly;ぞり = zollie");
    this.AppendDic("がり = gally;ぎり = gilly;ぐり = gree; げり = gelly;ごり = gori");
    this.AppendDic("だり = dally;ぢり = dilly;づり = zree; でり = deli; どり = dori");
    this.AppendDic("ばり = bally;びり = billy;ぶり = bree; べり = belly;ぼり = bori");
    this.AppendDic("ぱり = pally;ぴり = pirie;ぷり = pree; ぺり = pelly;ぽり = pori");

    this.AppendDic("ある = aru;  いる = eylew;うる= ulu;   える = eru;  おる = all");
    this.AppendDic("かる = caru; きる = keel; くる= crue;  ける = keru; こる = call");
    this.AppendDic("さる = saru; しる = shiel;する= through;せる= cell; そる = soll");
    this.AppendDic("たる = taru; ちる = chiel;つる= true;  てる = teru; とる = toll");
    this.AppendDic("なる = naru; にる = niru ;ぬる= nuru;  ねる = neru; のる = knoll");
    this.AppendDic("はる = haru; ひる = heel; ふる= fool;  へる = heru; ほる = holl");
    this.AppendDic("まる = maru; みる = miru; むる= mool;  める = meru; もる = moru");
    this.AppendDic("やる = yaru;              ゆる= yuru;               よる = yoru");
    this.AppendDic("らる = raru; りる = reel; るる= rule;  れる = reru; ろる = role");
    this.AppendDic("わる = walt; ゐる = will;              ゑる = weru; をる = wole");
    this.AppendDic("ざる = zaru; じる = jill; ずる= zulu;  ぜる = zeru; ぞる = zoll");
    this.AppendDic("がる = garu; ぎる = ghil; ぐる= guru;  げる =get rue;ごる= goru");
    this.AppendDic("だる = darl; ぢる = dill; づる= zulu;  でる = deru; どる = doll");
    this.AppendDic("ばる = baru; びる = bill; ぶる= buru;  べる = bell; ぼる = boru");
    this.AppendDic("ぱる = paru; ぴる = pill; ぷる= pull;  ぺる = peru; ぽる = poru");

    this.AppendDic("あれ = array;いれ = irre; うれ = woo're;えれ= elec; おれ = olay");
    this.AppendDic("かれ = kaway;きれ = chela;くれ = coo're;けれ= kera; これ = colet");
    this.AppendDic("され = sally;しれ = shilla;すれ= slay; せれ = seile;それ = solei");
    this.AppendDic("たれ = telei;ちれ = chilei;つれ= too're;てれ= tella;とれ = tolei");
    this.AppendDic("なれ = nalla;にれ = nalei;ぬれ = nure; ねれ = nella;のれ = nolei");
    this.AppendDic("はれ = halle;ひれ = helei;ふれ = hoo're;へれ= hella;ほれ = holei");
    this.AppendDic("まれ = malla;みれ = milla;むれ = moo're;めれ= mella;もれ = molei");
    this.AppendDic("やれ = yalla;             ゆれ = you'lei;           よれ = yolei");
    this.AppendDic("られ = ralla;りれ = relay;るれ = roulette;れれ=rella;ろれ= lolei");
    this.AppendDic("われ = walla;ゐれ = welei;              ゑれ= wella;をれ = wolei");
    this.AppendDic("ざれ = zalla;じれ = jilla;ずれ = zoo're;ぜれ= zella;ぞれ = zolei");
    this.AppendDic("がれ = galla;ぎれ = gelei;ぐれ = goo're;げれ= gera; ごれ = golei");
    this.AppendDic("だれ = dalla;ぢれ = delei;づれ = zoo're;でれ= della;どれ = dolei");
    this.AppendDic("ばれ = balla;びれ = bila; ぶれ = boo're;べれ= belle;ぼれ = bolei");
    this.AppendDic("ぱれ = palla;ぴれ = pelei;ぷれ = poo're;ぺれ= pelle;ぽれ = polei");

    this.AppendDic("あろ = alot; いろ = e-row;うろ = woorow;えろ= ero;  おろ = oro");
    this.AppendDic("かろ = carro;きろ = kiro; くろ = coo'ro;けろ= kero; ころ = koro");
    this.AppendDic("さろ = saro; しろ = sherow;すろ= slow; せろ = sero; そろ = soro");
    this.AppendDic("たろ = taro; ちろ = chi'ro;つろ= too'ro;てろ= terro;とろ = toro");
    this.AppendDic("なろ = nalow;にろ = niro; ぬろ = noorow;ねろ= nero; のろ = noro");
    this.AppendDic("はろ = helo; ひろ = hero; ふろ = flo;  へろ = haro; ほろ = horo");
    this.AppendDic("まろ = maro; みろ = miro; むろ = moo'ro;めろ= mero; もろ = moro");
    this.AppendDic("やろ = yaro;              ゆろ = you'ro;            よろ = yoro");
    this.AppendDic("らろ = raro; りろ = riro; るろ = loo'ro;れろ= rero; ろろ = loro");
    this.AppendDic("わろ = waro; ゐろ = wiro;              ゑろ = wero; をろ = woro");
    this.AppendDic("ざろ = zaro; じろ = jiro; ずろ= zoo'ro;ぜろ = zero; ぞろ = zoro");
    this.AppendDic("がろ = garo; ぎろ = giro; ぐろ= goo'ro;げろ = gero; ごろ = goro");
    this.AppendDic("だろ = daro; ぢろ = diro; づろ= zoo'ro;でろ = dero; どろ = dolo");
    this.AppendDic("ばろ = baro; びろ = biro; ぶろ= boo'ro;べろ = bero; ぼろ = boro");
    this.AppendDic("ぱろ = paro; ぴろ = piro; ぷろ= poo'ro;ぺろ = pero; ぽろ = polo");

    this.AppendDic("あん = ann;  いん = in;   うん = unn;  えん = en;   おん = on");
    this.AppendDic("かん = come; きん = kin;  くん = coon; けん = ken;  こん = kong");
    this.AppendDic("さん = sun;  しん = shin; すん = soon; せん = senn; そん = song");
    this.AppendDic("たん = tun;  ちん = chin; つん = zun;  てん = ten;  とん = tong");
    this.AppendDic("なん = nan;  にん = nin;  ぬん = noon; ねん = nen;  のん = nong");
    this.AppendDic("はん = han;  ひん = hin;  ふん = hoon; へん = hen;  ほん = hong");
    this.AppendDic("まん = man;  みん = minn; むん = moon; めん = men;  もん = mong");
    this.AppendDic("やん = yan;               ゆん = yun;               よん = yong");
    this.AppendDic("らん = run;  りん = rin;  るん = roon; れん = ren;  ろん = rong");
    this.AppendDic("わん = wan;  ゐん = win;               ゑん = wen;  をん = wonn");
    this.AppendDic("がん = gun;  ぎん = ginn; ぐん = goon; げん = gann; ごん = gonn");
    this.AppendDic("ざん = than; じん = jin;  ずん = zun;  ぜん = then; ぞん = zonn");
    this.AppendDic("だん = dunn; ぢん = zin;  づん = zun;  でん = den;  どん = donn");
    this.AppendDic("ばん = ban;  びん = bin;  ぶん = boon; べん = ben;  ぼん = bonn");
    this.AppendDic("ぱん = pahm; ぴん = pin;  ぷん = poon; ぺん = pen;  ぽん = ponn");

    this.AppendDic("あっ = at;   いっ = it;   うっ = woo;  えっ = ewo;  おっ = o'");
    this.AppendDic("かっ = cut;  きっ = kit;  くっ = coo;  けっ = ket;  こっ = cot");
    this.AppendDic("さっ = sat;  しっ = sit;  すっ = sook; せっ = set;  そっ = sot");
    this.AppendDic("たっ = tat;  ちっ = tit;  つっ = took; てっ = tet;  とっ = tot");
    this.AppendDic("なっ = nat;  にっ = nit;  ぬっ = nook; ねっ = net;  のっ = not");
    this.AppendDic("はっ = hat;  ひっ = hit;  ふっ = hook; へっ = het;  ほっ = hot");
    this.AppendDic("まっ = mat;  みっ = mick; むっ = mook; めっ = met;  もっ = mock");
    this.AppendDic("やっ = yat;               ゆっ = you;               よっ = yot");
    this.AppendDic("らっ = rat;  りっ = rick; るっ = rook; れっ = reck; ろっ = rot");
    this.AppendDic("わっ = wat;  ゐっ = wit;               ゑっ = wet;  をっ = wot");
    this.AppendDic("がっ = gat;  ぎっ = git;  ぐっ = good; げっ = get;  ごっ = got");
    this.AppendDic("ざっ = zat;  じっ = jit;  ずっ = zoot; ぜっ = zet;  ぞっ = zot");
    this.AppendDic("だっ = dat;  ぢっ = dit;  づっ = zook; でっ = det;  どっ = dot");
    this.AppendDic("ばっ = bat;  びっ = bit;  ぶっ = book; べっ = bet;  ぼっ = bot");
    this.AppendDic("ぱっ = pat;  ぴっ = pit;  ぷっ = pook; ぺっ = pet;  ぽっ = pot");

    this.AppendDic("きゃう = kyar;          きゅう = qew;             きょう = kiyo");
    this.AppendDic("しゃう = shar;          しゅう = shoe;            しょう = show");
    this.AppendDic("ちゃう = char;          ちゅう = chew;            ちょう = chalk");
    this.AppendDic("にゃう = nier;          にゅう = new;             にょう = gno");
    this.AppendDic("ひゃう = hyar;          ひゅう = huew;            ひょう = he-yo");
    this.AppendDic("みゃう = myar;          みゅう = mew;             みょう = mio");
    this.AppendDic("りゃう = lyar;          りゅう = rew;             りょう = low");
    this.AppendDic("ぎゃう = gear;          ぎゅう = gew;             ぎょう = gheo");
    this.AppendDic("じゃう = jar;           じゅう = jew;             じょう = jo");
    this.AppendDic("びゃう = v'yar;         びゅう = view;            びょう = b'yo");
    this.AppendDic("ぴゃう = p'yar;         ぴゅう = pew;             ぴょう = p'yo");

    this.AppendDic("きゃー = kyar;          きゅー = qew;             きょー = kiyo");
    this.AppendDic("しゃー = shar;          しゅー = shoe;            しょー = show");
    this.AppendDic("ちゃー = char;          ちゅー = chew;            ちょー = cho");
    this.AppendDic("にゃー = nier;          にゅー = new;             にょー = chalk");
    this.AppendDic("ひゃー = hyar;          ひゅー = huew;            ひょー = he-yo");
    this.AppendDic("みゃー = myar;          みゅー = mew;             みょー = mio");
    this.AppendDic("りゃー = lyar;          りゅー = rew;             りょー = low");
    this.AppendDic("ぎゃー = gear;          ぎゅー = gew;             ぎょー = gheo");
    this.AppendDic("じゃー = jar;           じゅー = jew;             じょー = jo");
    this.AppendDic("びゃー = v'yar;         びゅー = view;            びょー = b'yo");
    this.AppendDic("ぴゃー = p'yar;         ぴゅー = pew;             ぴょー = p'yo");

    this.AppendDic("きゃん = kyang;         きゅん = qewn;            きょん = kiyong");
    this.AppendDic("しゃん = shang;         しゅん = shewn;           しょん = shon");
    this.AppendDic("ちゃん = chang;         ちゅん = chewn;           ちょん = chon");
    this.AppendDic("にゃん = nieng;         にゅん = newn;            にょん = gnon");
    this.AppendDic("ひゃん = hyang;         ひゅん = huewn;           ひょん = heon");
    this.AppendDic("みゃん = myang;         みゅん = mewn;            みょん = mion");
    this.AppendDic("りゃん = lyang;         りゅん = lewn;            りょん = lon");
    this.AppendDic("ぎゃん = geang;         ぎゅん = gewn;            ぎょん = gheon");
    this.AppendDic("じゃん = jang;          じゅん = jewn;            じょん = jon");
    this.AppendDic("びゃん = v'yang;        びゅん = viewn;           びょん = byung");
    this.AppendDic("ぴゃん = p'yang;        ぴゅん = pewn;            ぴょん = pyong");
    
    // 都道府県用辞書
    this.AppendDic("なが = nagar");
    this.AppendDic("おく = oak");
    this.AppendDic("かく = cock");
    this.AppendDic("きく = kick");
    this.AppendDic("くく = cook");
    this.AppendDic("けく = keck");
    this.AppendDic("こく = kock");
    this.AppendDic("さく = suck");
    this.AppendDic("しく = sick");
    this.AppendDic("せく = seck");
    this.AppendDic("そく = sock");
    this.AppendDic("たく = tack");
    this.AppendDic("ちく = tick");
    this.AppendDic("てく = tech");
    this.AppendDic("とく = tock");
    this.AppendDic("なく = nack");
    this.AppendDic("にく = nick");
    this.AppendDic("ねく = neck");
    this.AppendDic("のく = nock");
    this.AppendDic("はく = hack");
    this.AppendDic("ふく = fuku");
    this.AppendDic("まく = mac");
    this.AppendDic("みく = mick");
    this.AppendDic("むく = mook");
    this.AppendDic("めく = meck");
    this.AppendDic("もく = mock");
    this.AppendDic("らく = luck");
    this.AppendDic("ろく = rock");
    this.AppendDic("かご = cargo");
    this.AppendDic("いし = ishi");
    this.AppendDic("とち = torch");
    this.AppendDic("ぐち = gucci");
    this.AppendDic("もと = moto");
    this.AppendDic("いば = eva");
    this.AppendDic("ぎふ = giff");
    this.AppendDic("みや = mere");
    this.AppendDic("くま = kumar");
    this.AppendDic("しま = seama");
    this.AppendDic("たま = tama");
    this.AppendDic("やま = yahma");
    this.AppendDic("かみ = cami");
    this.AppendDic("がみ = gammi");
    this.AppendDic("こうち = coach");
    
    // 人名
    this.AppendDic("おだ = order");
    this.AppendDic("たわ = tower");
    
    // その他
    this.AppendDic("あんこ = encore");
    this.AppendDic("さま = summer");
    this.AppendDic("げむ = game");

    this.AppendDic("ふぁ = far");
    this.AppendDic("ふぃ = fee");
    this.AppendDic("ふぇ = faye");
    this.AppendDic("ふぉ = for");

    this.AppendDic("かな = kerner");
    this.AppendDic("さな = sana");
    this.AppendDic("たな = turner");
    this.AppendDic("なな = nana");
    this.AppendDic("はな = herna");
    this.AppendDic("まな = manner");
    this.AppendDic("らな = lana");
    this.AppendDic("わな = werner");

    this.AppendDic("なわ = nowar");
    this.AppendDic("うえ = wait");
    this.AppendDic("やつ = yatz");

    this.AppendDic("あっく = ack");
    this.AppendDic("おっく = oak");
    this.AppendDic("かっく = cock");
    this.AppendDic("きっく = kick");
    this.AppendDic("くっく = cook");
    this.AppendDic("けっく = keck");
    this.AppendDic("こっく = kock");
    this.AppendDic("さっく = suck");
    this.AppendDic("しっく = sick");
    this.AppendDic("せっく = seck");
    this.AppendDic("そっく = sock");
    this.AppendDic("たっく = tack");
    this.AppendDic("ちっく = tick");
    this.AppendDic("てっく = tech");
    this.AppendDic("とっく = tock");
    this.AppendDic("なっく = nack");
    this.AppendDic("にっく = nick");
    this.AppendDic("ねっく = neck");
    this.AppendDic("のっく = nock");
    this.AppendDic("はっく = hack");
    this.AppendDic("ふっく = hook");
    this.AppendDic("まっく = mac");
    this.AppendDic("みっく = mick");
    this.AppendDic("むっく = mook");
    this.AppendDic("めっく = meck");
    this.AppendDic("もっく = mock");
    this.AppendDic("らっく = luck");
    this.AppendDic("ろっく = rock");

    this.AppendDic("きぇく = keck");
    this.AppendDic("きゃく = cack");
    this.AppendDic("しょく = shock");
    this.AppendDic("ちゃく = chack");
    this.AppendDic("ちぇく = check");

    // 捨て仮名
    this.AppendDic("ぁ   = are;  ぃ   = e;    ぅ   = woo;  ぇ   = eh;   ぉ   = o");
    this.AppendDic("ゃ   = yah;               ゅ   = you;               ょ   = yeo");

    this.AppendDic("は、= war,; は。= war.");
    this.AppendDic("へ、= e,;   へ。= e.");
    this.AppendDic("っ = ,; 、= ,;  。= .; ー = -; ？ = ?; ！ = !");
    this.AppendDic("「 = \";」= \";『 = \";』 = \";（ = (; ） = )");

    this.m_dic = dic;

    this.ConvertZenkakuToHankaku = function(strZenkaku) {
        var strResult = "";
        for ( var i = 0; i < strZenkaku.length; i++ ) {
            var unicode = strZenkaku.charCodeAt(i);
            if ( ( 0xff0f < unicode ) && ( unicode < 0xff1a ) ) {
                strResult += String.fromCharCode( unicode - 0xfee0 );
            } else if ( ( 0xff20 < unicode ) && ( unicode < 0xff3b ) ) {
                strResult += String.fromCharCode( unicode - 0xfee0 );
            } else if ( ( 0xff40 < unicode ) && ( unicode < 0xff5b ) ) {
                strResult += String.fromCharCode( unicode - 0xfee0 );
            } else {
                strResult += String.fromCharCode( unicode );
            }
        }
        return strResult; /* 半角処理のみ */
    };

    this.ConvertKatakanaToHiragana = function(strKatakana)
    {
        var i, c, a = [];
        for( i = strKatakana.length-1; 0 <= i; i-- )
        {
            c = strKatakana.charCodeAt(i);
            a[i] = (0x30A1 <= c && c <= 0x30F6) ? c - 0x0060 : c;
        }
        return String.fromCharCode.apply(null, a);
    };

    this.ConvertJapaneseToEnglish = function(strJapanese) {
        var strResult = "";

        var strLineArray = strJapanese.split("\r\n");
        var strLine;
        for (var i = 0; i < strLineArray.length; i++) {
            strLine = strLineArray[i];
            strLine = this.ConvertKatakanaToHiragana( strLine );
            strLine = this.ConvertZenkakuToHankaku(strLine);
            strResult += this.ConvertJapaneseToEnglishSingleLine(strLine) + "\r\n";
        }
        strResult = strResult.replace(/[\s]+/g, " "); // 不要スペース削除
        strResult = strResult.replace(/[\s]+\,/g, ","); // 不要スペース削除
        strResult = strResult.replace(/[\s]+\./g, "."); // 不要スペース削除

        this.English = strResult;
    };
    this.ConvertJapaneseToEnglishSingleLine = function(strJapanese) {
        var strResult = "";
        var strKey;
        var strValue;
        var bFirst = true;
        for (var i = 0; i < strJapanese.length; i++) {
            if (i === 0) {
                bFirst = true;
            }
            else {
                bFirst = false;
            }
            var strKey3 = strJapanese.substr(i, 3);
            var strKey2 = strJapanese.substr(i, 2);
            var strKey1 = strJapanese.substr(i, 1);
            if (this.m_dic[strKey3]) {
                strKey = strKey3;
                i += 2;
            }
            else if (this.m_dic[strKey2]) {
                strKey = strKey2;
                i += 1;
            }
            else if (this.m_dic[strKey1]) {
                strKey = strKey1;
            }
            else {
                strKey = strKey1;
            }
            if (this.m_dic[strKey]) {
                strValue = this.m_dic[strKey];
                if ( bFirst ) {
                    strResult += strValue;
                }
                else if (strValue == "," || strValue == ".") {
                    // 「,」「.」の前はスペースを付加する（「co.」「no.」となるのを防ぐ為）
                    strResult += " " + strValue;
                }
                else {
                    // 文の先頭以外はスペースを付加する。
                    strResult += " " + strValue;
                }
            }
            else {
                // 辞書に存在しない場合は元の値をセット
                strResult += strKey;
            }
        }
        return strResult;
    };
};

clippy.BASE_PATH = "http://s3.amazonaws.com/clippy.js/Agents/";
//clippy.load('Merlin', function (agent) {
//clippy.load('Rocky', function (agent) {
clippy.load('Peedy', function (agent) {
    // Do anything with the loaded agent
    agent.show();
    // move to the given point, use animation if available
    agent.moveTo(300, 300);
    
    setTimeout( hello, 10000 );
    
    function hello() {
        $('#speak_by_speakjs').trigger("click");
    }

    $("#speak_by_speakjs").click(function () {
        // Show text balloon
        //agent.speak('When all else fails, bind some paper together. My name is Clippy.');
        convJapaneseToSoramimiEnglish();
        var timerId = setTimeout(function(){
            var text = document.getElementById("txtEnglish").value;
            var textJP = document.getElementById("txtJapanese").value;
            agent.stop();
            agent.speak(textJP);
            speak(text);
            agent.animate();
        }, 1000);
    });
    
   
    
    $("#speak_by_googletts").click(function () {
        // Show text balloon
        //agent.speak('When all else fails, bind some paper together. My name is Clippy.');
        convJapaneseToSoramimiEnglish();
        var timerId = setTimeout(function(){
            var text = document.getElementById("txtEnglish").value;
            agent.stop();
            agent.speak(text);
            tts(text);
            agent.animate();
        }, 1000);
    });

});
