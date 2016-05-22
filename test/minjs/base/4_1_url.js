/*! kahn1990_new_book 2016-05-22 */
_k.urlParse=function(a){return new URL(a)},_k.urlToAbsolute=function(a){var b=document.createElement("a");return b.href=a,b.href},_k.urlEncodeObject=function(a){var b="",c=0;return _k.forEach(a||{},function(a,d){void 0!==d&&(c++&&(b+="&"),b+=encodeURIComponent(a),b+="=",b+=encodeURIComponent(d))}),b},_k.parsePairString=function(a,b,c,d){_k.forEach(a.split(b),function(a){var b=a.split(c);d(b[0],b[1])})},_k.concatArg=function(a,b){a=_k.urlParse(a);var c=_k.urlEncodeObject(_k.extend(a.arg,b));return a.origin+a.pathname+(c?"?":"")+c+a.hash},_k.removeArg=function(a,b){a=_k.urlParse(a);var c=_k.urlEncodeObject(_k.exclude(a.arg,b));return a.origin+a.pathname+(c?"?":"")+c+a.hash},_k.URL=function(a){var b=/(?:((?:[^:\/]*):)\/\/)?([^:\/?#]*)(?::([0-9]*))?(\/[^?#]*)?(\?[^#]*)?(#.*)?/;b.test(a)&&(this.protocol=RegExp.$1,this.hostname=RegExp.$2,this.port=RegExp.$3,this.pathname=RegExp.$4,this.search=RegExp.$5,this.hash=RegExp.$6)},URL.prototype.inspect=URL.prototype.valueOf=URL.prototype.toString=URL.prototype.toJSON=function(){return this.href},Object.defineProperties(URL.prototype,{href:{get:function(){return this.origin+this.pathname+this.search+this.hash}},host:{get:function(){return this.hostname+(this.port?":"+this.port:"")}},origin:{get:function(){return this.protocol?this.protocol+"//"+this.host:this.host}},arg:{get:function(){var a={};return _k.parsePairString(this.search.substring(1),"&","=",function(b,c){""!==b&&(a[b]=decodeURIComponent(c))}),a}}}),_k.checkUrl=function(a){var b="^((https|http|ftp|rtsp|mms)?://)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((/?)|(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$",c=new RegExp(b);return c.test(a)},_k.request=function(a,b){if(!a.method||!/POST|PUT|PATCH|DELETE|GET/gi.test(a.method))throw new Error("method error");if(!a.url&&!_k.checkUrl(a.url))throw new Error("url error");null!=a.data||"create"!==a.method&&"update"!==a.method&&"patch"!==a.method||_k.isObject(a.data)&&(a.data=JSON.stringify(a.data));var c=new XMLHttpRequest;if(c.onload=function(){b&&b(null,c)},c.onerror=function(a){b&&b(a,c)},c.open(a.method,a.url,!0),a.emulateJSON?(c.setRequestHeader("contentType","application/x-www-form-urlencoded"),a.data=a.data||{}):c.setRequestHeader("contentType","application/json"),"PUT"===a.method||"DELETE"===a.method||"PATCH"===a.method){a.method="POST";var d=a.beforeSend;a.beforeSend=function(b){return b.setRequestHeader("X-HTTP-Method-Override",a.method),d?d.apply(this,arguments):void 0}}return a.setHeader&&_k.forEach(a.setHeader,function(a,b){c.setRequestHeader(a,b)}),a.responseType&&(c.responseType=a.responseType),c.send(a.data||null),c};