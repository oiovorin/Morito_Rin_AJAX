(() => {

  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");

  //functions
  function loadInfoBoxes() {

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(infoBoxes => {
      console.log(infoBoxes);

      infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);

      const titleElement = document.createElement('h2');
      titleElement.textContent = infoBox.heading;

      const textElement = document.createElement('p');
      textElement.textContent = infoBox.description;

      selected.appendChild(titleElement);
      selected.appendChild(textElement);
    });
    })
    .catch(error => {
      console.log(error);
      const errorText = document.createElement('p');
      errorText.textContent = "Oops! Unable to fetch the infobox data. Please try again.";
      errorText.classList.add("error-message")

      document.body.appendChild(errorText);
    });

   
  }
  loadInfoBoxes();

  function loadMaterialInfo() {

      const loader = document.querySelector("#loader");
      loader.style.display = "block";

    fetch("https://swiftpixel.com/earbud/api/materials")    
    .then(response => response.json())
    .then(materials => {
      console.log(materials);

      materials.forEach(material => {
      const clone = materialTemplate.content.cloneNode(true);
      const materialHeading = clone.querySelector(".material-heading");
      materialHeading.textContent = material.heading;

      const materialDescription = clone.querySelector(".material-description");
      materialDescription.textContent = material.description;

      loader.style.display = "none";

      materialList.appendChild(clone);
    });

    })
    .catch(error => {
      console.log(error);
      const errorText = document.createElement('p');
      errorText.textContent = "Oops! Unable to fetch the material data. Please try again.";
      errorText.classList.add("material-error-message")

      document.body.appendChild(errorText);
    });


  }
  loadMaterialInfo();


  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });


})();

