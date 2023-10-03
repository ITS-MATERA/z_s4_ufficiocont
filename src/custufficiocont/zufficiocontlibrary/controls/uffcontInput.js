sap.ui.define(['jquery.sap.global',
    "sap/ui/model/json/JSONModel",
		'./../library',
		"sap/m/Input",
		"sap/ui/model/Filter",
		"sap/ui/model/FilterOperator",
		"sap/ui/layout/form/SimpleForm",
		"sap/ui/model/resource/ResourceModel",
    'sap/ui/core/Fragment'
	],
	function(jQuery, JSONModel,library, Input, Filter, FilterOperator, SimpleForm, ResourceModel, Fragment) {
		"use strict";

    const MODEL_ENTITY = "EntityModel";
    var oInputUffCont = Input.extend("custufficiocont.zufficiocontlibrary.controls.uffcontInput", {
			metadata: {
				library: "custufficiocont.zufficiocontlibrary",
				properties: {
					placeholder: {
						type: "string",
						defaultValue: ""
					},
          
          value:{ type: "string", defaultValue:"" },
          key:{ type: "string", defaultValue:"" },
          showValueHelp:{ type:"string", defaultValue:"true" }
				},
				aggregations: {},
				events: {},
				renderer: {
					writeInnerAttributes: function(oRm, oInput) {
						sap.m.InputRenderer.writeInnerAttributes.apply(this, arguments);
					}
				}
			},

      init: function() {
        var self=this;
				// this.bRendering = false;
				Input.prototype.init.call(this);  
        // self.attachValueHelpRequest(self._libOnShowDialog);  
        // self.attachSubmit(self._libOnSubmitNumero);  
			},

     
			renderer: function(oRm, oInput) {
				sap.m.InputRenderer.render(oRm, oInput);
			},

      onAfterRendering: function() {
        var self =this;
      }

  });   

  return oInputZnumero;
});