"use client"

import { AlertCircle, CircleCheckBig, Loader2, TriangleAlert } from 'lucide-react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useState } from 'react'

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from "@/components/ui/button"
import { CareerType, CareerFormSchema } from '@/validator/zod-schema'

// import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
// import { CareerType, CareerFormSchema } from '@/_lib/form-schema/validate-schema'


export function FormCareer() {
    const [result, setResult] = useState<Record<string, any> | null>(null); // Declare result state
    const [error, setError] = useState<string | null>(null); // Declare error state
    const [loading, setLoading] = useState<boolean>(false); // State for loading
    const router = useRouter(); // Initialize useRouter


    const form = useForm<CareerType>({
        resolver: zodResolver(CareerFormSchema),
        defaultValues: {
            name: "",
            mobile: "",
            email: "",
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
            const apiUrl = `${baseUrl}/api/v1/leads`;

            // console.log('API URL:', apiUrl);

            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const responseData = await response.json();

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

                if (responseData.mailsent === true) {
                    router.push('/success');
                } else {
                    setError(responseData.mailresponse as string);
                }

            } else {
                // Set the result to display if status is not 200
                setResult(responseData);
                setError(null); // Clear any previous errors
            }

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


    const renderContentBasedOnStatus = () => {
        if (result) {
            const { status, name, message } = result;

            switch (status) {
                case 200:
                    return (
                        <div className='text-green-600 border-green-500'>
                            <CircleCheckBig className="h-6 w-6 text-green-600" />
                            <div>Success</div>
                            <div>
                                Hi {name}, {message}
                            </div>
                        </div>
                    );
                case 203:
                    return (
                        <div className='text-green-600 border-green-500'>
                            <CircleCheckBig className="h-6 w-6 text-green-600" />
                            <div>Success</div>
                            <div>
                                Hi {name}, {message}
                            </div>
                        </div>
                    );
                case 201:
                    return (
                        <div className='dark:text-red-400 dark:border-red-400'>
                            <TriangleAlert className="h-6 w-6 dark:text-red-400" />
                            <div className='dark:text-red-400'>Sorry</div>
                            <div>
                                Hi {name}, {message}
                            </div>
                        </div>
                    );
                default:
                    return;
            }
        }

        return null;
    };


    return (
        <Form {...form}>
            {/* ref={formRef} */}
            <form autoComplete="off" onSubmit={handleSubmit(onSubmitForm)} className="w-1/1 md:w-2/3 md:space-y-7 space-y-5">
                <FormField
                    control={form.control}
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
                    )}
                />
                <FormField
                    control={form.control}
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
                    )}
                />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Email address</FormLabel>
                            <FormControl>
                                <Input autoComplete="off" className='h-14 px-6' type='email' placeholder="me@example.org" {...field} />
                            </FormControl>
                            {errors.email && <FormMessage className='dark:text-red-300'>{errors.email.message}</FormMessage>}
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
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
                    )}
                />
                {result && renderContentBasedOnStatus()}
                {/* Display error */}
                {error && (
                    <div className='dark:text-red-300'>
                        <AlertCircle className="h-4 w-4" />
                        <div>Error</div>
                        <div>
                            {error}
                        </div>
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
