import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: [
    // Buttons
    [
      'btn',
      'px-4 py-2 rounded-[5px] inline-block bg-cc-accent text-white text-btn cursor-pointer hover:bg-cc-accent/90 disabled:(cursor-default bg-gray-400 opacity-50)',
    ],
    [
      'btn-primary',
      'px-4 py-2 rounded-[5px] inline-block bg-cc-primary text-white text-btn cursor-pointer hover:bg-cc-primary/90 disabled:(cursor-default bg-gray-400 opacity-50)',
    ],
    [
      'icon-btn',
      'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:(opacity-100 text-cc-primary)',
    ],

    // Typography — based on Figma design spec
    ['text-h1', 'text-2.5rem font-serif font-bold leading-[1.2] tracking-[0.125rem]'],
    ['text-h2', 'text-2rem font-serif font-bold leading-[1.2] tracking-[0.125rem]'],
    ['text-h3', 'text-1.75rem font-serif font-bold leading-[1.2] tracking-[0.125rem]'],
    ['text-h4', 'text-1.5rem font-serif font-medium leading-[1.2] tracking-[0.125rem]'],
    ['text-h5', 'text-1.25rem font-serif font-medium leading-[1.2] tracking-[0.125rem]'],
    ['text-h6', 'text-1rem font-serif font-medium leading-[1.2] tracking-[0.125rem]'],
    ['text-title', 'text-2.5rem font-serif font-bold leading-[1.2] tracking-[0.125rem]'],
    ['text-sec-title', 'text-1.75rem font-serif font-medium leading-[1.2] tracking-[0.125rem]'],
    ['text-area-title', 'text-0.875rem font-sans leading-[1.5]'],
    ['text-body', 'text-0.875rem font-sans leading-[1.5]'],
    ['text-btn', 'text-0.875rem font-sans leading-[1.5] tracking-[0.125rem]'],

    // Utilities
    ['img-cover', 'w-full h-full object-cover'],
  ],
  theme: {
    colors: {
      cc: {
        'primary': '#0F4BB4',
        'accent': '#EE5220',
        'brown': '#B29575',
        'success': '#0D7C3E',
        'success-light': '#ECFDF3',
        'warning': '#B25E09',
        'warning-light': '#FEF6EC',
        'white': '#FFFFFF',
        'black': '#181818',
        'grey': {
          '66': '#666666',
          '9f': '#9F9F9F',
          'd4': '#D4D4D4',
          'e9': '#E9E9E9',
          'f7': '#F8F7F5',
        },
        'overlay': 'rgba(24,24,24,0.8)',
        'line-pay': '#00B900',
      },
    },
    maxWidth: {
      'cc-width': '1296px',
      'cc-big-width': '1328px',
    },
    borderRadius: {
      m: '5px',
    },
    fontFamily: {
      sans: ['Noto Sans TC', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      serif: ['Noto Serif TC', 'ui-serif', 'Georgia', 'serif'],
    },
  },
  preflights: [
    {
      getCSS: () => `:root, :host {
        --font-sans: "Noto Sans TC", ui-sans-serif, system-ui, sans-serif;
        --font-serif: "Noto Serif TC", ui-serif, Georgia, serif;
      }`,
    },
  ],
  presets: [
    presetWind4(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
    }),
    presetTypography(),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
