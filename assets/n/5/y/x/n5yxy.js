//importScripts('speakGenerator.js');
importScripts('http://cx20.main.jp/edu/javascript/SoramimiMaker/speakGenerator.js');

onmessage = function(event) {
  postMessage(generateSpeech(event.data.text, event.data.args));
};

