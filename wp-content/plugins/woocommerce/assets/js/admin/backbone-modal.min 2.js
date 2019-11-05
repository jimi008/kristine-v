!function(o,e,n){"use strict";o.fn.WCBackboneModal=function(e){return this.each(function(){new o.WCBackboneModal(o(this),e)})},o.WCBackboneModal=function(e,t){var n=o.extend({},o.WCBackboneModal.defaultOptions,t);n.template&&new o.WCBackboneModal.View({target:n.template,string:n.variable})},o.WCBackboneModal.defaultOptions={template:"",variable:{}},o.WCBackboneModal.View=e.View.extend({tagName:"div",id:"wc-backbone-modal-dialog",_target:undefined,_string:undefined,events:{"click .modal-close":"closeButton","click #btn-ok":"addButton","touchstart #btn-ok":"addButton",keydown:"keyboardActions"},resizeContent:function(){var e=o(".wc-backbone-modal-content").find("article"),t=.75*o(window).height();e.css({"max-height":t+"px"})},initialize:function(e){var t=this;this._target=e.target,this._string=e.string,n.bindAll(this,"render"),this.render(),o(window).resize(function(){t.resizeContent()})},render:function(){var e=wp.template(this._target);this.$el.append(e(this._string)),o(document.body).css({overflow:"hidden"}).append(this.$el),this.resizeContent(),this.$(".wc-backbone-modal-content").attr("tabindex","0").focus(),o(document.body).trigger("init_tooltips"),o(document.body).trigger("wc_backbone_modal_loaded",this._target)},closeButton:function(e){e.preventDefault(),o(document.body).trigger("wc_backbone_modal_before_remove",this._target),this.undelegateEvents(),o(document).off("focusin"),o(document.body).css({overflow:"auto"}),this.remove(),o(document.body).trigger("wc_backbone_modal_removed",this._target)},addButton:function(e){o(document.body).trigger("wc_backbone_modal_response",[this._target,this.getFormData()]),this.closeButton(e)},getFormData:function(){var n={};return o(document.body).trigger("wc_backbone_modal_before_update",this._target),o.each(o("form",this.$el).serializeArray(),function(e,t){-1!==t.name.indexOf("[]")?(t.name=t.name.replace("[]",""),n[t.name]=o.makeArray(n[t.name]),n[t.name].push(t.value)):n[t.name]=t.value}),n},keyboardActions:function(e){var t=e.keyCode||e.which;13!==t||e.target.tagName&&("input"===e.target.tagName.toLowerCase()||"textarea"===e.target.tagName.toLowerCase())||this.addButton(e),27===t&&this.closeButton(e)}})}(jQuery,Backbone,_);