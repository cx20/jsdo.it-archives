[js1k] GL Dragon Flight（解析結果）

この作品のポイントは、以下の圧縮用コードにあるかと思います。

＜圧縮用コード＞
for(i in g) {
　　g[i[1]+i[7]+i[i.length-1]]=g[i];
}

この処理は長い WebGL の API を3文字化することで効率的なコード圧縮を実現しているようです。

圧縮前： bindBuffer(ARRAY_BUFFER, createBuffer());
圧縮後： ifr(RUR, rur());

＜対応表＞
RUR : ARRAY_BUFFER = [34962]
ESR : VERTEX_SHADER = [35633]
RES : TRIANGLES = [4]

rur : createBuffer = [function createBuffer() { [native code] }]
rrm : createProgram = [function createProgram() { [native code] }]
rhr : createShader = [function createShader() { [native code] }]
ifr : bindBuffer = [function bindBuffer() { [native code] }]
uaa : bufferData = [function bufferData() { [native code] }]
oSr : compileShader = [function compileShader() { [native code] }]
thr : attachShader = [function attachShader() { [native code] }]
hoe : shaderSource = [function shaderSource() { [native code] }]
igm : linkProgram = [function linkProgram() { [native code] }]
srm : useProgram = [function useProgram() { [native code] }]
ras : drawArrays = [function drawArrays() { [native code] }]
n1f : uniform1f = [function uniform1f() { [native code] }]
etr : vertexAttribPointer = [function vertexAttribPointer() { [native code] }]
eon : getUniformLocation = [function getUniformLocation() { [native code] }]
ney : enableVertexAttribArray = [function enableVertexAttribArray() { [native code] }]