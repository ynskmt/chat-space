$(function(){

  function buildHTML(message) {
    image = (message.image) ? `<img class= "lower-message__image" src=${message.image} >` : "";
    let html = `<div class="main-message__box">
                  <div class="main-message__box__upper-info">
                    <div class="main-message__box__upper-info__talker">
                      ${message.user_name}
                    </div>
                    <div class="main-message__box__upper-info__date">
                      ${message.date}
                    </div>
                  </div>
                  <div class="main-message__box__text">
                    <p class="lower-message__content">
                      ${message.content}
                    </p>               
                    ${image}
                  </div>
                </div>`
    return html;
  }

  $("#new_message").on("submit", function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr("action");
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message) {
      let html = buildHTML(message);
      $(".main-message").append(html);
      $('.main-message').animate({scrollTop: $('.main-message')[0].scrollHeight}, 'fast');
      $('form')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    })
    return false;
  })
})