module.exports = {
  presets: ['@babel/env', '@babel/typescript', '@babel/react'],
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
        '@babel/typescript',
        '@babel/react',
      ],
      plugins: ['@babel/plugin-proposal-class-properties'],
    },
  },
}
