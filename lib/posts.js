import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

const componentsDirectory = "docs/components";
const basicsDirectory = "docs/basics";
const docsDirectory = "docs";

function getDir(locale, dir) {
  if (locale && locale != "en")
    return path.join(process.cwd(), `lang/${locale}/${dir}`);

  return path.join(process.cwd(), dir);
}

export function getSortedComponentsData(locale) {
  var componentsDir = getDir(locale, componentsDirectory);
  const fileNames = fs.readdirSync(componentsDir);
  const allComponentsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    // Read markdown file as string
    const fullPath = path.join(componentsDir, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  return allComponentsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getSortedBasicsData(locale) {
  var basicsDir = getDir(locale, basicsDirectory);

  const fileNames = fs.readdirSync(basicsDir);
  const allBasicsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(basicsDir, fileName);

    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);

    // Combine the data with the id
    return {
      id,
      ...matterResult.data,
    };
  });
  return allBasicsData.sort((a, b) => {
    if (a.order < b.order) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllComponentIds(locale) {
  const fileNames = fs.readdirSync(getDir(locale, componentsDirectory));
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getAllBasicIds(locale) {
  const fileNames = fs.readdirSync(getDir(locale, basicsDirectory));
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export async function getData(directory, id, locale) {
  let fileContents = "";

  const fullPath = path.join(
    getDir(locale, docsDirectory),
    `/${directory}/${id}.md`
  );

  console.log(fullPath);

  try {
    fileContents = fs.readFileSync(fullPath, "utf8");
  } catch {
    if (locale) {
      const fullPath = path.join(docsDirectory, `/${directory}/${id}.md`);
      fileContents = fs.readFileSync(fullPath, "utf8");
    }
  }

  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkParse)
    .use(remarkRehype, { allowDangerousHtml: true }) // Pass raw HTML strings through.
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    id,
    contentHtml,
    content: matterResult.content,
    ...matterResult.data,
  };
}
