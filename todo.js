// 頁面切換
const login = document.querySelector(".login.js-view");
const singup = document.querySelector(".singup.js-view");
const todo = document.querySelector(".todo.js-view");

// 登入頁
const loginEmail = document.querySelector("#login_email");
const loginPassword = document.querySelector("#login_password");
const loginBtn = document.querySelector("#login_btn");
const singupAccount = document.querySelector("#singup_account");
const inputEmail = document.querySelector(".input.login_email");
const inputPassword = document.querySelector(".input.login_password");

// 註冊頁
const singupEmail = document.querySelector("#singup_email");
const singupName = document.querySelector("#singup_name");
const singupPassword = document.querySelector("#singup_password");
const repeatPassword = document.querySelector("#repeat_password");
const returnlogin = document.querySelector("#return_login");
const singupBtn = document.querySelector("#singup_btn");

// todo頁面
const text = document.querySelector(".input-item");
const btnAdd = document.querySelector(".button_add");
const list = document.querySelector(".list");
const tab = document.querySelector(".tab");
const tabs = document.querySelectorAll(".tab li");
const tabAll = document.querySelector('[data-tab="all"]');
const tabDone = document.querySelector('[data-tab="done"]');
const singoutBtn = document.querySelector(".button_singout");
const todoNum = document.querySelector(".todoNum");
const user = document.querySelector(".user");
// const list = document.querySelector("label.checkbox");
// const i
console.log(user);
// api網址
const apiUrl = `https://todoo.5xcamp.us`;

// 登入api
function loginApi() {
  axios
    .post(`${apiUrl}/users/sign_in`, {
      user: {
        email: loginEmail.value.trim(),
        password: loginPassword.value.trim(),
      },
    })
    .then((res) => {
      // axios全域變數headers加上Authorization授權
      axios.defaults.headers.common["Authorization"] =
        res.headers.authorization;
      console.log(res.data);
      login.classList.add("none");
      todo.classList.remove("none");
      todolistApi2();
      // 代入使用者名稱
      user.innerHTML = `
      <span class="user_name">${res.data.nickname}的代辦</span>
      <button class="button_singout">登出</button>
      `;
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        text: `${error.response.data.message}`,
      });
      console.log(error.response);
    });
}

loginBtn.addEventListener("click", function (e) {
  // 檢查是否 Email 和密碼都是空的
  validateAndToggleInfo(loginEmail, "Email 欄位不可為空");
  validateAndToggleInfo(loginPassword, "密碼欄位不可為空");
  if (loginEmail.value.trim() !== "" && loginPassword.value.trim() !== "")
    if (loginEmail && loginPassword) {
      loginApi();
    }
});
// 點註冊按鈕
singupAccount.addEventListener("click", function (e) {
  //   e.target.classList.add("active");
  login.classList.add("none");
  singup.classList.remove("none");
});

// 註冊api
function singupApi() {
  axios
    .post(`${apiUrl}/users`, {
      user: {
        email: singupEmail.value.trim(),
        nickname: singupName.value.trim(),
        password: singupPassword.value.trim(),
      },
    })
    .then((res) => {
      console.log(res);
      Swal.fire({
        icon: "success",
        title: `${res.data.message}`,
        text: `您的Email:${res.data.email} \ 帳號暱稱:${res.data.nickname}`,
      });
      console.log(res.data);
      login.classList.remove("none"); //新增
      singup.classList.add("none"); //新增
    })
    .catch((error) => {
      Swal.fire({
        icon: "error",
        title: `${error.response.data.message}`,
        text: `${error.response.data.error}`,
      });
      console.log(error.response.data);
    });
}
// 註冊按鈕
singupBtn.addEventListener("click", function (e) {
  e.preventDefault();
  validateAndToggleInfo(singupEmail, "Email 欄位不可為空");
  validateAndToggleInfo(singupName, "暱稱欄位不可為空");
  validateAndToggleInfo(singupPassword, "密碼欄位不可為空");
  validateAndToggleInfo(repeatPassword, "再次輸入密碼欄位不可為空");
  if (
    singupPassword.value.trim() !== "" &&
    repeatPassword.value.trim() !== ""
  ) {
    if (singupPassword.value.trim() !== repeatPassword.value.trim()) {
      Swal.fire({
        icon: "error",
        title: `密碼欄位有誤`,
        text: `密碼輸入比對錯誤`,
      });
      return;
    }
  }
  if (singupEmail && singupName && singupPassword) {
    singupApi();
  }
});

