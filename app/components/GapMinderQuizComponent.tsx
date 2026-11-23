'use client';

import { useEffect, useState, useCallback } from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuizOption {
  label: 'A' | 'B' | 'C';
  text: string;
  isCorrect: boolean;
  isCommonWrong: boolean;
}

export interface GapminderQuestion {
  id: string;
  shortTitle?: string;
  question: string;
  options: QuizOption[];
  humanWrongPercentage: number;
  explanation?: string;
}

const WAIT_SECONDS = 5  ;
const REVEAL_DURATION_SECONDS = 10;

function parseCSV(csvText: string): Record<string, string>[] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;

  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const next = csvText[i + 1];

    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ',') {
        row.push(field);
        field = '';
      } else if (char === '\r' && next === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
        i++;
      } else if (char === '\n') {
        row.push(field);
        rows.push(row);
        row = [];
        field = '';
      } else {
        field += char;
      }
    }
  }
  if (field || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  const headers = rows[0]?.map((h) => h.trim()) ?? [];
  return rows.slice(1).map((r) => {
    const obj: Record<string, string> = {};
    headers.forEach((h, idx) => {
      obj[h] = (r[idx] ?? '').trim();
    });
    return obj;
  });
}

function mapCsvToQuestions(csvText: string): GapminderQuestion[] {
  const raw = parseCSV(csvText);

  return raw
    .filter(
      (r) =>
        r.published_version_of_question &&
        r.option_a &&
        r.option_b &&
        r.option_c &&
        r.option_a_correctness
    )
    .map((r) => ({
      id: r.question,
      shortTitle: r.short_title || undefined,
      question: r.published_version_of_question,
      humanWrongPercentage: Number(r.human_wrong_percentage) || 0,
      explanation: r.explanation || undefined,
      options: [
        {
          label: 'A',
          text: r.option_a,
          isCorrect: Number(r.option_a_correctness) === 1,
          isCommonWrong: Number(r.option_a_correctness) === 3,
        },
        {
          label: 'B',
          text: r.option_b,
          isCorrect: Number(r.option_b_correctness) === 1,
          isCommonWrong: Number(r.option_b_correctness) === 3,
        },
        {
          label: 'C',
          text: r.option_c,
          isCorrect: Number(r.option_c_correctness) === 1,
          isCommonWrong: Number(r.option_c_correctness) === 3,
        },
      ],
    }));
}

function PoopIcon({ className = 'w-10 h-10' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="currentColor"
      className={className}
      role="img"
      aria-label="Häufigster Irrtum"
    >
      <path d="M421.813,327.728c32.953-49.156,5.344-115.031-57.219-127.203c32.453-30.547,7-75.625-28.5-91.594c-18.031-8.109-24.891-17.688-30.875-27.672c-11.469-19.078-15.688-46.438-45.813-62.016c-20.75-10.75-50.094-13.609-65.844-4.297c-10.594,6.25,1.688,9.125,10.75,16.453c15.031,12.172,15.75,31.484,2.594,47c-16.906,19.984-30.5,24.797-45.781,30.531c-36.438,13.656-61.531,61.047-29.094,91.594c-63.5,12.359-90.563,80.063-55.172,129.438C32.844,340.243,0,379.649,0,426.821c0,30.406,13.672,57.578,35.156,75.844h441.688C498.313,484.399,512,457.228,512,426.821C512,374.993,472.406,332.462,421.813,327.728z" />
    </svg>
  );
}


