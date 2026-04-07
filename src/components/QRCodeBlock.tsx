import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useT } from '../i18n';

interface Props {
  url: string;
}

export default function QRCodeBlock({ url }: Props) {
  const [enlarged, setEnlarged] = useState(false);
  const t = useT();

  return (
    <section style={styles.block}>
      <h3 style={styles.title}>{t.qrBlock.title}</h3>
      <p style={styles.desc}>{t.qrBlock.desc}</p>

      <div style={styles.qrOuter}>
        <div style={styles.qrCard}>
          <QRCodeSVG
            value={url}
            size={enlarged ? 300 : 220}
            level="M"
            bgColor="#FFFFFF"
            fgColor="#0D1120"
            style={{ display: 'block' }}
          />
        </div>
      </div>

      <button
        onClick={() => setEnlarged(v => !v)}
        style={styles.enlargeBtn}
        aria-expanded={enlarged}
      >
        {enlarged ? (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M4 14H10V20" /><path d="M20 10H14V4" />
              <path d="M14 10L21 3" /><path d="M3 21L10 14" />
            </svg>
            {t.qrBlock.shrink}
          </>
        ) : (
          <>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M15 3H21V9" /><path d="M9 21H3V15" />
              <path d="M21 3L14 10" /><path d="M3 21L10 14" />
            </svg>
            {t.qrBlock.enlarge}
          </>
        )}
      </button>

      <p style={styles.hint}>{t.qrBlock.hint}</p>
    </section>
  );
}

const styles: Record<string, React.CSSProperties> = {
  block: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 16,
    padding: '28px 24px',
    background: 'rgba(18,171,219,0.06)',
    border: '1px solid rgba(18,171,219,0.25)',
    borderRadius: 16,
    textAlign: 'center',
    marginBottom: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 800,
    color: '#FFFFFF',
    marginBottom: 0,
  },
  desc: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    lineHeight: 1.6,
    maxWidth: 380,
  },
  qrOuter: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
    borderRadius: 12,
    background: 'rgba(255,255,255,0.07)',
    border: '1px solid rgba(255,255,255,0.12)',
  },
  qrCard: {
    background: '#FFFFFF',
    borderRadius: 8,
    padding: 16,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 2px 16px rgba(0,0,0,0.3)',
  },
  enlargeBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    background: 'transparent',
    border: '1px solid rgba(18,171,219,0.4)',
    borderRadius: 999,
    color: '#12ABDB',
    fontSize: 12,
    fontWeight: 600,
    padding: '6px 14px',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    fontFamily: 'inherit',
    WebkitTapHighlightColor: 'transparent',
  },
  hint: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.3)',
    lineHeight: 1.5,
    maxWidth: 340,
  },
};
