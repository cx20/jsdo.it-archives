// forked from cx20's "空耳点字メーカー for jsdo.it ver 0.01" http://jsdo.it/cx20/8Nfz
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

    params['appid'] = attrs['data-p-appid'];
    params['sentence'] = attrs['data-p-sentence'];

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
            var word = "";
            if ( typeof data.query.results.ResultSet.Result.WordList.Word.length === "undefined" )
            {
                word = data.query.results.ResultSet.Result.WordList.Word;
                if ( typeof word.Furigana == "undefined" ) 
                {
                    strHiragana += word.Surface;
                }
                else
                {
                    strHiragana += word.Furigana;
                }
            }
            else
            {
                for (var i = 0, len = data.query.results.ResultSet.Result.WordList.Word.length; i < len; i++) {
                    word = data.query.results.ResultSet.Result.WordList.Word[i];
                    if ( typeof word.Furigana === "undefined" )
                    {
                        strHiragana += word.Surface;
                    }
                    else
                    {
                        strHiragana += word.Furigana;
                    }
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
    this.AppendDic("あ = --.--; い = .-   ; う = ..-  ; え = -.---; お = .-...");
    this.AppendDic("か = .-.. ; き = -.-..; く = ...- ; け = -.-- ; こ = ---- ");
    this.AppendDic("さ = -.-.-; し = --.-.; す = ---.-; せ = .---.; そ = ---. ");
    this.AppendDic("た = -.   ; ち = ..-. ; つ = .--. ; て = .-.--; と = ..-..");
    this.AppendDic("な = .-.  ; に = -.-. ; ぬ = .... ; ね = --.- ; の = ..-- ");
    this.AppendDic("は = -... ; ひ = --..-; ふ = --.. ; へ = .    ; ほ = -..  ");
    this.AppendDic("ま = -..- ; み = ..-.-; む = -    ; め = -...-; も = -..-.");
    this.AppendDic("や = .--  ; ゆ = -..--; よ = --   ");
    this.AppendDic("ら = ...  ; り = --.  ; る = -.--.; れ = ---  ; ろ = .-.- ");
    this.AppendDic("わ = -.-  ; ゐ = .-..-; ゑ = .--..; を = .--- ; ん = .-.-.");

    this.AppendDic("が = .-..  ..; ぎ = -.-.. ..; ぐ = ...-  ..; げ = -.--  ..; ご = ----  ..");
    this.AppendDic("ざ = -.-.- ..; じ = --.-. ..; ず = ---.- ..; ぜ = .---. ..; ぞ = ---.  ..");
    this.AppendDic("だ = -.    ..; ぢ = ..-.  ..; づ = .--.  ..; で = .-.-- ..; ど = ..-.. ..");
    this.AppendDic("ば = -...  ..; び = --..- ..; ぶ = --..  ..; べ = .     ..; ぼ = -..   ..");
    this.AppendDic("ぱ = -...  ..---.; ぴ = --..-  ..---.; ぷ = --.. ..---.; ぺ = .    ..---.; ぽ = -..  ..---.");
    // 記号類
    this.AppendDic("っ = .-- ; ー = .--.- ; 、= .-.-.-; 。= .-.-.-;？= ..--..; ！= ;・= "); 
    this.AppendDic("& = ");
    this.AppendDic("! = ");
    this.AppendDic(". = .-.-.-");
    this.AppendDic(", = --..--");
    // アルファベット
    this.AppendDic("A = .-  ; B = -...; C = -.-.; D = -.. ; E = .   ");
    this.AppendDic("F = ..-.; G = --. ; H = ....; I = ..  ; J = .---");
    this.AppendDic("K = -.- ; L = .-..; M = --  ; N = -.  ; O = --- ");
    this.AppendDic("P = .--.; Q = --.-; R = .-. ; S = ... ; T = -   ");
    this.AppendDic("U = ..- ; V = ...-; W = .-- ; X = -..-; Y = -.--");
    this.AppendDic("Z = --..");
    this.AppendDic("a = .-  ; b = -...; c = -.-.; d = -.. ; e = .   ");
    this.AppendDic("f = ..-.; g = --. ; h = ....; i = ..  ; j = .---");
    this.AppendDic("k = -.- ; l = .-..; m = --  ; n = -.  ; o = --- ");
    this.AppendDic("p = .--.; q = --.-; r = .-. ; s = ... ; t = -   ");
    this.AppendDic("u = ..- ; v = ...-; w = .-- ; x = -..-; y = -.--");
    this.AppendDic("z = --..");
    // 数値
    this.AppendDic("1 = .----; 2 = ..---; 3 = ...--; 4 = ....-; 5 = .....");
    this.AppendDic("6 = -....; 7 = --...; 8 = ---..; 9 = ----.; 0 = -----");

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

/////////////////////////////////////////////////
// audio.js
// forked from myme's "Testing out Web Audio API with a simple morse code generator." https://gist.github.com/myme/7554709
/////////////////////////////////////////////////
var audioCtx = new (window.AudioContext || window.webkitAudioContext)();
var unit = 100;

window.playMorse = function(input) {
    var destination = audioCtx.destination;
    var oscillator = audioCtx.createOscillator();
    var offset = 0;
    var morse;

    oscillator.type = 'triangle';
    oscillator.start(0);

    var connect = function() {
        oscillator.connect(destination);
    };

    var disconnect = function() {
        oscillator.disconnect(0);
    };
    var morse = input.split('');

    while (morse.length) {
        setTimeout(connect, offset);
        var diff = 0;
        switch ( morse.shift() ) {
        case '.':
            diff = unit;
            break;
        case '-':
            diff = unit * 3;
            break;
        default:
            diff = 0;
        }
        offset += diff;
        setTimeout(disconnect, offset);

        if (morse.length) {
            offset += unit;
        }
    }

    setTimeout(function() {
        oscillator.disconnect(audioCtx.destination);
        oscillator.stop(0);
    }, offset);
}

function onClickPlayMorse()
{
    var text = document.getElementById("txtEnglish").value;
    playMorse(text);
}