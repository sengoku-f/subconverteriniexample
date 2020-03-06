/*

[task_local]
6 9 * * *  saigaocy.js

*/

let Cookie = $prefs.valueForKey("saigaocyCookie");

let Req = {
  url: "https://saigaocy.moe/wp-json/b2/v1/userMission",
  method: "POST",
  headers: {
    Cookie: Cookie,
    Origin: "https://saigaocy.moe",
    Referer: "https://saigaocy.moe/mission/today",
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36"
  }
};

$task.fetch(Req).then(response => {
  try {
    let doc = JSON.parse(response.body);
    if (doc["ret"] == 1) {
      $notify(
        "赛高次元",
        "成功",
        `${doc["msg"]}\n获得星币${doc["trafficInfo"]["lastUsedTraffic"]}\n剩余星币${doc["trafficInfo"]["unUsedTraffic"]}`
      );
    } else {
      $notify("赛高次元", "成功", doc["msg"]);
    }
  } catch (error) {
    $notify("赛高次元", "失败", error);
  }
});