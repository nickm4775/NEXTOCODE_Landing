import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'

// Decorative, localized renderings of the Negocenda UI. They are aria-hidden:
// the surrounding tile title and text carry the meaning for assistive tech.

const useFormat = () => {
  const { i18n } = useTranslation()
  const lng = i18n.resolvedLanguage ?? 'pt'
  return {
    int: (n: number) => new Intl.NumberFormat(lng).format(n),
    dec: (n: number) => new Intl.NumberFormat(lng, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(n),
    pct: (n: number) => new Intl.NumberFormat(lng, { style: 'percent', maximumFractionDigits: 1, minimumFractionDigits: 1 }).format(n),
  }
}

const Line = ({ w, className = '' }: { w: string; className?: string }) => (
  <span className={`block h-1.5 rounded-full bg-(--fg)/10 ${className}`} style={{ width: w }} />
)

const Window = ({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) => (
  <div
    data-mock
    aria-hidden="true"
    className={`flex flex-col overflow-hidden rounded-2xl bg-(--bg) text-left text-(--fg) shadow-[0_30px_80px_-30px_rgb(22_0_155/0.45)] ring-1 ring-(--border) select-none ${className}`}
  >
    <div className="flex items-center gap-1.5 border-b border-(--border) px-4 py-3">
      <span className="size-2.5 rounded-full bg-(--fg)/15" />
      <span className="size-2.5 rounded-full bg-(--fg)/15" />
      <span className="size-2.5 rounded-full bg-(--fg)/15" />
      <span className="ml-3 text-[11px] font-medium text-(--fg-muted)">Negocenda · {title}</span>
    </div>
    <div className="min-h-0 flex-1">{children}</div>
  </div>
)

const BARS = [34, 48, 40, 62, 55, 78, 70, 92, 84, 66, 74, 88]

export const DashboardMock = () => {
  const { t } = useTranslation()
  const f = useFormat()
  const kpis = [
    { label: t('products.mock.orders'), value: f.int(1248), trend: `+${f.pct(0.124)}` },
    { label: t('products.mock.margin'), value: f.pct(0.382), trend: `+${f.pct(0.021)}` },
    { label: t('products.mock.lowStock'), value: f.int(7), trend: '' },
  ]

  return (
    <Window title={t('products.mock.dashboard')}>
      <div className="flex">
        <div className="hidden w-14 shrink-0 flex-col items-center gap-3 border-r border-(--border) py-4 sm:flex">
          <span className="size-6 rounded-lg bg-(--accent)" />
          {[0, 1, 2, 3, 4].map((i) => (
            <span key={i} className={`size-5 rounded-md ${i === 0 ? 'bg-(--fg)/20' : 'bg-(--fg)/8'}`} />
          ))}
        </div>
        <div className="min-w-0 flex-1 p-4 sm:p-5">
          <p className="text-sm font-semibold">{t('products.mock.dashboard')}</p>
          <p className="mb-4 text-[11px] text-(--fg-muted)">{t('products.mock.today')}</p>
          <div className="grid grid-cols-3 gap-2 sm:gap-3">
            {kpis.map((k) => (
              <div key={k.label} className="rounded-xl bg-(--surface-2) p-2.5 sm:p-3">
                <p className="truncate text-[10px] text-(--fg-muted) sm:text-[11px]">{k.label}</p>
                <p className="mt-1 text-base font-semibold tracking-tight tabular-nums sm:text-xl">{k.value}</p>
                <p className="h-3 text-[10px] font-medium text-(--secondary-30) dark:text-(--secondary-50)">{k.trend}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 rounded-xl bg-(--surface-2) p-3">
            <p className="mb-3 text-[11px] font-medium">{t('products.mock.salesByHour')}</p>
            <div className="flex h-24 items-end gap-1.5 sm:h-28">
              {BARS.map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-(--primary-50) to-(--secondary-50) opacity-90"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </Window>
  )
}

const PRODUCT_TINTS = ['bg-(--primary-90) dark:bg-(--primary-30)', 'bg-(--secondary-90) dark:bg-(--secondary-10)', 'bg-(--primary-70)/30']
const TICKET = [
  { w: '62%', qty: 2, price: 18.9 },
  { w: '48%', qty: 1, price: 24.5 },
  { w: '55%', qty: 3, price: 7.1 },
  { w: '40%', qty: 1, price: 12.0 },
  { w: '58%', qty: 2, price: 9.75 },
]

export const PosMock = () => {
  const { t } = useTranslation()
  const f = useFormat()
  const total = TICKET.reduce((sum, l) => sum + l.qty * l.price, 0)

  return (
    <Window title={t('products.mock.checkout')} className="h-full">
      <div className="flex h-full flex-col p-4 sm:p-5">
        <div className="grid grid-cols-3 gap-2">
          {Array.from({ length: 9 }, (_, i) => (
            <div key={i} className={`rounded-xl p-2 ${PRODUCT_TINTS[i % 3]}`}>
              <span className="mb-2 block aspect-square rounded-lg bg-(--bg)/60" />
              <Line w="80%" />
              <Line w="45%" className="mt-1" />
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-1 flex-col rounded-xl bg-(--surface-2) p-3">
          <p className="mb-3 text-[11px] font-semibold">{t('products.mock.ticket')}</p>
          <ul className="space-y-2.5">
            {TICKET.map((l, i) => (
              <li key={i} className="flex items-center gap-2 text-[11px] tabular-nums">
                <span className="text-(--fg-muted)">{l.qty}×</span>
                <Line w={l.w} className="flex-1" />
                <span className="ml-auto">{f.dec(l.qty * l.price)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-auto flex items-baseline justify-between border-t border-(--border) pt-3">
            <span className="text-[11px] text-(--fg-muted)">{t('products.mock.total')}</span>
            <span className="text-xl font-semibold tracking-tight tabular-nums">{f.dec(total)}</span>
          </div>
          <span className="mt-3 grid h-9 place-items-center rounded-lg bg-(--btn-bg) text-[12px] font-semibold text-(--btn-fg)">
            {t('products.mock.charge')}
          </span>
        </div>
      </div>
    </Window>
  )
}

const STOCK = [
  { w: '58%', qty: 124, low: false },
  { w: '44%', qty: 6, low: true },
  { w: '66%', qty: 87, low: false },
  { w: '38%', qty: 3, low: true },
]

export const InventoryMock = () => {
  const { t } = useTranslation()
  const f = useFormat()

  return (
    <Window title={t('products.mock.inventory')}>
      <div className="p-4 sm:p-5">
        <div className="mb-2 grid grid-cols-[1fr_auto_auto] gap-4 px-2 text-[10px] font-medium tracking-wide text-(--fg-muted) uppercase">
          <span>{t('products.mock.product')}</span>
          <span className="w-10 text-right">{t('products.mock.stock')}</span>
          <span className="w-14" />
        </div>
        <ul className="divide-y divide-(--border) rounded-xl bg-(--surface-2)">
          {STOCK.map((row, i) => (
            <li key={i} className="grid grid-cols-[1fr_auto_auto] items-center gap-4 px-3 py-3">
              <span className="flex items-center gap-3">
                <span className={`size-7 shrink-0 rounded-lg ${PRODUCT_TINTS[i % 3]}`} />
                <Line w={row.w} />
              </span>
              <span className="w-10 text-right text-[12px] font-medium tabular-nums">{f.int(row.qty)}</span>
              <span
                className={`w-14 rounded-full py-0.5 text-center text-[10px] font-semibold ${
                  row.low
                    ? 'bg-amber-500/15 text-amber-700 dark:text-amber-300'
                    : 'bg-(--secondary-50)/15 text-(--secondary-20) dark:text-(--secondary-50)'
                }`}
              >
                {row.low ? t('products.mock.low') : t('products.mock.ok')}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </Window>
  )
}

type Tone = 'primary' | 'secondary'

const PANEL_TONES: Record<Tone, string> = {
  primary: 'bg-(--primary-90)/70 dark:bg-(--primary-20)',
  secondary: 'bg-(--secondary-90)/80 dark:bg-(--secondary-10)',
}

// Tinted strip that bleeds to the card edges so each example reads as its own area.
const ExamplePanel = ({ id, tone, children }: { id: string; tone: Tone; children: ReactNode }) => (
  <div
    data-mock
    data-example={id}
    aria-hidden="true"
    className={`-mx-8 -mb-8 mt-8 flex-1 p-5 text-[13px] leading-snug select-none md:-mx-10 md:-mb-10 md:p-6 ${PANEL_TONES[tone]}`}
  >
    {children}
  </div>
)

const Bubble = ({ from, children }: { from: 'me' | 'them'; children: ReactNode }) => (
  <p
    className={
      from === 'me'
        ? 'ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-(--btn-bg) px-3.5 py-2 text-(--btn-fg)'
        : 'w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-(--bg) px-3.5 py-2 shadow-sm'
    }
  >
    {children}
  </p>
)

const SHOP_ITEMS = [
  { w: '70%', price: 24.9, tint: 0 },
  { w: '55%', price: 12.5, tint: 1 },
]

export const ShopMock = () => {
  const { t } = useTranslation()
  const f = useFormat()
  return (
    <ExamplePanel id="ecommerce" tone="primary">
      <div className="grid grid-cols-2 gap-2">
        {SHOP_ITEMS.map((item) => (
          <div key={item.price} className="rounded-xl bg-(--bg) p-2 shadow-sm">
            <span className={`mb-2 block aspect-[4/3] rounded-lg ${PRODUCT_TINTS[item.tint]}`} />
            <Line w={item.w} />
            <div className="mt-2 flex items-center justify-between">
              <span className="text-[12px] font-semibold tabular-nums">{f.dec(item.price)}</span>
              <span className="rounded-full bg-(--btn-bg) px-2 py-0.5 text-[10px] font-semibold text-(--btn-fg)">
                {t('products.mock.shopAdd')}
              </span>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-3 flex items-center gap-2 text-[11px] font-medium text-(--secondary-20) dark:text-(--secondary-50)">
        <span className="size-1.5 rounded-full bg-(--secondary-40)" />
        {t('products.mock.shopSynced')}
      </p>
    </ExamplePanel>
  )
}

export const AiMock = () => {
  const { t } = useTranslation()
  return (
    <ExamplePanel id="ai" tone="primary">
      <div className="space-y-2">
        <Bubble from="me">{t('products.mock.aiQuestion')}</Bubble>
        <Bubble from="them">{t('products.mock.aiAnswer')}</Bubble>
      </div>
    </ExamplePanel>
  )
}

export const WhatsAppMock = () => {
  const { t } = useTranslation()
  return (
    <ExamplePanel id="whatsapp" tone="secondary">
      <div className="space-y-2">
        <Bubble from="them">{t('products.mock.waQuestion')}</Bubble>
        <Bubble from="me">{t('products.mock.waAnswer')}</Bubble>
      </div>
    </ExamplePanel>
  )
}
