import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * Eine Button-Komponente für die gesamte Website.
 * Varianten: primary (Hauptaktion), secondary (Rahmen), ghost (Textlink).
 * Mindesthöhe 48px mobil / 44px Desktop, Radius 12px, Gewicht 600, sichtbarer Fokusring.
 */
const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-base font-semibold transition-colors disabled:pointer-events-none disabled:opacity-60 [&_svg]:pointer-events-none [&_svg]:size-5 [&_svg]:shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        primary: "bg-brand-strong text-white hover:bg-brand-strong/90 active:bg-brand-strong",
        secondary:
          "border-2 border-brand bg-transparent text-brand-dark hover:bg-brand/10",
        ghost: "bg-transparent text-brand-strong underline-offset-4 hover:underline",
        success: "bg-success text-white hover:bg-success/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        /* Aliase für bestehende shadcn-Aufrufe */
        default: "bg-brand-strong text-white hover:bg-brand-strong/90",
        outline: "border-2 border-brand bg-transparent text-brand-dark hover:bg-brand/10",
        link: "bg-transparent text-brand-strong underline-offset-4 hover:underline",
      },
      size: {
        default: "min-h-[48px] md:min-h-[44px] px-6 py-2",
        sm: "min-h-[44px] px-4 text-small",
        lg: "min-h-[56px] md:min-h-[52px] px-8 text-lg",
        icon: "min-h-[44px] min-w-[44px] w-11",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
