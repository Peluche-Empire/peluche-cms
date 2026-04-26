import type { CollectionAfterChangeHook } from 'payload'

type ArticleDoc = {
  id: number
  _status?: 'draft' | 'published'
  tenant?: number | { id: number; deployHook?: string | null; slug?: string }
}

export const triggerDeployHook: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
  operation,
}) => {
  const article = doc as ArticleDoc
  const previous = previousDoc as ArticleDoc | undefined

  if (article._status !== 'published') return doc

  // Skip republish-on-create when no real change happened. afterChange runs
  // for both 'create' and 'update'; we still want to fire on create (first publish)
  // and on update-while-published (typo fixes etc.).
  void operation
  void previous

  const tenantId =
    typeof article.tenant === 'object' && article.tenant
      ? article.tenant.id
      : (article.tenant as number | undefined)

  if (!tenantId) {
    req.payload.logger.warn(
      { articleId: article.id },
      'triggerDeployHook: published article has no tenant — skipping',
    )
    return doc
  }

  let deployHook: string | null | undefined
  let tenantSlug: string | undefined

  if (
    typeof article.tenant === 'object' &&
    article.tenant &&
    'deployHook' in article.tenant
  ) {
    deployHook = article.tenant.deployHook
    tenantSlug = article.tenant.slug
  } else {
    const tenant = await req.payload.findByID({
      collection: 'tenants',
      id: tenantId,
      req,
      depth: 0,
    })
    deployHook = (tenant as { deployHook?: string | null }).deployHook
    tenantSlug = (tenant as { slug?: string }).slug
  }

  if (!deployHook) {
    req.payload.logger.info(
      { articleId: article.id, tenantId, tenantSlug },
      'triggerDeployHook: tenant has no deployHook configured — skipping',
    )
    return doc
  }

  // Fire-and-forget. Workers Builds dedupes concurrent triggers by queueing,
  // so a flurry of edits won't run N parallel builds.
  fetch(deployHook, { method: 'POST' })
    .then((res) => {
      if (!res.ok) {
        req.payload.logger.error(
          {
            articleId: article.id,
            tenantId,
            tenantSlug,
            status: res.status,
          },
          'triggerDeployHook: deploy hook returned non-2xx',
        )
      } else {
        req.payload.logger.info(
          { articleId: article.id, tenantId, tenantSlug, status: res.status },
          'triggerDeployHook: deploy hook fired',
        )
      }
    })
    .catch((err) => {
      req.payload.logger.error(
        { articleId: article.id, tenantId, tenantSlug, err: String(err) },
        'triggerDeployHook: deploy hook fetch failed',
      )
    })

  return doc
}
