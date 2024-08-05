import { appDB } from '@/lib/database';


export const connectToDatabase = async () => {
    try {
        await appDB.$connect()
            .then(data => {
                console.log(data);
                console.log('Prisma client connected successfully')
            })
            .catch((error) => { console.error('Failed to connect to Prisma client:', error) });

    } catch (error: any) {
        console.log(error);
        throw new Error(error.message || "Unable to connect to database");
    }
}
