const btnShowMore = document.getElementById("btn__show-more");
const btnShowLess = document.getElementById("btn__show-less");
const searchBar = document.getElementById("nav__search-bar");
const characterList = document.getElementById("character-list");
const characterItem = document.getElementsByClassName("character-list__item");
const characterName = document.getElementsByClassName("character-list__name");
const dropDownItem = document.getElementsByClassName("nav__dropdown-item");
const characterSpecies = document.getElementsByClassName("character-list__species");

for (const allItems of dropDownItem) {
  allItems.addEventListener("click", () => {
    for (let i = 0; i < characterItem.length; i++) {
      if (
        characterSpecies[i].textContent
          .toLowerCase()
          .includes(allItems.textContent.toLowerCase())
      ) {
        characterItem[i].style.display = "list-item";
      } else {
        characterItem[i].style.display = "none";
      }
    }
  });
}

searchBar.addEventListener("input", (search) => {
  const value = search.target.value.toLowerCase();

  for (let i = 0; i < characterItem.length; i++) {
    if (
      characterName[i].textContent.toLowerCase().includes(value) ||
      characterSpecies[i].textContent.toLowerCase().includes(value)
    ) {
      characterItem[i].style.display = "list-item";
    } else {
      characterItem[i].style.display = "none";
    }
  }
});

let dataArr = [];

let charArr = [];

for (let i = 1; i < 826; i++) {
  charArr.push(i);
}

const getCharacter = async function () {
  try {
    const res = await fetch(
      `https://rickandmortyapi.com/api/character/${charArr}`
    );
    const data = await res.json();

    dataArr = data.map((array) => {
      const getHTML = `
      <li class="character-list__item" onclick="selectCharacter(${array.id})">
      <img class="character-list__image" src=${array.image} alt="Character Image">
      <h2 class="character-list__name">${array.name}</h2>
      <p class="character-list__species">Species: ${array.species} </p>
      </li>
      `;

      characterList.insertAdjacentHTML("beforeend", getHTML);

      return {
        id: array.id,
        name: array.name,
        species: array.species,
      };
    });
  } catch (error) {
    alert(error);
  }
};

const selectCharacter = async (id) => {
  const res2 = await fetch(`https://rickandmortyapi.com/api/character/${id}`);
  const data2 = await res2.json();
  popupCharacter(data2);
};

const popupCharacter = (array) => {
  const popHTML = `
     <div class="popup"> 
     <button id="popup__btn-close" onclick="closePopUp()">Close</button>
     <div class= "popup-elements">
     <img class="popup__image" alt="Character Image" src=${array.image}>
     <h2 class="popup__name"><span>Name:</span> ${array.name}</h2>
     <p class="popup__species"><span>Species:</span> ${array.species} </p>
     <p class="popup__type"><span>Type:</span>${array.type}</p>
     <p class="popup__location"><span>Location:</span> ${array.location.name} </p>
     </div>
     </div>
  `;

  characterList.insertAdjacentHTML("afterbegin", popHTML);

  const popUpType = document.querySelector(".popup__type");

  if (popUpType.textContent.length === 5) {
    popUpType.innerHTML = "<span>Type:</span> Unspecified";
  }
};

const closePopUp = () => {
  const popup = document.querySelector(".popup");
  popup.remove();
};

let currentChar = 25;

btnShowMore.addEventListener("click", () => {
  btnShowLess.style.display = "block";

  for (let i = 0; i < currentChar + 25; i++) {
    characterItem[i].style.display = "list-item";
  }

  currentChar += 25;

  if (currentChar >= 800) {
    btnShowMore.style.display = "none";
  }
});

btnShowLess.addEventListener("click", () => {
  for (let i = currentChar; i < currentChar + 25; i++) {
    characterItem[i].style.display = "none";
  }

  currentChar -= 25;

  if (currentChar == 0) {
    btnShowLess.style.display = "none";
    btnShowMore.style.display = "inline-block";
  } else if (currentChar < 800) {
    btnShowMore.style.display = "inline-block";
  }
});

getCharacter();
