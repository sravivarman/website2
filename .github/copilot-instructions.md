# FixIt Theme Documentation Site

Hugo-based documentation site for the [FixIt](https://github.com/hugo-fixit/FixIt) theme, deployed at [fixit.lruihao.cn](https://fixit.lruihao.cn/).

## Architecture

- **Hugo SSG** (≥0.147.7 extended) with [Hugo Modules](config/_default/module.toml) for theme components
- Theme modules imported via `go.mod`: FixIt core + component shortcodes (`shortcode-*`, `cmpt-*`)
- Content in `content/en/` organized into sections: `documentation/`, `guides/`, `contributing/`, `ecosystem/`
- Multi-config split across `config/_default/`, `config/development/`, `config/production/`

## Development Commands

```bash
pnpm install           # Install dependencies first
pnpm run server        # Local dev server with drafts, hot reload
pnpm run server:production  # Test production environment locally
pnpm run server:development # Use local sibling theme repos via hugo.work
pnpm run lint          # Run ESLint + autocorrect + markdownlint
pnpm run lint:fix      # Auto-fix linting issues
pnpm run update        # Update Hugo modules
```

For editing the FixIt theme alongside docs, clone `FixIt` as sibling and use `pnpm run server:development`.

## Content Conventions

### Front Matter
Standard Hugo front matter with FixIt-specific fields. Key patterns in [content/en/documentation/](content/en/documentation/):
- `collections`: Groups related articles (e.g., "Markdown Syntax", "Extended Shortcodes")
- `resources`: Define featured images with `name: featured-image`
- `lightgallery: true`: Enable image zoom on page

### Shortcodes
Use FixIt extended shortcodes, not raw HTML. Common patterns:

```markdown
{{< admonition type=tip title="Title" open=true >}}
Content with **markdown** support.
{{< /admonition >}}

{{< link "url" "text" "title" true "fa-solid fa-icon" >}}

{{< version 0.3.13 >}}  <!-- Mark feature versions -->
```

Prefer [GitHub Alerts syntax](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax#alerts) for cross-platform compatibility:
```markdown
> [!TIP]
> Use this for tips.
```

## File Structure Patterns

- **Page bundles**: `section/page-name/index.md` with resources in same folder
- **Section pages**: `_index.md` for section landing pages
- **Custom layouts**: `layouts/_shortcodes/` and `layouts/_partials/custom/`
- **Data files**: YAML in `data/` for structured content (projects, friends, timeline)

## Linting & Style

- ESLint via `@antfu/eslint-config` for JS
- Markdownlint + autocorrect for content (pre-commit hook via simple-git-hooks)

## Deployment

- GitHub Actions → GitHub Pages ([.github/workflows/hugo.yml](.github/workflows/hugo.yml))
- Also deployed to Vercel (production at fixit.lruihao.cn)
- Build command: `hugo --gc --minify`
