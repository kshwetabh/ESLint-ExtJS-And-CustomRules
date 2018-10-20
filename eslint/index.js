module.exports = {
    rules: {
        "no-ext-create-method": {
            create: function(context) {
                return {
                	CallExpression(node) {
                		if (node.callee && 
                				node.callee.type === "MemberExpression" &&
                				node.callee.object && node.callee.object.type === "Identifier" && node.callee.object.name === "Ext" && 
                				node.callee.property && node.callee.property.name === "create" && 
                				node.arguments && node.arguments[0] && node.arguments[0].value && node.arguments[0].value.indexOf("popups") > -1) {
                			context.report(node, 'Do not use Ext.create, use EAM.HmsUtils.openPopup to create popup.');
                		}
                	}
                };
            }
        },
        "no-hms-fieldlabel-asterisk": { //Not working
            create: function(context) {
                return {
                	ObjectExpression(node) {
                		if (node.properties && 
                				node.properties[0] && 
                				node.properties[0].key && node.properties[0].key.type === "Identifier" &&
                				node.properties[0].key.name === "fieldLabel" && 
                				node.properties[0].type === "Literal" && 
                				node.properties[0].value && node.properties[0].value.indexOf("*") === -1)
                			context.report(node, 'Use * to indicate a missing value for a field label.');
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
            "no-hms-servercall-async": { //serverCall should have {async: true} Not Working correctly
                create: function(context) {
                    return {
                    	CallExpression(node) {
                    		if (node.callee && 
                    				node.callee.object &&
                    				node.callee.object.object && node.callee.object.object.name=== "EAM" &&
                    				node.callee.object.property && node.callee.object.property.name === "Utils" &&
                    				node.callee.property && node.callee.property.name === "serverCall" &&
                    				node.arguments && node.arguments[0]) {
                    			var i=0, prop, found = false,
                    				arg0 = node.arguments[0],
                    				props = arg0.properties,
                    				len = props ? props.length : 0;
                    			
                    			for (; i < len; i++) {
                    				prop = props[0];
                    				if (prop.type === "Property" && prop.key && 
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
            }
        }
}