import {
  getAllBasicIds,
  getData,
  getSortedComponentsData,
  getSortedBasicsData,
} from "../../lib/posts";
import DetailsLayout from "../../components/docsLayout";
import ReactMarkdown from "react-markdown";
import { MarkdownComponents } from "../../components/markdownComponents";

export default function Post({ data, components, basics }) {
  return (
    <DetailsLayout components={components} basics={basics}>
      <h1>{data.title}</h1>
      <h3>{data.description}</h3>
      <ReactMarkdown components={MarkdownComponents}>
        {data.content}
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
  const data = await getData("basics", params.id, locale);
  const components = await getSortedComponentsData(locale);
  const basics = await getSortedBasicsData(locale);
  return {
    props: {
      data,
      components,
      basics,
    },
  };
}
