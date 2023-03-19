const dotenv = require("dotenv");
const path = require("node:path");
const fs = require("fs");
const matter = require("gray-matter");
const algoliasearch = require("algoliasearch/lite");

try {
  dotenv.config();

  if (!process.env.NEXT_PUBLIC_ALGOLIA_APP_ID) {
    throw new Error("NEXT_PUBLIC_ALGOLIA_APP_ID is not defined");
  }

  if (!process.env.ALGOLIA_SEARCH_ADMIN_KEY) {
    throw new Error("ALGOLIA_SEARCH_ADMIN_KEY is not defined");
  }
} catch (error) {
  console.error(error);
  process.exit(1);
}

// imports and try/catch loop here

const COMPONENTS_PATH = path.join(process.cwd(), "docs/components");
const componentsFilePaths = fs
  .readdirSync(COMPONENTS_PATH)
  // Only include md(x) files
  .filter((path) => /\.md?$/.test(path));

const BASICS_PATH = path.join(process.cwd(), "docs/basics");
const basicsFilePaths = fs
  .readdirSync(BASICS_PATH)
  // Only include md(x) files
  .filter((path) => /\.md?$/.test(path));

async function getContent(filePaths, pathName) {
  const articles = filePaths.map((filePath) => {
    const source = fs.readFileSync(path.join(pathName, filePath));
    const { content, data } = matter(source);

    return {
      content, // this is the .mdx content
      data, // this is the frontmatter
      filePath, // this is the file path
    };
  });

  return articles;
}

function transformPostsToSearchObjects(articles, type) {
  const transformed = articles.map((article) => {
    return {
      objectID: type == "component" ? article.data.name : article.data.title,
      title: type == "component" ? article.data.name : article.data.title,
      description: article.data.description,
      path: `/${type}s/${path.parse(article.filePath).name}`,
      type: type,
    };
  });

  return transformed;
}

(async function () {
  // initialize environment variables
  dotenv.config();

  try {
    const components = await getContent(componentsFilePaths, COMPONENTS_PATH);
    const basics = await getContent(basicsFilePaths, BASICS_PATH);

    const transformedComponents = transformPostsToSearchObjects(
      components,
      "component"
    );
    const transformedBasics = transformPostsToSearchObjects(basics, "basic");

    const indexObjects = transformedComponents.concat(transformedBasics);

    // initialize the client with your environment variables
    const client = algoliasearch(
      process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
      process.env.ALGOLIA_SEARCH_ADMIN_KEY
    );

    // initialize the index with your index name
    const index = client.initIndex("ripe_ui");

    // add the data to the index
    const algoliaResponse = await index.saveObjects(indexObjects);

    console.log(
      `Successfully added ${
        algoliaResponse.objectIDs.length
      } records to Algolia search! Object IDs:\n${algoliaResponse.objectIDs.join(
        "\n"
      )}`
    );
  } catch (err) {
    console.error(err);
  }
})();
