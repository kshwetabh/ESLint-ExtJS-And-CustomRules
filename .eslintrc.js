module.exports = {
  env: {
    browser: true
  },
  extends: ["eslint:recommended", "plugin:sonarjs/recommended"],
  parserOptions: {
    ecmaVersion: 5
  },
  globals: {
    document: false,
    window: false,
    Ext: false,
    EAM: false,
    infor: false,
    gMenuJson: false,
    gToolbarText: false,
    gUserData: false,
    gDebug: false,
    gAppData: false,
    gHyperlinkButtons: false,
    CustomEvent: false,
    vcei: false,
    UTILITY: false
  },
  plugins: ["sonarjs", "hms-plugins"],
  rules: {
    indent: "off",
    "linebreak-style": "off",
    quotes: "off",
    "one-var": "off",
    "no-mixed-spaces-and-tabs": "off",
    semi: ["error", "always"],
    "comma-dangle": ["error", "never"],
    "vars-on-top": "off",
    "one-var": "warn",
    "no-lonely-if": "warn",
    "no-loop-func": "warn",

    //SonarLint rules
    "sonarjs/no-duplicate-string": "off",
    "sonarjs/cognitive-complexity": "off",

    //HMS Plugin rules
    "hms-plugins/no-hms-ext-create-method": 2, //0=off, 1=warn, 2=error
    "hms-plugins/no-hms-fieldlabel-asterisk": 2,
    "hms-plugins/no-hms-ext-componentquery": 1,
    "hms-plugins/no-hms-ext-window-autoshow-show": 2,
    "hms-plugins/no-hms-servercall-async": 1,
    "hms-plugins/no-hms-null-undefined": 0,
    "hms-plugins/no-hms-lookup-start-LV": 1,
    "hms-plugins/no-hms-bad-variable-names": 0, //Warning: very noisy rule, disabled by default
    "hms-plugins/no-hms-bad-lov-config": 1 //This needs to be a warning since LOV does not always need to have a type in modelFields
  }
};
