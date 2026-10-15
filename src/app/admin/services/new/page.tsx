import ServiceForm from '@/components/admin/service-form';

export default function NewServicePage() {
    return (
        <div>
            <h1 className="text-2xl font-bold tracking-tight">New Service</h1>
            <p className="mt-1 text-sm text-muted-foreground">Create a new service page.</p>
            <div className="mt-8">
                <ServiceForm mode="create" />
            </div>
        </div>
    );
}
