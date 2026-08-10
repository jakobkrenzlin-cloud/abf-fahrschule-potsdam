import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '1rem',
			screens: {
				'2xl': '1152px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
			},
			fontSize: {
				h1: ['32px', { lineHeight: '1.2', fontWeight: '800' }],
				'h1-lg': ['48px', { lineHeight: '1.2', fontWeight: '800' }],
				h2: ['26px', { lineHeight: '1.2', fontWeight: '700' }],
				'h2-lg': ['36px', { lineHeight: '1.2', fontWeight: '700' }],
				h3: ['20px', { lineHeight: '1.2', fontWeight: '700' }],
				'h3-lg': ['24px', { lineHeight: '1.2', fontWeight: '700' }],
				body: ['17px', { lineHeight: '1.6', fontWeight: '400' }],
				small: ['15px', { lineHeight: '1.6', fontWeight: '400' }],
				label: ['13px', { lineHeight: '1.4', fontWeight: '600' }],
			},
			spacing: {
				1: '4px',
				2: '8px',
				3: '12px',
				4: '16px',
				6: '24px',
				8: '32px',
				12: '48px',
				16: '64px',
				20: '80px',
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				brand: {
					DEFAULT: 'hsl(var(--brand))',
					strong: 'hsl(var(--brand-strong))',
					dark: 'hsl(var(--brand-dark))'
				},
				ink: 'hsl(var(--ink))',
				surface: 'hsl(var(--surface))',
				success: 'hsl(var(--success))',
				warning: 'hsl(var(--warning))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				cta: {
					DEFAULT: 'hsl(var(--cta))',
					foreground: 'hsl(var(--cta-foreground))',
					hover: 'hsl(var(--cta-hover))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: '12px',
				xl: '12px',
				'2xl': '16px',
				md: '12px',
				sm: '12px'
			},
			boxShadow: {
				card: '0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.05)',
				elevated: '0 8px 28px rgba(0,0,0,0.12)',
				sm: '0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.05)',
				DEFAULT: '0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.05)',
				md: '0 1px 2px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.05)',
				lg: '0 8px 28px rgba(0,0,0,0.12)',
				xl: '0 8px 28px rgba(0,0,0,0.12)',
				'2xl': '0 8px 28px rgba(0,0,0,0.12)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
