module.exports = {
  presets: ['@babel/env', '@babel/react', '@babel/typescript'],
  plugins: ['@babel/plugin-proposal-class-properties'],
  env: {
    test: {
      presets: [
        [
          '@babel/env',
          {
            loose: true,
            modules: 'commonjs',
            useBuiltIns: 'usage',
            corejs: 3,
            targets: {
              node: 'current',
            },
          },
        ],
        '@babel/react',
        '@babel/typescript',
      ],
      plugins: ['@babel/plugin-proposal-class-properties'],
    },
  },
}
