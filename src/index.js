const fs = require('fs');

// BEGIN
const increment = (version, part = 'patch') => {
  const [major, minor, patch] = version.split('.').map(Number);

  switch (part) {
    case 'major':
      return `${major + 1}.0.0`;

    case 'minor':
      return `${major}.${minor + 1}.0`;

    case 'patch':
      return `${major}.${minor}.${patch + 1}`;

    default:
      return version;
  }
};

const upVersion = (path, part) => {
  try {
    const data = fs.readFileSync(path, 'utf8');
    const parsedData = JSON.parse(data);
    const version = increment(parsedData?.version, part);

    fs.writeFileSync(path, JSON.stringify({ version }));
  } catch (error) {
    throw new Error(error);
  }
};
// END

module.exports = { upVersion };
