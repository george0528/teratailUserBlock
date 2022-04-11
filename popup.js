// 拡張機能ポップアップの要素
const $btn = document.querySelector('#btn');
const $tbody = document.querySelector('tbody');

window.addEventListener('load', () => {
  showUser();
  // deleteボタンのclickイベント
  $tbody.addEventListener('click', (e) => {
    let target = e.target;
    if(target.classList.contains('delete_btn')) {
      let name = target.dataset.name;
      // 削除処理
      chrome.storage.local.get('users', (data) => {
        let usersData;
        let users = data.users;
        usersData = users;
        
        // 除外
        let excludedUserData = usersData.filter(userName => userName != name);
        // 保存
        chrome.storage.local.set({'users': excludedUserData}, () => {
          // すべて削除
          $tbody.innerHTML = '';
  
          // 再レンダリング
          showUser();
        });
      });
    }
  });
});

// clickイベント
$btn.addEventListener('click', () => {
  const $form = document.querySelector('form');
  let value = $form.name.value;
  // 空文字か文字数制限外の時
  if(value == null || value == '' || value.length > 200) {
    var warn_message = '文字を入力してください';
    window.alert(warn_message);
    return;
  }

  chrome.storage.local.get('users', (data) => {
    let usersData;
    users = data.users;
    usersData = users;
    
    // 空なら
    if(users == null) {
      usersData = [];
    }

    // 追加
    usersData.push(value);
    addUserListElement(value);
  
    // 保存
    chrome.storage.local.set({'users': usersData}, () => {
      console.log('set');
    });
  });
});


const showUser = () => {
  chrome.storage.local.get('users', (data) => {
    let usersData;
    let users = data.users;
    usersData = users;

    if(users == null) {
      usersData = [];
    }

    if(usersData) {
      usersData.forEach(user => {
        addUserListElement(user);
      });
    }
  });
}

// ユーザの追加
const addUserListElement = (name) => {
  const $tr = document.createElement('tr');

  const $deleteBtnTd = document.createElement('td');
  const $deleteBtn = createDeleteBtn(name);
  $deleteBtnTd.appendChild($deleteBtn);

  $tr.appendChild(createTdElement(name));
  $tr.appendChild($deleteBtnTd);
  $tbody.appendChild($tr);
}

// deleteBtn作成
const createDeleteBtn = (name) => {
  let $btn = document.createElement('button');
  $btn.textContent = '削除';
  $btn.dataset.name = name;
  $btn.classList.add('danger');
  $btn.classList.add('delete_btn');
  return $btn;
}

// td作成
const createTdElement = (text) => {
  const $td = document.createElement('td');
  $td.textContent = text;
  return $td;
}