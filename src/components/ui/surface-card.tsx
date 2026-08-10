import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Ein einziges Kartenrezept für die ganze Website:
 * weißer Grund, 1px Rahmen in 8% Schwarz, Radius 12px,
 * Innenabstand 20px mobil / 24px Desktop, dezenter Schatten.
 */
export const cardClass =
  'bg-card text-card-foreground border border-black/[0.08] rounded-xl p-5 md:p-6 shadow-card';

export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => <div className={cn(cardClass, className)} {...props} />;

export default Card;
