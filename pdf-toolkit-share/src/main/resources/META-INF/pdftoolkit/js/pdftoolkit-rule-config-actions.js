/**
 * Copyright 2008-2012 Alfresco Software Limited.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 * 
 * This file is part of an unsupported extension to Alfresco.
 */

/**
 * PDFRuleConfigAction
 *
 * @namespace PDFToolkit
 * @class PDFToolkit.PDFRuleConfigAction
 */

/**
 * Create the Alfresco PDF Toolkit namespace if it does not exist
 */
if(typeof PDFToolkit == "undefined" || !PDFToolkit)
{
	var PDFToolkit = {};
}

(function()
{

   /**
    * YUI Library aliases
    */
   var Dom = YAHOO.util.Dom,
      Selector = YAHOO.util.Selector,
      Event = YAHOO.util.Event;
      
   /**
    * Alfresco Slingshot aliases
    */
    var $html = Alfresco.util.encodeHTML,
    	$hasEventInterest = Alfresco.util.hasEventInterest;
       
	PDFToolkit.RuleConfigActionCustom = function(htmlId)
	{
		PDFToolkit.RuleConfigActionCustom.superclass.constructor.call(this, htmlId);

		// Re-register with our own name
		this.name = "PDFToolkit.RuleConfigActionCustom";
		Alfresco.util.ComponentManager.reregister(this);

		// Instance variables
		this.customisations = YAHOO.lang.merge(this.customisations, PDFToolkit.RuleConfigActionCustom.superclass.customisations);
		this.renderers = YAHOO.lang.merge(this.renderers, PDFToolkit.RuleConfigActionCustom.superclass.renderers);
		return this;
	};

	YAHOO.extend(PDFToolkit.RuleConfigActionCustom, Alfresco.RuleConfigAction,
	{

		/**
		 * CUSTOMISATIONS
		 */
		customisations:
		{
			PDFAppend:
			{
				text: function(configDef, ruleConfig, configEl)
				{
					// Display as path
					this._getParamDef(configDef, "destination-folder")._type = "path";
					this._getParamDef(configDef, "target-node")._type = "path";
					return configDef;
				},
				edit: function(configDef, ruleConfig, configEl)
				{
					// Hide parameters that have another renderer defined
					this._getParamDef(configDef, "destination-folder")._type = "hidden";
					this._getParamDef(configDef, "target-node")._type = "hidden";
				
					// add custom renderers for hidden fields
					configDef.parameterDefinitions.splice(0,0,
					{
						type: "pdftoolkit:select-file-dialog-button",
						displayLabel: this.msg("pdftoolkit.append.target-node"),
						_buttonLabel: this.msg("pdftoolkit.select-node"),
						_destinationParam: "target-node"
					},
					{
						type: "arca:destination-dialog-button",
						displayLabel: this.msg("label.to"),
						_buttonLabel: this.msg("button.select-folder"),
						_destinationParam: "destination-folder"
					});

					return configDef;
				}
			},

			PDFSplitAtPage:
			{
				text: function(configDef, ruleConfig, configEl)
				{
					// Display as path
					this._getParamDef(configDef, "destination-folder")._type = "path";
					return configDef;
				},
				edit: function(configDef, ruleConfig, configEl)
				{

					// Hide parameters that have another renderer defined
					this._getParamDef(configDef, "destination-folder")._type = "hidden";
					
					// add custom renderers for hidden fields
					configDef.parameterDefinitions.splice(0,0,
					{
						type: "arca:destination-dialog-button",
						displayLabel: this.msg("label.to"),
						_buttonLabel: this.msg("button.select-folder"),
						_destinationParam: "destination-folder"
					});

					return configDef;
				}
			},

			PDFSignature:
			{
				text: function(configDef, ruleConfig, configEl)
				{
					// Display as path
					this._getParamDef(configDef, "destination-folder")._type = "path";
					this._getParamDef(configDef, "private-key")._type = "path";
					return configDef;
				},
				edit: function(configDef, ruleConfig, configEl)
				{

					// Hide parameters that have another renderer defined
					this._getParamDef(configDef, "destination-folder")._type = "hidden";
					this._getParamDef(configDef, "private-key")._type = "hidden";
					
					// add custom renderers for hidden fields
					configDef.parameterDefinitions.splice(0,0,
					{
						type: "pdftoolkit:select-file-dialog-button",
						displayLabel: this.msg("pdftoolkit.signature.private-key"),
						_buttonLabel: this.msg("pdftoolkit.select-node"),
						_destinationParam: "private-key"
					},
					{
						type: "arca:destination-dialog-button",
						displayLabel: this.msg("label.to"),
						_buttonLabel: this.msg("button.select-folder"),
						_destinationParam: "destination-folder"
					});

					return configDef;
				}
			},

			PDFSplit:
			{
				text: function(configDef, ruleConfig, configEl)
				{
					// Display as path
					this._getParamDef(configDef, "destination-folder")._type = "path";
					return configDef;
				},
				edit: function(configDef, ruleConfig, configEl)
				{

					// Hide parameters that have another renderer defined
					this._getParamDef(configDef, "destination-folder")._type = "hidden";
					
					// add custom renderers for hidden fields
					configDef.parameterDefinitions.splice(0,0,
					{
						type: "arca:destination-dialog-button",
						displayLabel: this.msg("label.to"),
						_buttonLabel: this.msg("button.select-folder"),
						_destinationParam: "destination-folder"
					});

					return configDef;
				}
			},

			PDFInsertAtPage:
			{
				text: function(configDef, ruleConfig, configEl)
				{
					// Display as path
					this._getParamDef(configDef, "destination-folder")._type = "path";
					this._getParamDef(configDef, "insert-content")._type = "path";
					
					return configDef;
				},
				edit: function(configDef, ruleConfig, configEl)
				{

					// Hide parameters that have another renderer defined
					this._getParamDef(configDef, "destination-folder")._type = "hidden";
					this._getParamDef(configDef, "insert-content")._type = "hidden";
					
					// add custom renderers for hidden fields
					configDef.parameterDefinitions.splice(0,0,
					{
						type: "pdftoolkit:select-file-dialog-button",
						displayLabel: this.msg("pdftoolkit.insert.target-node"),
						_buttonLabel: this.msg("pdftoolkit.select-node"),
						_destinationParam: "insert-content"
					},
					{
						type: "arca:destination-dialog-button",
						displayLabel: this.msg("label.to"),
						_buttonLabel: this.msg("button.select-folder"),
						_destinationParam: "destination-folder"
					});

					return configDef;
				}
			},

			PDFWatermark:
			{
				text: function(configDef, ruleConfig, configEl)
				{
					// Display as path
					this._getParamDef(configDef, "destination-folder")._type = "path";
					this._getParamDef(configDef, "watermark-image")._type = "path";
					return configDef;
				},
				edit: function(configDef, ruleConfig, configEl)
				{

					// Hide parameters that have another renderer defined
					this._getParamDef(configDef, "destination-folder")._type = "hidden";
					this._getParamDef(configDef, "watermark-image")._type = "hidden";
					
					// add custom renderers for hidden fields
					configDef.parameterDefinitions.splice(0,0,
					{
						type: "pdftoolkit:select-file-dialog-button",
						displayLabel: this.msg("pdftoolkit.watermark.image"),
						_buttonLabel: this.msg("pdftoolkit.select-node"),
						_destinationParam: "watermark-image"
					},
					{
						type: "arca:destination-dialog-button",
						displayLabel: this.msg("label.to"),
						_buttonLabel: this.msg("button.select-folder"),
						_destinationParam: "destination-folder"
					});

					return configDef;
				}
			},

			PDFEncryption:
			{
				text: function(configDef, ruleConfig, configEl)
				{
					// Display as path
					this._getParamDef(configDef, "destination-folder")._type = "path";
					return configDef;
				},
				edit: function(configDef, ruleConfig, configEl)
				{

					// Hide parameters that have another renderer defined
					this._getParamDef(configDef, "destination-folder")._type = "hidden";
					
					// add custom renderers for hidden fields
					configDef.parameterDefinitions.splice(0,0,
					{
						type: "arca:destination-dialog-button",
						displayLabel: this.msg("label.to"),
						_buttonLabel: this.msg("button.select-folder"),
						_destinationParam: "destination-folder"
					});

					return configDef;
				}
			},
			
			PDFDecryption:
			{
				text: function(configDef, ruleConfig, configEl)
				{
					// Display as path
					this._getParamDef(configDef, "destination-folder")._type = "path";
					return configDef;
				},
				edit: function(configDef, ruleConfig, configEl)
				{

					// Hide parameters that have another renderer defined
					this._getParamDef(configDef, "destination-folder")._type = "hidden";
					
					// add custom renderers for hidden fields
					configDef.parameterDefinitions.splice(0,0,
					{
						type: "arca:destination-dialog-button",
						displayLabel: this.msg("label.to"),
						_buttonLabel: this.msg("button.select-folder"),
						_destinationParam: "destination-folder"
					});

					return configDef;
				}
			},

			PDFExtraction:
			{
				text: function(configDef, ruleConfig, configEl)
				{
					// Display as path
					this._getParamDef(configDef, "destination-folder")._type = "path";
					return configDef;
				},
				edit: function(configDef, ruleConfig, configEl)
				{

					// Hide parameters that have another renderer defined
					this._getParamDef(configDef, "destination-folder")._type = "hidden";
					
					// add custom renderers for hidden fields
					configDef.parameterDefinitions.splice(0,0,
					{
						type: "arca:destination-dialog-button",
						displayLabel: this.msg("label.to"),
						_buttonLabel: this.msg("button.select-folder"),
						_destinationParam: "destination-folder"
					});

					return configDef;
				}
			},

			PDFRotation:
			{
				text: function(configDef, ruleConfig, configEl)
				{
					// Display as path
					this._getParamDef(configDef, "destination-folder")._type = "path";
					return configDef;
				},
				edit: function(configDef, ruleConfig, configEl)
				{

					// Hide parameters that have another renderer defined
					this._getParamDef(configDef, "destination-folder")._type = "hidden";
					
					// add custom renderers for hidden fields
					configDef.parameterDefinitions.splice(0,0,
					{
						type: "arca:destination-dialog-button",
						displayLabel: this.msg("label.to"),
						_buttonLabel: this.msg("button.select-folder"),
						_destinationParam: "destination-folder"
					});

					return configDef;
				}
			},
			
			PDFDeletePage:
			{
				text: function(configDef, ruleConfig, configEl)
				{
					// Display as path
					this._getParamDef(configDef, "destination-folder")._type = "path";
					return configDef;
				},
				edit: function(configDef, ruleConfig, configEl)
				{
					// Hide parameters that have another renderer defined
					this._getParamDef(configDef, "destination-folder")._type = "hidden";
				
					// add custom renderers for hidden fields
					configDef.parameterDefinitions.splice(0,0,
					{
						type: "arca:destination-dialog-button",
						displayLabel: this.msg("label.to"),
						_buttonLabel: this.msg("button.select-folder"),
						_destinationParam: "destination-folder"
					});

					return configDef;
				}
			}
		},

		/**
		 * RENDERERS
		 */

		renderers:
		{
			"pdftoolkit:select-file-dialog-button":
			{
				manual: { edit: true },
				currentCtx: {},

				edit: function (containerEl, configDef, paramDef, ruleConfig, value)
				{
				
					//if the selected file dialog does not exist, create it now
					if(!this.widgets.selectedFileDialog)
					{
						this.widgets.selectedFileDialog = new Alfresco.module.DocumentPicker(this.id + "-fileDialog");
						
						//when we enter edit mode, set up the document picker
						var getDocLibNodeRefUrl = Alfresco.constants.PROXY_URI + "slingshot/doclib/container/" + this.options.siteId + "/documentlibrary";
						Alfresco.util.Ajax.jsonGet(
						{
							url: getDocLibNodeRefUrl,
							successCallback:
							{
								fn: function(response)
								{
									var parentNodeRef = response.json.container.nodeRef;
									parent.widgets.selectedFileDialog.setOptions(
									{
										displayMode: "items",
										itemFamily: "node",
										itemType: "cm:content",
										multipleSelectMode: false,
										parentNodeRef: parentNodeRef,
										restrictParentNavigationToDocLib: false
									});
									
									// Need to force the component loaded call to ensure setup gets completed.
									parent.widgets.selectedFileDialog.onComponentsLoaded();
								}
							},
							failureCallback:
							{
								//if the call fails, then we'll try to get the repo root
								//probably means this is being used from a repo folder, not a site folder
								fn: function(response)
								{
									var parentNodeRef = "alfresco://company/home";
									parent.widgets.selectedFileDialog.setOptions(
									{
										displayMode: "items",
										itemFamily: "node",
										itemType: "cm:content",
										multipleSelectMode: false,
										parentNodeRef: parentNodeRef,
										restrictParentNavigationToDocLib: false
									});
										
									// Need to force the component loaded call to ensure setup gets completed.
									parent.widgets.selectedFileDialog.onComponentsLoaded();
								}
							}
						});
					}
					
					var parent = this;
					this._createLabel(paramDef.displayLabel, containerEl); 
					var nodeRef = ruleConfig.parameterValues ? ruleConfig.parameterValues[paramDef._destinationParam] : null;
					this._createPathSpan(containerEl, configDef, paramDef, this.id + "-" + configDef._id + "-fileLabel", nodeRef);
					this._createButton(containerEl, configDef, paramDef, ruleConfig, function showFilePicker(type, obj)
					{
						//reset the dialog's selected item to allow for selection of another.
						this.widgets.selectedFileDialog.singleSelectedItem = null;
						
						this.renderers["pdftoolkit:select-file-dialog-button"].currentCtx =
						{
							configDef: obj.configDef,
							ruleConfig: obj.ruleConfig,
							paramDef: obj.paramDef
						};

						YAHOO.Bubbling.on('onDocumentsSelected', function(eventName, args)
						{
							if (args && args[1].items)
							{
								//get the selected node
								var selectedFile = args[1].items[0];
								if(selectedFile != null)
								{
									var ctx = this.renderers["pdftoolkit:select-file-dialog-button"].currentCtx;
									this._setHiddenParameter(ctx.configDef, ctx.ruleConfig, ctx.paramDef._destinationParam, selectedFile.nodeRef);
									Alfresco.util.ComponentManager.get(this.id + "-" + ctx.configDef._id + "-fileLabel").displayByPath(selectedFile.name, selectedFile.displayPath);
									this._updateSubmitElements(ctx.configDef);
								}
							}
						}, this);
						
						//show the picker
						this.widgets.selectedFileDialog.onShowPicker();
					});
				}
			}	
		}
	});
})();
