"use client";

// Note: The 'metadata' export has been removed as it only works in Server Components.
// The page title will be handled by the root layout's title template.

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

// Static data for form options
const categories = ["Singers", "Dancers", "Speakers", "DJs"];
const languages = ["English", "Hindi", "Marathi", "Gujarati", "Tamil", "Bengali"];
const feeRanges = ["< ₹20,000", "₹20,000 - ₹30,000", "> ₹30,000"];

// Define the validation schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  bio: yup.string().required("Bio is required"),
  categories: yup.array().min(1, "Select at least one category").required(),
  languages: yup.array().min(1, "Select at least one language").required(),
  rate: yup.string().required("Fee range is required"),
  location: yup.string().required("Location is required"),
  image: yup.string().url("Must be a valid URL").transform(value => value === '' ? undefined : value).notRequired(),
  availability: yup.string().transform(value => value === '' ? undefined : value).notRequired(),
});

// Define the TypeScript type for our form data
type FormData = yup.InferType<typeof schema>;

/**
 * The Artist Onboarding page, containing a multi-step form for artist submissions.
 * It uses React Hook Form for form state management and Yup for validation.
 */
export default function OnboardPage() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: { categories: [], languages: [] },
  });

  /**
   * Handles form submission.
   * Sends the validated data to our backend API route.
   * @param data The validated form data.
   */
  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/artists', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log("API Response:", result);
      setSubmitted(true);
      reset(); // Reset the form fields after successful submission

    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      // Here you could set an error state to show a message to the user
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 p-4">
      <div className="w-full max-w-xl">
        <Card>
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">Artist Onboarding</h1>
            {/* Show a success message after form submission */}
            {submitted && (
              <div className="mb-4 p-3 bg-green-100 text-green-700 rounded text-center">
                Submission successful! (Check console for data)
              </div>
            )}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Name Field */}
              <div>
                <label htmlFor="name" className="block font-medium mb-1">Name *</label>
                <input id="name" {...register("name")}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Artist Name" />
                {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name.message}</div>}
              </div>
              {/* Bio Field */}
              <div>
                <label htmlFor="bio" className="block font-medium mb-1">Bio *</label>
                <textarea id="bio" {...register("bio")}
                  className="w-full border rounded px-3 py-2"
                  placeholder="Short artist bio" rows={3} />
                {errors.bio && <div className="text-red-500 text-sm mt-1">{errors.bio.message}</div>}
              </div>
              {/* Category Checkboxes */}
              <div>
                <label className="block font-medium mb-1">Category *</label>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <label key={cat} htmlFor={`category-${cat}`} className="flex items-center gap-1">
                      <input type="checkbox" id={`category-${cat}`} value={cat} {...register("categories")}/>
                      <span>{cat}</span>
                    </label>
                  ))}
                </div>
                {errors.categories && <div className="text-red-500 text-sm mt-1">{errors.categories.message}</div>}
              </div>
              {/* Languages Checkboxes */}
              <div>
                <label className="block font-medium mb-1">Languages Spoken *</label>
                <div className="flex flex-wrap gap-3">
                  {languages.map((lang) => (
                    <label key={lang} htmlFor={`language-${lang}`} className="flex items-center gap-1">
                      <input type="checkbox" id={`language-${lang}`} value={lang} {...register("languages")}/>
                      <span>{lang}</span>
                    </label>
                  ))}
                </div>
                {errors.languages && <div className="text-red-500 text-sm mt-1">{errors.languages.message}</div>}
              </div>
              {/* Fee Range Dropdown */}
              <div>
                <label htmlFor="rate" className="block font-medium mb-1">Fee Range *</label>
                <select id="rate" {...register("rate")} className="w-full border rounded px-3 py-2">
                  <option value="">Select Fee Range</option>
                  {feeRanges.map(f => <option key={f}>{f}</option>)}
                </select>
                {errors.rate && <div className="text-red-500 text-sm mt-1">{errors.rate.message}</div>}
              </div>
              {/* Image URL Field */}
              <div>
                <label htmlFor="image" className="block font-medium mb-1">Profile Image URL (optional)</label>
                <input
                  id="image"
                  type="text"
                  placeholder="https://example.com/image.jpg"
                  {...register("image")}
                  className="w-full border rounded px-3 py-2"
                />
                {errors.image && <div className="text-red-500 text-sm mt-1">{errors.image.message}</div>}
              </div>
              {/* Availability Field */}
              <div>
                <label htmlFor="availability" className="block font-medium mb-1">Availability (optional)</label>
                <input
                  id="availability"
                  type="text"
                  placeholder="e.g., Available on weekends"
                  {...register("availability")}
                  className="w-full border rounded px-3 py-2"
                />
              </div>
              {/* Location Field */}
              <div>
                <label htmlFor="location" className="block font-medium mb-1">Location *</label>
                <input id="location" {...register("location")}
                  className="w-full border rounded px-3 py-2"
                  placeholder="City, Country" />
                {errors.location && <div className="text-red-500 text-sm mt-1">{errors.location.message}</div>}
              </div>
              <Button type="submit" className="w-full mt-2">Submit</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
} 