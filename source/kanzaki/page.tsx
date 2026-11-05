"use client";

import { useMemo, useState } from "react";
import { KANZAKI_QUOTES } from "./quotes";

const THEMES = [
  "すべて",
  "孤独・距離",
  "自由・選択",
  "愛・他者",
  "知ること",
  "旅・逃避",
  "変化・再読",
  "出典不明",
] as const;

const BOOKS = [
  {
    title: "ソクラテスの弁明",
    author: "プラトン",
    note: "最も基本的で、最も難しい態度について。",
    mark: "01",
  },
  {
    title: "エチカ",
    author: "バールーフ・スピノザ",
    note: "理解は制御の第一歩ではある。最終地点ではない。",
    mark: "02",
  },
  {
    title: "パンセ",
    author: "ブレーズ・パスカル",
    note: "同じ箇所を何年も記録している。削除する理由もない。",
    mark: "03",
  },
  {
    title: "論理哲学論考",
    author: "ルートヴィヒ・ウィトゲンシュタイン",
    note: "語れないものが、存在しないとは限らない。",
    mark: "04",
  },
  {
    title: "処世術箴言",
    author: "アルトゥル・ショーペンハウアー",
    note: "孤独を美徳にする必要はない。距離の問題として読む。",
    mark: "05",
  },
  {
    title: "自省録",
    author: "マルクス・アウレリウス",
    note: "外部環境の影響を過小評価している。それでも再読した。",
    mark: "06",
  },
] as const;

function eraValue(year: string) {
  if (year.startsWith("H")) return 1988 + Number(year.slice(1));
  if (year.startsWith("R")) return 2018 + Number(year.slice(1));
  return 9999;
}

