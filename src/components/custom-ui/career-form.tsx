"use client"

import { AlertCircle, CircleCheckBig, Loader2, TriangleAlert } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from "@/components/ui/button"
import { CareerType, CareerFormSchema } from '@/validator/zod-schema'
import { ResultType } from '@/types/app-interface'
import { Textarea } from '../ui/textarea'
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select'


export function FormCareer() {
    const [result, setResult] = useState<ResultType | null>(null); // Declare result state
    const [error, setError] = useState<string | null>(null); // Declare error state
    const [loading, setLoading] = useState<boolean>(false); // State for loading
    const router = useRouter(); // Initialize useRouter


    const form = useForm<CareerType>({
        resolver: zodResolver(CareerFormSchema),
        defaultValues: {
            name: "",
            mobile: "",
            email: "",
            title: "",
            slug: "",
            company: "",
            joinImmediately: "",
            resume: "",
            portfolio: "",
            workType: "",
            bio: "",
            terms: true,
        },
        mode: 'onChange',
    });

    const { handleSubmit, control, formState: { isSubmitting, isValid, errors } } = form;

    const onSubmitForm = async (data: CareerType) => {
        setLoading(true); // Start loading
        try {
            // console.log('Form submitted:', data);

            const baseUrl = `${window.location.protocol}//${window.location.host}`;
            const apiUrl = `${baseUrl}/api/v1/career`;

            console.log('API URL:', apiUrl);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

            console.log("responseData", responseData);


            if (!response.ok) {
                // Handle non-OK responses
                setError(responseData.message || 'An unknown error occurred.');
                setResult(null); // Clear any previous results
                return;
            }

            // console.log('API response:', responseData);

            // Handle successful response
            if (responseData.status === 200) {
                // Redirect to a success page
                // console.log(responseData.email);

                // if (responseData.mailsent === true) {
                //     // router.push('/success');
                // } else {
                //     setError(responseData.mailresponse as string);
                // }

            } else {
                // Set the result to display if status is not 200
                setResult(responseData);
                setError(null); // Clear any previous errors
            }

            // setResult(responseData);

        } catch (err) {
            // Handle unexpected errors
            const errorMessage = (err as Error).message || 'There was an error submitting the form.';
            console.error('Submission error:', errorMessage);
            setError(errorMessage);
            setResult(null); // Clear any previous results
        } finally {
            setLoading(false); // Stop loading
        }
    };

    const StatusMessage = ({ status, icon: Icon, title, message }: { status: number, icon: React.ComponentType<any>, title: string, message: Record<string, any> }) => (
        <div className={`status-message-${status}`}>
            <Icon className="h-6 w-6" />
            <div>{title}</div>
            <ul>
                {Object.entries(message).map(([key, value]) => (
                    <li key={key}>
                        <strong>{key}:</strong> {String(value)}
                    </li>
                ))}
            </ul>
        </div>
    );


    const renderContentBasedOnStatus = () => {
        if (result) {
            const { status, message } = result;

            switch (status) {
                case 200:
                case 203:
                    return <StatusMessage status={status} icon={CircleCheckBig} title="Success" message={message} />;
                case 422:
                    return <StatusMessage status={status} icon={TriangleAlert} title="Sorry" message={message} />;
                case 201:
                    return <StatusMessage status={status} icon={TriangleAlert} title="Processing" message={message} />;
                default:
                    return null;
            }
        }
        return null;
    };


    return (
        <Form {...form}>
            {/* ref={formRef} */}
            <form autoComplete="off" onSubmit={handleSubmit(onSubmitForm)} className="w-1/1 md:w-2/3 md:space-y-7 space-y-5">
                <FormField control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='text' placeholder="Enter your name" {...field}
                                // onInput={handleInput}
                                />
                            </FormControl>
                            {errors.name && <FormMessage className='dark:text-red-300'>{errors.name.message}</FormMessage>}
                        </FormItem>
                    )} />
                <FormField control={form.control}
                    name="mobile"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Mobile Number</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='tel' maxLength={10} placeholder="9919XXXXXX" {...field}
                                />
                            </FormControl>
                            {errors.mobile && <FormMessage className='dark:text-red-300'>{errors.mobile.message}</FormMessage>}
                        </FormItem>
                    )} />
                <FormField control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='email' placeholder="me@example.org" {...field} />
                            </FormControl>
                            {errors.email && <FormMessage className='dark:text-red-300'>{errors.email.message}</FormMessage>}
                        </FormItem>
                    )} />
                <FormField control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='text' placeholder="Enter your company" {...field}
                                // onInput={handleInput}
                                />
                            </FormControl>
                            {errors.company && <FormMessage className='dark:text-red-300'>{errors.company.message}</FormMessage>}
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name="workType"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Work type</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='text' placeholder="Enter your workType" {...field}
                                // onInput={handleInput}
                                />
                            </FormControl>
                            {errors.workType && <FormMessage className='dark:text-red-300'>{errors.workType.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Experience</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a verified email to display" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.experience && <FormMessage className='dark:text-red-300'>{errors.experience.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="currentCTC"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Current CTC</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='number' placeholder="Enter your currentCTC"  {...field}
                                    value={field.value !== null ? field.value : ''} // Handle null value
                                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                                />
                            </FormControl>
                            {errors.currentCTC && <FormMessage className='dark:text-red-300'>{errors.currentCTC.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="expectedCTC"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Expected CTC</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='text' placeholder="Enter your expectedCTC" {...field}
                                    // onInput={handleInput}
                                    value={field.value !== null ? field.value : ''} // Handle null value
                                    onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                                />
                            </FormControl>
                            {errors.expectedCTC && <FormMessage className='dark:text-red-300'>{errors.expectedCTC.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="joinImmediately"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Join immediately</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='text' placeholder="Enter your joinImmediately" {...field}
                                // onInput={handleInput}
                                />
                            </FormControl>
                            {errors.joinImmediately && <FormMessage className='dark:text-red-300'>{errors.joinImmediately.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="bio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Bio</FormLabel>
                            <FormControl>
                                <Textarea autoComplete="off" className='h-14 px-6' placeholder="Enter your bio" {...field}
                                // onInput={handleInput}
                                />
                            </FormControl>
                            {errors.bio && <FormMessage className='dark:text-red-300'>{errors.bio.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="resume"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Upload resume</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type="file" placeholder="Enter your resume" {...field}
                                // onInput={handleInput}
                                />
                            </FormControl>
                            <FormDescription>
                                DOC, DOCX, PDF (2 MB)
                            </FormDescription>
                            {errors.resume && <FormMessage className='dark:text-red-300'>{errors.resume.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="portfolio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Portfolio Link</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='text' placeholder="as https://linkedin.com/in/yourid/" {...field}
                                // onInput={handleInput}
                                />
                            </FormControl>
                            {errors.portfolio && <FormMessage className='dark:text-red-300'>{errors.portfolio.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField control={form.control}
                    name="terms"
                    render={({ field }) => (
                        <FormItem>
                            <div className="terms">
                                <div className="flex flex-row items-start space-x-5 space-y-0">
                                    <FormControl {...field}>
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl >
                                    <div className="space-y-0 leading-none text-base">
                                        <FormLabel className='text-[.85rem]/[1rem] font-normal'>
                                            By subscribing you agree to receive communications from Clinch. You can unsubscribe anytime using the link in the footer of any of our emails. See our
                                            <Link target={'_blank'} href={'/privacy-policy'} className="text-blue-700 dark:text-blue-300" > privacy policy</Link>
                                        </FormLabel>
                                    </div>
                                </div>
                                {errors.terms && <FormMessage className='mt-5 dark:text-red-300'>{errors.terms.message}</FormMessage>}
                            </div>
                        </FormItem>
                    )} />
                {result && renderContentBasedOnStatus()}
                {/* Display error */}
                {error && (
                    <div className='mt-4 p-4 rounded-md border border-red-500 text-red-700 bg-red-50 dark:bg-red-900 dark:border-red-600 dark:text-red-400'>
                        <AlertCircle className="inline h-5 w-5 mr-2" />
                        <ul>
                            {Object.entries(error).map(([key, value]) => (
                                <li key={key}>
                                    <strong>{key}:</strong> {String(value)}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
                {/* disabled={!isValid || isSubmitting} */}
                <div className="pt-6 w-full">
                    <Button disabled={loading || !isValid} className='h-14 disabled:opacity-80  px-16 w-full sm:w-auto font-bold dark:text-white' type="submit" >  {loading ? (
                        <><Loader2 className="mr-2 h-7 w-7 animate-spin" /> Please wait ...</>
                    ) : (
                        'Continue'
                    )}</Button>
                </div>
            </form >
        </Form >
    )
}
