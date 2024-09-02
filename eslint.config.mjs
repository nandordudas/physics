import antfu from '@antfu/eslint-config'

export default antfu()
  .override('antfu/typescript/rules', {
    rules: {
      complexity: ['error', 5],
    },
  })