export function GapminderQuizComponent({
  csvUrl = '/data/ddf--entities--question.csv',
  autoAdvance = true,
}: {
  csvUrl?: string;
  autoAdvance?: boolean;
}) {
  const [questions, setQuestions] = useState<GapminderQuestion[]>([]);
  const [current, setCurrent] = useState<GapminderQuestion | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number>(WAIT_SECONDS);
  const [revealed, setRevealed] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const pickRandomQuestion = useCallback((pool: GapminderQuestion[], excludeId?: string) => {
    if (pool.length === 0) return;
    const candidates = pool.length > 1 ? pool.filter((q) => q.id !== excludeId) : pool;
    const next = candidates[Math.floor(Math.random() * candidates.length)];
    setCurrent(next);
    setSecondsLeft(WAIT_SECONDS);
    setRevealed(false);
  }, []);

  useEffect(() => {
    let active = true;
    fetch(csvUrl)
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to load CSV (${res.status})`);
        return res.text();
      })
      .then((text) => {
        if (!active) return;
        const parsed = mapCsvToQuestions(text);
        setQuestions(parsed);
        pickRandomQuestion(parsed);
      })
      .catch((err) => {
        if (active) setError(err.message);
      });

    return () => {
      active = false;
    };
  }, [csvUrl, pickRandomQuestion]);

  useEffect(() => {
    if (!current || revealed) return;

    if (secondsLeft <= 0) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setRevealed(true);
      return;
    }

    const timer = setTimeout(() => {
      setSecondsLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [current, secondsLeft, revealed]);

  useEffect(() => {
    if (!revealed || !autoAdvance || !REVEAL_DURATION_SECONDS) return;

    const nextTimer = setTimeout(() => {
      pickRandomQuestion(questions, current?.id);
    }, REVEAL_DURATION_SECONDS * 1000);

    return () => clearTimeout(nextTimer);
  }, [revealed, autoAdvance, questions, current?.id, pickRandomQuestion]);

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8 text-red-600 text-2xl font-bold">
        Fehler beim Laden der Quiz-Daten: {error}
      </div>
    );
  }

  if (!current) {
    return (
      <div className="w-full h-full flex items-center justify-center p-8 text-zinc-500 text-2xl font-semibold">
        Lade Gapminder-Frage...
      </div>
    );
  }

  return (
    <div className="w-full h-full mx-auto flex flex-col justify-center">
      <div className="relative w-full h-full rounded-2xl border border-zinc-200 bg-white shadow-md flex flex-col justify-between items-center text-center gap-6 p-6 sm:p-10 overflow-hidden">
        <div className="w-full max-w-5xl pt-2">
          <h2 className="text-3xl sm:text-5xl font-black text-zinc-900 tracking-tight leading-tight">
            {current.question}
          </h2>
        </div>

        <div className="relative w-full flex flex-col items-center">
          <div className="w-full max-w-5xl grid grid-cols-1 gap-4 text-left">
            {current.options.map((opt) => {
              let cardStyle = 'bg-zinc-50 border-zinc-200 text-zinc-800';
              let badgeStyle = 'bg-white border-zinc-300 text-zinc-700';

              if (revealed) {
                if (opt.isCorrect) {
                  cardStyle =
                    'bg-emerald-50 border-emerald-500 text-emerald-950 ring-2 ring-emerald-500/30 scale-[1.01]';
                  badgeStyle = 'bg-emerald-600 border-emerald-600 text-white';
                } else if (opt.isCommonWrong) {
                  cardStyle =
                    'bg-red-50 border-red-500 text-red-950 ring-2 ring-red-500/30';
                  badgeStyle = 'bg-red-600 border-red-600 text-white';
                } else {
                  cardStyle =
                    'bg-zinc-50/60 border-zinc-200/70 text-zinc-400 opacity-65';
                  badgeStyle = 'bg-zinc-100 border-zinc-200 text-zinc-400';
                }
              }

              return (
                <div
                  key={opt.label}
                  className={`p-5 sm:p-6 rounded-2xl border-2 transition-all duration-300 flex items-center justify-between gap-4 ${cardStyle}`}
                >
                  <div className="flex items-center gap-5">
                    <span
                      className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl border-2 flex items-center justify-center font-black text-2xl sm:text-3xl shrink-0 ${badgeStyle}`}
                    >
                      {opt.label}
                    </span>
                    <span className="text-2xl sm:text-4xl font-bold">
                      {opt.text}
                    </span>
                  </div>

                  {revealed && (
                    <div className="shrink-0 flex items-center gap-2">
                      {opt.isCorrect ? (
                        <CheckCircle2 className="w-10 h-10 sm:w-12 sm:h-12 text-emerald-600" />
                      ) : opt.isCommonWrong ? (
                        <PoopIcon className="w-10 h-10 sm:w-12 sm:h-12 text-red-600" />
                      ) : (
                        <XCircle className="w-9 h-9 sm:w-10 sm:h-10 text-zinc-300" />
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="w-full max-w-5xl pt-5 text-xl sm:text-2xl font-semibold">
            <span
              className={
                revealed ? 'opacity-0 select-none pointer-events-none' : 'text-zinc-400'
              }
            >
              Auflösung in {secondsLeft}...
            </span>
          </div>
        </div>

        <footer className="w-full max-w-5xl flex items-center justify-between text-xs sm:text-sm text-zinc-400 border-t border-zinc-100 pt-3">
          <span>
            Fragen & Daten:{' '}
            <a
              href="https://www.gapminder.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-zinc-500 hover:text-zinc-800 underline underline-offset-2"
            >
              Gapminder.org
            </a>{' '}
            (CC-BY 4.0)
          </span>
        </footer>
      </div>
    </div>
  );
}