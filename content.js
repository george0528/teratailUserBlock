

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

  userLinks.forEach(userLink => {
    if(userLink.textContent != userName) return;

    let article = userLink.closest("article");
    if(article == undefined) return;
    if(article.style.display == 'none') return;

    article.style.display = 'none';
    console.log(`${userName}の質問を非表示にしました`);
  });
}