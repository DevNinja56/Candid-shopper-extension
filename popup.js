// Const URLS
const base_url = "https://dev.candidshopper.com/api-extension/";

// Event Listeners And Triggers
if ((el = document.getElementById("login_button")))
  el.addEventListener("click", login_button_function);
if ((el1 = document.getElementById("logout_button")))
  el1.addEventListener("click", logout_button_function);
if ((el2 = document.getElementById("start_now_button")))
  el2.addEventListener("click", start_now_function);
if ((el3 = document.querySelector("#password_login"))) {
  el3.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      login_button_function(e);
    }
  });
}
if ((el4 = document.getElementById("feedback_button")))
  el4.addEventListener("click", feedback_button_function);
if ((el5 = document.getElementById("report_bug")))
  el5.addEventListener("click", report_bug_button);
if ((el6 = document.getElementById("main_logo")))
  el6.addEventListener("click", fetch_assignments);
if ((el7 = document.getElementById("task_reset")))
  el7.addEventListener("click", task_reset_function);
if ((el8 = document.getElementById("body")))
  el8.addEventListener("click", body_function);
if ((el9 = document.getElementById("pako")))
  el9.addEventListener("click", pako_function);



// auto trigger checks
// setInterval(check_auth, 100);
var access_token = localStorage.getItem("access_token");
var refresh_token = localStorage.getItem("refresh_token");

if (access_token == null || refresh_token == null) {
  document.getElementById("logout_button").style.display = "none";
  document.getElementById("feedback_button").style.display = "none";
} else {
  document.getElementById("start_now_button").innerText = "LOAD ASSIGNMENT";
  auth_refresh();
  start_now_function();
}

setInterval(timer_check,1000);
function timer_check(){
  if(localStorage.getItem("Timer")){
    var tasks_list = localStorage.getItem('tasks_list');
    tasks_list = JSON.parse(tasks_list);
    var Timer = parseInt(localStorage.getItem("Timer"));
    var date = new Date(tasks_list.tt_started * 1000);
    date.setSeconds(date.getSeconds() + Timer);

    var current = new Date();
    var differece = (date - current)/1000;
    
    var minutes = Math.floor(differece / 60);
    var seconds = Math.floor(differece - minutes * 60);

    if(seconds < 10){
      seconds = "0" + seconds;
    }
    var twenty_percent = Timer * 0.2;

    if(differece < twenty_percent){
      document.getElementById('timer').style.color = 'red'; 
      document.getElementById('timer').style.display = 'block'; 
      document.getElementById('timer').style.fontSize = '20px'; 
    }
    if(differece <= 1){
      localStorage.removeItem("Timer");
      document.getElementById('timer').innerText =  '0:00';
      document.getElementById('timer').style.display = 'block'; 
    }else{
      document.getElementById('timer').innerText = minutes +':'+ seconds;
      document.getElementById('timer').style.display = 'block';
    }
    
  }
  else if(tasks_list == null || tasks_list == "null"){
    document.getElementById('timer').style.display = 'none';
  }
  else if(localStorage.getItem('tasks_list')){
    var tasks_list = localStorage.getItem('tasks_list');
    tasks_list = JSON.parse(tasks_list);
    if(tasks_list.msg == 'no accepted assignments'){
      document.getElementById('timer').innerText =  '0:00';
      document.getElementById('timer').style.color = 'red'; 
      document.getElementById('timer').style.display = 'block'; 
      document.getElementById('timer').style.fontSize = '20px'; 
      document.getElementById('timer').style.display = 'none';
    }
    
  }
}


