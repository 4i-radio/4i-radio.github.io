"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type StreamMode = "offline" | "live" | "after4i";

type ChatMessage = {
  user: string;
  text: string;
  host?: boolean;
};

type Archive = {
  id: string;
  date: string;
  title: string;
  game: string;
  duration: string;
  image: string;
  quote: string;
  chat: ChatMessage[];
};

const liveTitles = [
  "寝るまでランク",
  "昨日の続き",
  "負けたら寝る",
  "ちょっとだけ",
  "買ったのでやる",
];

const liveChat: ChatMessage[] = [
  { user: "くーるだうん", text: "ネタバレ・指示は聞いた時だけでお願いします", host: true },
  { user: "mzk_k", text: "こんばんは" },
  { user: "sushiumai", text: "今日それやるんだ" },
  { user: "northern_owl", text: "間に合った" },
  { user: "くーるだうん", text: "音大丈夫ですか", host: true },
  { user: "R_18", text: "ちょうどいい" },
  { user: "Pothos12345", text: "聞こえてるで" },
  { user: "tori_soba", text: "その装備で行くの" },
  { user: "くーるだうん", text: "これでいいでしょ。たぶん", host: true },
  { user: "mechanical_cat", text: "たぶん" },
  { user: "故に我在り", text: "いつまでやるつもりだ" },
  { user: "くーるだうん", text: "眠くなるまで", host: true },
  { user: "mzk_k", text: "いつもの" },
  { user: "SSSSS.T", text: "その道さっき通ってなかった？" },
  { user: "くーるだうん", text: "通ってない。似てるだけ", host: true },
  { user: "Pothos12345", text: "通ったで" },
  { user: "ずま0430", text: "通ってた気がする" },
  { user: "くーるだうん", text: "全員記憶がよすぎる", host: true },
  { user: "機材は必要経費", text: "山田！！！！！！" },
  { user: "機材は必要経費", text: "そこ右！！！！" },
  { user: "機材は必要経費", text: "右だって！！！！！！" },
  { user: "sushiumai", text: "急にうるさ" },
  { user: "くーるだうん", text: "花咲ブロックしていい？", host: true },
  { user: "Pothos12345", text: "右ちゃうで" },
  { user: "機材は必要経費", text: "一条まで敵になった" },
  { user: "northern_owl", text: "草" },
  { user: "くーるだうん", text: "コメント欄、今見てるからな", host: true },
  { user: "mechanical_cat", text: "見てないで前見て" },
  { user: "くーるだうん", text: "いや今の当たってないでしょ", host: true },
  { user: "R_18", text: "当たってたね" },
];

const after4iChat: ChatMessage[] = [
  { user: "くーるだうん", text: "4iから来た人もこんばんは。ちょっとだけやります", host: true },
  { user: "radio_sleep", text: "流れてきました" },
  { user: "mzk_k", text: "4時ですが" },
  { user: "sushiumai", text: "今日の放送面白かった" },
  { user: "くーるだうん", text: "ありがとうございます。本人に言ってください", host: true },
  { user: "AM2600", text: "山田さん寝ないんですか" },
  { user: "くーるだうん", text: "まだ眠くないんで", host: true },
  { user: "Pothos12345", text: "俺もう寝るわ。おやすみ" },
  { user: "radio_sleep", text: "一条さんいた" },
  { user: "くーるだうん", text: "一条さん、お疲れさまでした", host: true },
  { user: "故に我在り", text: "お疲れ。私はまだ起きているが" },
  { user: "ずま0430", text: "おつかれさまでしたー" },
  { user: "tori_soba", text: "花咲は？" },
  { user: "機材は必要経費", text: "いるけど！？！？？" },
  { user: "sushiumai", text: "いた" },
  { user: "機材は必要経費", text: "山田それ行ける行ける" },
  { user: "くーるだうん", text: "この時間の花咲を信用する理由がない", host: true },
  { user: "機材は必要経費", text: "なんでだよ！！！！" },
  { user: "SSSSS.T", text: "声でかいよ" },
  { user: "radio_sleep", text: "ラジオ二次会みたいになってる" },
  { user: "くーるだうん", text: "ゲームしますよ", host: true },
  { user: "northern_owl", text: "もう朝なんよ" },
  { user: "AM2600", text: "外明るくなってきた" },
  { user: "くーるだうん", text: "見なかったことにしましょう", host: true },
];

