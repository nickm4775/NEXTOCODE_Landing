import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'link'
type Size = 'sm' | 'md' | 'lg'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { variant?: Variant; size?: Size; children: ReactNode }

const base =
  'inline-flex items-center justify-center gap-1.5 rounded-full font-medium whitespace-nowrap transition-[background-color,color,transform,box-shadow] duration-200 active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-(--accent)'

const sizes: Record<Size, string> = {
  sm: 'h-8 px-4 text-[13px]',
  md: 'h-11 px-6 text-[15px]',
  lg: 'h-12 px-7 text-[17px]',
}

const variants: Record<Variant, string> = {
  primary: 'bg-(--btn-bg) text-(--btn-fg) hover:bg-(--btn-bg-hover) shadow-[0_8px_24px_-12px_var(--accent)]',
  secondary: 'bg-(--surface-2) text-(--fg) hover:bg-(--border)',
  link: '!px-0 !h-auto text-(--accent) hover:underline underline-offset-4',
}

export const Button = ({ variant = 'primary', size = 'md', className = '', children, ...rest }: Props) => (
  <a className={`${base} ${sizes[size]} ${variants[variant]} ${className}`} {...rest}>
    {children}
    {variant === 'link' && <span aria-hidden="true">›</span>}
  </a>
)