// Functions
function pako_function(){

  // steps to convert into zipped form
  var obj = {'a': "A", 'b': "B"};
  var obj1 = JSON.stringify(obj);
  let utf8Encode = new TextEncoder();
  obj1 = utf8Encode.encode(obj);
  console.log(obj);
  // Turn number array into byte-array
  obj1 = new Uint8Array(obj1);
  console.log(obj1);

  // // Pako magic
  obj1 = pako.inflate(obj1);
  console.log(obj1);

  // // Convert gunzipped byteArray back to ascii string:
  // obj = String.fromCharCode.apply(null, new Uint16Array(obj));
  // console.log(obj);



  // obj = pako.deflate(obj);
  // console.log(obj);
  // obj = btoa(String.fromCharCode.apply(null, new Uint8Array(obj)));
  // console.log(obj);
  // obj = window.btoa(obj);
  // // obj = String.fromCharCode(obj)
  // // obj = window.atob(obj);
  // console.log(obj);
  
  // return;
  

 

  var url = base_url + "compresstestdani";
  var xhr2 = new XMLHttpRequest();
  xhr2.open("POST", url, true);
  xhr2.setRequestHeader("Content-Type", "application/json");
  xhr2.setRequestHeader("Authorization", "Bearer " + access_token);
  xhr2.setRequestHeader("Access-Control-Allow-Origin", "*");
 
  xhr2.send(
    JSON.stringify({
      "base64(zip(o))": obj
    })
  );
  

  xhr2.onreadystatechange = function () {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
      console.log(xhr2.responseText);
    }else{
      console.log(xhr2.responseText);
    }
  }


}

function start_now_function() {  
  var access_token = localStorage.getItem("access_token");
  var refresh_token = localStorage.getItem("refresh_token");
  var tasks_list = localStorage.getItem("tasks_list");


  // checking auth
  if (access_token != null && refresh_token != null) {
     // style changes
    document.getElementById("mascot_pose").style.display = "none";
    document.getElementById("circle_graphics").style.display = "none";
    document.getElementById("start_now_button").style.display = "none";
    if(tasks_list == null || tasks_list == "null"){
      document.getElementById("step_title").innerText =
      "Digital Customer Experience Research"
      var components_box = document.getElementById("components_box");
      components_box.innerHTML = null;
      document.getElementById('report_bug').style.display = 'none';
      document.getElementById('task_reset').style.display = 'none';
      document.getElementById("step_description").innerHTML =
      "No accepted assignments.";
      components_box.innerHTML = '<button style="background-color:#f59e0b;color:white" id="new_assignment" class="tintin-btn components">Load</button>';
      document.getElementById("new_assignment").addEventListener("click", fetch_assignments, false);
      localStorage.removeItem("Timer");
      return;
    }    
    tasks_list = JSON.parse(tasks_list);

    if(tasks_list){
      if(tasks_list.msg == 'no accepted assignments'){
        document.getElementById("step_title").innerText =
        "Digital Customer Experience Research"
        var components_box = document.getElementById("components_box");
        components_box.innerHTML = null;
        document.getElementById("step_description").innerHTML =
        "No accepted assignments.";
        components_box.innerHTML = '<button style="background-color:#f59e0b;color:white" id="new_assignment" class="tintin-btn components">Load</button>';
        document.getElementById("new_assignment").addEventListener("click", fetch_assignments, false);

        // fetch_assignments(access_token);

        return;
        
      }
    }

    // steps data
    document.getElementById("step_title").innerText =
      tasks_list.step_data.step_title;
      document.getElementById("step_title").title = tasks_list.assignment_id +', '+ tasks_list.step_id;
    document.getElementById("step_description").innerHTML =
      tasks_list.step_data.step_description;

    // components logic
    var step_media_box = document.getElementById("step_media_box");
    step_media_box.innerHTML = null;
    var step_description = document.getElementById("step_description");
    if (tasks_list.step_data.step_media) {
      step_media_box.innerHTML =
        "<img src=" + tasks_list.step_data.step_media + ' id="step_media">';
    }

    var components_box = document.getElementById("components_box");
    components_box.innerHTML = null;
    var components = tasks_list.step_data.components;
    for (var i = 0; i < components.length; i++) {
      if (components[i].type == "input-single") {
        components_box.innerHTML +=
          '<label class="tintin-label">' + components[i].label + "</label>";
        components_box.innerHTML +=
          '<input class="tintin-input"  id="' + components[i].id + '">';
      } else if (components[i].type == "input-multi") {
        components_box.innerHTML +=
          '<label class="tintin-label" >' + components[i].label + "</label>";
        components_box.innerHTML +=
          '<textarea rows="4" class="tintin-input tintin-textarea" id="' +
          components[i].id +
          '"></textarea>';
      } else {
        components_box.innerHTML +=
          "<" +
          components[i].type +
          ' style="background-color:' +
          components[i].color +
          '" id="' +
          components[i].action +
          '" class="tintin-btn components">' +
          components[i].label +
          "</" +
          components[i].type +
          ">";
      }
    }

    // extension tools
    if(tasks_list.step_data.extension_tools){
      if(tasks_list.step_data.extension_tools.length > 0){
      var extension_tools = tasks_list.step_data.extension_tools;
      if(extension_tools[0].tool == 'highlight-asin-in-search-results'){

        // sending message to content.js
        let params = {
          active: true,
          currentWindow: true,
        };
        chrome.tabs.query(params, highlight);

        function highlight(tabs) {
          let msg = {
            asin: extension_tools[0].asin,
            color: extension_tools[0].color,
            tool: extension_tools[0].tool
          };
          chrome.tabs.sendMessage(tabs[0].id, msg);
        }

      }else if(extension_tools[0].tool == 'copy-asin-from-search-results'){
        let params = {
          active: true,
          currentWindow: true,
        };
        chrome.tabs.query(params, highlight);

        function highlight(tabs) {
          let msg = {
            tool: extension_tools[0].tool,
            icon: tasks_list.step_data.step_media
          };
          chrome.tabs.sendMessage(tabs[0].id, msg);
        }

      }
      }

    }
    


    document.getElementById('report_bug').style.display = 'block';
    document.getElementById('task_reset').style.display = 'block';


    // event listener on components
    var elems = document.getElementsByClassName("components");
    for (var i = 0; i < elems.length; i++) {
      elems[i].addEventListener("click", component_click, false);
    }

    
  } else {
    window.location.href = "login.html";
  }
}

