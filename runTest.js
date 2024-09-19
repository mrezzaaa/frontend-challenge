const { spawn } = require('child_process');
const fs = require('fs');

const jest = spawn('npx', ['jest']);

const logStream = fs.createWriteStream('testresult.txt', { flags: 'w' });

jest.stdout.pipe(process.stdout);
jest.stderr.pipe(process.stderr);
jest.stdout.pipe(logStream);
jest.stderr.pipe(logStream);

jest.on('close', (code) => {
  console.log(`Jest process exited with code ${code}`);
  logStream.end();
});
