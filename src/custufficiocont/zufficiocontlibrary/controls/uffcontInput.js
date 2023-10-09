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

		const MODEL_UFFCONT_ENTITY = "EntityModelUffCont";
		var uffcontInput = Input.extend("custufficiocont.zufficiocontlibrary.controls.uffcontInput", {
			metadata: {
				library: "custufficiocont.zufficiocontlibrary",
				properties: {
					placeholder: { type: "string", defaultValue: "Inserisci Ufficio Contabile" },
					value:{ type: "string", defaultValue:"" },
					key:{ type: "string", defaultValue:"" },
          valueOutDescription:{ type: "string", defaultValue:"" },
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
				self.attachValueHelpRequest(self._libOnShowDialogUffCont);  
				self.attachSubmit(self._libOnSubmitUffCont);  
			},

			renderer: function(oRm, oInput) {
				sap.m.InputRenderer.render(oRm, oInput);
			},

			onAfterRendering: function() {
			var self =this;
			},

			_libOnSubmitUffCont:function(oEvent){
				var self = this;
				if(!self.getValue() || self.getValue() === null || self.getValue() === ""){
					self.setValue(null);
					self.setKey(null);
          self.setValueOutDescription(null);
				}
        else{
          //è valorizzato, quindi controlliamo se esiste.
          var filters= [];
          filters.push(new Filter({path: "ZufficioCont", operator: FilterOperator.EQ, value1: self.getValue() }));

          self._globalModelHelperHelper = new sap.ui.model.odata.v2.ODataModel({
            serviceUrl: "/sap/opu/odata/sap/ZSS4_MATCHCODE_SRV/"
          });

          var oDataModel = self._globalModelHelperHelper;
          self._globalModelHelperHelper.metadataLoaded().then(function() {
            oDataModel.read("/ZhfUffcontSet" , {
              filters: filters,
              success:function(data, oResponse){
                // console.log(data);//TODO:da canc
                if(data.results.length>0){
                  self.setKey(data.results[0].ZufficioCont);
                  self.setValue(data.results[0].ZufficioCont);
                  self.setValueOutDescription(data.results[0].ZvimDescrufficio);
                }else{
                  self.setKey(self.getValue());
                  self.setValue(self.getValue());
                  self.setValueOutDescription(null);
                }
              },
              error:function(error){
                self.setKey(null);
                self.setValue(null);
                self.setValueOutDescription(null);
                console.log(error);
              }
            });
          });
        }
			},

			_libOnShowDialogUffCont:function(oEvent){
				var self = this;
				var oModelJson = new JSONModel({
					ZufficioCont: null,
          ZvimDescrufficio:null,
					UfficioContResults: [],
          PanelFilterVisible: true,
          PanelResultVisible: false
				});
        
				self._libGetViewId(self,function(callback) {
					if(!self._libUffContDialog){
						self._libUffContDialog = Fragment.load({
							id: callback.Id,
							name: "custufficiocont.zufficiocontlibrary.dialog",
							controller: self
						}).then(function(oDialog){
							return oDialog;
						}.bind(this));
					}
					self._libUffContDialog.then(function(oDialog){
						oDialog.setModel(oModelJson, MODEL_UFFCONT_ENTITY);
						oDialog.open();
					});
				});
			},

			_libOnCloseUffContDialog:function(oEvent){
				var self = this;
				self._libUffContDialog.then(function(oDialog){
					oDialog.close();
					oDialog.destroy();
					self._libUffContDialog = null;
				});
			},

      _libOnBackUffContDialog:function(oEvent){
        var entity = oEvent.getSource().getParent().getModel(MODEL_UFFCONT_ENTITY);
        entity.setProperty("/UfficioContResults", []);
        entity.setProperty("/PanelFilterVisible", true);
        entity.setProperty("/PanelResultVisible", false);
      },

			_libOnConfirmUffContDialog:function(oEvent){
				var self = this;
				self._libGetViewId(self,function(callback) {
					var oView = callback.oView;
					var table = oView.byId("_libTableUffCont");
					var selectedItem = table.getSelectedItem();
          
          if(selectedItem){
            var key = selectedItem.data("ZuffCont");
            var text = selectedItem.data("ZuffCont");
            var outDescr = selectedItem.data("ZvimDescrufficio");          

            self.setKey(key);
            self.setValue(text);
            self.setValueOutDescription(outDescr);
          }
          else{
            self.setKey(null); 
            self.setValue(null);
            self.setValueOutDescription(null);
          }

					if(self._libUffContDialog){
						self._libUffContDialog.then(function(oDialog){
							oDialog.close();
							oDialog.destroy();
							self._libUffContDialog = null;
						});
					}
				});
			},

			_libOnSearchUffContDialog:function(oEvent){
				var self = this,
				filters = [],
				entity = oEvent.getSource().getParent().getModel(MODEL_UFFCONT_ENTITY),
				model = oEvent.getSource().getParent().getModel(MODEL_UFFCONT_ENTITY).getData();

				self._globalModelHelperHelper = new sap.ui.model.odata.v2.ODataModel({
					serviceUrl: "/sap/opu/odata/sap/ZSS4_MATCHCODE_SRV/"
				});

				if(model.ZufficioCont && model.ZufficioCont !== "")
					filters.push(new Filter({path: "ZufficioCont", operator: FilterOperator.Contains, value1: model.ZufficioCont }));

				var oDataModel = self._globalModelHelperHelper;

				if(self._libUffContDialog){
					self._libUffContDialog.then(function(oDialog){
						oDialog.setBusy(true);
						self._globalModelHelperHelper.metadataLoaded().then(function() {
							oDataModel.read("/ZhfUffcontSet" , {
								filters: filters,
								success:function(data, oResponse){
									// console.log(data);//TODO:da canc
									entity.setProperty("/UfficioContResults",data.results);
                  entity.setProperty("/PanelFilterVisible", false);
                  entity.setProperty("/PanelResultVisible", true);
									oDialog.setBusy(false);
								},
								error:function(error){
									oDialog.setBusy(false);
									console.log(error);
								}
							});
						});
					});
				}					
			},

			_libGetViewId:function(context,callback){
				var self = this;
				// console.log(context);
				while (context && context.getParent) {
					var oParentControl = context.getParent();
					if(oParentControl instanceof sap.ui.core.mvc.View) {
						var viewId = oParentControl.getId();
						var oView = sap.ui.getCore().byId(viewId);
						callback({Id : viewId, oView : oView});
						break;
					}
					context = oParentControl;
				}
			}

		});   

  	return uffcontInput;
});