function component_click() {
  var tasks_list = localStorage.getItem("tasks_list");
  var access_token = localStorage.getItem("access_token");
  tasks_list = JSON.parse(tasks_list);
  var data_user = [];

  // logic for inputs required
  var components = tasks_list.step_data.components;
  for (var i = 0; i < components.length; i++) {
    if (
      components[i].type == "input-single" ||
      (components[i].type == "input-multi" && components[i].required == true)
    ) {
      if (document.getElementById(components[i].id).value == "" && this.getAttribute("id") == 'step_complete') {
        // alert(components[i].label + " is a required field");
        document.getElementById('message_box').style.display = 'block';
        document.getElementById('message_box').innerText = components[i].label + " is a required field";
        setTimeout(()=>{
          document.getElementById('message_box').style.display = 'none';
        }
        ,3000);
        return;
      } else {
        data_user.push({
          id: components[i].id,
          value: document.getElementById(components[i].id).value,
        });
      }
    }
  }
  
  var res_url = false;
  var html_content = false;
  // logic for validators
  if(tasks_list.step_data.validations){
    var validations = tasks_list.step_data.validations;
    for(var j=0; j < validations.length; j++){
      if(validations[j].type == 'send_html'){

        // sending message to content.js for url
        let params = {
          active: true,
          currentWindow: true,
        };
        chrome.tabs.query(params, url_exists);

        function url_exists(tabs) {
          let msg = {
            tool: 'url_exists'
          };
          chrome.tabs.sendMessage(tabs[0].id, msg);
        }

        chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
          if(msg.message.type == 'url'){
            var url_web = msg.message.url;
            res_url = url_web;
            url_web = url_web.replaceAll("+", " ");
            
            if(url_web.includes(validations[0].value)){
              

              // sending message to content.js for html
              let params = {
                active: true,
                currentWindow: true,
              };
              chrome.tabs.query(params, html_send);


              function html_send(tabs) {
                let msg = {
                  tool: 'send_html'
                };
                chrome.tabs.sendMessage(tabs[0].id, msg);
              }

            }
          }
          else if(msg.message.type == 'html_content'){
            html_content = msg.message.html;
          }
         
        });

      }
    }
  }

  if (data_user.length == 0) {
    data_user = false;
  }

  var step_id = this.getAttribute("id");
  var url = base_url + "assignment";
  var xhr2 = new XMLHttpRequest();
  xhr2.open("POST", url, true);
  xhr2.setRequestHeader("Content-Type", "application/json");
  xhr2.setRequestHeader("Authorization", "Bearer " + access_token);
  xhr2.setRequestHeader("Access-Control-Allow-Origin", "*");
  setTimeout(send_request,500);
  function send_request(){
    xhr2.send(
      JSON.stringify({
        version: "0.1.0",
        assignment_id: tasks_list.assignment_id,
        step_id: tasks_list.step_id,
        action: step_id,
        validated: true,
        data_user: data_user,
        data_debug: false,
        url: res_url,
        html: html_content
      })
    );
  }
  

  xhr2.onreadystatechange = function () {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
      // console.log(xhr2.responseText);
      if(step_id == "stop_confirmation_yes"){
        localStorage.setItem("tasks_list", null);
        start_now_function();
      }
      else{
        localStorage.setItem("tasks_list", xhr2.responseText);
        start_now_function();
      }
      
    } else if (xhr2.status == 202) {
      // tasks completed
      localStorage.removeItem("tasks_list");
      localStorage.removeItem("Timer");
      localStorage.setItem("tasks_list",null);
      document.getElementById("step_title").innerText = "Done!";
      document.getElementById("step_title").title = 'none';
      document.getElementById("step_description").innerHTML =
        "You've completed this assignment &#127881;";
      document.getElementById('report_bug').style.display = 'none';
      document.getElementById('task_reset').style.display = 'none';

      var components_box = document.getElementById("components_box");
      components_box.innerHTML = null;
       document.getElementById("components_box").innerHTML +=
      '<button style="background-color:#f59e0b;color:white" id="new_assignment" class="tintin-btn components">More</button>';
      document.getElementById("new_assignment").addEventListener("click", fetch_assignments, false);

      var step_media_box = document.getElementById("step_media_box");
      step_media_box.innerHTML = null;
    }else if(xhr2.status > 203){
      var err = JSON.parse(xhr2.responseText);

      if(err.code == '98b7sg'){
        localStorage.removeItem("tasks_list");
        localStorage.removeItem("Timer");
        localStorage.setItem("tasks_list",null);
        document.getElementById("step_title").innerText = "ERROR!";
        document.getElementById("step_title").title = 'none';
        document.getElementById("step_description").innerHTML = err.msg;
        document.getElementById('report_bug').style.display = 'none';
        document.getElementById('task_reset').style.display = 'none';

        var components_box = document.getElementById("components_box");
        components_box.innerHTML = null;
         document.getElementById("components_box").innerHTML +=
        '<button style="background-color:#f59e0b;color:white" id="new_assignment" class="tintin-btn components">Load</button>';
        document.getElementById("new_assignment").addEventListener("click", fetch_assignments, false);

        var step_media_box = document.getElementById("step_media_box");
        step_media_box.innerHTML = null;
      }else{
        document.getElementById('message_box').style.display = 'block';
        document.getElementById('message_box').style.backgroundColor = 'red';
        document.getElementById('message_box').innerText = "Error Status: "+xhr2.status+', Code: '+err.code+', Msg: '+err.msg;
        setTimeout(()=>{
          document.getElementById('message_box').style.display = 'none';
        }
        ,5000);
      }
      
     
      return;
      
    }
  };
}

