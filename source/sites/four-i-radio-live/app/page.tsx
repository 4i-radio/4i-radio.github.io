"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  CLOSING_COMMENTS,
  CORNER_COMMENTS,
  GENERAL_COMMENTS,
  MONTHLY_COMMENTS,
  MONTHLY_TOPICS,
  NEWCOMER_THREADS,
  OPENING_COMMENTS,
  type CommentSeed,
} from "./radio-pools";

const JST_OFFSET = 9 * 60 * 60 * 1000;
const WEEK = 7 * 24 * 60 * 60 * 1000;
const AIR_LENGTH = 2 * 60 * 60 * 1000;

const MEMBERS = [
  "高崎翔真",
  "一条尊",
  "神崎真",
  "山田空琉",
  "宮崎一馬",
  "花咲朝陽",
];

const CORNERS = [
  { name: "ふつおた", people: ["高崎翔真"] },
  { name: "花咲の生活破綻報告", people: ["花咲朝陽"] },
  { name: "黒歴史供養コーナー", people: [] },
  { name: "今日の観葉植物", people: ["一条尊"] },
  { name: "今日の損切り", people: ["山田空琉"] },
  { name: "俺に語らせろ！", people: [] },
  { name: "レンタル花咲", people: ["花咲朝陽"] },
  { name: "3分で分かった気になる", people: [] },
  { name: "それ山田に聞くな", people: ["山田空琉"] },
  { name: "深夜の多数決", people: MEMBERS },
  { name: "高崎ならどうする？", people: ["高崎翔真"] },
  { name: "答えろ、神崎", people: ["神崎真"] },
  { name: "宮崎の趣味が決まらない", people: ["宮崎一馬"] },
];

const CORNER_DESCRIPTIONS: Record<string, string> = {
  "ふつおた": "届いた普通の投稿を読みます。普通で終わるとは限りません。",
  "花咲の生活破綻報告": "花咲の食事・仕事・睡眠など、今週の生活状況を確認します。",
  "黒歴史供養コーナー": "いまなら話せる過去を持ち寄って、深夜に供養します。",
  "今日の観葉植物": "一条の部屋をほぼ密林にしている観葉植物の近況。新入り、植え替え、剪定、置き場所の限界などを報告します。",
  "今日の損切り": "山田が今週の損切りを報告します。金額は言わない場合があります。",
  "俺に語らせろ！": "そのとき語りたいものがある人に、しばらくマイクを渡します。",
  "レンタル花咲": "誰かにレンタルされた花咲が、何をしてきたのか話します。",
  "3分で分かった気になる": "知らない話題を、知ったような顔で三分間解説します。",
  "それ山田に聞くな": "山田が知らなそうなことを、あえて山田に聞きます。",
  "深夜の多数決": "六人で決を取ります。三対三になった場合のことは考えていません。",
  "高崎ならどうする？": "日常の小さな悩みに、高崎がまず答えてから全員で検討します。",
  "答えろ、神崎": "短い質問に神崎が答えます。前提の検討だけで終わることもあります。",
  "宮崎の趣味が決まらない": "宮崎が勧められた趣味を試します。上達しても趣味とは限りません。",
};

type RadioComment = {
  handle: string;
  body: string;
  offset: number;
};

type Program = {
  start: number;
  dateLabel: string;
  topic: string;
  corners: typeof CORNERS;
  participants: string[];
  comments: RadioComment[];
};

type RadioClock = {
  now: number;
  start: number;
  next: number;
  isLive: boolean;
  demo: boolean;
};

function latestBroadcastStart(now: number) {
  const wallNow = now + JST_OFFSET;
  const wall = new Date(wallNow);
  const midnight = Date.UTC(
    wall.getUTCFullYear(),
    wall.getUTCMonth(),
    wall.getUTCDate(),
  );
  const daysSinceSaturday = (wall.getUTCDay() - 6 + 7) % 7;
  let saturdayAtTwo = midnight - daysSinceSaturday * 86400000 + 2 * 3600000;
  if (wallNow < saturdayAtTwo) saturdayAtTwo -= WEEK;
  return saturdayAtTwo - JST_OFFSET;
}

