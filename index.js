function createGrid(grid, rowSize, colSize) {
    for (let i = 0; i < rowSize; i++) {
      grid[i] = document.createElement("div");
      grid[i].setAttribute("id", "container");
      let pixels = [];
      for (let j = 0; j < colSize; j++) {
        pixels[j] = document.createElement("div");
        pixels[j].setAttribute("id", "pixel");
        grid[i].appendChild(pixels[j]);
      }
    }
    return grid;
  }
  
  function appendArray(pDiv, cDiv) {
    cDiv.forEach((div) => pDiv.appendChild(div));
    return pDiv;
  }
  
  (() => {
    const GRID_WIDTH = 16;
    const GRID_HEIGHT = 16;
    const sketchEl = document.querySelector("#sketch");
    const eraseEl = document.querySelector("#erase");
    const buttonsEl = document.querySelector(".buttons");
    let gridCont = document.querySelector("#grid-container");
    let grid = [];
    let state;
    grid = createGrid(grid, GRID_WIDTH, GRID_HEIGHT);
    gridCont = appendArray(gridCont, grid);
    buttonsEl.addEventListener("click", changeState);
  
    gridCont.addEventListener("mouseover", eventHandler, false);
  
    function changeState(event) {
      state = event.target.id;
      switch (state) {
        case "reset":
          sketchReset();
          break;
        case "gridSize":
          sizeReset();
      }
    }
    function sketchReset() {
      const pixels = document.querySelectorAll("#pixel");
      pixels.forEach((pxl) =>
        pxl.setAttribute("style", "background-color:'transparent';")
      );
    }
    function sizeReset() {
      let size = parseInt(prompt("Enter grid size (MAX=100) : "));
      if (size <= 100) {
        grid.length = 0;
        grid = createGrid(grid, size, size);
        gridCont.innerHTML = "";
        gridCont = appendArray(gridCont, grid);
      }
    }
    function eventHandler(event) {
      if (event.target.id !== "pixel") {
        return;
      }
      changeColor(event);
    }
    function changeColor(event) {
      if (state === "eraser") {
        event.target.setAttribute("style", "background-color:'transparent';");
        return;
      }
      event.target.setAttribute("style", "background-color:black;");
    }
  })();