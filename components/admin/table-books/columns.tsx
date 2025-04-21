"use client";

import config from "@/lib/config";
import { ColumnDef } from "@tanstack/react-table";
import { IKImage, IKVideo } from "imagekitio-next";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye, Play } from "lucide-react";
import { play } from "lucide-react";
import { approveuser } from "@/lib/admin/actions/users";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Book>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "author",
    header: "Author",
  },
  {
    accessorKey: "genre",
    header: "Genre",
  },
  {
    accessorKey: "rating",
    header: "Rating",
  },
  {
    accessorKey: "totalCopies",
    header: "Total Copies",
  },
  {
    accessorKey: "availableCopies",
    header: "Available Copies",
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
        const description = row.original.description;
      
        if (!description) return <span className="text-gray-400">-</span>;
      
        // Cek apakah summary lebih dari 20 kata
        const words = description.split(" ");
        const isLongText = words.length > 20;
      
        // Jika lebih dari 20 kata, tampilkan preview + tombol dialog
        if (isLongText) {
          const preview = words.slice(0, 20).join(" ");
      
          return (
            <div>
              <p className="text-sm text-gray-700">
                {preview}
                <span>... </span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto text-black inline-flex"
                    >
                      Read More
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogTitle className="text-lg font-semibold">
                   Description
                    </DialogTitle>
                    <div className="p-4 max-h-96 overflow-y-auto">
                      <p className="text-gray-700 whitespace-pre-wrap">{description}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </p>
            </div>
          );
        }
      
        // Jika kurang dari 20 kata, tampilkan langsung
        return <p className="text-sm text-gray-700">{description}</p>;
      },
  },
  {
    accessorKey: "coverColor",
    header: "Cover Color",
  },
  {
    accessorKey: "coverUrl",
    header: "Cover Image",
    cell: ({ row }) => {
      const url = row.original.coverUrl;

      if (!url) return <span className="text-gray-400">-</span>;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Eye size={16} />
              <span>View</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl md:max-w-3xl max-h-screen">
            <DialogTitle className="text-lg font-semibold">
              Cover Image
            </DialogTitle>
            <div className="flex justify-center p-6 w-full h-full">
              <div className="relative w-full h-96">
                <IKImage
                  urlEndpoint={config.env.imagekit.urlEndpoint}
                  path={url}
                  fill
                  className="w-full h-full object-contain mx-auto"
                  alt="Cover Image"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "videoUrl",
    header: "Trailer",
    cell: ({ row }) => {
      const video = row.original.videoUrl;
      if (!video) return <span className="text-gray-400">-</span>;

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
            >
              <Play size={16} />
              <span>Watch</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-2xl md:max-w-3xl max-h-screen">
            <DialogTitle className="text-lg font-semibold">
              Book Trailer
            </DialogTitle>
            <div className="flex justify-center p-6 w-full h-full">
              <div className="relative w-full h-96">
                <IKVideo
                  urlEndpoint={config.env.imagekit.urlEndpoint}
                  path={video}
                  controls={true}
                  className="w-full rounded-xl"
                />
              </div>
            </div>
          </DialogContent>
        </Dialog>
      );
    },
  },
  {
    accessorKey: "summary",
    header: "Summary",
    cell: ({ row }) => {
        const summary = row.original.summary;
      
        if (!summary) return <span className="text-gray-400">-</span>;
      
        // Cek apakah summary lebih dari 20 kata
        const words = summary.split(" ");
        const isLongText = words.length > 20;
      
        // Jika lebih dari 20 kata, tampilkan preview + tombol dialog
        if (isLongText) {
          const preview = words.slice(0, 20).join(" ");
      
          return (
            <div>
              <p className="text-sm text-gray-700">
                {preview}
                <span>... </span>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      size="sm"
                      className="p-0 h-auto text-black inline-flex"
                    >
                      Read More
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-2xl">
                    <DialogTitle className="text-lg font-semibold">
                      Summary
                    </DialogTitle>
                    <div className="p-4 max-h-96 overflow-y-auto">
                      <p className="text-gray-700 whitespace-pre-wrap">{summary}</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </p>
            </div>
          );
        }
      
        // Jika kurang dari 20 kata, tampilkan langsung
        return <p className="text-sm text-gray-700">{summary}</p>;
      },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
      const date = row.original.createdAt;
      if (!date) return <span className="text-gray-400">-</span>;
      return new Date(date).toLocaleString();
    },
  },
  {
      id: "actions",
      header: "Actions",
      
  },
];
