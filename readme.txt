- Update eclipse workspace path before running this command.  
- This is an eclipse project so clone this to your local and import as Eclipse Project and then run below command to start ESLint-Watch
- Good Reference: https://www.kenneth-truyers.net/2016/05/27/writing-custom-eslint-rules/

-To install the rules as plugin for the first time:
 npm install -S ./eslint/eslint-plugin-hms-plugins
  
node_modules\.bin\esw -w --clear --changed -c .eslintrc.js C:\Users\ksfnu\eclipseWorkspace\workspace38_Photon\Frontend\src\main\webapp\app\