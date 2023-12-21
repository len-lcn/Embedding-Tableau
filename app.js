console.log("Hallo DSDE2");

let viz;

// 1. Create a Variale to store the vizContainer
const vizContainer = document.getElementById("vizContainer");

// 2. Create a Variable to store a dashboards options
const options = {
  device: "desktop",
  height: "800px",
  width: "1100px",
};

// 3. Create a variable to store the URL of the dash
const url =
  "https://public.tableau.com/views/EmbeddingWorkbookProfitsAcrossME-Asia/OfficeSupplyProfitsacrossMEandAsia";

function initViz() {
  viz = new tableau.Viz(vizContainer, url, options);
}

initViz();

// 4. Create constant for button
const exportPdfButton = document.getElementById("exportPdf");

// 5. create a function which is run when we click
function exportPdffunction() {
  viz.showExportPDFDialog();
}

// 6. create event listener for butoon on click
exportPdfButton.addEventListener("click", exportPdffunction);

// 7. Create constant for button
const exportPptButton = document.getElementById("exportPpt");

// 8. create a function which is run when we click
function exportPptfunction() {
  viz.showExportPowerPointDialog();
}

// 9. create event listener for butoon on click
exportPptButton.addEventListener("click", exportPptfunction);

//10.Adding filters
const filterButton = document.getElementById("FilterButton");

filterButton.addEventListener("click", getRangeValues);

function getRangeValues() {
  const minValue = document.getElementById("minValue").value;
  const maxValue = document.getElementById("maxValue").value;
  console.log(minValue, maxValue);
  // need to get active sheet, but this could be a dashboard or a worksheet
  const workbook = viz.getWorkbook();
  const activeSheet = workbook.getActiveSheet();
  const sheets = activeSheet.getWorksheets();
  //inspect the sheets you need to filter
  console.log(sheets);
  // index of the sheet you want to filter
  const sheetToFilter = sheets[0];
  // do the actual filtering
  sheetToFilter
    .applyRangeFilterAsync("SUM(Sales)", { min: minValue, max: maxValue })
    .then(alert("viz filtered"));
}
