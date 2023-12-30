const address = "./dimasacat_main.php";

function clearForm() {
  document.querySelector("#character_name").value = "";
  document.querySelector("#weapon").value = "";
  document.querySelector("#vision").value = "";
  document.querySelector("#gender").value = "";
  document.querySelector("#region").value = "";
}

function addCharacter() {
  const nameInput = document.querySelector("#character_name");
  const weaponInput = document.querySelector("#weapon");
  const selectedWeapon = weaponInput.options[weaponInput.selectedIndex];
  const visionInput = document.querySelector("#vision");
  const selectedVision = visionInput.options[visionInput.selectedIndex];
  const genderInput = document.querySelector("#gender");
  const selectedGender = genderInput.options[genderInput.selectedIndex];
  const regionInput = document.querySelector("#region");
  const selectedRegion = regionInput.options[regionInput.selectedIndex];

  if (!nameInput.value.trim() || !weaponInput.value || !visionInput.value 
  || !genderInput.value || !regionInput.value) {
    return alert("Please fill in all fields");
  }

  const characterData = {
    action: "POST",
    name: nameInput.value,
    weapon: selectedWeapon.value,
    vision: selectedVision.value,
    gender: selectedGender.value,
    region: selectedRegion.value,
  };

  const urlEncodedData = Object.keys(characterData)
    .map((key) => encodeURIComponent(key) + "=" + 
      encodeURIComponent(characterData[key]))
    .join("&");

  fetch(address, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlEncodedData,
  })
    .then((response) => response.text())
    .then((responseText) => {
      displayCharacters();
      alert(responseText);
      clearForm();
    })
    .catch((error) => console.error("Error:", error));
}

async function displayCharacters() {
	try {
	  const characterData = {
	    action: "GET",
	  };

  	const urlEncodedData = Object.keys(characterData)
  	  .map((key) => encodeURIComponent(key) + "=" + 
  	    encodeURIComponent(characterData[key]))
  	  .join("&");
		
  	const response = await fetch(address, {
  	  method: "POST",
  	  headers: {
  	    "Content-Type": "application/x-www-form-urlencoded",
  	  },
  	  body: urlEncodedData,
  	});
	
  	const responseText = await response.text();
  	document.querySelector("#character_list").innerHTML =
  	  "<tr><th>Name</th><th>Weapon</th><th>Vision</th>" +
  	  "<th>Gender</th><th>Region</th><th>Modify</th>" +
  	  "<th>Remove</th></tr>" + responseText;
  } catch (error) {
    	console.error("Error:", error);
    }
}
  
displayCharacters();

function showUpdateForm(characterId) {
  const characterData = {
    action: "GET_ONE",
    id: characterId,
  };

  const urlEncodedData = Object.keys(characterData)
    .map((key) => encodeURIComponent(key) + "=" + 
      encodeURIComponent(characterData[key]))
    .join("&");

  fetch(address, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlEncodedData,
  })
    .then((response) => response.json())
    .then((character) => {
      document.querySelector("#character_name").value = 
        character.character_name;
      document.querySelector("#weapon").value = character.weapon;
      document.querySelector("#vision").value = character.vision;
      document.querySelector("#gender").value = character.gender;
      document.querySelector("#region").value = character.region;

      const submitButton = document.querySelector("#add_form button");
      submitButton.innerText = "Update";
      submitButton.onclick = function () {
        updateCharacter(characterId);
      };
    })
    .catch((error) => console.error("Error:", error));
}

function updateCharacter(characterId) {
  const nameInput = document.querySelector("#character_name");
  const weaponInput = document.querySelector("#weapon");
  const selectedWeapon = weaponInput.options[weaponInput.selectedIndex];
  const visionInput = document.querySelector("#vision");
  const selectedVision = visionInput.options[visionInput.selectedIndex];
  const genderInput = document.querySelector("#gender");
  const selectedGender = genderInput.options[genderInput.selectedIndex];
  const regionInput = document.querySelector("#region");
  const selectedRegion = regionInput.options[regionInput.selectedIndex];

  if (!nameInput.value.trim() || !weaponInput.value || !visionInput.value 
  || !genderInput.value || !regionInput.value) {
    return alert("Please fill in all fields");
  }

  const characterData = {
    action: "PATCH",
    id: characterId,
    name: nameInput.value,
    weapon: selectedWeapon.value,
    vision: selectedVision.value,
    gender: selectedGender.value,
    region: selectedRegion.value,
  };

  const urlEncodedData = Object.keys(characterData)
    .map((key) => encodeURIComponent(key) + "=" + 
      encodeURIComponent(characterData[key]))
    .join("&");

  fetch(address, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: urlEncodedData,
  })
    .then((response) => response.text())
    .then((responseText) => {
      displayCharacters();
      alert(responseText);
      clearForm();
    })
    .catch((error) => console.error("Error:", error));
}

function removeCharacter(characterId) {
  if (confirm("Are you sure you want to delete this character?")) {
    const deleteData = {
      action: "DELETE",
      id: characterId,
    };

    const urlEncodedData = Object.keys(deleteData)
      .map((key) => encodeURIComponent(key) + "=" 
        + encodeURIComponent(deleteData[key]))
      .join("&");

    fetch(address, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: urlEncodedData,
    })
      .then((response) => response.text())
      .then((responseText) => {
        displayCharacters();
        alert(responseText);
      })
      .catch((error) => console.error("Error:", error));
  }
}