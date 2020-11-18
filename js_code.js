var usrText = $('#usertext');
var auto = false;

var convid = '';
// Internet Explorer 6-11
var isIE = /* @cc_on!@ */false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';
/* var micOpen=false; */
$(document)
		.ready(
				function() {
					 var timestamp =moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
					 var timezone=moment(new Date()).format("Z").replace('+',' +');
					 var conv_id='';
					var listDisplay = false;
					var keywords = "";
					var getConvCount = 0;
					var query_count = 0;
					var query_hindi ="";
					document.getElementById('sugUL').style.display = "none";
					// $('#sugUL').hide();
					// $('#sugUL').css('display','none');
					/* var userName = $("#username").val(); */
					/*
					 * $('#myMicModal').modal('show');
					 * 
					 * micOpen=true; message.text('Press mic button & Speak');
					 * 
					 * micOpen=false; });
					 */

					if (navigator.platform == 'iPad'
							|| navigator.platform == 'iPhone'
							|| navigator.platform == 'iPod'
							|| navigator.platform == 'Linux armv6l') {
						$('.chattextbar').css('position', 'absoute');
						window.ontouchstart = function() {
							$('.chattextbar').css('position', 'absoute');
						}

						window.onscroll = function() {
							var iPadPosition = window.innerHeight
									+ window.pageYOffset - 45; // 45 is the
							// height of the
							// Footer
							$(".chattextbar").css("position", "absolute");
							$(".chattextbar").css("top", iPadPosition);
							$(".chattextbar").css("display", "block");
						}
					}

					$("#usertext").on("keypress", function(e) {
						if (e.which === 32 && !this.value.length) {
							e.preventDefault();
							usrText.removeClass('micOpen');
							if (isIE == false && isFirefox == false) {
								// synth.cancel();
								synth.cancel()
								if (typeof audio != 'undefined') {
									audio.stop();
								}
							}
						}
					});

					var botContainerPre = '<div class="chat-message chat-message-recipient animated fadeIn">'
							+ '<img class="chat-image chat-image-default" src="resources/images/aviva/alisha_1.png">';
					var botContainerPost = '</div>';
					var userContainerPre = '<div class="chat-message chat-message-sender animated fadeInRight">'
							+ '<div class="senderLetter">f</div>'
							+ '<div class="chat-message-wrapper">'
							+ '<div class="chat-message-content">';
					var userContainerPost = '</div></div></div>';
					var res = "";

					function userContainer() {
						var userImg = '<div class="chat-message chat-message-sender animated fadeInRight">'
								+ '<img class="chat-image chat-image-default" src="resources/images/chat/user2.png">'
								+ '<div class="chat-message-wrapper">'
								+ '<div class="chat-message-content">';
						var userName = $("#username").val();
						/*
						 * if(userName.length >= 1){ userImg ='<div
						 * class="chat-message chat-message-sender animated
						 * fadeInRight">'+ '<div
						 * class="senderLetter">'+userName.charAt(0)+'</div>'+ '<div
						 * class="chat-message-wrapper">'+ '<div
						 * class="chat-message-content">'; }
						 */
						return userImg;
					}

					$('#ref').click(function() {
						query_count = 0;
						$('#ref').addClass("disableMouseEvent");
						$('.dropdown').addClass("disableMouseEvent");
						$('.message-container').html('');
						$('#usertext').val('');
						$('#form-message').addClass("disableMouseEvent");
						$('#overlayforchat').addClass('overlaychat');
						geturl();
						$('#usertext').removeClass('disableMouseEvent');

						// $('#sugUL').empty();
						// $('#sugUL').html('');
						usrText.removeClass('micOpen');
						if (isIE == false && isFirefox == false) {
							synth.cancel();
							recognition.stop();
							if (typeof audio != 'undefined') {
								audio.stop();
							}
						}

					});

					$('#img_upload')
							.click(
									function() {

										document
												.querySelector(
														'input[type="file"]')
												.addEventListener(
														'change',
														function() {
															if (this.files
																	&& this.files[0]) {
																/*
																 * var img =
																 * document.querySelector('img');
																 */// $('img')[0]
																var url = URL
																		.createObjectURL(this.files[0]); // set
																// src
																// to
																// file
																// url
																document
																		.getElementById('myImg').src = url;
																var imgg = document
																		.getElementById('myImg');
																imgg.style.visibility = 'visible';
																imgg.style.height = '100px';
																imgg.style.width = '200px';
																getConversation('image_uploaded_succcessfully');

															}
														});
									});

					$("form")
							.on(
									'submit',
									function(e) {
										query_count = query_count + 1;
										var reg = new RegExp(
												"[~!#$%^(){}\"<>|]"); // <(.|\n)*?>
										$("#usertext").val().replace('\'', '');
										$("#usertext").removeClass("auto-5");
										$("#sugUL").hide();
										usrText.removeClass('micOpen');
										if (isIE == false && isFirefox == false) {
											synth.cancel();
											if (typeof audio != 'undefined') {
												audio.stop();
											}
										}

										if (reg.test($("#usertext").val()) === true) {
											var pre = '<div class="chat-message chat-message-recipient animated fadeIn abc">'
													+ '<img class="chat-image chat-image-default" src="resources/images/aviva/alisha_1.png">'
													+ '<div class="chat-message-wrapper">'
													+ '<div class="chat-message-content">'
											var error = pre
													+ "Please enter valid query."
													+ botContainerPost;
											$('.message-container').append(
													error);
											$('.abc').delay(3000).fadeOut(
													'blind');
											$("#style-3")
													.animate(
															{
																scrollTop : $(
																		'#style-3')
																		.prop(
																				"scrollHeight")
															}, 1000);
											$('#usertext').val('');
											if (screen.width > 480) {
												$("#usertext").focus();
											}
											e.preventDefault();
										} else if ($("#usertext").val() === '') {
											var pre = '<div class="chat-message chat-message-recipient animated fadeIn abc">'
													+ '<img class="chat-image chat-image-default" src="resources/images/aviva/alisha_1.png">'
													+ '<div class="chat-message-wrapper">'
													+ '<div class="chat-message-content">'
											var error = pre
													+ "Please enter your question"
													+ botContainerPost;
											$('.message-container').append(
													error);
											$('.abc').delay(3000).fadeOut(
													'blind');
											$("#style-3")
													.animate(
															{
																scrollTop : $(
																		'#style-3')
																		.prop(
																				"scrollHeight")
															}, 1000);
											$('#usertext').val('');
											if (screen.width > 480) {
												$("#usertext").focus();
											}
											e.preventDefault();
										} else if ($("#usertext").val().length > 512) {
											var pre = '<div class="chat-message chat-message-recipient animated fadeIn abc">'
													+ '<img class="chat-image chat-image-default" src="resources/images/aviva/alisha_1.png">'
													+ '<div class="chat-message-wrapper">'
													+ '<div class="chat-message-content">'
											var error = pre
													+ "Character limit exceeds"
													+ botContainerPost;
											$('.message-container').append(
													error);
											$('.abc').delay(3000).fadeOut(
													'blind');
											$("#style-3")
													.animate(
															{
																scrollTop : $(
																		'#style-3')
																		.prop(
																				"scrollHeight")
															}, 1000);
											$('#usertext').val('');
											if (screen.width > 480) {
												$("#usertext").focus();
											}
											e.preventDefault();
										} else {
											$('.irs').addClass(
													"disableMouseEvent");
											$('#datetimepicker11').addClass(
													"disableMouseEvent");
											$('.dateid:last').addClass(
													"disableMouseEvent");
											$('#form-message').addClass(
													"disableMouseEvent");
											$('#overlayforchat').addClass(
													'overlaychat');
											// $('#sugUL').empty();
											letsChat();
											e.preventDefault();
											$('#usertext').removeClass(
													"disableMouseEvent");
										}
									});

					/*
					 * function get_selected_checkboxes_array(){ var
					 * ch_list=Array();
					 * $("input:checkbox[type=checkbox]:checked").each(function(){
					 * ch_list.push($(this).val()); }); alert(ch_list); }
					 */

					$("input.nameinput").keypress(function(event) {
						if (event.which == 13) {
							$("#submitName").click();
						}
					});

					$("#submitName")
							.on(
									'click',
									function(e) {
										var m_data = document
												.getElementById("username").value;
										var c_data = document
												.getElementById("cc-dropdown").value;

										var url_link = document.referrer;

										var checkUn = hasWhiteSpace(m_data);
										if (checkUn == true) {
											geturl();
											var cc = "";
											var input = "start";
											$
													.ajax(
															{
																url : "api/v1/phoneAuth",
																method : "GET",
																crossDomain : true,
																// async:false,
																data : {
																	phone : m_data,
																	key : key,
																	country_code : c_data,
																	sessionid : res,
																	date : moment(
																			new Date())
																			.format(
																					"YYYY-MM-DD HH:mm:ss"),
																	// sessionid:res,
																	timezone : moment(
																			new Date())
																			.format(
																					"Z"),
																	url : url_link
																},
																beforeSend : function() {
																	$(
																			'#submitName')
																			.html(
																					'Authenticating <div style="max-width:15px;display:inherit;line-height:10px;min-width:15px;"><span style="float:left;" id="authLoad"></span></div>');
																	$(
																			'#username')
																			.prop(
																					'disabled',
																					true);
																	$(
																			'#submitName')
																			.prop(
																					'disabled',
																					true);
																	$(
																			'#cc-dropdown')
																			.prop(
																					'disabled',
																					true);
																}
															})
													.done(
															function(data,
																	status) {
																if (data === 'ERROR'
																		&& _client
																				.getOs() === 'iOS') {
																	$(
																			'#iosErrorModel')
																			.modal(
																					{
																						show : 'true',
																						backdrop : 'static',
																						keyboard : false
																					});
																}
																var obj = $
																		.parseJSON(data);
																$(
																		'#myEnterNameModal')
																		.modal(
																				'hide');
																msg = obj.message;
																input = "";
																if (msg == 'positive') {
																	input = "start";
																	getConversation(input)
																	showfinalchatbox();
																} else if (msg == 'duplicate found in DataBase') {
																	var reply = obj.consultant_info;
																	var status = obj.ownerStatus;

																	if (status == 'inactive') {
																		input = "reg_e_id";
																		getConversation(input)
																		showfinalchatbox();
																	} else {
																		$(
																				'.message-container')
																				.append(
																						reply);
																		$(
																				'#loading')
																				.hide();
																		$(
																				"#usertext")
																				.attr(
																						"disabled",
																						"disabled");
																		$(
																				'#overlayforchat')
																				.addClass(
																						'overlaychat');

																	}
																} else {
																	var error = '<div class="chat-message chat-message-recipient animated fadeIn">'
																			+ '<img class="chat-image chat-image-default" src="resources/images/aviva/alisha_1.png">'
																			+ '<div class="chat-message-wrapper">'
																			+ '<div class="chat-message-content">'
																			+ 'Invalid Access to Service'
																			+ '</div>'
																			+ '</div>'
																			+ '</div>';
																	$(
																			'.message-container')
																			.append(
																					error);
																	$(
																			"#usertext")
																			.attr(
																					"disabled",
																					"disabled");
																	$(
																			'#overlayforchat')
																			.addClass(
																					'overlaychat');
																	// $('#sugUL').empty();
																}

															});
										} else {
											$('.errormessage')
													.empty()
													.html(
															'Please enter valid mobile number.<script>setTimeout(function(){$(\'.errormessage\').empty()},7000)</script>');
											$('#username').focus();
										}

									});

					$("#skipName").on('click', function(e) {
						$("#username").val('');
						geturl();
						showfinalchatbox();
					});

					$('#myEnterNameModal').on('shown.bs.modal', function() {
						$('#myEnterNameModal').css('display', 'block');
						$("#username").focus();

					})

					$('#error_refresh').on('click', function() {
						$('.spinner').css('display', 'block');
						document.location.reload();
						$('.spinner').hide();
					});

					function letsChat() {

						var userio = $('#usertext').val();
						userContainerPre = userContainer();
						var user = userContainerPre + userio
								+ userContainerPost
						$("#style-3").animate({
							scrollTop : $('#style-3').prop("scrollHeight")
						}, 1000);
						$('#usertext').val('');
						getConv(userio);
						$('.yesnobtn').addClass("disableMouseEvent");
						$(".maleBtn1").addClass("disableMouseEvent");
						$(".femaleBtn1").addClass("disableMouseEvent");
						$('.irs').addClass("disableMouseEvent");
						$('#datetimepicker11').addClass("disableMouseEvent");
						$('.dateid:last').addClass("disableMouseEvent");
						$('#usertext').removeClass("disableMouseEvent");

					}

					function geturl() {
						 $.ajax({
							  url:'login',
							  method:'post',
							  data:'{"token":"'+token+'"}',
							  contentType:'application/json;charset=utf-8',
							  dataType:'json',
							  success:function(data){
								  login_details=data;
								  saveclientData(data.sessionid);
								  getConversation('start');
							  },
							 
						  });
								

						/*$
								.ajax({
									url : "api/v1/url.do",
									method : "GET",
									async : false,
									crossDomain : true,
									data : {
										url_data : url_link,
										sessionId : res,
										key : key
									},
									success : function(data) {
										var status = data;
										var JsonObject = JSON.parse(data);
										for (var i = 0; i < JsonObject.jArray.length; i++) {
											var json_data = JsonObject.jArray[i];
											$('#idw').html(json_data.id);
											var url = document.referrer;
											$('#url').html(url);
											var p = json_data.plan;
											if (p != "") {
												$('#overlayforchat').addClass(
														'overlaychat');*/
												//getConversation("start");
											/*	// initSTTEngine();
											} else {
												var error = '<div class="chat-message chat-message-recipient animated fadeIn">'
														+ '<img class="chat-image chat-image-default" src="resources/images/aviva/alisha_1.png">'
														+ '<div class="chat-message-wrapper">'
														+ '<div class="chat-message-content">'
														+ 'Invalid Access to Service'
														+ '</div>'
														+ '</div>'
														+ '</div>';
												$('#loading').hide();
												$('.message-container').append(
														error);
												$('#overlayforchat').addClass(
														'overlaychat');
												// $('#sugUL').empty();
											}
										}
									},
									error : function(xhr, ajaxOptions,
											thrownError) {
										var error = botContainerPre
												+ "Invalid Access to Service"
												+ botContainerPost
										$('.message-container').append(error);
										$("#style-3")
												.animate(
														{
															scrollTop : $(
																	'#style-3')
																	.prop(
																			"scrollHeight")
														}, 1000);
									}
								});*/
					}

					function getConversation(userio) {
						var userName = $("#username").val();
					
						// $('#sugUL').empty();
						// $('#sugUL').html('');
						$('#sugUL').hide();
						$('#loading').delay(100).show();
						$('.checkOpt').prop('disabled', true);
						$('#checkBtn label.container').attr('disabled', true);
						$("#usertext").attr("disabled", "disabled");
						$(".dropdown").addClass("disableMouseEvent");
						$('.allbtn-1').addClass("disableMouseEvent");

						// $('#startDate').datetimepicker('show');
						// var userName = getCookie("username");
						if (isIE == false && isFirefox == false) {
							synth.cancel();
							if (typeof audio != 'undefined') {
								audio.stop();
							}
						}
						var userName = $("#username").val();
						var cc = $("#cc-dropdown").val();
						var url_link = document.referrer;
						 var payload={};
						 payload['message']=userio;
						 payload['token']=token;
						 payload['session_id']=login_details.sessionid;
						 payload['conv_timestamp']=timestamp;
						 payload['conv_timezone']=timezone;
						 payload['conv_id']=conv_id;
						 payload['url_data'] = document.referrer;
						 payload['username'] = userName;
						 payload['query_hindi'] = query_hindi;
						 $.ajax({
							 url:'conversation',
							 method:'POST',
							 data:JSON.stringify(payload),
							 contentType:'application/json;charset=utf-8',
							 dataType:'json',
							 success:function(data){
								 
							     conv_id=data.conv_id;
								 var msg = data.message;
								 botio = msg;
									
								botio = decodeURIComponent(botio);
								botio = botio.replace(
											/\+/g," ").replace(/~/g,
											"\"").replace('%2F', '/').replace('%3A',':').replace('%24','').replace('{name}',userName).replace('%2B','+').replace('&plus;','+');
											

										/* data = data.replace(/~/g, "\""); */

										/*
										 * var suggestion = obj.suggestiones;
										 * if(suggestion != ""){
										 * $('.chattextbar').prepend(suggestion); }
										 * else{ if( $('#sugUL').length ) // use
										 * this if you are using id to check {
										 * $('#sugUL').remove(); } }
										 */

										/*
										 * var
										 * botio=botContainerPre+data+botContainerPost;
										 */
										$('#loading').hide();
										$('.message-container').append(botio);
										$("#usertext").removeAttr("disabled");
										if (screen.width > 480) {
											$("#usertext").focus();
										}
										$("#send").removeAttr("disabled");
										$('#usertext').removeAttr('readonly');
										$("#send").removeClass(
												"disableMouseEvent");
										$(".dropdown").removeClass(
												"disableMouseEvent");
										$('#ref').removeClass(
												"disableMouseEvent");
										$('#send').removeClass('flash-button');
										$('#overlayforchat').removeClass(
												'overlaychat');
										$('#form-message').removeClass(
												"disableMouseEvent");
										$("#style-3")
												.animate(
														{
															scrollTop : $(
																	'#style-3')
																	.prop(
																			"scrollHeight")
														}, 1000);

										// $('#StartDate').addClass('disableMouseEvent');
										/*
										 * if(query_count>=1){
										 * $(".fimage").removeClass('disableMouseEvent'); }
										 */
										/*
										 * console.log(JSON.stringify(obj)+':\n'+obj.speech);
										 * showBotSpeech(obj.speech);
										 */
										/*if (isIE == false && isFirefox == false) {
											speakLoud(obj.speech);
										}*/
									},
									error : function(xhr, ajaxOptions,
											thrownError) {
										// alert(xhr.status+" : Session
										// Expired");

										$('#errormodel').modal({
											show : 'true',
											backdrop : 'static',
											keyboard : false
										});
									}
								});
						 query_hindi="";
					}
					window.suggestion = function(text, auto) {
						// $('#usertext').removeClass('auto-5');
						var userName = $("#username").val();
						if (auto == true && ($('#usertext').hasClass("auto-5"))) {
							$
									.ajax({
										async : true,
										crossDomain : true,
										url : "api/v1/getSuggestion",
										method : "POST",
										data : {
											query : text,
											username : userName,
											key : key
										},
										success : function(data) {

											var obj = $.parseJSON(data);
											var sugList = '';
											for (var i = 0; i < obj.result.length; i++) {
												var res = obj.result[i].text
														.replace("\"", "")
														.replace("\"", "");
												sugList += '<li onclick="getConv(\''
														+ res
														+ '\')"><a>'
														+ res + '</a></li>'
											}

											// $('#sugUL').html(sugList);
											// $('#sugUL').show();

										},
										error : function(xhr, ajaxOptions,
												thrownError) {
											// alert(xhr.status+" : Session
											// Expired");

											$('#errormodel').modal({
												show : 'true',
												backdrop : 'static',
												keyboard : false
											});
										}
									});
						}

					}

					window.suggestionSelect = function(txt) {
						$('#usertext')
								.val(
										txt.replace(/<em>/g, '').replace(
												/<\/em>/g, ''));
						// $('#sugUL').html('');
						// synth.cancel();
						letsChat();
						// $('#usertext').val(txt.replace(/<em>/g,'').replace(/<\/em>/g,''));
						// $('#sugUL').empty();

					}
					/*
					 * function suggestion(text){
					 * 
					 * 
					 * $("#usertext").attr("list","browsers"); filter = text;
					 * var skeys = text.split(" "); if(filter != ""){
					 * 
					 * ul = document.getElementById("sugUL"); li =
					 * ul.getElementsByTagName("li"); for (i = 0; i < li.length;
					 * i++) {
					 * 
					 * a = li[i].getElementsByTagName("a")[0]; var t =
					 * a.innerHTML.toLowerCase();
					 * 
					 * if(skeys.every(function (item){return
					 * t.includes(item);})){ // if(skeys.every(item =>
					 * t.includes(item))) // { $("#sugUL").show();
					 * li[i].style.display = ""; } else { if(listDisplay !=
					 * true){ li[i].style.display = "none"; } }
					 * 
					 * 
					 * 
					 * //text matching not in usse if(t.includes(filter)){
					 * $("#sugUL").show(); li[i].style.display = ""; } else{
					 * if(listDisplay == false){ li[i].style.display = "none"; } } }
					 * if(listDisplay != true){ if ($(".box >
					 * li:visible").length === 0) { keywordSuggestions(text); } } } }
					 */
					function keywordSuggestions(text) {

						$('#sugUL').hide();
						var skeys = text.split(" ");
						var keywords = [ "abc", "kentucky", "art", "history",
								"horses", "trail", "boating", "shopping",
								"weather", "climate", "attractions", "bourbon",
								"places", "people", "projects", "count",
								"distilleries" ];

						ul = document.getElementById("sugUL");
						li = ul.getElementsByTagName("li");

						// keywords in input
						subset = skeys.filter(function(el) {
							return keywords.indexOf(el) > 0;
						});

						if (subset.length == 1) {

							filter = subset[0]
							if (filter != "") {

								// $('#sugUL').show();
								for (j = 0; j < li.length; j++) {

									a = li[j].getElementsByTagName("a")[0];
									var t = a.innerHTML.toLowerCase();
									var str = "";
									if (t.includes(filter)) {
										$('#sugUL').show();
										li[j].style.display = "";
									} else {
										li[j].style.display = "none";
									}

								}
							}
						} else if (subset.length != 0) {
							for (j = 0; j < li.length; j++) {

								a = li[j].getElementsByTagName("a")[0];
								var t = a.innerHTML.toLowerCase();

								// if(subset.every(item => t.includes(item))){
								if (subset.every(function(item) {
									return t.includes(item);
								})) {
									$('#sugUL').show();
									li[j].style.display = "";
								} else {
									li[j].style.display = "none";
								}
							}

							if ($(".box > li:visible").length === 0) {

								for (k = 0; k < subset.length; k++) {
									listDisplay = true;
									suggestions(subset[k]);
								}
							}
						}
					}

					function solrSuggestion(text) {
						$('#sugUL').html('');
						if (text != '') {
							$
									.ajax({
										url : 'api/v1/solrsuggestion',
										type : 'GET',
										data : {
											query : text,
											key : key
										},
										success : function(data) {
											var obj = $.parseJSON(data);
											// var sugList='<ul id="sugUL">';
											var sugList = '';
											for (var i = 0; i < obj.result.length; i++) {
												var res = obj.result[i].text;
												sugList += '<li onclick="suggestionSelect(\''
														+ res
														+ '\')"><a>'
														+ res + '</a></li>'
											}
											// sugList+='</ul>';

											// $('.chattextbar').prepend(sugList);
											// $('#sugUL').html(sugList);
											// $('#sugUL').show();

										},
										fail : function(xhr) {
											conosle
													.log('Error while ajax call to get suggestion from solr');
										}
									});
						}
					}
					function suggestions(text) {

						$("#usertext").attr("list", "browsers");
						filter = text;
						var skeys = text.split(" ");
						if (filter != "") {

							ul = document.getElementById("sugUL");
							li = ul.getElementsByTagName("li");
							for (i = 0; i < li.length; i++) {

								a = li[i].getElementsByTagName("a")[0];
								var t = a.innerHTML.toLowerCase();

								if (skeys.every(function(item) {
									return t.includes(item);
								})) {
									// if(skeys.every(item => t.includes(item)))
									// {
									$("#sugUL").show();
									li[i].style.display = "";
								} else {
									if (listDisplay != true) {
										li[i].style.display = "none";
									}
								}

								// text matching
								/*
								 * if(t.includes(filter)){ $("#sugUL").show();
								 * li[i].style.display = ""; } else{
								 * if(listDisplay == false){ li[i].style.display =
								 * "none"; } }
								 */

							}
							if (listDisplay != true) {
								if ($(".box > li:visible").length === 0) {
									keywordSuggestions(text);
								}
							}
						}
					}
					function keywordSuggestions(text) {

						$('#sugUL').hide();
						var skeys = text.split(" ");
						var keywords = [ "abc", "kentucky", "art", "history",
								"horses", "trail", "boating", "shopping",
								"weather", "climate", "attractions", "bourbon",
								"places", "people", "projects", "count",
								"distilleries" ];

						ul = document.getElementById("sugUL");
						li = ul.getElementsByTagName("li");

						// keywords in input
						subset = skeys.filter(function(el) {
							return keywords.indexOf(el) > 0;
						});

						if (subset.length == 1) {

							filter = subset[0]
							if (filter != "") {

								$('#sugUL').show();
								for (j = 0; j < li.length; j++) {

									a = li[j].getElementsByTagName("a")[0];
									var t = a.innerHTML.toLowerCase();
									var str = "";
									if (t.includes(filter)) {
										$('#sugUL').show();
										li[j].style.display = "";
									} else {
										li[j].style.display = "none";
									}

								}
							}
						} else if (subset.length != 0) {
							for (j = 0; j < li.length; j++) {

								a = li[j].getElementsByTagName("a")[0];
								var t = a.innerHTML.toLowerCase();

								// if(subset.every(item => t.includes(item))){
								if (subset.every(function(item) {
									return t.includes(item);
								})) {
									$('#sugUL').show();
									li[j].style.display = "";
								} else {
									li[j].style.display = "none";
								}
							}

							if ($(".box > li:visible").length === 0) {

								for (k = 0; k < subset.length; k++) {
									listDisplay = true;
									suggestions(subset[k]);
								}
							}
						}
					}

					function solrSuggestion(text) {
						$('#sugUL').html('');
						if (text != '') {
							$
									.ajax({
										url : 'api/v1/solrsuggestion',
										type : 'GET',
										data : {
											query : text,
											key : key
										},
										success : function(data) {
											var obj = $.parseJSON(data);
											// var sugList='<ul id="sugUL">';
											var sugList = '';
											for (var i = 0; i < obj.result.length; i++) {
												var res = obj.result[i].text;
												sugList += '<li onclick="suggestionSelect(\''
														+ res
														+ '\')"><a>'
														+ res + '</a></li>'
											}
											// sugList+='</ul>';

											// $('.chattextbar').prepend(sugList);
											$('#sugUL').html(sugList);
											$('#sugUL').show();

										},
										fail : function(xhr) {
											conosle
													.log('Error while ajax call to get suggestion from solr');
										}
									});
						}
					}
					function saveclientData(session) {
						
						$.ajax({
							url:'saveClientInfo',
							type:'POST',
							data:JSON.stringify({
								token:token,
								session:session,
								os:_client.getOs(),
								os_ver:_client.getOsVersion(),
								browser:_client.getBrowser(),
								browser_ver:_client.getBrowserVersion(),
								browser_maj_ver:_client.getBrowserMajorVersion(),
								device_type:_client.getDevicetype(),
								screen:_client.getScreenSize(),
								cookie_status:_client.getCookieStatus()
							}),
							contentType:'application/json',
							dataType:'json',
							async:true,
							success:function(data){
								/*if(data==='true')
									console.log('Client info saved successfuly..!!!');
								else
									console.log('failed to save data');*/
							},
							fail:function(xhr){
								console.log('Bad Request'+xhr);
							}
						});
					}

					$('#feedback_yes').click(function() {
						// alert('Yes'+convid);
						sendFeedback('Yes', convid);
						// $('.fimage').addClass('disableMouseEvent');
					});
					$('#feedback_no').click(function() {
						// alert('No'+convid);
						sendFeedback('No', convid);
						// $('.fimage').addClass('disableMouseEvent');
					});

					function sendFeedback(feedback, cid) {

						if (feedback === 'Yes') {
							$(".ftext").html('Thank you for your feedback!');
							// $('.ftext').delay(3000).fadeOut('blind');

						} else {
							$(".ftext").html('Thank you for your feedback!');
							// $('.ftext').delay(3000).fadeOut('blind');
						}

						setTimeout(function() {
							$(".ftext").html('Was this chatbot helpful?');
						}, 3000);
						/*
						 * $.ajax({ url:'api/v1/saveFeedback', type:'POST',
						 * data:{ conv_id:convid, feedback:feedback },
						 * success:function(data){ //console.log(data);
						 * data=parseInt(data); if(data==1){
						 * if(feedback=="Yes"){ $('.ftext').html('Thank you for
						 * feedback.');
						 * 
						 * setTimeout(function(){
						 * //$('.feedBackArea').hide('blind',{},300)
						 * $('.ftext').html('Was this chatbot helpful?');
						 * $('#feedback_yes').show('blind',{},300);
						 * $('#feedback_no').show('blind',{},300);
						 * 
						 * },3000); } if(feedback=="No"){
						 * $('.ftext').html('Thank you for feedback.');
						 * 
						 * setTimeout(function(){
						 * //$('.feedBackArea').hide('blind',{},300)
						 * $('.ftext').html('Was this chatbot helpful?');
						 * $('#feedback_yes').show('blind',{},300);
						 * $('#feedback_no').show('blind',{},300); },3000); }
						 * $('#feedback_yes').hide(); $('#feedback_no').hide(); } },
						 * fail:function(xhr){ console.log(xhr); } });
						 */

					}

					window.getConv = function(userio) {

						query_count = query_count + 1;
						getConvCount++;
						$('.imgbtn_container').addClass("disableMouseEvent");
						$('#ref').addClass("disableMouseEvent");
						$('.checkOpt').prop('disabled', true);
						$('#checkBtn label.container').attr('disabled', true);
						$('#usertext').addClass("form-control");
						$('#usertext').removeClass("auto-5");
						// $('#sugUL').empty();
						$('.dropdown').addClass("disableMouseEvent");
						$('.countryPick').addClass("disableMouseEvent");
						$(".animated").removeClass('animated');
						$(".maleBtn1").addClass("disableMouseEvent");
						$(".femaleBtn1").addClass("disableMouseEvent");
						$('.irs').addClass("disableMouseEvent");
						$('#datetimepicker11').addClass("disableMouseEvent");
						$('.dateid:last').addClass("disableMouseEvent");

						$('#overlayforchat').addClass('overlaychat');
						// $('#sugUL').empty();
						if (userio != 'image_uploaded_successfully'
								&& userio != 'reg_e_id') {
							userContainerPre = userContainer();
							var user = userContainerPre + userio
									+ userContainerPost
							$('.message-container').append(user);
						}
						$("#style-3").animate({
							scrollTop : $('#style-3').prop("scrollHeight")
						}, 1000);
						$("#usertext").attr("disabled", "disabled");
						$('#usertext').val('');
						$("#send").attr("disabled", "disabled");
						$('.yesnobtn').addClass("disableMouseEvent");
						getConversation(userio);
						$('#usertext').removeClass("disableMouseEvent");
						// $('#startDate').data("DateTimePicker").disable();
						auto = false;
					}

					window.getConvLang = function(userio,value) {
						query_hindi =userio;
						query_count = query_count + 1;
						getConvCount++;
						$('.imgbtn_container').addClass("disableMouseEvent");
						$('#ref').addClass("disableMouseEvent");
						$('.checkOpt').prop('disabled', true);
						$('#checkBtn label.container').attr('disabled', true);
						$('#usertext').addClass("form-control");
						$('#usertext').removeClass("auto-5");
						// $('#sugUL').empty();
						$('.dropdown').addClass("disableMouseEvent");
						$('.countryPick').addClass("disableMouseEvent");
						$(".animated").removeClass('animated');
						$(".maleBtn1").addClass("disableMouseEvent");
						$(".femaleBtn1").addClass("disableMouseEvent");
						$('.irs').addClass("disableMouseEvent");
						$('#datetimepicker11').addClass("disableMouseEvent");
						$('.dateid:last').addClass("disableMouseEvent");

						$('#overlayforchat').addClass('overlaychat');
						// $('#sugUL').empty();
						if (userio != 'image_uploaded_successfully'
								&& userio != 'reg_e_id') {
							userContainerPre = userContainer();
							var user = userContainerPre + userio
									+ userContainerPost
							$('.message-container').append(user);
						}
						$("#style-3").animate({
							scrollTop : $('#style-3').prop("scrollHeight")
						}, 1000);
						$("#usertext").attr("disabled", "disabled");
						$('#usertext').val('');
						$("#send").attr("disabled", "disabled");
						$('.yesnobtn').addClass("disableMouseEvent");
						getConversation(value);
						$('#usertext').removeClass("disableMouseEvent");
						// $('#startDate').data("DateTimePicker").disable();
						auto = false;
					}
					window.sendOption = function(userio, id) {
						
						query_count = query_count + 1;
						getConvCount++;
						$('#ref').addClass("disableMouseEvent");
						$('.countryPick').addClass("disableMouseEvent");
						$(".animated").removeClass('animated');
						$(".maleBtn1").addClass("disableMouseEvent");
						$(".femaleBtn1").addClass("disableMouseEvent");
						$('.irs').addClass("disableMouseEvent");
						$('#datetimepicker11').addClass("disableMouseEvent");
						$('.dateid:last').addClass("disableMouseEvent");
						document.getElementById(id).disabled = true;
						$('#overlayforchat').addClass('overlaychat');
						// $('#sugUL').empty();
						userContainerPre = userContainer();
						
						var opt = $("#"+id+ " option:selected").text();
						console.log(opt);
						query_hindi = opt;
						var user = userContainerPre + opt
								+ userContainerPost
						$('.message-container').append(user );
					
						$("#style-3").animate({
							scrollTop : $('#style-3').prop("scrollHeight")
						}, 1000);
						$("#usertext").attr("disabled", "disabled");
						$('#usertext').val('');
						$("#send").attr("disabled", "disabled");
						$('.yesnobtn').addClass("disableMouseEvent");
						getConversation(userio);
						$('#usertext').removeClass("disableMouseEvent");

						// $('#startDate').data("DateTimePicker").disable();
					}

					window.getDialog = function(userio) {

						getConvCount++;

						$('#ref').addClass("disableMouseEvent");
						$('.dropdown').addClass("disableMouseEvent");
						$('#overlayforchat').addClass('overlaychat');
						// $('#sugUL').empty();
						$(".maleBtn1").addClass("disableMouseEvent");
						$(".femaleBtn1").addClass("disableMouseEvent");
						$("#style-3").animate({
							scrollTop : $('#style-3').prop("scrollHeight")
						}, 1000);
						$("#usertext").attr("disabled", "disabled");
						$('#usertext').val('');
						$("#send").attr("disabled", "disabled");
						$('.yesnobtn').addClass("disableMouseEvent");
						$('.irs').addClass("disableMouseEvent");
						$('#datetimepicker11').addClass("disableMouseEvent");
						$('.dateid:last').addClass("disableMouseEvent");
						getConversation(userio);
						$('#usertext').removeClass("disableMouseEvent");
						// $('#startDate').data("DateTimePicker").disable();

					}
					window.showchatWindow = function() {

						showchat();
					}

					window.questionLimit = function(question) {
						var text = question.value.toLowerCase();

						isKeyw = false;
						var keywords = [ "abc", "kentucky", "art", "history",
								"horses", "trail", "boating", "shopping",
								"weather", "climate", "attractions", "bourbon",
								"places", "people", "projects", "count",
								"distilleries" ];

						/*
						 * if(text == ""){ $('#sugUL').hide(); }
						 */

						var name_le = question.value.length;

						if (name_le >= 512) {
							var result = question.value.substring(0, 512);
							question.value = result;
						}

						listDisplay = false;

						// suggestions(text);

						// solrSuggestion(text);

						/*
						 * if(isKeyw == true){
						 * 
						 * var isSuggestion = true; keywordSuggestions(text); }
						 * else{
						 * 
						 * $('#sugUL').hide(); listDisplay = false;
						 * suggestions(text); }
						 */

					}
					function startNewConversation() {
						geturl();
						showfinalchatbox();
					}
					function showchat() {
						count++;
						// $('#showchatbox').css("display", "block");
						// $('#sugUL').css("display", "none");
						/*
						 * $import('resources/dist/js/bootstrap-formhelpers.min.js');
						 * $import('resources/js/cccode.js');
						 * 
						 * setTimeout(function(){ $('#myEnterNameModal').modal({
						 * show: 'true', backdrop: 'static', keyboard: false }); },
						 * 10); if(_client.getOs()==='iOS'){
						 * $('#iosErrorModel').modal({ show: 'true', backdrop:
						 * 'static', keyboard: false }); }
						 */
						/*
						 * if(count == 1){ //$('.message-container').html('');
						 * startNewConversation(); }
						 * $('.showchatbar').fadeOut();
						 */

					}
					// init script
					showchat();

					// function slideup(){
					$('#btnslideup')
							.click(
									function() {
										$("#btnslideup")
												.css("background",
														"linear-gradient(to bottom, #C3C3C3 0%, #C3C3C3 99%) ");
										$("#btnslideup").css("color", "#fff");
										$("#btnslideup").css("border",
												"1px solid  #C3C3C3");
										$("#btnslideup").addClass(
												"disableMouseEvent");

										$('.intro-header').animate({
											height : '100px'
										}, 1000);
										$('.header-avatar').animate({
											width : '75px'
										}, 500);
										$('.chat-person-info').animate({
											left : '115px'
										}, 500);
										$('.intro-header').addClass('conStart');
										$('.chatcontentbox').addClass(
												'marTop80');
										$("#username").attr("disabled", "disabled");		
										if (count == 1) {
											// $('.message-container').html('');
											startNewConversation();
										}
										$('.showchatbar').fadeOut();
									});

					// slideup();

					window.suggestionSelect = function(txt) {
						$('#usertext')
								.val(
										txt.replace(/<em>/g, '').replace(
												/<\/em>/g, ''));
						// $('#sugUL').html('');
						// synth.cancel();
						letsChat();
						// $('#usertext').val(txt.replace(/<em>/g,'').replace(/<\/em>/g,''));
						// $('#sugUL').empty();

					}
					/*
					 * window.checkValue =function(value){ alert($(this).val());
					 * $('#usertext').val($(this).val())}
					 */

					window.speechResponse = function(txt) {
						query_count = query_count + 1;
						$('#usertext').val(txt);
						letsChat();
					}
					window.speechResponse = function() {
						query_count = query_count + 1;
						letsChat();
					}
					/* End of Script for Speech to text */
				});