const rankArchiveChat: ChatMessage[] = [
  { user: "くーるだうん", text: "今日はランクだけ。連敗したら終わります", host: true },
  { user: "mzk_k", text: "それ朝までやるやつ" },
  { user: "SSSSS.T", text: "もう二敗してる" },
  { user: "くーるだうん", text: "今のは準備運動", host: true },
  { user: "tori_soba", text: "左から来てる" },
  { user: "くーるだうん", text: "聞こえてる。分かってる", host: true },
  { user: "R_18", text: "分かってなかったね" },
  { user: "sushiumai", text: "今の当たってた？" },
  { user: "くーるだうん", text: "いや今の当たってないでしょ", host: true },
  { user: "mechanical_cat", text: "リプレイ欲しい" },
  { user: "機材は必要経費", text: "山田そこ塗れ！！！！" },
  { user: "くーるだうん", text: "花咲、これやったことある？", host: true },
  { user: "機材は必要経費", text: "ない！！！！" },
  { user: "Pothos12345", text: "ないんかい" },
  { user: "northern_owl", text: "声だけは上級者" },
  { user: "くーるだうん", text: "次負けたら本当に終わる", host: true },
  { user: "mzk_k", text: "今何回目の次？" },
  { user: "くーるだうん", text: "数えるな", host: true },
];

const yesterdayArchiveChat: ChatMessage[] = [
  { user: "くーるだうん", text: "昨日の続き。たぶんこの先がボスです", host: true },
  { user: "sushiumai", text: "昨日もそう言ってなかった？" },
  { user: "くーるだうん", text: "昨日は偵察", host: true },
  { user: "northern_owl", text: "便利な言葉" },
  { user: "mzk_k", text: "もう来るよ" },
  { user: "くーるだうん", text: "待って待って待って", host: true },
  { user: "R_18", text: "はやい" },
  { user: "故に我在り", text: "同じ攻撃で三度死んでいないか" },
  { user: "くーるだうん", text: "神崎さんは横で見てるから言えるんですよ", host: true },
  { user: "故に我在り", text: "見ていても三度は死なん" },
  { user: "Pothos12345", text: "口より先に避けや" },
  { user: "くーるだうん", text: "今集中してるから", host: true },
  { user: "mechanical_cat", text: "喋り続けてるけど" },
  { user: "SSSSS.T", text: "あと少しだったね" },
  { user: "くーるだうん", text: "それ一番言われたくない", host: true },
  { user: "tori_soba", text: "偵察二日目" },
  { user: "くーるだうん", text: "今日は倒す", host: true },
];

const clearArchiveChat: ChatMessage[] = [
  { user: "くーるだうん", text: "完全初見です。匂わせもやめてください", host: true },
  { user: "mzk_k", text: "初見助かる" },
  { user: "northern_owl", text: "黙って見ます" },
  { user: "機材は必要経費", text: "俺これ知ってる！！！！" },
  { user: "くーるだうん", text: "花咲は今すぐ黙って", host: true },
  { user: "機材は必要経費", text: "まだ何も言ってないだろ！！" },
  { user: "Pothos12345", text: "存在がもうネタバレやねん" },
  { user: "sushiumai", text: "選択肢で止まった" },
  { user: "くーるだうん", text: "こういうのはちゃんと考えたい", host: true },
  { user: "故に我在り", text: "先ほどから同じ場所を往復しているが" },
  { user: "くーるだうん", text: "考えながら歩いてるんです", host: true },
  { user: "SSSSS.T", text: "山田そういうの気にするんだね" },
  { user: "くーるだうん", text: "気にしますよ普通に", host: true },
  { user: "mechanical_cat", text: "コメント欄全員息止めてる" },
  { user: "ずま0430", text: "何も言えないゲームって面白いな" },
  { user: "くーるだうん", text: "そのまま何も言わないでください", host: true },
  { user: "R_18", text: "厳しい" },
];

