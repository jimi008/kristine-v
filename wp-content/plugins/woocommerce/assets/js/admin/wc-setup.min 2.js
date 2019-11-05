jQuery(function(a){function i(){a(".wc-setup-content").block({message:null,overlayCSS:{background:"#fff",opacity:.6}})}function t(){a("form.activate-jetpack").submit()}function s(){wp.ajax.post("setup_wizard_check_jetpack").then(function(e){if(!e||!e.is_active||"yes"===e.is_active)return t();setTimeout(s,3e3)}).fail(function(){t()})}function c(e,i,t){var s=i.data("plugins");for(var c in Array.isArray(s)?s:[]){var n=s[c].slug;e[n]=e[n]||a('<span class="plugin-install-info-list-item">').append('<a href="https://wordpress.org/plugins/'+n+'/" target="_blank">'+s[c].name+"</a>"),e[n].find("a").on("mouseenter mouseleave",function(e,i){e.toggleClass("plugin-install-source","mouseenter"===i.type)}.bind(null,t?i.closest(t):i))}}function e(){var i={},t=[];a(".wc-wizard-service-enable input:checked").each(function(){c(i,a(this),".wc-wizard-service-item");var e=a(this).closest(".wc-wizard-service-item");e.find("input.payment-checkbox-input:checked").each(function(){t.push(a(this).attr("id")),c(i,a(this),".wc-wizard-service-settings")}),e.find(".wc-wizard-shipping-method-select .method").each(function(){var e=a(this);"live_rates"===e.val()&&c(i,e,".wc-wizard-service-item")})}),a(".recommended-item input:checked").each(function(){c(i,a(this),".recommended-item")});var e=a("span.plugin-install-info-list").empty();for(var s in i)e.append(i[s]);t&&wc_setup_params.current_step&&wc_setup_params.i18n.extra_plugins[wc_setup_params.current_step]&&wc_setup_params.i18n.extra_plugins[wc_setup_params.current_step][t.join(",")]&&e.append(wc_setup_params.i18n.extra_plugins[wc_setup_params.current_step][t.join(",")]),a("span.plugin-install-info").toggle(0<e.children().length)}a(".button-next").on("click",function(){var e=a(this).parents("form").get(0);return("function"!=typeof e.checkValidity||e.checkValidity())&&i(),!0}),a("#store_country").on("change",function(){if(null!==wc_setup_params.states){var e=a(this).val(),i=a("#store_state");if(a.isEmptyObject(wc_setup_params.states[e]))a(".store-state-container").hide(),i.empty().val("").change().prop("required",!1);else{var t=wc_setup_params.states[e];i.empty(),a.each(t,function(e){i.append(a('<option value="'+e+'">'+t[e]+"</option>"))}),a(".store-state-container").show(),i.selectWoo().val(wc_base_state).change().prop("required",!0)}a("#currency_code").val(wc_setup_currencies[e]).change()}}),a("#store_country").change(),a(".wc-wizard-services").on("change",".wc-wizard-service-enable input",function(){a(this).is(":checked")?(a(this).closest(".wc-wizard-service-toggle").removeClass("disabled"),a(this).closest(".wc-wizard-service-item").addClass("checked"),a(this).closest(".wc-wizard-service-item").find(".wc-wizard-service-settings").removeClass("hide")):(a(this).closest(".wc-wizard-service-toggle").addClass("disabled"),a(this).closest(".wc-wizard-service-item").removeClass("checked"),a(this).closest(".wc-wizard-service-item").find(".wc-wizard-service-settings").addClass("hide"))}),a(".wc-wizard-services").on("keyup",function(e){var i=e.keyCode||e.which,t=a(document.activeElement);!t.is(".wc-wizard-service-toggle, .wc-wizard-service-enable")||13!==i&&32!==i||t.find(":input").click()}),a(".wc-wizard-services").on("click",".wc-wizard-service-enable",function(e){if(a(e.target).is("input"))e.stopPropagation();else{var i=a(this).find('input[type="checkbox"]');i.prop("checked",!i.prop("checked")).change()}}),a(".wc-wizard-services-list-toggle").on("click",function(){a(this).closest(".wc-wizard-services-list-toggle").toggleClass("closed"),a(this).closest(".wc-wizard-services").find(".wc-wizard-service-item").slideToggle().css("display","flex")}),a(".wc-wizard-services").on("change",".wc-wizard-shipping-method-select .method",function(e){var i=a(this).closest(".wc-wizard-service-description"),t=e.target.value,s=i.find(".shipping-method-descriptions");s.find(".shipping-method-description").addClass("hide"),s.find("."+t).removeClass("hide");var c=i.parent().find('input[type="checkbox"]'),n=i.find(".shipping-method-settings");n.find(".shipping-method-setting").addClass("hide").find(".shipping-method-required-field").prop("required",!1),n.find("."+t).removeClass("hide").find(".shipping-method-required-field").prop("required",c.prop("checked"))}).find(".wc-wizard-shipping-method-select .method").change(),a(".wc-wizard-services").on("change",".wc-wizard-shipping-method-enable",function(){var e=a(this).is(":checked"),i=a(".wc-wizard-shipping-method-select .method").val();a(this).closest(".wc-wizard-service-item").find("."+i).find(".shipping-method-required-field").prop("required",e)}),a(".activate-jetpack").on("click",".button-primary",function(e){if(i(),"no"===wc_setup_params.pending_jetpack_install)return!0;e.preventDefault(),s()}),a(".wc-wizard-services").on("change","input#stripe_create_account, input#ppec_paypal_reroute_requests",function(){a(this).is(":checked")?a(this).closest(".wc-wizard-service-settings").find("input.payment-email-input").attr("type","email").prop("disabled",!1).prop("required",!0):a(this).closest(".wc-wizard-service-settings").find("input.payment-email-input").attr("type",null).prop("disabled",!0).prop("required",!1)}).find("input#stripe_create_account, input#ppec_paypal_reroute_requests").change(),e(),a(".wc-setup-content").on("change","[data-plugins]",e),a(document.body).on("init_tooltips",function(){a(".help_tip").tipTip({attribute:"data-tip",fadeIn:50,fadeOut:50,delay:200,defaultPosition:"top"})}).trigger("init_tooltips")});