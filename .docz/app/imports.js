export const imports = {
  'src/image-clip/index.mdx': () =>
    import(
      /* webpackPrefetch: true, webpackChunkName: "src-image-clip-index" */ 'src/image-clip/index.mdx'
    ),
}
