"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { plants, searchableText } from "./plants";
import type { Plant } from "./plants";

function DetailPanel({
  plant,
  onClose,
  onPrevious,
  onNext,
}: {
  plant: Plant;
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
}) {
  const rows = [
    ["育てやすさ", plant.ease],
    ["日当たり", plant.light],
    ["水やり", plant.water],
    ["迎えた時期", plant.acquired],
    ["現在の鉢", plant.pot],
    ["猫のいる家庭", plant.catSafety],
  ];

  return (
    <article className="detail-panel" aria-label={`${plant.nickname}の詳細`}>
      <div className="detail-toolbar">
        <button className="text-button detail-back" type="button" onClick={onClose}>
          <span aria-hidden="true">←</span> 一覧へ
        </button>
        <div className="detail-nav" aria-label="植物を切り替える">
          <button type="button" onClick={onPrevious} aria-label="前の植物">←</button>
          <button type="button" onClick={onNext} aria-label="次の植物">→</button>
          <button className="detail-close" type="button" onClick={onClose} aria-label="詳細を閉じる">×</button>
        </div>
      </div>

      <figure className="detail-figure">
        <img src={plant.image} alt={`${plant.formalName}「${plant.nickname}」`} />
      </figure>

      <div className="detail-copy">
        <p className="eyebrow">POT NAME</p>
        <h2>{plant.nickname}</h2>
        <p className="formal-name">{plant.formalName}</p>
        <p className="scientific-name">{plant.scientificName}</p>

        <section className="current-state">
          <p className="section-label">CURRENT STATE</p>
          <p>{plant.status}</p>
        </section>

        <dl className="plant-facts">
          {rows.map(([label, value]) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <section className="note-block">
          <p className="section-label">ICHIJO MEMO</p>
          <p>{plant.memo}</p>
        </section>

        <section className="history-block">
          <p className="section-label">GROWTH LOG</p>
          <ol>
            {plant.history.map((entry, index) => (
              <li key={`${entry}-${index}`}>
                {entry}
              </li>
            ))}
          </ol>
        </section>
      </div>
    </article>
  );
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const lastScroll = useRef(0);

  const filteredPlants = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase("ja");
    if (!normalized) return plants;
    return plants.filter((plant) => searchableText(plant).includes(normalized));
  }, [query]);

  const selectedPlant = plants.find((plant) => plant.id === selectedId) ?? null;

  const readPlantFromHash = useCallback(() => {
    const match = window.location.hash.match(/^#plant=([^&]+)$/);
    const id = match ? decodeURIComponent(match[1]) : null;
    return plants.some((plant) => plant.id === id) ? id : null;
  }, []);

  useEffect(() => {
    const initialFrame = requestAnimationFrame(() => setSelectedId(readPlantFromHash()));
    const onPopState = () => {
      const next = readPlantFromHash();
      setSelectedId(next);
      if (!next) requestAnimationFrame(() => window.scrollTo({ top: lastScroll.current }));
    };
    window.addEventListener("popstate", onPopState);
    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener("popstate", onPopState);
    };
  }, [readPlantFromHash]);

  useEffect(() => {
    const setScrollLock = () => {
      document.body.style.overflow = selectedPlant && window.innerWidth < 900 ? "hidden" : "";
    };
    setScrollLock();
    window.addEventListener("resize", setScrollLock);
    return () => {
      window.removeEventListener("resize", setScrollLock);
      document.body.style.overflow = "";
    };
  }, [selectedPlant]);

  const openPlant = useCallback((id: string) => {
    lastScroll.current = window.scrollY;
    setSelectedId(id);
    window.history.pushState({ plant: id }, "", `#plant=${encodeURIComponent(id)}`);
  }, []);

  const closePlant = useCallback(() => {
    if (window.location.hash.startsWith("#plant=") && window.history.state?.plant) {
      window.history.back();
      return;
    }
    window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
    setSelectedId(null);
    requestAnimationFrame(() => window.scrollTo({ top: lastScroll.current }));
  }, []);

  const movePlant = useCallback(
    (direction: -1 | 1) => {
      if (!selectedPlant) return;
      const current = plants.findIndex((plant) => plant.id === selectedPlant.id);
      const next = plants[(current + direction + plants.length) % plants.length];
      setSelectedId(next.id);
      window.history.replaceState({ plant: next.id }, "", `#plant=${encodeURIComponent(next.id)}`);
      document.querySelector(".mobile-detail")?.scrollTo({ top: 0 });
      document.querySelector(".detail-column")?.scrollTo({ top: 0 });
    },
    [selectedPlant],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (!selectedPlant) return;
      if (event.key === "Escape") closePlant();
      if (event.key === "ArrowLeft") movePlant(-1);
      if (event.key === "ArrowRight") movePlant(1);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closePlant, movePlant, selectedPlant]);

  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="植物記録 トップへ">
          <span>PLANT LOG</span>
        </a>
        <nav aria-label="ページ内ナビゲーション">
          <a href="#collection">Collection</a>
          <a href="#about">About</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="hero-visual">
          <img src="/members/ichijo/hero-room.webp" alt="植物のある部屋を表した深緑と土色の抽象画" />
          <p className="hero-caption">PLANTS, LIGHT &amp; DAILY NOTES</p>
        </div>
        <div className="hero-profile" id="about">
          <p className="eyebrow">PLANT LOG</p>
          <h1>植物記録</h1>
          <p className="intro">会社員。観葉植物を育てています。</p>
          <div className="profile-rule" />
          <dl className="hero-stats">
            <div><dt>50+</dt><dd>POTS AT HOME</dd></div>
            <div><dt>25</dt><dd>SELECTED POTS</dd></div>
          </dl>
          <a className="collection-link" href="#collection">記録を見る <span aria-hidden="true">↓</span></a>
        </div>
      </section>

      <section className="collection" id="collection">
        <div className="collection-heading">
          <div>
            <p className="eyebrow">SELECTED COLLECTION</p>
            <h2>育てているもの</h2>
          </div>
          <p className="collection-lead">現在の姿と、鉢ごとの管理記録。</p>
        </div>

        <div className="search-row">
          <label className="search-box">
            <span className="search-icon" aria-hidden="true">⌕</span>
            <span className="sr-only">植物を検索</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="名前、状態、メモから検索"
            />
            {query && <button type="button" onClick={() => setQuery("")} aria-label="検索語を消去">×</button>}
          </label>
          <p>{filteredPlants.length} / {plants.length} POTS</p>
        </div>

        <div className={selectedPlant ? "collection-layout has-selection" : "collection-layout"}>
          <div className="cards-column">
            {filteredPlants.length ? (
              <div className="plant-grid">
                {filteredPlants.map((plant) => (
                  <button
                    className={selectedId === plant.id ? "plant-card is-active" : "plant-card"}
                    type="button"
                    key={plant.id}
                    onClick={() => openPlant(plant.id)}
                    aria-label={`${plant.formalName}「${plant.nickname}」の詳細を表示`}
                  >
                    <span className="card-image"><img loading="lazy" src={plant.image} alt="" /></span>
                    <span className="card-copy">
                      <span className="card-name">{plant.nickname}</span>
                      <span className="card-formal">{plant.formalName}</span>
                      <span className="card-status">{plant.status}</span>
                    </span>
                  </button>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <p>該当する記録がありません。</p>
                <button type="button" className="text-button" onClick={() => setQuery("")}>検索をクリア</button>
              </div>
            )}
          </div>

          {selectedPlant && (
            <aside className="detail-column">
              <DetailPanel plant={selectedPlant} onClose={closePlant} onPrevious={() => movePlant(-1)} onNext={() => movePlant(1)} />
            </aside>
          )}
        </div>
      </section>

      <section className="and-more">
        <p className="eyebrow">AND MORE</p>
        <p>全部は載せてません。記録は手元にあります。増えたら数だけ更新します。</p>
      </section>

      <footer>
        <p>recorded by Takeru Ichijo</p>
        <p>50+ POTS / SELECTED 25</p>
      </footer>

      {selectedPlant && (
        <div className="mobile-detail" role="dialog" aria-modal="true" aria-label={`${selectedPlant.nickname}の詳細`}>
          <DetailPanel plant={selectedPlant} onClose={closePlant} onPrevious={() => movePlant(-1)} onNext={() => movePlant(1)} />
        </div>
      )}
    </main>
  );
}