//驗證欄位是否為空
function validateAndToggleInfo(inputElement, message) {
  const isEmpty = inputElement.value.trim() === "";
  const loginInfo = inputElement.parentElement.querySelector(".login-info");

  if (isEmpty) {
    if (!loginInfo) {
      const infoSpan = document.createElement("span");
      infoSpan.className = "login-info";
      infoSpan.textContent = message;
      inputElement.parentElement.appendChild(infoSpan);
    }
  } else {
    if (loginInfo) {
      loginInfo.remove();
    }
  }
}

// 回到登入按鈕
returnlogin.addEventListener("click", function (e) {
  singup.classList.add("none");
  login.classList.remove("none");
});

// 顯示待辦API
function todolistApi2() {
  axios
    .get(`${apiUrl}/todos`)
    .then((res) => {
      // console.log(res.data.todos);
      data = res.data.todos;
      count(data);
      renderdata(data);
    })
    .catch((error) => console.log(error.response));
}

// 渲染待辦清單
function renderdata(data) {
  console.log(data);
  let str = ``;
  data.forEach((item) => {
    // console.log(item);
    if (item.completed_at === null) {
      str += `<li data-num="${item.id}">
      <label class="checkbox" for >
      <input type="checkbox">
      <span class="editable">${item.content}</span>
      </label>
      <button class="button_edit">
      <img src="./edit_FILL0_wght400_GRAD0_opsz24.png" alt="編輯">
      </button>
      <button class="button_delete">
      <img src="./delete_FILL0_wght400_GRAD0_opsz24.svg" alt="刪除">
      </button></li>`;
      // list.innerHTML = str;
    } else {
      str += `<li data-num="${item.id}">
      <label class="checkbox" for >
      <input type="checkbox" checked="checked">
      <span class="editable">${item.content}</span>
      </label>
      <button class="button_edit">
      <img src="./edit_FILL0_wght400_GRAD0_opsz24.png" alt="編輯">
      </button>
      <button class="button_delete">
      <img src="./delete_FILL0_wght400_GRAD0_opsz24.svg" alt="刪除">
      </button></li>`;
      // list.innerHTML = str;
    }
    // 在設置 innerHTML 前檢查字串是否為空
    // console.log(str);
  });
  if (str === "") {
    list.innerHTML = "";
  } else {
    list.innerHTML = str;
  }
}

// 登出按鈕
singoutBtn.addEventListener("click", function (e) {
  axios
    .delete(`${apiUrl}/users/sign_out`)
    .then((res) => {
      console.log(res.data.message);
      login.classList.remove("none");
      todo.classList.add("none");
    })
    .catch((error) => {
      console.log(error.response.data.message);
      login.classList.remove("none");
      todo.classList.add("none");
    });
});

// 計算待辦數量
function count(data) {
  let todoCount = data.filter((item) => item.completed_at === null).length;
  if (todoCount === 0) {
    todoNum.innerHTML = `<p class="todoNum">目前沒有待完成事項</p>`;
  } else {
    todoNum.innerHTML = `<p class="todoNum">${todoCount}個待辦事項</p>`;
  }
}

// 新增待辦
function addtodoApi() {
  axios
    .post(`${apiUrl}/todos`, {
      todo: {
        content: text.value.trim(),
      },
    })
    .then((res) => {
      console.log("新增成功");
      alltab(tabAll);
      todolistApi2();
    })
    .catch((error) => {
      console.log(error.response);
    });
}
btnAdd.addEventListener("click", function (e) {
  console.log(e.target);
  if (text.value.trim() == "") {
    Swal.fire({
      icon: "error",
      text: `輸入錯誤:請勿輸入空值`,
    });
  } else if (text.value.trim() != "") {
    addtodoApi();
    text.value = "";
  }
});

// 頁籤更換 css ACTIVE調整
tab.addEventListener("click", function (e) {
  toggleStatus = e.target.dataset.tab;
  console.log(toggleStatus);
  tabs.forEach(function (item) {
    item.classList.remove("active");
  });
  e.target.classList.add("active");
  updateData();
});

// 調整待辦狀態
list.addEventListener("click", function (e) {
  // dataset.id 來獲取 li 元素的 id 屬性值
  let num = e.target.closest("li").getAttribute("data-num");
  console.log(num);
  console.log(e.target);
  // let delete =
  if (e.target.matches("input[type='checkbox']")) {
    if (e.target.checked) {
      // e.target.setAttribute("checked", "checked");
      console.log(num);
      toggleApi(num);
    } else {
      console.log(num);
      // e.target.removeAttribute("checked");
      toggleApi(num);
    }
  }
  let deleteButton = e.target.closest(".button_delete");
  if (deleteButton) {
    deleteApi(num);
  }
});

