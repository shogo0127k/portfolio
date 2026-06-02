/**
 * 
 * clock
 * 
 * 
 * */

// 時計の表示先
const outPutField = document.getElementById('outPutField');

// 曜日表示の設定
const week = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// 現在日時の取得
const showClock = ( ) => {
  const now = new Date();

  // 時・分・秒を２桁表示する
  // padStartを使う
  // １桁の場合は０を追加
  // ２桁の場合はそのまま
  // padStart()を使うためにstring()を使う

  const hour = String(now.getHours()).padStart(2,'0');
  const min = String(now.getMinutes()).padStart(2,'0');
  const sec = String(now.getSeconds()).padStart(2,'0');
  const day = String(week[now.getDay()]).padStart(2,'0');
  
  outPutField.textContent = `${hour}:${min}:${sec}(${day})`;
};


// setInterval('第一引数は関数','第二関数はミリ秒');

setInterval(showClock,500)

