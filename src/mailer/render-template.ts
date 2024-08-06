
import ejs from 'ejs';
import path from 'path';


export const RenderMailTemplate = async (templateName: string, data: any): Promise<string> => {
    const templatePath = path.join(process.cwd(), 'src', 'templates', templateName);

    const dominurl = process.env.SITE_URL?.endsWith('/') ? process.env.SITE_URL : `${process.env.SITE_URL}/`;
    const dominname = process.env.SITE_DOMIN ? process.env.SITE_DOMIN : process.env.SITE_DOMIN;

    const newData = { ...data, dominurl, dominname };

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
