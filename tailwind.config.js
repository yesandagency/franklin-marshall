
module.exports = {
  mode: "jit",
  purge: [
    "./src/views/*.html",
    "./src/views/**/*.html",
    "./src/views/**/**/*.html",
    "./src/scripts/components/*.vue",
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    listStyleType: {
      none: "none",
      disc: "disc",
      square: "square",
      decimal: "decimal",
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      blue: {
        DEFAULT: "#006BD5",
        light: "#F5F9F9",
        ash: "#D4E1E1",
        mid: "#006BD5",
        dark: "#003073",
        navy: "#001D52",
        gray: "#5F7481",
      },
      red: {
        DEFAULT: '#FF2110',
        dark: '#EB1000',
        error: '#E60F00'
      },
      orange: '#FFA509',
    },
    fontFamily: {
      sans: ["Garnett", "sans-serif"],
      display: ["Garnett", "sans-serif"],
    },
    extend: {
      width: {
        '1/22': '4.545454545%',
        '2/22': '9.090909091%',
        '3/22': '13.63636364%',
        '4/22': '18.18181818%',
        '5/22': '22.72727273%',
        '6/22': '27.27272727%',
        '7/22': '31.81818182%',
        '8/22': '36.36363636%',
        '9/22': '40.90909091%',
        '10/22': '45.45454545%',
        '11/22': '50%',
        '12/22': '54.54545455%',
        '13/22': '59.09090909%',
        '14/22': '63.63636364%',
        '15/22': '68.18181818%',
        '16/22': '72.72727273%',
        '17/22': '77.27272727%',
        '18/22': '81.81818182%',
        '19/22': '86.36363636%',
        '20/22': '90.90909091%',
        '21/22': '95.45454545%',
        '1/24': '4.166666667%',
        '2/24': '8.333333333%',
        '20/24': '83.33333333%',
        '22/24': '91.66666667%',
        '23/48': '47.91666667%',
        '200' : '12.5rem',
        'card' : "26.063rem"
      },
      minWidth: {
        500: '31.25rem',
        600: '37.5rem'
      },
      maxWidth: (theme) => ({
        ...theme("width"),
      }),
      maxHeight: (theme) => ({
        ...theme("width"),
      }),
      height: {
        420: "26.25rem",
        500: "31.25rem",
        520: "32.5rem",
        600: "37.5rem",
      },
      minHeight: {
        'screen-50': '50vh',
        'screen-75': '75vh',
        9: '2.25rem',
        80: '20rem',
        88: '22rem',
        96: '24rem',
        500: '31.25rem',
        600: '37.5rem',
      },
      margin: (theme, { negative }) => ({
        ...theme("width"),
        ...negative(theme("width")),
        79: "4.938rem",
      }),
      padding: (theme) => ({
        ...theme("width"),
      }),
      fontSize: {
        12: '0.75rem',
        14: '0.875rem',
        16: '1rem',
        18: '1.125rem',
        20: '1.25rem',
        24: '1.5rem',
        26: '1.625rem',
        32: '2rem',
        40: '2.5rem',
        50: '3.125rem',
        56: '3.5rem',
        70: '4.375rem',
        80: '5rem',
        100: '6.25rem',
        140: '8.75rem',
      },
      lineHeight: {
        90: 0.9,
        1: 1,
        100: 1,
        110: 1.1,
        115: 1.15,
        120: 1.2,
        130: 1.3,
        140: 1.4,
        150: 1.5,
        160: 1.6,
      },
      transitionProperty: {
        "clip-path": "clip-path",
        bg: "background-color",
      },
      zIndex: {
        1: 1,
      },
      letterSpacing: {
        slight: "0.0125em",
      },
      fill: (theme) => ({
        ...theme("colors"),
      }),
      boxShadow: {
        blue: '0px 4px 40px 0px rgba(0, 29, 82, 0.08)',
      },
      transitionDuration: {
        DEFAULT: '350ms',
        350: '350ms',
      },
    },
  },
  variants: {
    extend: {},
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-debug-screens'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwindcss-writing-mode')({
      variants: ['responsive']
    })
  ],
};
