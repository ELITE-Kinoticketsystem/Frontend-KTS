/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      spacing : {
        "28rem" : "28rem",
        "36rem" : "36rem",
        "42rem" : "42rem"
      },
      colors : {
        // colors have the same name as in figma color palette(color pilot) + the color name
        backgroundBlue: '#1A1F25',
        textWhite: '#FAFAFA',
        darkTextWhite: '#D3D7D9',
        headerBlue: '#354A5F',
        listTileBlue: '#2A313A',
        iconColorBlue: '#89A3BE',
        profilepictureBlue: '#6CD3FE',
        buttonBlue: '#89a3be',
        inputBlue: '#89a3be',
        tileBlue: '#2A313A',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

