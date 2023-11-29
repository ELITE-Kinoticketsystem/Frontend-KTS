/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}', 
  './node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}',  
  './node_modules/flowbite/**/*.js'],
  theme: {
    extend: {
      height: {
        '2.4rem': '2.4rem',
        '21rem': '21rem'

      },
      padding: {
        '22rem': '22rem'
      },
      spacing: {
        '2rem': '2rem',
        '10.33rem': '10.33rem',
        '26rem': '26rem',
        '28rem': '28rem',
        '35rem': '35rem',
        '36rem': '36rem',
        '42rem': '42rem',
        '50rem': '50rem',
        '60rem': '60rem',
        '65rem': '65rem'
      },
      colors: {
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
        brightTextGray: '#444444'
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('flowbite/plugin')
  ]
}
