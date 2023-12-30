function renderdata(data) {
  let str = ``;
  data.forEach((item) => {
    console.log(item);
    if (item.completed_at === null) {
      str += `<li data-num="${item.id}">
      <label class="checkbox" for >
      <input type="checkbox">
      <span>${item.content}</span>
      </label>
      <button class="button_edit">
      <img src="./edit_FILL0_wght400_GRAD0_opsz24.png" alt="編輯">
      </button>
      <button class="button_delete">
      <img src="./delete_FILL0_wght400_GRAD0_opsz24.svg" alt="刪除">
      </button></li>`;
      list.innerHTML = str;
    } else {
      str += `<li data-num="${item.id}">
      <label class="checkbox" for >
      <input type="checkbox" checked="checked">
      <span>${item.content}</span>
      </label>
      <button class="button_edit">
      <img src="./edit_FILL0_wght400_GRAD0_opsz24.png" alt="編輯">
      </button>
      <button class="button_delete">
      <img src="./delete_FILL0_wght400_GRAD0_opsz24.svg" alt="刪除">
      </button></li>`;
      list.innerHTML = str;
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
          todolistApi();
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
      // updateData()
    });

    // 調整待辦狀態
    list.addEventListener("click", function (e) {
      // dataset.id 來獲取 li 元素的 id 屬性值
      let num = e.target.closest("li").getAttribute("data-num");
      console.log(num);
      console.log(e.target);
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
    });

    // 切換待辦狀態API
    function toggleApi(id) {
      axios
        .patch(`${apiUrl}/todos/${id}/toggle`)
        .then((res) => {
          todolistApi();
        })
        .catch((error) => {
          console.log(error.response);
        });
    }
    // https://todoo.5xcamp.us/todos/544cf5fe9ed346892478d3a4cca50a48/toggle
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

    // 預設顯示全部
    let toggleStatus = "all";
    // 頁籤更換
    function updateData() {
      let newData = [];
      if (toggleStatus === "all") {
        newData = todolistApi();
        console.log(newData);
      } else if (toggleStatus === "todo") {
        console.log(data);
        newData = data.filter((item) => item.complete === false);
      } else {
        newData = data.filter((item) => item.complete === true);
        console.log(data);
      }
    }
  });
}
