// forked from cx20's "[js1k] GL Dragon Flight（転載）" http://jsdo.it/cx20/ayf2
// forked from Paul Brunt's "GL Dragon Flight" http://www.paulbrunt.co.uk/demos/js1k2/

// 1. JavaScript 部分のみコード整形した結果
/*
w = a.width/=3;
h = a.height/=3;
fs = "#ifdef GL_ES\nprecision highp float;\n#endif\nuniform float t;float a(vec3 b,float o){float c=.0,j;for(float j=.8;j<6.;j+=.7){c+=sin(b.x*j*j*2.)*cos(b.z*j*j-o)*.7/pow(j,2.5);b.xz=mat2(1.,-.4,.4,1.)*b.xz;}return c;}void main(void){float n=.5+sin(t)*.1,l=0.,d=l;vec3 p=vec3(l,-1.,-t),c=-normalize(gl_FragCoord.xyz/vec3("+w+","+h+",.5)-n);for(float i=0.;i<70.;i++){n=a(p,0.)-p.y;d+=n;p+=c*n*.4;l++;if(n<.05||d>60.) break;}l=1.-l/60.;n=max(.5-p.y,0.);gl_FragColor=vec4(mix(((a(p,1.6)+2.)*.1+l)*vec3(mix(.4,.0,min(1.,n*abs(a(p*.5,0.))+.7)))+min(1.,pow(a(p*2.,0.)*n,2.))*l,vec3(.9,.9,1.)+c.y*1.5,pow(min(d*.02,1.),2.)),1.);}";
vs = "attribute vec2 p;void main(){gl_Position=vec4(p,.5,1.);}";
for(i in g) {
    g[i[1]+i[7]+i[i.length-1]]=g[i];
}

with(g) {
    ifr(RUR, rur());
    uaa(RUR, new Float32Array([-1, -1, -1, 9, 9, -1]), 35044);
    p = rrm();
    for (t = 0; s = rhr(ESR - t); oSr(s), thr(p, s)) {
        hoe(s, t++ ? fs : vs);
    }
    igm(p);
    srm(p);
    etr(0, 2, 5126, 0, 0, 0);
    ney(0);
    s = +new Date, (
        l = function() {
            ras(RES, 0, 3);
            n1f(eon(p, "t"),.001 * (+new Date - s));
            requestAnimationFrame(l)
        }
    )()
}
*/

// 2. JavaScript の圧縮コードを展開し GLSL のコードについてもコード整形した結果
w = a.width /= 3;
h = a.height /= 3;
fs = 
    "#ifdef GL_ES\n" + 
    "precision highp float;\n" + 
    "#endif\n" + 
    "uniform float t;" + 
    "float a(vec3 b,float o) {" +
    "    float c = .0;" +
    "    float j;" + 
    "    for(float j = .8; j < 6.; j += .7) {" + 
    "        c += sin(b.x * j * j * 2.) * cos(b.z * j * j - o) * .7 / pow(j, 2.5);" + 
    "        b.xz = mat2(1., -.4, .4, 1.) * b.xz;" +
    "    }" + 
    "    return c;" + 
    "}" + 
    "void main(void) {" + 
    "    float n = .5 + sin(t) * .1;" +
    "    float l = 0.;" +
    "    float d = l;" + 
    "    vec3 p = vec3(l, -1., -t);" + 
    "    vec3 c = -normalize(gl_FragCoord.xyz / vec3(" + w + "," + h + ", .5) - n);" + 
    "    for(float i = 0.; i < 70.; i++){" + 
    "        n = a(p, 0.) - p.y;" + 
    "        d += n;" +
    "        p += c * n * .4;" +
    "        l++;" + 
    "        if(n < .05 || d > 60.) break;" + 
    "    }" + 
    "    l = 1. - l / 60.;" + 
    "    n = max(.5 - p.y, 0.);" + 
    "    gl_FragColor = vec4(" +
    "        mix(((a(p, 1.6) + 2.) * .1 + l) * vec3(mix(.4, .0, min(1., n * abs(a(p * .5, 0.)) + .7))) + " +
    "        min(1., pow(a(p * 2., 0.) * n, 2.)) * l," +
    "        vec3(.9,.9,1.) + c.y * 1.5, pow(min(d*.02,1.),2.)), 1." +
    "    );" + 
    "}";
vs = 
    "attribute vec2 p;" + 
    "void main() {" + 
    "    gl_Position = vec4(p, .5, 1.);" + 
    "}";

for(i in g) {
    g[i[1]+i[7]+i[i.length-1]]=g[i];
}

with(g) {
    bindBuffer(ARRAY_BUFFER, createBuffer());
    bufferData(ARRAY_BUFFER, new Float32Array([-1, -1, -1, 9, 9, -1]), STATIC_DRAW);
    p = createProgram();
    for (t = 0; s = createShader(VERTEX_SHADER - t); ) {
        shaderSource (s, t++ ? fs : vs);
        attachShader(p, s);
        compileShader(s);
    }
    linkProgram(p);
    useProgram(p);
    vertexAttribPointer(0, 2, FLOAT, 0, 0, 0);
    enableVertexAttribArray(0);
    s = +new Date, (
        l = function() {
            drawArrays(TRIANGLES, 0, 3);
            uniform1f(getUniformLocation(p, "t"), .001 * (+new Date - s));
            requestAnimationFrame(l)
        }
    )()
}
