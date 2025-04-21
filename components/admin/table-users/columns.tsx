"use client"

import config from "@/lib/config";
import { ColumnDef } from "@tanstack/react-table"
import { IKImage } from "imagekitio-next";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";
import { Avatar, AvatarFallback  } from "@/components/ui/avatar";
import { getInitals } from "@/lib/utils";
import { approveuser } from "@/lib/admin/actions/users";
import { toast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';



export const columns: ColumnDef<User>[] = [

    {
        accessorKey: "fullName",
        header: "Full Name",
        cell: ({ row }) => {
            const name = row.original.fullName;
            return (
                <div className="flex items-center gap-2">
                    <Avatar>

                        <AvatarFallback className='bg-amber-100 text-black'>
                            {getInitals(name || '')}
                        </AvatarFallback>
                    </Avatar>
                    <span>{name}</span>
                </div>
            );
        }
    },
    {
        accessorKey: "email",
        header: "Email",
    },
    {
        accessorKey: "universityId",
        header: "University Id",
    },
    {
        accessorKey: "universityCard",
        header: "University Card",
        cell: ({ row }) => {
            const url = row.original.universityCard;

            if (!url) return <span className="text-gray-400">-</span>;

            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                            <Eye size={16} />
                            <span>View</span>
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-2xl md:max-w-3xl max-h-screen">
                        <DialogTitle className="text-lg font-semibold">University ID Card</DialogTitle>
                        <div className="flex justify-center p-6 w-full h-full">
                            <div className="relative w-full h-96">
                                <IKImage
                                    urlEndpoint={config.env.imagekit.urlEndpoint}
                                    path={url}
                                    fill
                                    className="w-full h-full object-contain mx-auto"
                                    alt="University ID Card"
                                />
                            </div>
                        </div>
                    </DialogContent>
                </Dialog>
            );
        },
    },
    {
        accessorKey: "status",
        header: "Status",
    },
    {
        accessorKey: "role",
        header: "Role",
    },
    {
        accessorKey: "lastActivityDate",
        header: "Last Activity",

    },
    {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => {
            const date = row.original.createdAt;
            if (!date) return <span className="text-gray-400">-</span>;
            return new Date(date).toLocaleString();
        }
    },
    {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
            const router = useRouter();
            const [loading, setLoading] = useState(false);
            const user = row.original;

            const handleApprove = async () => {
                setLoading(true);
                const res = await approveuser(user.id);
                if (res.success) {
                    toast({
                        title: "Success",
                        description: "User approved successfully.",
                        variant: "default",
                    })
                    router.refresh();
                } else {
                    toast({
                        title: "Error",
                        description: "Failed to approve user.",
                        variant: "destructive",
                    })

                }
                setLoading(false);
            };

            if (user.status === "APPROVED") {
                return <span className="text-green-500 font-medium">Approved</span>;
            }

            return (
                <Button
                    variant="default"
                    size="sm"
                    onClick={handleApprove}
                    disabled={loading}
                >
                    {loading ? "Approving..." : "Approve"}
                </Button>
            );
        },
    },
]