const hanazakiArchiveChat: ChatMessage[] = [
  { user: "くーるだうん", text: "花咲がしつこいので買いました", host: true },
  { user: "機材は必要経費", text: "絶対好きだから！！！！" },
  { user: "mzk_k", text: "始まった" },
  { user: "くーるだうん", text: "始めて十二分で会話がなくなった", host: true },
  { user: "sushiumai", text: "無心で洗ってる" },
  { user: "mechanical_cat", text: "左下ちょっと残ってる" },
  { user: "くーるだうん", text: "言うなら自分でやって", host: true },
  { user: "機材は必要経費", text: "そこ！ベンチの裏！！" },
  { user: "くーるだうん", text: "花咲の指示は聞かなくていいルールです", host: true },
  { user: "Pothos12345", text: "ルールの私物化" },
  { user: "故に我在り", text: "これはゲームなのか" },
  { user: "くーるだうん", text: "僕も今考えてる", host: true },
  { user: "機材は必要経費", text: "やめるな！！！！" },
  { user: "tori_soba", text: "勧めた本人が一番必死" },
  { user: "くーるだうん", text: "じゃあ花咲、Discord入って喋って", host: true },
  { user: "sushiumai", text: "消えた" },
  { user: "くーるだうん", text: "逃げたな", host: true },
  { user: "northern_owl", text: "気づいたら二時間経ってる" },
];

const ichijoArchiveChat: ChatMessage[] = [
  { user: "くーるだうん", text: "一条さんが来るまで倉庫作ります", host: true },
  { user: "mzk_k", text: "来なかったら？" },
  { user: "くーるだうん", text: "倉庫が大きくなる", host: true },
  { user: "SSSSS.T", text: "棚の並びきれいだね" },
  { user: "故に我在り", text: "整理するために箱を増やしていないか" },
  { user: "くーるだうん", text: "必要だから増えてるんです", host: true },
  { user: "ずま0430", text: "現実の部屋もこれくらい整理してそう" },
  { user: "くーるだうん", text: "ゲームと現実を一緒にするな", host: true },
  { user: "tori_soba", text: "後ろなんかいる" },
  { user: "くーるだうん", text: "そういうの早く言って", host: true },
  { user: "mechanical_cat", text: "倉庫に穴あいた" },
  { user: "Pothos12345", text: "まだやってたん" },
  { user: "northern_owl", text: "主役来た" },
  { user: "くーるだうん", text: "一条さんが遅いから二階までできました", host: true },
  { user: "Pothos12345", text: "待たせてへん。勝手に始めただけや" },
  { user: "機材は必要経費", text: "一条来たから終わり！？" },
  { user: "くーるだうん", text: "来たので続けます", host: true },
  { user: "Pothos12345", text: "なんでやねん" },
];

const defusalArchiveChat: ChatMessage[] = [
  { user: "くーるだうん", text: "花咲が説明書担当です。嫌な予感しかしない", host: true },
  { user: "機材は必要経費", text: "任せろ！！！！" },
  { user: "mzk_k", text: "始まる前から不安" },
  { user: "Pothos12345", text: "もう詰んでるやん" },
  { user: "くーるだうん", text: "最初の記号。丸が三つと線が一本", host: true },
  { user: "機材は必要経費", text: "待って説明書どこ！？" },
  { user: "くーるだうん", text: "花咲？", host: true },
  { user: "sushiumai", text: "説明書担当とは" },
  { user: "機材は必要経費", text: "あった！！丸を押せ！！" },
  { user: "くーるだうん", text: "丸が三つあるって言ってる", host: true },
  { user: "ずま0430", text: "花咲、まず順番に読め" },
  { user: "機材は必要経費", text: "山田が急かすから読めねえ！！" },
  { user: "くーるだうん", text: "急かしてるのは残り時間", host: true },
  { user: "SSSSS.T", text: "あと一分だね" },
  { user: "機材は必要経費", text: "青切れ！！！！" },
  { user: "くーるだうん", text: "理由は", host: true },
  { user: "機材は必要経費", text: "勘！！！！" },
  { user: "mechanical_cat", text: "終わった" },
  { user: "くーるだうん", text: "次、宮崎さん呼ぼう", host: true },
  { user: "機材は必要経費", text: "俺でいけるって！！！！" },
];

