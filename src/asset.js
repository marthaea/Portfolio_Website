// Resolves /public paths against the deploy base so the site works from any sub-path.
export const asset = (p) => import.meta.env.BASE_URL + p.replace(/^\//, '')
