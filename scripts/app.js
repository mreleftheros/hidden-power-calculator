const powerForm = document.getElementById("powerForm");
const formResult = document.getElementById("formResult");

//event listeners
powerForm.addEventListener("input", showValues);

// show input values function
function showValues(e) {
  if(e.target.tagName === "INPUT") {
    e.target.nextElementSibling.textContent = e.target.value;
  }
}

powerForm.addEventListener("submit", e => {
  e.preventDefault();

  const inputValues = [
    +powerForm.hp.value,
    +powerForm.atk.value,
    +powerForm.def.value,
    +powerForm.spd.value,
    +powerForm.specAtk.value,
    +powerForm.specDef.value
  ]

  let powerType = getPowerType(inputValues);
  let power = getPower(inputValues);

  formResult.innerHTML = `
  <table>
    <tr>
      <th>Power Type</th>
      <td>${powerType}</td>
    <tr>
      <th>Power</th>
      <td>${power}</td>
  </table>
  `;

  powerForm.reset();
})

//function to get power type
function getPowerType(arr) {
  let powerType;
  const significantBits = arr.map(value => {
    return value % 2 === 0 ? 0 : 1;
  })

  const result = Math.floor((significantBits[0] + 2 * significantBits[1] + 4 * significantBits[2] + 8 * significantBits[3] + 16 * significantBits[4] + 32 * significantBits[5]) * 15 / 63);

  switch(result) {
    case 0:
      powerType = "Fighting";
      break;
    case 1:
      powerType = "Flying";
      break;
    case 2:
      powerType = "Poison";
      break;
    case 3:
      powerType = "Ground";
      break;
    case 4:
      powerType = "Rock";
      break;
    case 5:
      powerType = "Bug";
      break;
    case 6:
      powerType = "Ghost";
      break;
    case 7:
      powerType = "Steel";
      break;
    case 8:
      powerType = "Fire";
      break;
    case 9:
      powerType = "Water";
      break;
    case 10:
      powerType = "Grass";
      break;
    case 11:
      powerType = "Electric";
      break;
    case 12:
      powerType = "Psychic";
      break;
    case 13:
      powerType = "Ice";
      break;
    case 14:
      powerType = "Dragon";
      break;
    case 15:
      powerType = "Dark";
      break;
  }

  return powerType;
}

//function to get power
function getPower(arr) {
  let power;
  const lessSignificantBits = arr.map(value => {
    if(value % 4 === 2 || value % 4 === 3) {
      return 1;
    }
    return 0;
  })

  return Math.floor(((lessSignificantBits[0] + 2 * lessSignificantBits[1] + 4 * lessSignificantBits[2] + 8 * lessSignificantBits[3] + 16 * lessSignificantBits[4] + 32 * lessSignificantBits[5]) * 40 / 63) + 30);
}