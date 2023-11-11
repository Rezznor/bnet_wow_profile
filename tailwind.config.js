/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    safelist: [
        'border-faction-alliance',
        'border-faction-horde',
        'text-raid_LFR',
        'text-raid_NORMAL',
        'text-raid_HEROIC',
        'text-raid_MYTHIC',
        'bg-gear-common',
        'bg-gear-uncommon',
        'bg-gear-rare',
        'bg-gear-epic',
        'bg-gear-legendary',
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            colors: {
                'bg-blue': '#282c38',
                'giga-green': '#00ff33',
                'blizzard-btn': '#005aad',
                'gear-poor': '#9d9d9d',
                'gear-common': '#ffffff',
                'gear-uncommon': '#1eff00',
                'gear-rare': '#0070dd',
                'gear-epic': '#a335ee',
                'gear-legendary': '#ff8000',
                'gear-artifact': '#e6cc80',
                'gear-heirloom': '#00ccff',
                'faction-alliance': '#6699ff',
                'faction-horde': '#e02929',
                'raid_LFR' : '#1eff00',
                'raid_NORMAL': '#0070dd',
                'raid_HEROIC': '#a335ee',
                'raid_MYTHIC': '#ff8000',
            }
        },
    },
    plugins: [],
}
