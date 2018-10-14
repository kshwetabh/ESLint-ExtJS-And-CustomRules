module.exports = {
    "env": {
        "browser": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "ecmaVersion": 5
    },
    "globals": {
        "document": false,
        "window": false,
        "Ext": false,
        "EAM": false,
        "infor": false,
        "gMenuJson": false,
        "gToolbarText": false,
        "gUserData": false,
        "gDebug": false,
        "gAppData": false,
        "gHyperlinkButtons": false,
        "CustomEvent": false,
        "vcei": false,
        "UTILITY": false
    },
    "plugins": ["hms-plugins"],
    "rules": {
        "indent": "off",
        "linebreak-style": "off",
        "quotes": "off",
        "no-mixed-spaces-and-tabs": "off",
        "semi": [
            "error",
            "always"
        ],
        "hms-plugins/no-ext-create-method": 1,
        "hms-plugins/no-hms-fieldlabel-asterisk": 1,
        "hms-plugins/no-hms-ext-componentquery": 1,
        "hms-plugins/no-hms-ext-window-autoshow-show": 1
    }
};