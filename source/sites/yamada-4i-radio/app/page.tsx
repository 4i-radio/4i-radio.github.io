const gameLogs = [
  {
    date: "2026.06.12",
    tag: "SPLATOON",
    title: "X帯まで戻した",
    body: "やっと戻った。二度とやらない。多分明日やる。",
  },
  {
    date: "2026.03.04",
    tag: "MINECRAFT",
    title: "倉庫を作り直した",
    body: "前のやつが使いにくかったので全部壊した。今度は大丈夫だと思う。",
  },
  {
    date: "2025.11.19",
    tag: "MONSTER HUNTER",
    title: "装備を作っていたら一日終わった",
    body: "必要な素材は揃った。ゲームはほとんど進んでない。",
  },
  {
    date: "2025.05.02",
    tag: "UNDERTALE",
    title: "Gルートまでやった",
    body: "やった。やらなくてもよかった気はする。",
  },
] as const;

const updates = [
  ["2026.08.20", "配信ページを公開しました"],
  ["2026.08.19", "UIを大きく変更しました。前よりスマホで見やすいはず"],
  ["2026.08.16", "配信ページのチャット欄がおかしかったので直しました"],
  ["2026.07.02", "ゲームログを追加"],
  ["2025.12.29", "リンク切れを整理"],
  ["2021.04.10", "サーバー移転"],
] as const;

export default function Home() {
  return (
    <main className="site-shell">
      <div className="page-frame">
        <header className="topbar">
          <a className="wordmark" href="#top" aria-label="くーるだうん トップへ">
            くーるだうん
          </a>
          <nav aria-label="ページ内リンク">
            <a href="#stream">STREAM</a>
            <a href="#notes">NOTES</a>
            <a
              href="https://4i-radio.github.io/index.html"
              target="_blank"
              rel="noreferrer"
            >
              4i RADIO ↗
            </a>
          </nav>
        </header>

        <div className="rule" />

        <section className="profile" id="top" aria-labelledby="profile-title">
          <div className="avatar-window">
            <img
              src="/members/yamada/yamada-avatar.jpg"
              alt="紫色の犬系アバター"
              width="1024"
              height="1536"
            />
          </div>

          <div className="profile-copy">
            <p className="kicker">game / stream / 4i radio</p>
            <h1 id="profile-title">くーるだうん</h1>
            <p className="account">@qooldown</p>
            <p className="intro">
              ゲームしたり、ラジオに出たりしています。
              <br />
              配信はだいたい突然です。
            </p>
            <div className="profile-meta" aria-label="サイト情報">
              <span>since 2017 / version 4</span>
              <span>site by C.Yamada</span>
            </div>
          </div>
        </section>

        <section className="stream-stack" id="stream" aria-labelledby="stream-title">
          <a
            className="stream-panel-link"
            href="https://4i-radio.github.io/stream/"
            target="_blank"
            rel="noreferrer"
            aria-label="くーるだうんの配信ページを見る"
          >
            <article className="stream-panel">
              <div className="panel-topline">
                <p>LAST STREAM</p>
                <span className="offline"><i aria-hidden="true" /> OFFLINE</span>
              </div>
              <p className="stream-game">SPLATOON 3</p>
              <h2 id="stream-title">ランク</h2>
              <p className="stream-data">2026.08.16 / 2:43:18</p>

              <blockquote aria-label="配信チャット抜粋">
                <p>
                  <b>機材は必要経費</b>
                  <span>クールダウン！　クールダウン！</span>
                </p>
                <p>
                  <b className="broadcaster-name">くーるだうん</b>
                  <span>今落ち着いたら普通に負けるんだけど</span>
                </p>
                <p>
                  <b>Pothos12345</b>
                  <span>もう負けとるで</span>
                </p>
              </blockquote>

              <div className="stream-link-state">
                <span className="stream-site-identity">
                  <img
                    src="/members/yamada/yamada-avatar.jpg"
                    alt=""
                    width="40"
                    height="40"
                  />
                  <span>
                    <b>くーるだうん / @qooldown</b>
                    <small>たまにゲーム配信してます。暇だったらどうぞ。</small>
                  </span>
                </span>
                <strong>配信ページを見る ↗</strong>
              </div>
            </article>
          </a>

          <aside className="radio-strip" aria-label="4iラジオ 次回放送">
            <div>
              <span>NEXT / 4i RADIO</span>
              <strong>FRI 26:00</strong>
            </div>
            <a
              href="https://4i-radio.github.io/index.html"
              target="_blank"
              rel="noreferrer"
            >
              公式サイト ↗
            </a>
          </aside>
        </section>

        <section className="notes-stack" id="notes" aria-label="ゲームと相場の雑記">
          <details className="foldout" id="games">
            <summary>
              <span className="foldout-title"><i>01</i> GAME LOG</span>
              <span className="foldout-meta">last updated 2026.06.12</span>
            </summary>
            <div className="foldout-body">
              <div className="game-list">
                {gameLogs.map((game) => (
                  <article className="game-entry" key={`${game.date}-${game.title}`}>
                    <div className="game-meta">
                      <time dateTime={game.date.replaceAll(".", "-")}>{game.date}</time>
                      <span>{game.tag}</span>
                    </div>
                    <div>
                      <h3>{game.title}</h3>
                      <p>{game.body}</p>
                    </div>
                  </article>
                ))}
              </div>
              <p className="old-note">
                ほか：ポケモン、エルデンリング、FPSなど。合コンでゲームの話をしすぎない。
              </p>
            </div>
          </details>

          <details className="foldout">
            <summary>
              <span className="foldout-title"><i>02</i> MARKET MEMO</span>
              <span className="foldout-meta">last updated 2025.12.03</span>
            </summary>
            <div className="foldout-body memo-body">
              <time dateTime="2025-12-03">2025.12.03</time>
              <p>最近は特に書くことないです。相場は見ています。</p>
              <small>※投資の参考にはしないでください</small>
            </div>
          </details>
        </section>

        <details className="update-details" id="log">
          <summary>
            <span>UPDATE LOG</span>
            <span>last 2026.08.20</span>
          </summary>
          <ol className="update-list">
            {updates.map(([date, text]) => (
              <li key={`${date}-${text}`}>
                <time dateTime={date.replaceAll(".", "-")}>{date}</time>
                <span>{text}</span>
              </li>
            ))}
          </ol>
        </details>

        <div className="quiet-links" aria-label="小さなリンク集">
          <span>links:</span>
          <a
            href="https://4i-radio.github.io/farm/"
            target="_blank"
            rel="noreferrer"
          >
            アイス美味しいので、良かったら ↗
          </a>
          <span aria-hidden="true">·</span>
          <a
            href="https://4i-radio.github.io/members/kanzaki/"
            target="_blank"
            rel="noreferrer"
          >
            神崎さんに頼まれて作ったページ ↗
          </a>
        </div>

        <footer>
          <p>© C.Yamada</p>
          <p>yamada-4i-radio / ver.4</p>
        </footer>
      </div>
    </main>
  );
}