// 切換待辦狀態API
function toggleApi(id) {
  axios
    .patch(`${apiUrl}/todos/${id}/toggle`)
    .then((res) => {
      alltab(tabAll);
      todolistApi2();
    })
    .catch((error) => {
      console.log(error.response);
    });
}
// https://todoo.5xcamp.us/todos/544cf5fe9ed346892478d3a4cca50a48/toggle
// 頁籤更換 css ACTIVE調整
tab.addEventListener("click", function (e) {
  toggleStatus = e.target.dataset.tab;
  tabs.forEach(function (item) {
    item.classList.remove("active");
  });
  e.target.classList.add("active");
  updateData();
});

// 頁籤更換
function updateData() {
  let newData = [];
  if (toggleStatus === "all") {
    newData = todolistApi2();
  } else if (toggleStatus === "todo") {
    newData = data.filter((item) => item.completed_at === null);
    // console.log(newData);
    renderdata(newData);
  } else {
    newData = data.filter((item) => item.completed_at != null);
    renderdata(newData);
  }
}

// 切換回全部
function alltab(tab) {
  tabs.forEach(function (item) {
    console.log(item);
    item.classList.remove("active");
  });
  tab.classList.add("active");
}

// 刪除API
function deleteApi(id) {
  axios
    .delete(`${apiUrl}/todos/${id}`)
    .then((res) => {
      todolistApi2();
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

// 編輯API
function editApi(id, content) {
  axios
    .put(`${apiUrl}/todos/${id}`, {
      todo: {
        content: content,
      },
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
}

// 編輯按鈕點擊事件
list.addEventListener("click", function (e) {
  let num = e.target.closest("li").getAttribute("data-num");
  // 編輯按鈕被點擊
  let editButton = e.target.closest(".button_edit");
  if (editButton) {
    e.preventDefault();
    // 找到相應的 li 元素
    let listItem = editButton.closest("li");
    let spanElement = listItem.querySelector("span");

    // 動態生成輸入框
    let inputElement = document.createElement("input");
    inputElement.type = "text";
    inputElement.value = spanElement.textContent;

    // 替換 span
    spanElement.parentNode.replaceChild(inputElement, spanElement);

    // 添加保存按鈕
    let saveButton = document.createElement("button");
    saveButton.textContent = "保存";
    saveButton.classList.add("button_save");
    // 添加取消按鈕
    let cancelButton = document.createElement("button");
    cancelButton.textContent = "取消";
    cancelButton.classList.add("button_cancel");

    // 插入輸入框和保存按鈕到 li 元素中
    listItem.innerHTML = ""; // 清空 li 元素的內容
    listItem.appendChild(inputElement);
    listItem.appendChild(saveButton);
    listItem.appendChild(cancelButton);

    // 添加 class 以應用 CSS 样式
    inputElement.classList.add("editing");
    saveButton.classList.add("editing");
    cancelButton.classList.add("editing");

    // 監聽保存按鈕的點擊事件
    saveButton.addEventListener("click", function () {
      // 執行保存邏輯
      axios
        .put(`${apiUrl}/todos/${num}`, {
          todo: {
            content: inputElement.value,
          },
        })
        .then((res) => {
          console.log(res);
          // 回復成預設樣式
          listItem.innerHTML = `
                    <label class="checkbox" for="${num}">
                      <input type="checkbox">
                      <span class="editable">${inputElement.value}</span>
                    </label>
                    <button class="button_edit">
                      <img src="./edit_FILL0_wght400_GRAD0_opsz24.png" alt="編輯">
                    </button>
                    <button class="button_delete">
                      <img src="./delete_FILL0_wght400_GRAD0_opsz24.svg" alt="刪除">
                    </button>
                  `;
        })
        .catch((error) => {
          console.log(error.response.data.message);
        });
    });
    // 取消編輯，回到原始狀態
    cancelButton.addEventListener("click", function () {
      listItem.innerHTML = `
          <label class="checkbox" for="${num}">
            <input type="checkbox">
            <span class="editable">${spanElement.textContent}</span>
          </label>
          <button class="button_edit">
            <img src="./edit_FILL0_wght400_GRAD0_opsz24.png" alt="編輯">
          </button>
          <button class="button_delete">
            <img src="./delete_FILL0_wght400_GRAD0_opsz24.svg" alt="刪除">
          </button>
        `;
    });
  }
});
