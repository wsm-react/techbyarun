
import { EnvApp } from '@/helpers/constants';
import ejs from 'ejs';
import path from 'path';


export const RenderMailTemplate = async (templateName: string, data: any): Promise<string> => {
    const templatePath = path.join(process.cwd(), 'src', 'templates', templateName);

    const DominUrl = EnvApp.SITE_URL?.endsWith('/') ? EnvApp.SITE_URL : `${EnvApp.SITE_URL}/`;
    const DominName = EnvApp.SITE_DOMIN ? EnvApp.SITE_DOMIN : EnvApp.SITE_DOMIN;

    const newData = { ...data, DominUrl, DominName };

    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, newData, {}, (err, str) => {
            if (err) {
                console.error('Error rendering EJS template:', err);
                reject(err);
            } else {
                resolve(str || '');
            }
        });
    });
};
