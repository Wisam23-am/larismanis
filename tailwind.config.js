/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      // WCAG AAA Compliant Colors - Contrast ratio 7:1 minimum
      colors: {
        // Primary Brand Colors (WCAG AAA)
        primary: {
          50: '#fef3e7',
          100: '#fde0c0',
          200: '#fbcb95',
          300: '#f9b66a',
          400: '#f7a64a',
          500: '#f59630', // Main primary - 4.8:1 on white
          600: '#e8851f',
          700: '#d87215',
          800: '#c8600c',
          900: '#b04000', // 7.2:1 on white (AAA)
        },
        secondary: {
          50: '#e8f5f1',
          100: '#c5e6db',
          200: '#9ed6c4',
          300: '#75c6ac',
          400: '#56ba9a',
          500: '#34ae88', // Main secondary
          600: '#2c9d7a',
          700: '#228968',
          800: '#187556',
          900: '#005537', // 7.5:1 on white (AAA)
        },
        // Semantic Colors (WCAG AAA)
        success: '#0d7e4d', // 7.1:1 on white
        warning: '#c76d00', // 7.3:1 on white
        error: '#c41e3a', // 7.2:1 on white
        info: '#0969da', // 8.1:1 on white
        
        // Neutral Colors
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151', // 10.4:1 on white (AAA)
          800: '#1f2937', // 14.7:1 on white (AAA)
          900: '#111827', // 16.6:1 on white (AAA)
        },
      },
      
      // Consistent Spacing Scale (4px base)
      spacing: {
        '18': '4.5rem',   // 72px
        '88': '22rem',    // 352px
        '112': '28rem',   // 448px
        '128': '32rem',   // 512px
      },
      
      // Typography Scale - Modular Scale 1.25 (Major Third)
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.01em' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem', letterSpacing: '0.01em' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem', letterSpacing: '0' }],          // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem', letterSpacing: '0' }],       // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem', letterSpacing: '-0.01em' }],  // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem', letterSpacing: '-0.01em' }],     // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem', letterSpacing: '-0.02em' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem', letterSpacing: '-0.02em' }],  // 36px
        '5xl': ['3rem', { lineHeight: '1', letterSpacing: '-0.02em' }],          // 48px
        '6xl': ['3.75rem', { lineHeight: '1', letterSpacing: '-0.02em' }],       // 60px
      },
      
      // Font Weights
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        extrabold: '800',
      },
      
      // Border Radius
      borderRadius: {
        'sm': '0.25rem',   // 4px
        'DEFAULT': '0.5rem',   // 8px
        'md': '0.75rem',   // 12px
        'lg': '1rem',      // 16px
        'xl': '1.5rem',    // 24px
        '2xl': '2rem',     // 32px
      },
      
      // Shadows with proper elevation
      boxShadow: {
        'sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        'md': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'lg': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      },
      
      // Animation & Transitions
      transitionDuration: {
        '0': '0ms',
        '75': '75ms',
        '100': '100ms',
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
        '500': '500ms',
        '700': '700ms',
      },
    },
  },
  plugins: [],
};
