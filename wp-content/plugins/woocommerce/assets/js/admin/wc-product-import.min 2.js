!function(t,p){var i=function(t){this.$form=t,this.xhr=!1,this.mapping=wc_product_import_params.mapping,this.position=0,this.file=wc_product_import_params.file,this.update_existing=wc_product_import_params.update_existing,this.delimiter=wc_product_import_params.delimiter,this.security=wc_product_import_params.import_nonce,this.imported=0,this.failed=0,this.updated=0,this.skipped=0,this.$form.find(".woocommerce-importer-progress").val(0),this.run_import=this.run_import.bind(this),this.run_import()};i.prototype.run_import=function(){var i=this;t.ajax({type:"POST",url:ajaxurl,data:{action:"woocommerce_do_ajax_product_import",position:i.position,mapping:i.mapping,file:i.file,update_existing:i.update_existing,delimiter:i.delimiter,security:i.security},dataType:"json",success:function(t){t.success&&(i.position=t.data.position,i.imported+=t.data.imported,i.failed+=t.data.failed,i.updated+=t.data.updated,i.skipped+=t.data.skipped,i.$form.find(".woocommerce-importer-progress").val(t.data.percentage),"done"===t.data.position?p.location=t.data.url+"&products-imported="+parseInt(i.imported,10)+"&products-failed="+parseInt(i.failed,10)+"&products-updated="+parseInt(i.updated,10)+"&products-skipped="+parseInt(i.skipped,10):i.run_import())}}).fail(function(t){p.console.log(t)})},t.fn.wc_product_importer=function(){return new i(this),this},t(".woocommerce-importer").wc_product_importer()}(jQuery,window);