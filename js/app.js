'use strict';

// $(document).ready(function() {  

//   $('.tile').click(function() {
//       $(this).toggleClass('hover');
//   });
// });



let numberRows = 0;
let numberColumns = 0;
let numberTiles = 20;
let positions = [];
let positionRows = [];
let positionColumns = [];
let tiles = []; // Array that will hold the data for all the tiles currently in play
let firstTileSelected = [];
let tileImages = [
  'breakfast.png',
  'bus.png',
  'bicycle.png',
  'cable-car.png',
  'canoe.png',
  'checking.png',
  'compass.png',
  'cruise.png',
  'desert.png',
  'distance.png',
  'flippers.png',
  'helicopter.png',
  'keycard.png',
  'luggage.png',
  'mountain.png',
  'plane.png',
  'scooter.png',
  'time.png',
  'train.png',
  'van.png',
];

function initializeGame() {
  switch (numberTiles) {
    case 20:
      numberRows = 4;
      numberColumns = 5;
      break;
    case 40:
      numberRows = 5;
      numberColumns = 8;
      break;
    default:
      alert('ERROR: Number of tiles is not valid!');
  }

  // Create array of row positions
  let foundNumber = false;
  for (let x = 0; x < numberRows; x++) {
    while (!foundNumber) {
      let randomNumber = Math.floor(Math.random() * numberRows + 1);
      if (!positionRows.includes(randomNumber)) {
        positionRows[x] = randomNumber;
        foundNumber = true;
      }
    }
    foundNumber = false;
  }

  // Create an array of column positions
  for (let x = 0; x < numberColumns; x++) {
    while (!foundNumber) {
      let randomNumber = Math.floor(Math.random() * numberColumns + 1);
      if (!positionColumns.includes(randomNumber)) {
        positionColumns[x] = randomNumber;
        foundNumber = true;
      }
    }
    foundNumber = false;
  }

  generateRandomPositionArray();
}

// Create constructor to hold data about each tile
function TileData(imageName, imagePath, tilePosition) {
  this.imageName = imageName;
  this.imagePath = imagePath;
  this.tilePosition = tilePosition;
}

// Declare function to create an object from an array of data and append it from an array
function addTile(data) {
  tiles.push(new TileData(data.imageName, data.imagePath, data.tilePosition));
}

// Populate the tiles array that holds the name, file location and screen position data for all the tiles
function generateRandomPositionArray() {
  //Create array of tile positions to fill
  for (let xPos of positionColumns) {
    for (let yPos of positionRows) {
      positions.push(`pos-${xPos}-${yPos}`);
    }
  }

  // Create an array with tile names, image file locations and position on the screen
  for (let i = 0; i < positions.length / 2; i++) {
    addTile({
      imageName: tileImages[i].split('.')[0],
      imagePath: `./assets/${tileImages[i]}`,
      tilePosition: positions[i],
    });
  }
  for (let i = positions.length / 2; i < positions.length; i++) {
    addTile({
      imageName: tileImages[i - positions.length / 2].split('.')[0],
      imagePath: `./assets/${tileImages[i - positions.length / 2]}`,
      tilePosition: positions[i],
    });
  }
}

// Populate the tiles on the screen from the tiles array
function displayTiles() {
  for (let tile of tiles) {
    // let currentTile = document.getElementById(tile.tilePosition);
    let currentTile = document.querySelector(`#${tile.tilePosition} img`);
    currentTile.src = tile.imagePath;
    currentTile.alt = tile.imageName;
    // currentTile.name = tile.imageName;
  }
}

function handleClickTile(event) {
  let clickedImage = event.target.alt;
  let clickedElement = event.target.parentNode.id;

  if (typeof clickedElement == 'string') {
    if (
      firstTileSelected.length !== 0 &&
      clickedElement !== firstTileSelected[1]
    ) {
      if (clickedImage == firstTileSelected[0]) {
        // score increment
        document.getElementById('current-score').textContent =
          Number(document.getElementById('current-score').textContent) + 1;
        // attempts increment
        document.getElementById('current-attempts').textContent =
          Number(document.getElementById('current-attempts').textContent) + 1;
        // tiles hidden
        // document.getElementById(clickedElement).classList.add('hidden');
        // document.getElementById(firstTileSelected[1]).classList.add('hidden');
        let currentTile = document.querySelector(`#${clickedElement} img`);
        let previousTile = document.querySelector(
          `#${firstTileSelected[1]} img`
        );
        currentTile.src = 'https://via.placeholder.com/150x150/FFFFFF';
        currentTile.alt = '';
        previousTile.src = 'https://via.placeholder.com/150x150/FFFFFF';
        previousTile.alt = '';
      } else {
        // re-flip tiles

        // attempt increment
        document.getElementById('current-attempts').textContent =
          Number(document.getElementById('current-attempts').textContent) + 1;
      }
      // reset firstTileSelected
      firstTileSelected = [];
    } else {
      firstTileSelected = [clickedImage, clickedElement];
    }
  }
}

initializeGame();
displayTiles();

// Listen for user clicking the tiles area and call response
document.querySelector('.tiles').addEventListener('click', handleClickTile);
