async function getConfigs() {
    const response = await fetch('/configs.json');
    if (!response.ok) {
        throw new Error('Failed to fetch configs');
    }
    return await response.json();
}

async function getConfigValueByKey(key) {
    const configs = await getConfigs();
    return getValueByKey(configs.data, key);
}

export async function getValueByKey(array, key, keyName = 'key') {
    return array.find(item => item[keyName] === key)?.value;
}

export function getFormattedDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
}

export async function loadArticles() {
    const configKeyName = isAuthorMode ? 'author-graphql-endpoint' : 'publish-graphql-endpoint';
    const graphqlEndpoint = await getConfigValueByKey(configKeyName);
    const timestamp = Date.now();
    const response = await fetch(`${graphqlEndpoint}/articles-all?timestamp=${timestamp}`);
    if (!response.ok) {
        throw new Error('Failed to fetch articles');
    }
    const result = await response.json();
    return result.data.articleList.items
}

export async function transformImageSrc(imageSrc) {
    const siteName = await getConfigValueByKey('site-name');
    imageSrc = imageSrc.replace(`/content/dam/${siteName}`, '');
    return imageSrc.replace('width=750&format=jpeg&optimize=medium', 'format=webp&optimize=high');
}

export const isAuthorMode = window.location.href.includes('.html');