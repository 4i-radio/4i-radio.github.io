import {
  MobileMemberNotes,
  MobileMiyazakiProfile,
  MobilePolarisLogs,
} from "./mobile-content";

const memberNotes = [
  {
    key: "ichijo", order: "01", name: "一条 尊", reading: "いちじょう たける", roman: "TAKERU ICHIJO",
    note: "一条さんは、言葉がきついだけでなく、面白いと思えば普通に煽る側です。仕事と植物のことはかなりきちんとしています。人にも同じくらい丁寧にすればいいのに、とは思います。",
    kept: {
      object: "レザーのカードケース", code: "WORK TOOL", status: "IN USE",
      note: "就職した頃に一条さんからもらいました。装飾が少なく、迷わず毎日使えるところまで一条さんらしいです。",
    },
    url: "https://4i-radio.github.io/members/ichijo/",
  },
  {
    key: "takasaki", order: "02", name: "高崎 翔真", reading: "たかさき しょうま", roman: "SHOMA TAKASAKI",
    note: "高崎さんは、話を拾ってつなぐのが上手いです。収拾もしてくれます。ただ、原因が高崎さんだった回もかなりあるので、全部を任せていいわけではありません。",
    kept: {
      object: "旅行土産のマグカップ", code: "SOUVENIR", status: "IN USE",
      note: "旅行の写真が何枚も送られてきた後、最後にこれが届きました。会社で使っています。",
    },
    url: null,
  },
  {
    key: "hanasaki", order: "03", name: "花咲 朝陽", reading: "はなさき あさひ", roman: "ASAHI HANASAKI",
    note: "花咲は、機材のことなら本当に詳しいです。そこだけなら安心して任せられます。生活全般まで含めると話が変わるので、様子を見に行く時は何か食べるものを持っていきます。",
    kept: {
      object: "イヤホン・三世代", code: "AUDIO / 03", status: "IN USE + RETIRED",
      note: "壊れた頃に次をくれるので、これまでに三つほど増えました。全部、花咲が選んだものです。最後に自分でイヤホンを買った時期は覚えていません。",
    },
    url: null,
  },
  {
    key: "yamada", order: "04", name: "山田 空琉", reading: "やまだ くーる", roman: "COOL YAMADA",
    note: "山田さんは普段は静かですが、ゲームやネット、投資の話になると急に速くなります。詳しいので頼りにはなります。本人の資金管理については、こちらからは何も言いません。",
    kept: {
      object: "ゲームコントローラー", code: "GAME GEAR", status: "OCCASIONAL",
      note: "一緒に遊ぶ時に使うため、という理由で山田さんからもらいました。自分一人で起動する頻度は高くありません。",
    },
    url: "https://4i-radio.github.io/members/yamada/",
  },
  {
    key: "kanzaki", order: "05", name: "神崎 真", reading: "かんざき まこと", roman: "MAKOTO KANZAKI",
    note: "神崎さんは、話が分からないのではなく、分かった上で違う方向に返してきます。都合が悪い時はだいたい煙に巻かれます。連絡がつかない時は、国内にいるかどうかから確認しています。",
    kept: {
      object: "書き込みのある文庫本", code: "BOOK / ?", status: "OWNERSHIP UNKNOWN",
      note: "借りたものか、もらったものかが曖昧です。返そうとした時には神崎さんが海外にいたので、そのまま本棚にあります。",
    },
    url: "https://4i-radio.github.io/members/kanzaki/",
  },
] as const;

const liveRadioUrl = "https://4i-radio.github.io/live/";
const officialRadioUrl = "https://4i-radio.github.io/index.html";

