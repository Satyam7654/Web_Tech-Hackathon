// Toggle Menu Logic

var menubtn = document.getElementsByClassName("menu-btn")[0];
var sideBar = document.getElementsByClassName("sideBar")[0];

menubtn.onclick = function () {
  sideBar.classList.toggle("open");
};

// Loading Bar
document.addEventListener("DOMContentLoaded", function () {
  const loadingBar = document.getElementById("loadingBar");

  // Simulate loading progress
  let width = 0;
  const interval = setInterval(function () {
    width += 1;
    loadingBar.style.width = width + "%";

    // Stop when loading is complete (for demonstration purposes)
    if (width >= 150) {
      clearInterval(interval);
      loadingBar.style.opacity = 0;
    }
  }, 20);
});



// Chat Bot Logic

var boticon = document.getElementsByClassName("bot_icon")[0];
var botcontainer = document.getElementsByClassName("bot_container")[0];

boticon.onclick = function () {
  botcontainer.classList.toggle("open");
};

// Medicine Api

async function searchMedicine() {
  const medicineName = document.getElementById('medicineInput').value.trim();
  const resultsDiv = document.getElementById('results');
  resultsDiv.innerHTML = '';

  if (medicineName === '') {
    resultsDiv.innerHTML = 'Please enter a medicine name.';
    return;
  }

  if (medicineName.toLowerCase() === 'paracetamol') {
    resultsDiv.innerHTML = `
      <h3>${'Paracetamol'}</h3>
      <p><strong>Manufacturer:</strong> ${'Dolo, Paradol'}</p>
      <p><strong>Purpose:</strong> ${`A medicine used to treate mild to moderate pain, high fever`}</p>`;
    return;
  }
  else if (medicineName.toLowerCase() === 'azithromycin') {
    resultsDiv.innerHTML = `
      <h3>${'Azithromycin'}</h3>
      <p><strong>Manufacturer:</strong> ${'Cipla, Azithromycin-500mg'}</p>
      <p><strong>Purpose:</strong> ${`Used to treate infection including: chest, ear, nose, throat, sinus, etc...`}</p>`
    return;
  }
  else if (medicineName.toLowerCase() === 'digene') {
    resultsDiv.innerHTML = `
      <h3>${'Antacid'}</h3>
      <p><strong>Manufacturer:</strong> ${'Digene Pvt.Ltd.'}</p>
      <p><strong>Purpose:</strong> ${`Antacid used to treat acidity, gas, stomach irritation. `}</p>`;
    return;
  }
  else if (medicineName.toLowerCase() === 'cetirizine') {
    resultsDiv.innerHTML = `
      <h3>${'Cetirizine'}</h3>
      <p><strong>Manufacturer:</strong> ${'Cipla'}</p>
      <p><strong>Purpose:</strong> ${`Cetirizine is a relatively safe and effective medication for treating allergic rhinitis,urtiacria, and, allergic conjunctivitis`}</p>`;
    return;
  }

  try {
    const response = await fetch(`https://api.fda.gov/drug/label.json?search=openfda.brand_name:${medicineName}&limit=1`);

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const medicine = data.results[0];
      const name = medicine.openfda.brand_name ? medicine.openfda.brand_name[0] : 'N/A';
      const manufacturer = medicine.openfda.manufacturer_name ? medicine.openfda.manufacturer_name[0] : 'N/A';
      const purpose = medicine.purpose ? medicine.purpose.join(', ') : 'N/A';

      resultsDiv.innerHTML = `
      <h3>${name}</h3>
      <p><strong>Manufacturer:</strong> ${manufacturer}</p>
      <p><strong>Purpose:</strong> ${purpose}</p>
  `;
    } else {
      resultsDiv.innerHTML = 'No information found for this medicine.';
    }
  } catch (error) {
    resultsDiv.innerHTML = `Error fetching medicine information: ${error.message}`;
  }
}

// BMI Logic


document.getElementById("calculateBtn").addEventListener("click", () => {
  const sex = document.getElementById("sex").value;
  const age = parseFloat(document.getElementById("age").value);
  const height = parseFloat(document.getElementById("height").value);
  const weight = parseFloat(document.getElementById("weight").value);

  if (isNaN(age) || isNaN(height) || isNaN(weight) || height <= 0) {
    alert("Please enter valid numerical values for age, height, and weight.");
    return;
  }

  let heightI = height / 100;
  let bmi = weight / (heightI * heightI);

  let bodyFatPercentage;
  if (sex === "male") {
    bodyFatPercentage = (1.20 * bmi) + (0.23 * age) - 16.2;
  } else {
    bodyFatPercentage = (1.20 * bmi) + (0.23 * age) - 5.4;
  }

  document.getElementById("result1").innerText = `Your body mass index is: ${bmi.toFixed(2)}`;
  document.getElementById("result2").innerText = `Your body fat percentage is: ${bodyFatPercentage.toFixed(2)}%`;
});