function fetch_assignments(access_token) {
  var access_token = localStorage.getItem("access_token");

  var url = base_url + "assignment";
  var xhr1 = new XMLHttpRequest();
  xhr1.open("POST", url, true);
  xhr1.setRequestHeader("Content-Type", "application/json");
  xhr1.setRequestHeader("Authorization", "Bearer " + access_token);
  xhr1.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr1.send(
    JSON.stringify({
      version: "0.1.0",
      new_assignment: true,
    })
  );

  xhr1.onreadystatechange = function () {
    if (xhr1.readyState == 4 && xhr1.status == 200) {
      console.log(xhr1.responseText);
      localStorage.setItem("tasks_list", xhr1.responseText);
      tasks_list = JSON.parse(xhr1.responseText);
      if(!localStorage.getItem("old_id")){
        localStorage.setItem("old_id",0);
      }
      if(!tasks_list.assignment_id){
        localStorage.setItem("new_id",localStorage.getItem("old_id"));
        localStorage.removeItem("Timer");
      }else{
        localStorage.setItem("new_id",tasks_list.assignment_id);
      }
     
      if(localStorage.getItem("old_id") != localStorage.getItem("new_id")){
        localStorage.setItem("Timer",tasks_list.timeout);  
        localStorage.setItem("old_id",localStorage.getItem("new_id")); 
      }
       
      window.location.href = "popup.html";
      // return true;
    }
  };
  // return 'error';
}

