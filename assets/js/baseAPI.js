// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象

const baseUrl = "http://www.liulongbin.top:3007";


$.ajaxPrefilter((option) => {
    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径

    if (option.url.includes('/my/')){
      option.headers={
        Authorization:localStorage.getItem('token')
      }
    }

    option.url = baseUrl + option.url;

    option.complete = (res) => {
      // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
      if(res.responseJSON.status ===1 && res.responseJSON.message === "身份认证失败！") {
          //  强制清空 token
          localStorage.removeItem("token");
          // 强制跳转到登录页面
          location.href = "/login.html"
      }else{
        
      }
  }
  });