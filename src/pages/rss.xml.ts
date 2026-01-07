import { loadRenderers } from "astro:container";
import { getCollection, render } from "astro:content";
import { getContainerRenderer as mdxContainerRenderer } from "@astrojs/mdx";
import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import sanitize from "sanitize-html";
import { mdxComponents } from "@/mdx-components";
import { m } from "@/paraglide/messages";

export const prerender = true;

export const GET = async (context: APIContext) => {
	const renderers = await loadRenderers([mdxContainerRenderer()]);
	const container = await AstroContainer.create({ renderers });
	const posts = await getCollection("posts");

	const items = await Promise.all(
		posts.map(async (post) => {
			const { Content } = await render(post);
			const html = await container.renderToString(Content, {
				props: {
					component: mdxComponents,
				},
			});

			return {
				link: `/blog/${post.id}/`,
				content: sanitize(html, {
					allowedTags: sanitize.defaults.allowedTags.concat(["img"]),
				}),
				...post.data,
			};
		}),
	);

	return rss({
		title: m.page_blog_metadata_title(),
		description: m.page_blog_metadata_description(),
		site: context.site!,
		items: items,
	});
};
