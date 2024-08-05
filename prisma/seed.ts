import { Prisma, PrismaClient } from '@prisma/client'
const appDB = new PrismaClient()

const initialBlog: Prisma.BlogPostCreateInput[] = [
    {
        slug: 'this-is-normal-blog',
        title: 'This is blog title 1',
        subTitle: 'This is blog subtitle 1',
        body: 'This is blog body 1',
        published: true,
        author: {
            connectOrCreate: {
                where: {
                    email: "arun99178@gmail.com"
                },
                create: {
                    email: 'arun99178@gmail.com',
                    name: 'Arun Kumar Gupta',
                    password: 'password123',
                }
            }
        }
    },
    {
        slug: 'this-is-another-blog',
        title: 'This is blog title 2',
        subTitle: 'This is blog subtitle 2',
        body: 'This is blog body 2',
        published: true,
        author: {
            connectOrCreate: {
                where: {
                    email: "john@example.com"
                },
                create: {
                    email: 'john@example.com',
                    name: 'John Doe',
                    password: 'securePassword',
                }
            }
        }
    },
    {
        slug: 'this-is-yet-another-blog',
        title: 'This is blog title 3',
        subTitle: 'This is blog subtitle 3',
        body: 'This is blog body 3',
        published: true,
        author: {
            connectOrCreate: {
                where: {
                    email: "alice@example.com"
                },
                create: {
                    email: 'alice@example.com',
                    name: 'Alice Smith',
                    password: 'password321',
                }
            }
        }
    },
];

async function seedingPrismaData() {
    console.log("Start Seeding .... ");
    for (const posts of initialBlog) {
        const newPost = await appDB.blogPost.create({ data: posts });
        // console.log(newPost);
        console.log(`created post with id  ${newPost.id}, Post slug ${newPost.slug}`);
    }
    console.log("End Seeding .... ");
}

seedingPrismaData().then(async () => {
    await appDB.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await appDB.$disconnect()
    process.exit(1)
})
