import sizes from './data/media-sizes.json'

// Resolves /public paths against the deploy base so the site works from any sub-path.
export const asset = (p) => import.meta.env.BASE_URL + p.replace(/^\//, '')

// Known pixel sizes (from scripts/media-sizes.mjs) so images and videos reserve their space before loading.
export const sizeOf = (p) => {
  const s = sizes[p]
  return s ? { width: s[0], height: s[1] } : {}
}
