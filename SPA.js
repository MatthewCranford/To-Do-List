//@Matthew Cranford code
// holds user's course progress
let userProgress = [
  {"category": "overall", "completed": 127, "total": 153},
  {"category": "html", "completed": 50, "total": 50},
  {"category": "css", "completed": 50, "total": 50},
  {"category": "javascript", "completed": 25, "total": 50},
  {"category": "projects", "completed": 2, "total": 3}
];

// Determines a percentage
const determineProgress = (checked, totalBoxes) => {
  // Declarations
  let tempProgress;
  const percent = 100;
  tempProgress = checked / totalBoxes * percent;
  return tempProgress;
};

function animateBar(bar) {
  let checked = $("[type='checkbox']:checked").length;
  let totalBoxes = $("[type='checkbox']").length;

  let startWidth = 0; // bar progress
  let endWidth = parseInt($(bar)[0].style.width);

  console.log(endWidth);
  // $(".blue")[0].style.width = 0;


  let time = setInterval(fillBar, 100); // set animation speed
  function fillBar() {
    
    if (startWidth >= endWidth) {
      console.log(startWidth);
      
      clearInterval(time); // stop interval
    } else {
      
      startWidth++; 
      $(".blue")[0].style.width = endWidth + "%"; // increase bar
    }
  }
}
                     
//@Brendan Pettis code
// Declarations
const title = $(".update");
const jsbar = $(".yellow");
const allbar = $(".blue");
// animateBar(jsbar); 
animateBar(allbar);

// On Button Click
$("button").click(event => {
 // Declarations
  let checked = $("[type='checkbox']:checked").length;
  let totalBoxes = $("[type='checkbox']").length;
  let progress;

  // Set equal to the returned value as a string
  progress = determineProgress(checked, totalBoxes).toString() + "%";

  jsbar.width(progress);
  jsbar.text(progress);

  title.text("JavaScript Progress: " + progress);

  event.preventDefault();
});


//@Angel Couso code
$(".state-buttons").on("click",function(){
  if($(this).attr("state") === "0") {
    $(this).addClass("waiting");
    $(this).html($(this).attr("data-first-state-text"));
    $(this).attr("state", "1")
  } else if($(this).attr("state") === "1") {
    $(this).addClass("success");
    $(this).html($(this).attr("data-second-state-text"));
    $(this).attr("state", "2")
  }
});