function getiframeurl() {
	var url_link = $('#iframe').html(window.location.href);
	var str = url_link[0].baseURI;
	$.ajax({
		url : "api/v1/iframe.do",
		method : "GET",
		async : true,
		data : ({
			url_data : str
		}),
		success : function(data) {
			var url_link = $('#iframe').html(window.location.href);
		}
	}).done(function(data) {
		var status = data;
	}).fail(function() {
		bootbox.alert("Error to get url");
	});
}

window.getPdfFile = function(fileName){

	
	$.ajax({
		url : 'getDoc',
		type : 'POST',
		data : {
			file : fileName
		 },
		async:false,
		success : function(data) {
			window.open("data:application/pdf;base64," + data);
		},
		fail : function(xhr) {
			console.log('Bad Request' + xhr);
		}
	});


	//window.location="getDoc?file="+fileName;
}


function hasWhiteSpace(s) {
	var userName = $("#username").val();

	if (userName.length === 1) {
		userName = userName.replace(/\s/g, '');
	}
	/*
	 * var reg=new RegExp("[~!#$%^&*'(){}\"<>]");
	 * if(reg.test($("#username").val())===true){ $("#username").val(''); }
	 */
	var ex = /^[a-zA-Z]+$/;
	if (!$("#username").val().match(ex)) {
		$("#username").val('');
		$("#btnslideup").addClass("disableMouseEvent");
	}

	// userName = userName.replace(/\s/g,''); // Check for white space
	userName = userName.replace(/[`~!@#$%^&*()_|+\-=?;:,.<>\{\}\[\]\\\/]/g, '');
	userName = userName.replace(/[0-9]/g, '');// remove numbers

	if (userName.length > 100) {
		userName = userName.substring(0, 100);
		// $("#username").val(userName);
	}

	if (userName.length >= 1) {

		$("#btnslideup").css("background",
				"linear-gradient(to bottom, #ffffff 0%, #ffffff 99%) ");
		$("#btnslideup").css("color", "#493BCF");
		$("#btnslideup").removeClass("disableMouseEvent");
		var keycode = (event.keyCode ? event.keyCode : event.which);
		if (keycode == '13') {
			$("#btnslideup").click();
		}
	} else {
		$("#btnslideup").css("background", "#C3C3C3");
		$("#btnslideup").css("color", "#fff");
		$("#btnslideup").css("border", "1px solid #C3C3C3");
		$("#btnslideup").addClass("disableMouseEvent");
	}

	$("#username").val(userName);

}

/*
 * function hasWhiteSpace(s) { var userName = $("#username").val();
 * if(userName.length===1){ userName = userName.replace(/\s/g,''); } var
 * ex=/^[0-9]+$/; //For numbers only if(!$("#username").val().match(ex)){
 * $("#username").val(''); return false; } if(userName.length < 8 ||
 * userName.length > 15) { return false; } return true; }
 */