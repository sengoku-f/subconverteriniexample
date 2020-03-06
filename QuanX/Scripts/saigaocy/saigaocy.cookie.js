/*

[rewrite_local]
^http?:\/\/saigaocy\.moe\/users url script-request-header saigaocy.cookie.js
[mitm]
saigaocy.com

*/

let headerCookie = $request.headers["Cookie"];

if (headerCookie) {
  if ($prefs.valueForKey("saigaocyCookie") != undefined) {
    if ($prefs.valueForKey("saigaocyCookie") != headerCookie) {
      var cookie = $prefs.setValueForKey(headerCookie, "saigaocyCookie");
      if (!cookie) {
        $notify("更新赛高次元Cookie失败！", "", "");
      } else {
        $notify("更新赛高次元Cookie成功！", "", "");
      }
    }
  } else {
    let cookie = $prefs.setValueForKey(headerCookie, "saigaocyCookie");
    if (!cookie) {
      $notify("首次写入赛高次元Cookie失败！", "", "");
    } else {
      $notify("首次写入赛高次元Cookie成功！", "", "");
    }
  }
}
$done({});