export default function Home() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentTheme, setCurrentTheme] = useState<(typeof THEMES)[number]>("すべて");
  const currentQuote = KANZAKI_QUOTES[currentIndex];

  const matchingIndices = useMemo(
    () =>
      KANZAKI_QUOTES.map((quote, index) => ({ quote, index }))
        .filter(({ quote }) => currentTheme === "すべて" || quote.theme === currentTheme)
        .map(({ index }) => index),
    [currentTheme],
  );

  const timeline = useMemo(
    () =>
      matchingIndices
        .flatMap((quoteIndex) =>
          KANZAKI_QUOTES[quoteIndex].notes.map((note) => ({
            ...note,
            quoteIndex,
            author: KANZAKI_QUOTES[quoteIndex].author,
            work: KANZAKI_QUOTES[quoteIndex].work,
          })),
        )
        .sort((a, b) => eraValue(a.year) - eraValue(b.year) || a.quoteIndex - b.quoteIndex),
    [matchingIndices],
  );

  function chooseTheme(theme: (typeof THEMES)[number]) {
    setCurrentTheme(theme);
    if (theme === "すべて") return;
    const firstMatch = KANZAKI_QUOTES.findIndex((quote) => quote.theme === theme);
    if (firstMatch >= 0) setCurrentIndex(firstMatch);
  }

  function showAnotherFragment() {
    const pool = matchingIndices.length ? matchingIndices : KANZAKI_QUOTES.map((_, index) => index);
    if (pool.length === 1) {
      setCurrentIndex(pool[0]);
      return;
    }

    let next = currentIndex;
    while (next === currentIndex) {
      next = pool[Math.floor(Math.random() * pool.length)];
    }
    setCurrentIndex(next);
  }

  function openQuote(index: number) {
    setCurrentIndex(index);
    window.setTimeout(() => {
      document.getElementById("fragment")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 0);
  }

  const themeButtons = (location: "desktop" | "mobile") => (
    <div className={`theme-list theme-list--${location}`} aria-label="テーマで絞り込む">
      {THEMES.map((theme) => (
        <button
          key={`${location}-${theme}`}
          type="button"
          className={theme === currentTheme ? "is-active" : ""}
          aria-pressed={theme === currentTheme}
          onClick={() => chooseTheme(theme)}
        >
          <span>{theme}</span>
          <small>
            {theme === "すべて"
              ? KANZAKI_QUOTES.length
              : KANZAKI_QUOTES.filter((quote) => quote.theme === theme).length}
          </small>
        </button>
      ))}
    </div>
  );

  return (
    <div className="site-shell">
      <header className="masthead">
        <div className="student-record" aria-hidden="true">
          <img
            src="./kanzaki-student-id.jpg"
            alt=""
          />
          <span className="student-number-mask" />
          <span className="student-number-mask student-number-mask--shadow" />
          <span className="student-record-correction student-record-correction--admission">2016年4月</span>
          <span className="student-record-correction student-record-correction--expiry">2020年3月31日</span>
        </div>

        <div className="masthead-topline">
          <p>4i-RADIO / PERSONAL PAGE</p>
          <nav aria-label="ページ内ナビゲーション">
            <a href="#fragment">一節</a>
            <a href="#books">書籍</a>
            <a href="#archive">書庫</a>
          </nav>
        </div>

        <div className="identity-copy">
          <p className="record-code">RECORD / H28 / PHILOSOPHY</p>
          <h1>
            神崎 真
            <span>KANZAKI MAKOTO</span>
          </h1>
          <p>文章、書籍、考えたこと。必要なものだけ。</p>
        </div>
      </header>

      <main>
        <section className="fragment-section" id="fragment">
          <header className="section-heading">
            <div>
              <p className="section-code">RANDOM FRAGMENT</p>
              <h2>一節を読む</h2>
            </div>
            <p className="section-aside">選択機能・分類・再読記録 / C.Y.</p>
          </header>

          <div className="fragment-grid">
            <article className="quote-panel" aria-live="polite">
              <div className="quote-meta">
                <span>{currentQuote.theme}</span>
                <small>{currentQuote.kind}</small>
              </div>
              <p className="quote-author">{currentQuote.author}</p>
              <p className="quote-work">{currentQuote.work}</p>
              <blockquote>{currentQuote.text}</blockquote>

              <div className="note-ledger note-ledger--desktop">
                {currentQuote.notes.map((note) => (
                  <div className="note-entry" key={`${currentIndex}-${note.year}-${note.text}`}>
                    <span>{note.year}</span>
                    <p>{note.text}</p>
                  </div>
                ))}
              </div>

              <details className="note-ledger-mobile">
                <summary>書き込みを読む（{currentQuote.notes.length}件）</summary>
                <div className="note-ledger">
                  {currentQuote.notes.map((note) => (
                    <div className="note-entry" key={`mobile-${currentIndex}-${note.year}-${note.text}`}>
                      <span>{note.year}</span>
                      <p>{note.text}</p>
                    </div>
                  ))}
                </div>
              </details>

              <button className="random-button" type="button" onClick={showAnotherFragment}>
                <span>別の一節</span>
                <span aria-hidden="true">↗</span>
              </button>
            </article>

            <aside className="theme-index">
              <p className="side-code">INDEX / C.Y.</p>
              <h3>テーマから探す</h3>
              {themeButtons("desktop")}
              <p className="side-note">
                本人からの指定はランダム表示のみ。分類と件数表示は制作者判断で追加。
              </p>
            </aside>
          </div>

          <details className="mobile-theme-index">
            <summary>テーマから探す</summary>
            {themeButtons("mobile")}
          </details>
        </section>

        <section className="books-section" id="books">
          <header className="section-heading">
            <div>
              <p className="section-code">BOOKS LEFT OPEN</p>
              <h2>何度も読み返したもの</h2>
            </div>
            <p className="section-aside">推薦図書ではない。</p>
          </header>

          <div className="book-grid book-grid--desktop">
            {BOOKS.map((book) => (
              <article className="book-entry" key={book.title}>
                <span className="book-mark">{book.mark}</span>
                <div>
                  <h3>{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <p className="book-note">{book.note}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="book-list-mobile">
            {BOOKS.slice(0, 3).map((book) => (
              <article className="book-entry" key={`mobile-${book.title}`}>
                <span className="book-mark">{book.mark}</span>
                <div>
                  <h3>{book.title}</h3>
                  <p className="book-author">{book.author}</p>
                  <p className="book-note">{book.note}</p>
                </div>
              </article>
            ))}
            <details className="more-books">
              <summary>残りの3冊を見る</summary>
              {BOOKS.slice(3).map((book) => (
                <article className="book-entry" key={`more-${book.title}`}>
                  <span className="book-mark">{book.mark}</span>
                  <div>
                    <h3>{book.title}</h3>
                    <p className="book-author">{book.author}</p>
                    <p className="book-note">{book.note}</p>
                  </div>
                </article>
              ))}
            </details>
          </div>
        </section>

        <section className="archive-section" id="archive">
          <details className="archive-drawer">
            <summary>
              <span>
                <small>ARCHIVE / C.Y. EXPERIMENTS</small>
                引用一覧・年代順・出典
              </span>
              <span aria-hidden="true">＋</span>
            </summary>

            <div className="archive-inner">
              <details className="archive-module">
                <summary>引用一覧を開く（{matchingIndices.length}件）</summary>
                <div className="quote-index-list">
                  {matchingIndices.map((index) => {
                    const quote = KANZAKI_QUOTES[index];
                    return (
                      <button type="button" key={`archive-${index}`} onClick={() => openQuote(index)}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        <span>
                          <strong>{quote.author}</strong>
                          <small>{quote.work} / {quote.theme}</small>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </details>

              <details className="archive-module chronology-module">
                <summary>年代順の書き込みを開く（PCのみ）</summary>
                <div className="timeline">
                  {timeline.map((entry, index) => (
                    <button
                      type="button"
                      className="timeline-entry"
                      key={`${entry.year}-${entry.quoteIndex}-${index}`}
                      onClick={() => openQuote(entry.quoteIndex)}
                    >
                      <span>{entry.year}</span>
                      <span>
                        <strong>{entry.text}</strong>
                        <small>{entry.author} / {entry.work}</small>
                      </span>
                    </button>
                  ))}
                </div>
              </details>

              <div className="sy-experiment">
                <p>C.Y. EXPERIMENTS / REVISION 02</p>
                <p>スマートフォン版から年代順表示を除外。本人確認済み。</p>
                <p className="kanzaki-reply">神崎：最初から要らんと言っただろう。</p>
              </div>

              <p className="source-note">
                ※ フロイトの一節を除き、日本語は版ごとの訳差を避けるため原典の要旨として整理した仮文です。公開用の訳文・出典は別途固定予定。
              </p>
            </div>
          </details>

          <p className="mobile-chronology-note">年代順表示はPC版にのみ残しています。— C.Y.</p>
        </section>
      </main>

      <footer>
        <p>4i-RADIO / KANZAKI MAKOTO</p>
        <p>design / code: C.Yamada</p>
      </footer>
    </div>
  );
}
