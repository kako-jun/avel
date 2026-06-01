# avel

A minimal, no-JS [Zola](https://www.getzola.org/) theme. Inspired by [Abe Hiroshi's homepage](http://www.abesan.jp/).

- Zero JavaScript
- Zero external resources by default
- Pure HTML + inline CSS
- Fully customizable via `config.toml` — no HTML/CSS editing needed

## Demo

[avel.llll-ll.com](https://avel.llll-ll.com)

## Installation

```bash
cd your-zola-site
git submodule add https://github.com/kako-jun/avel themes/avel
```

Set in `config.toml`:

```toml
theme = "avel"
```

## Configuration

All style options are controlled via `[extra]` in `config.toml`. Copy and uncomment what you need:

```toml
[extra]
# --- Profile ---
# name = "Your Name"
# profile_image = "me.webp"       # place in static/

# --- Background ---
# background_image = "bg.webp"    # place in static/
# body_bg = "#ffffff"

# --- Layout ---
# nav_width = "18%"               # default: 18%
# nav_bg = "#f0f0ff"
# nav_bullet = "●"               # default: none
# main_padding = "1em"
# max_width = "960px"
# content_align = "left"         # left / center / justify
# line_height = "1.8"

# --- Font ---
# font = "serif"                  # serif / sans-serif / monospace
# font_family = "Georgia"         # system fonts only = no external requests
# google_fonts_url = "https://fonts.googleapis.com/css2?family=Noto+Serif+JP&display=swap"
# font_size = "16px"

# --- Colors ---
# link_color = "#0000cc"
# link_visited = "#551a8b"

# --- Date ---
# date_format = "%Y-%m-%d"        # e.g. "%Y年%m月%d日"

# --- Posts heading ---
# index_heading = "Posts"         # default: "Posts"

# --- Footer ---
# footer = "© Your Name"

# --- OGP ---
# og_image = "og.webp"            # place in static/

# --- Navigation ---
# nav = [
#   { label = "Home", url = "/" },
#   { label = "Posts", url = "/posts/" },
# ]
```

## Content structure

```
content/
  _index.md         # top page
  posts/
    _index.md       # posts section (sort_by = "date")
    hello.md        # a post
```

## Theme gallery

This theme is listed on [getzola.org/themes](https://www.getzola.org/themes/).
GitHub topic: [`zola-theme`](https://github.com/topics/zola-theme)

## License

MIT
