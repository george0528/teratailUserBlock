// 拡張機能ポップアップの要素
const $btn = document.querySelector('#btn');
const $list = document.querySelector('#list');

window.addEventListener('load', () => {
  showUser();
  // deleteボタンのclickイベント
  $list.addEventListener('click', (e) => {
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
          $list.innerHTML = '';
  
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

const addUserListElement = (name) => {
  let $li = createUserLiElement(name);
  let $deleteBtn = createDeleteBtn(name);
  $li.appendChild($deleteBtn);
  $list.append($li);
}

const createDeleteBtn = (name) => {
  let $btn = document.createElement('button');
  $btn.textContent = '削除';
  $btn.dataset.name = name;
  $btn.classList.add('danger');
  $btn.classList.add('delete_btn');
  return $btn;
}

// liタグのElemntを作成
const createUserLiElement = (name) => {
  let $li = document.createElement('li');
  $li.textContent = name;
  return $li;
}