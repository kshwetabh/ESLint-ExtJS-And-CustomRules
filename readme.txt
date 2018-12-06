- Update eclipse workspace path before running this command.  
- This is an eclipse project so clone this to your local and import as Eclipse Project and then run below command to start ESLint-Watch
- Good Reference: https://www.kenneth-truyers.net/2016/05/27/writing-custom-eslint-rules/

-To install the rules as plugin for the first time:
===============================================================================================================
 npm install -S ./eslint/eslint-plugin-hms-plugins
  
 node_modules\.bin\esw -w --clear --changed -c .eslintrc.js C:\eclipseWorkspace\Frontend\src\main\webapp\app\

- To capture the performance of custom rules run the below command on Command Prompt inside LintTool directory.
=============================================================================================================== 
C:\> set TIMING=1
C:\> node_modules\.bin\eslint --rule "hms-plugins/no-hms-ext-create-method: 2" --rule "hms-plugins/no-hms-fieldlabel-asterisk: 2" --rule "hms-plugins/no-hms-ext-componentquery: 1" --rule "hms-plugins/no-hms-ext-window-autoshow-show: 2" --rule "hms-plugins/no-hms-servercall-async: 1" --rule "hms-plugins/no-hms-null-undefined: 0" --rule "hms-plugins/no-hms-lookup-start-LV: 1" --rule "hms-plugins/no-hms-bad-variable-names: 0" --rule "hms-plugins/no-hms-bad-lov-config: 1"  C:\eclipseWorkspace\Frontend\src\main\webapp\app\
