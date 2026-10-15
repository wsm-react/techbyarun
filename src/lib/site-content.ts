import prisma from '@/config/database';

// Safe read helpers — public pages render gracefully even if the database is unreachable
// (changing content never requires a code change; everything below is admin-managed).

export async function getSettings(): Promise<Record<string, unknown>> {
  try {
    const rows = await prisma.siteSetting.findMany();
    return Object.fromEntries(rows.map((row) => [row.key, row.value]));
  } catch (error) {
    console.error('getSettings failed:', error);
    return {};
  }
}

export async function getPublishedServices() {
  try {
    return await prisma.service.findMany({
      where: { published: true },
      orderBy: { sortOrder: 'asc' },
    });
  } catch (error) {
    console.error('getPublishedServices failed:', error);
    return [];
  }
}

export async function getServiceBySlug(slug: string) {
  try {
    return await prisma.service.findFirst({ where: { slug, published: true } });
  } catch (error) {
    console.error('getServiceBySlug failed:', error);
    return null;
  }
}

export async function getPublishedCaseStudies() {
  try {
    return await prisma.caseStudy.findMany({
      where: { published: true },
      orderBy: { sortOrder: 'asc' },
    });
  } catch (error) {
    console.error('getPublishedCaseStudies failed:', error);
    return [];
  }
}

export async function getCaseStudyBySlug(slug: string) {
  try {
    return await prisma.caseStudy.findFirst({ where: { slug, published: true } });
  } catch (error) {
    console.error('getCaseStudyBySlug failed:', error);
    return null;
  }
}

export async function getPublishedPosts() {
  try {
    return await prisma.blogPost.findMany({
      where: { published: true },
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { id: true, name: true } } },
    });
  } catch (error) {
    console.error('getPublishedPosts failed:', error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await prisma.blogPost.findFirst({
      where: { slug, published: true },
      include: { author: { select: { id: true, name: true } } },
    });
  } catch (error) {
    console.error('getPostBySlug failed:', error);
    return null;
  }
}
