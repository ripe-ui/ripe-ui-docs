import {
  getAllBasicIds,
  getPostData,
  getSortedPostsData,
  getSortedBasicsData,
} from "../../lib/posts";
import DetailsLayout from "../../components/docsLayout";
import ReactMarkdown from "react-markdown";
import { MarkdownComponents } from "../../components/markdownComponents";

export default function Post({ postData, components, basics }) {
  return (
    <DetailsLayout components={components} basics={basics}>
      <h1>{postData.title}</h1>
      <h3>{postData.description}</h3>
      <ReactMarkdown components={MarkdownComponents}>
        {postData.content}
      </ReactMarkdown>
    </DetailsLayout>
  );
}

export async function getStaticPaths({ locales }) {
  const paths = getAllBasicIds();
  var localePaths = paths
    .map((post) =>
      locales.map((locale) => ({
        params: { id: post.params.id },
        locale,
      }))
    )
    .flat();

  return { paths: localePaths, fallback: false };
}

export async function getStaticProps({ params, locale }) {
  const postData = await getPostData("basics", params.id, locale);
  const components = await getSortedPostsData();
  const basics = await getSortedBasicsData();
  return {
    props: {
      postData,
      components,
      basics,
    },
  };
}
