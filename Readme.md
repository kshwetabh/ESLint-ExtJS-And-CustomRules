=============================================================================================================== 
STEPS TO INSTALL AND CONFIGURE ESLINT TOOL AND CUSTOM RULES
=============================================================================================================== 
# Download and install latest version of NodeJS.
# Download the project as zip from github and extract on local machine in a directory.
# Open package.json file and update Eclipse Workspace path (value for hmsFEWorkspace in package.json file) as per your Eclipse workspace.
# Open command prompt and navigate to the extracted directory. Run the following command. This should install all dependencies required to run the ESLint on your machine
	**npm install**
# To install Custom HMS-ESlint plugin, delete package-lock.json file (don't delete package.json file) and run the following command on command prompt. This should install the custom plugin.
	**npm install -S ./hms_plugin**
# Now run the following command on Command Prompt to run Eslint tool:
	**RunEslint.bat**
# The first run of the tool will take some time (30sec - 1minute) since the tool tries to scan entire workspace. All subsequent runs will be fast.
# Now in Eclipse whenever you save a JS file, the tool will auto-detect the file changed and will run scan on that changed file.


=============================================================================================================== 
IGNORE THE BELOW NOTES IF YOU DON'T PLAN TO DEVELOP OR TIME THE CUSTOM ESLINT PLUGINS (USED ONLY FOR ESLINT PLUGIN DEVELOPMENT)
=============================================================================================================== 

=============================================================================================================== 
To capture the performance of custom rules run the below command on Command Prompt inside LintTool directory.
=============================================================================================================== 
C:\> set TIMING=1
C:\> node_modules\.bin\eslint --rule "hms-plugins/no-hms-ext-create-method: 2" --rule "hms-plugins/no-hms-fieldlabel-asterisk: 2" --rule "hms-plugins/no-hms-ext-componentquery: 1" --rule "hms-plugins/no-hms-ext-window-autoshow-show: 2" --rule "hms-plugins/no-hms-servercall-async: 1" --rule "hms-plugins/no-hms-null-undefined: 0" --rule "hms-plugins/no-hms-lookup-start-LV: 1" --rule "hms-plugins/no-hms-bad-variable-names: 0" --rule "hms-plugins/no-hms-bad-lov-config: 1"  C:\eclipseWorkspace\Frontend\src\main\webapp\app\

=============================================================================================================== 
Online References:
=============================================================================================================== 
https://www.kenneth-truyers.net/2016/05/27/writing-custom-eslint-rules/