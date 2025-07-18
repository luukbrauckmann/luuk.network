import { getInput, setOutput, setFailed } from '@actions/core';

try {
  const input = getInput('example');
  console.log(`Hello ${input}`);
  setOutput('result', 'success');
} catch (error) {
  setFailed(error.message);
}
