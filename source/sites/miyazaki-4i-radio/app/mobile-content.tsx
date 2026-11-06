"use client";

import { useRef, useState } from "react";

type MemberNote = {
  key: string;
  order: string;
  name: string;
  reading: string;
  roman: string;
  note: string;
  kept: {
    object: string;
    code: string;
    status: string;
    note: string;
  };
  url: string | null;
};

type PolarisLog = {
  number: string;
  phase: string;
  title: string;
  body: string;
  image: string;
  alt: string;
};

function updateWithTransition(update: () => void) {
  const transitionDocument = document as Document & {
    startViewTransition?: (callback: () => void) => void;
  };

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    update();
    return;
  }

  if (transitionDocument.startViewTransition) {
    transitionDocument.startViewTransition(update);
    return;
  }

  update();
}

export function MobileMiyazakiProfile() {
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <div className="mobile-personal-summary" aria-label="宮崎一馬 基本プロフィール">
      <p><b>1999.04.30</b><span>182 cm</span><span>A型</span><span>2018年加入</span></p>
      <button type="button" onClick={() => dialogRef.current?.showModal()}>
        プロフィール詳細
      </button>

      <dialog
        className="mobile-sheet profile-sheet"
        ref={dialogRef}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        <div className="sheet-panel">
          <div className="sheet-handle" aria-hidden="true" />
          <header className="sheet-header">
            <div><span>PROFILE / MZK</span><h2>宮崎 一馬</h2><p>KAZUMA MIYAZAKI</p></div>
            <button type="button" onClick={() => dialogRef.current?.close()} aria-label="閉じる">×</button>
          </header>
          <dl className="sheet-data">
            <div><dt>生年月日</dt><dd>1999.04.30</dd></div>
            <div><dt>身長</dt><dd>182 cm</dd></div>
            <div><dt>血液型</dt><dd>A型</dd></div>
            <div><dt>加入年</dt><dd>2018</dd></div>
            <div><dt>仕事</dt><dd>海外調達</dd></div>
            <div><dt>ラジオ</dt><dd>フォロー・バランサー</dd></div>
          </dl>
          <form method="dialog"><button className="sheet-close" type="submit">閉じる</button></form>
        </div>
      </dialog>
    </div>
  );
}

export function MobileMemberNotes({ members }: { members: readonly MemberNote[] }) {
  const [selectedKey, setSelectedKey] = useState(members[0]?.key ?? "");
  const selected = members.find((member) => member.key === selectedKey) ?? members[0];

  if (!selected) return null;

  return (
    <div className="mobile-member-view mobile-member-notes">
      <div className="member-selector" role="tablist" aria-label="表示するメンバー">
        {members.map((member) => (
          <button
            id={`member-tab-${member.key}`}
            key={member.key}
            type="button"
            role="tab"
            aria-selected={member.key === selected.key}
            aria-controls="mobile-member-panel"
            onClick={() => updateWithTransition(() => setSelectedKey(member.key))}
          >
            <span>{member.order}</span>{member.name.replace(" ", "")}
          </button>
        ))}
      </div>

      <article
        className="selected-member"
        id="mobile-member-panel"
        role="tabpanel"
        aria-labelledby={`member-tab-${selected.key}`}
        key={selected.key}
      >
        <header>
          <div><p>{selected.name}</p><span>{selected.reading}</span></div>
          <b>{selected.roman}</b>
        </header>
        <p className="selected-member-note">{selected.note}</p>
        <div className="selected-member-item">
          <div className="selected-member-item-image" aria-label={`${selected.kept.object}の画像差し替え枠`}>
            <span>ITEM PHOTO</span>
            <small>準備中</small>
          </div>
          <div className="selected-member-item-copy">
            <div className="selected-member-item-head">
              <span>{selected.kept.code}</span>
              <b>{selected.kept.status}</b>
            </div>
            <strong>{selected.kept.object}</strong>
            <p>{selected.kept.note}</p>
          </div>
        </div>
        {selected.url ? (
          <a
            href={selected.url}
            target={selected.url.startsWith("http") ? "_blank" : undefined}
            rel={selected.url.startsWith("http") ? "noreferrer" : undefined}
          >
            個人ページを開く ↗
          </a>
        ) : (
          <span className="selected-member-pending">個人ページ準備中</span>
        )}
      </article>
    </div>
  );
}

export function MobilePolarisLogs({ logs }: { logs: readonly PolarisLog[] }) {
  const latest = logs.at(-1);
  const past = logs.slice(0, -1).reverse();
  const [selected, setSelected] = useState<PolarisLog | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  if (!latest) return null;

  const openLog = (log: PolarisLog) => {
    setSelected(log);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };

  return (
    <div className="mobile-polaris-logs">
      <article className="mobile-polaris-latest">
        <figure className="cat-photo">
          <img src={latest.image} alt={latest.alt} loading="eager" />
        </figure>
        <div className="polaris-log-copy">
          <div className="log-meta"><span>LATEST / LOG {latest.number}</span><span>{latest.phase}</span></div>
          <h3>{latest.title}</h3>
          <p>{latest.body}</p>
        </div>
      </article>

      <div className="polaris-archive-head"><h3>過去の記録</h3><span>横に送れます →</span></div>
      <div className="polaris-archive-rail" aria-label="ポラリス 過去の記録">
        {past.map((log) => (
          <button type="button" key={log.number} onClick={() => openLog(log)}>
            <img src={log.image} alt="" loading="lazy" />
            <span>LOG {log.number} / {log.phase}</span>
            <b>{log.title}</b>
          </button>
        ))}
      </div>

      <dialog
        className="mobile-sheet polaris-sheet"
        ref={dialogRef}
        onClose={() => setSelected(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) event.currentTarget.close();
        }}
      >
        {selected && (
          <div className="sheet-panel">
            <div className="sheet-handle" aria-hidden="true" />
            <button className="sheet-x" type="button" onClick={() => dialogRef.current?.close()} aria-label="閉じる">×</button>
            <img className="sheet-photo" src={selected.image} alt={selected.alt} />
            <div className="sheet-log-copy">
              <div className="log-meta"><span>LOG {selected.number}</span><span>{selected.phase}</span></div>
              <h2>{selected.title}</h2>
              <p>{selected.body}</p>
            </div>
            <form method="dialog"><button className="sheet-close" type="submit">閉じる</button></form>
          </div>
        )}
      </dialog>
    </div>
  );
}
