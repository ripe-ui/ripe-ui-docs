import {
  getAllPostIds,
  getPostData,
  getSortedPostsData,
  getSortedBasicsData,
} from "../../lib/posts";
import { Button } from "@ripe-ui/react";
import DetailsLayout from "../../components/docsLayout";

export default function Post({ postData, components, basics }) {
  return (
    <DetailsLayout components={components} basics={basics}>
      <h1>{postData.name}</h1>
      <h3>{postData.description}</h3>
      <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
    </DetailsLayout>
  );
}

export async function getStaticPaths() {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const postData = await getPostData("components", params.id);
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
