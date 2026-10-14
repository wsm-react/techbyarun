import 'dotenv/config';
import appDB from '../src/config/database';

type SeedAuthor = {
    email: string;
    name: string;
    password: string;
};

type SeedPost = {
    slug: string;
    title: string;
    subTitle: string;
    body: string;
    published: boolean;
    author: SeedAuthor;
};

const initialBlog: SeedPost[] = [
    {
        slug: 'this-is-normal-blog',
        title: 'This is blog title 1',
        subTitle: 'This is blog subtitle 1',
        body: 'This is blog body 1',
        published: true,
        author: {
            email: 'arun99178@gmail.com',
            name: 'Arun Kumar Gupta',
            password: 'password123',
        },
    },
    {
        slug: 'this-is-another-blog',
        title: 'This is blog title 2',
        subTitle: 'This is blog subtitle 2',
        body: 'This is blog body 2',
        published: true,
        author: {
            email: 'john@example.com',
            name: 'John Doe',
            password: 'securePassword',
        },
    },
    {
        slug: 'this-is-yet-another-blog',
        title: 'This is blog title 3',
        subTitle: 'This is blog subtitle 3',
        body: 'This is blog body 3',
        published: true,
        author: {
            email: 'alice@example.com',
            name: 'Alice Smith',
            password: 'password321',
        },
    },
];

async function upsertAuthor(author: SeedAuthor) {
    return appDB.orm.User.where({ email: author.email }).upsert({
        create: {
            email: author.email,
            name: author.name,
            password: author.password,
            mobile: null,
        },
        update: {},
    });
}

async function seedingPrismaData() {
    console.log('Start Seeding .... ');
    for (const post of initialBlog) {
        const author = await upsertAuthor(post.author);

        const newPost = await appDB.orm.BlogPost.create({
            slug: post.slug,
            title: post.title,
            sub_title: post.subTitle,
            body: post.body,
            published: post.published,
            author_id: author._id,
            created_at: new Date(),
            updated_at: new Date(),
        });

        console.log(`created post with id  ${newPost._id}, Post slug ${newPost.slug}`);
    }
    console.log('End Seeding .... ');
}

seedingPrismaData()
    .then(async () => {
        await appDB.close();
    })
    .catch(async (e) => {
        console.error(e);
        await appDB.close();
        process.exit(1);
    });
