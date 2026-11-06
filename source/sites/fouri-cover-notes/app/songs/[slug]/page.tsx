import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { songLinks } from "../../data/song-links";
import { songs } from "../../data/songs";
import { songNotes } from "../../data/song-notes";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return songs.map((song) => ({ slug: song.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const song = songs.find((item) => item.slug === slug);
  return song ? { title: song.title } : {};
}

const noteSections = [
  "最初に考えていたこと",
  "作る途中で起きたこと",
  "完成版について",
  "今見ると",
];

type SongReference = {
  label: string;
  slug: string;
};

const songReferences: Partial<Record<string, SongReference[]>> = {
  "003": [{ label: "やえ", slug: "002" }],
  "013": [{ label: "ローカルミーハーのうた", slug: "007" }],
  "020": [{ label: "夕闇絵画", slug: "031" }],
  "022": [{ label: "レーテンシー", slug: "018" }],
  "023": [{ label: "i", slug: "034" }],
  "034": [{ label: "√-1", slug: "023" }],
  "036": [{ label: "ライオンヘッド", slug: "028" }],
  "040": [{ label: "99鬼夜行", slug: "042" }],
  "041": [
    { label: "シリアル", slug: "022" },
    { label: "夜刀神", slug: "036" },
    { label: "泡沫の箱庭", slug: "045" },
  ],
  "054": [{ label: "i", slug: "034" }],
  "055": [{ label: "跳躍", slug: "054" }],
  "056": [
    { label: "跳躍", slug: "054" },
    { label: "四十路", slug: "070" },
  ],
  "064": [{ label: "Fly-by", slug: "062" }],
  "066": [
    { label: "100", slug: "065" },
    { label: "剣の歌", slug: "067" },
  ],
  "068": [
    { label: "ビッグバード", slug: "066" },
    { label: "剣の歌", slug: "067" },
  ],
};

function escapeRegExp(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function renderSongReferences(text: string, sourceSlug: string) {
  const references = songReferences[sourceSlug];
  if (!references?.length) return text;

  const patterns = references
    .map(({ label }) => (label === "i" ? "(?<=「)i(?=」)" : escapeRegExp(label)))
    .sort((left, right) => right.length - left.length);
  const matcher = new RegExp(`(${patterns.join("|")})`, "g");

  return text.split(matcher).map((part, index) => {
    const reference = references.find(({ label }) => label === part);
    if (!reference) return part;

    const target = songs.find(({ slug }) => slug === reference.slug);
    const targetLabel = target ? `${target.slug}｜${target.title}` : part;

    return (
      <Link
        className="song-reference-link"
        href={`/songs/${reference.slug}`}
        aria-label={`${targetLabel}の制作ノートへ`}
        title={`${targetLabel}へ`}
        key={`${reference.slug}-${index}`}
      >
        {part}
      </Link>
    );
  });
}

export default async function SongPage({ params }: Props) {
  const { slug } = await params;
  const songIndex = songs.findIndex((item) => item.slug === slug);
  if (songIndex < 0) notFound();

  const song = songs[songIndex];
  const note = songNotes[song.slug];
  const links = songLinks[song.slug];
  const previous = songs[songIndex - 1];
  const next = songs[songIndex + 1];

  return (
    <main className="song-page has-sticky-cover-reference">
      <div
        className={`mobile-song-backdrop${note?.backdropUrl ? " has-custom-backdrop" : ""}`}
        aria-hidden="true"
      >
        <Image
          src={note?.backdropUrl ?? `/cover-notes/assets/covers/${song.slug}.webp`}
          alt=""
          fill
          sizes="100vw"
          unoptimized
        />
      </div>

      <header className="song-header">
        <Link href="/#archive">← ARCHIVE</Link>
        <Link className="wordmark" href="/">70 COVER NOTES</Link>
        <span>{song.slug} / 070</span>
      </header>

      <nav className="floating-song-nav" aria-label="常時表示の前後の制作ノート">
        {previous ? (
          <Link
            className="side-jump is-previous"
            href={`/songs/${previous.slug}`}
            aria-label={`前の制作ノート：${previous.title}`}
            title={`前へ：${previous.title}`}
          >
            <span aria-hidden="true">《</span>
            <small>{previous.slug}</small>
          </Link>
        ) : (
          <span className="side-jump is-previous is-disabled" aria-hidden="true">
            <span>《</span>
            <small>START</small>
          </span>
        )}
        <span className="floating-current">{song.slug} / 070</span>
        {next ? (
          <Link
            className="side-jump is-next"
            href={`/songs/${next.slug}`}
            aria-label={`次の制作ノート：${next.title}`}
            title={`次へ：${next.title}`}
          >
            <small>{next.slug}</small>
            <span aria-hidden="true">》</span>
          </Link>
        ) : (
          <span className="side-jump is-next is-disabled" aria-hidden="true">
            <small>END</small>
            <span>》</span>
          </span>
        )}
      </nav>

      <article className="song-hero">
        <figure className="song-cover-wrap" id="song-cover">
          <Image
            src={`/cover-notes/assets/covers/${song.slug}.webp`}
            alt={`${song.title}の非公式ジャケット`}
            width="1100"
            height="1100"
            unoptimized
            priority
          />
          <figcaption className="song-cover-caption">
            <span>UNOFFICIAL JACKET</span>
            <span>4i RADIO</span>
          </figcaption>
        </figure>

        <div className="song-content">
          <h1 className={song.title.length > 28 ? "long-title" : undefined}>
            <span className="song-title-number">{song.slug}｜</span>
            {song.title}
          </h1>
          {note ? (
            <>
              <p className="song-assignment">
                <span>担当：</span>
                <strong>{note.assignment}</strong>
              </p>
              <p className="song-summary">
                {renderSongReferences(note.summary, song.slug)}
              </p>
            </>
          ) : (
            <p className="song-lead">
              最初に考えていたこと、作る途中で起きたこと、完成版と現在の見方を残す制作ノート。
              本文は記録を整理しながら順次追加します。
            </p>
          )}

          {links?.spotifyTrackId && (
            <iframe
              className="spotify-player"
              src={`https://open.spotify.com/embed/track/${links.spotifyTrackId}?utm_source=generator`}
              title={`${song.title} Spotifyプレイヤー`}
              width="100%"
              height="152"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              allowFullScreen
            />
          )}

          <a
            className="mobile-cover-reference"
            href="#song-cover"
            aria-label={`${song.title}の大きなジャケットへ戻る`}
          >
            <Image
              src={`/cover-notes/assets/covers/${song.slug}.webp`}
              alt=""
              width="56"
              height="56"
              unoptimized
            />
            <span className="mobile-cover-reference-copy">
              <small>JACKET REFERENCE</small>
              <strong>{song.slug}｜{song.title}</strong>
            </span>
            <span className="mobile-cover-reference-return" aria-hidden="true">
              ↑
            </span>
          </a>

          {note ? (
            <div className="note-sections has-copy">
              {note.sections.map((section) => (
                <section className="note-section" key={section.title}>
                  <div>
                    <h2>{section.title}</h2>
                    <div className="note-copy">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>
                          {renderSongReferences(paragraph, song.slug)}
                        </p>
                      ))}
                    </div>
                  </div>
                </section>
              ))}

            </div>
          ) : (
            <div className="note-sections">
              {noteSections.map((title) => (
                <section className="note-section" key={title}>
                  <div>
                    <h2>{title}</h2>
                    <p>制作記録を追加予定</p>
                  </div>
                </section>
              ))}
            </div>
          )}

          {links && (links.youtubeUrl || links.lyricsUrl) && (
            <aside className="song-external-links" aria-label="公式音源と歌詞の参照先">
              <p>LISTEN / REFERENCE</p>
              <div>
                {links.youtubeUrl && (
                  <a href={links.youtubeUrl} target="_blank" rel="noreferrer">
                    公式YouTube <span aria-hidden="true">↗</span>
                  </a>
                )}
                {links.lyricsUrl && (
                  <a href={links.lyricsUrl} target="_blank" rel="noreferrer">
                    歌詞参照先 <span aria-hidden="true">↗</span>
                  </a>
                )}
              </div>
            </aside>
          )}
        </div>
      </article>

      <nav className="song-nav" aria-label="前後の制作ノート">
        {previous ? (
          <Link href={`/songs/${previous.slug}`}>← {previous.slug} {previous.title}</Link>
        ) : (
          <span className="disabled">← START</span>
        )}
        <Link className="archive-link" href="/#archive">ALL 70 COVERS</Link>
        {next ? (
          <Link href={`/songs/${next.slug}`}>{next.slug} {next.title} →</Link>
        ) : (
          <span className="disabled" style={{ justifySelf: "end" }}>END →</span>
        )}
      </nav>
    </main>
  );
}
