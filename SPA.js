//@Angel Couso tabs model//
$(function() {
    $(".tabs-nav li:first-child a").click();
  });
  $(".tabs-nav a").on("click", function() {
    let toggle = $(this).attr("data-toggle");
    $(".panels").removeClass("active");
    $("#" + toggle).addClass("active");
    $(".tabs-nav a").removeClass("active");
    $(this).addClass("active");
    $(".tabs-nav").css("border-bottom-color", $(this).css("background-color"));
  });
  //@Sachin and @Steve Prager code//
  /* 
    * Copyright 2018 Study Buddy
    *  Notes [Sachin-3/22/2018]
    *  @Node class is used to represent checklist node
    *  Code is divided into different namespaces.
    *  SBP.Enums - stores fixed enums.
    *  SBP.Consts - stores constants.
    *  SBP.Data - stores common data required for page.
    *  SBP.UI - code for top level UI related calls. <try-catch layer>
    *  SBP.UIHelper - helper code for UI layer. Only called from SBP.UI
    *  SBP.Events - code to bind events and handle callbacks. <try-catch layer>
    *  SBP.EventsHelper - helper code for Event layer.  Only called from SBP.Events
    *  SBP.Helper - Generic helper code which do not belong to UI and Events layer
    *  localStorage api's are used for client side storage.
   */
  
  SBP = {};
  
  let Node = function(parent, isChecked) {
    let privateMembers = {
      parent: parent,
      children: [],
      isChecked: isChecked,
      group: SBP.Enums.Groups.NONE,
      status: SBP.Enums.Status.NOTCOMPLETED
    };
  
    return {
      get: function(property) {
        if (privateMembers.hasOwnProperty(property)) {
          return privateMembers[property];
        }
      },
  
      set: function(property, value) {
        if (privateMembers.hasOwnProperty(property)) {
          privateMembers[property] = value;
        }
      }
    };
  };
  
  SBP.Enums = {
    Groups: Object.freeze({
      NONE: "none",
      HTML: "html",
      CSS: "css",
      JAVASCRIPT: "javascript",
      JQUERY: "jquery",
      PROJECTS: "projects"
    }),
    Status: Object.freeze({
      NOTCOMPLETED: 0,
      PENDING: 1,
      COMPLETED: 2
    })
  };
  
  SBP.Consts = {
    DATA_ATTR_CATEGORY: "data-category-type",
    ATTR_CATEGORY: "category-type",
    LAST_PAGE_STATE: "study-buddies-project--progress"
  };
  
  SBP.Data = {
    checkListMap: new Object()
  };
  
  SBP.UI = {
    bindPage: function() {
      try {
        SBP.UIHelper.loadData();
        $("#list-container")
          .find("li input")
          .each(function() {
            let id = $(this).attr("id");
            if (SBP.Data.checkListMap[id]) {
              let isChecked = SBP.Data.checkListMap[id].isChecked;
              $(this).prop("checked", isChecked);
            }
          });
      } catch (ex) {
        console.log(ex.message);
      }
    },
  
    refreshPage: function() {
      try {
        // Update progress bars and other UI changes.
      } catch (ex) {
        console.log(ex.message);
      }
    },
  
    savePage: function() {
      try {
        localStorage[SBP.Consts.LAST_PAGE_STATE] = JSON.stringify(
          SBP.Data.checkListMap
        );
      } catch (ex) {
        console.log(ex.message);
      }
    },
  
    showError: function(error) {
      if (error.message) {
        console.log(ex.message);
      } else {
        console.log(error);
      }
    }
  };
  
  SBP.UIHelper = {
    loadData: function() {
      let data = localStorage[SBP.Consts.LAST_PAGE_STATE];
      if (data) {
        let checkListMap = JSON.parse(data);
        if (checkListMap) {
          SBP.Data.checkListMap = checkListMap;
        }
      }
    },
  
    fillNode: function(target, node) {
      let category = target.attr(SBP.Consts.DATA_ATTR_CATEGORY);
      node.group = category;
      let isChecked = target.is(":checked");
      node.isChecked = isChecked;
    }
  };
  
  SBP.Events = {
    bindEvents: function() {
      try {
        $("#list-container").on("click", "li input", function(e) {
          SBP.Events.onListItemClicked($(e.target));
        });
      } catch (ex) {
        SBP.UI.showError(ex);
      }
    },
  
    onListItemClicked: function(target) {
      try {
        // Create node and store in map
        let id = target.attr("id");
        SBP.Helpers.updateCheckListMap(id, target);
  
        // Refresh Page
        SBP.UI.refreshPage();
        // Save Page
        SBP.UI.savePage();
      } catch (ex) {
        console.log(ex.message);
      }
    }
  };
  
  SBP.EventsHelper = {};
  
  SBP.Helpers = {
    updateCheckListMap: function(id, target) {
      let node = null;
      if (!SBP.Data.checkListMap[id]) {
        node = new Node(null, false);
        if (node) {
          SBP.Data.checkListMap[id] = node;
        }
      } else {
        node = SBP.Data.checkListMap[id];
      }
      SBP.UIHelper.fillNode(target, node);
      return node;
    }
  };
  
  $(function() {
    try {
      SBP.UI.bindPage();
      SBP.Events.bindEvents();
    } catch (ex) {
      console.log(ex.message);
    }
  });
  
  $("input[id*=lesson]").on("click", function() {
    let parent = $(this).parent();
    if (parent.find(":checkbox").prop("checked")) {
      parent.find(":checkbox").prop("checked", true);
    } else {
      parent.find(":checkbox").prop("checked", false);
    }
  });
  
  $("input[id*=-]").on("click", function() {
    $(
      "#lesson" +
        $(this)
          .attr("id")
          .charAt(0)
    ).prop("checked", false);
  });

  //@Brendan Pettis code//
  // Declarations
  const title = $(".update");
 
  
  //@Matt code//

  const $overallBar = $("#pb_all");
  const $htmlBar = $("#pb_html");
  const $cssBar = $("#pb_css");
  const $jsBar = $("#pb_js");
  const $jqueryBar = $("#pb_jquery");
  const $projectsBar = $("#pb_projects");

  const bars = [
    $overallBar,
    $htmlBar,
    $cssBar,
    $jsBar,
    $jqueryBar,
    $projectsBar,
  ]



  // user's course progress
  let courseProgress = {
    overall: {"completed": 127, "total": 153},
    html: {"completed": 50, "total": 50},
    css: {"completed": 50, "total": 50},
    javascript: {"completed": 25, "total": 50},
    jquery: {"completed": 25, "total": 50},
    projects: {"completed": 2, "total": 3}
  }
  console.log(courseProgress["overall"]);
    

  // update progress
  function updateProgress() { 
      
  }

  // fetches bar's category
  function getCategory(bar) {
    switch(bar) {
      case $overallBar:
        return courseProgress["overall"];
      case $htmlBar:
        return courseProgress["html"];
      case $cssBar:
        return courseProgress.css;
      case $jsBar:
        return courseProgress.javascript;
      case $jqueryBar:
        return courseProgress.jquery;
      case $projectsBar:
        return courseProgress.projects;
    }
  }

  // return progress of completed category
  function getPercent(category) { 
    let completed = category.completed;
    let total = category.total;
    return (completed / total) * 100;
  }

  function updateBar(bar) {
      console.log(bar);
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
  
  function updateAllBars(bars) {
      for (let i = 0; i<bars.length; i++) {
          updateBar(bars[i]);
      }
  }
  updateAllBars(bars);

                      
