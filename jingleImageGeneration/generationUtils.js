const handleExec = (type, error, stdout, stderr) => {
  if (stdout) console.log(`${type} stdout: ${stdout}`);
  if (stderr) console.log(`${type} stderr: ${stderr}`);
  if (stderr) console.log(`${type} error: ${error}`);
};

module.exports = { handleExec };