function dateKey(start: number) {
  const d = new Date(start + JST_OFFSET);
  return (
    d.getUTCFullYear() * 10000 +
    (d.getUTCMonth() + 1) * 100 +
    d.getUTCDate()
  );
}

function seeded(seed: number) {
  let value = seed >>> 0;
  return () => {
    value = (value * 1664525 + 1013904223) >>> 0;
    return value / 4294967296;
  };
}

function shuffle<T>(items: readonly T[], seed: number) {
  const random = seeded(seed);
  const result = [...items];
  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

function pickComments(
  items: readonly CommentSeed[],
  count: number,
  seed: number,
) {
  return shuffle(items, seed).slice(0, count);
}

function buildProgram(start: number): Program {
  const seed = dateKey(start);
  const wall = new Date(start + JST_OFFSET);
  const month = wall.getUTCMonth();
  const weekOfMonth = Math.floor((wall.getUTCDate() - 1) / 7);
  const topicOrder = shuffle(
    MONTHLY_TOPICS[month],
    wall.getUTCFullYear() * 100 + month + 1,
  );
  const topic = topicOrder[weekOfMonth % topicOrder.length];
  const weekIndex = Math.floor(start / WEEK);
  const majorityWeek = weekIndex % 7 === 0;
  const rotating = CORNERS.slice(1).filter((corner) => corner.name !== "深夜の多数決");
  const picked = shuffle(rotating, seed).slice(0, 3);
  const corners = majorityWeek
    ? [CORNERS[0], picked[0], picked[1], CORNERS[9]]
    : [CORNERS[0], ...picked];

  const required = new Set(corners.flatMap((corner) => corner.people));
  const targetCount = majorityWeek ? 6 : 4 + (seed % 2);
  for (const member of shuffle(MEMBERS, seed + 71)) {
    if (required.size >= targetCount) break;
    required.add(member);
  }

  const opening = pickComments(OPENING_COMMENTS, 3, seed + 101);
  const seasonal = pickComments(
    MONTHLY_COMMENTS[month] ?? [],
    2,
    seed + 211,
  );
  const general = pickComments(GENERAL_COMMENTS, 3, seed + 307);
  const closing = pickComments(CLOSING_COMMENTS, 2, seed + 401);
  const cornerGroups = corners.map((corner, index) =>
    pickComments(
      CORNER_COMMENTS[corner.name] ?? [],
      2,
      seed + 503 + index * 37,
    ),
  );
  const newcomerThread =
    seed % 4 === 0
      ? NEWCOMER_THREADS[(seed + weekIndex) % NEWCOMER_THREADS.length]
      : [];
  const source: CommentSeed[] = [
    ...opening,
    ...seasonal,
    ...cornerGroups[0],
    ...general.slice(0, 1),
    ...cornerGroups[1],
    ...newcomerThread,
    ...general.slice(1, 2),
    ...cornerGroups[2],
    ...general.slice(2),
    ...cornerGroups[3],
    ...closing,
  ];

  const intervalRandom = seeded(seed + 809);
  const intervalWeights = source.map(() => 0.62 + intervalRandom() * 0.9);
  const totalWeight = intervalWeights.reduce((sum, weight) => sum + weight, 0);
  let elapsedWeight = 0;
  const availableSeconds = AIR_LENGTH / 1000 - 95;
  const comments = source.map(([handle, body], index) => {
    const offset = 15 + Math.floor((elapsedWeight / totalWeight) * availableSeconds);
    elapsedWeight += intervalWeights[index];
    return { handle, body, offset };
  });

  return {
    start,
    dateLabel: new Intl.DateTimeFormat("ja-JP", {
      timeZone: "Asia/Tokyo",
      month: "2-digit",
      day: "2-digit",
      weekday: "short",
    }).format(start),
    topic,
    corners,
    participants: MEMBERS.filter((member) => required.has(member)),
    comments,
  };
}

function formatClock(ms: number) {
  if (ms <= 0) return "00:00:00";
  const total = Math.floor(ms / 1000);
  const days = Math.floor(total / 86400);
  const hours = Math.floor((total % 86400) / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;
  return `${days ? `${days}D ` : ""}${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
}

function formatJst(now: number) {
  return new Intl.DateTimeFormat("ja-JP", {
    timeZone: "Asia/Tokyo",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(now);
}

export default function Home() {
  const [clock, setClock] = useState<RadioClock | null>(null);
  const [selectedCornerName, setSelectedCornerName] = useState(CORNERS[0].name);
  const commentDialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const tick = () => {
      const now = Date.now();
      const start = latestBroadcastStart(now);
      const demo = new URLSearchParams(window.location.search).get("demo") === "live";
      setClock({
        now,
        start,
        next: start + WEEK,
        isLive: demo || (now >= start && now < start + AIR_LENGTH),
        demo,
      });
    };
    tick();
    const timer = window.setInterval(tick, 1000);
    return () => window.clearInterval(timer);
  }, []);

  const programStart = clock?.start;
  const program = useMemo(
    () => (programStart ? buildProgram(programStart) : null),
    [programStart],
  );

  const elapsed = clock
    ? clock.demo
      ? 47 * 60 * 1000
      : Math.max(0, clock.now - clock.start)
    : 0;
  const currentCorner = program
    ? program.corners[Math.min(3, Math.floor(elapsed / (AIR_LENGTH / 4)))]
    : null;
  const visibleComments = program
    ? clock?.isLive
      ? program.comments.filter((comment) => comment.offset * 1000 <= elapsed)
      : program.comments
    : [];
  const mobileCommentStart = clock?.isLive
    ? Math.max(0, visibleComments.length - 6)
    : 0;
  const mobileComments = visibleComments.slice(
    mobileCommentStart,
    mobileCommentStart + 6,
  );
  const selectedCorner =
    CORNERS.find((corner) => corner.name === selectedCornerName) ?? CORNERS[0];
  const selectedCornerIndex = CORNERS.findIndex(
    (corner) => corner.name === selectedCorner.name,
  );

  const selectCorner = (name: string) => {
    const transitionDocument = document as Document & {
      startViewTransition?: (callback: () => void) => void;
    };
    const update = () => setSelectedCornerName(name);

    if (
      transitionDocument.startViewTransition &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      transitionDocument.startViewTransition(update);
      return;
    }

    update();
  };

  return (
    <main className="radio-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="4i RADIO LIVE トップ">
          <span className="brand-mark" aria-hidden="true">
            4i
          </span>
          <span>
            <strong>RADIO LIVE</strong>
            <small>FRIDAY 26:00 / TOKYO</small>
          </span>
        </a>
        <nav aria-label="サイト内ナビゲーション">
          <a href="#last-log">LAST LOG</a>
          <a href="#about">ABOUT</a>
          <a href="https://4i-radio.github.io/index.html" target="_blank" rel="noreferrer">
            ARCHIVE <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>

      <section className="broadcast-stage" id="top">
        <div className="status-strip">
          <div className={clock?.isLive ? "status live" : "status"}>
            <span className="status-dot" aria-hidden="true" />
            {clock?.isLive ? "ON AIR" : "OFF AIR"}
          </div>
          <p>{clock ? `${formatJst(clock.now)} JST` : "JSTを確認しています"}</p>
          {clock?.demo && <span className="demo-label">DEMO MODE</span>}
        </div>

        <div className="broadcast-grid">
          <section className="console-panel" aria-labelledby="broadcast-title">
            <div className="console-heading">
              <p className="eyebrow">
                {clock?.isLive ? "CURRENT PROGRAM" : "NEXT BROADCAST"}
              </p>
              <h1 id="broadcast-title">
                {clock?.isLive ? "4i RADIO LIVE" : "次回放送　金曜26:00"}
              </h1>
              <p className="lead">
                {clock?.isLive
                  ? program?.topic
                  : "現在、放送はありません。"}
              </p>
            </div>

            <div className={`waveform ${clock?.isLive ? "is-playing" : ""}`} aria-label={clock?.isLive ? "放送中の波形" : "停止中の波形"}>
              {Array.from({ length: 72 }, (_, index) => (
                <i key={index} style={{ "--bar": (index * 7) % 17 } as React.CSSProperties} />
              ))}
            </div>

            <div className={`now-meta ${clock?.isLive ? "is-live" : "is-off"}`}>
              <div>
                <span>{clock?.isLive ? "NOW" : "START IN"}</span>
                <strong>
                  {clock
                    ? clock.isLive
                      ? currentCorner?.name
                      : formatClock(clock.next - clock.now)
                    : "--:--:--"}
                </strong>
              </div>
              <div>
                <span>{clock?.isLive ? "TALKING" : "SCHEDULE"}</span>
                <strong>
                  {clock?.isLive
                    ? program?.participants.join(" / ")
                    : "FRIDAY 26:00-28:00"}
                </strong>
              </div>
            </div>

            <div className="mobile-stage-actions">
              <a href="#last-log">
                {clock?.isLive ? "コメントを見る" : "前回のコメント"}
              </a>
              <a href="https://4i-radio.github.io/index.html" target="_blank" rel="noreferrer">
                アーカイブ ↗
              </a>
            </div>

          </section>

          <section className="comment-panel" id="last-log" aria-labelledby="comment-title">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">{clock?.isLive ? "LIVE COMMENTS" : "LAST COMMENTS"}</p>
                <h2 id="comment-title">
                  {clock?.isLive ? "放送中" : "前回の放送"}
                </h2>
              </div>
              <span className="log-date">{program?.dateLabel ?? "-- / --"}</span>
            </div>
            <p className="retention-note">
              {clock?.isLive
                ? "コメントは放送に合わせて、ぽつぽつ増えます。"
                : "このログは次回の放送開始時に入れ替わります。"}
            </p>
            <ol className="comment-list comment-list-desktop" aria-live={clock?.isLive ? "polite" : "off"}>
              {visibleComments.map((comment, index) => (
                <li key={`${comment.handle}-${index}`}>
                  <div className="comment-id">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <strong>{comment.handle}</strong>
                  </div>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ol>
            <ol className="comment-list comment-list-mobile" aria-live={clock?.isLive ? "polite" : "off"}>
              {mobileComments.map((comment, index) => (
                <li key={`mobile-${comment.handle}-${mobileCommentStart + index}`}>
                  <div className="comment-id">
                    <span>{String(mobileCommentStart + index + 1).padStart(2, "0")}</span>
                    <strong>{comment.handle}</strong>
                  </div>
                  <p>{comment.body}</p>
                </li>
              ))}
            </ol>
            {clock && mobileComments.length === 0 && (
              <p className="comment-empty">コメントはまだありません。</p>
            )}
            {visibleComments.length > mobileComments.length && (
              <button
                className="all-comments-button"
                type="button"
                onClick={() => commentDialogRef.current?.showModal()}
              >
                全コメントを見る <span>{visibleComments.length}</span>
              </button>
            )}
          </section>
        </div>
      </section>

      <dialog
        className="comment-sheet"
        ref={commentDialogRef}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="comment-sheet-panel">
          <div className="sheet-handle" aria-hidden="true" />
          <header>
            <div>
              <p className="eyebrow">{clock?.isLive ? "LIVE COMMENTS" : "LAST COMMENTS"}</p>
              <h2>{clock?.isLive ? "放送中のコメント" : "前回のコメント"}</h2>
            </div>
            <button type="button" onClick={() => commentDialogRef.current?.close()} aria-label="閉じる">×</button>
          </header>
          <ol className="comment-list comment-list-sheet">
            {visibleComments.map((comment, index) => (
              <li key={`sheet-${comment.handle}-${index}`}>
                <div className="comment-id">
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <strong>{comment.handle}</strong>
                </div>
                <p>{comment.body}</p>
              </li>
            ))}
          </ol>
          <form method="dialog"><button className="comment-sheet-close" type="submit">閉じる</button></form>
        </div>
      </dialog>

      <section className="program-record" aria-labelledby="record-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">LATEST PROGRAM NOTE</p>
            <h2 id="record-title">直近の放送内容</h2>
          </div>
          <p>
            今週のテーマと放送コーナーです。内容は予告なく変更になる場合があります。
          </p>
        </div>

        <div className="program-summary">
          <div className="program-topic">
            <span>MONTHLY TOPIC</span>
            <strong>{program?.topic ?? "時刻を確認しています"}</strong>
            <dl>
              <div>
                <dt>DATE</dt>
                <dd>{program?.dateLabel ?? "-- / --"} 26:00</dd>
              </div>
              <div>
                <dt>MEMBERS</dt>
                <dd>{program?.participants.join(" / ") ?? "--"}</dd>
              </div>
            </dl>
          </div>
          <ol className="program-timeline">
            {program?.corners.map((corner, index) => (
              <li key={corner.name}>
                <time>{`2${6 + Math.floor(index / 2)}:${index % 2 === 0 ? "05" : "35"}`}</time>
                <div>
                  <span>0{index + 1}</span>
                  <strong>{corner.name}</strong>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="corner-index" aria-labelledby="corner-title">
        <div className="section-heading compact">
          <div>
            <p className="eyebrow">REGULAR CORNERS</p>
            <h2 id="corner-title">定番コーナー</h2>
          </div>
          <p>毎週すべてを行うわけではありません。</p>
        </div>
        <div className="corner-list">
          {CORNERS.map((corner, index) => (
            <article key={corner.name}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{corner.name}</h3>
                <p>{CORNER_DESCRIPTIONS[corner.name]}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="corner-mobile">
          <div className="corner-mobile-selector" role="tablist" aria-label="定番コーナーを選択">
            {CORNERS.map((corner, index) => (
              <button
                id={`corner-tab-${index}`}
                key={`mobile-${corner.name}`}
                type="button"
                role="tab"
                aria-selected={corner.name === selectedCorner.name}
                aria-controls="corner-mobile-detail"
                onClick={() => selectCorner(corner.name)}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                {corner.name}
              </button>
            ))}
          </div>
          <article
            id="corner-mobile-detail"
            role="tabpanel"
            aria-labelledby={`corner-tab-${selectedCornerIndex}`}
            key={selectedCorner.name}
          >
            <span>{String(selectedCornerIndex + 1).padStart(2, "0")}</span>
            <h3>{selectedCorner.name}</h3>
            <p>{CORNER_DESCRIPTIONS[selectedCorner.name]}</p>
          </article>
        </div>
      </section>

      <section className="about-live" id="about" aria-labelledby="about-title">
        <div>
          <p className="eyebrow">COMMENT LOG</p>
          <h2 id="about-title">放送終了後は、コメントログのみ公開しています。</h2>
        </div>
        <div className="about-grid">
          <p>
            コメントログは、次回の放送開始時に更新されます。
          </p>
          <p>
            過去の放送は、公式サイトのアーカイブからご覧ください。
          </p>
        </div>
        <a className="archive-button" href="https://4i-radio.github.io/index.html" target="_blank" rel="noreferrer">
          4iラジオ公式サイト・アーカイブへ <span aria-hidden="true">↗</span>
        </a>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top">
          <span className="brand-mark" aria-hidden="true">4i</span>
          <span>
            <strong>RADIO LIVE</strong>
            <small>FRIDAY 26:00 / TOKYO</small>
          </span>
        </a>
        <p>4i RADIO / SINCE 2017</p>
      </footer>
    </main>
  );
}
