
$(function() {

  const $overallBar = $("#overall-bar");
  const $htmlBar = $("#html-bar");
  const $cssBar = $("#css-bar");
  const $jsBar = $("#js-bar");
  const $projectsBar = $("#projects-bar");



  // user's course progress
  let courseProgress = [
    {"category": "overall", "completed": 127, "total": 153},
    {"category": "html", "completed": 50, "total": 50},
    {"category": "css", "completed": 50, "total": 50},
    {"category": "javascript", "completed": 25, "total": 50},
    {"category": "projects", "completed": 2, "total": 3}
  ];

  // update progress
  // function updateProgress() { 
  // }

  // fetches bar's category
  function getCategory(bar) {
    switch(bar) {
      case $overallBar:
        // console.log(courseProgress[0]);
        return courseProgress[0];
      case $htmlBar:
        // console.log(courseProgress[0]);
        return courseProgress[1];
      case $cssBar:
        // console.log(courseProgress[0]);
        return courseProgress[2];
      case $jsBar:
        // console.log(courseProgress[0]);
        return courseProgress[3];
      case $projectsBar:
        // console.log(courseProgress[0]);
        return courseProgress[4];
    }
  }

  // return progress of completed category
  function getPercent(category) { 
    let completed = category.completed;
    let total = category.total;
    return (completed / total) * 100;
  }

  function updateBar(bar) {
    let category = getCategory(bar);
    let width = 0; // bar progress
    let time = setInterval(fillBar, 20); // set animation speed
    let percent = getPercent(category); // get category percent
    function fillBar() {
      if (width >= percent) {
        clearInterval(time); // stop interval
      } 
      else {
        width++; 
        bar.css("width", width + "%") ; // increase bar
        bar.text(percent.toFixed(1) + "%")
      }
    }
  }
  updateBar($overallBar); 
  updateBar($htmlBar); 
  updateBar($cssBar); 
  updateBar($jsBar); 
  updateBar($projectsBar); 

                      
});