function login_button_function(e) {
  e.preventDefault();
  document.getElementById("login_button").style.display = "none";
  var username = document.getElementById("username_login").value;
  var password = document.getElementById("password_login").value;
  var message_box = document.getElementById("login_message");

  if (username.length < 1 || password.length < 1) {
    message_box.innerText = "Username and Password Required";
    message_box.style.display = "block";
    document.getElementById("login_button").style.display = "block";
    return;
  }

  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,7})+$/;
  if (!username.match(mailformat)) {
    message_box.innerText = "Not Valid Email Address";
    message_box.style.display = "block";
    document.getElementById("login_button").style.display = "block";
    return;
  }

  var url = "https://dev.candidshopper.com/api-extension/auth";

  var xhr = new XMLHttpRequest();
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(
    JSON.stringify({
      username: username,
      password: password,
    })
  );

  xhr.onreadystatechange = function () {
    var res = null;
    if (xhr.readyState == 4 && xhr.status == 200) {
      res = JSON.parse(xhr.responseText);
      console.log(res.msg);
      localStorage.setItem("access_token", res.access_token);
      localStorage.setItem("refresh_token", res.refresh_token);
      fetch_assignments(res.access_token);
    } else {
      res = JSON.parse(xhr.responseText);
      console.log(res.msg);
    }
    message_box.innerText = res.msg;
    message_box.style.display = "block";
  };

  document.getElementById("login_button").style.display = "block";
}

function auth_refresh() {
  // e.preventDefault();
  var refresh_token = localStorage.getItem("refresh_token");
  var url = base_url + "auth-refresh";
  var xhr4 = new XMLHttpRequest();
  xhr4.open("POST", url, true);
  xhr4.setRequestHeader("Content-Type", "application/json");
  xhr4.setRequestHeader("Authorization", "Bearer " + refresh_token);
  xhr4.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr4.send();

  xhr4.onreadystatechange = function () {
    if (xhr4.readyState == 4 && xhr4.status == 200) {
      localStorage.setItem(
        "access_token",
        JSON.parse(xhr4.responseText).access_token
      );
      // call function again with new token
    } else {
    }
  };
}

// function check_auth() {
//   var access_token = localStorage.getItem("access_token");
//   var refresh_token = localStorage.getItem("refresh_token");

//   if (access_token == null || refresh_token == null) {
//     document.getElementById("logout_button").style.display = "none";
//     document.getElementById("feedback_button").style.display = "none";
//   } else {
//     document.getElementById("start_now_button").innerText = "LOAD ASSIGNMENT";
//     auth_refresh();
//     start_now_function();
//   }
// }

function feedback_button_function() {
  document.getElementById("step_title").innerText =
    "We'd love to hear from you.";
  document.getElementById("step_description").innerHTML =
    "Any thoughts or feedback? Please let us know and we promise that we'll take it into consideration to improve our user experience.";
  document.getElementById("step_media_box").innerHTML = null;
  document.getElementById("components_box").innerHTML = null;
  // style changes
  document.getElementById("mascot_pose").style.display = "none";
  document.getElementById("circle_graphics").style.display = "none";
  // document.getElementById("bubble_graphics").style.display = "none";
  document.getElementById("start_now_button").style.display = "none";
  document.getElementById('report_bug').style.display = 'none';
  document.getElementById('task_reset').style.display = 'none';



  document.getElementById("components_box").innerHTML =
    '<textarea rows="6" class="tintin-input tintin-textarea" id="feedback"></textarea>';
  document.getElementById("components_box").innerHTML +=
    '<button style="background-color:#f59e0b;color:white" id="feedback_submit" class="tintin-btn components">Submit</button>';
    document.getElementById("components_box").innerHTML +=
    '<button style="background-color:#f59e0b;color:white" id="feedback_back" class="tintin-btn components">Back</button>';
  document.getElementById("feedback_submit").addEventListener("click", feedback_submit_function, false);
  document.getElementById("feedback_back").addEventListener("click", fetch_assignments, false);

}

