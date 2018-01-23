$(function () {

    //用户注册
    var $register = $('#reg-block');
   $('#btn-reg').on('click', function () {
      $.ajax({
          type: 'post',
          url: '/reg',
          data: {
              username: $register.find('[name="username"]').val(),
              password:  $register.find('[name="password"]').val(),
              repassword:  $register.find('[name="repassword"]').val()
          },
          dataType: 'json',
          success: function (results) {
                if(results.code){
                    $register.find('p').html(results.message);
                }else{
                    $register.find('p').html('注册成功');
                    setTimeout(function(){
                        window.location.assign('/');
                    },2000);
                }
          }
      })
   });


   //用户登录
    var $login = $('#login-block');
    $('#btn-login').on('click', function () {
       $.ajax({
           type: 'post',
           url: '/login',
           data: {
               username: $login.find('[name="username"]').val(),
               password:  $login.find('[name="password"]').val()
           },
           success: function (results) {
               $login.find('p').html(results.message);

               if(!results.code){
                   setTimeout(function(){
                       window.location.assign('/');
                   },1000);
               }
           }
       })
    });

    //用户登出
    $('#logout').on('click', function () {
        $.ajax({
            url: '/logout',
            success: function(result){
                if(!result.code){
                    window.location.reload();
                }
            }
        })
    });
});