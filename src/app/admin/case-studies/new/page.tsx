import CaseStudyForm from '@/components/admin/case-study-form';

export default function NewCaseStudyPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight">New Case Study</h1>
            <p className="mt-1 text-sm text-muted-foreground">Create a new case study page.</p>
            <div className="mt-8">
                <CaseStudyForm mode="create" />
            </div>
        </div>
    );
}
