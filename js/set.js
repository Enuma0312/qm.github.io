/*
作者: imsyy
主页：https://www.imsyy.top/
GitHub：https://github.com/imsyy/home
版权所有，请勿删除
*/

// 背景图片 Cookies
function setBgImg(bg_img) {
  if (bg_img) {
    Cookies.set("bg_img", JSON.stringify(bg_img), {
      expires: 36500,
    });
    console.log("背景图片设置已保存：", bg_img);
    return true;
  }
  return false;
}

// 获取背景图片 Cookies
function getBgImg() {
  let bg_img_local = Cookies.get("bg_img");
  console.log("从Cookies中读取的背景图片设置：", bg_img_local);
  if (bg_img_local && bg_img_local !== "{}") {
    return JSON.parse(bg_img_local);
  } else {
    setBgImg(bg_img_preinstall);
    return bg_img_preinstall;
  }
}

let bg_img_preinstall = {
  type: "1", // 1:默认背景 2:每日一图 3:随机风景 4:随机动漫
  2: "https://api.dujin.org/bing/1920.php", // 每日一图
  3: "https://api.btstu.cn/sjbz/api.php?lx=fengjing&format=images", // 随机风景
  4: "https://www.dmoe.cc/random.php", // 随机动漫
};

// 更改背景图片
function setBgImgInit() {
  let bg_img = getBgImg();
  console.log("初始化背景图片设置：", bg_img);
  $("input[name='wallpaper-type'][value=" + bg_img["type"] + "]").prop("checked", true);

  switch (bg_img["type"]) {
    case "1":
      $("#bg").attr(
        "src",
        `./img/background${1 + ~~(Math.random() * 10)}.webp`
      ); // 随机默认壁纸
      break;
    case "2":
      $("#bg").attr("src", bg_img_preinstall[2]); // 必应每日
      break;
    case "3":
      $("#bg").attr("src", bg_img_preinstall[3]); // 随机风景
      break;
    case "4":
      $("#bg").attr("src", bg_img_preinstall[4]); // 随机动漫
      break;
  }
}

$(document).ready(function () {
  // 壁纸数据加载
  setBgImgInit();
  // 设置背景图片
  $("#wallpaper").on("click", ".set-wallpaper", function () {
    let type = $(this).val();
    let bg_img = getBgImg();
    bg_img["type"] = type;
    iziToast.show({
      icon: "fa-solid fa-image",
      timeout: 2500,
      message: "壁纸设置成功，刷新后生效",
    });
    setBgImg(bg_img);
  });
});