const locationArchiveChat: ChatMessage[] = [
  { user: "くーるだうん", text: "神崎さんがDiscordにいるので位置当てやります", host: true },
  { user: "故に我在り", text: "いるのではない。お前が呼んだのだ" },
  { user: "くーるだうん", text: "はい。ここどこですか", host: true },
  { user: "mzk_k", text: "いきなり丸投げ" },
  { user: "故に我在り", text: "湿度が高い。海洋性気候だろう" },
  { user: "くーるだうん", text: "国を聞いてます", host: true },
  { user: "機材は必要経費", text: "海あるぞ！！！！" },
  { user: "Pothos12345", text: "見たら分かるわ" },
  { user: "northern_owl", text: "屋根の色かわいい" },
  { user: "故に我在り", text: "国境とは人間が便宜的に引いた線にすぎん" },
  { user: "くーるだうん", text: "そういう話を聞いてるんじゃない", host: true },
  { user: "SSSSS.T", text: "神崎、旅行してるのに当たらないね" },
  { user: "故に我在り", text: "私は旅をしているのであって試験を受けているわけではない" },
  { user: "ずま0430", text: "道路と建物から絞れそうだけど" },
  { user: "くーるだうん", text: "宮崎さんが一番役に立ってる", host: true },
  { user: "機材は必要経費", text: "俺も海見つけた！！" },
  { user: "sushiumai", text: "ずっと見えてる" },
  { user: "くーるだうん", text: "神崎さん、最終回答", host: true },
  { user: "故に我在り", text: "さあな。降参もまた知性だ" },
  { user: "Pothos12345", text: "逃げよった" },
];

const monsterCollectArchiveChat: ChatMessage[] = [
  { user: "くーるだうん", text: "一条さんが横でうるさいのでやります", host: true },
  { user: "Pothos12345", text: "俺は事実を言うてるだけや" },
  { user: "mzk_k", text: "何の話？" },
  { user: "くーるだうん", text: "フェアリータイプの話です", host: true },
  { user: "Pothos12345", text: "あれは相性の辻褄が合うてへん" },
  { user: "SSSSS.T", text: "一条まだ言ってるの" },
  { user: "Pothos12345", text: "高崎は黙っとけ" },
  { user: "sushiumai", text: "いつもの二人" },
  { user: "機材は必要経費", text: "山田その青いやつにしろ！！" },
  { user: "くーるだうん", text: "色で決めてないから", host: true },
  { user: "ずま0430", text: "花咲、せめて名前で呼んでやれよ" },
  { user: "機材は必要経費", text: "まだ覚えてねえ！！" },
  { user: "northern_owl", text: "その子かわいい" },
  { user: "Pothos12345", text: "その技ちゃうやろ" },
  { user: "くーるだうん", text: "一条さん、さっき自分でやって負けてましたよね", host: true },
  { user: "Pothos12345", text: "操作と知識は別や" },
  { user: "故に我在り", text: "便利な区分だな" },
  { user: "くーるだうん", text: "だそうです", host: true },
  { user: "R_18", text: "知識担当が二人いる" },
  { user: "SSSSS.T", text: "操作担当はいないの？" },
];

const phasmophobiaArchiveChat: ChatMessage[] = [
  { user: "くーるだうん", text: "怖くはない。音が大きいだけ", host: true },
  { user: "mzk_k", text: "開始三分ですが" },
  { user: "機材は必要経費", text: "今の声俺じゃないからな！！" },
  { user: "ずま0430", text: "間違いなく花咲だった" },
  { user: "Pothos12345", text: "俺もう外おるで" },
  { user: "くーるだうん", text: "逃げるの早くないですか", host: true },
  { user: "Pothos12345", text: "生存戦略や" },
  { user: "SSSSS.T", text: "山田、後ろ" },
  { user: "くーるだうん", text: "高崎さん、そういうのやめて", host: true },
  { user: "故に我在り", text: "幽霊より生者の方が騒がしいな" },
  { user: "機材は必要経費", text: "いたいたいたいた！！！！" },
  { user: "sushiumai", text: "音量注意" },
  { user: "くーるだうん", text: "花咲の声で心霊現象が聞こえない", host: true },
  { user: "機材は必要経費", text: "このマイク感度いいから！！" },
  { user: "ずま0430", text: "今だけ下げろ" },
  { user: "mechanical_cat", text: "宮崎が一番冷静" },
  { user: "くーるだうん", text: "僕一人で中入ってません？", host: true },
  { user: "Pothos12345", text: "気のせいや" },
  { user: "くーるだうん", text: "全員帰ったな", host: true },
  { user: "northern_owl", text: "頑張って" },
];

