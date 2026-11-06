const news = [
  ["2026.08.05", "お知らせ", "お盆期間の発送について"],
  ["2026.07.11", "工房", "夏のミルクアイスの受付を再開しました"],
  ["2026.05.28", "牧場日記", "子牛が生まれました"],
] as const;

export default function Home() {
  return (
    <main id="top">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="山田牧場 トップへ">
          <span className="brand-mark" aria-hidden="true">Y</span>
          <span>
            <strong>山田牧場</strong>
            <small>YAMADA FARM / TOKACHI</small>
          </span>
        </a>

        <nav aria-label="メインメニュー">
          <a href="#about">牧場について</a>
          <a href="#milk">生乳について</a>
          <a href="#people">家族と仕事</a>
          <a href="#news">お知らせ</a>
        </nav>

        <a className="shop-link" href="#shop">ONLINE SHOP</a>
      </header>

      <section className="hero" aria-labelledby="hero-title">
        <img
          src="/farm/images/tokachi-hero.png"
          alt="十勝の広い牧草地で過ごす乳牛と山田牧場の牛舎"
          width="1802"
          height="873"
        />
        <div className="hero-copy">
          <p>HOKKAIDO / TOKACHI</p>
          <h1 id="hero-title">十勝の空の下、<br />牛と暮らす。</h1>
          <span>生乳をつくることが、私たちの仕事です。</span>
        </div>
      </section>

      <div className="farm-facts" aria-label="牧場の基本情報">
        <span>北海道・十勝</span>
        <span>酪農・生乳生産</span>
        <span>家族と数名のスタッフ</span>
      </div>

      <section className="lead-section" id="about">
        <p className="eyebrow">ABOUT OUR FARM</p>
        <div className="lead-grid">
          <h2>毎日の牛乳は、<br />毎日の仕事から。</h2>
          <div>
            <p>
              山田牧場は、北海道・十勝で乳牛を育て、生乳を生産している家族経営の牧場です。
              朝と夕方の搾乳、牛舎の清掃、餌づくり。天気や季節に合わせながら、一日ずつ仕事を重ねています。
            </p>
            <p>
              生乳のほとんどは、地域の乳業メーカーへ出荷しています。
              どこかの食卓に並ぶ牛乳や乳製品の、その最初のところをつくるのが私たちの役目です。
            </p>
          </div>
        </div>
      </section>

      <section className="milk-section" id="milk">
        <div className="milk-title">
          <p className="eyebrow">OUR MILK</p>
          <h2>牛をよく見る。<br />それが、最初です。</h2>
        </div>

        <div className="principle-list">
          <article>
            <span>01</span>
            <h3>体調を見る</h3>
            <p>食べ方、歩き方、表情。毎日の小さな違いを家族とスタッフで共有します。</p>
          </article>
          <article>
            <span>02</span>
            <h3>餌をつくる</h3>
            <p>十勝の季節に合わせて牧草を育て、牛の状態を見ながら給餌します。</p>
          </article>
          <article>
            <span>03</span>
            <h3>衛生を守る</h3>
            <p>搾乳設備と牛舎を整え、温度や洗浄の記録を毎日続けています。</p>
          </article>
        </div>
      </section>

      <section className="shop-section" id="shop" aria-labelledby="shop-title">
        <div className="product-image">
          <img
            src="/farm/images/milk-ice-product.png"
            alt="山田牧場のミルクアイス6個セット"
            width="1448"
            height="1086"
          />
          <span>SMALL BATCH</span>
        </div>

        <div className="product-copy">
          <p className="eyebrow">FROM OUR SMALL WORKSHOP</p>
          <h2 id="shop-title">牧場ミルクアイス</h2>
          <p className="product-lead">
            出荷する生乳のうち、ほんの一部だけを牧場内の小さな工房へ。
            加熱殺菌し、ミルクの味が残るよう少量ずつ仕込んでいます。
          </p>

          <div className="product-detail">
            <div>
              <span>内容</span>
              <strong>ミルクアイス 90ml × 6個</strong>
            </div>
            <div>
              <span>配送</span>
              <strong>冷凍便 / 毎週数量限定</strong>
            </div>
          </div>

          <div className="price-row">
            <p><strong>3,240</strong>円（税込）<small>送料別</small></p>
            <a href="#order">商品詳細を見る</a>
          </div>

          <small className="allergen">特定原材料：乳成分</small>
        </div>
      </section>

      <section className="people-section" id="people">
        <div className="people-copy">
          <p className="eyebrow">FAMILY &amp; WORK</p>
          <h2>三世代と、<br />数名のスタッフで。</h2>
          <p>
            現在は長男夫婦を中心に、父母と祖母、それから数名のスタッフで牧場を営んでいます。
            搾乳、仔牛、飼料、事務、加工と、担当はあっても仕事はきれいに分かれません。
            忙しいところへ手を貸しながら、一日を回しています。
          </p>
          <p>
            二人の子どもも、牛の声を聞きながら同じ敷地で育っています。
            この先も家族がここで暮らしていける牧場であることを、大切にしています。
          </p>
        </div>

        <figure>
          <img
            src="/farm/images/farm-family-work.png"
            alt="牛舎の前に立つ山田家の大人五人"
            width="1672"
            height="941"
          />
          <figcaption>牛舎前にて。家族の大人だけで撮った、珍しく全員そろった一枚。</figcaption>
        </figure>
      </section>

      <section className="workshop-note" id="order">
        <div>
          <p className="eyebrow">THE SMALL WORKSHOP</p>
          <h2>本業の合間に、<br />無理のない数だけ。</h2>
        </div>
        <div>
          <p>
            アイスの製造と発送は毎週決まった日にまとめて行っています。
            そのため、一度にご用意できる数には限りがあります。
            売り切れの際は、次回受付までお待ちください。
          </p>
          <dl>
            <div><dt>次回受付</dt><dd>8月20日（木）20:00</dd></div>
            <div><dt>発送予定</dt><dd>8月24日より順次</dd></div>
            <div><dt>受付状況</dt><dd><span>受付前</span></dd></div>
          </dl>
        </div>
      </section>

      <section className="news-section" id="news">
        <div className="news-heading">
          <p className="eyebrow">NEWS &amp; FARM NOTES</p>
          <h2>牧場からのお知らせ</h2>
        </div>
        <ol>
          {news.map(([date, category, title]) => (
            <li key={`${date}-${title}`}>
              <time dateTime={date.replaceAll(".", "-")}>{date}</time>
              <span>{category}</span>
              <p>{title}</p>
              <i aria-hidden="true">↗</i>
            </li>
          ))}
        </ol>
      </section>

      <section className="access-section" aria-labelledby="access-title">
        <div className="access-heading">
          <p className="eyebrow" id="access-title">ACCESS / CONTACT</p>
        </div>
        <div className="access-copy">
          <dl>
            <div>
              <dt>所在地</dt>
              <dd>北海道河東郡鹿追町 東瓜幕地区</dd>
            </div>
            <div>
              <dt>帯広市街から</dt>
              <dd>車で約1時間</dd>
            </div>
          </dl>
          <p>
            山田牧場は観光牧場ではありません。防疫と作業の都合上、現在は一般の牧場見学を受け付けておりません。
          </p>
          <div className="access-links">
            <a
              href="https://www.google.com/maps/search/?api=1&query=%E5%8C%97%E6%B5%B7%E9%81%93%E6%B2%B3%E6%9D%B1%E9%83%A1%E9%B9%BF%E8%BF%BD%E7%94%BA%E6%9D%B1%E7%93%9C%E5%B9%95"
              target="_blank"
              rel="noreferrer"
            >
              Googleマップで周辺を見る ↗
            </a>
            <a href="#top">お問い合わせについて</a>
          </div>
        </div>
        <div className="access-map">
          <iframe
            title="北海道河東郡鹿追町 東瓜幕地区の周辺地図"
            src="https://www.google.com/maps?q=%E5%8C%97%E6%B5%B7%E9%81%93%E6%B2%B3%E6%9D%B1%E9%83%A1%E9%B9%BF%E8%BF%BD%E7%94%BA%E6%9D%B1%E7%93%9C%E5%B9%95&output=embed&z=11"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <p>
            地図は東瓜幕地区のおおよその位置を表示しています。山田牧場の正確な所在地を示すものではありません。
          </p>
        </div>
      </section>

      <footer>
        <div className="footer-brand">
          <strong>山田牧場</strong>
          <span>YAMADA FARM / HOKKAIDO TOKACHI</span>
        </div>
        <div className="footer-links">
          <a href="#about">牧場について</a>
          <a href="#milk">生乳について</a>
          <a href="#shop">オンラインショップ</a>
          <a href="#top">特定商取引法に基づく表記</a>
        </div>
        <div className="footer-bottom">
          <p>© YAMADA FARM</p>
          <a
            href="https://4i-radio.github.io/members/yamada/"
            target="_blank"
            rel="noreferrer"
          >
            Web制作・管理　C.Yamada ↗
          </a>
        </div>
      </footer>
    </main>
  );
}
