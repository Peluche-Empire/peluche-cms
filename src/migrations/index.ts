import * as migration_20250929_111647 from './20250929_111647';
import * as migration_20260329_235749 from './20260329_235749';
import * as migration_20260426_083522_publish_workflow_and_deploy_hook from './20260426_083522_publish_workflow_and_deploy_hook';
import * as migration_20260427_000000_backfill_article_versions from './20260427_000000_backfill_article_versions';
import * as migration_20260427_103000_articles_versions_autosave from './20260427_103000_articles_versions_autosave';

export const migrations = [
  {
    up: migration_20250929_111647.up,
    down: migration_20250929_111647.down,
    name: '20250929_111647',
  },
  {
    up: migration_20260329_235749.up,
    down: migration_20260329_235749.down,
    name: '20260329_235749',
  },
  {
    up: migration_20260426_083522_publish_workflow_and_deploy_hook.up,
    down: migration_20260426_083522_publish_workflow_and_deploy_hook.down,
    name: '20260426_083522_publish_workflow_and_deploy_hook'
  },
  {
    up: migration_20260427_000000_backfill_article_versions.up,
    down: migration_20260427_000000_backfill_article_versions.down,
    name: '20260427_000000_backfill_article_versions'
  },
  {
    up: migration_20260427_103000_articles_versions_autosave.up,
    down: migration_20260427_103000_articles_versions_autosave.down,
    name: '20260427_103000_articles_versions_autosave'
  },
];