const archives: Archive[] = [
  {
    id: "defusal",
    date: "2026.08.19",
    title: "花咲と解除する",
    game: "KEEP TALKING AND NOBODY EXPLODES",
    duration: "1:22:46",
    image: "/stream/games/defusal-game.webp",
    quote: "花咲、理由を言ってから切らせて",
    chat: defusalArchiveChat,
  },
  {
    id: "location",
    date: "2026.08.18",
    title: "神崎さんがいる",
    game: "GEOGUESSR",
    duration: "2:07:31",
    image: "/stream/games/location-guess.webp",
    quote: "そういう話を聞いてるんじゃない",
    chat: locationArchiveChat,
  },
  {
    id: "monster-collect",
    date: "2026.08.17",
    title: "一条さんがうるさいので",
    game: "POKÉMON LEGENDS: Z-A",
    duration: "3:48:09",
    image: "/stream/games/monster-collect.webp",
    quote: "操作と知識は別らしいです",
    chat: monsterCollectArchiveChat,
  },
  {
    id: "rank",
    date: "2026.08.16",
    title: "ランク",
    game: "SPLATOON 3",
    duration: "2:43:18",
    image: "/stream/games/ink-arena.webp",
    quote: "いや今の当たってないでしょ",
    chat: rankArchiveChat,
  },
  {
    id: "phasmophobia",
    date: "2026.08.15",
    title: "怖くはない",
    game: "PHASMOPHOBIA",
    duration: "1:41:52",
    image: "/stream/games/phasmophobia.webp",
    quote: "怖くはない。音が大きいだけ",
    chat: phasmophobiaArchiveChat,
  },
  {
    id: "yesterday",
    date: "2026.08.12",
    title: "昨日の続き",
    game: "ELDEN RING",
    duration: "4:12:51",
    image: "/stream/games/dark-fantasy.webp",
    quote: "この敵だけ判断が早すぎる",
    chat: yesterdayArchiveChat,
  },
  {
    id: "clear",
    date: "2026.08.08",
    title: "クリアする",
    game: "UNDERTALE",
    duration: "1:34:22",
    image: "/stream/games/pixel-rpg.webp",
    quote: "……僕が悪い？　いや六割ゲームが悪い",
    chat: clearArchiveChat,
  },
  {
    id: "hanazaki",
    date: "2026.08.05",
    title: "花咲が買えって言ったやつ",
    game: "POWERWASH SIMULATOR",
    duration: "1:58:04",
    image: "/stream/games/pressure-wash.webp",
    quote: "これ人に勧めるゲームなの？",
    chat: hanazakiArchiveChat,
  },
  {
    id: "ichijo",
    date: "2026.08.02",
    title: "一条さんが来るまで",
    game: "MINECRAFT",
    duration: "3:21:08",
    image: "/stream/games/voxel-warehouse.webp",
    quote: "倉庫だけ作って終わりそう",
    chat: ichijoArchiveChat,
  },
  {
    id: "after4i",
    date: "2026.08.01",
    title: "4i終わり　ちょっとだけ",
    game: "MONSTER HUNTER WILDS",
    duration: "3:06:27",
    image: "/stream/games/creature-hunt.webp",
    quote: "まだ眠くないんで",
    chat: after4iChat,
  },
];

function getJapanState(): StreamMode {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    weekday: "short",
    hour: "2-digit",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const value = (type: string) => parts.find((part) => part.type === type)?.value ?? "";
  const weekday = value("weekday");
  const hour = Number(value("hour"));

  if (weekday === "Sat" && hour >= 4 && hour < 6) return "after4i";

  const seed = Number(`${value("year")}${value("month")}${value("day")}${hour}`);
  return seed % 5 === 0 ? "live" : "offline";
}