function feedback_submit_function() {
  feedback_text = document.getElementById("feedback").value;
  if (feedback_text == "") {
    document.getElementById('message_box').style.display = 'block';
    document.getElementById('message_box').innerText = "Feedback field is required";
    setTimeout(()=>{
      document.getElementById('message_box').style.display = 'none';
    }
    ,3000);
    return;
  }
  document.getElementById("feedback_submit").style.display = "none";
  var access_token = localStorage.getItem("access_token");
  var url = base_url + "feedback";
  var xhr2 = new XMLHttpRequest();
  xhr2.open("POST", url, true);
  xhr2.setRequestHeader("Content-Type", "application/json");
  xhr2.setRequestHeader("Authorization", "Bearer " + access_token);
  xhr2.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr2.send(
    JSON.stringify({
      version: "0.1.0",
      msg_feedback: feedback_text,
    })
  );

  xhr2.onreadystatechange = function () {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
      console.log(xhr2.responseText);
      document.getElementById('message_box').style.display = 'block';
      document.getElementById('message_box').innerText = "Got it! Thanks for your feedback";
      setTimeout(()=>{
        document.getElementById('message_box').style.display = 'none';
        start_now_function()
      }
      ,3000);
    } else {
      console.log(xhr2.responseText);
    }
  };
}

function report_bug_button() {
  document.getElementById("step_title").innerText = "Report A Bug";
  document.getElementById("step_description").innerHTML =
    "Please describe the issue in as much detail as possible.";
  document.getElementById("step_media_box").innerHTML = null;
  document.getElementById("components_box").innerHTML = null;
  // style changes
  document.getElementById("mascot_pose").style.display = "none";
  document.getElementById("circle_graphics").style.display = "none";
  // document.getElementById("bubble_graphics").style.display = "none";
  document.getElementById("start_now_button").style.display = "none";
  document.getElementById('report_bug').style.display = 'none';
  document.getElementById('task_reset').style.display = 'none';



  document.getElementById("components_box").innerHTML =
    '<textarea rows="6" class="tintin-input tintin-textarea" id="bug"></textarea>';
  document.getElementById("components_box").innerHTML +=
    '<button style="background-color:#f59e0b;color:white" id="bug_submit" class="tintin-btn components">Submit</button>';
    document.getElementById("components_box").innerHTML +=
    '<button style="background-color:#f59e0b;color:white" id="bug_back" class="tintin-btn components">Back</button>';
  document.getElementById("bug_submit").addEventListener("click", bug_submit_button, false);
  document.getElementById("bug_back").addEventListener("click", fetch_assignments, false);

}

function bug_submit_button() {
  bug_text = document.getElementById("bug").value;
  var tasks_list = localStorage.getItem("tasks_list");
  tasks_list = JSON.parse(tasks_list);
  if (bug_text == "") {
    document.getElementById('message_box').style.display = 'block';
    document.getElementById('message_box').innerText = "Bug Feedback field is required";
    setTimeout(()=>{
      document.getElementById('message_box').style.display = 'none';
    }
    ,3000);
    return;
  }
  document.getElementById("bug_submit").style.display = "none";
  var access_token = localStorage.getItem("access_token");
  var url = base_url + "report-issue";
  var xhr2 = new XMLHttpRequest();
  xhr2.open("POST", url, true);
  xhr2.setRequestHeader("Content-Type", "application/json");
  xhr2.setRequestHeader("Authorization", "Bearer " + access_token);
  xhr2.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr2.send(
    JSON.stringify({
      version: "0.1.0",
      msg_issue: bug_text,
      assignment_id: tasks_list.assignment_id,
      step_id: tasks_list.step_id,
    })
  );

  xhr2.onreadystatechange = function () {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
      console.log(xhr2.responseText);
      document.getElementById('message_box').style.display = 'block';
      document.getElementById('message_box').innerText = "Got it! Thanks for your feedback";
      setTimeout(()=>{
        document.getElementById('message_box').style.display = 'none';
        start_now_function()
      }
      ,3000);
      
    } else {
      // console.log(xhr2.responseText);
    }
  };
}

