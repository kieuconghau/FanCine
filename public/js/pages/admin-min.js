"use strict";function _typeof(t){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}$(document).ready(function(){$("#sidebarCollapse").on("click",function(){$("#sidebar").toggleClass("active"),$(".sidebar2").toggleClass("active")})}),$("li").click(function(){$("li.active").removeClass("active"),$(this).addClass("active")}),function(t){var e={tagClass:function(t){return"badge badge-info"},focusClass:"focus",itemValue:function(t){return t?t.toString():t},itemText:function(t){return this.itemValue(t)},itemTitle:function(t){return null},freeInput:!0,addOnBlur:!0,maxTags:void 0,maxChars:void 0,confirmKeys:[13,44],delimiter:",",delimiterRegex:null,cancelConfirmKeysOnEmpty:!1,onTagExists:function(t,e){e.hide().fadeIn()},trimValue:!1,allowDuplicates:!1,triggerChange:!0,editOnBackspace:!1},n=t("<div />");function i(t){return t?n.text(t).html():""}function a(t,e){if("function"!=typeof t[e]){var n=t[e];t[e]=function(t){return t[n]}}}function o(t,e){if("function"!=typeof t[e]){var n=t[e];t[e]=function(){return n}}}function r(t){var e=0;if(document.selection){t.focus();var n=document.selection.createRange();n.moveStart("character",-t.value.length),e=n.text.length}else(t.selectionStart||"0"===t.selectionStart)&&(e=t.selectionStart);return e}function s(e,n){this.isInit=!0,this.itemsArray=[],this.$element=t(e),this.$element.addClass("sr-only"),this.isSelect="SELECT"===e.tagName,this.multiple=this.isSelect&&e.hasAttribute("multiple"),this.objectItems=n&&n.itemValue,this.placeholderText=e.hasAttribute("placeholder")?this.$element.attr("placeholder"):"",this.name=e.hasAttribute("name")?this.$element.attr("name"):"",this.type=e.hasAttribute("type")?this.$element.attr("type"):"text",this.inputSize=Math.max(1,this.placeholderText.length),this.$container=t('<div class="bootstrap-tagsinput"></div>'),this.$input=t('<input type="'.concat(this.type,'" name="').concat(this.name,'" placeholder="').concat(this.placeholderText,'"/>')).appendTo(this.$container),this.$element.before(this.$container),this.build(n),this.isInit=!1}s.prototype={constructor:s,add:function(e,n,a){var o=this;if(!(o.options.maxTags&&o.itemsArray.length>=o.options.maxTags)&&(!1===e||e)){if("string"==typeof e&&o.options.trimValue&&(e=t.trim(e)),"object"===_typeof(e)&&!o.objectItems)throw"Can't add objects when itemValue option is not set";if(!e.toString().match(/^\s*$/)){if(o.isSelect&&!o.multiple&&o.itemsArray.length>0&&o.remove(o.itemsArray[0]),"string"==typeof e&&"INPUT"===this.$element[0].tagName){var r=o.options.delimiterRegex?o.options.delimiterRegex:o.options.delimiter,s=e.split(r);if(s.length>1){for(var l=0;l<s.length;l++)this.add(s[l],!0);return void(n||o.pushVal(o.options.triggerChange))}}var c=o.options.itemValue(e),u=o.options.itemText(e),p=o.options.tagClass(e),h=o.options.itemTitle(e),m=t.grep(o.itemsArray,function(t){return o.options.itemValue(t)===c})[0];if(!m||o.options.allowDuplicates){if(!(o.items().toString().length+e.length+1>o.options.maxInputLength)){var f=t.Event("beforeItemAdd",{item:e,cancel:!1,options:a});if(o.$element.trigger(f),!f.cancel){o.itemsArray.push(e);var d=t('<span class="'.concat(i(p)).concat(null!==h?'" title="'.concat(h):"",'">').concat(i(u),'<span data-role="remove"></span></span>'));d.data("item",e),o.findInputWrapper().before(d);var g=t('option[value="'.concat(encodeURIComponent(c).replace(/"/g,'\\"'),'"]'),o.$element).length||t('option[value="'.concat(i(c).replace(/"/g,'\\"'),'"]'),o.$element).length;if(o.isSelect&&!g){var v=t("<option selected>".concat(i(u),"</option>"));v.data("item",e),v.attr("value",c),o.$element.append(v)}n||o.pushVal(o.options.triggerChange),o.options.maxTags!==o.itemsArray.length&&o.items().toString().length!==o.options.maxInputLength||o.$container.addClass("bootstrap-tagsinput-max"),t(".typeahead, .twitter-typeahead",o.$container).length&&o.$input.typeahead("val",""),this.isInit?o.$element.trigger(t.Event("itemAddedOnInit",{item:e,options:a})):o.$element.trigger(t.Event("itemAdded",{item:e,options:a}))}}}else if(o.options.onTagExists){var y=t(".badge",o.$container).filter(function(){return t(this).data("item")===m});o.options.onTagExists(e,y)}}}},remove:function(e,n,i){var a=this;if(a.objectItems&&(e=(e="object"===_typeof(e)?t.grep(a.itemsArray,function(t){return a.options.itemValue(t)===a.options.itemValue(e)}):t.grep(a.itemsArray,function(t){return a.options.itemValue(t)===e}))[e.length-1]),e){var o=t.Event("beforeItemRemove",{item:e,cancel:!1,options:i});if(a.$element.trigger(o),o.cancel)return;t(".badge",a.$container).filter(function(){return t(this).data("item")===e}).remove(),t("option",a.$element).filter(function(){return t(this).data("item")===e}).remove(),-1!==t.inArray(e,a.itemsArray)&&a.itemsArray.splice(t.inArray(e,a.itemsArray),1)}n||a.pushVal(a.options.triggerChange),a.options.maxTags>a.itemsArray.length&&a.$container.removeClass("bootstrap-tagsinput-max"),a.$element.trigger(t.Event("itemRemoved",{item:e,options:i}))},removeAll:function(){for(t(".badge",this.$container).remove(),t("option",this.$element).remove();this.itemsArray.length>0;)this.itemsArray.pop();this.pushVal(this.options.triggerChange)},refresh:function(){var e=this;t(".badge",e.$container).each(function(){var n=t(this),a=n.data("item"),o=e.options.itemValue(a),r=e.options.itemText(a),s=e.options.tagClass(a);(n.attr("class",null),n.addClass("badge ".concat(i(s))),n.contents().filter(function(){return 3===this.nodeType})[0].nodeValue=i(r),e.isSelect)&&t("option",e.$element).filter(function(){return t(this).data("item")===a}).attr("value",o)})},items:function(){return this.itemsArray},pushVal:function(){var e=this,n=t.map(e.items(),function(t){return e.options.itemValue(t).toString()});e.$element.val(n.join(e.options.delimiter)),e.options.triggerChange&&e.$element.trigger("change")},build:function(n){var i=this;if(i.options=t.extend({},e,n),i.objectItems&&(i.options.freeInput=!1),a(i.options,"itemValue"),a(i.options,"itemText"),o(i.options,"tagClass"),i.options.typeahead){var s=i.options.typeahead||{};o(s,"source"),i.$input.typeahead(t.extend({},s,{source:function(e,n){this.map={};var a=this.map;function o(t){for(var e=[],o=0;o<t.length;o++){var r=i.options.itemText(t[o]);a[r]=t[o],e.push(r)}n(e)}var r=s.source(e);t.isFunction(r.success)?r.success(o):t.isFunction(r.then)?r.then(o):t.when(r).then(o)},updater:function(t){return i.add(this.map[t]),this.map[t]},matcher:function(t){return-1!==t.toLowerCase().indexOf(this.query.trim().toLowerCase())},sorter:function(t){return t.sort()},highlighter:function(t){var e=new RegExp("(".concat(this.query,")"),"gi");return t.replace(e,"<strong>$1</strong>")}}))}if(i.options.typeaheadjs){var l=i.options.typeaheadjs;t.isArray(l)||(l=[null,l]),t.fn.typeahead.apply(i.$input,l).on("typeahead:selected",t.proxy(function(t,e,n){var a=0;l.some(function(t,e){return t.name===n&&(a=e,!0)}),l[a].valueKey?i.add(e[l[a].valueKey]):i.add(e),i.$input.typeahead("val","")},i))}i.$container.on("click",t.proxy(function(t){i.$element.attr("disabled")||i.$input.removeAttr("disabled"),i.$input.focus()},i)),i.options.addOnBlur&&i.options.freeInput&&i.$input.on("focusout",t.proxy(function(e){0===t(".typeahead, .twitter-typeahead",i.$container).length&&(i.add(i.$input.val()),i.$input.val(""))},i)),i.$container.on({focusin:function(){i.$container.addClass(i.options.focusClass)},focusout:function(){i.$container.removeClass(i.options.focusClass)}}),i.$container.on("keydown","input",t.proxy(function(e){var n=t(e.target),a=i.findInputWrapper();if(i.$element.attr("disabled"))i.$input.attr("disabled","disabled");else{switch(e.which){case 8:if(0===r(n[0])){var o=a.prev();o.length&&(!0===i.options.editOnBackspace&&n.val(o.data("item")),i.remove(o.data("item")))}break;case 46:if(0===r(n[0])){var s=a.next();s.length&&i.remove(s.data("item"))}break;case 37:var l=a.prev();0===n.val().length&&l[0]&&(l.before(a),n.focus());break;case 39:var c=a.next();0===n.val().length&&c[0]&&(c.after(a),n.focus())}var u=n.val().length,p=u+Math.ceil(u/5)+1;n.attr("size",Math.max(this.inputSize,p))}},i)),i.$container.on("keypress","input",t.proxy(function(e){var n=t(e.target);if(i.$element.attr("disabled"))i.$input.attr("disabled","disabled");else{var a,o,r,s=n.val(),l=i.options.maxChars&&s.length>=i.options.maxChars;i.options.freeInput&&(a=e,o=i.options.confirmKeys,r=!1,t.each(o,function(t,e){if("number"==typeof e&&a.which===e)return r=!0,!1;if(a.which===e.which){var n=!e.hasOwnProperty("altKey")||a.altKey===e.altKey,i=!e.hasOwnProperty("shiftKey")||a.shiftKey===e.shiftKey,o=!e.hasOwnProperty("ctrlKey")||a.ctrlKey===e.ctrlKey;if(n&&i&&o)return r=!0,!1}}),r||l)&&(0!==s.length&&(i.add(l?s.substr(0,i.options.maxChars):s),n.val("")),!1===i.options.cancelConfirmKeysOnEmpty&&e.preventDefault());var c=n.val().length,u=c+Math.ceil(c/5)+1;n.attr("size",Math.max(this.inputSize,u))}},i)),i.$container.on("click","[data-role=remove]",t.proxy(function(e){i.$element.attr("disabled")||i.remove(t(e.target).closest(".badge").data("item"))},i)),i.options.itemValue===e.itemValue&&("INPUT"===i.$element[0].tagName?i.add(i.$element.val()):t("option",i.$element).each(function(){i.add(t(this).attr("value"),!0)}))},destroy:function(){this.$container.off("keypress","input"),this.$container.off("click","[role=remove]"),this.$container.remove(),this.$element.removeData("tagsinput"),this.$element.show()},focus:function(){this.$input.focus()},input:function(){return this.$input},findInputWrapper:function(){for(var e=this.$input[0],n=this.$container[0];e&&e.parentNode!==n;)e=e.parentNode;return t(e)}},t.fn.tagsinput=function(e,n,i){var a=[];return this.each(function(){var o=t(this).data("tagsinput");if(o)if(e||n){if(void 0!==o[e]){var r;void 0!==(r=3===o[e].length&&void 0!==i?o[e](n,null,i):o[e](n))&&a.push(r)}}else a.push(o);else o=new s(this,e),t(this).data("tagsinput",o),a.push(o),"SELECT"===this.tagName&&t("option",t(this)).attr("selected","selected"),t(this).val(t(this).val())}),"string"==typeof e?a.length>1?a:a[0]:a},t.fn.tagsinput.Constructor=s,t(function(){t("input[data-role=tagsinput], select[multiple][data-role=tagsinput]").tagsinput()})}(window.jQuery);