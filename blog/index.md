---
permalink: /blog
type: pages
---

# Blog

{% for post in site.posts %}

- [{{ post.title }}]({{ post.url }})

{% endfor %}
