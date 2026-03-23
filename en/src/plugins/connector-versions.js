const fs = require('fs');
const path = require('path');

function findVersionsFiles(dir, results = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules') {
      findVersionsFiles(fullPath, results);
    } else if (entry.name === 'versions.json') {
      results.push(fullPath);
    }
  }
  return results;
}

module.exports = function connectorVersionsPlugin(context) {
  const docsDir = path.resolve(context.siteDir, 'docs');

  return {
    name: 'connector-versions',

    async loadContent() {
      const files = findVersionsFiles(docsDir);
      const versionsMap = {};

      for (const filePath of files) {
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        if (data.connector_name) {
          versionsMap[data.connector_name] = {
            versions: data.versions,
            latest: data.latest,
            shared: data.shared || [],
          };
        }
      }

      return versionsMap;
    },

    async contentLoaded({ content, actions }) {
      const { setGlobalData } = actions;
      setGlobalData(content);
    },
  };
};
