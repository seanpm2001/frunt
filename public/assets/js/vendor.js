/*
 jquery.exists 1.0.4 Copyright (c) 2014 "Richard KnG" Richárd Szakács
 Licensed under the MIT license.
 see: https://github.com/richard-kng/jquery-exists for details
*/
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module depending on jQuery.
        define(["jquery"], factory);
    } else {
        // No AMD. Register plugin with global jQuery object.
        factory(jQuery);
    }
}(function ($) {
    "use strict";

    var win = $(window)[0],
        doc = $(document)[0],
        html = $("html")[0];

    /**
     * Returns whether the element exists.
     * @param {string} [parent] - A string containing a selector expression to match elements against.
     * @returns {boolean}
     */
    $.fn.exists = function(parent) {

        var element,
            elementAtZero,
            elementIndex = this.length,
            elementExists = false;

        parent = typeof parent === "string" ? parent : "html";

        // This solution below is better, more defensive, than just check for .length, also more flexible
        while(elementIndex--) {
            element = this.eq(elementIndex); // get the jQuery object
            elementAtZero = element[0];      // get the raw element to check against document/window/html

            if(elementAtZero !== doc && elementAtZero !== win && elementAtZero !== html) {
                if(element.parents(parent).length > 0) {
                    elementExists = true;
                } else {
                    elementExists = false;
                    break;
                }
            } else { // elementAtZero is strictly equal to document/window or html
                elementExists = true;
            }
        }
        return elementExists;
    };
}));
/*!
 * # Semantic UI 2.0.3 - Sticky
 * http://github.com/semantic-org/semantic-ui/
 *
 *
 * Copyright 2015 Contributors
 * Released under the MIT license
 * http://opensource.org/licenses/MIT
 *
 */
