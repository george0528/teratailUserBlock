// 拡張機能ポップアップの要素
const $btn = document.querySelector('#btn');
const $allDelete = document.querySelector('#allDelete');
const $list = document.querySelector('#list');

window.addEventListener('load', () => {
  showUser();
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

$allDelete.addEventListener('click', () => {
  chrome.storage.local.set({'users': []}, () => {
    $list.innerHTML = '';
  });
});


const showUser = () => {
  chrome.storage.local.get('users', (data) => {
    let usersData;
    users = data.users;
    usersData = users;

    if(users == null) {
      usersData = [];
    }

    if(usersData) {
      usersData.forEach(user => {
        let li = createUserLiElement(user);
        $list.append(li);
      });
    }
  });
}

const addUserListElement = (name) => {
  let $li = createUserLiElement(name);
  $list.append($li);
}

// liタグのElemntを作成
const createUserLiElement = (name) => {
  let $li = document.createElement('li');
  $li.textContent = name;
  return $li;
}