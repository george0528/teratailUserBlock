

window.addEventListener('load', () => {
  // オブザーバーの作成
  const observer = new MutationObserver(records => {
    // 変化が発生したときの処理を記述
    chrome.storage.local.get('users', (data) => {
      users = data.users;
      
      // 空なら
      if(users == null) return;

      // ユーザの質問を非表示にする
      users.forEach(user => {
        hideBlockUserArticles(user);
      });
    });

  });
  
  // 監視の開始
  observer.observe(document, {
    childList: true,
    subtree: true
  })
});

// 指定のユーザの記事を非表示
const hideBlockUserArticles = (userName) => {
  let userLinks = document.querySelectorAll(`a[href="/users/${userName}"]`);
  if(userLinks == undefined) return;

  // 普通の削除処理
  userLinks.forEach(userLink => {
    if(userLink.textContent != userName) return;
    // 非表示
    artcleDisplayNoneByName(userName, userLink);
  });

  let imgs = document.querySelectorAll('img');
  // 表示名を変更したユーザの質問の削除処理
  imgs.forEach(img => {
    let alt = img.getAttribute('alt');

    if(alt != userName) return;
    artcleDisplayNoneByName(userName, img);
  });
}

const artcleDisplayNoneByName = (name, targetElement) => {
  let article = targetElement.closest("article");
  if(article == undefined) return;
  if(article.style.display == 'none') return;

  article.style.display = 'none';
  console.log(`${name}の質問を非表示にしました`);
}