!function(e,t,o,n){"use strict";e.fn.sticky=function(o){var i,s=e(this),r=s.selector||"",c=(new Date).getTime(),l=[],a=arguments[0],m="string"==typeof a,f=[].slice.call(arguments,1);return s.each(function(){var s,u,d,h,g=e.isPlainObject(o)?e.extend(!0,{},e.fn.sticky.settings,o):e.extend({},e.fn.sticky.settings),b=g.className,p=g.namespace,v=g.error,x="."+p,C="module-"+p,S=e(this),y=e(t),k=e(g.scrollContext),w=(S.selector||"",S.data(C)),T=t.requestAnimationFrame||t.mozRequestAnimationFrame||t.webkitRequestAnimationFrame||t.msRequestAnimationFrame||function(e){setTimeout(e,0)},z=this;h={initialize:function(){h.determineContainer(),h.determineContext(),h.verbose("Initializing sticky",g,s),h.save.positions(),h.checkErrors(),h.bind.events(),g.observeChanges&&h.observeChanges(),h.instantiate()},instantiate:function(){h.verbose("Storing instance of module",h),w=h,S.data(C,h)},destroy:function(){h.verbose("Destroying previous instance"),h.reset(),d&&d.disconnect(),y.off("load"+x,h.event.load).off("resize"+x,h.event.resize),k.off("scrollchange"+x,h.event.scrollchange),S.removeData(C)},observeChanges:function(){var e=u[0];"MutationObserver"in t&&(d=new MutationObserver(function(e){clearTimeout(h.timer),h.timer=setTimeout(function(){h.verbose("DOM tree modified, updating sticky menu",e),h.refresh()},100)}),d.observe(z,{childList:!0,subtree:!0}),d.observe(e,{childList:!0,subtree:!0}),h.debug("Setting up mutation observer",d))},determineContainer:function(){s=S.offsetParent()},determineContext:function(){return u=g.context?e(g.context):s,0===u.length?void h.error(v.invalidContext,g.context,S):void 0},checkErrors:function(){return h.is.hidden()&&h.error(v.visible,S),h.cache.element.height>h.cache.context.height?(h.reset(),void h.error(v.elementSize,S)):void 0},bind:{events:function(){y.on("load"+x,h.event.load).on("resize"+x,h.event.resize),k.off("scroll"+x).on("scroll"+x,h.event.scroll).on("scrollchange"+x,h.event.scrollchange)}},event:{load:function(){h.verbose("Page contents finished loading"),T(h.refresh)},resize:function(){h.verbose("Window resized"),T(h.refresh)},scroll:function(){T(function(){k.triggerHandler("scrollchange"+x,k.scrollTop())})},scrollchange:function(e,t){h.stick(t),g.onScroll.call(z)}},refresh:function(e){h.reset(),g.context||h.determineContext(),e&&h.determineContainer(),h.save.positions(),h.stick(),g.onReposition.call(z)},supports:{sticky:function(){{var t=e("<div/>");t[0]}return t.addClass(b.supported),t.css("position").match("sticky")}},save:{lastScroll:function(e){h.lastScroll=e},elementScroll:function(e){h.elementScroll=e},positions:function(){{var e={height:y.height()},t={margin:{top:parseInt(S.css("margin-top"),10),bottom:parseInt(S.css("margin-bottom"),10)},offset:S.offset(),width:S.outerWidth(),height:S.outerHeight()},o={offset:u.offset(),height:u.outerHeight(),bottomPadding:parseInt(u.css("padding-bottom"),10)};({height:s.outerHeight()})}h.cache={fits:t.height<e.height,window:{height:e.height},element:{margin:t.margin,top:t.offset.top-t.margin.top,left:t.offset.left,width:t.width,height:t.height,bottom:t.offset.top+t.height},context:{top:o.offset.top,height:o.height,bottomPadding:o.bottomPadding,bottom:o.offset.top+o.height-o.bottomPadding}},h.set.containerSize(),h.set.size(),h.stick(),h.debug("Caching element positions",h.cache)}},get:{direction:function(e){var t="down";return e=e||k.scrollTop(),h.lastScroll!==n&&(h.lastScroll<e?t="down":h.lastScroll>e&&(t="up")),t},scrollChange:function(e){return e=e||k.scrollTop(),h.lastScroll?e-h.lastScroll:0},currentElementScroll:function(){return h.elementScroll?h.elementScroll:h.is.top()?Math.abs(parseInt(S.css("top"),10))||0:Math.abs(parseInt(S.css("bottom"),10))||0},elementScroll:function(e){e=e||k.scrollTop();var t=h.cache.element,o=h.cache.window,n=h.get.scrollChange(e),i=t.height-o.height+g.offset,s=h.get.currentElementScroll(),r=s+n;return s=h.cache.fits||0>r?0:r>i?i:r}},remove:{lastScroll:function(){delete h.lastScroll},elementScroll:function(e){delete h.elementScroll},offset:function(){S.css("margin-top","")}},set:{offset:function(){h.verbose("Setting offset on element",g.offset),S.css("margin-top",g.offset)},containerSize:function(){var e=s.get(0).tagName;"HTML"===e||"body"==e?h.determineContainer():Math.abs(s.outerHeight()-h.cache.context.height)>g.jitter&&(h.debug("Context has padding, specifying exact height for container",h.cache.context.height),s.css({height:h.cache.context.height}))},minimumSize:function(){var e=h.cache.element;s.css("min-height",e.height)},scroll:function(e){h.debug("Setting scroll on element",e),h.elementScroll!=e&&(h.is.top()&&S.css("bottom","").css("top",-e),h.is.bottom()&&S.css("top","").css("bottom",e))},size:function(){0!==h.cache.element.height&&0!==h.cache.element.width&&S.css({width:h.cache.element.width,height:h.cache.element.height})}},is:{top:function(){return S.hasClass(b.top)},bottom:function(){return S.hasClass(b.bottom)},initialPosition:function(){return!h.is.fixed()&&!h.is.bound()},hidden:function(){return!S.is(":visible")},bound:function(){return S.hasClass(b.bound)},fixed:function(){return S.hasClass(b.fixed)}},stick:function(e){var t=e||k.scrollTop(),o=h.cache,n=o.fits,i=o.element,s=o.window,r=o.context,c=h.is.bottom()&&g.pushing?g.bottomOffset:g.offset,e={top:t+c,bottom:t+c+s.height},l=(h.get.direction(e.top),n?0:h.get.elementScroll(e.top)),a=!n,m=0!==i.height;m&&(h.is.initialPosition()?e.top>r.bottom?(h.debug("Element bottom of container"),h.bindBottom()):e.top>i.top&&(h.debug("Element passed, fixing element to page"),h.fixTop()):h.is.fixed()?h.is.top()?e.top<i.top?(h.debug("Fixed element reached top of container"),h.setInitialPosition()):i.height+e.top-l>r.bottom?(h.debug("Fixed element reached bottom of container"),h.bindBottom()):a&&h.set.scroll(l):h.is.bottom()&&(e.bottom-i.height<i.top?(h.debug("Bottom fixed rail has reached top of container"),h.setInitialPosition()):e.bottom>r.bottom?(h.debug("Bottom fixed rail has reached bottom of container"),h.bindBottom()):a&&h.set.scroll(l)):h.is.bottom()&&(g.pushing?h.is.bound()&&e.bottom<r.bottom&&(h.debug("Fixing bottom attached element to bottom of browser."),h.fixBottom()):h.is.bound()&&e.top<r.bottom-i.height&&(h.debug("Fixing bottom attached element to top of browser."),h.fixTop()))),h.save.lastScroll(e.top),h.save.elementScroll(l)},bindTop:function(){h.debug("Binding element to top of parent container"),h.remove.offset(),S.css({left:"",top:"",marginBottom:""}).removeClass(b.fixed).removeClass(b.bottom).addClass(b.bound).addClass(b.top),g.onTop.call(z),g.onUnstick.call(z)},bindBottom:function(){h.debug("Binding element to bottom of parent container"),h.remove.offset(),S.css({left:"",top:"",marginBottom:h.cache.context.bottomPadding}).removeClass(b.fixed).removeClass(b.top).addClass(b.bound).addClass(b.bottom),g.onBottom.call(z),g.onUnstick.call(z)},setInitialPosition:function(){h.unfix(),h.unbind()},fixTop:function(){h.debug("Fixing element to top of page"),h.set.minimumSize(),h.set.offset(),S.css({left:h.cache.element.left,bottom:"",marginBottom:""}).removeClass(b.bound).removeClass(b.bottom).addClass(b.fixed).addClass(b.top),g.onStick.call(z)},fixBottom:function(){h.debug("Sticking element to bottom of page"),h.set.minimumSize(),h.set.offset(),S.css({left:h.cache.element.left,bottom:"",marginBottom:""}).removeClass(b.bound).removeClass(b.top).addClass(b.fixed).addClass(b.bottom),g.onStick.call(z)},unbind:function(){h.debug("Removing absolute position on element"),h.remove.offset(),S.removeClass(b.bound).removeClass(b.top).removeClass(b.bottom)},unfix:function(){h.debug("Removing fixed position on element"),h.remove.offset(),S.removeClass(b.fixed).removeClass(b.top).removeClass(b.bottom),g.onUnstick.call(z)},reset:function(){h.debug("Reseting elements position"),h.unbind(),h.unfix(),h.resetCSS(),h.remove.offset(),h.remove.lastScroll()},resetCSS:function(){S.css({width:"",height:""}),s.css({height:""})},setting:function(t,o){if(e.isPlainObject(t))e.extend(!0,g,t);else{if(o===n)return g[t];g[t]=o}},internal:function(t,o){if(e.isPlainObject(t))e.extend(!0,h,t);else{if(o===n)return h[t];h[t]=o}},debug:function(){g.debug&&(g.performance?h.performance.log(arguments):(h.debug=Function.prototype.bind.call(console.info,console,g.name+":"),h.debug.apply(console,arguments)))},verbose:function(){g.verbose&&g.debug&&(g.performance?h.performance.log(arguments):(h.verbose=Function.prototype.bind.call(console.info,console,g.name+":"),h.verbose.apply(console,arguments)))},error:function(){h.error=Function.prototype.bind.call(console.error,console,g.name+":"),h.error.apply(console,arguments)},performance:{log:function(e){var t,o,n;g.performance&&(t=(new Date).getTime(),n=c||t,o=t-n,c=t,l.push({Name:e[0],Arguments:[].slice.call(e,1)||"",Element:z,"Execution Time":o})),clearTimeout(h.performance.timer),h.performance.timer=setTimeout(h.performance.display,0)},display:function(){var t=g.name+":",o=0;c=!1,clearTimeout(h.performance.timer),e.each(l,function(e,t){o+=t["Execution Time"]}),t+=" "+o+"ms",r&&(t+=" '"+r+"'"),(console.group!==n||console.table!==n)&&l.length>0&&(console.groupCollapsed(t),console.table?console.table(l):e.each(l,function(e,t){console.log(t.Name+": "+t["Execution Time"]+"ms")}),console.groupEnd()),l=[]}},invoke:function(t,o,s){var r,c,l,a=w;return o=o||f,s=z||s,"string"==typeof t&&a!==n&&(t=t.split(/[\. ]/),r=t.length-1,e.each(t,function(o,i){var s=o!=r?i+t[o+1].charAt(0).toUpperCase()+t[o+1].slice(1):t;if(e.isPlainObject(a[s])&&o!=r)a=a[s];else{if(a[s]!==n)return c=a[s],!1;if(!e.isPlainObject(a[i])||o==r)return a[i]!==n?(c=a[i],!1):!1;a=a[i]}})),e.isFunction(c)?l=c.apply(s,o):c!==n&&(l=c),e.isArray(i)?i.push(l):i!==n?i=[i,l]:l!==n&&(i=l),c}},m?(w===n&&h.initialize(),h.invoke(a)):(w!==n&&w.invoke("destroy"),h.initialize())}),i!==n?i:this},e.fn.sticky.settings={name:"Sticky",namespace:"sticky",debug:!1,verbose:!0,performance:!0,pushing:!1,context:!1,scrollContext:t,offset:0,bottomOffset:0,jitter:5,observeChanges:!1,onReposition:function(){},onScroll:function(){},onStick:function(){},onUnstick:function(){},onTop:function(){},onBottom:function(){},error:{container:"Sticky element must be inside a relative container",visible:"Element is hidden, you must call refresh after element becomes visible",method:"The method you called is not defined.",invalidContext:"Context specified does not exist",elementSize:"Sticky element is larger than its container, cannot create sticky."},className:{bound:"bound",fixed:"fixed",supported:"native",top:"top",bottom:"bottom"}}}(jQuery,window,document);
//# sourceMappingURL=vendor.js.map