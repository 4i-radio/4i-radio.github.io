import Image from "next/image";
import Link from "next/link";
import { songs, type Song } from "./data/songs";
import { songNotes } from "./data/song-notes";

const lanes = [
  songs.slice(0, 18),
  songs.slice(18, 36),
  songs.slice(36, 53),
  songs.slice(53),
];

function MarqueeGroup({ lane }: { lane: Song[] }) {
  return (
    <div className="marquee-group">
      {lane.map((song) => (
        <Image
          key={song.slug}
          src={`/cover-notes/assets/thumbs/${song.slug}.webp`}
          alt=""
          width="420"
          height="420"
          unoptimized
          draggable="false"
        />
      ))}
    </div>
  );
}

function HeroMarquee() {
  return (
    <div className="marquee-wall" aria-hidden="true">
      {lanes.map((lane, index) => (
        <div
          className={`marquee-lane ${index % 2 ? "is-reverse" : ""}`}
          key={index}
        >
          <div className="marquee-track">
            <MarqueeGroup lane={lane} />
            <MarqueeGroup lane={lane} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <HeroMarquee />
        <div className="hero-shade" />

        <header className="hero-nav">
          <a className="wordmark" href="#top" aria-label="ページ上部へ">
            4i RADIO
          </a>
          <p>UNOFFICIAL FAN ARCHIVE</p>
          <p>001—070</p>
        </header>

        <div className="hero-copy" id="top">
          <p className="eyebrow">NATSUKO NISSHOKU × 4i RADIO</p>
          <h1 id="hero-title">70 COVER NOTES</h1>
          <p className="hero-subtitle">
            日食なつこ70曲を、4iラジオの人物と関係性に重ねて作った
            <br className="desktop-break" />
            非公式ジャケットの制作記録。
          </p>
          <a className="enter-button" href="#archive">
            <span>制作記録を見る</span>
            <span aria-hidden="true">↓</span>
          </a>
        </div>

        <div className="hero-meta" aria-label="制作期間">
          <span>70 COVERS</span>
          <span>2026.06.10—06.14</span>
          <span>IN PRODUCTION ORDER</span>
          <span className="archive-writing-period">
            ARCHIVE &amp; WRITING｜2026.06.17—08.16
          </span>
        </div>
      </section>

      <section className="archive" id="archive" aria-labelledby="archive-title">
        <div className="archive-intro">
          <p className="section-index">ARCHIVE / 001—070</p>
          <div>
            <h2 id="archive-title">70枚ぶんの、<br />好きと迷走。</h2>
            <p>
              完成品だけではなく、最初の解釈、うまくいかなかった案、
              AIが勝手に連れてきた人物まで。作った順番を崩さず、
              当時の熱量ごと残すための個人アーカイブです。
            </p>
          </div>
        </div>

        <div className="archive-rule" aria-hidden="true">
          <span>START / 2026.06.10 15:49</span>
          <span>3 DAYS, 19 HOURS, 35 MINUTES</span>
          <span>END / 2026.06.14 11:24</span>
        </div>

        <ol className="cover-grid">
          {songs.map((song) => {
            const note = songNotes[song.slug];

            return (
              <li key={song.slug}>
                <Link className="cover-card" href={`/songs/${song.slug}`}>
                  <figure>
                    <Image
                      src={`/cover-notes/assets/thumbs/${song.slug}.webp`}
                      alt={`${song.title}の非公式ジャケット`}
                      width="420"
                      height="420"
                      unoptimized
                      loading="lazy"
                      decoding="async"
                    />
                  </figure>
                  <div className={`card-meta ${note ? "has-note" : ""}`}>
                    <p className="card-number">{song.slug} / 070</p>
                    <h3>{song.title}</h3>
                    <p className="card-date">{song.createdAt.replace(" ", " / ")}</p>
                    {note ? (
                      <>
                        <p className="card-assignment">{note.assignment}</p>
                        <p className="card-summary">{note.summary}</p>
                      </>
                    ) : null}
                    <span className="card-link">制作ノートを見る ↗</span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ol>
      </section>

      <footer className="site-footer">
        <div>
          <p className="footer-title">70 COVER NOTES</p>
          <p>4i RADIO UNOFFICIAL JACKET ARCHIVE</p>
        </div>
        <p className="footer-note">
          本サイトは個人による非公式ファンアーカイブです。<br />
          アーティストおよび関係各所とは関係ありません。
        </p>
        <a href="#top">BACK TO TOP ↑</a>
      </footer>
    </main>
  );
}
