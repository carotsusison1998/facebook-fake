var socket = "";
var api_get_message = "";
if(document.domain === "localhost"){
	socket = io("http://localhost:9999");
	api_get_message = "http://localhost:9999/api/get-message-all";
}else{
	socket = io("https://zingme.herokuapp.com/");
	api_get_message = "https://zingme.herokuapp.com/api/get-message-all";
}

// Accordion
function myFunction(id) {
  var x = document.getElementById(id);
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
    x.previousElementSibling.className += " w3-theme-d1";
  } else { 
    x.className = x.className.replace("w3-show", "");
    x.previousElementSibling.className = 
    x.previousElementSibling.className.replace(" w3-theme-d1", "");
  }
}

// Used to toggle the menu on smaller screens when clicking on the menu button
function openNav() {
  var x = document.getElementById("navDemo");
  if (x.className.indexOf("w3-show") == -1) {
    x.className += " w3-show";
  } else { 
    x.className = x.className.replace(" w3-show", "");
  }
}

function checkURLExist(url){
  var request = new XMLHttpRequest();  
  request.open('GET', url, true);
  request.onreadystatechange = function(){
    if (request.readyState === 4){
        if (request.status === 404) {  
            alert("Oh no, it does not exist!");
        }else{
          return url;
        }
    }
  };
  request.send();
}
async function showFormChat(person_send_id, person_recieve_id, data = null){
	const html =  "<div class='form-chat chat-"+person_send_id+" form-chat-"+person_recieve_id+"'>"+
							"<form>"+
								"<input type='hidden' id='person_send_id' value='"+person_send_id+"'>"+
								"<input type='hidden' id='person_recieve_id' value='"+person_recieve_id+"'>"+
								"<div class='form-chat-header'>"+
									"<div>"+
										"<img class='avatar' src='/images/avatar2.png'/>"+
										"<span>Nhi Nguyễn</span>"+
									"</div>"+
									"<div>"+
										"<i class='fa fa-close close-form-chat' data-person_recieve_id='"+person_recieve_id+"'></i>"+
									"</div>"+
								"</div>"+
								"<div class='form-chat-content'>"+
									await renderMessage(person_send_id, person_recieve_id) +
								"</div>"+
								"<div class='form-chat-footer'>"+
									"<textarea name='' class='content-message' placeholder='nhập nội dung'></textarea>"+
									"<input type='button' class='send-message' value='Gửi'>"+
								"</div>"+
							"</form>"+
						"</div>";
	$("#body-content .list-form-chat").append(html);
}

$(".acctionShow").click( async function(){
	if($("#body-content .list-form-chat .form-chat").length >= 1 || $(".form-chat.form-chat-"+$(this).data('person_recieve_id')).length > 0){
		return;
	}
	console.log("runing");
	await showFormChat($(this).data('person_send_id'), $(this).data('person_recieve_id'));
	await closeFormChat();
	await sendMessageForAll();
	await handleKeyUp();
	$(".form-chat-content").animate({ scrollTop: $('.form-chat-content').prop("scrollHeight")}, 0);
});
function handleKeyUp(){
	$(".content-message").keyup(function(){
		const personSendId = $("#person_send_id").val();
		const personRecieveId = $("#person_recieve_id").val();
		const objectDataMessage = {
			personSendId: personSendId,
			personRecieveId: personRecieveId,
		};
		socket.emit("cl-send-keyup", objectDataMessage);
	});
}
function closeFormChat(){
	$(".close-form-chat").click(function(){
		var element = "form-chat-"+$(this).data('person_recieve_id');
		$("."+element).remove();
	})
}
function sendMessageForAll(){
	$(".send-message").click(function(e){
		e.preventDefault();
		const message = $(".content-message").val();
		const personSendId = $("#person_send_id").val();
		const personRecieveId = $("#person_recieve_id").val();
		const objectDataMessage = {
			message: message,
			personSendId: personSendId,
			personRecieveId: personRecieveId,
			timeSendMessage: new Date(Date.now()).toLocaleString("en-GB")
		};
		socket.emit("cl-send-message", objectDataMessage);
		$(".content-message").val("");
	})
}

async function renderMessage(person_send_id, person_recieve_id){
	const data = await callContentMessage(person_send_id, person_recieve_id);
	let htmlRender = ""
	data.data.map(function(item){
		if(item.personSendId === person_send_id){
			htmlRender = htmlRender + "<p class='message message-send'><span>"+item.message+"</span></p>"
		}else{
			htmlRender = htmlRender + "<p class='message message-receive'><span>"+item.message+"</span></p>"
		}
	});
	return htmlRender;
}
async function callContentMessage(person_send_id, person_recieve_id){
	let result = [];
	await $.ajax({
        url: api_get_message,
		type: "POST",
		data: {
			person_send_id: person_send_id,
			person_recieve_id: person_recieve_id
		},
        success: function(data){
			result = data;
        }
    });
	return result;
}