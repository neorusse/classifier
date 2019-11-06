/**
 * This is the entry point to the program
 *
 * @param {any} input Array of student objects
 */
function classifier(input) {
  // throw error if input is not an array
  if (!Array.isArray(input)) {
    throw TypeError(`Expected input to be Array instead got ${typeof input}`);
  }

  if (input.length === 0) return { noOfGroups: 0 };

  // copy input to prevent original input from being mutated
  const inputCopy = [...input];

  for (let i in inputCopy) {
    inputCopy[i].age =
      new Date().getFullYear() - new Date(inputCopy[i].dob).getFullYear();
  }

  // sort inputCopy (array) base on age
  let sortedInputCopy = inputCopy.sort((a, b) => a.age - b.age);

  let groupMem = [];
  let groupArray = [];

  // loop through sorted array and group them
  for (let i in sortedInputCopy) {
    let groupMemLen = groupMem.length;

    if (groupMemLen == 0) {
      groupMem.push(sortedInputCopy[i]);
    } else if (
      Math.abs(sortedInputCopy[i].age - groupMem[0].age) <= 5 &&
      groupMemLen < 3
    ) {
      groupMem.push(sortedInputCopy[i]);
    } else {
      groupArray.push(groupMem);
      groupMem = [];
      groupMem.push(sortedInputCopy[i]);
    }
  }

  // push remaining values into groupArray
  if (groupMem.length) {
    groupArray.push(groupMem);
  }

  let counter = 0;
  let outputObject = {};

  groupArray.forEach(group => {
    let groupObject = {};

    // get oldest age
    let ages = [];
    group.forEach(member => ages.push(Number(member.age)));
    let oldest = Math.max(...ages);

    // get sum of age
    let sumOfAges = 0;
    group.forEach(member => (sumOfAges += member.age));

    // get Reg number in ascending order
    let arrRegNos = [];
    group.forEach(member => arrRegNos.push(Number(member.regNo)));
    let regNo = arrRegNos.sort((a, b) => a - b);

    groupObject.members = group;
    groupObject.oldest = oldest;
    groupObject.sum = sumOfAges;
    groupObject.regNos = regNo;

    counter++;
    outputObject['noOfGroups'] = counter;
    outputObject[`group${counter}`] = groupObject;
  });

  return outputObject;
}

module.exports = classifier;
