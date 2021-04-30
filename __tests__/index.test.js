const fs = require('fs');
const path = require('path');

const { upVersion } = require('../src/index.js');

const pjPath = path.join(__dirname, '../__fixtures__/package.json');
const originalState = '{"version":"1.3.2"}';

const getVersion = (filePath) => {
  const data = fs.readFileSync(filePath, 'utf8');
  const parsedData = JSON.parse(data);

  return parsedData?.version;
};

describe('side-effects upVersion', () => {
  afterEach(() => fs.writeFileSync(pjPath, originalState));

  test.each([
    ['major', '2.0.0'],
    ['minor', '1.4.0'],
    ['patch', '1.3.3'],
  ])('should return updated %s', (part, expected) => {
    upVersion(pjPath, part);

    const result = getVersion(pjPath);

    expect(result).toBe(expected);
  });

  it('should return updated patch as default', () => {
    upVersion(pjPath);

    const result = getVersion(pjPath);
    const expected = '1.3.3';

    expect(result).toBe(expected);
  });

  it('should return without changes for unknown part', () => {
    upVersion(pjPath, 'test');

    const result = getVersion(pjPath);
    const expected = '1.3.2';

    expect(result).toBe(expected);
  });

  it('should return error without args', () => {
    expect(() => upVersion()).toThrow(Error);
  });
});
