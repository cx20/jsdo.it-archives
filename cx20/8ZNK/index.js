// forked from _shimizu's "d3.js ネットワーク（Force Layout）" http://jsdo.it/_shimizu/9nUr

var DOT_SIZE = 14
var X_START_POS = 50;
var Y_START_POS = 50;

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
    "無","無","無","無","無","無","無","無","無","無","無","無","無","肌","肌","肌",
    "無","無","無","無","無","無","赤","赤","赤","赤","赤","無","無","肌","肌","肌",
    "無","無","無","無","無","赤","赤","赤","赤","赤","赤","赤","赤","赤","肌","肌",
    "無","無","無","無","無","茶","茶","茶","肌","肌","茶","肌","無","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","肌","肌","肌","茶","肌","肌","赤","赤","赤",
    "無","無","無","無","茶","肌","茶","茶","肌","肌","肌","茶","肌","肌","肌","赤",
    "無","無","無","無","茶","茶","肌","肌","肌","肌","茶","茶","茶","茶","赤","無",
    "無","無","無","無","無","無","肌","肌","肌","肌","肌","肌","肌","赤","無","無",
    "無","無","赤","赤","赤","赤","赤","青","赤","赤","赤","青","赤","無","無","無",
    "無","赤","赤","赤","赤","赤","赤","赤","青","赤","赤","赤","青","無","無","茶",
    "肌","肌","赤","赤","赤","赤","赤","赤","青","青","青","青","青","無","無","茶",
    "肌","肌","肌","無","青","青","赤","青","青","黄","青","青","黄","青","茶","茶",
    "無","肌","無","茶","青","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","無","茶","茶","茶","青","青","青","青","青","青","青","青","青","茶","茶",
    "無","茶","茶","茶","青","青","青","青","青","青","青","無","無","無","無","無",
    "無","茶","無","無","青","青","青","青","無","無","無","無","無","無","無","無"
];

function getRgbColor( c ) {
	var colorHash = {
		"無":"#000000",
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

var w = 440,
    h = 440
 
var nodes = [],    //ノードを収める配列
    links = [];    //ノード間のリンク情報を収める配列
 
//グラフを描画するステージ（svgタグ）を追加
var stage = d3.select("body").append("svg:svg").attr("width", w).attr("height", h);
 
//グラフの初期設定
var force = self.force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .gravity(.018) //重力
    .distance(14) //ノード間の距離
    .charge(-4.8) //各ノードの引き合うor反発しあう力
    .size([w, h]); //図のサイズ

//グラフにアニメーションイベントを設置
force.on("tick", function() {
    var node = stage.selectAll("g.node").data(nodes, function(d) { return d.id;} );
        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
 
    var link = stage.selectAll("line.link").data(links, function(d) { return d.source.id + ',' + d.target.id});
    link.attr({
        x1: function(d) { return d.source.x; },
        y1: function(d) { return d.source.y; },
        x2: function(d) { return d.target.x; },
        y2:function(d) { return d.target.y; }
    });
});
 
 
//アップデート（再描画）
function update() {
    var link = stage.selectAll("line.link")
    .data(links, function(l) { return l.source.id + '-' + l.target.id; }); //linksデータを要素にバインド
     
    link.enter().append("svg:line")
    .attr("class", "link")
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });
 
    link.exit().remove(); //要らなくなった要素を削除
 
    var node = stage.selectAll("g.node")
    .data(nodes, function(d) { return d.dpid;});  //nodesデータを要素にバインド
 
    var nodeEnter = node.enter().append("svg:g")
    .attr("class", "node")
    .call(force.drag); //ノードをドラッグできるように設定
     
    nodeEnter.append("svg:rect")
    .attr("x", "-5")
    .attr("y", "-5")
    .attr("width", "12")
    .attr("height", "12")
    .attr("fill", function(d) { console.log( d ); return d.color; });

/*
    nodeEnter.append("svg:text")
    .attr("class", "nodetext")
    .attr("dx", 18)
    .attr("dy", ".35em")
    .text(function(d) { return d.id });
*/ 
    node.exit().remove(); //要らなくなった要素を削除
 
    force.start(); //forceグラグの描画を開始
    
}
 
 
//ノード、リンクの初期値
function forceInit() {
    var node;
    var nodeLast;
    var i, x, y;
    var dots = new Array(16);
    for ( x = 0; x < 16; x++ ) {
        dots[x] = new Array(16);
    }
    
    for ( i = 0; i < dataSet.length; i++ )
    {
        x = i % 16;
        y = Math.floor( i / 16 );
        dots[x][y] = { id: x + "," +y, color: getRgbColor( dataSet[i] ) };
    }
    
    var link;
    var nodeYLast;
    for ( y = 0; y < 16; y++ ) {
        for ( x = 0; x < 16; x++ ) {
            node = dots[x][y];
            console.log( x + "," + y );
            nodes.push( node );

            if ( x > 0 ) {
                link = { source: dots[x-1][y], target: node };
                links.push( link );
            }

            if ( y > 0 ) {
                link = { source: dots[x][y-1], target: node };
                links.push( link );
            }
        }
        
        
    }
    
    update();
}
 

forceInit();
update();