function task_reset_function(){
   document.getElementById("step_title").innerText = "Reset assignment";
  document.getElementById("step_description").innerHTML =
    "Are you sure you want to reset this assignment?";
  document.getElementById("step_media_box").innerHTML = null;
  document.getElementById("components_box").innerHTML = null;
  // style changes
  document.getElementById("mascot_pose").style.display = "none";
  document.getElementById("circle_graphics").style.display = "none";
  // document.getElementById("bubble_graphics").style.display = "none";
  document.getElementById("start_now_button").style.display = "none";
  document.getElementById('report_bug').style.display = 'none';
  document.getElementById('task_reset').style.display = 'none';



  document.getElementById("components_box").innerHTML +=
    '<button style="background-color:#f59e0b;color:black" id="reset_tasks_yes" class="tintin-btn components">Reset</button>';
    document.getElementById("components_box").innerHTML +=
    '<button style="background-color:#00FF00;color:black" id="reset_tasks_no" class="tintin-btn components">No</button>';
  document.getElementById("reset_tasks_yes").addEventListener("click", reset_tasks_yes_function, false);
  document.getElementById("reset_tasks_no").addEventListener("click", start_now_function, false);

}

function reset_tasks_yes_function(){
  document.getElementById('reset_tasks_yes').style.display = 'none';
  document.getElementById('reset_tasks_no').style.display = 'none';
  var tasks_list = localStorage.getItem("tasks_list");
  tasks_list = JSON.parse(tasks_list);
  var access_token = localStorage.getItem("access_token");
  var step_id = this.getAttribute("id");
  var url = base_url + "assignment";
  var xhr2 = new XMLHttpRequest();
  xhr2.open("POST", url, true);
  xhr2.setRequestHeader("Content-Type", "application/json");
  xhr2.setRequestHeader("Authorization", "Bearer " + access_token);
  xhr2.setRequestHeader("Access-Control-Allow-Origin", "*");
  xhr2.send(
    JSON.stringify({
      version: "0.1.0",
      assignment_id: tasks_list.assignment_id,
      step_id: tasks_list.step_id,
      action: 'step_reset',
      validated: "true",
      data_user: "false",
      data_debug: "false",
    })
  );

  xhr2.onreadystatechange = function () {
    if (xhr2.readyState == 4 && xhr2.status == 200) {
      localStorage.removeItem("tasks_list");
      localStorage.setItem("tasks_list", xhr2.responseText);
      // console.log(xhr2.responseText);
      document.getElementById('message_box').style.display = 'block';
      document.getElementById('message_box').innerText = "Done!";
      setTimeout(()=>{
        document.getElementById('message_box').style.display = 'none';
        start_now_function()
      }
      ,3000);
      
    } else {
      // console.log(xhr2.responseText);
    }
  };
}

function body_function(e){

  var container = document.getElementById('toggleActive');
    if (!container.contains(e.target)) {
        document.getElementById('toggleContainer').style.display = 'none';
    }else{
        document.getElementById('toggleContainer').style.display = 'flex';
    }
}


function logout_button_function() {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
  localStorage.removeItem("tasks_list");

  window.location.href = "login.html";
}

if (document.querySelector(".toggleBtn")) {
  document.querySelector(".toggleBtn").addEventListener("click", () => {
    let toggleMenu = document.querySelector(".toggleContainer");

    if (toggleMenu.classList.contains("toggleActive")) {
      toggleMenu.classList.remove("toggleActive");
    } else {
      toggleMenu.classList.add("toggleActive");
    }
  });
}
