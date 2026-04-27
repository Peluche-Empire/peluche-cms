import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-d1-sqlite'

// Enabling versions.drafts.autosave on Articles makes Payload include an
// `autosave` checkbox field on the version table. Without this column the
// SELECT/INSERT statements Payload generates for `_articles_v` reference a
// missing column, which surfaces in the admin as a generic save failure and
// an "unauthorized" error on the Versions tab.
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.run(sql`ALTER TABLE \`_articles_v\` ADD \`autosave\` integer;`)
  await db.run(sql`CREATE INDEX \`_articles_v_autosave_idx\` ON \`_articles_v\` (\`autosave\`);`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.run(sql`DROP INDEX IF EXISTS \`_articles_v_autosave_idx\`;`)
  await db.run(sql`ALTER TABLE \`_articles_v\` DROP COLUMN \`autosave\`;`)
}
