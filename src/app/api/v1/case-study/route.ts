import { NextRequest, NextResponse } from 'next/server';


export async function GET(_req: NextRequest) {
    const caseStudies = [
        { slug: 'getdownfitness', title: 'Get Down Fitness' },
        { slug: 'schoolinfotech', title: 'School Info Tech' },
        { slug: 'ux-design', title: 'UX Design' },
        { slug: 'visual-design', title: 'Visual Design' },
    ];

    return NextResponse.json({
        success: true,
        status: 200,
        data: caseStudies,
    }, { status: 200 });
}
