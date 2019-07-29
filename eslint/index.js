/**
 * Custom Rules to enforce Project Specific coding standards and best practices.
 */

module.exports = {
    rules: {
    	/**
    	 * Enforce the use of EAM.HmsUtils.openPopup() method instead of Ext.create() so that browser displays pagewait mask while user is waiting.
    	 */
        "no-hms-ext-create-method": {
            create: function(context) {
                return {
                	CallExpression(node) {
                		if (node.callee && 
                				node.callee.type === "MemberExpression" &&
                				node.callee.object && node.callee.object.type === "Identifier" && node.callee.object.name === "Ext" && 
                				node.callee.property && node.callee.property.name === "create" && 
                				node.arguments && node.arguments[0] && node.arguments[0].value && node.arguments[0].value.indexOf("popups") > -1) {
                			context.report(node, 'Do not use Ext.create(), use EAM.HmsUtils.openPopup() to create popup instead.');
                		}
                	}
                };
            }
        },
        /**
         * Enforce the use of "*" at the end of fieldLabel value to indicate missing value for the field in the database
         */
        "no-hms-fieldlabel-asterisk": {
            create: function(context) {
                return {
                	Property(node){
                        if (node.type == "Property" &&
                            node.key && node.key.type == "Identifier" && node.key.name &&
                            node.key.name == "fieldLabel" && 
                            node.value && node.value.type == "Literal" && node.value.value &&
                            node.value.value.includes("*") == false) {
                                context.report(node, 'Use * to indicate a missing value for a field label.')
                    		}
                		}
                }
            }
        },
        /**
         * Enforce using view.up() or view.down() methods instead of the expensive Ext.ComponentQuery.query() method 
         */
        "no-hms-ext-componentquery": {
            create: function(context) {
                return {
                	CallExpression(node) {
                		if (node.callee && node.callee.object && 
                				node.callee.object.object &&
                				node.callee.object.object.type === "Identifier" && 
                				node.callee.object.object.name === "Ext" &&
                				node.callee.object.property && 
                				node.callee.object.property.type === "Identifier" &&
                				node.callee.object.property.name === "ComponentQuery" &&
                				node.callee.property && 
                				node.callee.property.type === "Identifier" &&
                				node.callee.property.name === "query") {
                			context.report(node, 'Avoid using Ext.ComponentQuery.query method, use view.down or popup.down method instead.');
                		}
            		}
            	}
            }
        },
        /**
         * Do not use autoShow:true and show() in Ext.create() method at the same time. 
         */
        "no-hms-ext-window-autoshow-show": {
            create: function(context) {
                return {
                	CallExpression(node) {
                		if (node.callee && node.callee.object && 
                				node.callee.object.callee &&
                				node.callee.object.callee.type == "MemberExpression" && 
                				node.callee.object.callee.object &&
                				node.callee.object.callee.object.type === "Identifier" && 
                				node.callee.object.callee.object.name === "Ext" &&
                				node.callee.object.callee.property && 
                				node.callee.object.callee.property.type === "Identifier" &&
                				node.callee.object.callee.property.name === "create" &&
                				node.callee.object.arguments && 
                				node.callee.object.arguments[1] && 
                				node.callee.object.arguments[1].type === "ObjectExpression" &&
                				node.callee.property && 
                				node.callee.property.type === "Identifier" &&
                				node.callee.property.name === "show") {
                			var props = node.callee.object.arguments[1].properties,
                				len = props ? props.length : 0,
        						found = false;
                			
                			// check if "autoShow: true" is present
                			for (var i = 0; i < len; i++) {
                				var propNode = props[i];
                				if (propNode && 
                						propNode.key && 
                						propNode.key.type === "Identifier" &&
                						propNode.key.name === "autoShow" && 
                						propNode.value && 
                						propNode.value.type === "Literal" &&
                						propNode.value.value === true) {
                					found = true;
                					break;
                				}
                			}
                			if (found) {
                				context.report(node, 'Do not use autoShow:true and show() in Ext.create method at the same time.');
                			}
                		}
            		}
            	}
            }
        },
        /**
         * Enforce the rule of using async:true in EAM.Utils.serverCall() method so that pagewait mask is displays while user is waiting.
         */
        "no-hms-servercall-async": {
            create: function(context) {
                return {
                	CallExpression(node) {
                		if( node.callee && node.callee.type === "MemberExpression" &&
	                		node.callee.object && node.callee.object.type === "MemberExpression" &&
	                		node.callee.object.object && 
	                			node.callee.object.object.type === "Identifier" && node.callee.object.object.name === "EAM" &&
	        				node.callee.object.property && 
	        					node.callee.object.property.type === "Identifier" && node.callee.object.property.name === "Utils" &&
	    					node.callee.property && 
	    						node.callee.property.type === "Identifier" && node.callee.property.name === "serverCall" && 
	    					node.arguments) {
                			
                			var i = 0, prop, found = false,
	                			arg0 = node.arguments[0],
	                			props = arg0.properties,
	                			len = props ? props.length : 0;
                		
	                		for (; i < len; i++) {
	                			prop = props[i];
	                			if (prop.type === "Property" && 
	                					prop.key && prop.key.type === "Identifier" && 
	                					prop.key.name === "async" && prop.value.value === true) {
	                				found = true;
	                				break;
	                			}
	                		}
	                		if (!found) {
	                			context.report(node, 'Use async:true with EAM.Utils.serverCall to make async calls and display page mask.');
	                		}
                		}
                	}
                }
            }
        },
        /**
         * Enforce the use of Ext.isEmpty() while checking a value for null and empty. 
         */
        //Issue: Gives too many false positives
        "no-hms-null-undefined": {
            create: function(context) {
                return {
                    BinaryExpression(node){                         

                        if (node.type == "BinaryExpression" && node.operator && (node.operator == "==" || node.operator == "===") && 
                            node.right && node.right.type && node.right.type == "Literal" && (node.right.raw == "null" || node.right.name == "undefined" ||
                            node.right.raw == "\"\"" || node.right.raw == "''")) {
                                context.report(node, 'Use Ext.isEmpty() method for null or empty check.')
                        }
                    }
                }
            }
        },
        /**
         * Enforce the Checklist rule that a LOV name must start with LV 
         */
        "no-hms-lookup-start-LV": {
            create: function(context) {
                return {
                    Property(node){
                        if (node.type == "Property" && node.key && node.key.type == "Identifier" && node.key.name == "lovName" && 
                            node.value && node.value.type == "Literal" && node.value.value && node.value.value.includes("LV") == false) {
                                context.report(node, 'All LOV codes should start with "LV".')
                        }
                    }
                }
            }
        },
        /**
         * Stop the bad practice of naming JS variables like vFormPanel, vConfig, etc.
         */
        "no-hms-bad-variable-names": {
            create: function(context) {
            	function checkBadVarName(node, name) {
            		const pattern = /(\bv[A-Z][A-Z0-9]*)/gm;
            		
            		if (name.match(pattern)) {
            			context.report(node, `Remove suffix 'v' from ${name} variable name.`, {});
            		}
            	}
                return {
                	Identifier(node) {
                		checkBadVarName(node, node.name);
                	}
                }
            }
        },
        /**
         * Ensure LOVField definition in _fields.js file is accompanied by a modelFields configuration
         */
        "no-hms-bad-lov-config": {
            create: function(context) {
            	const fName = context.getFilename();
            	// Skip if not fields.js file
            	if (fName.indexOf("_fields.js") < 0) {
            		return {};
            	}
            	
            	var globFieldsArr;
            	
            	function getPropertyName(fieldsItems) {
            	    for (let k=0; k < fieldsItems.length; k++) {
            	        const prop = fieldsItems[k];
            	        if (prop && prop.key && prop.key.name === "name" &&
            	            prop.value && prop.value.value) {
            	            return prop.value.value;
            	        }    
            	    }
            	}
            	
            	function getPropertyType(fieldsItems) {
            	    for (let k = 0; k < fieldsItems.length; k++) {
            	        const prop = fieldsItems[k];
            	        if (prop && prop.key && prop.key.name === "type" && prop.value && prop.value.value) {
            	            return prop.value.value;
            	        }
            	    }
            	}
            	
            	function isFieldsArray(fieldsArr) {
            		return fieldsArr && fieldsArr.key && fieldsArr.key.name ==="fields";
            	}
            	
            	function isValidLOVFieldConfig(fieldName) {
            		let fieldsArr, fieldsItemsProps, isInvalidConfig = true;
            		
            		if (globFieldsArr) {
            			fieldsArr = globFieldsArr[1];
            		}
            		
            		if (fieldsArr && fieldsArr.key && fieldsArr.key.name === "modelFields") {
                        if (fieldsArr.value && fieldsArr.value.elements) {
                            const props = fieldsArr.value.elements;
                            for (let j = 0; j < props.length; j++) {
                                let fieldsItems = props[j];

                                if (fieldsItems && fieldsItems.type === "ObjectExpression") {
                                    fieldsItemsProps = fieldsItems.properties;

                                    let fieldMatchFound = false,
                                    	fieldTypeFound = false;

                                    for (let k = 0; k < fieldsItemsProps.length; k++) {
                                        const prop = fieldsItemsProps[k];                            
                                        
                                        if (prop && prop.value && prop.value.value === fieldName) {
                                            fieldMatchFound = true;
                                        }
                                        
                                        if (prop && prop.value && ["sfcode", "sfstring"].indexOf(getPropertyType(fieldsItemsProps)) >= 0) {
                                            fieldTypeFound = true;
                                        }

                                        if (fieldMatchFound && fieldTypeFound) {
                                            return true;
                                        }                                       
                                    }
                                }
                            }
                        }
                    }
            	} /* isValidLOVFieldConfig - Ends */
            	
                return {
                	ObjectExpression(node) {
                		if (node.properties) {
                			globFieldsArr = node.properties;
                		    for (let i=0; i< node.properties.length; i++) {
                		        const fieldsArr = node.properties[i];

                		        if (isFieldsArray(fieldsArr)) {
                		            if(fieldsArr.value && fieldsArr.value.elements) {
                		                const props = fieldsArr.value.elements;
                		                
                		                for (let j=0; j < props.length; j++) {
                		                    let fieldsItems = props[j];
                		                    
                		                    if (fieldsItems && fieldsItems.type === "ObjectExpression") {
                		                        fieldsItems = fieldsItems.properties;

                		                        for (let k=0; k < fieldsItems.length; k++) {
                		                            const prop = fieldsItems[k];
                		                            if (prop && prop.value && prop.value.value === "lovfield") {
                		                            	const fldName = getPropertyName(fieldsItems);
                		                                if (!isValidLOVFieldConfig(fldName)) {
                		                                	//TODO: line number of the issue location is not displayed correctly
                		                                	context.report(node, `Did you forget the LOVField type config in modelFields[] for field {${fldName}}`);
                		                                }
                		                            }    
                		                        }
                		                    }              
                		                }
                		            }
                		        }
                		    }    
                		}
                	}
                } // return ends
            }
        }, //rule ends
    }
}