/** @type {import('tailwindcss').Config} */
//purgeオプションを設定することで、ビルド生成時の未使用のスタイルを除外し、パフォーマンスの最適化を行えます。
/*
JIT modeとは、必要に応じてスタイルを反映するモード（厳密には、コンパイラ）です。以下のような効果があります。

ビルド時間が非常に速い
開発時のブラウザパフォーマンスが良くなる
カスタマイズが容易になる
設定方法は以下のようにmode: 'jit'と付けるだけ
https://zenn.dev/shimakaze_soft/articles/0ce52691b6fc3e
*/
module.exports = {
  mode: 'jit',
  darkMode: false, // 'media' or 'class',
  purge: {
    content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    options: {
      // https://purgecss.com/safelisting.html#patterns
      safelist: {
        standard: [/^bg-/, /^text-/],
      },
    },
  },
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
