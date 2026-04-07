/**
 * sharePayload.ts
 *
 * Compact encode/decode for the QR-code share URL.
 * Format: URL-safe base64( encodeURIComponent( JSON.stringify(payload) ) )
 *
 * Short keys to minimise QR payload size:
 *   ts  – trend scores
 *   f   – forces
 *   st  – sous tension
 *   a   – actions
 *   l   – label shortcode: 'B' | 'P' | 'S'
 *   lg  – language: 'fr' | 'en'
 */

import type { ScoreResult } from '../engine/scoring';
import type { SelectedAction } from '../engine/actionsEngine';
import type { Lang } from '../i18n/types';
import type { Translations } from '../i18n/types';

// ── Payload types ────────────────────────────────────────────────────────────

export type LabelShort = 'B' | 'P' | 'S';

export interface ShareTrendScore {
  n: string;          // trend name
  s: number;          // score 0-100
  l: LabelShort;      // label shortcode
}

export interface ShareAction {
  t: string;          // title
  d: string;          // description (first ~150 chars)
  tr: string[];       // impacted trend names
}

export interface SharePayload {
  v: 1;
  ts: ShareTrendScore[];
  f:  string[];       // forces
  st: string[];       // sous tension
  a:  ShareAction[];
  lg?: Lang;          // language used during assessment ('fr' default)
}

// ── Label helpers ─────────────────────────────────────────────────────────────

const LABEL_TO_SHORT: Record<string, LabelShort> = {
  // French labels
  'Bien positionne':          'B',
  'Bien positionné':          'B',
  'Prometteur mais fragile':  'P',
  'Sous tension':             'S',
  // English labels
  'Well positioned':          'B',
  'Promising but fragile':    'P',
  'Under tension':            'S',
};

/** Expand a LabelShort using the translations' share.scoreLabels map. */
export function expandLabel(short: LabelShort, scoreLabels: Translations['share']['scoreLabels']): string {
  return scoreLabels[short] ?? short;
}

// ── Build payload from app state ──────────────────────────────────────────────

export function buildSharePayload(
  scores: ScoreResult,
  actions: SelectedAction[],
  lang: Lang = 'fr',
): SharePayload {
  return {
    v: 1,
    lg: lang,
    ts: scores.trendScores.map(ts => ({
      n: ts.trendName,
      s: ts.globalScore,
      l: LABEL_TO_SHORT[ts.label] ?? 'P',
    })),
    f:  scores.forces,
    st: scores.underTension,
    a: actions.map(a => ({
      t: a.title,
      // Keep first sentence (up to 150 chars) to limit QR size
      d: a.description.length > 150
        ? a.description.slice(0, 150).replace(/\s\S*$/, '') + '...'
        : a.description,
      tr: a.impactedTrendNames,
    })),
  };
}

// ── Encode ────────────────────────────────────────────────────────────────────

export function encodeSharePayload(payload: SharePayload): string {
  // encodeURIComponent handles UTF-8 (accented chars), btoa converts to base64
  const b64 = btoa(encodeURIComponent(JSON.stringify(payload)));
  // Convert to URL-safe base64 (no +, /, = to avoid double-encoding)
  return b64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
}

// ── Decode ────────────────────────────────────────────────────────────────────

export function decodeSharePayload(encoded: string): SharePayload | null {
  try {
    // Restore standard base64
    const std = encoded.replace(/-/g, '+').replace(/_/g, '/');
    const padding = std.length % 4 === 0 ? '' : '='.repeat(4 - (std.length % 4));
    const json = decodeURIComponent(atob(std + padding));
    const parsed = JSON.parse(json) as SharePayload;
    if (parsed.v !== 1 || !Array.isArray(parsed.ts)) return null;
    return parsed;
  } catch {
    return null;
  }
}

// ── Build QR URL ──────────────────────────────────────────────────────────────

export function buildShareUrl(payload: SharePayload): string {
  const encoded = encodeSharePayload(payload);
  // Use current origin + pathname as base so it works on any deployment
  const base = `${window.location.origin}${window.location.pathname}`;
  // Remove trailing slash inconsistency
  const cleanBase = base.endsWith('/') ? base : base + '/';
  return `${cleanBase}?data=${encoded}`;
}

// ── Text format for clipboard / email ────────────────────────────────────────

export function formatPlanText(
  payload: SharePayload,
  t: Translations['planText'],
  scoreLabels: Translations['share']['scoreLabels'],
): string {
  const trendLines = payload.ts
    .map(ts => `  • ${ts.n} : ${ts.s}/100 — ${expandLabel(ts.l, scoreLabels)}`)
    .join('\n');

  const forces = payload.f.length > 0 ? payload.f.join(', ') : '—';
  const tensions = payload.st.length > 0 ? payload.st.join(', ') : '—';

  const actionLines = payload.a
    .map((a, i) =>
      `${i + 1}. ${a.t}\n   ${a.d}\n   ${t.trendsImpacted}${a.tr.join(', ')}`,
    )
    .join('\n\n');

  return `${t.header}
${t.generated}

${t.trendsSection}
${trendLines}

${t.positioningSection}
${t.forcesLabel}${forces}
${t.tensionLabel}${tensions}

${t.actionsSection}
${actionLines}

———
${t.footer}`;
}

export function formatEmailBody(
  payload: SharePayload,
  t: Translations['emailText'],
  scoreLabels: Translations['share']['scoreLabels'],
): string {
  const trendLines = payload.ts
    .map(ts => `  • ${ts.n} : ${ts.s}/100 — ${expandLabel(ts.l, scoreLabels)}`)
    .join('\n');

  const forces = payload.f.length > 0 ? payload.f.join(', ') : '—';
  const tensions = payload.st.length > 0 ? payload.st.join(', ') : '—';

  const actionLines = payload.a
    .map((a, i) =>
      `${i + 1}. ${a.t}\n   ${a.d}\n   ${t.trendsImpacted}${a.tr.join(', ')}`,
    )
    .join('\n\n');

  return `Bonjour,

${t.intro}

${t.trendsSection}
${trendLines}

${t.positioningSection}
${t.forcesLabel}${forces}
${t.tensionLabel}${tensions}

${t.actionsSection}
${actionLines}

${t.closing}

Cordialement`;
}
