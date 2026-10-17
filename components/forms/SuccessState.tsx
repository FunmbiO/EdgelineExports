import { getDictionary, type Locale } from "@/lib/i18n/dictionary";

export default function SuccessState({
  reference,
  message,
  locale,
}: {
  reference: string;
  message: string;
  locale: Locale;
}) {
  const t = getDictionary(locale);

  return (
    <div className="fade-up border border-theme-border bg-card p-12 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-edgeline-red">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          className="h-8 w-8 text-edgeline-red"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h3 className="mt-6 font-display text-3xl text-card-foreground">{t.forms.requestReceived}</h3>
      <p className="mx-auto mt-3 max-w-md font-body text-card-foreground/70">{message}</p>
      <p className="mt-6 font-condensed text-sm uppercase tracking-wider text-card-foreground/50">
        {t.forms.reference}: <span className="text-edgeline-red">{reference}</span>
      </p>
    </div>
  );
}