const polarisLogs = [
  { number: "01", phase: "飼育初日", title: "猫を飼うことになりました", body: "会社の先輩から預かる形で、そのまま飼うことになりました。まだ小さいキジトラです。かなりよく動きます。", image: "/members/miyazaki/polaris/polaris-01-first-day.webp", alt: "開いたキャリーから勢いよく飛び出し、手前でぶれて写るポラリス" },
  { number: "02", phase: "命名", title: "ポラリスに決定", body: "4iラジオ内で名前を募集。山田さんが出した案の「ポラリス」に決まりました。呼んだときの反応はまだ一定しません。", image: "/members/miyazaki/polaris/polaris-02-naming.webp", alt: "床で眠るポラリスと、そばに置かれた青い首輪とスマートフォン" },
  { number: "03", phase: "高所", title: "登れる場所が増えました", body: "キャットタワーより先に棚の上へ。自力で降りられず、しばらくこちらを見ていました。翌日も登っています。", image: "/members/miyazaki/polaris/polaris-03-high-shelf.webp", alt: "棚の最上部から下を見ている小さなポラリス" },
  { number: "04", phase: "爪とぎ", title: "使わない方を選ぶ", body: "花咲が「それ絶対使わない」と言った爪とぎ。本当に使いませんでした。代わりにソファを使っています。", image: "/members/miyazaki/polaris/polaris-04-scratcher.webp", alt: "新品の爪とぎを使わずソファを引っかくポラリスと、横から指す黄色い袖の手" },
  { number: "05", phase: "ソファ", title: "修理は未定です", body: "ソファの角が大きくほつれました。止めると一度だけこちらを見るところが、花咲に少し似ています。", image: "/members/miyazaki/polaris/polaris-05-sofa.webp", alt: "大きくほつれたソファの角と、その奥でこちらを見るポラリス" },
  { number: "06", phase: "作業中", title: "仕事は進みません", body: "キーボードの前から動きません。花咲が買ってきたトンネルは使っています。花咲が来ると二人で騒ぐので、さらに進みません。", image: "/members/miyazaki/polaris/polaris-06-work.webp", alt: "作業机のキーボードを占領するポラリスと、猫じゃらしを持つ黄色い袖の手" },
] as const;