function stateCopy(mode: StreamMode, latestArchive: Archive) {
  if (mode === "after4i") {
    return {
      label: "AFTER 4i",
      title: "4i終わり　ちょっとだけ",
      game: "MONSTER HUNTER WILDS",
      image: "/stream/games/creature-hunt.webp",
      quote: "まだ眠くないんで",
      viewers: 74,
    };
  }
  if (mode === "live") {
    const hour = new Date().getHours();
    return {
      label: "LIVE",
      title: liveTitles[hour % liveTitles.length],
      game: "SPLATOON 3",
      image: "/stream/games/ink-arena.webp",
      quote: "コメント欄、今見てるからな",
      viewers: 20 + ((hour * 17) % 61),
    };
  }
  return {
    label: "OFFLINE",
    title: latestArchive.title,
    game: `LAST STREAM · ${latestArchive.game}`,
    image: latestArchive.image,
    quote: latestArchive.quote,
    viewers: 0,
  };
}

export default function Home() {
  const [mode, setMode] = useState<StreamMode>("offline");
  const [selected, setSelected] = useState<Archive | null>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(18);
  const [visibleMessages, setVisibleMessages] = useState(4);
  const [latestArchive, setLatestArchive] = useState<Archive>(archives[0]);
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setLatestArchive(archives[Math.floor(Math.random() * archives.length)]);
    const requested = new URLSearchParams(window.location.search).get("state");
    if (requested === "live" || requested === "offline" || requested === "after4i") {
      setMode(requested);
      return;
    }
    setMode(getJapanState());
  }, []);

  const current = useMemo(() => stateCopy(mode, latestArchive), [mode, latestArchive]);
  const activeChat = selected?.chat ?? (
    mode === "after4i" ? after4iChat : mode === "offline" ? latestArchive.chat : liveChat
  );

  useEffect(() => {
    setVisibleMessages(4);
    let count = 4;
    let timer = 0;

    const reveal = () => {
      if (count >= activeChat.length) return;
      count += 1;
      setVisibleMessages(count);
      const upcoming = activeChat[count];
      const delay = upcoming?.user === "機材は必要経費" ? 650 : 2050;
      timer = window.setTimeout(reveal, delay);
    };

    const next = activeChat[count];
    timer = window.setTimeout(reveal, next?.user === "機材は必要経費" ? 650 : 2050);
    return () => window.clearTimeout(timer);
  }, [activeChat]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }, [visibleMessages]);

  useEffect(() => {
    if (!playing) return;
    const timer = window.setInterval(() => setProgress((value) => (value >= 99 ? 4 : value + 0.35)), 500);
    return () => window.clearInterval(timer);
  }, [playing]);

  const display = selected
    ? {
        label: "REPLAY",
        title: selected.title,
        game: selected.game,
        image: selected.image,
        quote: selected.quote,
        viewers: 0,
      }
    : current;

  function selectArchive(archive: Archive) {
    setSelected(archive);
    setPlaying(true);
    setProgress(7);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="くーるだうん LIVE トップ">
          <span className="brand-mark" aria-hidden="true">QD</span>
          <span>qooldown</span>
          <b>LIVE</b>
        </a>
        <nav aria-label="ページ内ナビゲーション">
          <a href="#archives">ARCHIVE</a>
          <a href="#about">ABOUT</a>
          <a className="creator-link" href="https://4i-radio.github.io/members/yamada/" target="_blank" rel="noreferrer">
            C.Yamada ↗
          </a>
        </nav>
      </header>

      <div className="page-shell" id="top">
        <section className="channel-head" aria-labelledby="channel-name">
          <img src="/stream/qooldown-avatar.jpg" alt="くーるだうんのアイコン" />
          <div>
            <p className="eyebrow">CHANNEL</p>
            <h1 id="channel-name">くーるだうん <span>@qooldown</span></h1>
            <p className="channel-note">ゲームやってます。配信時間は不定期。</p>
          </div>
          <span className={`state-pill ${mode === "offline" && !selected ? "is-offline" : ""}`}>
            <i /> {display.label}
          </span>
        </section>

        <section className="stream-grid" aria-label="配信画面とチャット">
          <div className="player-panel">
            <div className="player-stage">
              <img src={display.image} alt={`${display.game}をイメージした架空のゲーム画面`} />
              {mode === "offline" && !selected && (
                <div className="offline-cover">
                  <span>OFFLINE</span>
                  <p>次回の予定は決まっていません</p>
                </div>
              )}
              <div className="video-badge">
                <i /> {display.label}
              </div>
              <p className="spoken-caption">「{display.quote}」</p>
              <div className="player-controls">
                <button
                  type="button"
                  onClick={() => setPlaying((value) => !value)}
                  aria-label={playing ? "一時停止" : "再生"}
                >
                  {playing ? "Ⅱ" : "▶"}
                </button>
                <div className="progress-track" aria-hidden="true">
                  <span style={{ width: `${progress}%` }} />
                </div>
                <span className="control-time">
                  {selected ? selected.duration : mode === "offline" ? latestArchive.duration : "LIVE"}
                </span>
                <span aria-hidden="true">⌁</span>
              </div>
            </div>
            <div className="stream-meta">
              <div>
                <p className="stream-kicker">{display.game}</p>
                <h2>{display.title}</h2>
              </div>
              <div className="stream-stats">
                {display.viewers > 0 && <span>● {display.viewers} watching</span>}
                {selected && <button type="button" onClick={() => { setSelected(null); setPlaying(false); }}>× REPLAYを閉じる</button>}
              </div>
            </div>
          </div>

          <aside className="chat-panel" aria-label="配信チャット">
            <div className="chat-head">
              <span>STREAM CHAT</span>
              <i aria-label="接続中" />
            </div>
            <div className="chat-list" aria-live="polite">
              {activeChat.slice(0, visibleMessages).map((message, index) => (
                <p className="chat-message" key={`${message.user}-${index}`}>
                  <b className={message.host ? "is-host" : ""}>{message.user}</b>
                  <span>{message.text}</span>
                </p>
              ))}
              <div ref={chatEndRef} />
            </div>
            <div className="chat-input" aria-hidden="true">
              <span>メッセージを送信</span>
              <button type="button" tabIndex={-1}>CHAT</button>
            </div>
          </aside>
        </section>

        <section className="content-section" id="archives" aria-labelledby="archive-title">
          <div className="section-heading">
            <div>
              <p className="eyebrow">RECENT STREAMS</p>
              <h2 id="archive-title">最近の配信</h2>
            </div>
            <p>タイトルに深い意味はありません。</p>
          </div>
          <div className="archive-grid">
            {archives.map((archive) => (
              <button className="archive-card" type="button" key={archive.id} onClick={() => selectArchive(archive)}>
                <span className="archive-thumb">
                  <img src={archive.image} alt="" loading="lazy" decoding="async" />
                  <i>{archive.duration}</i>
                  <b>▶</b>
                </span>
                <span className="archive-body">
                  <small>{archive.date} · {archive.game}</small>
                  <strong>{archive.title}</strong>
                </span>
              </button>
            ))}
          </div>
        </section>

        <section className="lower-grid" id="about">
          <article className="about-card">
            <p className="eyebrow">ABOUT</p>
            <div className="about-person">
              <img src="/stream/qooldown-avatar.jpg" alt="" />
              <div>
                <h2>くーるだうん</h2>
                <p>@qooldown</p>
              </div>
            </div>
            <p className="about-copy">
              配信時間は不定期。顔出し・カメラなし。たまに知り合いがDiscordに入ります。<br />
              ネタバレ・指示は聞く時だけお願いします。
            </p>
            <div className="tag-list" aria-label="よく遊ぶジャンル">
              <span>FPS</span><span>ROGUELIKE</span><span>SIMULATION</span>
              <span>MANAGEMENT</span><span>たまに変なやつ</span>
            </div>
          </article>

          <article className="rules-card">
            <p className="eyebrow">CHAT RULES</p>
            <h2>配信ルール</h2>
            <ol>
              <li><span>01</span>喧嘩しない</li>
              <li><span>02</span>他配信者の名前を必要以上に出さない</li>
              <li><span>03</span>僕より先に攻略法を書くな</li>
              <li className="hanazaki-rule"><span>04</span>花咲には攻略法を書いていい</li>
            </ol>
          </article>
        </section>
      </div>

      <footer>
        <div className="footer-brand">
          <span className="brand-mark" aria-hidden="true">QD</span>
          <div><b>くーるだうん</b><small>GAME STREAM / @qooldown</small></div>
        </div>
        <div className="footer-links">
          <a href="https://4i-radio.github.io/members/yamada/" target="_blank" rel="noreferrer">山田空琉 個人ページ ↗</a>
          <a href="https://4i-radio.github.io/index.html" target="_blank" rel="noreferrer">4i RADIO ↗</a>
        </div>
        <small>PAGE BY C.YAMADA</small>
      </footer>
    </main>
  );
}
