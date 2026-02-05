import { Client } from '@notionhq/client';
import { env } from '../config/env';

interface NotionPage {
    id: string;
    title: string;
    url: string;
    content: string;
}

export class NotionService {
    private notion: Client;

    constructor() {
        this.notion = new Client({
            auth: env.NOTION_API_KEY,
        });
    }

    async searchNotion(query: string): Promise<NotionPage[]> {
        try {
            const response = await this.notion.search({
                query: query,
                sort: {
                    direction: 'descending',
                    timestamp: 'last_edited_time',
                },
                page_size: 3, // Top 3 resultados
                filter: {
                    value: 'page',
                    property: 'object',
                },
            });

            const pages: NotionPage[] = [];

            for (const result of response.results) {
                if ('properties' in result) {
                    // Tenta extrair o título de forma segura (Notion API é complexa com tipos)
                    let title = 'Sem título';
                    const properties = result.properties as any;

                    // Busca a propriedade que é do tipo 'title'
                    const titlePropKey = Object.keys(properties).find(key => properties[key].type === 'title');

                    if (titlePropKey && properties[titlePropKey].title.length > 0) {
                        title = properties[titlePropKey].title.map((t: any) => t.plain_text).join('');
                    }

                    const content = await this.getPageContent(result.id);

                    pages.push({
                        id: result.id,
                        title: title,
                        url: (result as any).url,
                        content: content,
                    });
                }
            }

            return pages;

        } catch (error) {
            console.error('Erro ao buscar no Notion:', error);
            return [];
        }
    }

    private async getPageContent(pageId: string): Promise<string> {
        try {
            const blocks = await this.notion.blocks.children.list({
                block_id: pageId,
                page_size: 50, // Limite seguro de blocos para ler
            });

            let content = '';

            for (const block of blocks.results) {
                if ('type' in block) {
                    const type = block.type as keyof typeof block;
                    // @ts-ignore - TS reclama de acesso dinâmico complexo no SDK do Notion
                    const blockData = block[type] as any;

                    if (blockData && blockData.rich_text) {
                        const text = blockData.rich_text.map((t: any) => t.plain_text).join('');
                        if (text) content += text + '\n';
                    }
                }
            }
            return content;
        } catch (error) {
            console.error(`Erro ao ler conteúdo da página ${pageId}:`, error);
            return '';
        }
    }
}

export const notionService = new NotionService();