export default function Home() {
  return (
    <main id="top">
      <a className="skip-link" href="#main-content">本文へ移動</a>
      <header className="site-header">
        <div className="header-inner">
          <a className="brand" href="#top" aria-label="宮崎一馬 個人ページ トップへ">
            <span className="brand-mark">4i</span><span><b>PERSONAL ARCHIVE</b><small>K. MIYAZAKI</small></span>
          </a>
          <nav className="header-nav" aria-label="ページ内ナビゲーション">
            <a href="#profile">PROFILE</a><a href="#members">MEMBERS</a><a href="#personal-log">LOG</a><a href="#polaris">POLARIS</a>
          </nav>
          <div className="header-radio-links"><a className="radio-home-link" href={officialRadioUrl} target="_blank" rel="noreferrer">4i SITE ↗</a></div>
        </div>
      </header>

      <nav className="mobile-section-nav" aria-label="スマートフォン用ページ内ナビゲーション">
        <a href="#profile">紹介</a><a href="#members">メンバー</a><a href="#personal-log">記録</a><a href="#polaris">ポラリス</a>
      </nav>

      <div id="main-content">
        <section className="hero" id="profile" aria-labelledby="hero-title">
          <div className="hero-grid">
            <div className="hero-copy">
              <p className="eyebrow"><span>PERSONAL PAGE</span> / OBSERVATION &amp; LIFE LOG</p>
              <h1 id="hero-title">宮崎 一馬</h1><p className="hero-roman">KAZUMA MIYAZAKI</p>
              <p className="hero-lead">4iラジオに出演しています。<br />自分のことより、人のことを書く方が得意です。</p>
              <div className="hero-actions"><a className="button button-primary" href="#members">メンバーについて</a><a className="button button-secondary" href="#personal-log">個人記録を見る</a></div>
            </div>
            <aside className="broadcast-card" id="listen" aria-label="4iラジオ 放送案内">
              <div className="broadcast-card-head"><span>LISTEN / 4i RADIO</span></div><strong>FRI 26:00</strong><p>土曜 午前2:00</p>
              <div className="broadcast-links">
                <a className="broadcast-link is-live" href={liveRadioUrl} target="_blank" rel="noreferrer"><span>LIVE</span><b>ライブ放送を開く ↗</b></a>
                <a className="broadcast-link" href={officialRadioUrl} target="_blank" rel="noreferrer"><span>ARCHIVE</span><b>4iサイトを開く ↗</b></a>
              </div>
            </aside>
          </div>
          <div className="personal-record" aria-label="宮崎一馬 基本プロフィール">
            <div className="record-index"><span>FILE</span><b>MZK</b></div>
            <dl><div><dt>BIRTH</dt><dd>1999.04.30</dd></div><div><dt>HEIGHT</dt><dd>182 cm</dd></div><div><dt>BLOOD TYPE</dt><dd>A</dd></div><div><dt>JOINED</dt><dd>2018</dd></div><div><dt>WORK</dt><dd>海外調達</dd></div><div><dt>RADIO</dt><dd>フォロー・バランサー</dd></div></dl>
          </div>
          <MobileMiyazakiProfile />
        </section>

        <aside className="aggregate-notice" aria-label="4iラジオ共通情報について">
          <div><span>4i RADIO</span><b>4iラジオ全体の案内はこちらにあります。</b></div>
          <a href={officialRadioUrl} target="_blank" rel="noreferrer">4iサイトへ ↗</a>
        </aside>

        <section className="section member-notes-section" id="members" aria-labelledby="members-title">
          <div className="section-heading"><p className="section-number">01 / MEMBERS</p><div><h2 id="members-title">メンバーについて</h2><p>4iラジオで一緒にやっている5人です。</p></div></div>
          <div className="member-note-grid">
            {memberNotes.map((member) => (
              <article className="member-note-card" key={member.key}>
                <div className="member-note-heading">
                  <div className="member-note-index"><span>{member.order}</span><b>{member.roman}</b></div>
                  <div><p className="member-note-reading">{member.reading}</p><h3>{member.name}</h3></div>
                </div>
                <div className="member-note-body">
                  <p className="member-note-copy">{member.note}</p>
                  <div className="member-kept-item">
                    <div className="member-item-image" aria-label={`${member.kept.object}の画像差し替え枠`}><span>ITEM PHOTO</span><small>準備中</small></div>
                    <div className="member-item-copy"><div className="member-item-meta"><span>{member.kept.code}</span><b>{member.kept.status}</b></div><h4>{member.kept.object}</h4><p>{member.kept.note}</p></div>
                  </div>
                  {member.url ? <a className="member-note-link" href={member.url} target="_blank" rel="noreferrer">個人ページ ↗</a> : <span className="member-note-link is-pending">個人ページ準備中</span>}
                </div>
              </article>
            ))}
          </div>
          <MobileMemberNotes members={memberNotes} />
        </section>

        <section className="section personal-log-section" id="personal-log" aria-labelledby="personal-log-title">
          <div className="section-heading"><p className="section-number">02 / PERSONAL LOG</p><div><h2 id="personal-log-title">最近のこと</h2><p>続いていることを、必要な時だけ記録します。</p></div></div>

          <section className="routine-panel" aria-labelledby="routine-title">
            <div><p className="sub-label">ROUTINE</p><h3 id="routine-title">ジムとジョギング</h3></div>
            <p>最近はジムとジョギングが続いています。特に目標があるわけではありません。ほかにも何か始めたら、続いたものだけここに残します。</p>
            <dl><div><dt>GYM</dt><dd>継続中</dd></div><div><dt>JOGGING</dt><dd>継続中</dd></div></dl>
          </section>
        </section>

        <section className="polaris-section" id="polaris" aria-labelledby="polaris-title">
          <div className="polaris-intro"><div><p className="section-number">03 / LIFE</p><h2 id="polaris-title">LIFE / POLARIS</h2><p className="polaris-lead">猫を飼うことになりました。<br />最初はこの一文だけでしたが、記録が増えたので分けています。</p></div><dl className="polaris-profile"><div><dt>NAME</dt><dd>ポラリス</dd></div><div><dt>TYPE</dt><dd>キジトラ / 子猫</dd></div><div><dt>NAMED BY</dt><dd>山田 空琉</dd></div><div><dt>LOGS</dt><dd>06</dd></div></dl></div>
          <div className="polaris-log-grid polaris-log-grid-desktop">{polarisLogs.map((log, index) => <article className={`polaris-log ${index === 0 ? "polaris-log-featured" : ""}`} key={log.number}><figure className="cat-photo"><img src={log.image} alt={log.alt} loading="lazy" /></figure><div className="polaris-log-copy"><div className="log-meta"><span>LOG {log.number}</span><span>{log.phase}</span></div><h3>{log.title}</h3><p>{log.body}</p></div></article>)}</div>
          <MobilePolarisLogs logs={polarisLogs} />
          <p className="polaris-footnote">※ 記録用に撮影した写真です。一部、動きが速く不鮮明です。</p>
        </section>
      </div>

      <footer className="site-footer"><div className="footer-main"><div><p className="footer-brand">4i / MIYAZAKI PERSONAL ARCHIVE</p><p>4iラジオと日々の記録。</p></div><nav aria-label="フッターナビゲーション"><a href="#profile">PROFILE</a><a href="#members">MEMBERS</a><a href="#personal-log">LOG</a><a href="#polaris">POLARIS</a></nav></div><div className="footer-bottom"><p>maintained by K. Miyazaki</p><a href="#top">PAGE TOP ↑</a></div></footer>
    </main>
  );
}
