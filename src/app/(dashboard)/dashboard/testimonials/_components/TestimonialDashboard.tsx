// app/dashboard/testimonials/testimonial-dashboard.tsx
"use client";

import { useState } from "react";
import { Search, MoreHorizontal, Star, StarHalf } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

import PaginationComponent from "@/components/Shared/Pagination";
import { useTestimonials } from "@/Tanstack/Testimonials/useTestimonials";
import Image from "next/image";
import TestimonialDashboardSkeleton from "./TestimonialDashboardSkeleton";
import { EditTestimonialDialog } from "./EditTestimonialDialog";
import { DeleteTestimonialDialog } from "./DeleteTestimonialDialog";
import { ITestimonial } from "@/app/api/_models/testimonialModel";



type Testimonial = ITestimonial;

export default function TestimonialDashboard() {
    // State management
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);

    // Pagination settings
    const itemsPerPage = 10;

    // Data fetching
    const { data: testimonialsData, isLoading, refetch } = useTestimonials({
        search: searchQuery,
        page: currentPage,
        limit: itemsPerPage,
        projectData: true,
    });

    console.log(testimonialsData, "testimonialsData");

    const testimonials: ITestimonial[] = (testimonialsData?.testimonials || []) as unknown as ITestimonial[];
    const totalPages = testimonialsData?.pagination?.pages || 1;

    // Render star rating
    const renderStars = (rating: number) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        }

        if (hasHalfStar) {
            stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
        }

        const emptyStars = 5 - stars.length;
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-gray-300" />);
        }

        return <div className="flex items-center gap-0.5">{stars}</div>;
    };

    // Loading state
    if (isLoading) {
        return <TestimonialDashboardSkeleton />;
    }




    return (
        <div className="space-y-6">
            {/* Header and Search section */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold">Testimonials</h1>
                    <p className="text-sm text-gray-500">Manage client testimonials and reviews</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                        <Input
                            placeholder="Search testimonials..."
                            className="pl-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Testimonials Table */}
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[200px]">Person</TableHead>
                            <TableHead>Testimonial</TableHead>
                            <TableHead className="w-[120px]">Rating</TableHead>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead className="text-right w-[50px]">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {testimonials.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                                    No testimonials found
                                </TableCell>
                            </TableRow>
                        ) : (
                            testimonials.map((testimonial) => (
                                <TableRow key={testimonial._id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            {testimonial.imgDisplayURL && (
                                                <div className="relative h-10 w-10 rounded-full overflow-hidden">
                                                    <Image
                                                        src={testimonial.imgDisplayURL}
                                                        alt={testimonial.name}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                </div>
                                            )}
                                            <div>
                                                <div className="font-medium">{testimonial.name}</div>
                                                <div className="text-sm text-gray-500">
                                                    {testimonial.position && `${testimonial.position}, `}
                                                    {testimonial.company}
                                                </div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="line-clamp-2 text-sm">
                                            {testimonial.testimonial}
                                        </div>
                                    </TableCell>
                                   
                                    <TableCell>
                                        {renderStars(testimonial.starCount)}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex  gap-1">
                                            <Badge
                                                variant={testimonial.isFeatured ? "default" : "outline"}
                                                className="w-fit"
                                            >
                                                {testimonial.isFeatured ? "Featured" : "Regular"}
                                            </Badge>
                                            <Badge
                                                variant={testimonial.isActive ? "default" : "secondary"}
                                                className="w-fit"
                                            >
                                                {testimonial.isActive ? "Active" : "Inactive"}
                                            </Badge>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setSelectedTestimonial(testimonial);
                                                        setIsEditDialogOpen(true);
                                                    }}
                                                >
                                                    Edit
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setSelectedTestimonial(testimonial);
                                                        setIsDeleteDialogOpen(true);
                                                    }}
                                                    className="text-red-600"
                                                >
                                                    Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {testimonials.length > 0 && (
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={setCurrentPage}
                />
            )}

            {/* Dialogs */}
            {/* <AddTestimonialDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSuccess={() => refetch()}
      /> */}

            {selectedTestimonial && (
                <EditTestimonialDialog
                    isOpen={isEditDialogOpen}
                    onClose={() => setIsEditDialogOpen(false)}
                    testimonial={selectedTestimonial}
                    onSuccess={() => refetch()}
                />
            )}

            {selectedTestimonial && (
                <DeleteTestimonialDialog
                    isOpen={isDeleteDialogOpen}
                    onClose={() => setIsDeleteDialogOpen(false)}
                    testimonialId={selectedTestimonial._id}
                    onSuccess={() => refetch()}
                />
            )}
        </div>
    );
}

// Loading skeleton component
