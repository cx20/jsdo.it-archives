var extract = ( function () {

    var e = function(){
        var pp;
        function r(e,r){pp({action:nr,cbn:r,result:e})}
        function o(e){var r=[];return r[e-1]=void 0,r}
        function n(e,r){return i(e[0]+r[0],e[1]+r[1])}
        function t(e,r){var o,n;return e[0]==r[0]&&e[1]==r[1]?0:(o=0>e[1],n=0>r[1],o&&!n?-1:!o&&n?1:d(e,r)[1]<0?-1:1)}
        function i(e,r){var o,n;for(r%=0x10000000000000000,e%=0x10000000000000000,o=r%ir,n=Math.floor(e/ir)*ir,r=r-o+n,e=e-n+o;0>e;)e+=ir,r-=ir;for(;e>4294967295;)e-=ir,r+=ir;for(r%=0x10000000000000000;r>0x7fffffff00000000;)r-=0x10000000000000000;for(;-0x8000000000000000>r;)r+=0x10000000000000000;return[e,r]}
        function s(e){return e>=0?[e,0]:[e+ir,-ir]}
        function u(e){return e[0]>=2147483648?~~Math.max(Math.min(e[0]-ir,2147483647),-2147483648):~~Math.max(Math.min(e[0],2147483647),-2147483648)}
        function d(e,r){return i(e[0]-r[0],e[1]-r[1])}
        function c(e,r){return e.ab=r,e.cb=0,e.O=r.length,e}
        function m(e){return e.cb>=e.O?-1:255&e.ab[e.cb++]}
        function a(e){return e.ab=o(32),e.O=0,e}
        function _(e){var r=e.ab;return r.length=e.O,r}
        function f(e,r,o,n){p(r,o,e.ab,e.O,n),e.O+=n}
        function p(e,r,o,n,t){for(var i=0;t>i;++i)o[n+i]=e[r+i]}
        function D(e,r,o){var n,t,i,u,d="",c=[];for(t=0;5>t;++t){if(i=m(r),-1==i)throw Error("truncated input");c[t]=i<<24>>24}if(n=b({}),!z(n,c))throw Error("corrupted input");for(t=0;64>t;t+=8){if(i=m(r),-1==i)throw Error("truncated input");i=i.toString(16),1==i.length&&(i="0"+i),d=i+""+d}/^0+$|^f+$/i.test(d)?e.M=sr:(u=parseInt(d,16),e.M=u>4294967295?sr:s(u)),e.S=I(n,r,o,e.M)}
        function g(e,r){return e.Y=a({}),D(e,c({},r),e.Y),e}
        function l(e,r,o){var n=e.y-r-1;for(0>n&&(n+=e.c);0!=o;--o)n>=e.c&&(n=0),e.x[e.y++]=e.x[n++],e.y>=e.c&&w(e)}
        function v(e,r){(null==e.x||e.c!=r)&&(e.x=o(r)),e.c=r,e.y=0,e.w=0}
        function w(e){var r=e.y-e.w;r&&(f(e.T,e.x,e.w,r),e.y>=e.c&&(e.y=0),e.w=e.y)}
        function R(e,r){var o=e.y-r-1;return 0>o&&(o+=e.c),e.x[o]}
        function h(e,r){e.x[e.y++]=r,e.y>=e.c&&w(e)}
        function P(e){w(e),e.T=null}
        function C(e){return e-=2,4>e?e:3}
        function S(e){return 4>e?0:10>e?e-3:e-6}
        function M(e,r){return e.h=r,e.bb=null,e.V=1,e}
        function L(e){if(!e.V)throw Error("bad state");if(e.bb)throw Error("No encoding");return B(e),e.V}
        function B(e){var r=N(e.h);if(-1==r)throw Error("corrupted input");e.$=sr,e.Z=e.h.d,(r||t(e.h.U,ur)>=0&&t(e.h.d,e.h.U)>=0)&&(w(e.h.b),P(e.h.b),e.h.a.K=null,e.V=0)}
        function I(e,r,o,n){return e.a.K=r,P(e.b),e.b.T=o,y(e),e.f=0,e.l=0,e.Q=0,e.R=0,e._=0,e.U=n,e.d=ur,e.G=0,M({},e)}
        function N(e){var r,o,i,d,c,m;if(m=u(e.d)&e.P,Q(e.a,e.t,(e.f<<4)+m)){if(Q(e.a,e.E,e.f))i=0,Q(e.a,e.r,e.f)?(Q(e.a,e.u,e.f)?(Q(e.a,e.s,e.f)?(o=e._,e._=e.R):o=e.R,e.R=e.Q):o=e.Q,e.Q=e.l,e.l=o):Q(e.a,e.o,(e.f<<4)+m)||(e.f=7>e.f?9:11,i=1),i||(i=x(e.n,e.a,m)+2,e.f=7>e.f?8:11);else if(e._=e.R,e.R=e.Q,e.Q=e.l,i=2+x(e.D,e.a,m),e.f=7>e.f?7:10,c=q(e.k[C(i)],e.a),c>=4){if(d=(c>>1)-1,e.l=(2|1&c)<<d,14>c)e.l+=J(e.J,e.l-c-1,e.a,d);else if(e.l+=U(e.a,d-4)<<4,e.l+=F(e.q,e.a),0>e.l)return-1==e.l?1:-1}else e.l=c;if(t(s(e.l),e.d)>=0||e.l>=e.m)return-1;l(e.b,e.l,i),e.d=n(e.d,s(i)),e.G=R(e.b,0)}else r=Z(e.j,u(e.d),e.G),e.G=7>e.f?T(r,e.a):$(r,e.a,R(e.b,e.l)),h(e.b,e.G),e.f=S(e.f),e.d=n(e.d,dr);return 0}
        function b(e){e.b={},e.a={},e.t=o(192),e.E=o(12),e.r=o(12),e.u=o(12),e.s=o(12),e.o=o(192),e.k=o(4),e.J=o(114),e.q=j({},4),e.D=G({}),e.n=G({}),e.j={};for(var r=0;4>r;++r)e.k[r]=j({},6);return e}
        function y(e){e.b.w=0,e.b.y=0,X(e.t),X(e.o),X(e.E),X(e.r),X(e.u),X(e.s),X(e.J),H(e.j);for(var r=0;4>r;++r)X(e.k[r].z);A(e.D),A(e.n),X(e.q.z),V(e.a)}
        function z(e,r){var o,n,t,i,s,u,d;if(5>r.length)return 0;for(d=255&r[0],t=d%9,u=~~(d/9),i=u%5,s=~~(u/5),o=0,n=0;4>n;++n)o+=(255&r[1+n])<<8*n;return o>99999999||!W(e,t,i,s)?0:O(e,o)}
        function O(e,r){return 0>r?0:(e.A!=r&&(e.A=r,e.m=Math.max(e.A,1),v(e.b,Math.max(e.m,4096))),1)}
        function W(e,r,o,n){if(r>8||o>4||n>4)return 0;E(e.j,o,r);var t=1<<n;return k(e.D,t),k(e.n,t),e.P=t-1,1}
        function k(e,r){for(;r>e.e;++e.e)e.I[e.e]=j({},3),e.H[e.e]=j({},3)}
        function x(e,r,o){if(!Q(r,e.N,0))return q(e.I[o],r);var n=8;return n+=Q(r,e.N,1)?8+q(e.L,r):q(e.H[o],r)}
        function G(e){return e.N=o(2),e.I=o(16),e.H=o(16),e.L=j({},8),e.e=0,e}
        function A(e){X(e.N);for(var r=0;e.e>r;++r)X(e.I[r].z),X(e.H[r].z);X(e.L.z)}
        function E(e,r,n){var t,i;if(null==e.F||e.g!=n||e.B!=r)for(e.B=r,e.X=(1<<r)-1,e.g=n,i=1<<e.g+e.B,e.F=o(i),t=0;i>t;++t)e.F[t]=K({})}
        function Z(e,r,o){return e.F[((r&e.X)<<e.g)+((255&o)>>>8-e.g)]}
        function H(e){var r,o;for(o=1<<e.g+e.B,r=0;o>r;++r)X(e.F[r].v)}
        function T(e,r){var o=1;do o=o<<1|Q(r,e.v,o);while(256>o);return o<<24>>24}
        function $(e,r,o){var n,t,i=1;do if(t=o>>7&1,o<<=1,n=Q(r,e.v,(1+t<<8)+i),i=i<<1|n,t!=n){for(;256>i;)i=i<<1|Q(r,e.v,i);break}while(256>i);return i<<24>>24}
        function K(e){return e.v=o(768),e}
        function j(e,r){return e.C=r,e.z=o(1<<r),e}
        function q(e,r){var o,n=1;for(o=e.C;0!=o;--o)n=(n<<1)+Q(r,e.z,n);return n-(1<<e.C)}
        function F(e,r){var o,n,t=1,i=0;for(n=0;e.C>n;++n)o=Q(r,e.z,t),t<<=1,t+=o,i|=o<<n;return i}
        function J(e,r,o,n){var t,i,s=1,u=0;for(i=0;n>i;++i)t=Q(o,e,r+s),s<<=1,s+=t,u|=t<<i;return u}
        function Q(e,r,o){var n,t=r[o];return n=(e.i>>>11)*t,(-2147483648^n)>(-2147483648^e.p)?(e.i=n,r[o]=t+(2048-t>>>5)<<16>>16,-16777216&e.i||(e.p=e.p<<8|m(e.K),e.i<<=8),0):(e.i-=n,e.p-=n,r[o]=t-(t>>>5)<<16>>16,-16777216&e.i||(e.p=e.p<<8|m(e.K),e.i<<=8),1)}
        function U(e,r){var o,n,t=0;for(o=r;0!=o;--o)e.i>>>=1,n=e.p-e.i>>>31,e.p-=e.i&n-1,t=t<<1|1-n,-16777216&e.i||(e.p=e.p<<8|m(e.K),e.i<<=8);return t}
        function V(e){e.p=0,e.i=-1;for(var r=0;5>r;++r)e.p=e.p<<8|m(e.K)}
        function X(e){for(var r=e.length-1;r>=0;--r)e[r]=1024}
        function Y(e){var r,o,n,t,i="",s=e.length;for(r=0;s>r;++r)if(o=255&e[r],128&o)if(192==(224&o)){if(r+1>=e.length)return e;if(n=255&e[++r],128!=(192&n))return e;i+=String.fromCharCode((31&o)<<6&65535|63&n)}else{if(224!=(240&o))return e;if(r+2>=e.length)return e;if(n=255&e[++r],128!=(192&n))return e;if(t=255&e[++r],128!=(192&t))return e;i+=String.fromCharCode(65535&((15&o)<<12|(63&n)<<6|63&t))}else{if(!o)return e;i+=String.fromCharCode(65535&o)}return i}
        function er(e){return e[1]+e[0]}
        function rr(e,o,n){ function t(){ for(var e,m=0,a=(new Date).getTime();L(c.d.S);) if(++m%1e3==0&&(new Date).getTime()-a>200)return u&&(i=er(c.d.S.h.d)/d,n?n(i):void 0!==s&&r(i,s)),tr(t,0),0;u&&(n?n(1):void 0!==s&&r(1,s)),e=Y(_(c.d.Y)),o?o(e):void 0!==s&&pp({action:or,cbn:s,result:e})}var i,s,u,d,c={};"function"!=typeof o&&(s=o,o=n=0),c.d=g({},e),d=er(c.d.M),u=d>-1,n?n(u?0:-1):void 0!==s&&r(u?0:-1,s),tr(t,0)}var or=2,nr=3,tr="function"==typeof setImmediate?setImmediate:setTimeout,ir=4294967296,sr=[4294967295,-ir],ur=[0,0],dr=[1,0];
        //return "undefined"==typeof onmessage || "undefined"!=typeof window&&void 0!==window.document || !function(){onmessage=function(r){r&&r.W&&r.W.action==or&&e.decompress(r.W.W,r.W.cbn)}}(),{decompress:rr}
        return {decompress:rr}
    }();

    var urls = [];
    var callback = function(){};
    var results = {};
    var type = [];
    var msg;


    var extract = function () {};

    extract.init = function (Urls, Callback, Type, Msg) {

        msg = Msg || null;

        urls = Urls;
        if(Callback) callback = Callback;

        if(Type) type = Type;
        else {
            for(var i=0; i !== urls.length; i++){
                type[i] = 0;
            }
        }

        if(urls.length) this.load(urls[0], type[0]);

    };

    extract.load = function (Url, Type, Callback) {

        if(Callback) callback = Callback;
        var _this = this;
        var x = new XMLHttpRequest(); 
        x.overrideMimeType('text/plain; charset=x-user-defined'); 
        x.open('GET', Url, true);
        x.onload = function(){ _this.read( x.responseText, Url, Type, callback ); }
        x.send();

    };

    extract.read = function (r, fname, Type, Callback) {

        if(Callback) callback = Callback;
        var _this = this;
        var name = fname.substring(fname.lastIndexOf('/')+1, fname.indexOf('.'));
        var ar = new Uint8Array(r.length); 
         
        for (var i = 0, len = r.length; i < len; ++i){ ar[i] = r.charCodeAt(i) & 0xff; };

        e.decompress( 
            ar, 
            function on_complete(result) { _this.add( result, name, Type ); },
            function on_progress(percent) { if(msg)msg( 'decompress ' + name + '.z ' + (~~(percent*100))+'%' ); } 
        );

    };

    extract.add = function(result, name, Type){

        switch(Type){
            case 0:// for javascript root code
                var n = document.createElement("script");
                n.type = "text/javascript";
                n.charset = "utf-8";
                n.text = result;
                document.getElementsByTagName('head')[0].appendChild(n);
            break;
            case 1:// for worker injection
                var URL = window.URL || window.webkitURL;
                results[name] = URL.createObjectURL( new Blob([ result ], { type: 'application/javascript' }) );
            break;
            case 2:// only text 
                results[name] = result;
            break;
        }

        // load next 

        if(urls.length > 1){
            urls.shift();
            type.shift();
            this.load(urls[0], type[0]);
        } else {
            callback();
        }

    };

    extract.get = function(name){

        return results[name];
    
    };

    extract.clearBlob = function(name){

        var URL = window.URL || window.webkitURL;
        window.URL.revokeObjectURL(results[name]);
        results[name] = null;
        
    };


    return extract;

})();  