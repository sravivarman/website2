# FixIt Theme Documentation Site

Hugo-based documentation site for the [FixIt](https://github.com/hugo-fixit/FixIt) theme.

## Architecture

- **Hugo SSG** (≥0.147.7 extended) with Hugo Modules for theme components
- Theme modules in `go.mod`: FixIt core + components (`shortcode-*`, `cmpt-*`)
- Content in `content/en/` → sections: `documentation/`, `guides/`, `contributing/`, `ecosystem/`
- Config split: `config/_default/` (shared), `config/development/`, `config/production/`
- **Local Development**: Uses `hugo.work` workspace for editing sibling theme repos in parallel

## Development Commands

```bash
pnpm install                    # Required first (Node.js ≥20.17)
pnpm run server                 # Dev server with drafts + hot reload + memory rendering
pnpm run server:production      # Test production build locally
pnpm run server:development     # Edit FixIt theme via hugo.work (requires sibling repos)
pnpm run lint:fix               # Auto-fix ESLint + autocorrect + markdownlint
pnpm run build                  # Production build: hugo --gc --minify
pnpm run update                 # Update Hugo modules
```

## Hugo Modules System

- **Multi-repo architecture**: Core theme + specialized component repos
- Local development uses `hugo.work` workspace to reference sibling directories
- Components: `component-projects`, `shortcode-*`, `cmpt-*` pattern
- Update modules with `pnpm run update`, not individual git operations

## Content Conventions

### Front Matter (required fields)
```yaml
title: Page Title
date: 2024-03-07T15:37:59+08:00
resources:
  - name: featured-image        # Required for cover images
    src: cover.webp
collections:
  - Getting Started             # Groups related articles in series
lightgallery: true              # Enable image zoom
```

### Shortcodes - Use FixIt shortcodes, NOT raw HTML

```markdown
{{< version 0.3.13 >}}          <!-- Mark when feature was added/changed -->

{{< admonition type=tip title="Title" open=true >}}
Content here.
{{< /admonition >}}
```

**Prefer GitHub Alerts** for cross-platform compatibility:
```markdown
> [!TIP]
> Portable callout syntax.
```

### Version Documentation
Always mark features with `{{< version X.Y.Z >}}` or `{{< version X.Y.Z changed >}}` when documenting new/changed functionality.

## File Structure

| Pattern | Example | Use |
|---------|---------|-----|
| Page bundle | `guides/pwa-support/index.md` | Article with local images |
| Section landing | `documentation/_index.md` | List page for section |
| Custom layouts | `layouts/_shortcodes/`, `layouts/_partials/custom/` | Site-specific overrides |
| Data files | `data/friends.yml`, `data/projects.en.yml` | Structured content (YAML) |

## Data-Driven Content

- **Project listings**: `data/projects.en.yml` drives ecosystem page with GitHub repo info
- **Structured data**: YAML for timelines, charts (`data/echarts/`), friends list
- **Shortcode integration**: Data files consumed by custom shortcodes (`{{< projects >}}`)
- **Multilingual**: Separate `.en.yml`/`.zh-cn.yml` files for i18n content

## Menu Configuration

Edit `config/_default/menus.en.toml` for navigation. Pattern:
```toml
[[main]]
identifier = "unique-id"
parent = "documentation"        # Optional: nest under parent
name = "Display Name"
url = "path/"
weight = 10                     # Sort order
[main.params]
icon = "fa-solid fa-icon"
```

## CSS Customization

- Override theme styles: `assets/css/_override.scss`
- Add custom styles: `assets/css/_custom.scss`
- Custom JS: `assets/js/custom.js`

## Linting & Quality

- **ESLint**: `@antfu/eslint-config` with minimal overrides in `eslint.config.mjs`
- **Markdown**: `markdownlint-cli2` + `autocorrect-node` for CJK typography
- **Pre-commit**: `simple-git-hooks` + `lint-staged` auto-runs linters
- **Commands**: `pnpm run lint` (check), `pnpm run lint:fix` (fix), enforced via git hooks

## Deployment

- GitHub Actions → GitHub Pages (`.github/workflows/hugo.yml`)
- Build: `hugo --gc --minify`

## Key Integrations

- **Algolia Search**: `atomic-algolia` for search index updates
- **GitHub API**: Component repos auto-fetch GitHub stats (stars, forks)
- **Chart.js/ECharts**: Data visualization via `data/echarts/` JSON files
- **Multi-language**: English primary, with missing translation markers for incomplete i18n
