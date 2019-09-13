// forked from cx20's "[地理院地図] d3.js を使って作品を並べてみるテスト" http://jsdo.it/cx20/qRQE
// forked from cx20's "[Three.js+Oimo.js] d3.js を使って作品を並べてみるテスト" http://jsdo.it/cx20/ccJ0
// forked from cx20's "[GLSL] d3.js を使ってサンプルを並べてみるテスト" http://jsdo.it/cx20/bcus
// forked from cx20's "[WebGL] d3.js を使って作品を並べてみるテスト" http://jsdo.it/cx20/1000
// forked from _shimizu's "d3.js ネットワーク（Force Layout）" http://jsdo.it/_shimizu/9nUr

//var w = 465;
//var h = 465;
var w = window.innerWidth;
var h = window.innerHeight;
 
var shiftKey = false;
var ctrlKey = false;
var nodes = [];   // ノードを収める配列
var links = [];   // ノード間のリンク情報を収める配列
 
document.addEventListener("keydown", KeyDownFunc);
document.addEventListener("keyup", KeyUpFunc);

function KeyDownFunc(e) {
    shiftKey = e.shiftKey;
    ctrlKey = e.ctrlKey;
}

function KeyUpFunc(e) {
    shiftKey = e.shiftKey;
    ctrlKey = e.ctrlKey;
}

// グラフを描画するステージ（svgタグ）を追加
var stage = d3.select("#container").append("svg:svg").attr("width", w).attr("height", h);
var tooltip = d3.select("body").select("#tooltip");
var iframe = document.getElementById('iframe_id');
 
// グラフの初期設定
var force = self.force = d3.layout.force()
    .nodes(nodes)
    .links(links)
    .gravity(0.05) // 重力
    .distance(100) // ノード間の距離
    .charge(-100)  // 各ノードの引き合うor反発しあう力
    .size([w, h]); // 図のサイズ
 
// グラフにアニメーションイベントを設置
force.on("tick", function() {
    var node = stage.selectAll("g.node").data(nodes, function(d) { return d.id;} );
        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
 
    var link = stage.selectAll("line.link").data(links, function(d) { return d.source.id + ',' + d.target.id});
    link.attr({
        x1: function(d) { return d.source.x; },
        y1: function(d) { return d.source.y; },
        x2: function(d) { return d.target.x; },
        y2: function(d) { return d.target.y; }
    });
});
 
 
// アップデート（再描画）
function update() {
    var link = stage.selectAll("line.link")
    .data(links, function(l) { return l.source.id + '-' + l.target.id; }); // linksデータを要素にバインド
     
    link.enter().append("svg:line")
    .attr("class", "link")
    .attr("x1", function(d) { return d.source.x; })
    .attr("y1", function(d) { return d.source.y; })
    .attr("x2", function(d) { return d.target.x; })
    .attr("y2", function(d) { return d.target.y; });
 
    // 要らなくなった要素を削除
    link.exit().remove();
 
    var node = stage.selectAll("g.node")
    .data(nodes, function(d) { return d.dpid;});  // nodesデータを要素にバインド
 
    var nodeEnter = node.enter().append("svg:g")
    .attr("class", "node")
    .call(force.drag); // ノードをドラッグできるように設定
    
    nodeEnter.append("svg:image")
    .attr("class", "rect")
    .attr("xlink:href", function(d) { return d.image}) // ノード用画像の設定
    .attr("x", "-16px")
    .attr("y", "-16px")
    .attr("width", "32px")
    .attr("height", "32px")
    .on("click", function(d) {
        console.log("url:" + window.location.href + ", shiftKey:" + shiftKey + ", ctrlKey:" + ctrlKey);
        if (shiftKey) {
            window.open(d.url, '_blank');
        } else if (ctrlKey) {
            window.open(d.url.replace("jsrun.it", "jsdo.it"));
        } else {
            iframe.contentDocument.location = d.url;
        }
    })
    .on("mouseover", function(d) {return tooltip.style("visibility", "visible").text(d.title);})
    .on("mousemove", function(d) {return tooltip.style("top", (event.pageY-20)+"px").style("left",(event.pageX+10)+"px");})
    .on("mouseout", function(d) {return tooltip.style("visibility", "hidden");});
/* 
    nodeEnter.append("svg:text")
    .attr("class", "nodetext")
    .attr("dx", 18)
    .attr("dy", ".35em")
    .text(function(d) { return d.id });
*/ 
    // 要らなくなった要素を削除
    node.exit().remove();
 
    // forceグラグの描画を開始
    force.start();
}

// ノード、リンクの初期値
function forceInit() {
    for ( var key in dataSet ) {
        var node = dataSet[key];
        nodes.push(node);
        if ( node.parent != null ) {
            var targetKey = node.parent;
            var target = dataSet[targetKey];
            var link = {source:node, target:target};
            links.push(link);
        }
    }    
    
    update();
}

forceInit();
update();
