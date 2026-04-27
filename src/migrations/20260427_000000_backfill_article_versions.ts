import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`
    INSERT INTO \`_articles_v\` (
      \`parent_id\`, \`version_tenant_id\`, \`version_title\`, \`version_slug\`,
      \`version_description\`, \`version_hero_image_id\`, \`version_category_id\`,
      \`version_country_id\`, \`version_content\`, \`version_published_at\`,
      \`version_updated_at\`, \`version_created_at\`, \`version__status\`, \`latest\`
    )
    SELECT
      a.\`id\`, a.\`tenant_id\`, a.\`title\`, a.\`slug\`,
      a.\`description\`, a.\`hero_image_id\`, a.\`category_id\`,
      a.\`country_id\`, a.\`content\`, a.\`published_at\`,
      a.\`updated_at\`, a.\`created_at\`, 'published', 1
    FROM \`articles\` a
    LEFT JOIN \`_articles_v\` v ON v.\`parent_id\` = a.\`id\`
    WHERE v.\`id\` IS NULL;
  `)

  await db.run(sql`
    INSERT INTO \`_articles_v_rels\` (\`order\`, \`parent_id\`, \`path\`, \`tags_id\`)
    SELECT r.\`order\`, v.\`id\`, r.\`path\`, r.\`tags_id\`
    FROM \`articles_rels\` r
    JOIN \`_articles_v\` v ON v.\`parent_id\` = r.\`parent_id\`
    WHERE NOT EXISTS (
      SELECT 1 FROM \`_articles_v_rels\` vr WHERE vr.\`parent_id\` = v.\`id\`
    );
  `)
}

export async function down({ db: _db }: MigrateDownArgs): Promise<void> {
  // No-op: this migration only inserts version rows for articles that previously
  // had none. A symmetric DELETE would also remove versions created by editors
  // after this ran, so rolling back is intentionally manual.
}
