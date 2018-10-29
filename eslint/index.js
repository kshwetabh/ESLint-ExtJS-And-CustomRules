module.exports = {
    rules: {
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
        "no-hms-servercall-async": { //serverCall should have {async: true}
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
        "no-hms-null-undefined": { //Issue: Gives too many false positives
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
        "no-hms-bad-variable-names": { // Bad variable naming pattern needs to stop (like vFormPanel, vConfig, etc.)
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
        }
    }
}