// forked from cx20's "HTML TABLE でドット絵を描くテスト" http://jsdo.it/cx20/wD9k

// ‥‥‥‥‥‥‥‥‥‥‥‥‥□□□
// ‥‥‥‥‥‥〓〓〓〓〓‥‥□□□
// ‥‥‥‥‥〓〓〓〓〓〓〓〓〓□□
// ‥‥‥‥‥■■■□□■□‥■■■
// ‥‥‥‥■□■□□□■□□■■■
// ‥‥‥‥■□■■□□□■□□□■
// ‥‥‥‥■■□□□□■■■■■‥
// ‥‥‥‥‥‥□□□□□□□■‥‥
// ‥‥■■■■■〓■■■〓■‥‥‥
// ‥■■■■■■■〓■■■〓‥‥■
// □□■■■■■■〓〓〓〓〓‥‥■
// □□□‥〓〓■〓〓□〓〓□〓■■
// ‥□‥■〓〓〓〓〓〓〓〓〓〓■■
// ‥‥■■■〓〓〓〓〓〓〓〓〓■■
// ‥■■■〓〓〓〓〓〓〓‥‥‥‥‥
// ‥■‥‥〓〓〓〓‥‥‥‥‥‥‥‥
var dataSet = [
    "＿","＿","＿","＿","＿","＿","＿","＿","＿","＿","＿","＿","＿","肌","肌","肌",
    "＿","＿","＿","＿","＿","＿","赤","赤","赤","赤","赤","＿","＿","肌","肌","肌",
    "＿","＿","＿","＿","＿","赤","赤","赤","赤","赤","赤","赤","赤","赤","肌","肌",
    "＿","＿","＿","＿","＿","茶","茶","茶","肌","肌","茶","肌","＿","赤","赤","赤",
    "＿","＿","＿","＿","茶","肌","茶","肌","肌","肌","茶","肌","肌","赤","赤","赤",
    "＿","＿","＿","＿","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","赤",
    "＿","＿","＿","＿","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","赤","＿",
    "＿","＿","＿","＿","＿","＿","肌","肌","肌","肌","肌","肌","肌","赤","＿","＿",
    "＿","＿","赤","赤","赤","赤","赤","青","赤","赤","赤","青","赤","＿","＿","＿",
    "＿","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","赤","青","＿","＿","茶",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","青","青","＿","＿","茶",
    "肌","肌","肌","＿","青","青","赤","青","青","黄","青","青","黄","青","茶","茶",
    "＿","肌","＿","茶","青","青","青","青","青","青","青","青","青","青","茶","茶",
    "＿","＿","茶","茶","茶","青","青","青","青","青","青","青","青","青","茶","茶",
    "＿","茶","茶","茶","青","青","青","青","青","青","青","＿","＿","＿","＿","＿",
    "＿","茶","＿","＿","青","青","青","青","＿","＿","＿","＿","＿","＿","＿","＿"
];

function getRgbColor( c )
{
    var colorHash = {
        "無":"#000000",
        "＿":"#000000",
        "白":"#ffffff",
        "肌":"#ffcccc",
        "茶":"#800000",
        "赤":"#ff0000",
        "黄":"#ffff00",
        "緑":"#00ff00",
        "水":"#00ffff",
        "青":"#0000ff",
        "紫":"#800080"
    };
    return colorHash[ c ];
}

var table = document.createElement("table");
table.id = "Worksheet1";
var i = 0;
for (var r = 0; r < 16; r++) {
    var row = table.insertRow(r);
    for (var c = 0; c < 16; c++) {
        var cell = row.insertCell(c);
        var colorName = dataSet[i];
/*
        var text = document.createElement("input");
        text.type = "text";
        text.size = 1;
        text.value = colorName;
        cell.appendChild(text);
*/
        cell.bgColor = getRgbColor( colorName );
        //cell.style.color = getRgbColor( colorName );
        cell.appendChild(document.createTextNode(colorName));
        i++;
    }
}
var content = document.getElementById("content");
content.appendChild( table );

$('#save').on('click', function () {
    var file = {
        worksheets: [
            []
        ], // worksheets has one empty worksheet (array)
        creator: 'cx20',
        created: new Date(),
        lastModifiedBy: 'cx20',
        modified: new Date(),
        activeWorksheet: 0
    }, w = file.worksheets[0]; // cache current worksheet
    w.name = $('#WName').val();
    $('#Worksheet1').find('tr').each(function () {
        var r = w.push([]) - 1; // index of current row
        var val, color, borders, cell;
        $(this).find('td').each(function () {
            val = this.textContent;
            color = getRgbColor( val ).substr( 1, 6 );
            if ( val !== "＿" ) {
                borders = {
                    left: color,
                    right: color,
                    top: color,
                    bottom: color,
                    diagonal: color
                };
            } else {
                borders = {};
            }

            w[r].push({
                value: val,
                bold: true,
                borders: borders,
                fontName:"メイリオ",
                fontSize:"10"
            });
        });
    });

    window.location = xlsx(file).href();
});
