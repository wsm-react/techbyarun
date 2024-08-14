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
import { ErrorType, ResultType } from '@/types/app-interface'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Textarea } from '@/components/ui/textarea'


export function FormCareer() {
    const [result, setResult] = useState<ErrorType | null>(null); // Declare result state
    const [error, setError] = useState<ErrorType | string | null | undefined>(null); // Declare error state
    const [loading, setLoading] = useState<boolean>(false); // State for loading
    const router = useRouter(); // Initialize useRouter


    const form = useForm<CareerType>({
        resolver: zodResolver(CareerFormSchema),
        defaultValues: {
            name: "",
            phone: "",
            email: "",
            title: "",
            slug: "",
            company: "",
            experience: "",
            // @ts-ignore
            currentCTC: "",
            // @ts-ignore
            expectedCTC: "",
            noticePeriod: "",
            resume: "",
            portfolio: "",
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

            // console.log('API URL:', apiUrl);
            console.log("sent data", JSON.stringify(data));


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
                setResult(responseData);
                setError(null);
            } else {
                // Set the result to display if status is not 200
                setResult(responseData);
                // setError(null); // Clear any previous errors
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

    const StatusMessage = ({ status, icon: Icon, title, message }: {
        status: number;
        icon: React.ComponentType<any>;
        title: string;
        message: Record<string, any> | string;
    }) => (
        <div className={`status-message-${status}`}>
            <Icon className="h-6 w-6" />
            <div>{title}</div>
            {typeof message === 'string' ? (
                <p>{message}</p>
            ) : (
                <ul>
                    {Object.entries(message).map(([key, value]) => (
                        <li key={key}>
                            <strong>{key}:</strong> {String(value)}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );


    const renderContentBasedOnStatus = (result: ErrorType) => {
        if (result) {
            if (typeof result === 'string') {
                // Handle the case where result is a string
                return <StatusMessage status={0} icon={TriangleAlert} title="Error" message={result} />;
            }

            // Now TypeScript knows result is of type ResultType
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
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='email' placeholder="Your answer" {...field} />
                            </FormControl>
                            {errors.email && <FormMessage className='dark:text-red-300'>{errors.email.message}</FormMessage>}
                        </FormItem>
                    )} />
                <FormField control={form.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Phone Number</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='tel' maxLength={10} placeholder="9919XXXXXX" {...field}
                                />
                            </FormControl>
                            {errors.phone && <FormMessage className='dark:text-red-300'>{errors.phone.message}</FormMessage>}
                        </FormItem>
                    )} />

                <FormField control={form.control}
                    name="company"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='text' placeholder="Your answer" {...field}
                                // onInput={handleInput}
                                />
                            </FormControl>
                            {errors.company && <FormMessage className='dark:text-red-300'>{errors.company.message}</FormMessage>}
                        </FormItem>
                    )} />
                <FormField
                    control={form.control}
                    name="experience"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>How many years of relevant work experience do you have?</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='text' placeholder="Your answer"
                                    {...field}
                                    value={field.value !== null ? field.value : ''} // Handle null value
                                    onChange={(e) => field.onChange(e.target.value.toString() ? e.target.value.toString() : '')}
                                // onInput={handleInput}
                                />
                            </FormControl>
                            {errors.experience && <FormMessage className='dark:text-red-300'>{errors.experience.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="noticePeriod"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notice Period </FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='text' placeholder="Your answer" {...field}
                                // onInput={handleInput}
                                />
                            </FormControl>
                            {errors.noticePeriod && <FormMessage className='dark:text-red-300'>{errors.noticePeriod.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="currentCTC"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your current annual salary? (in CTC)</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='text' placeholder="Example if 5LPA mention 500000"
                                    {...field}
                                // value={field.value !== null ? field.value : ''} // Handle null value
                                // onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
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
                            <FormLabel>What is your desired annual salary? (in CTC)</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='text' placeholder="Example if 5LPA mention 500000"
                                    {...field}
                                // value={field.value !== null ? field.value : ''} // Handle null value
                                // onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                                // onInput={handleInput}
                                />
                            </FormControl>
                            {errors.expectedCTC && <FormMessage className='dark:text-red-300'>{errors.expectedCTC.message}</FormMessage>}
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
                                <Textarea autoComplete="off" className='h-14 px-6' placeholder="Your answer" {...field}
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
                            <FormLabel>Resume (In PDF only max size 2 MB)</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type="file" placeholder="Upload 1 supported file: PDF. Max 2 MB." {...field}
                                // onInput={handleInput}
                                />
                            </FormControl>
                            {errors.resume && <FormMessage className='dark:text-red-300'>{errors.resume.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="portfolio"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Your Portfolio profile link</FormLabel>
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
                {result && renderContentBasedOnStatus(result)}

                {error && (
                    typeof error === 'string' ? (
                        <p>{error}</p>
                    ) : (
                        <div className='mt-4 p-4 rounded-md border border-red-500 text-red-700 bg-red-50 dark:bg-red-900 dark:border-red-600 dark:text-red-400'>
                            <AlertCircle className="inline h-5 w-5 mr-2" />
                            {typeof error.message === 'string' ? (
                                <p>{error.message}</p>
                            ) : (
                                <ul>
                                    {Object.entries(error).map(([key, value]) => (
                                        <li key={key}>
                                            <strong>{key}:</strong> {String(value)}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )
                )}

                {/* disabled={!isValid || isSubmitting} */}
                <div className="pt-6 w-full">
                    {/* disabled={loading || !isValid}  */}
                    <Button className='h-14 disabled:opacity-80  px-16 w-full sm:w-auto font-bold dark:text-white' type="submit" >  {loading ? (
                        <><Loader2 className="mr-2 h-7 w-7 animate-spin" /> Please wait ...</>
                    ) : (
                        'Continue'
                    )}</Button>
                </div>
            </form >
        </Form >
    )
}
